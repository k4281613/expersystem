<template>
  <div id="zhuye">
    <div class="fixed">
      <navbar-child/>
      <aside-child class="aside1" />
    </div>
    <router-view class="aside2" />
  </div>
</template>

<script>
import navbarChild from "./tea_navbar";
import asideChild from "./tea_aside";
export default {
  components: {
    navbarChild: navbarChild,
    asideChild: asideChild
  }
};
</script>

<style lang='less'>
body {
}
#zhuye {
}
.fixed {
  position: fixed;
  width: 100%;
  overflow: hidden;
  z-index: 999;
}
.aside1 {
  width: 4rem;
  position: fixed;
  bottom: 0;
  top: 3.5rem;
}
.aside2 {
  width: 94.5%;
  position: relative;
  left: 4rem;
  top: 3.5rem;
}
.pag {
  float: right;
  padding-right: 2%;
}
</style>
