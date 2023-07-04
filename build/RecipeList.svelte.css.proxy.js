// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".category_area.svelte-so1bbo.svelte-so1bbo{margin-bottom:1em}.category-box.svelte-so1bbo.svelte-so1bbo{display:inline-block;border:1px solid white;box-sizing:border-box;margin:5pt}.category-name.svelte-so1bbo.svelte-so1bbo{padding:3pt}.category_button.svelte-so1bbo.svelte-so1bbo{background-color:white;border-width:0;color:#515151;position:relative;padding:2pt 5pt}.selected.svelte-so1bbo.svelte-so1bbo{background-color:#99FF66}.search-box.svelte-so1bbo.svelte-so1bbo{margin:10pt 0}.search-box.svelte-so1bbo input.svelte-so1bbo{font-size:2em;width:100%}.list-recipe-title.svelte-so1bbo.svelte-so1bbo{font-size:1.5em}.recipe-link.svelte-so1bbo.svelte-so1bbo{display:block;padding:3pt 0}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}