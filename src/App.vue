<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import "./icon/iconfont.js";
export default {
  name: "App",
  mounted() {
    //动态根据rem适配不同的大小
    (function() {
      let html = document.getElementsByTagName("html")[0];
      let currentWidth =
        document.documentElement.clientWidth || document.body.clientWidth; //兼容不同的浏览器
      if (!currentWidth) return;
      if (currentWidth <= 1366) currentWidth = 1349; //当像素小于1349，则限制在1349px
      html.style.fontSize = currentWidth / 84.3125 + "px"; //根据屏幕大小设置对应大小
      console.log(currentWidth / 84.3125 + "px");
    })();
  }
};
</script>

<style>
html {
  font-size: 16px;
}
</style>
