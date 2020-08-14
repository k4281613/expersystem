<template>
  <div id="shezhi">

    <p>设置我的信息</p>
    <b-alert show class="alert">
      提示！您可以在这里设置自己的真实姓名，方便教师更好的管理 ;
    </b-alert>

    <b-alert :show="dismissCountDown" class="alertMsg" :variant="alertColor" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged">
      {{alertMsg}}
    </b-alert>

    <b-container fluid v-for="(item,index) in personMsg" :key="index">
      <b-row class="my-1">
        <b-col sm="1">
          <label>姓名:</label>
        </b-col>
        <b-col sm="5">
          <b-form-input v-model="username"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="1">
          <label>手机号码:</label>
        </b-col>
        <b-col sm="5">
          <b-form-input v-model="phoneNumber"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="1">
          <label>性别:</label>
        </b-col>
        <b-col sm="5">
          <b-form-input v-model="sex"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="1">
          <label>邮箱地址:</label>
        </b-col>
        <b-col sm="5">
          <b-form-input v-model="email"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="1">
          <label>个人签名:</label>
        </b-col>
        <b-col sm="5">
          <b-form-input v-model="signature"></b-form-input>
        </b-col>
      </b-row>
    </b-container>

    <div class="shezhi-btn-group">
      <b-button class="shezhi-btn" @click="goSave">保存</b-button>
      <b-button class="shezhi-btn">上传头像</b-button>
      <b-button class="shezhi-btn" @click="teacher">暂时的跳转按钮</b-button>
    </div>

  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      username: "",
      phoneNumber: "",
      sex: "",
      email: "",
      signature: "",
      dismissSecs: 2,
      dismissCountDown: 0,
      alertMsg: "",
      alertColor: ""
    };
  },
  computed: {
    personMsg() {
      return this.$store.state.personMsg;
    }
  },
  mounted() {
    axios({
      //获取当前用户的个人信息
      method: "post",
      url: "http://localhost:3000/api/personMsg",
      data: {
        stuId: "1540624159"
      },
      headers: {
        "Content-Type": "text/plain"
      }
    }).then(
      response => {
        this.$store.commit("personMsgChange", response.data);
        this.username = response.data[0].name;
        this.sex = response.data[0].sex;
        this.email = response.data[0].email;
        this.phoneNumber = response.data[0].tel;
        this.signature = response.data[0].introduce;
      },
      err => {
        console.log(err);
      }
    );
  },
  methods: {
    teacher: function() {
      this.$router.push({ path: "/teacherindex" });
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    goSave() {
      //保存更改的个人信息
      if (
        this.username != "" ||
        this.phoneNumber != "" ||
        this.sex != "" ||
        this.email != "" ||
        this.signature != ""
      ) {
        axios({
          method: "post",
          url: "http://localhost:3000/api/personChange",
          data: {
            stuId: "1540624159",
            username: this.username,
            phoneNumber: this.phoneNumber,
            sex: this.sex,
            email: this.email,
            signature: this.signature
          },
          headers: {
            "Content-Type": "text/plain"
          }
        }).then(
          response => {
            this.$store.commit("personMsgChange", response.data.data); //将最新的信息存进vuex里
            this.alertColor = "success";
            this.alertMsg = "保存成功";
            this.dismissCountDown = this.dismissSecs;
          },
          err => {
            console.log(err);
          }
        );
      } else {
        return;
      }
    }
  }
};
</script>

<style lang='less'>
html {
  font-size: 16px;
}
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
.alertMsg {
  // position: absolute;
  // top: 1.875rem;
  // right: 1.875rem;
  // width: 25%;
}
</style>
