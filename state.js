import * as fs from 'node:fs';
import * as path from 'path';
import * as libyaml from 'yaml'
let recipe_dirs = fs.readdirSync("./recipes/")
import category_to_icon from "./icons.json" with { type: 'json'};
export async function generate_state(){
  let state = {};
  let recipes = []
  for(let recipe_dir of recipe_dirs){
    let recipe = libyaml.parse(fs.readFileSync(path.join('recipes', recipe_dir, 'recipe.yaml')).toString())
    recipe.filename = recipe_dir
    let allowed_filenames = ['image.jpg', 'image.jpeg', 'image.png', 'image.gif', 'image.webp'];
    let files_in_recipe_dir = fs.readdirSync(path.join('recipes', recipe_dir))
    let image_files_in_recipe_dir = files_in_recipe_dir.filter(file => allowed_filenames.includes(file))
    recipe.image_file_path = null;
    if (image_files_in_recipe_dir.length){
      let image_file = image_files_in_recipe_dir[0]
      let image_file_path = path.join('recipes',recipe_dir, image_file)
      recipe.image_file_path = image_file_path
    }
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