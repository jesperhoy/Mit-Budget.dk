<input type="text"
    bind:this={el}
    on:input={()=>Input(false)}
    on:change={()=>Input(true)}
    value={DispVal}
    use:Validity={IsValid ? validity:'Ugyldig værdi'}
    required={required}
    style="text-align:right;max-width:125px"
    class="form-control"/>

<script>
import {FormatBeløb,Validity} from './shared.js';
export let value=0;
export let validity='';
export let required=false;

let el;
let myval=0;
let DispVal='';
let IsValid=true;

function Input(changed) {
    let vs =el.value.split('.').join('').split(',').join('.').split(' ').join('');
    let v = vs === '' ? 0 : Math.round(parseFloat(vs) * 100) / 100;
    if (isNaN(v)) {
        if(changed) IsValid=false;
        return;
    }
    IsValid=true;
    myval = v;
    value=v;
    if (changed) DispVal= myval === 0 ? '' : FormatBeløb(myval);
}

function ValueUpdated() {
    if (value===myval) return;
    myval = value;
    DispVal= myval === 0 ? '' : FormatBeløb(myval);
}  
$: value, ValueUpdated();

</script>