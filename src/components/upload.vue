<template>
  <div id="upload">

    <b-alert :show="dismissCountDown" class="alert-msg" dismissible :variant="alertColor" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged">
      {{alertMsg}}
    </b-alert>

    <div class="button-group">
      <b-button class="button" @click="goUpload">作业上传</b-button>
      <b-button class="button" @click="goDownload">课件下载</b-button>
      <b-nav-form @submit.prevent='goSearch'>
        <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="目录名或创建者名字" v-model='searchText' />
        <b-button size="sm" class="my-2 my-sm-0" type="submit">搜索</b-button>
      </b-nav-form>
    </div>

    <p>上传文件</p>
    <b-button size="sm" class="mr-2 btn-return" variant="warning" @click="goBack">返回上个文件夹
    </b-button>
    <div class="table-containter">
      <div class="table-detail">
        <b-table :items="items" :fields="fields" hover striped>
          <template slot="操作" slot-scope="row">
            <b-button size="sm" class="mr-2" @click="goCheck(row.item)" v-if='btnChange'>查看
            </b-button>
            <label class="btn-upload" v-if='btnChange'>
              <span>选择</span>
              <input type="file" name="file" style="display: none" ref="file" id="file" @change="selFile($event)" />
            </label>
            <b-button size="sm" class="mr-2" @click="goUploadFile(row.item)" v-if='btnChange'>上传
            </b-button>
            <b-button size="sm" class="mr-2" @click="goDelete(row.item)" v-if='btnChange2'>删除
            </b-button>
          </template>
        </b-table>
      </div>
      <div class="pag">
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
      fields: ["目录", "大小", "创建者", "时间", "操作"],
      items: [],
      currentPage: 1, //课程目录页数
      classifyPage: 1, //当前classify的页数
      catalog: "",
      btnChange: true,
      btnChange2: false,
      totalPage: 0,
      file: null,
      stuUploadFile: "",
      dismissSecs: 2,
      dismissCountDown: 0,
      alertMsg: "",
      teaName: "",
      searchText: "",
      alertColor: ""
    };
  },
  mounted() {
    this.showCourse(this.currentPage); //显示根目录内容
  },
  methods: {
    showCourse(Page) {
      //课程数据
      axios({
        method: "post",
        url: "http://localhost:3000/api/stuAttMsg", //显示当前学生的选课信息
        data: {
          curStuId: "1540624159",
          curPage: Page
        },
        headers: {
          "Content-Type": "text/plain"
        }
      }).then(
        result => {
          this.totalPage = result.data.totalPage; //显示总页数
          this.items = result.data.data;
        },
        err => {
          console.log(err);
        }
      );
    },
    showshiyan(Page) {
      //实验报告数据
      axios({
        method: "post",
        url: "http://localhost:3000/api/stuUplMsg",
        data: {
          curStuId: "1540624159",
          curClassify: this.catalog,
          curPage: Page
        },
        headers: {
          "Content-Type": "text/plain"
        }
      }).then(result => {
        this.items = result.data.data;
        this.totalPage = result.data.totalPage; //显示总页数
      });
    },
    search(canshu, data) {
      //搜索数据
      axios({
        method: "post",
        url: `http://localhost:3000/api/${canshu}`,
        data: data,
        headers: {
          "Content-Type": "text/plain"
        }
      }).then(
        response => {
          this.items = response.data.data;
          this.totalPage = response.data.totalPage; //更新当前分页总数
          this.searchText = "";
        },
        err => {
          console.log(err);
        }
      );
    },
    goBack() {
      //返回按钮
      this.currentPage = 1; //重置分页为第一页
      this.btnChange2 = false; //切换按钮
      this.btnChange = true;
      this.showCourse(this.currentPage);
    },
    goCheck(item) {
      //查看按钮
      this.searchText = ""; //清空搜索内容
      this.btnChange2 = true; //切换按钮
      this.btnChange = false;
      this.currentPage = 1; //重置分页为第一页
      this.teaName = item.创建者; //保存当前的老师名字
      this.catalog = item.目录; //保存当前课程的分类
      this.showshiyan(this.currentPage);
    },
    goDelete(item) {
      let a = confirm("确定要删除吗?");
      if (a) {
        axios({
          method: "post",
          url: "http://localhost:3000/api/delUplFile",
          data: {
            curStuId: "1540624159",
            curClassify: this.catalog,
            curTeaName: this.teaName,
            curFileName: item.目录
          },
          headers: {
            "Content-Type": "text/plain"
          }
        }).then(
          response => {
            this.showshiyan(this.currentPage); //更新当前页面的文件
            this.alertColor = "success";
            this.alertMsg = "删除成功";
            this.dismissCountDown = this.dismissSecs;
          },
          err => {
            console.log(err);
          }
        );
      }
    },
    selFile(ev) {
      //获取上传文件
      this.stuUploadFile = ev.target.files[0];
      this.alertColor = "success";
      this.alertMsg = "选择成功,请上传";
      this.dismissCountDown = this.dismissSecs;
    },
    goUploadFile(item) {
      if (this.alertMsg === "选择成功,请上传") {
        let formData = new FormData();
        formData.append("curClassify", item.目录);
        formData.append("curStuId", "1540624159");
        formData.append("curTeaName", item.创建者);
        formData.append("stuUploadFile", this.stuUploadFile);
        let file = document.getElementById("file");
        axios({
          method: "post",
          url: "http://localhost:3000/api/stuUplFile",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }).then(
          response => {
            switch (response.data) {
              case "老师没有上传该实验!":
                this.alertColor = "danger";
                this.alertMsg = "老师没有上传该实验!";
                this.dismissCountDown = this.dismissSecs;
                file.value = ""; //清空选择文件
                break;
              case "上传时间已经超过了":
                this.alertColor = "danger";
                this.alertMsg = "上传时间已经超过了";
                this.dismissCountDown = this.dismissSecs;
                file.value = ""; //清空选择文件
                break;
              case "上传成功":
                this.alertColor = "success";
                this.alertMsg = "上传成功";
                this.dismissCountDown = this.dismissSecs;
                file.value = ""; //清空选择文件
                break;
            }
          },
          err => {
            console.log(err);
          }
        );
      } else {
        this.alertColor = "danger";
        this.alertMsg = "请先选择文件";
        this.dismissCountDown = this.dismissSecs;
        file.value = ""; //清空选择文件
      }
    },
    pagChange(currentPage) {
      //分页按钮
      if (this.btnChange && !this.btnChange2) {
        this.showCourse(currentPage); //根据按钮更新当前page指向的数据
      } else {
        this.showshiyan(currentPage);
      }
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    goUpload() {
      //上传按钮
      this.$router.push("/guanli/");
    },
    goDownload() {
      //下载按钮
      this.$router.push("/guanli/download");
    },
    goSearch() {
      //搜索按钮
      if (this.searchText == "") return;
      this.currentPage = 1; //重置分页为第一页
      if (this.btnChange) {
        //根据table表中按钮获取数据
        let data = {
          curPage: this.currentPage,
          searchText: this.searchText,
          stuId: "1540624159"
        };
        this.search("stuClassifySea", data);
      } else {
        this.currentPage = 1; //重置分页为第一页
        let data = {
          curPage: this.currentPage,
          searchText: this.searchText,
          curClassify: this.catalog,
          stuId: "1540624159"
        };
        this.search("stuExpSea", data);
      }
    }
  }
};
</script>

<style lang='less'>
html {
  font-size: 16px;
}
#upload {
  width: 81.4rem;
  overflow: hidden;
  p {
    margin-left: 1.5625rem;
    margin-top: 0.1875rem;
    font-weight: bold;
    color: grey !important;
    font-size: 0.9375rem;
    float: left;
  }
  .btn-return {
    margin-left: 1.25rem;
    font-size: 0.75rem;
  }
  .alert-msg {
    position: absolute;
    top: 1.875rem;
    right: 1.875rem;
    width: 25%;
  }
  .button-group {
    display: flex;
    padding: 1.25rem;
    .button {
      margin: 0 0.3125rem;
    }
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
.btn-upload {
  position: relative;
  top: 0.125rem;
  left: -0.21875rem;
  margin: 0;
  padding: 0;
  text-align: center;
  cursor: pointer;
  width: 2.875rem;
  height: 1.9375rem;
  line-height: 1.9375rem;
  background: #6c757d;
  color: white;
  font-size: 0.875rem;
  font-weight: 400;
  font-family: inherit;
  border-radius: 0.25rem;
  &:hover {
    background: rgb(105, 105, 105) !important;
  }
}
</style>
