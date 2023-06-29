/* src/RecipeSingle.svelte generated by Svelte v3.59.2 */
import {
	SvelteComponentDev,
	add_location,
	append_dev,
	attr_dev,
	create_component,
	destroy_component,
	detach_dev,
	dispatch_dev,
	element,
	globals,
	init,
	insert_dev,
	mount_component,
	safe_not_equal,
	set_style,
	space,
	transition_in,
	transition_out,
	validate_slots
} from "./_snowpack/pkg/svelte/internal.js";

const { console: console_1 } = globals;
import RecipeTitle from './RecipeTitle.svelte.js';
import RecipeDetail from './RecipeDetail.svelte.js';
import all_recipes from './recipes.json.proxy.js';
import { onMount as on_mount } from './_snowpack/pkg/svelte.js';
const file = "src/RecipeSingle.svelte";

function create_fragment(ctx) {
	let div2;
	let div0;
	let a;
	let t1;
	let div1;
	let recipetitle;
	let t2;
	let recipedetail;
	let current;

	recipetitle = new RecipeTitle({
			props: { recipe: /*recipe*/ ctx[0] },
			$$inline: true
		});

	recipedetail = new RecipeDetail({
			props: { recipe: /*recipe*/ ctx[0] },
			$$inline: true
		});

	const block = {
		c: function create() {
			div2 = element("div");
			div0 = element("div");
			a = element("a");
			a.textContent = "Back to recipe list";
			t1 = space();
			div1 = element("div");
			create_component(recipetitle.$$.fragment);
			t2 = space();
			create_component(recipedetail.$$.fragment);
			attr_dev(a, "href", "/");
			add_location(a, file, 19, 4, 469);
			add_location(div0, file, 18, 2, 459);
			set_style(div1, "margin", "2em 0");
			add_location(div1, file, 21, 2, 516);
			add_location(div2, file, 17, 0, 451);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div2, anchor);
			append_dev(div2, div0);
			append_dev(div0, a);
			append_dev(div2, t1);
			append_dev(div2, div1);
			mount_component(recipetitle, div1, null);
			append_dev(div2, t2);
			mount_component(recipedetail, div2, null);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const recipetitle_changes = {};
			if (dirty & /*recipe*/ 1) recipetitle_changes.recipe = /*recipe*/ ctx[0];
			recipetitle.$set(recipetitle_changes);
			const recipedetail_changes = {};
			if (dirty & /*recipe*/ 1) recipedetail_changes.recipe = /*recipe*/ ctx[0];
			recipedetail.$set(recipedetail_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(recipetitle.$$.fragment, local);
			transition_in(recipedetail.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(recipetitle.$$.fragment, local);
			transition_out(recipedetail.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div2);
			destroy_component(recipetitle);
			destroy_component(recipedetail);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('RecipeSingle', slots, []);
	let { name } = $$props;
	let recipe = null;

	on_mount(async () => {
		console.log('onMount called', name);
		$$invalidate(0, recipe = all_recipes.find(r => r.name == name));
		console.log(`Found: ${recipe}`);
	});

	$$self.$$.on_mount.push(function () {
		if (name === undefined && !('name' in $$props || $$self.$$.bound[$$self.$$.props['name']])) {
			console_1.warn("<RecipeSingle> was created without expected prop 'name'");
		}
	});

	const writable_props = ['name'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<RecipeSingle> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('name' in $$props) $$invalidate(1, name = $$props.name);
	};

	$$self.$capture_state = () => ({
		RecipeTitle,
		RecipeDetail,
		all_recipes,
		on_mount,
		name,
		recipe
	});

	$$self.$inject_state = $$props => {
		if ('name' in $$props) $$invalidate(1, name = $$props.name);
		if ('recipe' in $$props) $$invalidate(0, recipe = $$props.recipe);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [recipe, name];
}

class RecipeSingle extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, { name: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "RecipeSingle",
			options,
			id: create_fragment.name
		});
	}

	get name() {
		throw new Error("<RecipeSingle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set name(value) {
		throw new Error("<RecipeSingle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

export default RecipeSingle;