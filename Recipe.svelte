<!-- Recipe.svelte -->
<script>
  export let recipe;
</script>
<style>
</style>
<div>
  <h2>{recipe.name}</h2>
  <pre>{JSON.stringify(recipe,null,2)}</pre>
</div>