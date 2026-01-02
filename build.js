import * as fs from 'fs';
import * as path from 'path';
import * as esbuild from 'esbuild';
import less from 'less';
import * as index_builder from './templates/index_builder.js'
import * as recipe_builder from './templates/recipe_builder.js'

const OUTPUT_DIR = "build";
const STYLESEETS_DIR = "stylesheets";
const STATIC_DIR = "static";

import * as libstate from './state.js';
let state = await libstate.generate_state();

// Used to remove and recreate build dir here, but browsersync can't watch that for changes
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR);
  if (!fs.existsSync(path.join(OUTPUT_DIR, "recipe"))) {
    fs.mkdirSync(path.join(OUTPUT_DIR, "recipe"));
  }
}

esbuild.buildSync({
  entryPoints: ["./scripts/"],
  bundle: false,
  outfile: "build/bundle.js",
  minify: true,
  sourcemap: true,
});

let index_less = fs
  .readFileSync(path.join(STYLESEETS_DIR, "index.less"))
  .toString();
less.render(index_less).then((index_css) => {
  fs.writeFileSync(path.join(OUTPUT_DIR, "index.css"), index_css.css);
});

let index_rendered_html = await index_builder.generate({categories: state.categories, recipes: state.recipes})
fs.writeFileSync(path.join(OUTPUT_DIR, "index.html"), index_rendered_html);

for (let recipe of state.recipes) {
  if (!recipe.name) {
    continue;
  }
  state.recipe = recipe;
  let recipe_rendered_html = await recipe_builder.generate(recipe)
  let output_file = path.join(OUTPUT_DIR, "recipe", recipe.filename + ".html")
  fs.writeFileSync(output_file, recipe_rendered_html);
}

fs.cpSync(STATIC_DIR, OUTPUT_DIR, {recursive: true});
