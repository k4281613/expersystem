<template>
  <div>
    <!--课程的班级-->
    <experChild v-if="min_bool">
      <div slot="mintitle">
        课程：{{minMsg.courseName}} 地点：{{minMsg.courseAddress}}
      </div>
      <div slot="minctx">
        <div class="table-detail2">
          <b-table :items="item2s" :fields="field2s" hover striped>
            <template slot="操作" slot-scope="row">
              <!-- <b-button size="sm" class="mr-2" v-b-modal.modal1 @click="mindelMes(row.item)">删除</b-button>
               <b-button size="sm" class="mr-2" v-b-modal.modal1 @click="openminupMes(row.item)">修改</b-button>-->
              <b-button size="sm" class="mr-2" v-b-modal.modal1 @click="openminMes(row.item)">详情</b-button>
              <b-button size="sm" class="mr-2" v-b-modal.modal1 @click="filestatexcle(row.item)">情况表</b-button>
            </template>
          </b-table>
        </div>
      </div>
      <div slot="minfooter">
        <div>
          分界线
        </div>
        <b-button :style="{float:'right'}" @click="closemin">关闭
        </b-button>
      </div>
    </experChild>
    <!--班级文件详情-->
    <experChild v-if="minclass_bool">
      <div slot="mintitle">
        文件上传情况
      </div>
      <div slot="minctx">
        <div class="table-detail2">
          <b-table :items="item3s" :fields="field3s" hover striped>
            <template slot="操作" slot-scope="row">
              <b-button size="sm" class="mr-2" v-b-modal.modal1 @click="mindelMes(row.item)">删除</b-button>
              <b-button size="sm" class="mr-2" v-b-modal.modal1 @click="openminupMes(row.item)">修改</b-button>
            </template>
          </b-table>
        </div>
      </div>
      <div slot="minfooter">
        <div>
          脚部
        </div>
        <b-button :style="{float:'right'}" @click="closeclassmin">关闭
        </b-button>
      </div>
    </experChild>
    <!--修改文件-->
    <addctxcon v-if="minup_bool">
      <div slot="bbstitle">
        <span :style="{color:'#6c757d'}">请修改相应的内容</span>
      </div>
      <div slot="bbsctx">
        <b-form @submit.prevent="minupMsg" @reset="onminReset">
          <b-container class="bv-example-row" v-for="(ctx,index) in minctxs" :key="index">
            <b-row>
              <b-col sm="4" :style="{marginBottom:'1.25rem'}">
                <span :style="{fontSize:'1rem'}">{{ctx.name}}</span>
              </b-col>
              <b-col sm="8">
                <b-form-input v-model="ctx.context" type="text" :readonly="ctx.rea"></b-form-input>
              </b-col>
            </b-row>
          </b-container>
          <div :style="{marginTop:'0.625rem',marginLeft:'5rem',paddingBottom:'0.625rem'}">
            <b-button type="submit" :style="{backgroundColor:'#6c757d'}">Submit</b-button>
            <b-button type="reset" :style="{backgroundColor:'#6c757d'}">Reset</b-button>
          </div>
        </b-form>
      </div>
      <div slot="bbsfooter">
        <b-button @click="closeminup" :style="{backgroundColor:'#6c757d'}">关闭
        </b-button>
      </div>
    </addctxcon>
    <div class="table-containter">
      <div class="table-detail">
        <b-table :items="items" :fields="fields" hover striped>
          <template slot="操作" slot-scope="row">
            <b-button size="sm" class="mr-2" v-b-modal.modal1 @click="minclassMes(row.item)">详情
            </b-button>
          </template>
        </b-table>
      </div>
      <div class="pag">
        <b-pagination size="md" :total-rows="100" :per-page="10">
        </b-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import experChild from "@/components/teacherface/teaExper_child/exper_child";
import addctxcon from "@/components/teacherface/addctxcon";
import store from "../../../store/store";
export default {
  data() {
    return {
      fields: ["课程", "班级数", "创建者", "时间", "操作"],
      items: [],
      field2s: ["班级", "人数", "时间", "操作"],
      item2s: [],
      field3s: ["学生", "学号", "文件名", "时间", "操作"],
      item3s: [],
      minoption_class: "",
      min_bool: false,
      minup_bool: false,
      minctxs: [
        { name: "学生:", context: "", rea: "readonly" },
        { name: "文件:", context: "" },
        { name: "上传时间:", context: "" }
      ],
      minctxindex: 0,
      myteacher: "",
      minMsg: {
        courseName: "", //当前课程名
        courseAddress: ""
      },
      minclass_bool: false
    };
  },
  mounted: function() {
    this.getCourse();
  },
  components: {
    experChild,
    addctxcon
  },
  methods: {
    //文件上传情况
    filestatexcle(item) {
      //alert(item.班级);
      var Fclass = item.班级;
      var Fteach = this.myteacher;
      var Fcourse = this.minMsg.courseName;
      let self = this;
      this.$http({
        method: "post",
        url: "/api/createTable", //显示当前学生的选课信息
        data: {
          courseName: Fcourse
        },
        headers: {
          "Content-Type": "text/plain"
        }
      }).then(
        result => {
          console.log(result.data);
          this.$http({
            method: "get",
            url: "/api/dolTable", //显示当前学生的选课信息
            params: {
              courseName: Fcourse
            },
            headers: {
              "Content-Type": "text/plain"
            }
          }).then(result => {
            window.open(
              `http://localhost:3000/api/dolTable?courseName=${Fcourse}`
            );
          });
        },
        err => {
          console.log(err);
        }
      );
    },
    //课程班级详情
    minclassMes: function(item) {
      this.minMsg.courseName = item.课程;
      this.minMsg.courseAddress = item.地点;
      var minC_name = this.minMsg.courseName;
      var myteacher = this.myteacher;
      this.$http({
        method: "post",
        url: "/api/teachcourseminMsg",
        data: {
          minCourseName: minC_name,
          myteach: myteacher
        },
        headers: {
          "Content-Type": "text/plain"
        }
      }).then(
        result => {
          let arr = result.data;
          console.log(arr.data);
          let option = { 班级: "", 人数: "", 时间: "" };
          for (var i = 0; i < arr.data.length; i++) {
            this.item2s.push(option);
            this.item2s[i].班级 = arr.data[i].class;
            this.item2s[i].人数 = arr.data[i].stunum;
            this.item2s[i].时间 = arr.data[i].time;
            option = { 班级: "", 人数: "", 时间: "" };
          }
        },
        err => {
          console.log(err);
        }
      );
      this.min_bool = true;
    },
    //文件详情
    openminMes: function(item) {
      var min = JSON.stringify(item);
      console.log("详情......" + min);
      /*//对象转数组
        var keys=[];
        var arr=[];
        for(var key in item){
          keys.push(key);
          arr.push(item[key]);
        }*/
      var Fclass = item.班级;
      this.minoption_class = item.班级;
      var Fteach = this.myteacher;
      var Fcoures = this.minMsg.courseName;
      let self = this;
      this.$http({
        method: "post",
        url: "/api/experfileminMsg", //显示当前学生的选课信息
        data: {
          fileClass: Fclass,
          fileteach: Fteach,
          fileCourse: Fcoures
        },
        headers: {
          "Content-Type": "text/plain"
        }
      }).then(
        result => {
          let arr = result.data.data;
          //console.log(self.items);
          console.log(arr);
          var option = { 学生: "", 学号: "", 文件名: "", 时间: "" };
          for (var i = 0; i < arr.length; i++) {
            self.item3s.push(option);
            self.item3s[i].学号 = arr[i].stu_id;
            self.item3s[i].学生 = arr[i].stu_name;
            self.item3s[i].文件名 = arr[i].file_name;
            self.item3s[i].时间 = arr[i].file_sendtime;
            option = { 学生: "", 文件名: "", 时间: "" };
          }
        },
        err => {
          console.log(err);
        }
      );
      this.minclass_bool = true; //显示班级详细页面
    },
    //关闭文件详情
    closeclassmin: function() {
      this.minclass_bool = false; //关闭详细页面
      var le = this.item3s.length;
      this.item3s.splice(0, le);
    },
    //删除文件详情
    mindelMes: function(item) {
      var stuName = item.学生;
      var fileteach = this.myteacher;
      var fileName = item.文件名;
      var fileClass = this.minoption_class;
      //console.log("学生:" + stuName );
      var self = this;
      this.$http({
        method: "post",
        url: "/api/experfiledelminMsg", //显示当前学生的选课信息
        data: {
          s_name: stuName,
          f_teach: fileteach,
          f_name: fileName,
          f_class: fileClass
        },
        headers: {
          "Content-Type": "text/plain"
        }
      }).then(
        result => {
          let arr = result;
          //console.log(self.items);
          console.log(arr);
          if (result.status == 200) {
            var j = 0; //记录下标
            var le = self.item3s.length;
            for (var i = 0; i < le; i++) {
              if (item.学生 == self.item3s[i].学生) {
                j = i;
              }
            }
            //console.log(item,j);
            self.item3s.splice(j, 1);
            alert("已删除");
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    //打开修改文件详情页面
    openminupMes: function(item) {
      var self = this;
      /*var keys=[];//定义数组来接受key
        var arr=[];//定义数组来接受value
        for(var key in item){
          keys.push(key);
          arr.push(item[key]);
        }*/
      //console.log(arr);
      this.minctxs[0].context = item.学生;
      this.minctxs[1].context = item.文件名;
      this.minctxs[2].context = item.时间;
      //获取当前内容index
      var le = self.item3s.length;
      //console.log(le);
      //console.log(item.学生);
      for (var i = 0; i < le; i++) {
        if (
          item.学生 == self.item3s[i].学生 &&
          item.文件名 == self.item3s[i].文件名
        ) {
          self.minctxindex = i; //记录下标
        }
      }
      console.log(self.minctxindex);
      this.minup_bool = true;
    },
    //关闭修改文件详情页面
    closeminup: function() {
      this.minup_bool = false;
      this.minctxindex = 0; //记录下标
    },
    //修改文件信息
    minupMsg: function() {
      var self = this;
      alert("提交");
      var file_course = this.minMsg.courseName;
      var c_stu = this.minctxs[0].context;
      var c_file = this.minctxs[1].context;
      var c_time = this.minctxs[2].context;
      var c_class = this.minoption_class;
      this.$http({
        method: "post",
        url: "/api/experfileupminMsg", //显示当前学生的选课信息
        data: {
          fcourse: file_course,
          stuNum: c_stu,
          fileName: c_file,
          stuClass: c_class,
          uploadTime: c_time
        },
        headers: {
          "Content-Type": "text/plain"
        }
      }).then(
        result => {
          let arr = result.data;
          console.log(arr);
          if (arr.n == 1) {
            let cmindex = self.minctxindex;
            self.item3s[cmindex].文件名 = c_file;
            self.item3s[cmindex].时间 = c_time;
            alert("修改成功");
            self.minup_bool = false;
          } else {
            alert("修改失败");
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    //重置文件信息
    onminReset: function() {
      this.minctxs[1].context = "";
      this.minctxs[2].context = "";
      this.minctxs[3].context = "";
    },
    // 清空课程班级详情页面
    closemin: function() {
      var arr = this.item2s;
      this.item2s.splice(0, arr.length);
      this.min_bool = false;
    },
    getmanagMsg: function() {
      let self = this;
      this.$http({
        method: "post",
        url: "/api/stuexpermanageMsg", //显示当前学生的选课信息
        data: {},
        headers: {
          "Content-Type": "text/plain"
        }
      }).then(
        result => {
          let arr = result.data;
          let option = {
            课程: "",
            文件数: 0,
            创建者: "",
            时间: ""
          };
          for (var i = 0; i < arr.data.length; i++) {
            self.items.push(option);
            self.items[i].课程 = arr.data[i].file_name;
            self.items[i].类型 = arr.data[i].file_type;
            self.items[i].时间 = arr.data[i].file_time;
            self.items[i].创建者 = arr.data[i].file_teacher;
            self.items[i].要求 = arr.data[i].file_require;
            self.items[i].文件数 = parseInt(Math.random() * 100 + 1);
            option = {
              课程: "",
              文件数: 0,
              创建者: "",
              时间: ""
            }; //清除option缓存
          }
          //console.log(self.items);
          // console.log(arr.data);
        },
        err => {
          console.log(err);
        }
      );
    },
    getCourse: function() {
      this.myteacher = store.state.logintemmes.name;
      var teacher = this.myteacher;
      let self = this;
      this.$http({
        method: "post",
        url: "/api/teachcourseMsg", //显示当前学生的选课信息
        data: {
          c_teach: teacher
        },
        headers: {
          "Content-Type": "text/plain"
        }
      }).then(
        result => {
          let arr = result.data;
          console.log(arr.data);
          //去重算法
          var datarray = [];
          for (var i = 0; i < arr.data.length; i++) {
            for (var j = i + 1; j < arr.data.length; j++) {
              if (arr.data[i].name === arr.data[j].name) {
                j = ++i;
              }
            }
            datarray.push(arr.data[i]);
          }
          //console.log(datarray);
          //统计重复次数算法，班级数
          var count = []; //存储班级数的数组
          var num = 0; //计量
          for (var k = 0; k < datarray.length; k++) {
            for (var z = 0; z < arr.data.length; z++) {
              if (datarray[k].name === arr.data[z].name) {
                num++; //存在相同则加1
              }
            }
            count.push(num); //班级数添加到数组空间
            num = 0; //清空缓存
          }
          //console.log(count);
          let option = {
            课程: "",
            班级数: 0,
            创建者: "",
            时间: "",
            地点: ""
          };
          for (var i = 0; i < datarray.length; i++) {
            self.items.push(option);
            self.items[i].课程 = datarray[i].name;
            self.items[i].班级数 = count[i];
            self.items[i].创建者 = datarray[i].teaname;
            self.items[i].时间 = datarray[i].time;
            self.items[i].地点 = datarray[i].address;
            option = {
              课程名称: "",
              班级数: 0,
              教学地点: "",
              时间: "",
              地点: ""
            };
          }
          //console.log(self.items);
          //console.log(arr.data);
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
.table-detail2 {
  margin: 0 auto;
  width: 50.25rem;
  overflow: hidden;
  text-align: center;
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
