<template>
  <div class="Ctx_box" v-if="bctx_bool">
    <div class="box_gray">
      <div class="ctx_center">
        <div class="article_box">
          <div class="atitle">
            <label>
              <slot name="bbstitle"></slot>
            </label>
          </div>
          <div class="actx">
            <label>
              <slot name="bbsctx"></slot>
            </label>
          </div>
          <div class="afood">
            <footer>
              <slot name="bbsfooter"></slot>
            </footer>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bctx_bool: true
    };
  },
  components: {}
};
</script>
<style>
.Ctx_box {
  font-size: 0.3125rem;
  top: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 9999;
}
.box_gray {
  position: absolute;
  width: 100%;
  height: 100%;
  margin-left: -4rem;
  background-color: rgba(0, 0, 0, 0.5);
}
.ctx_center {
  position: inherit;
  background-color: rgba(230, 230, 230, 1);
  width: 40.625rem;
  height: 25.625rem;
  top: 50%;
  left: 50%;
  margin: -12.8125rem 0 0 -20.3125rem;
  border: 0.0625rem white solid;
  border-radius: 0.3125rem;
  text-align: -webkit-center;
}
.article_box {
  position: inherit;
  /*background-color: #0D0D0D;*/
  width: 31.25rem;
  height: 19.375rem;
  top: 50%;
  left: 50%;
  margin: -9.6875rem 0 0 -17.1875rem;
}
.article_box .atitle {
  /*background-color: red;*/
  position: relative;
  width: 31.25rem;
  height: 3.4375rem;
  text-align: left;
}
.article_box .atitle label {
  font-size: 1.25rem;
  margin: 0.625rem;
}
.article_box .actx {
  /*background-color: yellow;*/
  position: relative;
  border: 0.0625rem gray dashed;
  width: 31.25rem;
  height: 13.125rem;
  text-align: left;
  overflow-x: hidden;
  overflow-y: auto;
}
.article_box .actx label {
  font-size: 1.25rem;
  margin: 0.625rem;
}
.article_box .afood {
  /*background-color: green;*/
  position: relative;
  width: 31.25rem;
  height: 2.5rem;
  text-align: left;
}
.article_box .actx label {
  font-size: 1.25rem;
  margin: 0.625rem;
}
.article_box footer {
  float: right;
  margin-top: 1.25rem;
}
</style>

