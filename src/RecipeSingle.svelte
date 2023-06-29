<!-- RecipeSingle.svelte -->
<script>
  import RecipeTitle from './RecipeTitle.svelte'
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
</style>
<div>
  <div>
    <a href="/">Back to recipe list</a>
  </div>
  <div style="margin: 2em 0">
    <RecipeTitle recipe={recipe} />
  </div>
  <RecipeDetail recipe={recipe} />
</div>