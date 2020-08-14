<template>
  <div id="home">
    <div class="flex-containter">
      <div class="textarea">
        <span class='textarea-avator'>师</span>
        <div class="textarea-containter">
          <textarea name="" id="" class="textarea-input" placeholder="随便发点牢骚" maxlength="160" @input="watchTextarea" v-model="desc"></textarea>
          <div class="textarea-bottom-bar">
            <ul>
              <li v-for="(item,index) in imgItem" :key="index">
                <svg class="textarea-icon" aria-hidden="true">
                  <use :xlink:href="item.iconSrc"></use>
                </svg>
              </li>
              <li v-for="item in 6"></li>
              <li>还可以输入
                <span class="remnant">{{remnant}}</span>字
              </li>
              <b-button class="send-btn">发送</b-button>
            </ul>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="section-tab">
          <ul>
            <li :class="index==tapIndex? tapType:''" v-for="(item,index) in 6" :key="index" @click="tapChange(index)">动态</li>
          </ul>
        </div>
        <router-view></router-view>
      </div>
    </div>

    <div class="article">
      <p>{{user}}</p>
      <p>今天是 星期六，2018年05月19日</p>
      <div class="rank-item">
        <ul>
          <li v-for="(item,index) in 4" :key="index">
            <div>0</div>
            <div>待完成任务</div>
          </li>
        </ul>
      </div>

      <div class="course-item">
        <p class="course-title">课程列表(3)</p>
        <hr/>
        <div>
          <p>LJH/解忧猫</p>
          <p>LJH/解忧猫服务端</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import store from "../../store/store";
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
        remnant: 160, //字符串总数，
        user:''
      };
    },
    mounted:function () {
      this.user=store.state.logintemmes.name;
    },
    methods: {
      tapChange(index) {
        this.tapIndex = index;
        console.log(tapIndex);
      },
      watchTextarea() {
        this.remnant = 160 - parseInt(this.desc.length); //还剩多少字符串,把字符串转换成数字
      }
    }
  };
</script>

<style lang='less'>
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
          width: 11.25rem;
          height: 5rem;
          line-height: 5rem;
          text-align: center;
          div {
            width: 11.25rem;
            height: 2.5rem;
            line-height: 2.5rem;
          }
          &:nth-of-type(1) {
            border-bottom: 0.0625rem solid #ddd;
            border-right: 0.0625rem solid #ddd;
          }
          &:nth-of-type(2) {
            border-bottom: 0.0625rem solid #ddd;
          }
          &:nth-of-type(3) {
            border-right: 0.0625rem solid #ddd;
          }
        }
      }
    }
    .course-item {
      margin-left: 0;
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
