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
import navbarChild from "./navbar";
import asideChild from "./aside";
export default {
  components: {
    navbarChild: navbarChild,
    asideChild: asideChild
  }
};
</script>

<style lang='less'>
html {
  font-size: 16px;
}
// body {
//   background: #f2f2f2;
// }
// #zhuye {
//   background: #f2f2f2;
// }
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
