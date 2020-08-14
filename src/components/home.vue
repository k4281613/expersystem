<template>
  <div id="home">
    <div class="flex-containter">
      <div class="textarea">
        <span class='textarea-avator'>杨</span>
        <div class="textarea-containter">
          <textarea name="" id="" class="textarea-input" placeholder="随便发点牢骚" maxlength="160" @input="watchTextarea" v-model="desc"></textarea>
          <div class="textarea-bottom-bar">
            <ul>
              <li v-for="(item,index) in imgItem" :key="index">
                <svg class="textarea-icon" aria-hidden="true">
                  <use :xlink:href="item.iconSrc"></use>
                </svg>
              </li>
              <li v-for="(item,index) in 6"></li>
              <li>还可以输入
                <span class="remnant">{{remnant}}</span>字
              </li>
              <b-button class="send-btn" @click="sendComment">发送</b-button>
            </ul>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="section-tab">
          <ul>
            <li :class="index==tapIndex? tapType:''" v-for="(item,index) in items" :key="index" @click="tapChange(index)">{{item.title}}</li>
          </ul>
        </div>
        <router-view></router-view>
      </div>
    </div>

    <div class="article">
      <p>{{curStudent}}，{{dayChange}}好!</p>
      <p>今天是 {{day}}，{{time}}</p>
      <!-- <div class="rank-item">
        <ul>
          <li v-for="(item,index) in 1" :key="index">
            <div>{{surplus}}</div>
            <div>待完成任务</div>
          </li>
        </ul>
      </div> -->

      <div class="course-item">
        <p class="course-title">课程列表({{courseIndex}})</p>
        <hr/>
        <div>
          <p v-for='(item,index) in courseMsg'>{{item.course_name}}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
export default {
  data() {
    return {
      imgItem: [
        { iconSrc: "#icon-biaoqing1" },
        { iconSrc: "#icon-tupian" },
        { iconSrc: "#icon-insert_tag_field" }
      ],
      tapIndex: 0,
      tapType: "tap-click",
      desc: "", //默认显示为空字符串
      remnant: 160, //字符串总数
      items: [{ title: "所有" }, { title: "动态" }],
      courseMsg: [],
      courseIndex: 0,
      curStudent: "",
      surplus: 0
    };
  },
  computed: {
    time() {
      return dayjs().format("YYYY年MM月DD日");
    },
    day() {
      switch (dayjs().day()) {
        case 0:
          return `星期日`;
          break;
        case 1:
          return `星期一`;
          break;
        case 2:
          return `星期二`;
          break;
        case 3:
          return `星期三`;
          break;
        case 4:
          return `星期四`;
          break;
        case 5:
          return `星期五`;
          break;
        case 6:
          return `星期六`;
          break;
      }
    },
    dayChange() {
      let hours = dayjs().hour();
      // return hours;
      if (6 < hours && hours < 12) {
        return "早上";
      }
      if (12 < hours && hours < 18) {
        return "下午";
      }
      if (18 < hours && hours < 23) {
        return "晚上";
      }
      if (0 < hours && hours < 6) {
        return "凌晨";
      }
    }
  },
  mounted() {
    axios({
      method: "post",
      url: "http://localhost:3000/api/allCourseMsg",
      data: {
        stuId: "1540624159"
      },
      headers: {
        "Content-Type": "text/plain"
      }
    }).then(
      response => {
        this.courseMsg = response.data;
        this.courseIndex = response.data.length;
        this.curStudent = response.data[0].stu_name;
        // axios({
        //   method: "post",
        //   url: "http://localhost:3000/api/allUplMsg",
        //   data: {
        //     stuId: "1540624159"
        //   },
        //   headers: {
        //     "Content-Type": "text/plain"
        //   }
        // }).then(response => {
        //   console.log(response);
        //   this.surplus = this.courseIndex - response.data.length;
        // });
      },
      err => {
        console.log(err);
      }
    );
  },
  methods: {
    tapChange(index) {
      this.tapIndex = index;
      switch (index) {
        case 0:
          this.$router.push("/zhuye");
          break;
        case 1:
          this.$router.push("/dongtai");
      }
    },
    watchTextarea() {
      this.remnant = 160 - parseInt(this.desc.length); //还剩多少字符串,把字符串转换成数字
    },
    sendComment() {
      if (this.desc == "") return;
      console.log(this.desc);
      axios({
        method: "post",
        url: "http://localhost:3000/api/sendComment",
        data: {
          stuId: "1540624159",
          content: this.desc
        },
        headers: {
          "Content-Type": "text/plain"
        }
      }).then(
        response => {
          this.$store.commit("dongtaiMsgChange", response.data.data); //更新动态子路由的最新值
          this.desc = ""; //清空文本内容
          this.remnant = 160; //重置输入数值
        },
        err => {
          console.log(err);
        }
      );
    }
  }
};
</script>

<style lang='less'>
html {
  font-size: 16px;
}
#home {
  width: 80.3125rem;
  overflow: hidden;
}
.flex-containter {
  width: 52.1825rem;
  overflow: hidden;
  float: left;
}
.textarea {
  width: 52.1875rem;
  height: 9.375rem;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-left: 1.25rem;
  .textarea-avator {
    width: 3.75rem;
    height: 3.75rem;
    text-align: center;
    line-height: 3.75rem;
    background: #e7e7df;
    border-radius: 50%;
    margin: 1.25rem;
    color: #6c757d;
    font-weight: bold;
  }
  .textarea-containter {
    width: 42.6465rem;
    height: 9.375rem;
    .textarea-input {
      overflow: hidden;
      resize: none;
      margin: 1rem;
      margin-left: 0;
      height: 5.9375rem;
      width: 41.9375rem;
      border-radius: 0.3125rem 0.3125rem 0 0;
      border: 0.0625rem solid rgba(0, 0, 0, 0.2);
      outline: none;
      box-sizing: border-box;
      padding: 2%;
    }
    .textarea-bottom-bar {
      width: 41.9375rem;
      height: 2.5rem;
      background: #e8e8e8;
      border-radius: 0 0 0.3125rem 0.3125rem;
      position: absolute;
      top: 5.9375rem;
      border: 0.0625rem solid rgba(0, 0, 0, 0.2);
      border-top: none;
      ul {
        list-style: none;
        width: 100%;
        height: 2.5rem;
        padding: 0;
        margin: 0;
        li {
          float: left;
          height: 2.5rem;
          line-height: 2.5rem;
          box-sizing: border-box;
          padding: 0 3%;
          display: flex;
          align-items: center;
        }
      }
      .send-btn {
        height: 2.5rem;
        width: 5rem;
        border-radius: 0 0 0.3125rem 0;
        float: right;
        background: #6c757d;
      }
      .textarea-icon {
        width: 1.25rem;
        height: 1.25rem;
      }
      .remnant {
        color: #6c757d;
        font-weight: bold;
      }
    }
  }
}
.section {
  width: 52.1875rem;
  overflow: hidden;
  .section-tab {
    margin-left: 1.5625rem;
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      width: 49.125rem;
      height: 1.5625rem;
      margin-top: 1.5625rem;
      li {
        float: left;
        width: 3.625rem;
        height: 1.5625rem;
        line-height: 1.5625rem;
        border-radius: 1.5625rem;
        text-align: center;
        box-sizing: border-box;
        margin: 0 0.9375rem;
        font-size: 0.875rem;
        &:hover {
          background: #6c757d;
          color: white;
          cursor: pointer;
        }
      }
    }
  }
}
.tap-click {
  background: #6c757d;
  color: white;
  cursor: pointer;
}
.article {
  width: 28.125rem;
  overflow: hidden;
  float: left;
  p {
    box-sizing: border-box;
    padding-left: 2.5rem;
    &:nth-of-type(1) {
      margin-top: 0.9375rem;
      font-weight: bold;
    }
    &:nth-of-type(2) {
      font-size: 0.875rem;
      color: rgba(0, 0, 0, 0.7);
    }
  }
  .rank-item {
    width: 28.125rem;
    height: 10rem;
    ul {
      margin: 0;
      width: 25rem;
      height: 10rem;
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 25rem;
        height: 10rem;
        line-height: 10rem;
        text-align: center;
        div {
          width: 25rem;
          height: 5rem;
          line-height: 5rem;
        }
        &:nth-of-type(1) {
          border-bottom: 0.0625rem solid #ddd;
        }
        &:nth-of-type(2) {
          border-bottom: 0.0625rem solid #ddd;
        }
      }
    }
  }
  .course-item {
    margin-left: 0px;
    margin-top: 2.5rem;
    width: 25rem;
    overflow: hidden;
    hr {
      margin-left: 2.5rem;
    }
    .course-title {
      margin: 0;
      line-height: 1.875rem;
      height: 1.875rem;
    }
    div {
      p {
        font-size: 0.875rem;
        color: #666;
        font-weight: bold;
      }
    }
  }
}
</style>
