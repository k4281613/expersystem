<template>
  <div class="min_box" v-if="bctx_bool">
    <div class="min_gray">
      <div class="min_center">
        <div class="article_minbox">
          <div class="mintitle">
            <label>
              <slot name="mintitle"></slot>
            </label>
          </div>
          <div class="minctx">
            <label>
              <slot name="minctx"></slot>
            </label>
          </div>
          <div class="minfoot">
            <footer>
              <slot name="minfooter"></slot>
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
  .min_box {
    font-size: 0.3125rem;
    top: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 9999;
  }
  .min_gray {
    position: absolute;
    width: 100%;
    height: 100%;
    margin-left: -4rem;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .min_center {
    position: inherit;
    background-color: rgba(230, 230, 230, 1);
    width: 60.625rem;
    height: 35.625rem;
    top: 50%;
    left: 50%;
    margin: -17.8125rem 0 0 -30.3125rem;
    border: 0.0625rem white solid;
    border-radius: 0.3125rem;
    text-align: -webkit-center;
  }
  .article_minbox {
    position: inherit;
    /*background-color: #0D0D0D;*/
    width: 51.25rem;
    height: 29.375rem;
    top: 50%;
    left: 50%;
    margin: -14.6875rem 0 0 -27.1875rem;
  }
  .article_minbox .mintitle {
    /*background-color: red;*/
    position: relative;
    width: 51.25rem;
    height: 4.4375rem;
    text-align: left;
  }
  .article_minbox .mintitle label {
    font-size: 1.25rem;
    margin: 0.625rem;
  }
  .article_minbox .minctx {
    /*background-color: yellow;*/
    position: relative;
    border: 0.0625rem gray dashed;
    width: 51.25rem;
    height: 22.125rem;
    text-align: left;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .article_minbox .minctx label {
    font-size: 1.25rem;
    margin: 0.625rem;
  }
  .article_minbox .minfoot {
    /*background-color: green;*/
    position: relative;
    width: 51.25rem;
    height: 2.5rem;
    text-align: left;
  }
  .article_minbox .minctx label {
    font-size: 1.25rem;
    margin: 0.625rem;
  }
  .article_minbox footer {
    margin-top: 1.25rem;
  }
</style>

