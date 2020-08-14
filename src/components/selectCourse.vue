<template>
  <div id="selectCourse">

    <b-alert :show="dismissCountDown" class="alert-msg" dismissible :variant="alertColor" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged">
      {{alertMsg}}
    </b-alert>

    <b-nav-form class="search-group" @submit.prevent="goSearch">
      <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="文件名或创建者名字" v-model="searchText" />
      <b-button size="sm" class="my-2 my-sm-0" type="submit">搜索</b-button>
    </b-nav-form>

    <p>选择课程</p>
    <div class="table-containter">
      <div class="table-detail">
        <b-table :items="items" :fields="fields" hover striped>
          <template slot="操作" slot-scope="row">
            <b-button size="sm" class="mr-2" @click="selectCourse(row.item)">选课
            </b-button>
          </template>
        </b-table>
      </div>
      <div class='pag'>
        <b-pagination size="md" :total-rows="totalPage" v-model="currentPage" :per-page="1" @input="pagChange(currentPage)">
        </b-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      fields: ["课程名", "任课老师", "课程人数", "所属班级", "操作"],
      items: [],
      currentPage: 1,
      totalPage: 0,
      alertMsg: "",
      dismissSecs: 2,
      dismissCountDown: 0,
      searchText: "",
      alertColor: ""
    };
  },
  mounted() {
    this.showCourse(this.currentPage);
  },
  methods: {
    showCourse(page) {
      axios({
        method: "post",
        url: "http://localhost:3000/api/courseMsg",
        data: {
          curPage: page
        },
        headers: {
          "Content-Type": "text/plain"
        }
      }).then(
        response => {
          this.totalPage = response.data.totalPage; //显示总页数
          this.items = response.data.data;
        },
        err => {
          console.log(err);
        }
      );
    },
    pagChange(currentPage) {
      this.showCourse(currentPage); //更新当前page指向的数据
    },
    countDownChanged(dismissCountDown) {
      //显示alert组件
      this.dismissCountDown = dismissCountDown;
    },
    selectCourse(item) {
      //点击选择课程
      let a = confirm("确定要选择该课程吗?");
      if (a) {
        axios({
          method: "post",
          url: "http://localhost:3000/api/stuSelCourse",
          data: {
            stuId: "1540624159",
            courseName: item.课程名,
            teaName: item.任课老师,
            classes: item.所属班级
          },
          headers: {
            "Content-Type": "text/plain"
          }
        }).then(
          response => {
            switch (response.data) {
              case "你已选该课程":
                this.alertMsg = "你已选该课程";
                this.alertColor = "danger";
                this.dismissCountDown = this.dismissSecs;
                break;
              case "选课成功":
                this.alertMsg = "选课成功";
                this.alertColor = "success";
                this.dismissCountDown = this.dismissSecs;
                break;
            }
          },
          err => {
            console.log(err);
          }
        );
      }
    },
    goSearch() {
      this.currentPage = 1;
      //重置分页为第一页
      axios({
        method: "post",
        url: "http://localhost:3000/api/courseSea",
        data: {
          searchText: this.searchText,
          curPage: this.currentPage
        },
        headers: {
          "Content-Type": "text/plain"
        }
      }).then(
        response => {
          this.items = response.data.data;
          this.totalPage = response.data.totalPage; //显示总页数
          this.searchText = "";
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
#selectCourse {
  padding-top: 0.0625rem;
  p {
    margin-left: 1.5625rem;
    font-weight: bold;
    color: grey !important;
    font-size: 0.9375rem;
  }
  .search-group {
    margin: 1.5625rem;
  }
  .alert-msg {
    position: absolute;
    top: 1.875rem;
    right: 1.875rem;
    width: 25%;
  }
}
.table-containter {
  width: 81.4rem;
  overflow: hidden;
  text-align: center;
}
.table-detail {
  margin: 0 auto;
  width: 77.25rem;
  overflow: hidden;
  color: grey !important;
  font-weight: bold;
  font-size: 0.9375rem;
}
.pag {
  margin-top: 30px;
  width: 81.4rem;
  display: flex;
  justify-content: center;
  overflow: hidden;
}
</style>
