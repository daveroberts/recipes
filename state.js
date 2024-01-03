let state = {};

const recipes = require("./recipes.json");
let categories = recipes
  .map((r) => r.categories)
  .flat()
  .filter((v, i, a) => a.indexOf(v) === i)
  .filter((cat) => !!cat);
// @ts-ignore
categories.sort((a, b) => (a > b ? 1 : -1));
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
