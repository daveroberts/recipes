<!-- RecipeList.svelte -->
<script>
  import all_recipes from './recipes.json'
  let categories = all_recipes.map(r=>r.categories).flat().filter((v,i,a)=>a.indexOf(v)===i).filter(cat=>!!cat)
  import Recipe from './Recipe.svelte'
  let search = ""
  let selected_categories = []

  let recipes = all_recipes
  $: {
    recipes = all_recipes.slice()
    if (selected_categories.length > 0){
      recipes = recipes.filter(r=>{
        if (!r.categories){ return false }
        let intersection = r.categories.filter(cat => selected_categories.includes(cat))
        return intersection.length > 0
      })
    }
    if(search){
      recipes = recipes.filter(r=>{
        return JSON.stringify(r).toLowerCase().includes(search.toLowerCase())
      })
    }
    recipes.sort((a,b)=>a.name > b.name ? 1 : -1)
  }
</script>
<style>
  .category_area{ margin-bottom: 1em; }
  .category_checkbox{ margin-right: 10pt;}
</style>
<div>
  <div class="category_area">
    {#each categories as category}
      <label class="category_checkbox">
        <input type="checkbox" bind:group={selected_categories} value={category}>
        {category}
      </label>
    {/each}
  </div>
  <div>Search: <input bind:value={search} /></div>
  {#if search}<div>Searching for {search}</div>{/if}
  
  {#if recipes.length > 0}
    {#each recipes as recipe}
      <Recipe recipe={recipe}></Recipe>
    {/each}
  {:else}
    <div>No recipes found with `{search}`</div>
  {/if}
</div>