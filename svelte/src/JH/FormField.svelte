<div>
    <div class={labeltop?'top':null}>
      {#if inputid}
      <label for={inputid} class="form-label">{label}</label>   
      {:else}
      {label}
      {/if}
    </div>
    <div class={contenttop?'top':null}>
      <slot></slot>
    </div>
</div>
  
<script>
export let inputid=null;
export let label='';
export let labeltop=false;
export let contenttop=false;
</script>