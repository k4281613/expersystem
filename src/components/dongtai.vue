<template>
  <div id="dongtai">
    <div class="card-item" v-for="(item,index) in dongtaiMsg" :key="index">
      <span>{{item.stu_name.substr(0,1)}}</span>
      <div>
        <p>{{item.stu_name}}：{{item.content}}</p>
        <p>{{item.sendtime}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      items: []
    };
  },
  computed: {
    dongtaiMsg() {
      return this.$store.state.dongtaiMsg;
    }
  },
  mounted() {
    axios.get("http://localhost:3000/api/homeDynamic").then(
      response => {
        this.$store.commit("dongtaiMsgChange", response.data); //把获取的值放到vuex
      },
      err => {
        console.log(err);
      }
    );
  }
};
</script>

<style lang='less'>
#dongtai {
  overflow: hidden;
}
.card-item {
  margin-left: 2.5rem;
  width: 52.1875rem;
  height: 7.25rem;
  display: flex;
  align-items: center;
  border-bottom: 0.0625rem solid rgba(0, 0, 0, 0.1);
  &:nth-of-type(1) {
    margin-top: 1.25rem;
  }
  div {
    box-sizing: border-box;
    padding: 0.625rem 0;
    p {
      font-size: 0.875rem;
      height: 2.5rem;
      width: 41.875rem;
      overflow: hidden;
      line-height: 2.5rem;
      margin: 0;
    }
  }
  span {
    width: 3.75rem;
    height: 3.75rem;
    text-align: center;
    line-height: 3.75rem;
    background: #e7e7df;
    border-radius: 1.875rem;
    margin: 1.25rem;
    margin-left: 0;
    color: #6c757d;
    font-weight: bold;
  }
}
</style>
