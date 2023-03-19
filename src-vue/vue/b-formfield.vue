<template>
  <div>
    <div class={labeltop?'top':null}>
      <label v-if="inputid" :for="inputid" class="form-label">{{label}}</label>
      <template v-else>{{label}}</template>
    </div>
    <div :class="contenttop?'top':null">
      <slot></slot>
    </div>
  </div>
</template>


<script>
  export default {
    props: {
      label: { type: String, default: '' },
      inputid: { type: String, default: null },
      labeltop: { type: Boolean, default: false },
      contenttop: { type: Boolean, default: false }
    }
  }
</script>