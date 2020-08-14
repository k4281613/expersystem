<template>
  <button @click="vclick">
    <slot></slot>
  </button>
</template>
<script>
  export default {
    props:{
    },
    computed:{
    },
    methods:{
      vclick:function (event) {
        event.preventDefault();
        this.$emit('vclick');
        //1.0完毕2018.6.4
      }
    }
  }
</script>
