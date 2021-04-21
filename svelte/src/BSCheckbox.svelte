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
import {Validity} from './shared.js';
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();
export let inline=false;
export let checked=false;
export let validity='';     

let myid='checkbox-';
for (let i = 0; i < 16; i++) {
   myid += Math.floor(Math.random() * 16).toString(16);
}
</script>