// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".category_area.svelte-flbahi{margin-bottom:1em}.category_box.svelte-flbahi{border:1px solid white;display:inline-block;box-sizing:border-box;margin-right:5pt}.category-name.svelte-flbahi{padding:3pt}.category_button.svelte-flbahi{background-color:white;border-width:0;color:#515151;position:relative;padding:4pt 13pt}.selected.svelte-flbahi{background-color:#99FF66}.invisible.svelte-flbahi{visibility:hidden}.checkmark.svelte-flbahi{position:absolute;left:2pt;color:black;font-weight:bold}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}