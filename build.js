const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const esbuild = require("esbuild");

const BUILD_DIR = "build";
const TEMPLATES_DIR = "templates";
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
  let output_file =
    recipe.name.replaceAll("/", "").replaceAll("\\", "") + ".html";
  fs.writeFileSync(
    path.join(BUILD_DIR, "recipe", output_file),
    recipe_rendered_html
  );
}

let static_files = fs.readdirSync(STATIC_DIR);
for (let static_file of static_files) {
  fs.copyFileSync(
    path.join(STATIC_DIR, static_file),
    path.join(BUILD_DIR, static_file)
  );
}
