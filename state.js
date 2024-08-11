let state = {};

const recipes = require("./recipes.json");
let categories = recipes
  .map((r) => r.categories)
  .flat()
  .filter((v, i, a) => a.indexOf(v) === i)
  .filter((cat) => !!cat);
let category_to_icon = require("./icons.json");
state.recipe_icons = (recipe) => {
  if (!recipe.categories) {
    return "";
  }
  let icons = [];
  for (let category of recipe.categories) {
    if (category in category_to_icon) icons.push(category_to_icon[category]);
  }
  return icons.join();
};
state.category_icon = (category) => {
  if (category in category_to_icon) {
    return category_to_icon[category];
  }
  return "";
};
// @ts-ignore
categories.sort((a, b) => (a > b ? 1 : -1));
let fav_idx = categories.findIndex((c) => c == "Favorite");
if (fav_idx > -1) {
  categories.splice(fav_idx, 1);
  categories.unshift("Favorite");
}
recipes.sort((a, b) => (a.name > b.name ? 1 : -1));

state.recipes = recipes;
state.categories = categories;
state.url_from = (name) =>
  name
    .toLowerCase()
    .trim()
    .replaceAll(" ", "-")
    .replaceAll("/", "-")
    .replaceAll("\\", "-")
    .replaceAll(/-+/g, "-");
module.exports = state;
