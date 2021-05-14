<!-- RecipeList.svelte -->
<script>
  import all_recipes from './recipes.json'
  import Recipe from './Recipe.svelte'
  let search = ""

  let recipes = all_recipes
  $: {
    if(search){
      recipes = all_recipes.filter(r=>{
        return JSON.stringify(r).toLowerCase().includes(search)
      })
    } else {
      recipes = all_recipes
    }
  }
</script>
<style>
</style>
<div>
  <div>Search: <input bind:value={search} /></div>
  {#if search}<div>Searching for {search}</div>{/if}
  
  {#each recipes as recipe}
    <Recipe recipe={recipe}></Recipe>
  {/each}
</div>