/* src\App.svelte generated by Svelte v3.50.1 */
import {
	SvelteComponent,
	append,
	attr,
	check_outros,
	create_component,
	destroy_component,
	detach,
	element,
	group_outros,
	init,
	insert,
	mount_component,
	safe_not_equal,
	space,
	transition_in,
	transition_out
} from "./_snowpack/pkg/svelte/internal.js";

import RecipeList from './RecipeList.svelte.js';
import RecipeSingle from './RecipeSingle.svelte.js';

function create_fragment(ctx) {
	let div;
	let header;
	let t;
	let switch_instance;
	let current;
	var switch_value = /*page*/ ctx[0];

	function switch_props(ctx) {
		return { props: { name: /*name*/ ctx[1] } };
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props(ctx));
	}

	return {
		c() {
			div = element("div");
			header = element("header");
			t = space();
			if (switch_instance) create_component(switch_instance.$$.fragment);
			attr(header, "class", "App-header");
			attr(div, "class", "App");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, header);
			append(div, t);

			if (switch_instance) {
				mount_component(switch_instance, div, null);
			}

			current = true;
		},
		p(ctx, [dirty]) {
			const switch_instance_changes = {};
			if (dirty & /*name*/ 2) switch_instance_changes.name = /*name*/ ctx[1];

			if (switch_value !== (switch_value = /*page*/ ctx[0])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, div, null);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			if (switch_instance) destroy_component(switch_instance);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let page = RecipeList;
	let name = null;

	function change_page() {
		if (window.location.hash.startsWith(`#/recipe/`)) {
			$$invalidate(0, page = RecipeSingle);
			$$invalidate(1, name = decodeURIComponent(window.location.hash.replace(`#/recipe/`, ``)));
			document.title = name;
		} else {
			$$invalidate(0, page = RecipeList);
			document.title = "Recipes";
		}
	}

	window.addEventListener("hashchange", change_page, false);
	change_page();
	return [page, name];
}

class App extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default App;