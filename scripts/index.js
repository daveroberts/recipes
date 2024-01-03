let state = {
  categories_selected: [],
};
function toggle_category(category) {
  event?.preventDefault();
  let idx = state.categories_selected.findIndex((item) => item == category);
  let el = document.querySelector(`a[data-category="${category}"]`);
  if (idx == -1) {
    state.categories_selected.push(category);
    el.classList.add("in");
  } else {
    state.categories_selected.splice(idx, 1);
    el.classList.remove("in");
  }

  render_list();
}

function search_changed(ev) {
  let el = document.querySelector("#search-text");
  state.search = el.value;
  render_list();
}

function render_list() {
  let el_recipes = Array.from(document.querySelectorAll(".recipe-list-item"));
  let show_all = true;
  if (state.categories_selected.length > 0 || state.search) {
    show_all = false;
  }
  for (let el of el_recipes) {
    let recipe_categories = el.dataset.categories
      ? JSON.parse(el.dataset.categories)
      : [];
    let is_in = true;
    for (let cat of state.categories_selected) {
      if (!recipe_categories.includes(cat)) {
        is_in = false;
        break;
      }
    }
    let search_match = true;
    if (state.search) {
      search_match = false;
      let recipe_name = el.dataset.recipeName;
      let ingredients = el.dataset.ingredients
        ? JSON.parse(el.dataset.ingredients)
        : [];
      name_match = recipe_name
        .toLowerCase()
        .includes(state.search.toLowerCase());
      let matched_ingredient = ingredients.find((ingredient) =>
        ingredient.toLowerCase().includes(state.search.toLowerCase())
      );
      search_match = !!name_match || !!matched_ingredient;
    }

    if (show_all || (is_in && search_match)) {
      el.classList.remove("hidden");
    } else {
      el.classList.add("hidden");
    }
  }
}
