const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const esbuild = require("esbuild");
const less = require("less");

const BUILD_DIR = "build";
const TEMPLATES_DIR = "templates";
const STYLESEETS_DIR = "stylesheets";
const STATIC_DIR = "static";

const state = require("./state.js");

// Used to remove and recreate build dir here, but browsersync can't watch that for changes
if (!fs.existsSync(BUILD_DIR)) {
  fs.mkdirSync(BUILD_DIR);
  if (!fs.existsSync(path.join(BUILD_DIR, "recipe"))) {
    fs.mkdirSync(path.join(BUILD_DIR, "recipe"));
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
  fs.writeFileSync(path.join(BUILD_DIR, "index.css"), index_css.css);
});

let index_template_html = fs
  .readFileSync(path.join(TEMPLATES_DIR, "index.html.ejs"))
  .toString();
let index_rendered_html = ejs.render(index_template_html, state);
fs.writeFileSync(path.join(BUILD_DIR, "index.html"), index_rendered_html);

let recipe_template_html = fs
  .readFileSync(path.join(TEMPLATES_DIR, "recipe.html.ejs"))
  .toString();
for (let recipe of state.recipes) {
  if (!recipe.name) {
    continue;
  }
  state.recipe = recipe;
  let recipe_rendered_html = ejs.render(recipe_template_html, state);
  let output_file = state.url_from(recipe.name) + ".html";
  fs.writeFileSync(
    path.join(BUILD_DIR, "recipe", output_file),
    recipe_rendered_html
  );
}

fs.cpSync(STATIC_DIR, BUILD_DIR, {recursive: true});
