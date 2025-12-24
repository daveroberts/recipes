import * as fs from 'node:fs';
import category_to_icon from "../icons.json" with { type: 'json'};

export async function generate(recipe){
  let output = ``
  output += /*html*/`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="description" content="${ recipe.name }" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" type="text/css" href="../index.css" />
    <title>${recipe.name}</title>
  </head>
  <body>
    <a href="../">← Back to recipe list</a>
    <div style="margin: 1em 0">
      <span style="display: flex; align-items: center; column-gap: 10pt">
        <a class="recipe-title" href="${recipe.filename}.html"
          >${recipe.name}</a>`
if (recipe.categories){
  for(let category of recipe.categories){
    output += /*html*/`<span class="tag">${category}</span>`
  }
  output += /*html*/`</span>
    </div>
    <div>`
const LF = "%0D%0A"
let link = `https://daveroberts.github.io/recipes/build/recipe/${recipe.filename}.html`
let body = recipe.name + LF + link + LF + recipe.versions.map(v => `${v?.name ||""}${LF}${v?.ingredients?.join(LF)}${LF}${LF}${v?.instructions?.join(LF)}`).join(LF)
  output += /*html*/`<a target="_blank"
    href="mailto:?subject=Recipe: ${recipe.name}&body=${body}">Share Recipe 📧</a></div>`
  if (recipe.notes){
    for(let note of recipe.notes){
      output += /*html*/`<div style="margin-bottom: 5pt"><strong>Note: ${note}</strong></div>`
    }
  }
  if (recipe.video){
    output += /*html*/`<div><a class="external_link" target="_blank" href="${recipe.video}">${recipe.video} 🔗</a></div>`
  }
  if (recipe.links){
    for(let link of recipe.links){
      output += /*html*/`<div><a class="external_link" target="_blank" href="${link}">${link} 🔗</a></div>`
    }
  }
  for(let version of recipe.versions){
    if (version.name){
      output += /*html*/`<h3>${version.name}</h3>`
    }
    output += /*html*/`<div class="version">`
      if (version.ingredients){
        output += /*html*/`<h4>Ingredients</h4>
        <ul>`
          for(let ingredient of version.ingredients){
            output += /*html*/`<li>${ingredient}</li>`
          }
        output += /*html*/`</ul>`
      }
      if (version.instructions){
        output += /*html*/`<h4>Instructions</h4>`
        output += /*html*/`<ol>`
          for(let instruction of version.instructions){
            output += /*html*/`<li>${instruction}</li>`
          }
        output += /*html*/`</ol>`
      }
    output += /*html*/`</div>`
  }
  output += /*html*/`<script type="text/javascript" src="../bundle.js"></script>
  </body>
</html>`
  return output
}}