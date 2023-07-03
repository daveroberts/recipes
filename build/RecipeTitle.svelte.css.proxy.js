// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".recipe-title.svelte-wnybx2{font-size:2rem}.category.svelte-wnybx2{user-select:none;background-color:#2964d3;color:white;padding:3pt;margin-right:5pt;border-radius:3pt;font-size:1rem}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}