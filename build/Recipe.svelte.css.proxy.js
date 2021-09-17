// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".external_link.svelte-bxojpr{text-decoration:underline}.recipe-title.svelte-bxojpr{font-size:1.5rem;margin:0.75rem 0}.categories.svelte-bxojpr{margin-bottom:5pt}.category.svelte-bxojpr{background-color:#2964d3;color:white;padding:3pt;margin-right:5pt;border-radius:3pt;font-size:1rem}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}