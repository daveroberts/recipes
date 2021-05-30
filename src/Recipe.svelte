<!-- Recipe.svelte -->
<script>
  export let recipe;
  let expanded = false
</script>
<style>
  .external_link{ text-decoration: underline; }
</style>
<div>
  <h2><span class="fakelink" on:click={()=>{expanded=!expanded}}>{recipe.name}</span></h2>
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