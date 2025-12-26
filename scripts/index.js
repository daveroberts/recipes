let state = {
  category_selected: null,
  search: "",
};
function toggle_category(category) {
  if (state.category_selected == category){
    state.category_selected = null
  } else {
    state.category_selected = category
  }
  let category_buttons = document.querySelectorAll(`a.category-button`);
  for(let category_button of category_buttons){
    let cat = category_button.dataset.category
    if (cat == state.category_selected){
      category_button.classList.add("in");
    } else {
      category_button.classList.remove("in")
    }
  }
  render();
}

function search_changed(ev) {
  let el = document.querySelector("#search-text");
  state.search = el.value;
  render();
}

function render() {
  let el_category_area = document.getElementById("category-area");
  if (state.search) {
    el_category_area.classList.add("hidden");
  } else {
    el_category_area.classList.remove("hidden");
  }
  let el_recipes = Array.from(document.querySelectorAll(".recipe-list-item"));
  let show_all = true;
  if (state.category_selected || state.search) {
    show_all = false;
  }
  for (let el of el_recipes) {
    let recipe_categories = el.dataset.categories
      ? JSON.parse(el.dataset.categories)
      : [];
    let does_category_match = recipe_categories.includes(state.category_selected)
    let search_match = false;
    if (state.search) {
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

    if (show_all || (state.search && search_match) || (!state.search && does_category_match)) {
      el.classList.remove("hidden");
    } else {
      el.classList.add("hidden");
    }
  }
}
