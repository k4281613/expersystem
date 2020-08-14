<template>
  <div id="upload">
    <div class="button-group">
      <b-button class="button" @click="goUpload">课程内容</b-button>
      <b-button class="button" @click="goDownload">学生管理</b-button>
      <b-nav-form>
        <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="文件名或创建者名字" />
        <b-button size="sm" class="my-2 my-sm-0" type="submit">搜索</b-button>
      </b-nav-form>
    </div>
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
      this.$router.push("/tea_course/");
    },
    goDownload() {
      this.$router.push("/tea_course/stu_ctx");
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
