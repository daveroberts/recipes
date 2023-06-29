<!-- App.svelte -->
<script>
  import RecipeList from './RecipeList.svelte'
  import RecipeSingle from './RecipeSingle.svelte'
  let page = RecipeList
  let name = null
  function change_page(){
    if (window.location.hash.startsWith(`#/recipe/`)){
      page = RecipeSingle
      name = decodeURIComponent(window.location.hash.replace(`#/recipe/`,``))
    }
    else { page = RecipeList }
    console.log(`The hash has changed: ${window.location.hash}`);
  }
  window.addEventListener("hashchange", change_page, false );
  change_page()
</script>
<style>
  /* css will go here */
</style>
<div class="App">
  <header class="App-header">
  </header>
  <svelte:component this="{page}" name="{name}" />
</div>