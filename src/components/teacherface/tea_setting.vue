<template>
  <div id="shezhi">
    <p>设置我的信息</p>
    <b-alert show class="alert">
      提示！您可以在这里设置自己的真实姓名，方便教师更好的管理 ;
    </b-alert>

    <b-container fluid>
      <b-row class="my-1" v-for="(type,index) in types" :key="index">
        <b-col sm="1">
          <label>{{ type.lab }}:</label>
        </b-col>
        <b-col sm="5">
          <b-form-input v-model="type.ctx"></b-form-input>
        </b-col>
      </b-row>
    </b-container>

    <div class="shezhi-btn-group">
      <b-button class="shezhi-btn">保存</b-button>
      <b-button class="shezhi-btn">上传头像</b-button>
      <b-button class="shezhi-btn" @click="teacher">暂时的跳转按钮</b-button>
    </div>

  </div>
</template>

<script>
  import store from '../../store/store'
  export default {
    data() {
      return {
        types: [
          {lab: "姓名",ctx:''},
          {lab: "手机号码",ctx:''},
          {lab: "性别",ctx:''},
          {lab: "邮箱地址",ctx:''},
          {lab: "个人签名",ctx:''}
        ]
      }
    },
    methods: {
      teacher: function() {
        this.$router.push({ path: "/zhuye" });
      }
    },
    mounted:function(){
      this.types[0].ctx=store.state.logintemmes.name;
      this.types[1].ctx=store.state.logintemmes.tel;
      this.types[2].ctx=store.state.logintemmes.sex;
      this.types[3].ctx=store.state.logintemmes.email;
      this.types[4].ctx=store.state.logintemmes.introduce;
    }
  };
</script>

<style lang='less'>
  #shezhi {
    width: 78.75rem;
    overflow: hidden;
    margin-left: 1.5625rem;
    p {
      font-weight: bold;
      color: black;
      font-size: 1.125rem;
      padding-top: 0.9375rem;
    }
  }
  .alert {
    width: 44.849625rem;
    font-size: 0.875rem;
  }
  .shezhi-btn-group {
    width: 44.849625rem;
    display: flex;
    margin-top: 1.875rem;
    margin-left: 0.625rem;
    .shezhi-btn {
      margin: 0.1875rem;
    }
  }
</style>
