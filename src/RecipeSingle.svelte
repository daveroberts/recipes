<!-- RecipeSingle.svelte -->
<script>
  import RecipeDetail from './RecipeDetail.svelte'
  import all_recipes from './recipes.json'
  import { onMount as on_mount } from 'svelte'
  export let name
  let recipe = null

  on_mount(async () => {
    console.log('onMount called', name)
    recipe = all_recipes.find(r => r.name == name)
    console.log(`Found: ${recipe}`)
  })
</script>
<style>
  .recipe-title{ font-size: 2em; }
</style>
<div>
  <div>
    <a href="#/">← Back to recipe list</a>
  </div>
  {#if recipe}
    <div style="margin: 2em 0">
      <span style="display: flex; align-items: center; column-gap: 10pt;">
        <span class="recipe-title">{recipe.name}</span>
        {#if recipe.categories}
          <span class="categories">
            {#each recipe.categories as category}
              <span class="category">{category}</span>
            {/each}
          </span>
        {/if}
      </span>
    </div>
    <RecipeDetail recipe={recipe} />
  {/if}
</div>