import App from "./App.svelte";

let app = new App({
  target: document.body,
});

let fib = (n) => {
  return n + 2;
};

export default app;
