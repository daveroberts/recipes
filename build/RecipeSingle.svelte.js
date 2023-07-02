/* src\RecipeSingle.svelte generated by Svelte v3.50.1 */
import {
	SvelteComponent,
	append,
	create_component,
	destroy_component,
	detach,
	element,
	init,
	insert,
	mount_component,
	safe_not_equal,
	set_style,
	space,
	transition_in,
	transition_out
} from "./_snowpack/pkg/svelte/internal.js";

import RecipeTitle from './RecipeTitle.svelte.js';
import RecipeDetail from './RecipeDetail.svelte.js';
import all_recipes from './recipes.json.proxy.js';
import { onMount as on_mount } from './_snowpack/pkg/svelte.js';

function create_fragment(ctx) {
	let div2;
	let div0;
	let t1;
	let div1;
	let recipetitle;
	let t2;
	let recipedetail;
	let current;
	recipetitle = new RecipeTitle({ props: { recipe: /*recipe*/ ctx[0] } });
	recipedetail = new RecipeDetail({ props: { recipe: /*recipe*/ ctx[0] } });

	return {
		c() {
			div2 = element("div");
			div0 = element("div");
			div0.innerHTML = `<a href="#/">← Back to recipe list</a>`;
			t1 = space();
			div1 = element("div");
			create_component(recipetitle.$$.fragment);
			t2 = space();
			create_component(recipedetail.$$.fragment);
			set_style(div1, "margin", "2em 0");
		},
		m(target, anchor) {
			insert(target, div2, anchor);
			append(div2, div0);
			append(div2, t1);
			append(div2, div1);
			mount_component(recipetitle, div1, null);
			append(div2, t2);
			mount_component(recipedetail, div2, null);
			current = true;
		},
		p(ctx, [dirty]) {
			const recipetitle_changes = {};
			if (dirty & /*recipe*/ 1) recipetitle_changes.recipe = /*recipe*/ ctx[0];
			recipetitle.$set(recipetitle_changes);
			const recipedetail_changes = {};
			if (dirty & /*recipe*/ 1) recipedetail_changes.recipe = /*recipe*/ ctx[0];
			recipedetail.$set(recipedetail_changes);
		},
		i(local) {
			if (current) return;
			transition_in(recipetitle.$$.fragment, local);
			transition_in(recipedetail.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(recipetitle.$$.fragment, local);
			transition_out(recipedetail.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div2);
			destroy_component(recipetitle);
			destroy_component(recipedetail);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { name } = $$props;
	let recipe = null;

	on_mount(async () => {
		console.log('onMount called', name);
		$$invalidate(0, recipe = all_recipes.find(r => r.name == name));
		console.log(`Found: ${recipe}`);
	});

	$$self.$$set = $$props => {
		if ('name' in $$props) $$invalidate(1, name = $$props.name);
	};

	return [recipe, name];
}

class RecipeSingle extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { name: 1 });
	}
}

export default RecipeSingle;