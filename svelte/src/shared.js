import { writable } from 'svelte/store';

export let BudgetID=writable(null);
export let Budget=writable(null);
export let OldJSON=writable(null);

export function FormatBeløb(v) {
	let x = v.toFixed(2).replace('.', ',');
	let rv = x.substr(x.length - 3);
	x = x.substr(0, x.length - 3);
	while (x.length > 4 || (x.length === 4 && x.charAt(0) !== '-')) {
		rv ='.' + x.substr(x.length - 3) + rv;
		x = x.substr(0, x.length - 3);
	}
	return x + rv;
}

export function Validity(node, val) {
    if(!!val) node.setCustomValidity(val);
    return {
        update(newVal) {
            node.setCustomValidity(newVal?newVal:'');
        }
    };
}

export function LavNyt() {
	return {
		navn: '',
		startmåned: (new Date()).getFullYear() + '-' + ((new Date()).getMonth() + 101).toString().substr(1),
		startsaldo: 0,
		items: [],
		nextid: 1,
	};
}

export function RndHexStr(length) {
	let rv='';
	for (let i = 0; i < length; i++) {
		rv += Math.floor(Math.random() * 16).toString(16);
	 }
	return rv; 
}