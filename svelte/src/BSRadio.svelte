<div class={'form-check'+(inline?' form-check-inline':'')}>
    <input checked={checked}
           on:input={function(){checked=true;dispatch('input')}}
           class="form-check-input"
           type="radio"
           id={myid}>
    <label class="form-check-label" for={myid}><slot></slot></label>
</div>
  
<script>
export let inline=false;
export let checked=false;
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();
import { RndHexStr } from './shared.js';
let myid='radio-' + RndHexStr(16);
</script>