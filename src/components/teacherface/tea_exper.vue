<template>
  <div id="upload">
    <div class="button-group">
      <b-button class="button" @click="goUpload">实验指导书上传</b-button>
      <b-button class="button" @click="goDownload">学生实验管理</b-button>
      <b-nav-form>
        <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="文件名或创建者名字" />
        <b-button size="sm" class="my-2 my-sm-0" type="submit">搜索</b-button>
      </b-nav-form>
    </div>
    <p>文件</p>
    <router-view></router-view>

  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    goUpload() {
      this.$router.push("/tea_exper/");
    },
    goDownload() {
      this.$router.push("/tea_exper/experMange");
    }
  }
};
</script>

<style lang='less'>
#upload {
  width: 81.4rem;
  overflow: hidden;
  p {
    margin-left: 1.5625rem;
    font-weight: bold;
    font-size: 0.9375rem;
  }
  .button-group {
    display: flex;
    padding: 1.25rem;
    .button {
      margin: 0 0.3125rem;
    }
  }
}
</style>
