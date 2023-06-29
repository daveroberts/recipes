<!-- RecipeTitle.svelte -->
<script>
  export let recipe;
</script>
<style>
  .recipe-title{ font-size: 2rem; }
  .category{ background-color: #2964d3; color: white; padding: 3pt; margin-right: 5pt; border-radius: 3pt; font-size: 1rem; }
</style>
{#if recipe}
  <div style="display: flex; align-items: center; column-gap: 10pt;">
    <span class="recipe-title">{recipe.name}</span>
    {#if recipe.categories}
      <span class="categories">
        {#each recipe.categories as category}
          <span class="category">{category}</span>
        {/each}
      </span>
    {/if}
  </div>
{/if}