<div>
    <div class={labeltop?'top':null}>
      {#if labelfor}
      <label for={labelfor} class="form-label">{label}</label>   
      {:else}
      {label}
      {/if}
    </div>
    <div class={contenttop?'top':null}>
      <slot></slot>
    </div>
</div>
  
<script>
export let labelfor=null;
export let label='';
export let labeltop=false;
export let contenttop=false;
</script>