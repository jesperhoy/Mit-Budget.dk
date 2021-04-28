<div class={'form-check'+(inline?' form-check-inline':'')}>
    <input bind:checked={checked}
           on:input={function(){checked=this.checked;dispatch('input',this.checked)}}
            class="form-check-input"
            type="checkbox"
            id={myid}
            use:Validity={validity}>
    <label class="form-check-label" for={myid}><slot></slot></label>
</div>
  
<script>
import {Validity,RndHexStr} from '../shared.js';
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();
export let inline=false;
export let checked=false;
export let validity='';     
let myid='checkbox-' + RndHexStr(16);
</script>