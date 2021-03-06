// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".category_area.svelte-lkor4m{margin-bottom:1em}.category_box.svelte-lkor4m{border:1px solid white;display:inline-block;box-sizing:border-box;margin-right:5pt}.category-name.svelte-lkor4m{padding:3pt}.category_button.svelte-lkor4m{background-color:white;border-width:0;color:#515151;position:relative;padding:2pt 5pt}.selected.svelte-lkor4m{background-color:#99FF66}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}