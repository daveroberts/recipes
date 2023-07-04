<!-- RecipeList.svelte -->
<script>
  import all_recipes from './recipes.json'
  let categories = all_recipes.map(r=>r.categories).flat().filter((v,i,a)=>a.indexOf(v)===i).filter(cat=>!!cat)
  categories.sort((a,b)=>a>b ? 1 : -1)
  let search = ""
  let filtered_categories = { included: [], excluded: [] }

  let recipes = all_recipes
  $: {
    recipes = all_recipes.slice()
    if (filtered_categories.included.length > 0){
      recipes = recipes.filter(r=>{
        if (!r.categories){ return false }
        let intersection = r.categories.filter(cat => filtered_categories.included.includes(cat))
        return intersection.length >= filtered_categories.included.length
      })
    }
    if (filtered_categories.excluded.length > 0){
      recipes = recipes.filter(r=>{
        if (!r.categories){ return true }
        let intersection = r.categories.filter(cat => filtered_categories.excluded.includes(cat))
        return intersection.length == 0
      })
    }
    if(search){
      recipes = recipes.filter(r=>{
        return JSON.stringify(r).toLowerCase().includes(search.toLowerCase())
      })
    }
    recipes.sort((a,b)=>a.name > b.name ? 1 : -1)
  }

  const toggle_include = category => {
    filtered_categories.excluded = filtered_categories.excluded.filter(c => c != category)
    if (filtered_categories.included.includes(category)){ // was included, need to remove
      filtered_categories.included = filtered_categories.included.filter(c => c != category)
    } else { // was not included, need to add
      filtered_categories.included = [...filtered_categories.included, category]
    }
  }
  const toggle_exclude = category => {
    filtered_categories.included = filtered_categories.included.filter(c => c != category)
    if (filtered_categories.excluded.includes(category)){ // was excluded, need to remove
      filtered_categories.excluded = filtered_categories.excluded.filter(c => c != category)
    } else { // was not excluded, need to add
      filtered_categories.excluded = [...filtered_categories.excluded, category]
    }
  }
</script>
<style>
  .category_area{ margin-bottom: 1em; }
  .category-box{ display: inline-block; border: 1px solid white; box-sizing: border-box; margin: 5pt; }
  .category-name{ padding: 3pt; }
  .category_button{ background-color: white; border-width: 0; color: #515151; position: relative; padding: 2pt 5pt; }
  .selected{ background-color: #99FF66; }
  .search-box{ margin: 10pt 0; }
  .search-box input{ font-size: 2em; width: 100%; }
  .list-recipe-title{ font-size: 1.5em; }
  .recipe-link{ display: block; padding: 3pt 0; }
</style>
<div>
  <h1>Recipes</h1>
  <div class="category_area">
    <div>
      {#each categories as category}
        <span class="category-box">
          <span class="category_element category-name">{category}</span><button
            class="category_element category_button"
            class:selected={filtered_categories.included.includes(category)}
            on:click={()=>{toggle_include(category)}}>
              In
          </button><button
            class="category_element category_button"
            class:selected={filtered_categories.excluded.includes(category)}
            on:click={()=>{toggle_exclude(category)}}>
              Out
            </button>
          </span>
      {/each}
    </div>
  </div>
  <div class="search-box"><input bind:value={search} placeholder="Search..." autofocus/></div>
  
  {#if recipes.length > 0}
    {#each recipes as recipe}
      <div style="display: flex; align-items: center; column-gap: 10pt;">
        <a class="recipe-link" href={`#/recipe/${encodeURIComponent(recipe.name)}`}>
          <span class="list-recipe-title">{recipe.name}</span>
        </a>
        {#if recipe.categories}
          <span class="categories">
            {#each recipe.categories as category}
              <span class="category">{category}</span>
            {/each}
          </span>
        {/if}
      </div>
    {/each}
  {:else}
    <div>No recipes found with `{search}`</div>
  {/if}
</div>