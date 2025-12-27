import * as fs from 'node:fs';
import category_to_icon from "../icons.json" with { type: 'json'};
import sharp from 'sharp';

export async function generate({ categories = [], recipes = [] } = {}) {
  let output = /*html*/`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="description"
      content="Recipes I've collected over the years that I've either enjoyed, or want to try"
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" type="text/css" href="./index.css" />
    <title>Recipes</title>
    <link rel="apple-touch-icon" sizes="180x180" href="./icon.png">
    <link rel="manifest" href="./manifest.json">
    <meta name="theme-color" content="#db7093">
    <script>`;
  output += /*html*/`</script>
  </head>
  <body>
    <div class="search-box">
      <input
        id="search-text"
        placeholder="Search..."
        autofocus
        oninput="search_changed(event)"
      />
    </div>
    <div id="category-area">`;
  function category_icon(category) {
    if (category in category_to_icon) {
      return category_to_icon[category];
    }
    return "";
  };
  for (let category of categories) {
    output += /*html*/`
      <a href="#"
        data-category="${category}"
        onclick="toggle_category('${category}')"
        class="category-button"
        >${category_icon(category)} ${category}</a>`
  }
  output += /*html*/`
    </div>
    <div class="recipe-list">`
  function recipe_icons(recipe) {
    if (!recipe.categories) {
      return "";
    }
    let icons = [];
    for (let category of recipe.categories) {
      if (category in category_to_icon) icons.push(category_to_icon[category]);
    }
    return icons.join();
  };
  for (let recipe of recipes) {
    if (!recipe.name) { continue }
    let image_tag_html = ""
    if (recipe.image_file_path){
      let buf = await sharp(recipe.image_file_path).resize(72).webp().toBuffer()
      let b64 = buf.toString('base64')
      image_tag_html = /*html*/`<img class="recipe-list-image" src="data:image/webp;base64,${b64}" />`
    }
    
    output += /*html*/`
      <a
        class="recipe-list-item"
        data-categories="${JSON.stringify(recipe.categories).replace(/"/g, `&quot;`)}"
        data-ingredients="${JSON.stringify(recipe.versions.map(v => v.ingredients || []).flat()).replace(/"/g, `&quot;`)}"
        data-recipe-name="${recipe.name}"
        href="recipe/${recipe.filename}.html"
        >${image_tag_html}<div class="recipe-list-title">${recipe_icons(recipe)} ${recipe.name}</div></a>`
  }
  output += /*html*/`
    </div>
    <script type="text/javascript" src="bundle.js"></script>
  </body>
</html>`
  return output;
}