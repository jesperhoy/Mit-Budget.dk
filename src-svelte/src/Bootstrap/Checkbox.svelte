{#if $$slots.default}
<div class={'form-check'+(inline?' form-check-inline':'')} {style}>
    <input bind:checked={checked}
           on:input={function(){dispatch('input',this.checked)}}
            class="form-check-input"
            type="checkbox"
            use:Validity={validity} {id}>
    <label class="form-check-label" for={id}><slot></slot></label>
</div>
{:else}
<input bind:checked={checked}
   on:input={function(){dispatch('input',this.checked)}}
   class="form-check-input"
   type="checkbox"
   use:Validity={validity} {id}
   style="vertical-align:baseline">
{/if}


<script>
import {Validity,RndHexStr} from '../shared.js';
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();
export let inline=false;
export let checked=false;
export let validity='';
export let style=null;  
export let id=$$slots.default?('checkbox-' + RndHexStr(16)):null;
</script>