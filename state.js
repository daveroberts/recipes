import * as fs from 'node:fs';
import * as path from 'path';
import * as libyaml from 'yaml'
let recipe_files = fs.readdirSync("./recipes/")
import category_to_icon from "./icons.json" with { type: 'json'};
export async function generate_state(){
  let state = {};
  let recipes = []
  for(let recipe_file of recipe_files){
    let recipe = libyaml.parse(fs.readFileSync(path.join('recipes', recipe_file)).toString())
    recipe.pathname = recipe_file.replace(/\.yaml$/, "")
    recipes.push(recipe)
  }
  let categories = recipes
    .map((r) => r.categories)
    .flat()
    .filter((v, i, a) => a.indexOf(v) === i)
    .filter((cat) => !!cat);
  
  // @ts-ignore
  categories.sort((a, b) => (a > b ? 1 : -1));
  let fav_idx = categories.findIndex((c) => c == "Favorite");
  if (fav_idx > -1) {
    categories.splice(fav_idx, 1);
    categories.unshift("Favorite");
  }
  recipes.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));

  state.recipes = recipes;
  state.categories = categories;
  return state;
}