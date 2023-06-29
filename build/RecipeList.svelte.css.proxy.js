// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".category_area.svelte-14wmt40{margin-bottom:1em}.category_box.svelte-14wmt40{border:1px solid white;display:inline-block;box-sizing:border-box;margin-right:5pt}.category-name.svelte-14wmt40{padding:3pt}.category_button.svelte-14wmt40{background-color:white;border-width:0;color:#515151;position:relative;padding:2pt 5pt}.selected.svelte-14wmt40{background-color:#99FF66}.recipe-link.svelte-14wmt40{display:block;padding:3pt 0}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}