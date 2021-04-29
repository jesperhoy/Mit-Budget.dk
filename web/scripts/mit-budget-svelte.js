
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
        const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function compute_slots(slots) {
        const result = {};
        for (const key in slots) {
            result[key] = true;
        }
        return result;
    }
    function set_store_value(store, ret, value = ret) {
        store.set(value);
        return ret;
    }
    function action_destroyer(action_result) {
        return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function select_option(select, value) {
        for (let i = 0; i < select.options.length; i += 1) {
            const option = select.options[i];
            if (option.__value === value) {
                option.selected = true;
                return;
            }
        }
    }
    function select_value(select) {
        const selected_option = select.querySelector(':checked') || select.options[0];
        return selected_option && selected_option.__value;
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }
    class HtmlTag {
        constructor(anchor = null) {
            this.a = anchor;
            this.e = this.n = null;
        }
        m(html, target, anchor = null) {
            if (!this.e) {
                this.e = element(target.nodeName);
                this.t = target;
                this.h(html);
            }
            this.i(anchor);
        }
        h(html) {
            this.e.innerHTML = html;
            this.n = Array.from(this.e.childNodes);
        }
        i(anchor) {
            for (let i = 0; i < this.n.length; i += 1) {
                insert(this.t, this.n[i], anchor);
            }
        }
        p(html) {
            this.d();
            this.h(html);
            this.i(this.a);
        }
        d() {
            this.n.forEach(detach);
        }
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : options.context || []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.37.0' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = [];
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (let i = 0; i < subscribers.length; i += 1) {
                        const s = subscribers[i];
                        s[1]();
                        subscriber_queue.push(s, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.push(subscriber);
            if (subscribers.length === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                const index = subscribers.indexOf(subscriber);
                if (index !== -1) {
                    subscribers.splice(index, 1);
                }
                if (subscribers.length === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    let BudgetID=writable(null);
    let Budget=writable(null);
    let OldJSON=writable(null);

    function FormatBeløb(v) {
    	let x = v.toFixed(2).replace('.', ',');
    	let rv = x.substr(x.length - 3);
    	x = x.substr(0, x.length - 3);
    	while (x.length > 4 || (x.length === 4 && x.charAt(0) !== '-')) {
    		rv ='.' + x.substr(x.length - 3) + rv;
    		x = x.substr(0, x.length - 3);
    	}
    	return x + rv;
    }

    function Validity(node, val) {
        if(!!val) node.setCustomValidity(val);
        return {
            update(newVal) {
                node.setCustomValidity(newVal?newVal:'');
            }
        };
    }

    function LavNyt() {
    	return {
    		navn: '',
    		startmåned: (new Date()).getFullYear() + '-' + ((new Date()).getMonth() + 101).toString().substr(1),
    		startsaldo: 0,
    		items: [],
    		nextid: 1,
    	};
    }

    function RndHexStr(length) {
    	let rv='';
    	for (let i = 0; i < length; i++) {
    		rv += Math.floor(Math.random() * 16).toString(16);
    	 }
    	return rv; 
    }

    /* src\JH\FormField.svelte generated by Svelte v3.37.0 */

    const file$8 = "src\\JH\\FormField.svelte";

    // (5:6) {:else}
    function create_else_block$5(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*label*/ ctx[1]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*label*/ 2) set_data_dev(t, /*label*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$5.name,
    		type: "else",
    		source: "(5:6) {:else}",
    		ctx
    	});

    	return block;
    }

    // (3:6) {#if labelfor}
    function create_if_block$5(ctx) {
    	let label_1;
    	let t;

    	const block = {
    		c: function create() {
    			label_1 = element("label");
    			t = text(/*label*/ ctx[1]);
    			attr_dev(label_1, "for", /*labelfor*/ ctx[0]);
    			attr_dev(label_1, "class", "form-label");
    			add_location(label_1, file$8, 3, 6, 74);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label_1, anchor);
    			append_dev(label_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*label*/ 2) set_data_dev(t, /*label*/ ctx[1]);

    			if (dirty & /*labelfor*/ 1) {
    				attr_dev(label_1, "for", /*labelfor*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$5.name,
    		type: "if",
    		source: "(3:6) {#if labelfor}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$8(ctx) {
    	let div2;
    	let div0;
    	let div0_class_value;
    	let t;
    	let div1;
    	let div1_class_value;
    	let current;

    	function select_block_type(ctx, dirty) {
    		if (/*labelfor*/ ctx[0]) return create_if_block$5;
    		return create_else_block$5;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);
    	const default_slot_template = /*#slots*/ ctx[5].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			if_block.c();
    			t = space();
    			div1 = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div0, "class", div0_class_value = /*labeltop*/ ctx[2] ? "top" : null);
    			add_location(div0, file$8, 1, 4, 11);
    			attr_dev(div1, "class", div1_class_value = /*contenttop*/ ctx[3] ? "top" : null);
    			add_location(div1, file$8, 8, 4, 194);
    			add_location(div2, file$8, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			if_block.m(div0, null);
    			append_dev(div2, t);
    			append_dev(div2, div1);

    			if (default_slot) {
    				default_slot.m(div1, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(div0, null);
    				}
    			}

    			if (!current || dirty & /*labeltop*/ 4 && div0_class_value !== (div0_class_value = /*labeltop*/ ctx[2] ? "top" : null)) {
    				attr_dev(div0, "class", div0_class_value);
    			}

    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 16) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[4], dirty, null, null);
    				}
    			}

    			if (!current || dirty & /*contenttop*/ 8 && div1_class_value !== (div1_class_value = /*contenttop*/ ctx[3] ? "top" : null)) {
    				attr_dev(div1, "class", div1_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			if_block.d();
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("FormField", slots, ['default']);
    	let { labelfor = null } = $$props;
    	let { label = "" } = $$props;
    	let { labeltop = false } = $$props;
    	let { contenttop = false } = $$props;
    	const writable_props = ["labelfor", "label", "labeltop", "contenttop"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<FormField> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("labelfor" in $$props) $$invalidate(0, labelfor = $$props.labelfor);
    		if ("label" in $$props) $$invalidate(1, label = $$props.label);
    		if ("labeltop" in $$props) $$invalidate(2, labeltop = $$props.labeltop);
    		if ("contenttop" in $$props) $$invalidate(3, contenttop = $$props.contenttop);
    		if ("$$scope" in $$props) $$invalidate(4, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ labelfor, label, labeltop, contenttop });

    	$$self.$inject_state = $$props => {
    		if ("labelfor" in $$props) $$invalidate(0, labelfor = $$props.labelfor);
    		if ("label" in $$props) $$invalidate(1, label = $$props.label);
    		if ("labeltop" in $$props) $$invalidate(2, labeltop = $$props.labeltop);
    		if ("contenttop" in $$props) $$invalidate(3, contenttop = $$props.contenttop);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [labelfor, label, labeltop, contenttop, $$scope, slots];
    }

    class FormField extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {
    			labelfor: 0,
    			label: 1,
    			labeltop: 2,
    			contenttop: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "FormField",
    			options,
    			id: create_fragment$8.name
    		});
    	}

    	get labelfor() {
    		throw new Error("<FormField>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set labelfor(value) {
    		throw new Error("<FormField>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get label() {
    		throw new Error("<FormField>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set label(value) {
    		throw new Error("<FormField>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get labeltop() {
    		throw new Error("<FormField>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set labeltop(value) {
    		throw new Error("<FormField>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get contenttop() {
    		throw new Error("<FormField>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set contenttop(value) {
    		throw new Error("<FormField>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\Amount.svelte generated by Svelte v3.37.0 */
    const file$7 = "src\\Amount.svelte";

    function create_fragment$7(ctx) {
    	let input;
    	let input_style_value;
    	let Validity_action;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			input = element("input");
    			attr_dev(input, "type", "text");
    			input.value = /*DispVal*/ ctx[5];
    			attr_dev(input, "style", input_style_value = "text-align:right;max-width:125px;" + /*style*/ ctx[1]);
    			attr_dev(input, "class", "form-control");
    			input.required = /*required*/ ctx[2];
    			attr_dev(input, "id", /*id*/ ctx[3]);
    			add_location(input, file$7, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			/*input_binding*/ ctx[9](input);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "input", /*input_handler*/ ctx[10], false, false, false),
    					listen_dev(input, "change", /*change_handler*/ ctx[11], false, false, false),
    					action_destroyer(Validity_action = Validity.call(null, input, /*IsValid*/ ctx[6]
    					? /*validity*/ ctx[0]
    					: "Ugyldig værdi"))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*DispVal*/ 32 && input.value !== /*DispVal*/ ctx[5]) {
    				prop_dev(input, "value", /*DispVal*/ ctx[5]);
    			}

    			if (dirty & /*style*/ 2 && input_style_value !== (input_style_value = "text-align:right;max-width:125px;" + /*style*/ ctx[1])) {
    				attr_dev(input, "style", input_style_value);
    			}

    			if (dirty & /*required*/ 4) {
    				prop_dev(input, "required", /*required*/ ctx[2]);
    			}

    			if (dirty & /*id*/ 8) {
    				attr_dev(input, "id", /*id*/ ctx[3]);
    			}

    			if (Validity_action && is_function(Validity_action.update) && dirty & /*IsValid, validity*/ 65) Validity_action.update.call(null, /*IsValid*/ ctx[6]
    			? /*validity*/ ctx[0]
    			: "Ugyldig værdi");
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			/*input_binding*/ ctx[9](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Amount", slots, []);
    	let { value = 0 } = $$props;
    	let { validity = "" } = $$props;
    	let { style = "" } = $$props;
    	let { required = false } = $$props;
    	let { id = null } = $$props;
    	let el;
    	let myval = 0;
    	let DispVal = "";
    	let IsValid = true;

    	function Input(changed) {
    		let vs = el.value.split(".").join("").split(",").join(".").split(" ").join("");
    		let v = vs === "" ? 0 : Math.round(parseFloat(vs) * 100) / 100;

    		if (isNaN(v)) {
    			if (changed) $$invalidate(6, IsValid = false);
    			return;
    		}

    		$$invalidate(6, IsValid = true);
    		myval = v;
    		$$invalidate(8, value = v);
    		if (changed) $$invalidate(5, DispVal = myval === 0 ? "" : FormatBeløb(myval));
    	}

    	function ValueUpdated() {
    		if (value === myval) return;
    		myval = value;
    		$$invalidate(5, DispVal = myval === 0 ? "" : FormatBeløb(myval));
    	}

    	const writable_props = ["value", "validity", "style", "required", "id"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Amount> was created with unknown prop '${key}'`);
    	});

    	function input_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			el = $$value;
    			$$invalidate(4, el);
    		});
    	}

    	const input_handler = () => Input(false);
    	const change_handler = () => Input(true);

    	$$self.$$set = $$props => {
    		if ("value" in $$props) $$invalidate(8, value = $$props.value);
    		if ("validity" in $$props) $$invalidate(0, validity = $$props.validity);
    		if ("style" in $$props) $$invalidate(1, style = $$props.style);
    		if ("required" in $$props) $$invalidate(2, required = $$props.required);
    		if ("id" in $$props) $$invalidate(3, id = $$props.id);
    	};

    	$$self.$capture_state = () => ({
    		FormatBeløb,
    		Validity,
    		value,
    		validity,
    		style,
    		required,
    		id,
    		el,
    		myval,
    		DispVal,
    		IsValid,
    		Input,
    		ValueUpdated
    	});

    	$$self.$inject_state = $$props => {
    		if ("value" in $$props) $$invalidate(8, value = $$props.value);
    		if ("validity" in $$props) $$invalidate(0, validity = $$props.validity);
    		if ("style" in $$props) $$invalidate(1, style = $$props.style);
    		if ("required" in $$props) $$invalidate(2, required = $$props.required);
    		if ("id" in $$props) $$invalidate(3, id = $$props.id);
    		if ("el" in $$props) $$invalidate(4, el = $$props.el);
    		if ("myval" in $$props) myval = $$props.myval;
    		if ("DispVal" in $$props) $$invalidate(5, DispVal = $$props.DispVal);
    		if ("IsValid" in $$props) $$invalidate(6, IsValid = $$props.IsValid);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*value*/ 256) {
    			(ValueUpdated());
    		}
    	};

    	return [
    		validity,
    		style,
    		required,
    		id,
    		el,
    		DispVal,
    		IsValid,
    		Input,
    		value,
    		input_binding,
    		input_handler,
    		change_handler
    	];
    }

    class Amount extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {
    			value: 8,
    			validity: 0,
    			style: 1,
    			required: 2,
    			id: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Amount",
    			options,
    			id: create_fragment$7.name
    		});
    	}

    	get value() {
    		throw new Error("<Amount>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Amount>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get validity() {
    		throw new Error("<Amount>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set validity(value) {
    		throw new Error("<Amount>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<Amount>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<Amount>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get required() {
    		throw new Error("<Amount>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set required(value) {
    		throw new Error("<Amount>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get id() {
    		throw new Error("<Amount>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<Amount>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\Icon.svelte generated by Svelte v3.37.0 */

    const file$6 = "src\\Icon.svelte";

    // (27:0) {:else}
    function create_else_block$4(ctx) {
    	let div;
    	let t0;
    	let t1_value = { name: /*name*/ ctx[0] } + "";
    	let t1;
    	let t2;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t0 = text("Icon name '");
    			t1 = text(t1_value);
    			t2 = text("' not found");
    			attr_dev(div, "class", "icon");
    			add_location(div, file$6, 27, 0, 6590);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t0);
    			append_dev(div, t1);
    			append_dev(div, t2);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*name*/ 1 && t1_value !== (t1_value = { name: /*name*/ ctx[0] } + "")) set_data_dev(t1, t1_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$4.name,
    		type: "else",
    		source: "(27:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (25:24) 
    function create_if_block_12(ctx) {
    	let svg;
    	let path0;
    	let path1;
    	let path2;
    	let path3;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			path0 = svg_element("path");
    			path1 = svg_element("path");
    			path2 = svg_element("path");
    			path3 = svg_element("path");
    			attr_dev(path0, "d", "M248 64C146.39 64 64 146.39 64 248s82.39 184 184 184 184-82.39 184-184S349.61 64 248 64z");
    			attr_dev(path0, "fill", "none");
    			attr_dev(path0, "stroke", "currentColor");
    			attr_dev(path0, "stroke-miterlimit", "10");
    			attr_dev(path0, "stroke-width", "32");
    			add_location(path0, file$6, 25, 75, 6093);
    			attr_dev(path1, "fill", "none");
    			attr_dev(path1, "stroke", "currentColor");
    			attr_dev(path1, "stroke-linecap", "round");
    			attr_dev(path1, "stroke-linejoin", "round");
    			attr_dev(path1, "stroke-width", "32");
    			attr_dev(path1, "d", "M220 220h32v116");
    			add_location(path1, file$6, 25, 251, 6269);
    			attr_dev(path2, "fill", "none");
    			attr_dev(path2, "stroke", "currentColor");
    			attr_dev(path2, "stroke-linecap", "round");
    			attr_dev(path2, "stroke-miterlimit", "10");
    			attr_dev(path2, "stroke-width", "32");
    			attr_dev(path2, "d", "M208 340h88");
    			add_location(path2, file$6, 25, 378, 6396);
    			attr_dev(path3, "d", "M248 130a26 26 0 1026 26 26 26 0 00-26-26z");
    			add_location(path3, file$6, 25, 500, 6518);
    			attr_dev(svg, "class", "icon");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "viewBox", "0 0 512 512");
    			add_location(svg, file$6, 25, 0, 6018);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, path0);
    			append_dev(svg, path1);
    			append_dev(svg, path2);
    			append_dev(svg, path3);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_12.name,
    		type: "if",
    		source: "(25:24) ",
    		ctx
    	});

    	return block;
    }

    // (23:27) 
    function create_if_block_11(ctx) {
    	let svg;
    	let path0;
    	let path1;
    	let path2;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			path0 = svg_element("path");
    			path1 = svg_element("path");
    			path2 = svg_element("path");
    			attr_dev(path0, "d", "M85.57 446.25h340.86a32 32 0 0028.17-47.17L284.18 82.58c-12.09-22.44-44.27-22.44-56.36 0L57.4 399.08a32 32 0 0028.17 47.17z");
    			attr_dev(path0, "fill", "none");
    			attr_dev(path0, "stroke", "currentColor");
    			attr_dev(path0, "stroke-linecap", "round");
    			attr_dev(path0, "stroke-linejoin", "round");
    			attr_dev(path0, "stroke-width", "32");
    			add_location(path0, file$6, 23, 75, 5494);
    			attr_dev(path1, "d", "M250.26 195.39l5.74 122 5.73-121.95a5.74 5.74 0 00-5.79-6h0a5.74 5.74 0 00-5.68 5.95z");
    			attr_dev(path1, "fill", "none");
    			attr_dev(path1, "stroke", "currentColor");
    			attr_dev(path1, "stroke-linecap", "round");
    			attr_dev(path1, "stroke-linejoin", "round");
    			attr_dev(path1, "stroke-width", "32");
    			add_location(path1, file$6, 23, 310, 5729);
    			attr_dev(path2, "d", "M256 397.25a20 20 0 1120-20 20 20 0 01-20 20z");
    			add_location(path2, file$6, 23, 507, 5926);
    			attr_dev(svg, "class", "icon");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "viewBox", "0 0 512 512");
    			add_location(svg, file$6, 23, 0, 5419);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, path0);
    			append_dev(svg, path1);
    			append_dev(svg, path2);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_11.name,
    		type: "if",
    		source: "(23:27) ",
    		ctx
    	});

    	return block;
    }

    // (21:24) 
    function create_if_block_10(ctx) {
    	let svg;
    	let rect;
    	let path;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			rect = svg_element("rect");
    			path = svg_element("path");
    			attr_dev(rect, "x", "128");
    			attr_dev(rect, "y", "128");
    			attr_dev(rect, "width", "336");
    			attr_dev(rect, "height", "336");
    			attr_dev(rect, "rx", "57");
    			attr_dev(rect, "ry", "57");
    			attr_dev(rect, "fill", "none");
    			attr_dev(rect, "stroke", "currentColor");
    			attr_dev(rect, "stroke-linejoin", "round");
    			attr_dev(rect, "stroke-width", "32");
    			add_location(rect, file$6, 21, 75, 5034);
    			attr_dev(path, "d", "M383.5 128l.5-24a56.16 56.16 0 00-56-56H112a64.19 64.19 0 00-64 64v216a56.16 56.16 0 0056 56h24");
    			attr_dev(path, "fill", "none");
    			attr_dev(path, "stroke", "currentColor");
    			attr_dev(path, "stroke-linecap", "round");
    			attr_dev(path, "stroke-linejoin", "round");
    			attr_dev(path, "stroke-width", "32");
    			add_location(path, file$6, 21, 216, 5175);
    			attr_dev(svg, "class", "icon");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "viewBox", "0 0 512 512");
    			add_location(svg, file$6, 21, 0, 4959);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, rect);
    			append_dev(svg, path);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_10.name,
    		type: "if",
    		source: "(21:24) ",
    		ctx
    	});

    	return block;
    }

    // (19:25) 
    function create_if_block_9(ctx) {
    	let svg;
    	let circle0;
    	let circle1;
    	let circle2;
    	let path;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			circle0 = svg_element("circle");
    			circle1 = svg_element("circle");
    			circle2 = svg_element("circle");
    			path = svg_element("path");
    			attr_dev(circle0, "cx", "128");
    			attr_dev(circle0, "cy", "256");
    			attr_dev(circle0, "r", "48");
    			attr_dev(circle0, "fill", "none");
    			attr_dev(circle0, "stroke", "currentColor");
    			attr_dev(circle0, "stroke-linecap", "round");
    			attr_dev(circle0, "stroke-linejoin", "round");
    			attr_dev(circle0, "stroke-width", "32");
    			add_location(circle0, file$6, 19, 75, 4356);
    			attr_dev(circle1, "cx", "384");
    			attr_dev(circle1, "cy", "112");
    			attr_dev(circle1, "r", "48");
    			attr_dev(circle1, "fill", "none");
    			attr_dev(circle1, "stroke", "currentColor");
    			attr_dev(circle1, "stroke-linecap", "round");
    			attr_dev(circle1, "stroke-linejoin", "round");
    			attr_dev(circle1, "stroke-width", "32");
    			add_location(circle1, file$6, 19, 209, 4490);
    			attr_dev(circle2, "cx", "384");
    			attr_dev(circle2, "cy", "400");
    			attr_dev(circle2, "r", "48");
    			attr_dev(circle2, "fill", "none");
    			attr_dev(circle2, "stroke", "currentColor");
    			attr_dev(circle2, "stroke-linecap", "round");
    			attr_dev(circle2, "stroke-linejoin", "round");
    			attr_dev(circle2, "stroke-width", "32");
    			add_location(circle2, file$6, 19, 343, 4624);
    			attr_dev(path, "fill", "none");
    			attr_dev(path, "stroke", "currentColor");
    			attr_dev(path, "stroke-linecap", "round");
    			attr_dev(path, "stroke-linejoin", "round");
    			attr_dev(path, "stroke-width", "32");
    			attr_dev(path, "d", "M169.83 279.53l172.34 96.94M342.17 135.53l-172.34 96.94");
    			add_location(path, file$6, 19, 477, 4758);
    			attr_dev(svg, "class", "icon");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "viewBox", "0 0 512 512");
    			add_location(svg, file$6, 19, 0, 4281);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, circle0);
    			append_dev(svg, circle1);
    			append_dev(svg, circle2);
    			append_dev(svg, path);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_9.name,
    		type: "if",
    		source: "(19:25) ",
    		ctx
    	});

    	return block;
    }

    // (17:23) 
    function create_if_block_8$1(ctx) {
    	let svg;
    	let path0;
    	let path1;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			path0 = svg_element("path");
    			path1 = svg_element("path");
    			attr_dev(path0, "d", "M416 221.25V416a48 48 0 01-48 48H144a48 48 0 01-48-48V96a48 48 0 0148-48h98.75a32 32 0 0122.62 9.37l141.26 141.26a32 32 0 019.37 22.62z");
    			attr_dev(path0, "fill", "none");
    			attr_dev(path0, "stroke", "currentColor");
    			attr_dev(path0, "stroke-linejoin", "round");
    			attr_dev(path0, "stroke-width", "32");
    			add_location(path0, file$6, 17, 75, 3879);
    			attr_dev(path1, "d", "M256 56v120a32 32 0 0032 32h120");
    			attr_dev(path1, "fill", "none");
    			attr_dev(path1, "stroke", "currentColor");
    			attr_dev(path1, "stroke-linecap", "round");
    			attr_dev(path1, "stroke-linejoin", "round");
    			attr_dev(path1, "stroke-width", "32");
    			add_location(path1, file$6, 17, 299, 4103);
    			attr_dev(svg, "class", "icon");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "viewBox", "0 0 512 512");
    			add_location(svg, file$6, 17, 0, 3804);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, path0);
    			append_dev(svg, path1);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_8$1.name,
    		type: "if",
    		source: "(17:23) ",
    		ctx
    	});

    	return block;
    }

    // (15:24) 
    function create_if_block_7$1(ctx) {
    	let svg;
    	let path0;
    	let path1;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			path0 = svg_element("path");
    			path1 = svg_element("path");
    			attr_dev(path0, "d", "M64 192v-72a40 40 0 0140-40h75.89a40 40 0 0122.19 6.72l27.84 18.56a40 40 0 0022.19 6.72H408a40 40 0 0140 40v40");
    			attr_dev(path0, "fill", "none");
    			attr_dev(path0, "stroke", "currentColor");
    			attr_dev(path0, "stroke-linecap", "round");
    			attr_dev(path0, "stroke-linejoin", "round");
    			attr_dev(path0, "stroke-width", "32");
    			add_location(path0, file$6, 15, 75, 3310);
    			attr_dev(path1, "d", "M479.9 226.55L463.68 392a40 40 0 01-39.93 40H88.25a40 40 0 01-39.93-40L32.1 226.55A32 32 0 0164 192h384.1a32 32 0 0131.8 34.55z");
    			attr_dev(path1, "fill", "none");
    			attr_dev(path1, "stroke", "currentColor");
    			attr_dev(path1, "stroke-linecap", "round");
    			attr_dev(path1, "stroke-linejoin", "round");
    			attr_dev(path1, "stroke-width", "32");
    			add_location(path1, file$6, 15, 297, 3532);
    			attr_dev(svg, "class", "icon");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "viewBox", "0 0 512 512");
    			add_location(svg, file$6, 15, 0, 3235);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, path0);
    			append_dev(svg, path1);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_7$1.name,
    		type: "if",
    		source: "(15:24) ",
    		ctx
    	});

    	return block;
    }

    // (13:24) 
    function create_if_block_6$1(ctx) {
    	let svg;
    	let path;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			path = svg_element("path");
    			attr_dev(path, "d", "M380.93 57.37A32 32 0 00358.3 48H94.22A46.21 46.21 0 0048 94.22v323.56A46.21 46.21 0 0094.22 464h323.56A46.36 46.36 0 00464 417.78V153.7a32 32 0 00-9.37-22.63zM256 416a64 64 0 1164-64 63.92 63.92 0 01-64 64zm48-224H112a16 16 0 01-16-16v-64a16 16 0 0116-16h192a16 16 0 0116 16v64a16 16 0 01-16 16z");
    			attr_dev(path, "fill", "none");
    			attr_dev(path, "stroke", "currentColor");
    			attr_dev(path, "stroke-linecap", "round");
    			attr_dev(path, "stroke-linejoin", "round");
    			attr_dev(path, "stroke-width", "32");
    			add_location(path, file$6, 13, 75, 2793);
    			attr_dev(svg, "class", "icon");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "viewBox", "0 0 512 512");
    			add_location(svg, file$6, 13, 0, 2718);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, path);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_6$1.name,
    		type: "if",
    		source: "(13:24) ",
    		ctx
    	});

    	return block;
    }

    // (11:26) 
    function create_if_block_5$1(ctx) {
    	let svg;
    	let path0;
    	let path1;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			path0 = svg_element("path");
    			path1 = svg_element("path");
    			attr_dev(path0, "d", "M320 367.79h76c55 0 100-29.21 100-83.6s-53-81.47-96-83.6c-8.89-85.06-71-136.8-144-136.8-69 0-113.44 45.79-128 91.2-60 5.7-112 43.88-112 106.4s54 106.4 120 106.4h56");
    			attr_dev(path0, "fill", "none");
    			attr_dev(path0, "stroke", "currentColor");
    			attr_dev(path0, "stroke-linecap", "round");
    			attr_dev(path0, "stroke-linejoin", "round");
    			attr_dev(path0, "stroke-width", "32");
    			add_location(path0, file$6, 11, 75, 2255);
    			attr_dev(path1, "fill", "none");
    			attr_dev(path1, "stroke", "currentColor");
    			attr_dev(path1, "stroke-linecap", "round");
    			attr_dev(path1, "stroke-linejoin", "round");
    			attr_dev(path1, "stroke-width", "32");
    			attr_dev(path1, "d", "M320 255.79l-64-64-64 64M256 448.21V207.79");
    			add_location(path1, file$6, 11, 350, 2530);
    			attr_dev(svg, "class", "icon");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "viewBox", "0 0 512 512");
    			add_location(svg, file$6, 11, 0, 2180);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, path0);
    			append_dev(svg, path1);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5$1.name,
    		type: "if",
    		source: "(11:26) ",
    		ctx
    	});

    	return block;
    }

    // (9:28) 
    function create_if_block_4$2(ctx) {
    	let svg;
    	let path;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			path = svg_element("path");
    			attr_dev(path, "d", "M320 336h76c55 0 100-21.21 100-75.6s-53-73.47-96-75.6C391.11 99.74 329 48 256 48c-69 0-113.44 45.79-128 91.2-60 5.7-112 35.88-112 98.4S70 336 136 336h56M192 400.1l64 63.9 64-63.9M256 224v224.03");
    			attr_dev(path, "fill", "none");
    			attr_dev(path, "stroke", "currentColor");
    			attr_dev(path, "stroke-linecap", "round");
    			attr_dev(path, "stroke-linejoin", "round");
    			attr_dev(path, "stroke-width", "32");
    			add_location(path, file$6, 9, 75, 1839);
    			attr_dev(svg, "class", "icon");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "viewBox", "0 0 512 512");
    			add_location(svg, file$6, 9, 0, 1764);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, path);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4$2.name,
    		type: "if",
    		source: "(9:28) ",
    		ctx
    	});

    	return block;
    }

    // (7:25) 
    function create_if_block_3$2(ctx) {
    	let svg;
    	let path0;
    	let path1;
    	let path2;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			path0 = svg_element("path");
    			path1 = svg_element("path");
    			path2 = svg_element("path");
    			attr_dev(path0, "d", "M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320");
    			attr_dev(path0, "fill", "none");
    			attr_dev(path0, "stroke", "currentColor");
    			attr_dev(path0, "stroke-linecap", "round");
    			attr_dev(path0, "stroke-linejoin", "round");
    			attr_dev(path0, "stroke-width", "32");
    			add_location(path0, file$6, 7, 75, 1210);
    			attr_dev(path1, "stroke", "currentColor");
    			attr_dev(path1, "stroke-linecap", "round");
    			attr_dev(path1, "stroke-miterlimit", "10");
    			attr_dev(path1, "stroke-width", "32");
    			attr_dev(path1, "d", "M80 112h352");
    			add_location(path1, file$6, 7, 263, 1398);
    			attr_dev(path2, "d", "M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224");
    			attr_dev(path2, "fill", "none");
    			attr_dev(path2, "stroke", "currentColor");
    			attr_dev(path2, "stroke-linecap", "round");
    			attr_dev(path2, "stroke-linejoin", "round");
    			attr_dev(path2, "stroke-width", "32");
    			add_location(path2, file$6, 7, 373, 1508);
    			attr_dev(svg, "class", "icon");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "viewBox", "0 0 512 512");
    			add_location(svg, file$6, 7, 0, 1135);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, path0);
    			append_dev(svg, path1);
    			append_dev(svg, path2);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3$2.name,
    		type: "if",
    		source: "(7:25) ",
    		ctx
    	});

    	return block;
    }

    // (5:24) 
    function create_if_block_2$2(ctx) {
    	let svg;
    	let path0;
    	let path1;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			path0 = svg_element("path");
    			path1 = svg_element("path");
    			attr_dev(path0, "d", "M384 224v184a40 40 0 01-40 40H104a40 40 0 01-40-40V168a40 40 0 0140-40h167.48");
    			attr_dev(path0, "fill", "none");
    			attr_dev(path0, "stroke", "currentColor");
    			attr_dev(path0, "stroke-linecap", "round");
    			attr_dev(path0, "stroke-linejoin", "round");
    			attr_dev(path0, "stroke-width", "32");
    			add_location(path0, file$6, 5, 75, 585);
    			attr_dev(path1, "d", "M459.94 53.25a16.06 16.06 0 00-23.22-.56L424.35 65a8 8 0 000 11.31l11.34 11.32a8 8 0 0011.34 0l12.06-12c6.1-6.09 6.67-16.01.85-22.38zM399.34 90L218.82 270.2a9 9 0 00-2.31 3.93L208.16 299a3.91 3.91 0 004.86 4.86l24.85-8.35a9 9 0 003.93-2.31L422 112.66a9 9 0 000-12.66l-9.95-10a9 9 0 00-12.71 0z");
    			attr_dev(path1, "fill", "currentColor");
    			add_location(path1, file$6, 5, 264, 774);
    			attr_dev(svg, "class", "icon");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "viewBox", "0 0 512 512");
    			add_location(svg, file$6, 5, 0, 510);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, path0);
    			append_dev(svg, path1);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$2.name,
    		type: "if",
    		source: "(5:24) ",
    		ctx
    	});

    	return block;
    }

    // (3:25) 
    function create_if_block_1$3(ctx) {
    	let svg;
    	let path;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			path = svg_element("path");
    			attr_dev(path, "fill", "none");
    			attr_dev(path, "stroke", "currentColor");
    			attr_dev(path, "stroke-linecap", "round");
    			attr_dev(path, "stroke-linejoin", "round");
    			attr_dev(path, "stroke-width", "32");
    			attr_dev(path, "d", "M416 128L192 384l-96-96");
    			add_location(path, file$6, 3, 75, 341);
    			attr_dev(svg, "class", "icon");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "viewBox", "0 0 512 512");
    			add_location(svg, file$6, 3, 0, 266);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, path);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$3.name,
    		type: "if",
    		source: "(3:25) ",
    		ctx
    	});

    	return block;
    }

    // (1:0) {#if name==='add'}
    function create_if_block$4(ctx) {
    	let svg;
    	let path;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			path = svg_element("path");
    			attr_dev(path, "fill", "none");
    			attr_dev(path, "stroke", "currentColor");
    			attr_dev(path, "stroke-linecap", "round");
    			attr_dev(path, "stroke-linejoin", "round");
    			attr_dev(path, "stroke-width", "32");
    			attr_dev(path, "d", "M256 112v288M400 256H112");
    			add_location(path, file$6, 1, 75, 95);
    			attr_dev(svg, "class", "icon");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "viewBox", "0 0 512 512");
    			add_location(svg, file$6, 1, 0, 20);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, path);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(1:0) {#if name==='add'}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let if_block_anchor;

    	function select_block_type(ctx, dirty) {
    		if (/*name*/ ctx[0] === "add") return create_if_block$4;
    		if (/*name*/ ctx[0] === "check") return create_if_block_1$3;
    		if (/*name*/ ctx[0] === "edit") return create_if_block_2$2;
    		if (/*name*/ ctx[0] === "trash") return create_if_block_3$2;
    		if (/*name*/ ctx[0] === "download") return create_if_block_4$2;
    		if (/*name*/ ctx[0] === "upload") return create_if_block_5$1;
    		if (/*name*/ ctx[0] === "save") return create_if_block_6$1;
    		if (/*name*/ ctx[0] === "open") return create_if_block_7$1;
    		if (/*name*/ ctx[0] === "new") return create_if_block_8$1;
    		if (/*name*/ ctx[0] === "share") return create_if_block_9;
    		if (/*name*/ ctx[0] === "copy") return create_if_block_10;
    		if (/*name*/ ctx[0] === "warning") return create_if_block_11;
    		if (/*name*/ ctx[0] === "info") return create_if_block_12;
    		return create_else_block$4;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Icon", slots, []);
    	let { name = "" } = $$props;
    	const writable_props = ["name"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Icon> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("name" in $$props) $$invalidate(0, name = $$props.name);
    	};

    	$$self.$capture_state = () => ({ name });

    	$$self.$inject_state = $$props => {
    		if ("name" in $$props) $$invalidate(0, name = $$props.name);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [name];
    }

    class Icon extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, { name: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Icon",
    			options,
    			id: create_fragment$6.name
    		});
    	}

    	get name() {
    		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\Bootstrap\Modal.svelte generated by Svelte v3.37.0 */
    const file$5 = "src\\Bootstrap\\Modal.svelte";
    const get_footer_slot_changes = dirty => ({});
    const get_footer_slot_context = ctx => ({});
    const get_header_slot_changes = dirty => ({});
    const get_header_slot_context = ctx => ({});

    // (9:32)               
    function fallback_block(ctx) {
    	let h5;
    	let t;

    	const block = {
    		c: function create() {
    			h5 = element("h5");
    			t = text(/*title*/ ctx[0]);
    			attr_dev(h5, "class", "modal-title");
    			add_location(h5, file$5, 9, 12, 373);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h5, anchor);
    			append_dev(h5, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 1) set_data_dev(t, /*title*/ ctx[0]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h5);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block.name,
    		type: "fallback",
    		source: "(9:32)               ",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let div5;
    	let div4;
    	let div3;
    	let form;
    	let div0;
    	let t0;
    	let button;
    	let t1;
    	let div1;
    	let t2;
    	let div2;
    	let div4_style_value;
    	let div4_class_value;
    	let current;
    	let mounted;
    	let dispose;
    	const header_slot_template = /*#slots*/ ctx[8].header;
    	const header_slot = create_slot(header_slot_template, ctx, /*$$scope*/ ctx[7], get_header_slot_context);
    	const header_slot_or_fallback = header_slot || fallback_block(ctx);
    	const default_slot_template = /*#slots*/ ctx[8].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[7], null);
    	const footer_slot_template = /*#slots*/ ctx[8].footer;
    	const footer_slot = create_slot(footer_slot_template, ctx, /*$$scope*/ ctx[7], get_footer_slot_context);

    	const block = {
    		c: function create() {
    			div5 = element("div");
    			div4 = element("div");
    			div3 = element("div");
    			form = element("form");
    			div0 = element("div");
    			if (header_slot_or_fallback) header_slot_or_fallback.c();
    			t0 = space();
    			button = element("button");
    			t1 = space();
    			div1 = element("div");
    			if (default_slot) default_slot.c();
    			t2 = space();
    			div2 = element("div");
    			if (footer_slot) footer_slot.c();
    			attr_dev(button, "type", "button");
    			attr_dev(button, "class", "btn-close");
    			attr_dev(button, "aria-label", "Close");
    			add_location(button, file$5, 11, 12, 444);
    			attr_dev(div0, "class", "modal-header");
    			add_location(div0, file$5, 7, 8, 299);
    			attr_dev(div1, "class", "modal-body");
    			add_location(div1, file$5, 14, 8, 564);
    			attr_dev(div2, "class", "modal-footer");
    			add_location(div2, file$5, 18, 8, 651);
    			add_location(form, file$5, 5, 8, 231);
    			attr_dev(div3, "class", "modal-content");
    			add_location(div3, file$5, 3, 8, 192);

    			attr_dev(div4, "style", div4_style_value = /*width*/ ctx[2]
    			? "max-width:" + /*width*/ ctx[2]
    			: null);

    			attr_dev(div4, "class", div4_class_value = "modal-dialog modal-dialog-centered" + (/*size*/ ctx[1] === "md"
    			? ""
    			: " modal-" + /*size*/ ctx[1]));

    			add_location(div4, file$5, 1, 4, 59);
    			attr_dev(div5, "class", "modal fade");
    			attr_dev(div5, "tabindex", "-1");
    			add_location(div5, file$5, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div5, anchor);
    			append_dev(div5, div4);
    			append_dev(div4, div3);
    			append_dev(div3, form);
    			append_dev(form, div0);

    			if (header_slot_or_fallback) {
    				header_slot_or_fallback.m(div0, null);
    			}

    			append_dev(div0, t0);
    			append_dev(div0, button);
    			append_dev(form, t1);
    			append_dev(form, div1);

    			if (default_slot) {
    				default_slot.m(div1, null);
    			}

    			append_dev(form, t2);
    			append_dev(form, div2);

    			if (footer_slot) {
    				footer_slot.m(div2, null);
    			}

    			/*div5_binding*/ ctx[10](div5);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(button, "click", /*Hide*/ ctx[3], false, false, false),
    					listen_dev(form, "submit", prevent_default(/*submit_handler*/ ctx[9]), false, true, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (header_slot) {
    				if (header_slot.p && dirty & /*$$scope*/ 128) {
    					update_slot(header_slot, header_slot_template, ctx, /*$$scope*/ ctx[7], dirty, get_header_slot_changes, get_header_slot_context);
    				}
    			} else {
    				if (header_slot_or_fallback && header_slot_or_fallback.p && dirty & /*title*/ 1) {
    					header_slot_or_fallback.p(ctx, dirty);
    				}
    			}

    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 128) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[7], dirty, null, null);
    				}
    			}

    			if (footer_slot) {
    				if (footer_slot.p && dirty & /*$$scope*/ 128) {
    					update_slot(footer_slot, footer_slot_template, ctx, /*$$scope*/ ctx[7], dirty, get_footer_slot_changes, get_footer_slot_context);
    				}
    			}

    			if (!current || dirty & /*width*/ 4 && div4_style_value !== (div4_style_value = /*width*/ ctx[2]
    			? "max-width:" + /*width*/ ctx[2]
    			: null)) {
    				attr_dev(div4, "style", div4_style_value);
    			}

    			if (!current || dirty & /*size*/ 2 && div4_class_value !== (div4_class_value = "modal-dialog modal-dialog-centered" + (/*size*/ ctx[1] === "md"
    			? ""
    			: " modal-" + /*size*/ ctx[1]))) {
    				attr_dev(div4, "class", div4_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header_slot_or_fallback, local);
    			transition_in(default_slot, local);
    			transition_in(footer_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header_slot_or_fallback, local);
    			transition_out(default_slot, local);
    			transition_out(footer_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div5);
    			if (header_slot_or_fallback) header_slot_or_fallback.d(detaching);
    			if (default_slot) default_slot.d(detaching);
    			if (footer_slot) footer_slot.d(detaching);
    			/*div5_binding*/ ctx[10](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Modal", slots, ['header','default','footer']);
    	let { title = "" } = $$props;
    	let { size = "md" } = $$props; //sm,md,lg,xl
    	let { width = null } = $$props;

    	function Show() {
    		MyModal.show();
    	}

    	function Hide() {
    		MyModal.hide();
    	}

    	const dispatch = createEventDispatcher();
    	let MyModal;
    	let el;

    	onMount(function () {
    		MyModal = new bootstrap.Modal(el);

    		el.addEventListener("shown.bs.modal", function (event) {
    			dispatch("shown");
    		});

    		el.addEventListener("hidden.bs.modal", function (event) {
    			dispatch("hidden");
    		});
    	});

    	const writable_props = ["title", "size", "width"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Modal> was created with unknown prop '${key}'`);
    	});

    	const submit_handler = () => dispatch("submit");

    	function div5_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			el = $$value;
    			$$invalidate(4, el);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ("title" in $$props) $$invalidate(0, title = $$props.title);
    		if ("size" in $$props) $$invalidate(1, size = $$props.size);
    		if ("width" in $$props) $$invalidate(2, width = $$props.width);
    		if ("$$scope" in $$props) $$invalidate(7, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		title,
    		size,
    		width,
    		Show,
    		Hide,
    		onMount,
    		createEventDispatcher,
    		dispatch,
    		MyModal,
    		el
    	});

    	$$self.$inject_state = $$props => {
    		if ("title" in $$props) $$invalidate(0, title = $$props.title);
    		if ("size" in $$props) $$invalidate(1, size = $$props.size);
    		if ("width" in $$props) $$invalidate(2, width = $$props.width);
    		if ("MyModal" in $$props) MyModal = $$props.MyModal;
    		if ("el" in $$props) $$invalidate(4, el = $$props.el);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		title,
    		size,
    		width,
    		Hide,
    		el,
    		dispatch,
    		Show,
    		$$scope,
    		slots,
    		submit_handler,
    		div5_binding
    	];
    }

    class Modal extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {
    			title: 0,
    			size: 1,
    			width: 2,
    			Show: 6,
    			Hide: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Modal",
    			options,
    			id: create_fragment$5.name
    		});
    	}

    	get title() {
    		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get width() {
    		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set width(value) {
    		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get Show() {
    		return this.$$.ctx[6];
    	}

    	set Show(value) {
    		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get Hide() {
    		return this.$$.ctx[3];
    	}

    	set Hide(value) {
    		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\Bootstrap\Radio.svelte generated by Svelte v3.37.0 */
    const file$4 = "src\\Bootstrap\\Radio.svelte";

    function create_fragment$4(ctx) {
    	let div;
    	let input;
    	let t;
    	let label;
    	let div_class_value;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[5].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			input = element("input");
    			t = space();
    			label = element("label");
    			if (default_slot) default_slot.c();
    			input.checked = /*checked*/ ctx[0];
    			attr_dev(input, "class", "form-check-input");
    			attr_dev(input, "type", "radio");
    			attr_dev(input, "id", /*myid*/ ctx[3]);
    			add_location(input, file$4, 1, 4, 65);
    			attr_dev(label, "class", "form-check-label");
    			attr_dev(label, "for", /*myid*/ ctx[3]);
    			add_location(label, file$4, 6, 4, 246);
    			attr_dev(div, "class", div_class_value = "form-check" + (/*inline*/ ctx[1] ? " form-check-inline" : ""));
    			add_location(div, file$4, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, input);
    			append_dev(div, t);
    			append_dev(div, label);

    			if (default_slot) {
    				default_slot.m(label, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(input, "input", /*input_handler*/ ctx[6], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*checked*/ 1) {
    				prop_dev(input, "checked", /*checked*/ ctx[0]);
    			}

    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 16) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[4], dirty, null, null);
    				}
    			}

    			if (!current || dirty & /*inline*/ 2 && div_class_value !== (div_class_value = "form-check" + (/*inline*/ ctx[1] ? " form-check-inline" : ""))) {
    				attr_dev(div, "class", div_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Radio", slots, ['default']);
    	let { inline = false } = $$props;
    	let { checked = false } = $$props;
    	const dispatch = createEventDispatcher();
    	let myid = "radio-" + RndHexStr(16);
    	const writable_props = ["inline", "checked"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Radio> was created with unknown prop '${key}'`);
    	});

    	const input_handler = function () {
    		$$invalidate(0, checked = true);
    		dispatch("input");
    	};

    	$$self.$$set = $$props => {
    		if ("inline" in $$props) $$invalidate(1, inline = $$props.inline);
    		if ("checked" in $$props) $$invalidate(0, checked = $$props.checked);
    		if ("$$scope" in $$props) $$invalidate(4, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		inline,
    		checked,
    		createEventDispatcher,
    		dispatch,
    		RndHexStr,
    		myid
    	});

    	$$self.$inject_state = $$props => {
    		if ("inline" in $$props) $$invalidate(1, inline = $$props.inline);
    		if ("checked" in $$props) $$invalidate(0, checked = $$props.checked);
    		if ("myid" in $$props) $$invalidate(3, myid = $$props.myid);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [checked, inline, dispatch, myid, $$scope, slots, input_handler];
    }

    class Radio extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { inline: 1, checked: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Radio",
    			options,
    			id: create_fragment$4.name
    		});
    	}

    	get inline() {
    		throw new Error("<Radio>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set inline(value) {
    		throw new Error("<Radio>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get checked() {
    		throw new Error("<Radio>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set checked(value) {
    		throw new Error("<Radio>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\Bootstrap\Checkbox.svelte generated by Svelte v3.37.0 */
    const file$3 = "src\\Bootstrap\\Checkbox.svelte";

    // (10:0) {:else}
    function create_else_block$3(ctx) {
    	let input;
    	let Validity_action;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			input = element("input");
    			attr_dev(input, "class", "form-check-input");
    			attr_dev(input, "type", "checkbox");
    			attr_dev(input, "id", /*id*/ ctx[4]);
    			set_style(input, "vertical-align", "baseline");
    			add_location(input, file$3, 10, 0, 388);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			input.checked = /*checked*/ ctx[0];

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "change", /*input_change_handler_1*/ ctx[11]),
    					listen_dev(input, "input", /*input_handler_1*/ ctx[12], false, false, false),
    					action_destroyer(Validity_action = Validity.call(null, input, /*validity*/ ctx[2]))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*id*/ 16) {
    				attr_dev(input, "id", /*id*/ ctx[4]);
    			}

    			if (dirty & /*checked*/ 1) {
    				input.checked = /*checked*/ ctx[0];
    			}

    			if (Validity_action && is_function(Validity_action.update) && dirty & /*validity*/ 4) Validity_action.update.call(null, /*validity*/ ctx[2]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$3.name,
    		type: "else",
    		source: "(10:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (1:0) {#if $$slots.default}
    function create_if_block$3(ctx) {
    	let div;
    	let input;
    	let Validity_action;
    	let t;
    	let label;
    	let div_class_value;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[8].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[7], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			input = element("input");
    			t = space();
    			label = element("label");
    			if (default_slot) default_slot.c();
    			attr_dev(input, "class", "form-check-input");
    			attr_dev(input, "type", "checkbox");
    			attr_dev(input, "id", /*id*/ ctx[4]);
    			add_location(input, file$3, 2, 4, 96);
    			attr_dev(label, "class", "form-check-label");
    			attr_dev(label, "for", /*id*/ ctx[4]);
    			add_location(label, file$3, 7, 4, 307);
    			attr_dev(div, "class", div_class_value = "form-check" + (/*inline*/ ctx[1] ? " form-check-inline" : ""));
    			attr_dev(div, "style", /*style*/ ctx[3]);
    			add_location(div, file$3, 1, 0, 23);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, input);
    			input.checked = /*checked*/ ctx[0];
    			append_dev(div, t);
    			append_dev(div, label);

    			if (default_slot) {
    				default_slot.m(label, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "change", /*input_change_handler*/ ctx[9]),
    					listen_dev(input, "input", /*input_handler*/ ctx[10], false, false, false),
    					action_destroyer(Validity_action = Validity.call(null, input, /*validity*/ ctx[2]))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (!current || dirty & /*id*/ 16) {
    				attr_dev(input, "id", /*id*/ ctx[4]);
    			}

    			if (dirty & /*checked*/ 1) {
    				input.checked = /*checked*/ ctx[0];
    			}

    			if (Validity_action && is_function(Validity_action.update) && dirty & /*validity*/ 4) Validity_action.update.call(null, /*validity*/ ctx[2]);

    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 128) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[7], dirty, null, null);
    				}
    			}

    			if (!current || dirty & /*id*/ 16) {
    				attr_dev(label, "for", /*id*/ ctx[4]);
    			}

    			if (!current || dirty & /*inline*/ 2 && div_class_value !== (div_class_value = "form-check" + (/*inline*/ ctx[1] ? " form-check-inline" : ""))) {
    				attr_dev(div, "class", div_class_value);
    			}

    			if (!current || dirty & /*style*/ 8) {
    				attr_dev(div, "style", /*style*/ ctx[3]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(1:0) {#if $$slots.default}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$3, create_else_block$3];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*$$slots*/ ctx[6].default) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Checkbox", slots, ['default']);
    	const $$slots = compute_slots(slots);
    	const dispatch = createEventDispatcher();
    	let { inline = false } = $$props;
    	let { checked = false } = $$props;
    	let { validity = "" } = $$props;
    	let { style = null } = $$props;
    	let { id = $$slots.default ? "checkbox-" + RndHexStr(16) : null } = $$props;
    	const writable_props = ["inline", "checked", "validity", "style", "id"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Checkbox> was created with unknown prop '${key}'`);
    	});

    	function input_change_handler() {
    		checked = this.checked;
    		$$invalidate(0, checked);
    	}

    	const input_handler = function () {
    		dispatch("input", this.checked);
    	};

    	function input_change_handler_1() {
    		checked = this.checked;
    		$$invalidate(0, checked);
    	}

    	const input_handler_1 = function () {
    		dispatch("input", this.checked);
    	};

    	$$self.$$set = $$props => {
    		if ("inline" in $$props) $$invalidate(1, inline = $$props.inline);
    		if ("checked" in $$props) $$invalidate(0, checked = $$props.checked);
    		if ("validity" in $$props) $$invalidate(2, validity = $$props.validity);
    		if ("style" in $$props) $$invalidate(3, style = $$props.style);
    		if ("id" in $$props) $$invalidate(4, id = $$props.id);
    		if ("$$scope" in $$props) $$invalidate(7, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		Validity,
    		RndHexStr,
    		createEventDispatcher,
    		dispatch,
    		inline,
    		checked,
    		validity,
    		style,
    		id
    	});

    	$$self.$inject_state = $$props => {
    		if ("inline" in $$props) $$invalidate(1, inline = $$props.inline);
    		if ("checked" in $$props) $$invalidate(0, checked = $$props.checked);
    		if ("validity" in $$props) $$invalidate(2, validity = $$props.validity);
    		if ("style" in $$props) $$invalidate(3, style = $$props.style);
    		if ("id" in $$props) $$invalidate(4, id = $$props.id);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		checked,
    		inline,
    		validity,
    		style,
    		id,
    		dispatch,
    		$$slots,
    		$$scope,
    		slots,
    		input_change_handler,
    		input_handler,
    		input_change_handler_1,
    		input_handler_1
    	];
    }

    class Checkbox extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {
    			inline: 1,
    			checked: 0,
    			validity: 2,
    			style: 3,
    			id: 4
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Checkbox",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get inline() {
    		throw new Error("<Checkbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set inline(value) {
    		throw new Error("<Checkbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get checked() {
    		throw new Error("<Checkbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set checked(value) {
    		throw new Error("<Checkbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get validity() {
    		throw new Error("<Checkbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set validity(value) {
    		throw new Error("<Checkbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<Checkbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<Checkbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get id() {
    		throw new Error("<Checkbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<Checkbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\ModalItem.svelte generated by Svelte v3.37.0 */
    const file$2 = "src\\ModalItem.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[22] = list[i];
    	child_ctx[23] = list;
    	child_ctx[24] = i;
    	return child_ctx;
    }

    function get_each_context_1$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[25] = list[i];
    	child_ctx[26] = list;
    	child_ctx[27] = i;
    	return child_ctx;
    }

    function get_each_context_2$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[28] = list[i];
    	child_ctx[29] = list;
    	child_ctx[30] = i;
    	return child_ctx;
    }

    // (4:4) {#if data}
    function create_if_block$2(ctx) {
    	let div;
    	let formfield0;
    	let t0;
    	let formfield1;
    	let t1;
    	let formfield2;
    	let t2;
    	let formfield3;
    	let t3;
    	let t4;
    	let t5;
    	let formfield4;
    	let t6;
    	let formfield5;
    	let current;

    	formfield0 = new FormField({
    			props: {
    				label: "Type",
    				$$slots: { default: [create_default_slot_11] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	formfield1 = new FormField({
    			props: {
    				label: "Beskrivelse",
    				labelfor: "txtBeskriv",
    				$$slots: { default: [create_default_slot_10] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	formfield2 = new FormField({
    			props: {
    				label: "Budgettér med",
    				$$slots: { default: [create_default_slot_7$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	formfield3 = new FormField({
    			props: {
    				label: "Beløb",
    				labeltop: true,
    				labelfor: "amtBeløb",
    				$$slots: { default: [create_default_slot_6$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	let if_block0 = !/*data*/ ctx[0].variabelt && create_if_block_3$1(ctx);
    	let if_block1 = !/*data*/ ctx[0].variabelt && /*data*/ ctx[0].hyppighed === 12 && create_if_block_2$1(ctx);

    	formfield4 = new FormField({
    			props: {
    				label: "Første gang",
    				labelfor: "dtStart",
    				$$slots: { default: [create_default_slot_2$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	formfield5 = new FormField({
    			props: {
    				label: "Slutter",
    				labelfor: "chkSlut",
    				$$slots: { default: [create_default_slot_1$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(formfield0.$$.fragment);
    			t0 = space();
    			create_component(formfield1.$$.fragment);
    			t1 = space();
    			create_component(formfield2.$$.fragment);
    			t2 = space();
    			create_component(formfield3.$$.fragment);
    			t3 = space();
    			if (if_block0) if_block0.c();
    			t4 = space();
    			if (if_block1) if_block1.c();
    			t5 = space();
    			create_component(formfield4.$$.fragment);
    			t6 = space();
    			create_component(formfield5.$$.fragment);
    			attr_dev(div, "class", "form horizontal-sm");
    			add_location(div, file$2, 4, 4, 162);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(formfield0, div, null);
    			append_dev(div, t0);
    			mount_component(formfield1, div, null);
    			append_dev(div, t1);
    			mount_component(formfield2, div, null);
    			append_dev(div, t2);
    			mount_component(formfield3, div, null);
    			append_dev(div, t3);
    			if (if_block0) if_block0.m(div, null);
    			append_dev(div, t4);
    			if (if_block1) if_block1.m(div, null);
    			append_dev(div, t5);
    			mount_component(formfield4, div, null);
    			append_dev(div, t6);
    			mount_component(formfield5, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const formfield0_changes = {};

    			if (dirty[0] & /*data*/ 1 | dirty[1] & /*$$scope*/ 1) {
    				formfield0_changes.$$scope = { dirty, ctx };
    			}

    			formfield0.$set(formfield0_changes);
    			const formfield1_changes = {};

    			if (dirty[0] & /*data*/ 1 | dirty[1] & /*$$scope*/ 1) {
    				formfield1_changes.$$scope = { dirty, ctx };
    			}

    			formfield1.$set(formfield1_changes);
    			const formfield2_changes = {};

    			if (dirty[0] & /*data*/ 1 | dirty[1] & /*$$scope*/ 1) {
    				formfield2_changes.$$scope = { dirty, ctx };
    			}

    			formfield2.$set(formfield2_changes);
    			const formfield3_changes = {};

    			if (dirty[0] & /*data, EtVarBeløbAnført*/ 5 | dirty[1] & /*$$scope*/ 1) {
    				formfield3_changes.$$scope = { dirty, ctx };
    			}

    			formfield3.$set(formfield3_changes);

    			if (!/*data*/ ctx[0].variabelt) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty[0] & /*data*/ 1) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_3$1(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(div, t4);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (!/*data*/ ctx[0].variabelt && /*data*/ ctx[0].hyppighed === 12) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty[0] & /*data*/ 1) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block_2$1(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(div, t5);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			const formfield4_changes = {};

    			if (dirty[0] & /*data*/ 1 | dirty[1] & /*$$scope*/ 1) {
    				formfield4_changes.$$scope = { dirty, ctx };
    			}

    			formfield4.$set(formfield4_changes);
    			const formfield5_changes = {};

    			if (dirty[0] & /*data*/ 1 | dirty[1] & /*$$scope*/ 1) {
    				formfield5_changes.$$scope = { dirty, ctx };
    			}

    			formfield5.$set(formfield5_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(formfield0.$$.fragment, local);
    			transition_in(formfield1.$$.fragment, local);
    			transition_in(formfield2.$$.fragment, local);
    			transition_in(formfield3.$$.fragment, local);
    			transition_in(if_block0);
    			transition_in(if_block1);
    			transition_in(formfield4.$$.fragment, local);
    			transition_in(formfield5.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(formfield0.$$.fragment, local);
    			transition_out(formfield1.$$.fragment, local);
    			transition_out(formfield2.$$.fragment, local);
    			transition_out(formfield3.$$.fragment, local);
    			transition_out(if_block0);
    			transition_out(if_block1);
    			transition_out(formfield4.$$.fragment, local);
    			transition_out(formfield5.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(formfield0);
    			destroy_component(formfield1);
    			destroy_component(formfield2);
    			destroy_component(formfield3);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			destroy_component(formfield4);
    			destroy_component(formfield5);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(4:4) {#if data}",
    		ctx
    	});

    	return block;
    }

    // (7:12) <BSRadio checked={data.udgift} on:input={()=>data.udgift=true} inline>
    function create_default_slot_13(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Udgift");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_13.name,
    		type: "slot",
    		source: "(7:12) <BSRadio checked={data.udgift} on:input={()=>data.udgift=true} inline>",
    		ctx
    	});

    	return block;
    }

    // (9:12) <BSRadio checked={!data.udgift} on:input={()=>data.udgift=false} inline>
    function create_default_slot_12(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Indtægt");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_12.name,
    		type: "slot",
    		source: "(9:12) <BSRadio checked={!data.udgift} on:input={()=>data.udgift=false} inline>",
    		ctx
    	});

    	return block;
    }

    // (6:8) <Formfield label="Type">
    function create_default_slot_11(ctx) {
    	let bsradio0;
    	let t;
    	let bsradio1;
    	let current;

    	bsradio0 = new Radio({
    			props: {
    				checked: /*data*/ ctx[0].udgift,
    				inline: true,
    				$$slots: { default: [create_default_slot_13] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	bsradio0.$on("input", /*input_handler*/ ctx[8]);

    	bsradio1 = new Radio({
    			props: {
    				checked: !/*data*/ ctx[0].udgift,
    				inline: true,
    				$$slots: { default: [create_default_slot_12] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	bsradio1.$on("input", /*input_handler_1*/ ctx[9]);

    	const block = {
    		c: function create() {
    			create_component(bsradio0.$$.fragment);
    			t = text("\r\n             \r\n            ");
    			create_component(bsradio1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(bsradio0, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(bsradio1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const bsradio0_changes = {};
    			if (dirty[0] & /*data*/ 1) bsradio0_changes.checked = /*data*/ ctx[0].udgift;

    			if (dirty[1] & /*$$scope*/ 1) {
    				bsradio0_changes.$$scope = { dirty, ctx };
    			}

    			bsradio0.$set(bsradio0_changes);
    			const bsradio1_changes = {};
    			if (dirty[0] & /*data*/ 1) bsradio1_changes.checked = !/*data*/ ctx[0].udgift;

    			if (dirty[1] & /*$$scope*/ 1) {
    				bsradio1_changes.$$scope = { dirty, ctx };
    			}

    			bsradio1.$set(bsradio1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(bsradio0.$$.fragment, local);
    			transition_in(bsradio1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(bsradio0.$$.fragment, local);
    			transition_out(bsradio1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(bsradio0, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(bsradio1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_11.name,
    		type: "slot",
    		source: "(6:8) <Formfield label=\\\"Type\\\">",
    		ctx
    	});

    	return block;
    }

    // (12:8) <Formfield label="Beskrivelse" labelfor="txtBeskriv">
    function create_default_slot_10(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			input = element("input");
    			attr_dev(input, "type", "text");
    			attr_dev(input, "class", "form-control");
    			input.required = true;
    			attr_dev(input, "id", "txtBeskriv");
    			add_location(input, file$2, 12, 12, 552);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*data*/ ctx[0].beskriv);

    			if (!mounted) {
    				dispose = listen_dev(input, "input", /*input_input_handler*/ ctx[10]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*data*/ 1 && input.value !== /*data*/ ctx[0].beskriv) {
    				set_input_value(input, /*data*/ ctx[0].beskriv);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_10.name,
    		type: "slot",
    		source: "(12:8) <Formfield label=\\\"Beskrivelse\\\" labelfor=\\\"txtBeskriv\\\">",
    		ctx
    	});

    	return block;
    }

    // (22:12) <BSRadio checked={!data.variabelt} on:input={()=>data.variabelt=false} inline>
    function create_default_slot_9(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Et fast beløb");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_9.name,
    		type: "slot",
    		source: "(22:12) <BSRadio checked={!data.variabelt} on:input={()=>data.variabelt=false} inline>",
    		ctx
    	});

    	return block;
    }

    // (24:12) <BSRadio checked={data.variabelt} on:input={()=>data.variabelt=true} inline>
    function create_default_slot_8(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Et variabelt beløb");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_8.name,
    		type: "slot",
    		source: "(24:12) <BSRadio checked={data.variabelt} on:input={()=>data.variabelt=true} inline>",
    		ctx
    	});

    	return block;
    }

    // (21:8) <Formfield label="Budgettér med">
    function create_default_slot_7$1(ctx) {
    	let bsradio0;
    	let t;
    	let bsradio1;
    	let current;

    	bsradio0 = new Radio({
    			props: {
    				checked: !/*data*/ ctx[0].variabelt,
    				inline: true,
    				$$slots: { default: [create_default_slot_9] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	bsradio0.$on("input", /*input_handler_2*/ ctx[11]);

    	bsradio1 = new Radio({
    			props: {
    				checked: /*data*/ ctx[0].variabelt,
    				inline: true,
    				$$slots: { default: [create_default_slot_8] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	bsradio1.$on("input", /*input_handler_3*/ ctx[12]);

    	const block = {
    		c: function create() {
    			create_component(bsradio0.$$.fragment);
    			t = text("\r\n             \r\n            ");
    			create_component(bsradio1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(bsradio0, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(bsradio1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const bsradio0_changes = {};
    			if (dirty[0] & /*data*/ 1) bsradio0_changes.checked = !/*data*/ ctx[0].variabelt;

    			if (dirty[1] & /*$$scope*/ 1) {
    				bsradio0_changes.$$scope = { dirty, ctx };
    			}

    			bsradio0.$set(bsradio0_changes);
    			const bsradio1_changes = {};
    			if (dirty[0] & /*data*/ 1) bsradio1_changes.checked = /*data*/ ctx[0].variabelt;

    			if (dirty[1] & /*$$scope*/ 1) {
    				bsradio1_changes.$$scope = { dirty, ctx };
    			}

    			bsradio1.$set(bsradio1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(bsradio0.$$.fragment, local);
    			transition_in(bsradio1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(bsradio0.$$.fragment, local);
    			transition_out(bsradio1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(bsradio0, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(bsradio1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_7$1.name,
    		type: "slot",
    		source: "(21:8) <Formfield label=\\\"Budgettér med\\\">",
    		ctx
    	});

    	return block;
    }

    // (30:12) {:else}
    function create_else_block$2(ctx) {
    	let div;
    	let current;
    	let each_value_2 = /*MNavn*/ ctx[5];
    	validate_each_argument(each_value_2);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks[i] = create_each_block_2$1(get_each_context_2$1(ctx, each_value_2, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			set_style(div, "margin", "0 -1rem -1rem 0");
    			add_location(div, file$2, 30, 12, 1331);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*EtVarBeløbAnført, data, MNavn*/ 37) {
    				each_value_2 = /*MNavn*/ ctx[5];
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2$1(ctx, each_value_2, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block_2$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
    					}
    				}

    				group_outros();

    				for (i = each_value_2.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_2.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$2.name,
    		type: "else",
    		source: "(30:12) {:else}",
    		ctx
    	});

    	return block;
    }

    // (28:12) {#if !data.variabelt}
    function create_if_block_4$1(ctx) {
    	let amount;
    	let updating_value;
    	let current;

    	function amount_value_binding(value) {
    		/*amount_value_binding*/ ctx[13](value);
    	}

    	let amount_props = { required: true, id: "amtBeløb" };

    	if (/*data*/ ctx[0].fastbeløb !== void 0) {
    		amount_props.value = /*data*/ ctx[0].fastbeløb;
    	}

    	amount = new Amount({ props: amount_props, $$inline: true });
    	binding_callbacks.push(() => bind(amount, "value", amount_value_binding));

    	const block = {
    		c: function create() {
    			create_component(amount.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(amount, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const amount_changes = {};

    			if (!updating_value && dirty[0] & /*data*/ 1) {
    				updating_value = true;
    				amount_changes.value = /*data*/ ctx[0].fastbeløb;
    				add_flush_callback(() => updating_value = false);
    			}

    			amount.$set(amount_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(amount.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(amount.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(amount, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4$1.name,
    		type: "if",
    		source: "(28:12) {#if !data.variabelt}",
    		ctx
    	});

    	return block;
    }

    // (32:16) {#each MNavn as Navn,md}
    function create_each_block_2$1(ctx) {
    	let div;
    	let t0_value = /*MNavn*/ ctx[5][/*md*/ ctx[30]] + "";
    	let t0;
    	let t1;
    	let amount;
    	let updating_value;
    	let t2;
    	let current;

    	function amount_value_binding_1(value) {
    		/*amount_value_binding_1*/ ctx[14](value, /*md*/ ctx[30]);
    	}

    	let amount_props = {
    		validity: /*md*/ ctx[30] === 0 && !/*EtVarBeløbAnført*/ ctx[2]
    		? "Anfør beløb for mindst en måned"
    		: "",
    		style: "display:inline-block;width:7rem;",
    		id: /*md*/ ctx[30] === 0 ? "amtBeløb" : null
    	};

    	if (/*data*/ ctx[0].varbeløb[/*md*/ ctx[30]] !== void 0) {
    		amount_props.value = /*data*/ ctx[0].varbeløb[/*md*/ ctx[30]];
    	}

    	amount = new Amount({ props: amount_props, $$inline: true });
    	binding_callbacks.push(() => bind(amount, "value", amount_value_binding_1));

    	const block = {
    		c: function create() {
    			div = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			create_component(amount.$$.fragment);
    			t2 = space();
    			set_style(div, "text-align", "right");
    			set_style(div, "display", "inline-block");
    			set_style(div, "width", "9.5rem");
    			set_style(div, "margin", "0 1rem 1rem 0");
    			add_location(div, file$2, 32, 16, 1428);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t0);
    			append_dev(div, t1);
    			mount_component(amount, div, null);
    			append_dev(div, t2);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const amount_changes = {};

    			if (dirty[0] & /*EtVarBeløbAnført*/ 4) amount_changes.validity = /*md*/ ctx[30] === 0 && !/*EtVarBeløbAnført*/ ctx[2]
    			? "Anfør beløb for mindst en måned"
    			: "";

    			if (!updating_value && dirty[0] & /*data*/ 1) {
    				updating_value = true;
    				amount_changes.value = /*data*/ ctx[0].varbeløb[/*md*/ ctx[30]];
    				add_flush_callback(() => updating_value = false);
    			}

    			amount.$set(amount_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(amount.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(amount.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(amount);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2$1.name,
    		type: "each",
    		source: "(32:16) {#each MNavn as Navn,md}",
    		ctx
    	});

    	return block;
    }

    // (27:8) <Formfield label="Beløb" labeltop labelfor="amtBeløb">
    function create_default_slot_6$1(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_4$1, create_else_block$2];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (!/*data*/ ctx[0].variabelt) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_6$1.name,
    		type: "slot",
    		source: "(27:8) <Formfield label=\\\"Beløb\\\" labeltop labelfor=\\\"amtBeløb\\\">",
    		ctx
    	});

    	return block;
    }

    // (42:8) {#if !data.variabelt}
    function create_if_block_3$1(ctx) {
    	let formfield;
    	let current;

    	formfield = new FormField({
    			props: {
    				label: "Hyppighed",
    				labelfor: "ddHyp",
    				$$slots: { default: [create_default_slot_5$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(formfield.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(formfield, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const formfield_changes = {};

    			if (dirty[0] & /*data*/ 1 | dirty[1] & /*$$scope*/ 1) {
    				formfield_changes.$$scope = { dirty, ctx };
    			}

    			formfield.$set(formfield_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(formfield.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(formfield.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(formfield, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3$1.name,
    		type: "if",
    		source: "(42:8) {#if !data.variabelt}",
    		ctx
    	});

    	return block;
    }

    // (43:8) <Formfield label="Hyppighed" labelfor="ddHyp">
    function create_default_slot_5$1(ctx) {
    	let select;
    	let option0;
    	let option1;
    	let option2;
    	let option3;
    	let option4;
    	let option5;
    	let option6;
    	let option7;
    	let option8;
    	let option9;
    	let option10;
    	let option11;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			select = element("select");
    			option0 = element("option");
    			option0.textContent = "Ugentlig";
    			option1 = element("option");
    			option1.textContent = "Hver anden uge";
    			option2 = element("option");
    			option2.textContent = "Hver tredje uge";
    			option3 = element("option");
    			option3.textContent = "Hver fjerde uge";
    			option4 = element("option");
    			option4.textContent = "To gange pr. måned";
    			option5 = element("option");
    			option5.textContent = "Månedlig";
    			option6 = element("option");
    			option6.textContent = "Hver anden måned";
    			option7 = element("option");
    			option7.textContent = "Kvartalsvis";
    			option8 = element("option");
    			option8.textContent = "Tre gange årligt";
    			option9 = element("option");
    			option9.textContent = "Halvårligt";
    			option10 = element("option");
    			option10.textContent = "Årligt";
    			option11 = element("option");
    			option11.textContent = "De anførte måneder";
    			option0.__value = 1;
    			option0.value = option0.__value;
    			add_location(option0, file$2, 44, 16, 2063);
    			option1.__value = 2;
    			option1.value = option1.__value;
    			add_location(option1, file$2, 45, 16, 2116);
    			option2.__value = 3;
    			option2.value = option2.__value;
    			add_location(option2, file$2, 46, 16, 2175);
    			option3.__value = 4;
    			option3.value = option3.__value;
    			add_location(option3, file$2, 47, 16, 2235);
    			option4.__value = 5;
    			option4.value = option4.__value;
    			add_location(option4, file$2, 48, 16, 2295);
    			option5.__value = 6;
    			option5.value = option5.__value;
    			add_location(option5, file$2, 49, 16, 2358);
    			option6.__value = 7;
    			option6.value = option6.__value;
    			add_location(option6, file$2, 50, 16, 2411);
    			option7.__value = 8;
    			option7.value = option7.__value;
    			add_location(option7, file$2, 51, 16, 2472);
    			option8.__value = 9;
    			option8.value = option8.__value;
    			add_location(option8, file$2, 52, 16, 2528);
    			option9.__value = 10;
    			option9.value = option9.__value;
    			add_location(option9, file$2, 53, 16, 2589);
    			option10.__value = 11;
    			option10.value = option10.__value;
    			add_location(option10, file$2, 54, 16, 2645);
    			option11.__value = 12;
    			option11.value = option11.__value;
    			add_location(option11, file$2, 55, 16, 2697);
    			attr_dev(select, "class", "form-select");
    			attr_dev(select, "id", "ddHyp");
    			if (/*data*/ ctx[0].hyppighed === void 0) add_render_callback(() => /*select_change_handler*/ ctx[15].call(select));
    			add_location(select, file$2, 43, 12, 1978);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, select, anchor);
    			append_dev(select, option0);
    			append_dev(select, option1);
    			append_dev(select, option2);
    			append_dev(select, option3);
    			append_dev(select, option4);
    			append_dev(select, option5);
    			append_dev(select, option6);
    			append_dev(select, option7);
    			append_dev(select, option8);
    			append_dev(select, option9);
    			append_dev(select, option10);
    			append_dev(select, option11);
    			select_option(select, /*data*/ ctx[0].hyppighed);

    			if (!mounted) {
    				dispose = listen_dev(select, "change", /*select_change_handler*/ ctx[15]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*data*/ 1) {
    				select_option(select, /*data*/ ctx[0].hyppighed);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(select);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5$1.name,
    		type: "slot",
    		source: "(43:8) <Formfield label=\\\"Hyppighed\\\" labelfor=\\\"ddHyp\\\">",
    		ctx
    	});

    	return block;
    }

    // (61:8) {#if !data.variabelt && data.hyppighed===12}
    function create_if_block_2$1(ctx) {
    	let formfield;
    	let current;

    	formfield = new FormField({
    			props: {
    				label: "Betalingsmåneder",
    				labeltop: true,
    				$$slots: { default: [create_default_slot_3$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(formfield.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(formfield, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const formfield_changes = {};

    			if (dirty[0] & /*EnBetalingsMånedValgt, data*/ 9 | dirty[1] & /*$$scope*/ 1) {
    				formfield_changes.$$scope = { dirty, ctx };
    			}

    			formfield.$set(formfield_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(formfield.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(formfield.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(formfield, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(61:8) {#if !data.variabelt && data.hyppighed===12}",
    		ctx
    	});

    	return block;
    }

    // (68:16) <BSCheckbox bind:checked={data.betalingsmåneder[grp*2+grpidx]}                              validity={grp===0 && grpidx===0 && !EnBetalingsMånedValgt ? 'Vælg mindst en måned':''}                              style="width:4rem;margin: 0 1rem 1rem 0"                              inline>
    function create_default_slot_4$1(ctx) {
    	let t_value = /*MNavn*/ ctx[5][/*grp*/ ctx[22] * 2 + /*grpidx*/ ctx[25]] + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4$1.name,
    		type: "slot",
    		source: "(68:16) <BSCheckbox bind:checked={data.betalingsmåneder[grp*2+grpidx]}                              validity={grp===0 && grpidx===0 && !EnBetalingsMånedValgt ? 'Vælg mindst en måned':''}                              style=\\\"width:4rem;margin: 0 1rem 1rem 0\\\"                              inline>",
    		ctx
    	});

    	return block;
    }

    // (67:16) {#each [0,1] as grpidx}
    function create_each_block_1$1(ctx) {
    	let bscheckbox;
    	let updating_checked;
    	let current;

    	function bscheckbox_checked_binding(value) {
    		/*bscheckbox_checked_binding*/ ctx[16](value, /*grp*/ ctx[22], /*grpidx*/ ctx[25]);
    	}

    	let bscheckbox_props = {
    		validity: /*grp*/ ctx[22] === 0 && /*grpidx*/ ctx[25] === 0 && !/*EnBetalingsMånedValgt*/ ctx[3]
    		? "Vælg mindst en måned"
    		: "",
    		style: "width:4rem;margin: 0 1rem 1rem 0",
    		inline: true,
    		$$slots: { default: [create_default_slot_4$1] },
    		$$scope: { ctx }
    	};

    	if (/*data*/ ctx[0].betalingsmåneder[/*grp*/ ctx[22] * 2 + /*grpidx*/ ctx[25]] !== void 0) {
    		bscheckbox_props.checked = /*data*/ ctx[0].betalingsmåneder[/*grp*/ ctx[22] * 2 + /*grpidx*/ ctx[25]];
    	}

    	bscheckbox = new Checkbox({ props: bscheckbox_props, $$inline: true });
    	binding_callbacks.push(() => bind(bscheckbox, "checked", bscheckbox_checked_binding));

    	const block = {
    		c: function create() {
    			create_component(bscheckbox.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(bscheckbox, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const bscheckbox_changes = {};

    			if (dirty[0] & /*EnBetalingsMånedValgt*/ 8) bscheckbox_changes.validity = /*grp*/ ctx[22] === 0 && /*grpidx*/ ctx[25] === 0 && !/*EnBetalingsMånedValgt*/ ctx[3]
    			? "Vælg mindst en måned"
    			: "";

    			if (dirty[1] & /*$$scope*/ 1) {
    				bscheckbox_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_checked && dirty[0] & /*data*/ 1) {
    				updating_checked = true;
    				bscheckbox_changes.checked = /*data*/ ctx[0].betalingsmåneder[/*grp*/ ctx[22] * 2 + /*grpidx*/ ctx[25]];
    				add_flush_callback(() => updating_checked = false);
    			}

    			bscheckbox.$set(bscheckbox_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(bscheckbox.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(bscheckbox.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(bscheckbox, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$1.name,
    		type: "each",
    		source: "(67:16) {#each [0,1] as grpidx}",
    		ctx
    	});

    	return block;
    }

    // (65:16) {#each [0,1,2,3,4,5] as grp}
    function create_each_block$1(ctx) {
    	let div;
    	let t;
    	let current;
    	let each_value_1 = [0, 1];
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < 2; i += 1) {
    		each_blocks[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < 2; i += 1) {
    				each_blocks[i].c();
    			}

    			t = space();
    			set_style(div, "display", "inline-block");
    			add_location(div, file$2, 65, 16, 3130);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < 2; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			append_dev(div, t);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*EnBetalingsMånedValgt, data, MNavn*/ 41) {
    				each_value_1 = [0, 1];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < 2; i += 1) {
    					const child_ctx = get_each_context_1$1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block_1$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, t);
    					}
    				}

    				group_outros();

    				for (i = 2; i < 2; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < 2; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < 2; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(65:16) {#each [0,1,2,3,4,5] as grp}",
    		ctx
    	});

    	return block;
    }

    // (62:8) <Formfield label="Betalingsmåneder" labeltop>
    function create_default_slot_3$1(ctx) {
    	let div;
    	let current;
    	let each_value = [0, 1, 2, 3, 4, 5];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < 6; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < 6; i += 1) {
    				each_blocks[i].c();
    			}

    			set_style(div, "margin", "0 -1rem -1rem 0");
    			add_location(div, file$2, 63, 12, 3029);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < 6; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*EnBetalingsMånedValgt, data, MNavn*/ 41) {
    				each_value = [0, 1, 2, 3, 4, 5];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < 6; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
    					}
    				}

    				group_outros();

    				for (i = 6; i < 6; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < 6; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < 6; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$1.name,
    		type: "slot",
    		source: "(62:8) <Formfield label=\\\"Betalingsmåneder\\\" labeltop>",
    		ctx
    	});

    	return block;
    }

    // (79:8) <Formfield label="Første gang" labelfor="dtStart">
    function create_default_slot_2$1(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			input = element("input");
    			attr_dev(input, "type", "date");
    			input.required = true;
    			attr_dev(input, "class", "form-control");
    			attr_dev(input, "id", "dtStart");
    			add_location(input, file$2, 79, 12, 3749);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*data*/ ctx[0].start);

    			if (!mounted) {
    				dispose = listen_dev(input, "input", /*input_input_handler_1*/ ctx[17]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*data*/ 1) {
    				set_input_value(input, /*data*/ ctx[0].start);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$1.name,
    		type: "slot",
    		source: "(79:8) <Formfield label=\\\"Første gang\\\" labelfor=\\\"dtStart\\\">",
    		ctx
    	});

    	return block;
    }

    // (85:12) {#if data.harslut}
    function create_if_block_1$2(ctx) {
    	let input;
    	let Validity_action;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			input = element("input");
    			attr_dev(input, "type", "date");
    			input.required = true;
    			attr_dev(input, "class", "form-control d-inline-block ms-3");
    			add_location(input, file$2, 85, 12, 4049);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*data*/ ctx[0].slut);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "input", /*input_input_handler_2*/ ctx[19]),
    					action_destroyer(Validity_action = Validity.call(null, input, /*data*/ ctx[0].start.length > 0 && /*data*/ ctx[0].slut.length > 0 && /*data*/ ctx[0].start > /*data*/ ctx[0].slut
    					? "Kan ikke være før første gang"
    					: ""))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*data*/ 1) {
    				set_input_value(input, /*data*/ ctx[0].slut);
    			}

    			if (Validity_action && is_function(Validity_action.update) && dirty[0] & /*data*/ 1) Validity_action.update.call(null, /*data*/ ctx[0].start.length > 0 && /*data*/ ctx[0].slut.length > 0 && /*data*/ ctx[0].start > /*data*/ ctx[0].slut
    			? "Kan ikke være før første gang"
    			: "");
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(85:12) {#if data.harslut}",
    		ctx
    	});

    	return block;
    }

    // (83:8) <FormField label="Slutter" labelfor="chkSlut">
    function create_default_slot_1$1(ctx) {
    	let bscheckbox;
    	let updating_checked;
    	let t;
    	let if_block_anchor;
    	let current;

    	function bscheckbox_checked_binding_1(value) {
    		/*bscheckbox_checked_binding_1*/ ctx[18](value);
    	}

    	let bscheckbox_props = { inline: true, id: "chkSlut" };

    	if (/*data*/ ctx[0].harslut !== void 0) {
    		bscheckbox_props.checked = /*data*/ ctx[0].harslut;
    	}

    	bscheckbox = new Checkbox({ props: bscheckbox_props, $$inline: true });
    	binding_callbacks.push(() => bind(bscheckbox, "checked", bscheckbox_checked_binding_1));
    	let if_block = /*data*/ ctx[0].harslut && create_if_block_1$2(ctx);

    	const block = {
    		c: function create() {
    			create_component(bscheckbox.$$.fragment);
    			t = space();
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			mount_component(bscheckbox, target, anchor);
    			insert_dev(target, t, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const bscheckbox_changes = {};

    			if (!updating_checked && dirty[0] & /*data*/ 1) {
    				updating_checked = true;
    				bscheckbox_changes.checked = /*data*/ ctx[0].harslut;
    				add_flush_callback(() => updating_checked = false);
    			}

    			bscheckbox.$set(bscheckbox_changes);

    			if (/*data*/ ctx[0].harslut) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_1$2(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(bscheckbox.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(bscheckbox.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(bscheckbox, detaching);
    			if (detaching) detach_dev(t);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$1.name,
    		type: "slot",
    		source: "(83:8) <FormField label=\\\"Slutter\\\" labelfor=\\\"chkSlut\\\">",
    		ctx
    	});

    	return block;
    }

    // (3:4) <svelte:fragment slot="default">
    function create_default_slot$1(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*data*/ ctx[0] && create_if_block$2(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*data*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty[0] & /*data*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$2(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(3:4) <svelte:fragment slot=\\\"default\\\">",
    		ctx
    	});

    	return block;
    }

    // (97:4) <svelte:fragment slot="footer">
    function create_footer_slot$1(ctx) {
    	let button0;
    	let t1;
    	let button1;
    	let icon;
    	let t2;
    	let current;
    	let mounted;
    	let dispose;
    	icon = new Icon({ props: { name: "check" }, $$inline: true });

    	const block = {
    		c: function create() {
    			button0 = element("button");
    			button0.textContent = "Annuller";
    			t1 = space();
    			button1 = element("button");
    			create_component(icon.$$.fragment);
    			t2 = text(" Gem");
    			attr_dev(button0, "type", "button");
    			attr_dev(button0, "class", "btn btn-secondary");
    			add_location(button0, file$2, 97, 8, 4455);
    			attr_dev(button1, "type", "submit");
    			attr_dev(button1, "class", "btn btn-primary");
    			add_location(button1, file$2, 98, 8, 4554);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, button1, anchor);
    			mount_component(icon, button1, null);
    			append_dev(button1, t2);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(
    					button0,
    					"click",
    					function () {
    						if (is_function(/*MyModal*/ ctx[1].Hide)) /*MyModal*/ ctx[1].Hide.apply(this, arguments);
    					},
    					false,
    					false,
    					false
    				);

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(icon.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(icon.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(button1);
    			destroy_component(icon);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_footer_slot$1.name,
    		type: "slot",
    		source: "(97:4) <svelte:fragment slot=\\\"footer\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let bsmodal;
    	let current;

    	let bsmodal_props = {
    		width: "41rem",
    		title: "Udgift / Indtægt",
    		$$slots: {
    			footer: [create_footer_slot$1],
    			default: [create_default_slot$1]
    		},
    		$$scope: { ctx }
    	};

    	bsmodal = new Modal({ props: bsmodal_props, $$inline: true });
    	/*bsmodal_binding*/ ctx[20](bsmodal);
    	bsmodal.$on("submit", /*submit_handler*/ ctx[21]);

    	const block = {
    		c: function create() {
    			create_component(bsmodal.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(bsmodal, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const bsmodal_changes = {};

    			if (dirty[0] & /*MyModal, data, EnBetalingsMånedValgt, EtVarBeløbAnført*/ 15 | dirty[1] & /*$$scope*/ 1) {
    				bsmodal_changes.$$scope = { dirty, ctx };
    			}

    			bsmodal.$set(bsmodal_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(bsmodal.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(bsmodal.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			/*bsmodal_binding*/ ctx[20](null);
    			destroy_component(bsmodal, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let EtVarBeløbAnført;
    	let EnBetalingsMånedValgt;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("ModalItem", slots, []);
    	const dispatch = createEventDispatcher();
    	let MyModal;

    	function Show() {
    		MyModal.Show();
    	}

    	

    	function Hide() {
    		MyModal.Hide();
    	}

    	
    	let { data = null } = $$props;

    	const MNavn = [
    		"Jan",
    		"Feb",
    		"Mar",
    		"Apr",
    		"Maj",
    		"Jun",
    		"Jul",
    		"Aug",
    		"Sep",
    		"Okt",
    		"Nov",
    		"Dec"
    	];

    	const writable_props = ["data"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ModalItem> was created with unknown prop '${key}'`);
    	});

    	const input_handler = () => $$invalidate(0, data.udgift = true, data);
    	const input_handler_1 = () => $$invalidate(0, data.udgift = false, data);

    	function input_input_handler() {
    		data.beskriv = this.value;
    		$$invalidate(0, data);
    	}

    	const input_handler_2 = () => $$invalidate(0, data.variabelt = false, data);
    	const input_handler_3 = () => $$invalidate(0, data.variabelt = true, data);

    	function amount_value_binding(value) {
    		if ($$self.$$.not_equal(data.fastbeløb, value)) {
    			data.fastbeløb = value;
    			$$invalidate(0, data);
    		}
    	}

    	function amount_value_binding_1(value, md) {
    		if ($$self.$$.not_equal(data.varbeløb[md], value)) {
    			data.varbeløb[md] = value;
    			$$invalidate(0, data);
    		}
    	}

    	function select_change_handler() {
    		data.hyppighed = select_value(this);
    		$$invalidate(0, data);
    	}

    	function bscheckbox_checked_binding(value, grp, grpidx) {
    		if ($$self.$$.not_equal(data.betalingsmåneder[grp * 2 + grpidx], value)) {
    			data.betalingsmåneder[grp * 2 + grpidx] = value;
    			$$invalidate(0, data);
    		}
    	}

    	function input_input_handler_1() {
    		data.start = this.value;
    		$$invalidate(0, data);
    	}

    	function bscheckbox_checked_binding_1(value) {
    		if ($$self.$$.not_equal(data.harslut, value)) {
    			data.harslut = value;
    			$$invalidate(0, data);
    		}
    	}

    	function input_input_handler_2() {
    		data.slut = this.value;
    		$$invalidate(0, data);
    	}

    	function bsmodal_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			MyModal = $$value;
    			$$invalidate(1, MyModal);
    		});
    	}

    	const submit_handler = () => dispatch("gem");

    	$$self.$$set = $$props => {
    		if ("data" in $$props) $$invalidate(0, data = $$props.data);
    	};

    	$$self.$capture_state = () => ({
    		Validity,
    		BSModal: Modal,
    		BSRadio: Radio,
    		BSCheckbox: Checkbox,
    		Formfield: FormField,
    		Icon,
    		Amount,
    		FormField,
    		createEventDispatcher,
    		dispatch,
    		MyModal,
    		Show,
    		Hide,
    		data,
    		MNavn,
    		EtVarBeløbAnført,
    		EnBetalingsMånedValgt
    	});

    	$$self.$inject_state = $$props => {
    		if ("MyModal" in $$props) $$invalidate(1, MyModal = $$props.MyModal);
    		if ("data" in $$props) $$invalidate(0, data = $$props.data);
    		if ("EtVarBeløbAnført" in $$props) $$invalidate(2, EtVarBeløbAnført = $$props.EtVarBeløbAnført);
    		if ("EnBetalingsMånedValgt" in $$props) $$invalidate(3, EnBetalingsMånedValgt = $$props.EnBetalingsMånedValgt);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*data*/ 1) {
    			$$invalidate(2, EtVarBeløbAnført = (function () {
    				if (!data) return false;

    				for (let i = 0; i < 12; i++) {
    					if (data.varbeløb[i] !== 0) return true;
    				}

    				return false;
    			})());
    		}

    		if ($$self.$$.dirty[0] & /*data*/ 1) {
    			$$invalidate(3, EnBetalingsMånedValgt = (function () {
    				if (!data) return false;

    				for (let i = 0; i < 12; i++) {
    					if (data.betalingsmåneder[i]) return true;
    				}

    				return false;
    			})());
    		}
    	};

    	return [
    		data,
    		MyModal,
    		EtVarBeløbAnført,
    		EnBetalingsMånedValgt,
    		dispatch,
    		MNavn,
    		Show,
    		Hide,
    		input_handler,
    		input_handler_1,
    		input_input_handler,
    		input_handler_2,
    		input_handler_3,
    		amount_value_binding,
    		amount_value_binding_1,
    		select_change_handler,
    		bscheckbox_checked_binding,
    		input_input_handler_1,
    		bscheckbox_checked_binding_1,
    		input_input_handler_2,
    		bsmodal_binding,
    		submit_handler
    	];
    }

    class ModalItem extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { Show: 6, Hide: 7, data: 0 }, [-1, -1]);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ModalItem",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get Show() {
    		return this.$$.ctx[6];
    	}

    	set Show(value) {
    		throw new Error("<ModalItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get Hide() {
    		return this.$$.ctx[7];
    	}

    	set Hide(value) {
    		throw new Error("<ModalItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get data() {
    		throw new Error("<ModalItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set data(value) {
    		throw new Error("<ModalItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\BudgetPage.svelte generated by Svelte v3.37.0 */
    const file$1 = "src\\BudgetPage.svelte";

    function get_each_context_7(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[59] = list[i];
    	return child_ctx;
    }

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[45] = list[i];
    	child_ctx[47] = i;
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[45] = list[i];
    	child_ctx[47] = i;
    	return child_ctx;
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[45] = list[i];
    	child_ctx[47] = i;
    	return child_ctx;
    }

    function get_each_context_3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[50] = list[i];
    	return child_ctx;
    }

    function get_each_context_4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[53] = list[i];
    	return child_ctx;
    }

    function get_each_context_5(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[45] = list[i];
    	child_ctx[47] = i;
    	return child_ctx;
    }

    function get_each_context_6(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[45] = list[i];
    	return child_ctx;
    }

    // (4:4) {#if $BudgetID!=='nyt'}
    function create_if_block_7(ctx) {
    	let show_if = BrowserKanDele();
    	let t0;
    	let button0;
    	let icon0;
    	let t1;
    	let t2;
    	let button1;
    	let icon1;
    	let t3;
    	let t4;
    	let button2;
    	let icon2;
    	let t5;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block = show_if && create_if_block_8(ctx);
    	icon0 = new Icon({ props: { name: "copy" }, $$inline: true });
    	icon1 = new Icon({ props: { name: "trash" }, $$inline: true });
    	icon2 = new Icon({ props: { name: "new" }, $$inline: true });

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			t0 = space();
    			button0 = element("button");
    			create_component(icon0.$$.fragment);
    			t1 = text(" Lav kopi");
    			t2 = space();
    			button1 = element("button");
    			create_component(icon1.$$.fragment);
    			t3 = text(" Slet fra skyen");
    			t4 = space();
    			button2 = element("button");
    			create_component(icon2.$$.fragment);
    			t5 = text(" Nyt budget");
    			attr_dev(button0, "type", "button");
    			attr_dev(button0, "class", "btn btn-primary");
    			add_location(button0, file$1, 9, 4, 371);
    			attr_dev(button1, "type", "button");
    			attr_dev(button1, "class", "btn btn-danger");
    			add_location(button1, file$1, 11, 4, 498);
    			attr_dev(button2, "type", "button");
    			attr_dev(button2, "class", "btn btn-primary");
    			add_location(button2, file$1, 13, 3, 633);
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, button0, anchor);
    			mount_component(icon0, button0, null);
    			append_dev(button0, t1);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, button1, anchor);
    			mount_component(icon1, button1, null);
    			append_dev(button1, t3);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, button2, anchor);
    			mount_component(icon2, button2, null);
    			append_dev(button2, t5);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", prevent_default(/*KlikKopi*/ ctx[27]), false, true, false),
    					listen_dev(button1, "click", prevent_default(/*KlikSletSky*/ ctx[28]), false, true, false),
    					listen_dev(button2, "click", /*KlikNyt*/ ctx[26], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (show_if) if_block.p(ctx, dirty);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			transition_in(icon0.$$.fragment, local);
    			transition_in(icon1.$$.fragment, local);
    			transition_in(icon2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			transition_out(icon0.$$.fragment, local);
    			transition_out(icon1.$$.fragment, local);
    			transition_out(icon2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(button0);
    			destroy_component(icon0);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(button1);
    			destroy_component(icon1);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(button2);
    			destroy_component(icon2);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_7.name,
    		type: "if",
    		source: "(4:4) {#if $BudgetID!=='nyt'}",
    		ctx
    	});

    	return block;
    }

    // (6:6) {#if BrowserKanDele() }
    function create_if_block_8(ctx) {
    	let button;
    	let icon;
    	let t;
    	let current;
    	let mounted;
    	let dispose;
    	icon = new Icon({ props: { name: "share" }, $$inline: true });

    	const block = {
    		c: function create() {
    			button = element("button");
    			create_component(icon.$$.fragment);
    			t = text(" Del");
    			attr_dev(button, "type", "button");
    			attr_dev(button, "class", "btn btn-primary");
    			add_location(button, file$1, 6, 4, 250);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			mount_component(icon, button, null);
    			append_dev(button, t);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*DelUrl*/ ctx[25], false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(icon.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(icon.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			destroy_component(icon);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_8.name,
    		type: "if",
    		source: "(6:6) {#if BrowserKanDele() }",
    		ctx
    	});

    	return block;
    }

    // (21:3) {#if $BudgetID!=='nyt' || $Budget.items.length>0}
    function create_if_block_5(ctx) {
    	let formfield;
    	let current;

    	formfield = new FormField({
    			props: {
    				label: "Status",
    				$$slots: { default: [create_default_slot_7] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(formfield.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(formfield, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const formfield_changes = {};

    			if (dirty[0] & /*BudgetJSON, $OldJSON*/ 264192 | dirty[2] & /*$$scope*/ 1) {
    				formfield_changes.$$scope = { dirty, ctx };
    			}

    			formfield.$set(formfield_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(formfield.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(formfield.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(formfield, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5.name,
    		type: "if",
    		source: "(21:3) {#if $BudgetID!=='nyt' || $Budget.items.length>0}",
    		ctx
    	});

    	return block;
    }

    // (25:6) {:else}
    function create_else_block_2(ctx) {
    	let div;
    	let icon;
    	let t;
    	let current;

    	icon = new Icon({
    			props: { name: "warning" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(icon.$$.fragment);
    			t = text(" Ændringer ikke gemt");
    			attr_dev(div, "class", "alert alert-warning d-inline-block p-1 m-0");
    			add_location(div, file$1, 25, 6, 1050);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(icon, div, null);
    			append_dev(div, t);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(icon.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(icon.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(icon);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_2.name,
    		type: "else",
    		source: "(25:6) {:else}",
    		ctx
    	});

    	return block;
    }

    // (23:6) {#if BudgetJSON===$OldJSON}
    function create_if_block_6(ctx) {
    	let div;
    	let icon;
    	let t;
    	let current;
    	icon = new Icon({ props: { name: "check" }, $$inline: true });

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(icon.$$.fragment);
    			t = text(" Gemt i skyen");
    			attr_dev(div, "class", "alert alert-success d-inline-block p-1 m-0");
    			add_location(div, file$1, 23, 6, 930);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(icon, div, null);
    			append_dev(div, t);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(icon.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(icon.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(icon);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_6.name,
    		type: "if",
    		source: "(23:6) {#if BudgetJSON===$OldJSON}",
    		ctx
    	});

    	return block;
    }

    // (22:3) <Formfield label="Status">
    function create_default_slot_7(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_6, create_else_block_2];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*BudgetJSON*/ ctx[11] === /*$OldJSON*/ ctx[18]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index !== previous_block_index) {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_7.name,
    		type: "slot",
    		source: "(22:3) <Formfield label=\\\"Status\\\">",
    		ctx
    	});

    	return block;
    }

    // (31:4) <Formfield label="Budget-navn">
    function create_default_slot_6(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			input = element("input");
    			attr_dev(input, "type", "text");
    			input.required = true;
    			attr_dev(input, "class", "form-control");
    			set_style(input, "max-width", "40rem");
    			add_location(input, file$1, 31, 7, 1247);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*$Budget*/ ctx[1].navn);

    			if (!mounted) {
    				dispose = listen_dev(input, "input", /*input_input_handler*/ ctx[30]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*$Budget*/ 2 && input.value !== /*$Budget*/ ctx[1].navn) {
    				set_input_value(input, /*$Budget*/ ctx[1].navn);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_6.name,
    		type: "slot",
    		source: "(31:4) <Formfield label=\\\"Budget-navn\\\">",
    		ctx
    	});

    	return block;
    }

    // (35:4) <Formfield label="Første måned">
    function create_default_slot_5(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			input = element("input");
    			attr_dev(input, "type", "month");
    			input.required = true;
    			attr_dev(input, "class", "form-control");
    			add_location(input, file$1, 35, 6, 1421);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*$Budget*/ ctx[1].startmåned);

    			if (!mounted) {
    				dispose = listen_dev(input, "input", /*input_input_handler_1*/ ctx[31]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*$Budget*/ 2) {
    				set_input_value(input, /*$Budget*/ ctx[1].startmåned);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5.name,
    		type: "slot",
    		source: "(35:4) <Formfield label=\\\"Første måned\\\">",
    		ctx
    	});

    	return block;
    }

    // (39:4) <Formfield label="Startsaldo">
    function create_default_slot_4(ctx) {
    	let amount;
    	let updating_value;
    	let current;

    	function amount_value_binding(value) {
    		/*amount_value_binding*/ ctx[32](value);
    	}

    	let amount_props = {};

    	if (/*$Budget*/ ctx[1].startsaldo !== void 0) {
    		amount_props.value = /*$Budget*/ ctx[1].startsaldo;
    	}

    	amount = new Amount({ props: amount_props, $$inline: true });
    	binding_callbacks.push(() => bind(amount, "value", amount_value_binding));

    	const block = {
    		c: function create() {
    			create_component(amount.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(amount, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const amount_changes = {};

    			if (!updating_value && dirty[0] & /*$Budget*/ 2) {
    				updating_value = true;
    				amount_changes.value = /*$Budget*/ ctx[1].startsaldo;
    				add_flush_callback(() => updating_value = false);
    			}

    			amount.$set(amount_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(amount.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(amount.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(amount, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4.name,
    		type: "slot",
    		source: "(39:4) <Formfield label=\\\"Startsaldo\\\">",
    		ctx
    	});

    	return block;
    }

    // (48:0) {#if $Budget.items.length>0}
    function create_if_block$1(ctx) {
    	let p0;
    	let t0;
    	let select;
    	let option0;
    	let option1;
    	let t3;
    	let t4;
    	let current_block_type_index;
    	let if_block1;
    	let t5;
    	let p1;
    	let b0;
    	let t7;
    	let t8_value = FormatBeløb(/*GnsUdgift*/ ctx[16]) + "";
    	let t8;
    	let br0;
    	let t9;
    	let b1;
    	let t11;
    	let t12_value = FormatBeløb(/*GnsIndtægt*/ ctx[17]) + "";
    	let t12;
    	let br1;
    	let t13;
    	let b2;
    	let t15;
    	let html_tag;
    	let raw_value = /*BeløbHtml*/ ctx[24](/*GnsIndtægt*/ ctx[17] - /*GnsUdgift*/ ctx[16], true) + "";
    	let t16;
    	let hr;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block0 = /*Visning*/ ctx[9] !== "list" && create_if_block_4(ctx);
    	const if_block_creators = [create_if_block_1$1, create_else_block$1];
    	const if_blocks = [];

    	function select_block_type_1(ctx, dirty) {
    		if (/*Visning*/ ctx[9] === "months") return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type_1(ctx);
    	if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			p0 = element("p");
    			t0 = text("Visning: ");
    			select = element("select");
    			option0 = element("option");
    			option0.textContent = "Måned-skema";
    			option1 = element("option");
    			option1.textContent = "Som kontoudtog";
    			t3 = space();
    			if (if_block0) if_block0.c();
    			t4 = space();
    			if_block1.c();
    			t5 = space();
    			p1 = element("p");
    			b0 = element("b");
    			b0.textContent = "Gns. udgift pr. måned:";
    			t7 = space();
    			t8 = text(t8_value);
    			br0 = element("br");
    			t9 = space();
    			b1 = element("b");
    			b1.textContent = "Gns. indtægt pr. måned:";
    			t11 = space();
    			t12 = text(t12_value);
    			br1 = element("br");
    			t13 = space();
    			b2 = element("b");
    			b2.textContent = "Gns. rådighedsbeløb måned:";
    			t15 = space();
    			t16 = space();
    			hr = element("hr");
    			option0.__value = "months";
    			option0.value = option0.__value;
    			add_location(option0, file$1, 51, 8, 1806);
    			option1.__value = "ledger";
    			option1.value = option1.__value;
    			add_location(option1, file$1, 52, 8, 1859);
    			attr_dev(select, "class", "form-select d-inline-block w-auto");
    			if (/*Visning*/ ctx[9] === void 0) add_render_callback(() => /*select_change_handler*/ ctx[33].call(select));
    			add_location(select, file$1, 50, 17, 1725);
    			add_location(p0, file$1, 49, 4, 1703);
    			add_location(b0, file$1, 162, 8, 6274);
    			add_location(br0, file$1, 162, 62, 6328);
    			add_location(b1, file$1, 163, 8, 6344);
    			add_location(br1, file$1, 163, 64, 6400);
    			add_location(b2, file$1, 164, 8, 6416);
    			html_tag = new HtmlTag(null);
    			add_location(p1, file$1, 161, 8, 6261);
    			add_location(hr, file$1, 167, 8, 6520);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p0, anchor);
    			append_dev(p0, t0);
    			append_dev(p0, select);
    			append_dev(select, option0);
    			append_dev(select, option1);
    			select_option(select, /*Visning*/ ctx[9]);
    			append_dev(p0, t3);
    			if (if_block0) if_block0.m(p0, null);
    			insert_dev(target, t4, anchor);
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, p1, anchor);
    			append_dev(p1, b0);
    			append_dev(p1, t7);
    			append_dev(p1, t8);
    			append_dev(p1, br0);
    			append_dev(p1, t9);
    			append_dev(p1, b1);
    			append_dev(p1, t11);
    			append_dev(p1, t12);
    			append_dev(p1, br1);
    			append_dev(p1, t13);
    			append_dev(p1, b2);
    			append_dev(p1, t15);
    			html_tag.m(raw_value, p1);
    			insert_dev(target, t16, anchor);
    			insert_dev(target, hr, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(select, "change", /*select_change_handler*/ ctx[33]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*Visning*/ 512) {
    				select_option(select, /*Visning*/ ctx[9]);
    			}

    			if (/*Visning*/ ctx[9] !== "list") {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_4(ctx);
    					if_block0.c();
    					if_block0.m(p0, null);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type_1(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block1 = if_blocks[current_block_type_index];

    				if (!if_block1) {
    					if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block1.c();
    				} else {
    					if_block1.p(ctx, dirty);
    				}

    				transition_in(if_block1, 1);
    				if_block1.m(t5.parentNode, t5);
    			}

    			if ((!current || dirty[0] & /*GnsUdgift*/ 65536) && t8_value !== (t8_value = FormatBeløb(/*GnsUdgift*/ ctx[16]) + "")) set_data_dev(t8, t8_value);
    			if ((!current || dirty[0] & /*GnsIndtægt*/ 131072) && t12_value !== (t12_value = FormatBeløb(/*GnsIndtægt*/ ctx[17]) + "")) set_data_dev(t12, t12_value);
    			if ((!current || dirty[0] & /*GnsIndtægt, GnsUdgift*/ 196608) && raw_value !== (raw_value = /*BeløbHtml*/ ctx[24](/*GnsIndtægt*/ ctx[17] - /*GnsUdgift*/ ctx[16], true) + "")) html_tag.p(raw_value);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block1);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block1);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p0);
    			if (if_block0) if_block0.d();
    			if (detaching) detach_dev(t4);
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(p1);
    			if (detaching) detach_dev(t16);
    			if (detaching) detach_dev(hr);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(48:0) {#if $Budget.items.length>0}",
    		ctx
    	});

    	return block;
    }

    // (56:8) {#if Visning !=='list'}
    function create_if_block_4(ctx) {
    	let t0;
    	let select;
    	let option0;
    	let option1;
    	let option2;
    	let option3;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			t0 = text("   Periode:\r\n        ");
    			select = element("select");
    			option0 = element("option");
    			option0.textContent = "12 måneder";
    			option1 = element("option");
    			option1.textContent = "18 måneder";
    			option2 = element("option");
    			option2.textContent = "24 måneder";
    			option3 = element("option");
    			option3.textContent = "36 måneder";
    			option0.__value = 12;
    			option0.value = option0.__value;
    			add_location(option0, file$1, 58, 12, 2095);
    			option1.__value = 18;
    			option1.value = option1.__value;
    			add_location(option1, file$1, 59, 12, 2147);
    			option2.__value = 24;
    			option2.value = option2.__value;
    			add_location(option2, file$1, 60, 12, 2199);
    			option3.__value = 36;
    			option3.value = option3.__value;
    			add_location(option3, file$1, 61, 12, 2251);
    			attr_dev(select, "class", "form-select d-inline-block w-auto");
    			if (/*AntalMåneder*/ ctx[0] === void 0) add_render_callback(() => /*select_change_handler_1*/ ctx[34].call(select));
    			add_location(select, file$1, 57, 8, 2005);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, select, anchor);
    			append_dev(select, option0);
    			append_dev(select, option1);
    			append_dev(select, option2);
    			append_dev(select, option3);
    			select_option(select, /*AntalMåneder*/ ctx[0]);

    			if (!mounted) {
    				dispose = listen_dev(select, "change", /*select_change_handler_1*/ ctx[34]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*AntalMåneder*/ 1) {
    				select_option(select, /*AntalMåneder*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(select);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(56:8) {#if Visning !=='list'}",
    		ctx
    	});

    	return block;
    }

    // (131:8) {:else}
    function create_else_block$1(ctx) {
    	let table;
    	let tbody;
    	let tr;
    	let th0;
    	let t0;
    	let th1;
    	let t2;
    	let th2;
    	let t4;
    	let th3;
    	let t6;
    	let th4;
    	let t8;
    	let current;
    	let each_value_7 = /*Posts*/ ctx[2];
    	validate_each_argument(each_value_7);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_7.length; i += 1) {
    		each_blocks[i] = create_each_block_7(get_each_context_7(ctx, each_value_7, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			table = element("table");
    			tbody = element("tbody");
    			tr = element("tr");
    			th0 = element("th");
    			t0 = space();
    			th1 = element("th");
    			th1.textContent = "Dato";
    			t2 = space();
    			th2 = element("th");
    			th2.textContent = "Beskrivelse";
    			t4 = space();
    			th3 = element("th");
    			th3.textContent = "Beløb";
    			t6 = space();
    			th4 = element("th");
    			th4.textContent = "Saldo";
    			t8 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(th0, "colspan", "2");
    			add_location(th0, file$1, 135, 12, 5134);
    			set_style(th1, "text-align", "left");
    			add_location(th1, file$1, 136, 12, 5169);
    			set_style(th2, "text-align", "left");
    			add_location(th2, file$1, 137, 12, 5220);
    			set_style(th3, "text-align", "right");
    			add_location(th3, file$1, 138, 12, 5278);
    			set_style(th4, "text-align", "right");
    			add_location(th4, file$1, 139, 12, 5331);
    			add_location(tr, file$1, 134, 12, 5116);
    			add_location(tbody, file$1, 133, 8, 5095);
    			attr_dev(table, "class", "table");
    			set_style(table, "width", "auto");
    			add_location(table, file$1, 132, 8, 5045);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, table, anchor);
    			append_dev(table, tbody);
    			append_dev(tbody, tr);
    			append_dev(tr, th0);
    			append_dev(tr, t0);
    			append_dev(tr, th1);
    			append_dev(tr, t2);
    			append_dev(tr, th2);
    			append_dev(tr, t4);
    			append_dev(tr, th3);
    			append_dev(tr, t6);
    			append_dev(tr, th4);
    			append_dev(tbody, t8);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(tbody, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*BeløbHtml, Posts, KlikSlet, KlikEdit*/ 22020100) {
    				each_value_7 = /*Posts*/ ctx[2];
    				validate_each_argument(each_value_7);
    				let i;

    				for (i = 0; i < each_value_7.length; i += 1) {
    					const child_ctx = get_each_context_7(ctx, each_value_7, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block_7(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(tbody, null);
    					}
    				}

    				group_outros();

    				for (i = each_value_7.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_7.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(table);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(131:8) {:else}",
    		ctx
    	});

    	return block;
    }

    // (68:4) {#if Visning==='months'}
    function create_if_block_1$1(ctx) {
    	let table;
    	let tbody;
    	let tr0;
    	let th;
    	let t0;
    	let t1;
    	let t2;
    	let tr1;
    	let td0;
    	let t4;
    	let td1;
    	let t5;
    	let td1_colspan_value;
    	let t6;
    	let tr2;
    	let td2;
    	let t8;
    	let td3;
    	let t10;
    	let td4;
    	let t11_value = FormatBeløb(/*$Budget*/ ctx[1].startsaldo) + "";
    	let t11;
    	let t12;
    	let td5;
    	let t13;
    	let td5_colspan_value;
    	let t14;
    	let tr3;
    	let td6;
    	let t16;
    	let td7;
    	let t18;
    	let t19;
    	let tr4;
    	let td8;
    	let t21;
    	let td9;
    	let t23;
    	let t24;
    	let tr5;
    	let td10;
    	let t26;
    	let td11;
    	let t28;
    	let current;
    	let each_value_6 = /*MånedNavn*/ ctx[12];
    	validate_each_argument(each_value_6);
    	let each_blocks_4 = [];

    	for (let i = 0; i < each_value_6.length; i += 1) {
    		each_blocks_4[i] = create_each_block_6(get_each_context_6(ctx, each_value_6, i));
    	}

    	let each_value_3 = [1, 2];
    	validate_each_argument(each_value_3);
    	let each_blocks_3 = [];

    	for (let i = 0; i < 2; i += 1) {
    		each_blocks_3[i] = create_each_block_3(get_each_context_3(ctx, each_value_3, i));
    	}

    	const out = i => transition_out(each_blocks_3[i], 1, 1, () => {
    		each_blocks_3[i] = null;
    	});

    	let each_value_2 = /*MånedNavn*/ ctx[12];
    	validate_each_argument(each_value_2);
    	let each_blocks_2 = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks_2[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    	}

    	let each_value_1 = /*MånedNavn*/ ctx[12];
    	validate_each_argument(each_value_1);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	let each_value = /*MånedNavn*/ ctx[12];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			table = element("table");
    			tbody = element("tbody");
    			tr0 = element("tr");
    			th = element("th");
    			t0 = space();

    			for (let i = 0; i < each_blocks_4.length; i += 1) {
    				each_blocks_4[i].c();
    			}

    			t1 = space();

    			for (let i = 0; i < 2; i += 1) {
    				each_blocks_3[i].c();
    			}

    			t2 = space();
    			tr1 = element("tr");
    			td0 = element("td");
    			td0.textContent = " ";
    			t4 = space();
    			td1 = element("td");
    			t5 = text("Nøgletal");
    			t6 = space();
    			tr2 = element("tr");
    			td2 = element("td");
    			td2.textContent = " ";
    			t8 = space();
    			td3 = element("td");
    			td3.textContent = "Startsaldo";
    			t10 = space();
    			td4 = element("td");
    			t11 = text(t11_value);
    			t12 = space();
    			td5 = element("td");
    			t13 = text(" ");
    			t14 = space();
    			tr3 = element("tr");
    			td6 = element("td");
    			td6.textContent = " ";
    			t16 = space();
    			td7 = element("td");
    			td7.textContent = "Rådighedsbeløb";
    			t18 = space();

    			for (let i = 0; i < each_blocks_2.length; i += 1) {
    				each_blocks_2[i].c();
    			}

    			t19 = space();
    			tr4 = element("tr");
    			td8 = element("td");
    			td8.textContent = " ";
    			t21 = space();
    			td9 = element("td");
    			td9.textContent = "Ultimosaldo";
    			t23 = space();

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t24 = space();
    			tr5 = element("tr");
    			td10 = element("td");
    			td10.textContent = " ";
    			t26 = space();
    			td11 = element("td");
    			td11.textContent = "Laveste saldo";
    			t28 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(th, "colspan", "3");
    			add_location(th, file$1, 71, 12, 2462);
    			add_location(tr0, file$1, 70, 12, 2444);
    			attr_dev(td0, "colspan", "2");
    			add_location(td0, file$1, 97, 12, 3704);
    			set_style(td1, "white-space", "nowrap");
    			set_style(td1, "font-weight", "bold");
    			attr_dev(td1, "colspan", td1_colspan_value = /*AntalMåneder*/ ctx[0] + 1);
    			add_location(td1, file$1, 98, 12, 3745);
    			add_location(tr1, file$1, 96, 12, 3686);
    			attr_dev(td2, "colspan", "2");
    			add_location(td2, file$1, 101, 12, 3882);
    			set_style(td3, "white-space", "nowrap");
    			add_location(td3, file$1, 102, 12, 3923);
    			set_style(td4, "text-align", "right");
    			add_location(td4, file$1, 103, 12, 3983);
    			attr_dev(td5, "colspan", td5_colspan_value = /*AntalMåneder*/ ctx[0] - 1);
    			add_location(td5, file$1, 104, 12, 4064);
    			add_location(tr2, file$1, 100, 12, 3864);
    			attr_dev(td6, "colspan", "2");
    			add_location(td6, file$1, 107, 12, 4155);
    			set_style(td7, "white-space", "nowrap");
    			add_location(td7, file$1, 108, 12, 4196);
    			add_location(tr3, file$1, 106, 12, 4137);
    			attr_dev(td8, "colspan", "2");
    			add_location(td8, file$1, 114, 12, 4443);
    			set_style(td9, "white-space", "nowrap");
    			add_location(td9, file$1, 115, 12, 4484);
    			add_location(tr4, file$1, 113, 12, 4425);
    			attr_dev(td10, "colspan", "2");
    			add_location(td10, file$1, 121, 12, 4725);
    			set_style(td11, "white-space", "nowrap");
    			add_location(td11, file$1, 122, 12, 4766);
    			add_location(tr5, file$1, 120, 12, 4707);
    			add_location(tbody, file$1, 69, 8, 2423);
    			attr_dev(table, "class", "table");
    			set_style(table, "width", "auto");
    			add_location(table, file$1, 68, 4, 2373);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, table, anchor);
    			append_dev(table, tbody);
    			append_dev(tbody, tr0);
    			append_dev(tr0, th);
    			append_dev(tr0, t0);

    			for (let i = 0; i < each_blocks_4.length; i += 1) {
    				each_blocks_4[i].m(tr0, null);
    			}

    			append_dev(tbody, t1);

    			for (let i = 0; i < 2; i += 1) {
    				each_blocks_3[i].m(tbody, null);
    			}

    			append_dev(tbody, t2);
    			append_dev(tbody, tr1);
    			append_dev(tr1, td0);
    			append_dev(tr1, t4);
    			append_dev(tr1, td1);
    			append_dev(td1, t5);
    			append_dev(tbody, t6);
    			append_dev(tbody, tr2);
    			append_dev(tr2, td2);
    			append_dev(tr2, t8);
    			append_dev(tr2, td3);
    			append_dev(tr2, t10);
    			append_dev(tr2, td4);
    			append_dev(td4, t11);
    			append_dev(tr2, t12);
    			append_dev(tr2, td5);
    			append_dev(td5, t13);
    			append_dev(tbody, t14);
    			append_dev(tbody, tr3);
    			append_dev(tr3, td6);
    			append_dev(tr3, t16);
    			append_dev(tr3, td7);
    			append_dev(tr3, t18);

    			for (let i = 0; i < each_blocks_2.length; i += 1) {
    				each_blocks_2[i].m(tr3, null);
    			}

    			append_dev(tbody, t19);
    			append_dev(tbody, tr4);
    			append_dev(tr4, td8);
    			append_dev(tr4, t21);
    			append_dev(tr4, td9);
    			append_dev(tr4, t23);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(tr4, null);
    			}

    			append_dev(tbody, t24);
    			append_dev(tbody, tr5);
    			append_dev(tr5, td10);
    			append_dev(tr5, t26);
    			append_dev(tr5, td11);
    			append_dev(tr5, t28);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(tr5, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*MånedNavn*/ 4096) {
    				each_value_6 = /*MånedNavn*/ ctx[12];
    				validate_each_argument(each_value_6);
    				let i;

    				for (i = 0; i < each_value_6.length; i += 1) {
    					const child_ctx = get_each_context_6(ctx, each_value_6, i);

    					if (each_blocks_4[i]) {
    						each_blocks_4[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_4[i] = create_each_block_6(child_ctx);
    						each_blocks_4[i].c();
    						each_blocks_4[i].m(tr0, null);
    					}
    				}

    				for (; i < each_blocks_4.length; i += 1) {
    					each_blocks_4[i].d(1);
    				}

    				each_blocks_4.length = each_value_6.length;
    			}

    			if (dirty[0] & /*$Budget, MånedNavn, PostsMd, KlikSlet, KlikEdit, AntalMåneder*/ 5255171) {
    				each_value_3 = [1, 2];
    				validate_each_argument(each_value_3);
    				let i;

    				for (i = 0; i < 2; i += 1) {
    					const child_ctx = get_each_context_3(ctx, each_value_3, i);

    					if (each_blocks_3[i]) {
    						each_blocks_3[i].p(child_ctx, dirty);
    						transition_in(each_blocks_3[i], 1);
    					} else {
    						each_blocks_3[i] = create_each_block_3(child_ctx);
    						each_blocks_3[i].c();
    						transition_in(each_blocks_3[i], 1);
    						each_blocks_3[i].m(tbody, t2);
    					}
    				}

    				group_outros();

    				for (i = 2; i < 2; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			if (!current || dirty[0] & /*AntalMåneder*/ 1 && td1_colspan_value !== (td1_colspan_value = /*AntalMåneder*/ ctx[0] + 1)) {
    				attr_dev(td1, "colspan", td1_colspan_value);
    			}

    			if ((!current || dirty[0] & /*$Budget*/ 2) && t11_value !== (t11_value = FormatBeløb(/*$Budget*/ ctx[1].startsaldo) + "")) set_data_dev(t11, t11_value);

    			if (!current || dirty[0] & /*AntalMåneder*/ 1 && td5_colspan_value !== (td5_colspan_value = /*AntalMåneder*/ ctx[0] - 1)) {
    				attr_dev(td5, "colspan", td5_colspan_value);
    			}

    			if (dirty[0] & /*BeløbHtml, RådighedMd, MånedNavn*/ 16797696) {
    				each_value_2 = /*MånedNavn*/ ctx[12];
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2(ctx, each_value_2, i);

    					if (each_blocks_2[i]) {
    						each_blocks_2[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_2[i] = create_each_block_2(child_ctx);
    						each_blocks_2[i].c();
    						each_blocks_2[i].m(tr3, null);
    					}
    				}

    				for (; i < each_blocks_2.length; i += 1) {
    					each_blocks_2[i].d(1);
    				}

    				each_blocks_2.length = each_value_2.length;
    			}

    			if (dirty[0] & /*BeløbHtml, UltimoMd, MånedNavn*/ 16781320) {
    				each_value_1 = /*MånedNavn*/ ctx[12];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_1[i] = create_each_block_1(child_ctx);
    						each_blocks_1[i].c();
    						each_blocks_1[i].m(tr4, null);
    					}
    				}

    				for (; i < each_blocks_1.length; i += 1) {
    					each_blocks_1[i].d(1);
    				}

    				each_blocks_1.length = each_value_1.length;
    			}

    			if (dirty[0] & /*BeløbHtml, LavesteMd, MånedNavn*/ 16814080) {
    				each_value = /*MånedNavn*/ ctx[12];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(tr5, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < 2; i += 1) {
    				transition_in(each_blocks_3[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks_3 = each_blocks_3.filter(Boolean);

    			for (let i = 0; i < 2; i += 1) {
    				transition_out(each_blocks_3[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(table);
    			destroy_each(each_blocks_4, detaching);
    			destroy_each(each_blocks_3, detaching);
    			destroy_each(each_blocks_2, detaching);
    			destroy_each(each_blocks_1, detaching);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(68:4) {#if Visning==='months'}",
    		ctx
    	});

    	return block;
    }

    // (146:12) {:else}
    function create_else_block_1(ctx) {
    	let td0;
    	let a0;
    	let icon0;
    	let t;
    	let td1;
    	let a1;
    	let icon1;
    	let current;
    	let mounted;
    	let dispose;
    	icon0 = new Icon({ props: { name: "edit" }, $$inline: true });
    	icon1 = new Icon({ props: { name: "trash" }, $$inline: true });

    	const block = {
    		c: function create() {
    			td0 = element("td");
    			a0 = element("a");
    			create_component(icon0.$$.fragment);
    			t = space();
    			td1 = element("td");
    			a1 = element("a");
    			create_component(icon1.$$.fragment);
    			attr_dev(a0, "href", "#");
    			attr_dev(a0, "class", "link-primary");
    			add_location(a0, file$1, 147, 16, 5610);
    			add_location(td0, file$1, 147, 12, 5606);
    			attr_dev(a1, "href", "#");
    			attr_dev(a1, "class", "link-danger");
    			add_location(a1, file$1, 149, 16, 5794);
    			add_location(td1, file$1, 149, 12, 5790);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, td0, anchor);
    			append_dev(td0, a0);
    			mount_component(icon0, a0, null);
    			insert_dev(target, t, anchor);
    			insert_dev(target, td1, anchor);
    			append_dev(td1, a1);
    			mount_component(icon1, a1, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(
    						a0,
    						"click",
    						prevent_default(function () {
    							if (is_function(/*KlikEdit*/ ctx[20](/*p*/ ctx[59].itemid))) /*KlikEdit*/ ctx[20](/*p*/ ctx[59].itemid).apply(this, arguments);
    						}),
    						false,
    						true,
    						false
    					),
    					listen_dev(
    						a1,
    						"click",
    						prevent_default(function () {
    							if (is_function(/*KlikSlet*/ ctx[22](/*p*/ ctx[59].itemid))) /*KlikSlet*/ ctx[22](/*p*/ ctx[59].itemid).apply(this, arguments);
    						}),
    						false,
    						true,
    						false
    					)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(icon0.$$.fragment, local);
    			transition_in(icon1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(icon0.$$.fragment, local);
    			transition_out(icon1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(td0);
    			destroy_component(icon0);
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(td1);
    			destroy_component(icon1);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_1.name,
    		type: "else",
    		source: "(146:12) {:else}",
    		ctx
    	});

    	return block;
    }

    // (144:12) {#if p.itemid===0}
    function create_if_block_3(ctx) {
    	let td;

    	const block = {
    		c: function create() {
    			td = element("td");
    			td.textContent = " ";
    			attr_dev(td, "colspan", "2");
    			add_location(td, file$1, 144, 12, 5485);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, td, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(td);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(144:12) {#if p.itemid===0}",
    		ctx
    	});

    	return block;
    }

    // (142:12) {#each Posts as p}
    function create_each_block_7(ctx) {
    	let tr;
    	let current_block_type_index;
    	let if_block;
    	let t0;
    	let td0;
    	let t1_value = FormatDate(/*p*/ ctx[59].dato) + "";
    	let t1;
    	let t2;
    	let td1;
    	let t3_value = /*p*/ ctx[59].beskriv + "";
    	let t3;
    	let t4;
    	let td2;
    	let raw0_value = /*BeløbHtml*/ ctx[24](/*p*/ ctx[59].beløb, false) + "";
    	let t5;
    	let td3;
    	let raw1_value = /*BeløbHtml*/ ctx[24](/*p*/ ctx[59].balance, true) + "";
    	let t6;
    	let current;
    	const if_block_creators = [create_if_block_3, create_else_block_1];
    	const if_blocks = [];

    	function select_block_type_2(ctx, dirty) {
    		if (/*p*/ ctx[59].itemid === 0) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type_2(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			tr = element("tr");
    			if_block.c();
    			t0 = space();
    			td0 = element("td");
    			t1 = text(t1_value);
    			t2 = space();
    			td1 = element("td");
    			t3 = text(t3_value);
    			t4 = space();
    			td2 = element("td");
    			t5 = space();
    			td3 = element("td");
    			t6 = space();
    			add_location(td0, file$1, 151, 12, 5934);
    			add_location(td1, file$1, 152, 12, 5977);
    			set_style(td2, "text-align", "right");
    			add_location(td2, file$1, 153, 12, 6011);
    			set_style(td3, "text-align", "right");
    			add_location(td3, file$1, 154, 12, 6091);
    			add_location(tr, file$1, 142, 12, 5435);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, tr, anchor);
    			if_blocks[current_block_type_index].m(tr, null);
    			append_dev(tr, t0);
    			append_dev(tr, td0);
    			append_dev(td0, t1);
    			append_dev(tr, t2);
    			append_dev(tr, td1);
    			append_dev(td1, t3);
    			append_dev(tr, t4);
    			append_dev(tr, td2);
    			td2.innerHTML = raw0_value;
    			append_dev(tr, t5);
    			append_dev(tr, td3);
    			td3.innerHTML = raw1_value;
    			append_dev(tr, t6);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type_2(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(tr, t0);
    			}

    			if ((!current || dirty[0] & /*Posts*/ 4) && t1_value !== (t1_value = FormatDate(/*p*/ ctx[59].dato) + "")) set_data_dev(t1, t1_value);
    			if ((!current || dirty[0] & /*Posts*/ 4) && t3_value !== (t3_value = /*p*/ ctx[59].beskriv + "")) set_data_dev(t3, t3_value);
    			if ((!current || dirty[0] & /*Posts*/ 4) && raw0_value !== (raw0_value = /*BeløbHtml*/ ctx[24](/*p*/ ctx[59].beløb, false) + "")) td2.innerHTML = raw0_value;			if ((!current || dirty[0] & /*Posts*/ 4) && raw1_value !== (raw1_value = /*BeløbHtml*/ ctx[24](/*p*/ ctx[59].balance, true) + "")) td3.innerHTML = raw1_value;		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(tr);
    			if_blocks[current_block_type_index].d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_7.name,
    		type: "each",
    		source: "(142:12) {#each Posts as p}",
    		ctx
    	});

    	return block;
    }

    // (73:12) {#each MånedNavn as md}
    function create_each_block_6(ctx) {
    	let th;
    	let t_value = /*md*/ ctx[45] + "";
    	let t;

    	const block = {
    		c: function create() {
    			th = element("th");
    			t = text(t_value);
    			add_location(th, file$1, 73, 12, 2534);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, th, anchor);
    			append_dev(th, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*MånedNavn*/ 4096 && t_value !== (t_value = /*md*/ ctx[45] + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(th);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_6.name,
    		type: "each",
    		source: "(73:12) {#each MånedNavn as md}",
    		ctx
    	});

    	return block;
    }

    // (83:12) {#if itm.udgift===(tp===1)}
    function create_if_block_2(ctx) {
    	let tr;
    	let td0;
    	let a0;
    	let icon0;
    	let t0;
    	let td1;
    	let a1;
    	let icon1;
    	let t1;
    	let td2;
    	let t2_value = /*itm*/ ctx[53].beskriv + "";
    	let t2;
    	let t3;
    	let current;
    	let mounted;
    	let dispose;
    	icon0 = new Icon({ props: { name: "edit" }, $$inline: true });
    	icon1 = new Icon({ props: { name: "trash" }, $$inline: true });
    	let each_value_5 = /*MånedNavn*/ ctx[12];
    	validate_each_argument(each_value_5);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_5.length; i += 1) {
    		each_blocks[i] = create_each_block_5(get_each_context_5(ctx, each_value_5, i));
    	}

    	const block = {
    		c: function create() {
    			tr = element("tr");
    			td0 = element("td");
    			a0 = element("a");
    			create_component(icon0.$$.fragment);
    			t0 = space();
    			td1 = element("td");
    			a1 = element("a");
    			create_component(icon1.$$.fragment);
    			t1 = space();
    			td2 = element("td");
    			t2 = text(t2_value);
    			t3 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(a0, "href", "#");
    			attr_dev(a0, "class", "link-primary");
    			add_location(a0, file$1, 85, 20, 3019);
    			add_location(td0, file$1, 85, 16, 3015);
    			attr_dev(a1, "href", "#");
    			attr_dev(a1, "class", "link-danger");
    			add_location(a1, file$1, 87, 20, 3209);
    			add_location(td1, file$1, 87, 16, 3205);
    			set_style(td2, "white-space", "nowrap");
    			add_location(td2, file$1, 88, 16, 3333);
    			add_location(tr, file$1, 83, 16, 2930);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, tr, anchor);
    			append_dev(tr, td0);
    			append_dev(td0, a0);
    			mount_component(icon0, a0, null);
    			append_dev(tr, t0);
    			append_dev(tr, td1);
    			append_dev(td1, a1);
    			mount_component(icon1, a1, null);
    			append_dev(tr, t1);
    			append_dev(tr, td2);
    			append_dev(td2, t2);
    			append_dev(tr, t3);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(tr, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(
    						a0,
    						"click",
    						prevent_default(function () {
    							if (is_function(/*KlikEdit*/ ctx[20](/*itm*/ ctx[53].id))) /*KlikEdit*/ ctx[20](/*itm*/ ctx[53].id).apply(this, arguments);
    						}),
    						false,
    						true,
    						false
    					),
    					listen_dev(
    						a1,
    						"click",
    						prevent_default(function () {
    							if (is_function(/*KlikSlet*/ ctx[22](/*itm*/ ctx[53].id))) /*KlikSlet*/ ctx[22](/*itm*/ ctx[53].id).apply(this, arguments);
    						}),
    						false,
    						true,
    						false
    					)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if ((!current || dirty[0] & /*$Budget*/ 2) && t2_value !== (t2_value = /*itm*/ ctx[53].beskriv + "")) set_data_dev(t2, t2_value);

    			if (dirty[0] & /*PostsMd, $Budget, MånedNavn*/ 12290) {
    				each_value_5 = /*MånedNavn*/ ctx[12];
    				validate_each_argument(each_value_5);
    				let i;

    				for (i = 0; i < each_value_5.length; i += 1) {
    					const child_ctx = get_each_context_5(ctx, each_value_5, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_5(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(tr, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_5.length;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(icon0.$$.fragment, local);
    			transition_in(icon1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(icon0.$$.fragment, local);
    			transition_out(icon1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(tr);
    			destroy_component(icon0);
    			destroy_component(icon1);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(83:12) {#if itm.udgift===(tp===1)}",
    		ctx
    	});

    	return block;
    }

    // (90:16) {#each MånedNavn as md,i}
    function create_each_block_5(ctx) {
    	let td;

    	let t_value = (/*PostsMd*/ ctx[13][/*itm*/ ctx[53].id + "." + /*i*/ ctx[47]] === undefined
    	? ""
    	: FormatBeløb(/*PostsMd*/ ctx[13][/*itm*/ ctx[53].id + "." + /*i*/ ctx[47]])) + "";

    	let t;

    	const block = {
    		c: function create() {
    			td = element("td");
    			t = text(t_value);
    			set_style(td, "text-align", "right");
    			add_location(td, file$1, 90, 16, 3443);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, td, anchor);
    			append_dev(td, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*PostsMd, $Budget*/ 8194 && t_value !== (t_value = (/*PostsMd*/ ctx[13][/*itm*/ ctx[53].id + "." + /*i*/ ctx[47]] === undefined
    			? ""
    			: FormatBeløb(/*PostsMd*/ ctx[13][/*itm*/ ctx[53].id + "." + /*i*/ ctx[47]])) + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(td);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_5.name,
    		type: "each",
    		source: "(90:16) {#each MånedNavn as md,i}",
    		ctx
    	});

    	return block;
    }

    // (82:12) {#each $Budget.items as itm}
    function create_each_block_4(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*itm*/ ctx[53].udgift === (/*tp*/ ctx[50] === 1) && create_if_block_2(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*itm*/ ctx[53].udgift === (/*tp*/ ctx[50] === 1)) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty[0] & /*$Budget*/ 2) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block_2(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_4.name,
    		type: "each",
    		source: "(82:12) {#each $Budget.items as itm}",
    		ctx
    	});

    	return block;
    }

    // (77:12) {#each [1,2] as tp}
    function create_each_block_3(ctx) {
    	let tr;
    	let td0;
    	let t1;
    	let td1;
    	let t2_value = (/*tp*/ ctx[50] === 1 ? "Udgifter" : "Indtægter") + "";
    	let t2;
    	let td1_colspan_value;
    	let t3;
    	let each_1_anchor;
    	let current;
    	let each_value_4 = /*$Budget*/ ctx[1].items;
    	validate_each_argument(each_value_4);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_4.length; i += 1) {
    		each_blocks[i] = create_each_block_4(get_each_context_4(ctx, each_value_4, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			tr = element("tr");
    			td0 = element("td");
    			td0.textContent = " ";
    			t1 = space();
    			td1 = element("td");
    			t2 = text(t2_value);
    			t3 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    			attr_dev(td0, "colspan", "2");
    			add_location(td0, file$1, 78, 16, 2656);
    			set_style(td1, "white-space", "nowrap");
    			set_style(td1, "font-weight", "bold");
    			attr_dev(td1, "colspan", td1_colspan_value = /*AntalMåneder*/ ctx[0] + 1);
    			add_location(td1, file$1, 79, 16, 2701);
    			add_location(tr, file$1, 77, 12, 2634);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, tr, anchor);
    			append_dev(tr, td0);
    			append_dev(tr, t1);
    			append_dev(tr, td1);
    			append_dev(td1, t2);
    			insert_dev(target, t3, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (!current || dirty[0] & /*AntalMåneder*/ 1 && td1_colspan_value !== (td1_colspan_value = /*AntalMåneder*/ ctx[0] + 1)) {
    				attr_dev(td1, "colspan", td1_colspan_value);
    			}

    			if (dirty[0] & /*MånedNavn, PostsMd, $Budget, KlikSlet, KlikEdit*/ 5255170) {
    				each_value_4 = /*$Budget*/ ctx[1].items;
    				validate_each_argument(each_value_4);
    				let i;

    				for (i = 0; i < each_value_4.length; i += 1) {
    					const child_ctx = get_each_context_4(ctx, each_value_4, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block_4(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value_4.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_4.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(tr);
    			if (detaching) detach_dev(t3);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_3.name,
    		type: "each",
    		source: "(77:12) {#each [1,2] as tp}",
    		ctx
    	});

    	return block;
    }

    // (110:12) {#each MånedNavn as md,i}
    function create_each_block_2(ctx) {
    	let td;
    	let raw_value = /*BeløbHtml*/ ctx[24](/*RådighedMd*/ ctx[14][/*i*/ ctx[47]], false) + "";

    	const block = {
    		c: function create() {
    			td = element("td");
    			set_style(td, "text-align", "right");
    			add_location(td, file$1, 110, 12, 4299);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, td, anchor);
    			td.innerHTML = raw_value;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*RådighedMd*/ 16384 && raw_value !== (raw_value = /*BeløbHtml*/ ctx[24](/*RådighedMd*/ ctx[14][/*i*/ ctx[47]], false) + "")) td.innerHTML = raw_value;		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(td);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2.name,
    		type: "each",
    		source: "(110:12) {#each MånedNavn as md,i}",
    		ctx
    	});

    	return block;
    }

    // (117:12) {#each MånedNavn as md,i}
    function create_each_block_1(ctx) {
    	let td;
    	let raw_value = /*BeløbHtml*/ ctx[24](/*UltimoMd*/ ctx[3][/*i*/ ctx[47]], true) + "";

    	const block = {
    		c: function create() {
    			td = element("td");
    			set_style(td, "text-align", "right");
    			add_location(td, file$1, 117, 12, 4584);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, td, anchor);
    			td.innerHTML = raw_value;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*UltimoMd*/ 8 && raw_value !== (raw_value = /*BeløbHtml*/ ctx[24](/*UltimoMd*/ ctx[3][/*i*/ ctx[47]], true) + "")) td.innerHTML = raw_value;		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(td);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(117:12) {#each MånedNavn as md,i}",
    		ctx
    	});

    	return block;
    }

    // (124:12) {#each MånedNavn as md,i}
    function create_each_block(ctx) {
    	let td;
    	let raw_value = /*BeløbHtml*/ ctx[24](/*LavesteMd*/ ctx[15][/*i*/ ctx[47]], true) + "";

    	const block = {
    		c: function create() {
    			td = element("td");
    			set_style(td, "text-align", "right");
    			add_location(td, file$1, 124, 12, 4868);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, td, anchor);
    			td.innerHTML = raw_value;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*LavesteMd*/ 32768 && raw_value !== (raw_value = /*BeløbHtml*/ ctx[24](/*LavesteMd*/ ctx[15][/*i*/ ctx[47]], true) + "")) td.innerHTML = raw_value;		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(td);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(124:12) {#each MånedNavn as md,i}",
    		ctx
    	});

    	return block;
    }

    // (179:4) <svelte:fragment slot="default">
    function create_default_slot_3(ctx) {
    	let p0;
    	let t0;
    	let br;
    	let t1;
    	let t2;
    	let p1;

    	const block = {
    		c: function create() {
    			p0 = element("p");
    			t0 = text("Du kan åbne dette budget igen senere ved at lave et bogmærke i din browser nu, og så åbne bogmærket senere.");
    			br = element("br");
    			t1 = text("\r\n    Eller du kan kopiere adressen (fra browserens adresse-felt) og gemme den et sikkert sted.");
    			t2 = space();
    			p1 = element("p");
    			p1.textContent = "Du kan også dele dit budget med andre (f.eks. bank-rådgiver eller revisor) ved at sende dem adressen.\r\n    Bemærk dog at dem du deler med også vil kunne ændre og/eller slette budgettet.\r\n    Overvej derfor at sende dem en kopi (brug \"Lav kopi\" funktionen, gem, og send dem så den nye adresse).";
    			add_location(br, file$1, 179, 114, 6978);
    			add_location(p0, file$1, 179, 4, 6868);
    			add_location(p1, file$1, 181, 4, 7089);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p0, anchor);
    			append_dev(p0, t0);
    			append_dev(p0, br);
    			append_dev(p0, t1);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, p1, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(p1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(179:4) <svelte:fragment slot=\\\"default\\\">",
    		ctx
    	});

    	return block;
    }

    // (186:4) <svelte:fragment slot="footer">
    function create_footer_slot_3(ctx) {
    	let button;

    	const block = {
    		c: function create() {
    			button = element("button");
    			button.textContent = "OK";
    			attr_dev(button, "type", "button");
    			attr_dev(button, "class", "btn btn-primary");
    			attr_dev(button, "data-bs-dismiss", "modal");
    			set_style(button, "min-width", "6rem");
    			add_location(button, file$1, 186, 4, 7456);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_footer_slot_3.name,
    		type: "slot",
    		source: "(186:4) <svelte:fragment slot=\\\"footer\\\">",
    		ctx
    	});

    	return block;
    }

    // (192:4) <svelte:fragment slot="default">
    function create_default_slot_2(ctx) {
    	let p0;
    	let t1;
    	let p1;

    	const block = {
    		c: function create() {
    			p0 = element("p");
    			p0.textContent = "Du arbejder nu i en kopi af dit tidligere budget.";
    			t1 = space();
    			p1 = element("p");
    			p1.textContent = "Hvis du ikke fik gemt adressen på dit originale budget, kan du gå tilbage til det med din browsers tilbage-knap.";
    			add_location(p0, file$1, 192, 4, 7692);
    			add_location(p1, file$1, 193, 4, 7754);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, p1, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(p1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(192:4) <svelte:fragment slot=\\\"default\\\">",
    		ctx
    	});

    	return block;
    }

    // (196:4) <svelte:fragment slot="footer">
    function create_footer_slot_2(ctx) {
    	let button;

    	const block = {
    		c: function create() {
    			button = element("button");
    			button.textContent = "OK";
    			attr_dev(button, "type", "button");
    			attr_dev(button, "class", "btn btn-primary");
    			attr_dev(button, "data-bs-dismiss", "modal");
    			set_style(button, "min-width", "6rem");
    			add_location(button, file$1, 196, 4, 7940);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_footer_slot_2.name,
    		type: "slot",
    		source: "(196:4) <svelte:fragment slot=\\\"footer\\\">",
    		ctx
    	});

    	return block;
    }

    // (202:4) <svelte:fragment slot="default">
    function create_default_slot_1(ctx) {
    	let p0;
    	let t1;
    	let p1;

    	const block = {
    		c: function create() {
    			p0 = element("p");
    			p0.textContent = "Du arbejder nu i et nyt budget.";
    			t1 = space();
    			p1 = element("p");
    			p1.textContent = "Hvis du ikke fik gemt adressen på dit tidligere budget, kan du gå tilbage til det med din browsers tilbage-knap.";
    			add_location(p0, file$1, 202, 4, 8177);
    			add_location(p1, file$1, 203, 4, 8221);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, p1, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(p1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(202:4) <svelte:fragment slot=\\\"default\\\">",
    		ctx
    	});

    	return block;
    }

    // (206:4) <svelte:fragment slot="footer">
    function create_footer_slot_1(ctx) {
    	let button;

    	const block = {
    		c: function create() {
    			button = element("button");
    			button.textContent = "OK";
    			attr_dev(button, "type", "button");
    			attr_dev(button, "class", "btn btn-primary");
    			attr_dev(button, "data-bs-dismiss", "modal");
    			set_style(button, "min-width", "6rem");
    			add_location(button, file$1, 206, 4, 8407);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_footer_slot_1.name,
    		type: "slot",
    		source: "(206:4) <svelte:fragment slot=\\\"footer\\\">",
    		ctx
    	});

    	return block;
    }

    // (212:4) <svelte:fragment slot="default">
    function create_default_slot(ctx) {
    	let p0;
    	let t1;
    	let p1;

    	const block = {
    		c: function create() {
    			p0 = element("p");
    			p0.textContent = "Dit budget eksisterer lige nu kun i din browser, og er helt væk når du lukker browser-vinduet/fanen.";
    			t1 = space();
    			p1 = element("p");
    			p1.textContent = "Hvis du slettede ved en fejl, kan du gemme budgettet igen ved at klikke på \"Gem i skyen\" knappen.\r\n    Budgettet vil så blive gemt igen på en ny adresse.";
    			add_location(p0, file$1, 212, 4, 8665);
    			add_location(p1, file$1, 213, 4, 8778);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, p1, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(p1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(212:4) <svelte:fragment slot=\\\"default\\\">",
    		ctx
    	});

    	return block;
    }

    // (217:4) <svelte:fragment slot="footer">
    function create_footer_slot(ctx) {
    	let button;

    	const block = {
    		c: function create() {
    			button = element("button");
    			button.textContent = "OK";
    			attr_dev(button, "type", "button");
    			attr_dev(button, "class", "btn btn-primary");
    			attr_dev(button, "data-bs-dismiss", "modal");
    			set_style(button, "min-width", "6rem");
    			add_location(button, file$1, 217, 4, 9005);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_footer_slot.name,
    		type: "slot",
    		source: "(217:4) <svelte:fragment slot=\\\"footer\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let p0;
    	let button0;
    	let icon0;
    	let t0;
    	let button0__disabled_value;
    	let t1;
    	let t2;
    	let hr0;
    	let t3;
    	let div;
    	let t4;
    	let formfield0;
    	let t5;
    	let formfield1;
    	let t6;
    	let formfield2;
    	let t7;
    	let hr1;
    	let t8;
    	let t9;
    	let p1;
    	let button1;
    	let icon1;
    	let t10;
    	let t11;
    	let modalitem;
    	let t12;
    	let bsmodal0;
    	let t13;
    	let bsmodal1;
    	let t14;
    	let bsmodal2;
    	let t15;
    	let bsmodal3;
    	let current;
    	let mounted;
    	let dispose;

    	icon0 = new Icon({
    			props: { name: "upload" },
    			$$inline: true
    		});

    	let if_block0 = /*$BudgetID*/ ctx[19] !== "nyt" && create_if_block_7(ctx);
    	let if_block1 = (/*$BudgetID*/ ctx[19] !== "nyt" || /*$Budget*/ ctx[1].items.length > 0) && create_if_block_5(ctx);

    	formfield0 = new FormField({
    			props: {
    				label: "Budget-navn",
    				$$slots: { default: [create_default_slot_6] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	formfield1 = new FormField({
    			props: {
    				label: "Første måned",
    				$$slots: { default: [create_default_slot_5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	formfield2 = new FormField({
    			props: {
    				label: "Startsaldo",
    				$$slots: { default: [create_default_slot_4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	let if_block2 = /*$Budget*/ ctx[1].items.length > 0 && create_if_block$1(ctx);
    	icon1 = new Icon({ props: { name: "add" }, $$inline: true });
    	let modalitem_props = { data: /*EditData*/ ctx[10] };
    	modalitem = new ModalItem({ props: modalitem_props, $$inline: true });
    	/*modalitem_binding*/ ctx[36](modalitem);
    	modalitem.$on("gem", /*GemItem*/ ctx[21]);

    	let bsmodal0_props = {
    		title: "Dit budget er nu gemt i skyen",
    		$$slots: {
    			footer: [create_footer_slot_3],
    			default: [create_default_slot_3]
    		},
    		$$scope: { ctx }
    	};

    	bsmodal0 = new Modal({ props: bsmodal0_props, $$inline: true });
    	/*bsmodal0_binding*/ ctx[37](bsmodal0);

    	let bsmodal1_props = {
    		title: "Lav Kopi",
    		$$slots: {
    			footer: [create_footer_slot_2],
    			default: [create_default_slot_2]
    		},
    		$$scope: { ctx }
    	};

    	bsmodal1 = new Modal({ props: bsmodal1_props, $$inline: true });
    	/*bsmodal1_binding*/ ctx[38](bsmodal1);

    	let bsmodal2_props = {
    		title: "Nyt budget",
    		$$slots: {
    			footer: [create_footer_slot_1],
    			default: [create_default_slot_1]
    		},
    		$$scope: { ctx }
    	};

    	bsmodal2 = new Modal({ props: bsmodal2_props, $$inline: true });
    	/*bsmodal2_binding*/ ctx[39](bsmodal2);

    	let bsmodal3_props = {
    		title: "Budget er slettet fra skyen",
    		$$slots: {
    			footer: [create_footer_slot],
    			default: [create_default_slot]
    		},
    		$$scope: { ctx }
    	};

    	bsmodal3 = new Modal({ props: bsmodal3_props, $$inline: true });
    	/*bsmodal3_binding*/ ctx[40](bsmodal3);

    	const block = {
    		c: function create() {
    			p0 = element("p");
    			button0 = element("button");
    			create_component(icon0.$$.fragment);
    			t0 = text(" Gem i skyen");
    			t1 = space();
    			if (if_block0) if_block0.c();
    			t2 = space();
    			hr0 = element("hr");
    			t3 = space();
    			div = element("div");
    			if (if_block1) if_block1.c();
    			t4 = space();
    			create_component(formfield0.$$.fragment);
    			t5 = space();
    			create_component(formfield1.$$.fragment);
    			t6 = space();
    			create_component(formfield2.$$.fragment);
    			t7 = space();
    			hr1 = element("hr");
    			t8 = space();
    			if (if_block2) if_block2.c();
    			t9 = space();
    			p1 = element("p");
    			button1 = element("button");
    			create_component(icon1.$$.fragment);
    			t10 = text(" Tilføj udgift/indtægt");
    			t11 = space();
    			create_component(modalitem.$$.fragment);
    			t12 = space();
    			create_component(bsmodal0.$$.fragment);
    			t13 = space();
    			create_component(bsmodal1.$$.fragment);
    			t14 = space();
    			create_component(bsmodal2.$$.fragment);
    			t15 = space();
    			create_component(bsmodal3.$$.fragment);
    			attr_dev(button0, ":disabled", button0__disabled_value = /*BudgetJSON*/ ctx[11] === /*$OldJSON*/ ctx[18] || /*$Budget*/ ctx[1].items.length === 0);
    			attr_dev(button0, "type", "button");
    			attr_dev(button0, "class", "btn btn-primary");
    			add_location(button0, file$1, 1, 4, 9);
    			add_location(p0, file$1, 0, 0, 0);
    			add_location(hr0, file$1, 17, 0, 760);
    			attr_dev(div, "class", "form horizontal-sm");
    			add_location(div, file$1, 19, 0, 770);
    			add_location(hr1, file$1, 43, 4, 1653);
    			attr_dev(button1, "type", "button");
    			attr_dev(button1, "class", "btn btn-primary");
    			add_location(button1, file$1, 172, 4, 6548);
    			add_location(p1, file$1, 171, 0, 6539);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p0, anchor);
    			append_dev(p0, button0);
    			mount_component(icon0, button0, null);
    			append_dev(button0, t0);
    			append_dev(p0, t1);
    			if (if_block0) if_block0.m(p0, null);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, hr0, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div, anchor);
    			if (if_block1) if_block1.m(div, null);
    			append_dev(div, t4);
    			mount_component(formfield0, div, null);
    			append_dev(div, t5);
    			mount_component(formfield1, div, null);
    			append_dev(div, t6);
    			mount_component(formfield2, div, null);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, hr1, anchor);
    			insert_dev(target, t8, anchor);
    			if (if_block2) if_block2.m(target, anchor);
    			insert_dev(target, t9, anchor);
    			insert_dev(target, p1, anchor);
    			append_dev(p1, button1);
    			mount_component(icon1, button1, null);
    			append_dev(button1, t10);
    			insert_dev(target, t11, anchor);
    			mount_component(modalitem, target, anchor);
    			insert_dev(target, t12, anchor);
    			mount_component(bsmodal0, target, anchor);
    			insert_dev(target, t13, anchor);
    			mount_component(bsmodal1, target, anchor);
    			insert_dev(target, t14, anchor);
    			mount_component(bsmodal2, target, anchor);
    			insert_dev(target, t15, anchor);
    			mount_component(bsmodal3, target, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*KlikSave*/ ctx[23], false, false, false),
    					listen_dev(button1, "click", /*click_handler*/ ctx[35], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (!current || dirty[0] & /*BudgetJSON, $OldJSON, $Budget*/ 264194 && button0__disabled_value !== (button0__disabled_value = /*BudgetJSON*/ ctx[11] === /*$OldJSON*/ ctx[18] || /*$Budget*/ ctx[1].items.length === 0)) {
    				attr_dev(button0, ":disabled", button0__disabled_value);
    			}

    			if (/*$BudgetID*/ ctx[19] !== "nyt") {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty[0] & /*$BudgetID*/ 524288) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_7(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(p0, null);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (/*$BudgetID*/ ctx[19] !== "nyt" || /*$Budget*/ ctx[1].items.length > 0) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty[0] & /*$BudgetID, $Budget*/ 524290) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block_5(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(div, t4);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			const formfield0_changes = {};

    			if (dirty[0] & /*$Budget*/ 2 | dirty[2] & /*$$scope*/ 1) {
    				formfield0_changes.$$scope = { dirty, ctx };
    			}

    			formfield0.$set(formfield0_changes);
    			const formfield1_changes = {};

    			if (dirty[0] & /*$Budget*/ 2 | dirty[2] & /*$$scope*/ 1) {
    				formfield1_changes.$$scope = { dirty, ctx };
    			}

    			formfield1.$set(formfield1_changes);
    			const formfield2_changes = {};

    			if (dirty[0] & /*$Budget*/ 2 | dirty[2] & /*$$scope*/ 1) {
    				formfield2_changes.$$scope = { dirty, ctx };
    			}

    			formfield2.$set(formfield2_changes);

    			if (/*$Budget*/ ctx[1].items.length > 0) {
    				if (if_block2) {
    					if_block2.p(ctx, dirty);

    					if (dirty[0] & /*$Budget*/ 2) {
    						transition_in(if_block2, 1);
    					}
    				} else {
    					if_block2 = create_if_block$1(ctx);
    					if_block2.c();
    					transition_in(if_block2, 1);
    					if_block2.m(t9.parentNode, t9);
    				}
    			} else if (if_block2) {
    				group_outros();

    				transition_out(if_block2, 1, 1, () => {
    					if_block2 = null;
    				});

    				check_outros();
    			}

    			const modalitem_changes = {};
    			if (dirty[0] & /*EditData*/ 1024) modalitem_changes.data = /*EditData*/ ctx[10];
    			modalitem.$set(modalitem_changes);
    			const bsmodal0_changes = {};

    			if (dirty[2] & /*$$scope*/ 1) {
    				bsmodal0_changes.$$scope = { dirty, ctx };
    			}

    			bsmodal0.$set(bsmodal0_changes);
    			const bsmodal1_changes = {};

    			if (dirty[2] & /*$$scope*/ 1) {
    				bsmodal1_changes.$$scope = { dirty, ctx };
    			}

    			bsmodal1.$set(bsmodal1_changes);
    			const bsmodal2_changes = {};

    			if (dirty[2] & /*$$scope*/ 1) {
    				bsmodal2_changes.$$scope = { dirty, ctx };
    			}

    			bsmodal2.$set(bsmodal2_changes);
    			const bsmodal3_changes = {};

    			if (dirty[2] & /*$$scope*/ 1) {
    				bsmodal3_changes.$$scope = { dirty, ctx };
    			}

    			bsmodal3.$set(bsmodal3_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(icon0.$$.fragment, local);
    			transition_in(if_block0);
    			transition_in(if_block1);
    			transition_in(formfield0.$$.fragment, local);
    			transition_in(formfield1.$$.fragment, local);
    			transition_in(formfield2.$$.fragment, local);
    			transition_in(if_block2);
    			transition_in(icon1.$$.fragment, local);
    			transition_in(modalitem.$$.fragment, local);
    			transition_in(bsmodal0.$$.fragment, local);
    			transition_in(bsmodal1.$$.fragment, local);
    			transition_in(bsmodal2.$$.fragment, local);
    			transition_in(bsmodal3.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(icon0.$$.fragment, local);
    			transition_out(if_block0);
    			transition_out(if_block1);
    			transition_out(formfield0.$$.fragment, local);
    			transition_out(formfield1.$$.fragment, local);
    			transition_out(formfield2.$$.fragment, local);
    			transition_out(if_block2);
    			transition_out(icon1.$$.fragment, local);
    			transition_out(modalitem.$$.fragment, local);
    			transition_out(bsmodal0.$$.fragment, local);
    			transition_out(bsmodal1.$$.fragment, local);
    			transition_out(bsmodal2.$$.fragment, local);
    			transition_out(bsmodal3.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p0);
    			destroy_component(icon0);
    			if (if_block0) if_block0.d();
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(hr0);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div);
    			if (if_block1) if_block1.d();
    			destroy_component(formfield0);
    			destroy_component(formfield1);
    			destroy_component(formfield2);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(hr1);
    			if (detaching) detach_dev(t8);
    			if (if_block2) if_block2.d(detaching);
    			if (detaching) detach_dev(t9);
    			if (detaching) detach_dev(p1);
    			destroy_component(icon1);
    			if (detaching) detach_dev(t11);
    			/*modalitem_binding*/ ctx[36](null);
    			destroy_component(modalitem, detaching);
    			if (detaching) detach_dev(t12);
    			/*bsmodal0_binding*/ ctx[37](null);
    			destroy_component(bsmodal0, detaching);
    			if (detaching) detach_dev(t13);
    			/*bsmodal1_binding*/ ctx[38](null);
    			destroy_component(bsmodal1, detaching);
    			if (detaching) detach_dev(t14);
    			/*bsmodal2_binding*/ ctx[39](null);
    			destroy_component(bsmodal2, detaching);
    			if (detaching) detach_dev(t15);
    			/*bsmodal3_binding*/ ctx[40](null);
    			destroy_component(bsmodal3, detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function LavNyItem() {
    	return {
    		id: 0,
    		udgift: true,
    		beskriv: "",
    		variabelt: false,
    		fastbeløb: 0,
    		varbeløb: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    		hyppighed: 6,
    		betalingsmåneder: [
    			false,
    			false,
    			false,
    			false,
    			false,
    			false,
    			false,
    			false,
    			false,
    			false,
    			false,
    			false
    		],
    		start: "",
    		harslut: false,
    		slut: ""
    	};
    }

    function LastDayOfMonth(year, monthIdx) {
    	if (monthIdx !== 1) return [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][monthIdx];
    	if (year === 2100) return 28;
    	return year % 4 === 0 ? 29 : 28;
    }

    function ParseInputDato(x) {
    	return new Date(parseInt(x.substr(0, 4)), parseInt(x.substr(5, 2)) - 1, parseInt(x.substr(8, 2)));
    }

    function FixDato(year, monthIdx, day) {
    	let ldm = LastDayOfMonth(year, monthIdx);
    	if (day > ldm) day = ldm;
    	return new Date(year, monthIdx, day);
    }

    function FormatDate(d) {
    	return (d.getDate() + 100).toString().substr(1) + "." + (d.getMonth() + 101).toString().substr(1) + "." + d.getFullYear();
    }

    function BrowserKanDele() {
    	return navigator.share !== undefined;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let BudgetJSON;
    	let FraDato;
    	let TilDato;
    	let MånedNavn;
    	let Posts;
    	let PostsMd;
    	let RådighedMd;
    	let UltimoMd;
    	let LavesteMd;
    	let GnsUdgift;
    	let GnsIndtægt;
    	let $Budget;
    	let $OldJSON;
    	let $BudgetID;
    	validate_store(Budget, "Budget");
    	component_subscribe($$self, Budget, $$value => $$invalidate(1, $Budget = $$value));
    	validate_store(OldJSON, "OldJSON");
    	component_subscribe($$self, OldJSON, $$value => $$invalidate(18, $OldJSON = $$value));
    	validate_store(BudgetID, "BudgetID");
    	component_subscribe($$self, BudgetID, $$value => $$invalidate(19, $BudgetID = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("BudgetPage", slots, []);
    	let MyModalItem;
    	let ModalGemt;
    	let ModalNyt;
    	let ModalKopi;
    	let ModalSletSky;
    	let Visning = "months";
    	let AntalMåneder = 12;
    	let EditID = 0;
    	let EditData = null;

    	function IkkeÆndret() {
    		set_store_value(OldJSON, $OldJSON = BudgetJSON, $OldJSON);
    	}

    	function KlikEdit(id) {
    		if (id === 0) {
    			EditID = 0;
    			$$invalidate(10, EditData = LavNyItem());
    		} else {
    			let item = $Budget.items.find(itm => itm.id === id);
    			EditID = id;
    			$$invalidate(10, EditData = JSON.parse(JSON.stringify(item)));
    		}

    		MyModalItem.Show();
    	}

    	function GemItem() {
    		if (EditID === 0) {
    			EditID = set_store_value(Budget, $Budget.nextid++, $Budget);
    			$$invalidate(10, EditData.id = EditID, EditData);
    			$Budget.items.push(EditData);
    		} else {
    			let idx = $Budget.items.findIndex(itm => itm.id === EditID);
    			set_store_value(Budget, $Budget.items[idx] = EditData, $Budget);
    		}

    		set_store_value(
    			Budget,
    			$Budget.items = $Budget.items.sort(function (a, b) {
    				let aa = a.beskriv.toLowerCase();
    				let bb = b.beskriv.toLowerCase();
    				if (aa < bb) return -1;
    				if (aa > bb) return 1;
    				return 0;
    			}),
    			$Budget
    		);

    		MyModalItem.Hide();
    	}

    	function KlikSlet(id) {
    		let idx = $Budget.items.findIndex(itm => itm.id === id);
    		if (idx < 0) return;
    		$Budget.items.splice(idx, 1);
    		Budget.set($Budget);
    	}

    	async function KlikSave() {
    		if ($BudgetID !== "nyt" && BudgetJSON === $OldJSON) return;

    		if ($BudgetID === "nyt") {
    			let r = await fetch("/api/budget", {
    				method: "POST",
    				headers: { "Content-Type": "application/json" },
    				body: JSON.stringify($Budget)
    			});

    			if (r.status !== 201) {
    				alert("Unexpected response status code (" + r.status + ") received");
    				return;
    			}

    			set_store_value(BudgetID, $BudgetID = r.headers.get("Location").substr(1), $BudgetID);
    			document.location.hash = $BudgetID;
    			ModalGemt.Show();
    		} else {
    			let r = await fetch("/api/budget/" + $BudgetID, {
    				method: "PUT",
    				headers: { "Content-Type": "application/json" },
    				body: JSON.stringify($Budget)
    			});

    			if (!r.ok) {
    				alert("Unexpected response (status code " + r.status + ") received");
    				return;
    			}
    		}

    		IkkeÆndret();
    	}

    	function LavItemPosteringer(item) {
    		let Dato1 = ParseInputDato(item.start);
    		let Dato1LDM = Dato1.getDate() === LastDayOfMonth(Dato1.getFullYear(), Dato1.getMonth());

    		let Dato2 = item.harslut
    		? ParseInputDato(item.slut)
    		: new Date(3000, 0, 1);

    		let Dag = Dato1.getDate();
    		let rv = [];
    		let TxDato;

    		if (item.variabelt) {
    			let CurMd = FraDato.getMonth();
    			let CurÅr = FraDato.getFullYear();

    			TxDato = Dato1LDM
    			? new Date(CurÅr, CurMd, LastDayOfMonth(CurÅr, CurMd))
    			: FixDato(CurÅr, CurMd, Dag);

    			while (TxDato <= Dato2 && TxDato <= TilDato) {
    				if (TxDato >= Dato1 && item.varbeløb[CurMd] !== 0) {
    					rv.push({
    						itemid: item.id,
    						dato: TxDato,
    						beskriv: item.beskriv,
    						beløb: item.udgift
    						? -item.varbeløb[CurMd]
    						: item.varbeløb[CurMd],
    						udgift: item.udgift
    					});
    				}

    				CurMd += 1;

    				if (CurMd > 11) {
    					CurMd -= 12;
    					CurÅr += 1;
    				}

    				TxDato = Dato1LDM
    				? new Date(CurÅr, CurMd, LastDayOfMonth(CurÅr, CurMd))
    				: FixDato(CurÅr, CurMd, Dag);
    			}
    		} else if (item.hyppighed < 5) {
    			// dag-baseret frekvens
    			let step = 7; // 1=ugentligt

    			if (item.hyppighed === 2) step = 14; // hver anden uge
    			if (item.hyppighed === 3) step = 21; // hver tredie uge
    			if (item.hyppighed === 4) step = 28; // hver fjerde uge
    			TxDato = Dato1;

    			while (TxDato <= Dato2 && TxDato <= TilDato) {
    				if (TxDato >= FraDato) {
    					rv.push({
    						itemid: item.id,
    						dato: TxDato,
    						beskriv: item.beskriv,
    						beløb: item.udgift ? -item.fastbeløb : item.fastbeløb,
    						udgift: item.udgift
    					});
    				}

    				TxDato = new Date(TxDato.getTime() + step * 86400000); // 86.400.000 = 24 * 60 * 60 * 1000
    			}
    		} else {
    			// måned-baseret frekvens
    			let CurÅr = Dato1.getFullYear();

    			let CurMd = Dato1.getMonth();
    			let step = 1; // 5= to gange pr. md
    			if (item.hyppighed === 6) step = 1; // hver md
    			if (item.hyppighed === 7) step = 2; // hver anden md
    			if (item.hyppighed === 8) step = 3; // kvartal
    			if (item.hyppighed === 9) step = 4; // 3 gange årligt
    			if (item.hyppighed === 10) step = 6; // halvårligt
    			if (item.hyppighed === 11) step = 12; // årligt
    			if (item.hyppighed === 12) step = 1; // anførte

    			TxDato = Dato1LDM
    			? new Date(CurÅr, CurMd, LastDayOfMonth(CurÅr, CurMd))
    			: FixDato(CurÅr, CurMd, Dag);

    			while (TxDato <= Dato2 && TxDato <= TilDato) {
    				if (TxDato >= FraDato && TxDato >= Dato1 && (item.hyppighed !== 12 || item.betalingsmåneder[CurMd])) {
    					rv.push({
    						itemid: item.id,
    						dato: TxDato,
    						beskriv: item.beskriv,
    						beløb: item.udgift ? -item.fastbeløb : item.fastbeløb,
    						udgift: item.udgift
    					});
    				}

    				if (item.hyppighed === 5) {
    					// 2 gange pr. md - skub en mere ind om 15 dage
    					TxDato = new Date(TxDato.getTime() + 15 * 86400000); // 86.400.000 = 24 * 60 * 60 * 1000

    					if (TxDato >= FraDato && TxDato <= TilDato && TxDato >= Dato1 && TxDato <= Dato2) {
    						rv.push({
    							itemid: item.id,
    							dato: TxDato,
    							beskriv: item.beskriv,
    							beløb: item.udgift ? -item.fastbeløb : item.fastbeløb,
    							udgift: item.udgift
    						});
    					}
    				}

    				CurMd += step;

    				if (CurMd > 11) {
    					CurMd -= 12;
    					CurÅr += 1;
    				}

    				TxDato = Dato1LDM
    				? new Date(CurÅr, CurMd, LastDayOfMonth(CurÅr, CurMd))
    				: FixDato(CurÅr, CurMd, Dag);
    			}
    		}

    		return rv;
    	}

    	function BeløbHtml(v, redNegtaive) {
    		if (v < 0 && redNegtaive) return "<span style=\"color:red\">" + FormatBeløb(v) + "</span>";
    		return FormatBeløb(v);
    	}

    	function DelUrl() {
    		navigator.share({
    			title: "Mit-Budget.dk - " + $Budget.navn,
    			url: window.location.href
    		});
    	}

    	function KlikNyt() {
    		set_store_value(Budget, $Budget = LavNyt(), $Budget);
    		IkkeÆndret();
    		set_store_value(BudgetID, $BudgetID = "nyt", $BudgetID);
    		document.location.hash = "nyt";
    		ModalNyt.Show();
    	}

    	function KlikKopi() {
    		set_store_value(Budget, $Budget.navn += " (kopi)", $Budget);
    		set_store_value(BudgetID, $BudgetID = "nyt", $BudgetID);
    		document.location.hash = "nyt";
    		ModalKopi.Show();
    	}

    	async function KlikSletSky() {
    		if ($BudgetID === "nyt") return;
    		let r = await fetch("/api/budget/" + $BudgetID, { method: "DELETE" });

    		if (r.status !== 204) {
    			alert("Unexpected response status code (" + r.status + ") received");
    			return;
    		}

    		set_store_value(BudgetID, $BudgetID = "nyt", $BudgetID);
    		document.location.hash = "nyt";
    		set_store_value(OldJSON, $OldJSON = "dummy", $OldJSON);
    		ModalSletSky.Show();
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<BudgetPage> was created with unknown prop '${key}'`);
    	});

    	function input_input_handler() {
    		$Budget.navn = this.value;
    		Budget.set($Budget);
    	}

    	function input_input_handler_1() {
    		$Budget.startmåned = this.value;
    		Budget.set($Budget);
    	}

    	function amount_value_binding(value) {
    		if ($$self.$$.not_equal($Budget.startsaldo, value)) {
    			$Budget.startsaldo = value;
    			Budget.set($Budget);
    		}
    	}

    	function select_change_handler() {
    		Visning = select_value(this);
    		$$invalidate(9, Visning);
    	}

    	function select_change_handler_1() {
    		AntalMåneder = select_value(this);
    		$$invalidate(0, AntalMåneder);
    	}

    	const click_handler = () => KlikEdit(0);

    	function modalitem_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			MyModalItem = $$value;
    			$$invalidate(4, MyModalItem);
    		});
    	}

    	function bsmodal0_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			ModalGemt = $$value;
    			$$invalidate(5, ModalGemt);
    		});
    	}

    	function bsmodal1_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			ModalKopi = $$value;
    			$$invalidate(7, ModalKopi);
    		});
    	}

    	function bsmodal2_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			ModalNyt = $$value;
    			$$invalidate(6, ModalNyt);
    		});
    	}

    	function bsmodal3_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			ModalSletSky = $$value;
    			$$invalidate(8, ModalSletSky);
    		});
    	}

    	$$self.$capture_state = () => ({
    		FormatBeløb,
    		LavNyt,
    		BudgetID,
    		Budget,
    		OldJSON,
    		Formfield: FormField,
    		Amount,
    		Icon,
    		BSModal: Modal,
    		ModalItem,
    		MyModalItem,
    		ModalGemt,
    		ModalNyt,
    		ModalKopi,
    		ModalSletSky,
    		Visning,
    		AntalMåneder,
    		EditID,
    		EditData,
    		LavNyItem,
    		IkkeÆndret,
    		KlikEdit,
    		GemItem,
    		KlikSlet,
    		KlikSave,
    		LastDayOfMonth,
    		ParseInputDato,
    		FixDato,
    		LavItemPosteringer,
    		BeløbHtml,
    		FormatDate,
    		BrowserKanDele,
    		DelUrl,
    		KlikNyt,
    		KlikKopi,
    		KlikSletSky,
    		BudgetJSON,
    		$Budget,
    		FraDato,
    		TilDato,
    		MånedNavn,
    		Posts,
    		PostsMd,
    		RådighedMd,
    		UltimoMd,
    		LavesteMd,
    		GnsUdgift,
    		GnsIndtægt,
    		$OldJSON,
    		$BudgetID
    	});

    	$$self.$inject_state = $$props => {
    		if ("MyModalItem" in $$props) $$invalidate(4, MyModalItem = $$props.MyModalItem);
    		if ("ModalGemt" in $$props) $$invalidate(5, ModalGemt = $$props.ModalGemt);
    		if ("ModalNyt" in $$props) $$invalidate(6, ModalNyt = $$props.ModalNyt);
    		if ("ModalKopi" in $$props) $$invalidate(7, ModalKopi = $$props.ModalKopi);
    		if ("ModalSletSky" in $$props) $$invalidate(8, ModalSletSky = $$props.ModalSletSky);
    		if ("Visning" in $$props) $$invalidate(9, Visning = $$props.Visning);
    		if ("AntalMåneder" in $$props) $$invalidate(0, AntalMåneder = $$props.AntalMåneder);
    		if ("EditID" in $$props) EditID = $$props.EditID;
    		if ("EditData" in $$props) $$invalidate(10, EditData = $$props.EditData);
    		if ("BudgetJSON" in $$props) $$invalidate(11, BudgetJSON = $$props.BudgetJSON);
    		if ("FraDato" in $$props) $$invalidate(29, FraDato = $$props.FraDato);
    		if ("TilDato" in $$props) TilDato = $$props.TilDato;
    		if ("MånedNavn" in $$props) $$invalidate(12, MånedNavn = $$props.MånedNavn);
    		if ("Posts" in $$props) $$invalidate(2, Posts = $$props.Posts);
    		if ("PostsMd" in $$props) $$invalidate(13, PostsMd = $$props.PostsMd);
    		if ("RådighedMd" in $$props) $$invalidate(14, RådighedMd = $$props.RådighedMd);
    		if ("UltimoMd" in $$props) $$invalidate(3, UltimoMd = $$props.UltimoMd);
    		if ("LavesteMd" in $$props) $$invalidate(15, LavesteMd = $$props.LavesteMd);
    		if ("GnsUdgift" in $$props) $$invalidate(16, GnsUdgift = $$props.GnsUdgift);
    		if ("GnsIndtægt" in $$props) $$invalidate(17, GnsIndtægt = $$props.GnsIndtægt);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*$Budget*/ 2) {
    			$$invalidate(11, BudgetJSON = JSON.stringify($Budget));
    		}

    		if ($$self.$$.dirty[0] & /*$Budget*/ 2) {
    			$$invalidate(29, FraDato = new Date(parseInt($Budget.startmåned.substr(0, 4)), parseInt($Budget.startmåned.substr(5, 2)) - 1, 1));
    		}

    		if ($$self.$$.dirty[0] & /*FraDato, AntalMåneder*/ 536870913) {
    			TilDato = (function () {
    				let tilÅr = FraDato.getFullYear();
    				let tilMd = FraDato.getMonth() + AntalMåneder - 1;

    				while (tilMd > 11) {
    					tilÅr += 1;
    					tilMd -= 12;
    				}

    				return new Date(tilÅr, tilMd, LastDayOfMonth(tilÅr, tilMd));
    			})();
    		}

    		if ($$self.$$.dirty[0] & /*FraDato, AntalMåneder*/ 536870913) {
    			$$invalidate(12, MånedNavn = (function () {
    				let År = FraDato.getFullYear();
    				let Md = FraDato.getMonth();
    				let rv = new Array(AntalMåneder);

    				for (let i = 0; i < AntalMåneder; i++) {
    					rv[i] = [
    						"Jan",
    						"Feb",
    						"Mar",
    						"Apr",
    						"Maj",
    						"Jun",
    						"Jul",
    						"Aug",
    						"Sep",
    						"Okt",
    						"Nov",
    						"Dec"
    					][Md] + " " + År.toString().substr(2);

    					Md += 1;

    					if (Md > 11) {
    						Md = 0;
    						År += 1;
    					}
    				}

    				return rv;
    			})());
    		}

    		if ($$self.$$.dirty[0] & /*$Budget, FraDato*/ 536870914) {
    			$$invalidate(2, Posts = (function () {
    				let rv = [];

    				if ($Budget.startsaldo !== 0) rv.push({
    					itemid: 0,
    					dato: FraDato,
    					beskriv: "Start saldo",
    					beløb: $Budget.startsaldo,
    					udgift: false
    				});

    				for (let itm of $Budget.items) {
    					rv = rv.concat(LavItemPosteringer(itm));
    				}

    				rv.sort(function (a, b) {
    					if (a.dato < b.dato) return -1;
    					if (a.dato > b.dato) return 1;
    					return 0;
    				});

    				let bal = 0;

    				for (let p of rv) {
    					bal += p.beløb;
    					p.balance = bal;
    				}

    				return rv;
    			})());
    		}

    		if ($$self.$$.dirty[0] & /*FraDato, Posts*/ 536870916) {
    			$$invalidate(13, PostsMd = (function () {
    				let fm = FraDato.getFullYear() * 12 + FraDato.getMonth();
    				let CellID, MIdx;
    				let rv = {};

    				for (let p of Posts) {
    					MIdx = p.dato.getFullYear() * 12 + p.dato.getMonth() - fm;
    					CellID = p.itemid + "." + MIdx;

    					rv[CellID] = rv[CellID] === undefined
    					? p.beløb
    					: rv[CellID] + p.beløb;
    				}

    				return rv;
    			})());
    		}

    		if ($$self.$$.dirty[0] & /*FraDato, AntalMåneder, Posts*/ 536870917) {
    			$$invalidate(14, RådighedMd = (function () {
    				let fm = FraDato.getFullYear() * 12 + FraDato.getMonth();
    				let MIdx;
    				let rv = [];
    				for (let i = 0; i < AntalMåneder; i++) rv[i] = 0;

    				for (let p of Posts) {
    					if (p.itemid === 0) continue;
    					MIdx = p.dato.getFullYear() * 12 + p.dato.getMonth() - fm;
    					rv[MIdx] = rv[MIdx] === undefined ? p.beløb : rv[MIdx] + p.beløb;
    				}

    				return rv;
    			})());
    		}

    		if ($$self.$$.dirty[0] & /*FraDato, AntalMåneder, Posts*/ 536870917) {
    			$$invalidate(3, UltimoMd = (function () {
    				let fm = FraDato.getFullYear() * 12 + FraDato.getMonth();
    				let MIdx;
    				let rv = [];
    				let cm = 0;
    				let bal = 0;
    				for (let i = 0; i < AntalMåneder; i++) rv[i] = 0;

    				for (let p of Posts) {
    					MIdx = p.dato.getFullYear() * 12 + p.dato.getMonth() - fm;

    					while (MIdx > cm) {
    						rv[cm] = bal;
    						cm += 1;
    					}

    					bal = p.balance;
    				}

    				while (AntalMåneder > cm) {
    					rv[cm] = bal;
    					cm += 1;
    				}

    				return rv;
    			})());
    		}

    		if ($$self.$$.dirty[0] & /*FraDato, AntalMåneder, Posts, UltimoMd*/ 536870925) {
    			$$invalidate(15, LavesteMd = (function () {
    				let fm = FraDato.getFullYear() * 12 + FraDato.getMonth();
    				let MIdx;
    				let rv = [];
    				let cm = 0;
    				let lav = 0;
    				for (let i = 0; i < AntalMåneder; i++) rv[i] = 0;

    				for (let p of Posts) {
    					if (p.itemid === 0) lav = p.beløb;
    					MIdx = p.dato.getFullYear() * 12 + p.dato.getMonth() - fm;

    					while (MIdx > cm) {
    						rv[cm] = lav;
    						lav = UltimoMd[cm];
    						cm += 1;
    					}

    					if (p.balance < lav) lav = p.balance;
    				}

    				while (AntalMåneder > cm) {
    					rv[cm] = lav;
    					lav = UltimoMd[cm];
    					cm += 1;
    				}

    				return rv;
    			})());
    		}

    		if ($$self.$$.dirty[0] & /*Posts, AntalMåneder*/ 5) {
    			$$invalidate(16, GnsUdgift = (function () {
    				let rv = 0;
    				for (let p of Posts) if (p.udgift) rv += p.beløb;
    				return -rv / AntalMåneder;
    			})());
    		}

    		if ($$self.$$.dirty[0] & /*Posts, $Budget, AntalMåneder*/ 7) {
    			$$invalidate(17, GnsIndtægt = (function () {
    				let rv = 0;
    				for (let p of Posts) if (!p.udgift) rv += p.beløb;
    				rv -= $Budget.startsaldo;
    				return rv / AntalMåneder;
    			})());
    		}
    	};

    	return [
    		AntalMåneder,
    		$Budget,
    		Posts,
    		UltimoMd,
    		MyModalItem,
    		ModalGemt,
    		ModalNyt,
    		ModalKopi,
    		ModalSletSky,
    		Visning,
    		EditData,
    		BudgetJSON,
    		MånedNavn,
    		PostsMd,
    		RådighedMd,
    		LavesteMd,
    		GnsUdgift,
    		GnsIndtægt,
    		$OldJSON,
    		$BudgetID,
    		KlikEdit,
    		GemItem,
    		KlikSlet,
    		KlikSave,
    		BeløbHtml,
    		DelUrl,
    		KlikNyt,
    		KlikKopi,
    		KlikSletSky,
    		FraDato,
    		input_input_handler,
    		input_input_handler_1,
    		amount_value_binding,
    		select_change_handler,
    		select_change_handler_1,
    		click_handler,
    		modalitem_binding,
    		bsmodal0_binding,
    		bsmodal1_binding,
    		bsmodal2_binding,
    		bsmodal3_binding
    	];
    }

    class BudgetPage extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {}, [-1, -1, -1]);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "BudgetPage",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.37.0 */
    const file = "src\\App.svelte";

    // (9:0) {:else}
    function create_else_block(ctx) {
    	let budgetpage;
    	let current;
    	budgetpage = new BudgetPage({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(budgetpage.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(budgetpage, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(budgetpage.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(budgetpage.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(budgetpage, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(9:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (4:25) 
    function create_if_block_1(ctx) {
    	let div;
    	let span;

    	const block = {
    		c: function create() {
    			div = element("div");
    			span = element("span");
    			span.textContent = "Loading...";
    			attr_dev(span, "class", "visually-hidden");
    			add_location(span, file, 5, 2, 192);
    			attr_dev(div, "class", "spinner-border text-primary");
    			attr_dev(div, "role", "status");
    			add_location(div, file, 4, 1, 133);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, span);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(4:25) ",
    		ctx
    	});

    	return block;
    }

    // (1:0) {#if $BudgetID === null}
    function create_if_block(ctx) {
    	let a;
    	let icon;
    	let t;
    	let current;
    	icon = new Icon({ props: { name: "new" }, $$inline: true });

    	const block = {
    		c: function create() {
    			a = element("a");
    			create_component(icon.$$.fragment);
    			t = text(" Nyt budget");
    			attr_dev(a, "href", "#nyt");
    			attr_dev(a, "class", "btn btn-primary");
    			add_location(a, file, 1, 1, 27);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			mount_component(icon, a, null);
    			append_dev(a, t);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(icon.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(icon.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			destroy_component(icon);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(1:0) {#if $BudgetID === null}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block, create_if_block_1, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*$BudgetID*/ ctx[0] === null) return 0;
    		if (/*$Budget*/ ctx[1] === null) return 1;
    		return 2;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index !== previous_block_index) {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
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
    	let $BudgetID;
    	let $Budget;
    	let $OldJSON;
    	validate_store(BudgetID, "BudgetID");
    	component_subscribe($$self, BudgetID, $$value => $$invalidate(0, $BudgetID = $$value));
    	validate_store(Budget, "Budget");
    	component_subscribe($$self, Budget, $$value => $$invalidate(1, $Budget = $$value));
    	validate_store(OldJSON, "OldJSON");
    	component_subscribe($$self, OldJSON, $$value => $$invalidate(2, $OldJSON = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("App", slots, []);

    	async function HashChanged() {
    		let h = window.location.hash;
    		let NewID = h.length <= 1 ? null : h.substr(1);
    		if (NewID === $BudgetID) return;
    		document.getElementById("base").style.maxWidth = NewID === null ? "960px" : "";
    		document.getElementById("intro").style.display = NewID === null ? "block" : "none";
    		document.body.style.backgroundColor = NewID === null ? "#ccc" : "white";
    		set_store_value(BudgetID, $BudgetID = NewID, $BudgetID);
    		if (NewID === null) return;

    		if (NewID === "nyt") {
    			set_store_value(Budget, $Budget = LavNyt(), $Budget);
    			set_store_value(OldJSON, $OldJSON = JSON.stringify($Budget), $OldJSON);
    			return;
    		}

    		set_store_value(Budget, $Budget = null, $Budget);
    		let r = await fetch("/api/budget/" + NewID);

    		if (r.status === 404) {
    			alert("Det angive budget findes ikke!");
    			set_store_value(BudgetID, $BudgetID = null, $BudgetID);
    			document.location.hash = "";
    			return;
    		}

    		if (r.status !== 200) {
    			alert("Unexpected response status code (" + r.status + ") received");
    			set_store_value(BudgetID, $BudgetID = null, $BudgetID);
    			document.location.hash = "";
    			return;
    		}

    		set_store_value(Budget, $Budget = await r.json(), $Budget);
    		set_store_value(OldJSON, $OldJSON = JSON.stringify($Budget), $OldJSON);
    	}

    	window.addEventListener("hashchange", HashChanged, false);
    	HashChanged();

    	window.addEventListener("beforeunload", function (e) {
    		if ($BudgetID !== null && $Budget !== null && $OldJSON !== JSON.stringify($Budget)) e.returnValue = "Dine ændringer er ikke gemt. Vil du stadig lukke browser-vinduet/tabben?";
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		LavNyt,
    		BudgetID,
    		Budget,
    		OldJSON,
    		BudgetPage,
    		Icon,
    		HashChanged,
    		$BudgetID,
    		$Budget,
    		$OldJSON
    	});

    	return [$BudgetID, $Budget];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.getElementById('app'),
    	props: {
    	}
    });

    return app;

}());
//# sourceMappingURL=mit-budget-svelte.js.map
