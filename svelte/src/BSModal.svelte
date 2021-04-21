<div class="modal fade" tabindex="-1" bind:this={el}>
    <div style={width ? 'max-width:'+width+'px':null} class={'modal-dialog modal-dialog-centered'+(size==='md'?'':' modal-'+size)}>

        <div class="modal-content">

        <form on:submit|preventDefault={()=>dispatch('submit')}>

        <div class="modal-header">
            <slot name="header">
            <h5 class="modal-title">{title}</h5>
            </slot>
            <button type="button" class="btn-close" on:click={Hide} aria-label="Close"></button>
        </div>
        
        <div class="modal-body">
            <slot></slot>
        </div>
        
        <div class="modal-footer">
            <slot name="footer"></slot>
        </div>

        </form>

        </div>
    </div>
</div>
  
<script>
export let title='';
export let size= 'md'; //sm,md,lg,xl
export let width=null;
export function Show() { MyModal.show();}
export function Hide() { MyModal.hide();}

import { onMount } from 'svelte';
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();

let MyModal;
let el;

onMount(function() {
    MyModal = new bootstrap.Modal(el);
    el.addEventListener('shown.bs.modal', function (event) {
              dispatch('shown');
            });
    el.addEventListener('hidden.bs.modal', function (event) {
              dispatch('hidden');
            });
    });
</script>