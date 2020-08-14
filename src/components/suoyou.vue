<template>
  <div id="suoyou">
    <div class="card-item" v-for="(item,index) in items" :key="index">
      <span>{{item.content.substr(7,1)}}</span>
      <div>
        <p>{{item.content}}</p>
        <p>{{item.time}}</p>
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
  mounted() {
    axios({
      method: "post",
      url: "http://localhost:3000/api/homeAll",
      data: {
        stuId: "1540624159"
      },
      headers: {
        "Content-Type": "text/plain"
      }
    }).then(
      response => {
        this.items = response.data;
      },
      err => {
        console.log(err);
      }
    );
  }
};
</script>

<style lang='less'>
#suoyou {
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
