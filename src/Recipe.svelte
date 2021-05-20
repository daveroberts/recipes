<!-- Recipe.svelte -->
<script>
  export let recipe;
  let expanded = false
</script>
<style>
  .external_link{ text-decoration: underline; }
  .fakelink:hover{ cursor: pointer }
</style>
<div>
  <h2><span class="fakelink" on:click={()=>{expanded=!expanded}}>{recipe.name}</span></h2>
  {#if expanded}
    {#if recipe.note}<div><strong>Note: {recipe.note}</strong></div>{/if}
    {#if recipe.video}<div><a class="external_link" target="_blank" href={recipe.video}>{recipe.video}</a></div>{/if}
    {#if recipe.link}<div><a class="external_link" target="_blank" href={recipe.link}>{recipe.link}</a></div>{/if}
    <h3>Ingredients</h3>
    <ul>
      {#each recipe.ingredients as ingredient}
        <li>{ingredient}</li>
      {/each}
    </ul>
    <h3>Instructions</h3>
    <ol>
      {#each recipe.instructions as instruction}
        <li>{instruction}</li>
      {/each}
    </ol>
  {/if}
</div>