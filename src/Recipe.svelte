<!-- Recipe.svelte -->
<script>
  export let recipe;
  let expanded = false
</script>
<style>
  .external_link{ text-decoration: underline; }
  .recipe-title{ font-size: 1.5rem; margin: 0.75rem 0; }
  .categories{ margin-bottom: 5pt; }
  .category{ background-color: #2964d3; color: white; padding: 3pt; margin-right: 5pt; border-radius: 3pt; font-size: 1rem; }
</style>
<div>
  <div>
    <div class="recipe-title fakelink" on:click={()=>{expanded=!expanded}}>
      {recipe.name}
      {#if recipe.categories}
        <span class="categories">
          {#each recipe.categories as category}
            <span class="category">{category}</span>
          {/each}
        </span>
      {/if}
    </div>
  </div>
  {#if expanded}
    {#if recipe.notes}
      {#each recipe.notes as note}
        <div><strong>Note: {note}</strong></div>
      {/each}
    {/if}
    {#if recipe.video}<div><a class="external_link" target="_blank" href={recipe.video}>{recipe.video}</a></div>{/if}
    {#if recipe.link}<div><a class="external_link" target="_blank" href={recipe.link}>{recipe.link}</a></div>{/if}
    {#each recipe.versions as version}
      {#if version.name}<h3>{version.name}</h3>{/if}
      {#if version.ingredients}
        <h4>Ingredients</h4>
        <ul>
          {#each version.ingredients as ingredient}
            <li>{ingredient}</li>
          {/each}
        </ul>
      {/if}
      {#if version.instructions}
        <h4>Instructions</h4>
        <ol>
          {#each version.instructions as instruction}
            <li>{instruction}</li>
          {/each}
        </ol>
      {/if}
    {/each}
  {/if}
</div>