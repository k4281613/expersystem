<template>
  <div id="suoyou">
    <div class="card-item" v-for="(item,index) in items" :key="index">
      <span>学</span>
      <div>
        <p>{{item.name}}</p>
        <p>
          <label>上传了：{{item.context}}</label>
          <label :style="{float:'right'}">上传时间：{{item.time}}</label>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import store from "../../store/store";
  export default {
    data() {
      return {
        items:[]
      };
    },
    methods: {
      getUpload:function() {
        var teacher = store.state.logintemmes.name;
        var self = this;
        this.$http({
          method: "post",
          url: "/api/stuploadMsg", //显示当前学生的选课信息
          data: {
            myteach:teacher
          },
          headers: {
            "Content-Type": "text/plain"
          }
        }).then(
          result => {
            let arr = result.data.data;
            let option={
              name:'',
              context:'',
              time:''
            }
            for(var i=0;i<arr.length;i++){
              option.name='课程：'+arr[i].file_classify+'   班级：'+arr[i].classes+'   学生：'+arr[i].stu_name;
              option.context=arr[i].file_name;
              option.time=arr[i].file_sendtime;
              self.items.push(option);
              option={
                name:'',
                context:'',
                time:''
              }
            }
            console.log(arr);
          },
          err => {
            console.log(err);
          }
        );
      }
    },
    mounted: function() {
      this.getUpload();
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
