<!-- RecipeDetail.svelte -->
<script>
  export let recipe;
</script>
<style>
</style>
<div>
  {#if recipe}
    {#if recipe.notes}
      {#each recipe.notes as note}
        <div style="margin-bottom: 5pt;"><strong>Note: {note}</strong></div>
      {/each}
    {/if}
    {#if recipe.video}<div><a class="external_link" target="_blank" href={recipe.video}>{recipe.video} 🔗</a></div>{/if}
    {#if recipe.links}
      {#each recipe.links as link}
       <div><a class="external_link" target="_blank" href={link}>{link} 🔗</a></div>
      {/each}
    {/if}
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