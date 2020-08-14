<template>
  <div id="download">

    <b-alert :show="dismissCountDown" class="alert-msg" dismissible variant="danger" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged">
      文件不存在
    </b-alert>

    <div class="button-group">
      <b-button class="button" @click="goUpload">作业上传</b-button>
      <b-button class="button" @click="goDownload">课件下载</b-button>
      <b-nav-form>
        <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="文件名或创建者名字" v-model='searchText' />
        <b-button size="sm" class="my-2 my-sm-0" @click='goSearch'>搜索</b-button>
      </b-nav-form>
    </div>

    <p>下载文件</p>
    <b-button size="sm" class="mr-2 btn-return" variant="warning" @click="goBack">返回上个文件夹
    </b-button>
    <div class="table-containter">
      <div class="table-detail">
        <b-table :items="items" :fields="fields" hover striped class="b-table">
          <template slot="操作" slot-scope="row">
            <b-button size="sm" class="mr-2" @click="goCheck(row.item)" v-if='btnChange'>查看
            </b-button>
            <b-button size="sm" class="mr-2" @click="goDownloadFile(row.item)" v-if='btnChange2'>下载
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
      currentPage: 1,
      btnChange: true,
      btnChange2: false,
      catalog: "",
      totalPage: 0,
      dismissSecs: 2,
      dismissCountDown: 0,
      searchText: "",
      teaName: ""
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
        url: "http://localhost:3000/api/stuDolMsg",
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
      if (this.btnChange2) {
        this.currentPage = 1; //重置分页为第一页
        this.showCourse(this.currentPage);
        this.btnChange2 = false; //切换按钮
        this.btnChange = true;
      } else {
        return;
      }
    },
    goCheck(item) {
      //查看按钮
      this.teaName = item.创建者;
      this.btnChange2 = true; //切换按钮
      this.btnChange = false;
      this.currentPage = 1; //复位分页按钮
      this.catalog = item.目录; //当前目录的名字
      this.showshiyan(this.currentPage);
    },
    goDownloadFile(item) {
      //点击下载按钮
      axios({
        method: "get",
        url: "http://localhost:3000/api/stuDolFile",
        params: {
          curClassify: this.catalog,
          curStuId: "1540624159",
          curFileName: item.目录
        },
        headers: {
          "Content-Type": "text/plain"
        }
      }).then(
        response => {
          //有数据返回则跳转改页面
          console.log(response.data);
          if (response.data === "文件不存在")
            return (this.dismissCountDown = this.dismissSecs);
          window.open(
            `http://localhost:3000/api/stuDolFile?curClassify=${
              this.catalog
            }&curStuId=1540624159&curFileName=${item.目录}`
          );
        },
        err => {
          console.log(err);
        }
      );
    },
    pagChange(currentPage) {
      //分页按钮
      if (this.btnChange) {
        this.showCourse(currentPage); //更新当前page指向的数据
      } else if (this.btnChange2) {
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
          //post请求参数
          curPage: this.currentPage,
          searchText: this.searchText
        };
        this.search("stuClassifySea", data);
      } else {
        this.currentPage = 1; //重置分页为第一页
        let data = {
          //post请求参数
          curPage: this.currentPage,
          searchText: this.searchText,
          teaName: this.teaName
        };
        this.search("stuDolSea", data);
      }
    }
  }
};
</script>

<style lang='less'>
html {
  font-size: 16px;
}
#download {
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
</style>

