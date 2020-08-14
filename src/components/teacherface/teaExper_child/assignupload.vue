<template>
  <div>
    <!--班级列表-->
    <experChild v-if="classmin_bool">
      <div slot="mintitle">
        课程名称：{{minMsg.courseName}}
        教学地点：{{minMsg.courseAddress}}
        <div>
          <b-button size="sm" :style="{position:'absolute',right:'4.0625rem',marginTop:'-2.5rem',zIndex:'999',width:'6.25rem',backgroundColor:'#6c757d'}" @click="addfile">增加
          </b-button>
        </div>
      </div>
      <div slot="minctx">
        <div class="table-detail2">
          <b-table :items="item2s" :fields="field2s" hover striped>
            <template slot="操作" slot-scope="row">
              <b-button size="sm" class="mr-2" @click="downfile(row.item)">下载</b-button>
              <b-button size="sm" class="mr-2" @click="deletfile(row.item)">删除</b-button>
            </template>
          </b-table>
        </div>
      </div>
      <div slot="minfooter">
        <div>
          脚部
        </div>
        <b-button  :style="{float:'right'}" @click="closemin">关闭
        </b-button>
      </div>
    </experChild>
    <!--上传文件-->
    <addctxcon v-if="exper_bool">
      <div slot="bbstitle">请选择文件</div>
      <div slot="bbsctx">
        <b-form @reset="clearFiles" @submit.prevent="teachupload">
          <b-form-file v-model="file" :state="Boolean(file)" placeholder="Choose a file..." ref="fileinput" @change="selFile($event)"></b-form-file>
          <div class="mt-4" :style="{marginLeft:'0.9375rem',}">
            <!--选择的文件{{file && file.name}}-->
          </div>
          <b-container class="bv-example-row" v-for="(ctx,index) in ctxs" :key="index">
            <b-row>
              <b-col sm="4" :style="{marginBottom:'1.25rem'}">
                <span :style="{fontSize:'1rem'}">{{ctx.name}}</span>
              </b-col>
              <b-col sm="8">
                <b-form-input v-model="ctx.context" type="text" :placeholder="ctx.place"></b-form-input>
              </b-col>
            </b-row>
          </b-container>
          <b-button type="reset" :style="{width:'5rem',backgroundColor:'#575757',marginLeft:'0.625rem',marginTop:'0.9375rem'}">重选</b-button>
          <b-button type="submit" :style="{width:'5rem',backgroundColor:'#575757',marginLeft:'0.625rem',marginTop:'0.9375rem'}">上传
          </b-button>
        </b-form>
      </div>
      <div slot="bbsfooter">
        <b-button @click="closethis">关闭
        </b-button>
      </div>
    </addctxcon>
    <div>
      <b-button size="sm" :style="{position:'absolute',right:'14.0625rem',marginTop:'-2.5rem',zIndex:'999',width:'6.25rem',backgroundColor:'#6c757d'}" @click="addfile">增加
      </b-button>
    </div>
    <!--课程列表-->
    <div class="table-containter">
      <div class="table-detail">
        <b-table :items="items" :fields="fields" hover striped>
          <template slot="操作" slot-scope="row">
            <!--<b-button size="sm" class="mr-2" @click="downfile(row.item)">下载</b-button>-->
            <b-button size="sm" class="mr-2" @click="getfile(row.item)">详情</b-button>
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
  import addctxcon from "@/components/teacherface/addctxcon";
  import store from '../../../store/store';
  import experChild from '../teaExper_child/exper_child'
  export default {
    data() {
      return {
        ctxs: [
          { name: "文件名称:", context: "" },
          { name: "时间:", context: "" },
          { name: "要求:", context: "" },
        ],
        file: "",
        exper_bool: false,
        fields: ["课程", "班级数", "课程时间", "操作"],
        items: [],
        myteacher:'',
        minMsg:{
          courseName:'',
          courseAddress:''
        },
        classmin_bool:false,
        field2s:["文件名","类型","上传时间","操作"],
        item2s: [],
      };
    },
    components: {
      addctxcon,experChild
    },
    methods: {
      selFile: function(e) {
        var self = this;
        //黑科技获取本地绝对路径难度高，转换为本地缓存
        //console.log(e.target.files[0]);
        var formData = new FormData();
        formData.append("filename", e.target.files[0].name);
        formData.append("upfile", e.target.files[0]);
        formData.append("filetype", e.target.files[0].type);
        formData.append("filesize", e.target.files[0].size);
        this.$http({
          method: "post",
          url: "/api/teachUploadtemporary",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }).then(
          response => {
            console.log(response);
            self.ctxs[0].context=self.file.name;
          },
          err => {
            console.log(err);
          }
        );
      },
      teachupload: function() {
        alert("上传");
        var tf_name = this.file.name;
        var tf_time=this.ctxs[1].context;
        var tf_require=this.ctxs[2].context;
        var tf_teach=this.myteacher;
        var tf_type=this.minMsg.courseName;
        console.log("获取缓存后的file：", tf_name);
        this.$http({
          method: "post",
          url: "/api/teachUploadExper", //显示当前学生的选课信息
          data: {
            sfname: tf_name,
            sftype: tf_type,
            sftime: tf_time,
            sfteach: tf_teach,
            sfrequire: tf_require,
          },
          headers: {
            "Content-Type": "text/plain"
          }
        }).then(
          result => {
            let arr = result.data;
            let self=this;
            //console.log(self.items);
            console.log(arr);
            if(arr.mes=='success'){
              alert("上传成功");
              var option={
                文件名: arr.filename,
                类型: arr.filetype,
                上传时间: arr.filetime,
              }
              self.item2s.push(option);
              this.exper_bool=false;
            }else{
              alert("上传失败");
            }
          },
          err => {
            console.log(err);
          }
        );
      },
      clearFiles: function() {
        this.$refs.fileinput.reset();
      },
      closethis: function() {
        this.exper_bool = false;
      },
      addfile: function() {
        this.exper_bool = true;
      },
      //班级信息
      openmin:function (item) {
        this.minMsg.courseName=item.课程;
        this.minMsg.courseAddress=item.教学地点;
        var minC_name=this.minMsg.courseName;
        var myteacher=this.myteacher;
        this.$http({
          method:"post",
          url:"/api/teachcourseminMsg",
          data:{
            minCourseName:minC_name,
            myteach:myteacher
          },
          headers: {
            "Content-Type": "text/plain"
          }
        }).then(
          result=>{
            let arr=result.data;
            console.log(arr.data);
            let option = {班级: '', 人数: '', 时间: ''};
            for(var i=0;i<arr.data.length;i++){
              this.item2s.push(option);
              this.item2s[i].班级=arr.data[i].class;
              this.item2s[i].人数=arr.data[i].stunum;
              this.item2s[i].时间=arr.data[i].time;
              option={班级: '', 人数: '', 时间: ''}}
          },
          err=>{
            console.log(err);
          }
        )
        this.classmin_bool=true;
      },
      closemin:function () {
        var arr=this.item2s;
        this.item2s.splice(0,arr.length);
        //console.log(arr.length);
        this.classmin_bool=false;
      },
      //下载文件
      downfile: function(item) {
        var min = JSON.stringify(item.地址);
        window.location.href = item.地址;
        alert("下载中" + min);
      },
      //删除文件
      deletfile:function(item){
        var fileName = item.文件名;
        var fileCourse = item.类型;
        var myteacher=this.myteacher;
        console.log("文件名:" + fileName);
        var self = this;
        this.$http({
          method: "post",
          url: "/api/experfiledelMsg", //显示当前学生的选课信息
          data: {
            fileN: fileName,
            fileC:fileCourse,
            fileT:myteacher
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
              var j=0;//记录下标
              var le=self.item2s.length;
              for(var i=0;i<le;i++){
                if(item.文件名==self.item2s[i].文件名){
                  j=i;
                }
              }
              //console.log(item,j);
              self.item2s.splice(j, 1);
              alert("已删除");
            }
          },
          err => {
            console.log(err);
          }
        );
      },
      getfile: function(item) {
        this.minMsg.courseAddress=item.教学地点;
        this.minMsg.courseName=item.课程;
        var minC_name=this.minMsg.courseName;
        var myteacher=this.myteacher;
        let self = this;
        this.$http({
          method: "post",
          url: "/api/experfileMsg", //显示当前上传的实验指导书信息
          data: {
            C_name:minC_name,
            C_teach:myteacher
          },
          headers: {
            "Content-Type": "text/plain"
          }
        }).then(
          result => {
            let arr = result.data;
            // console.log(arr.data.length);//数据库长度
            let option={
              文件名: "", 类型: "", 上传时间: ""
            }
            for (var i = 0; i < arr.data.length; i++) {
              self.item2s.push(option);
              self.item2s[i].文件名 = arr.data[i].file_name;
              self.item2s[i].类型 = arr.data[i].file_type;
              self.item2s[i].上传时间 = arr.data[i].file_time;
              self.item2s[i].老师 = arr.data[i].file_teacher;
              self.item2s[i].要求 = arr.data[i].file_require;
              self.item2s[i].地址 = arr.data[i].file_path;
              option={
                文件名: "", 类型: "", 上传时间: ""
              }//清除option缓存
            }
            //console.log(self.items);
            // console.log(arr);
          },
          err => {
            console.log(err);
          }
        );
        this.classmin_bool=true;
      },
      getcourse:function () {
        this.myteacher=store.state.logintemmes.name;
        var teacher=this.myteacher;
        let self = this;
        this.$http({
          method: "post",
          url: "/api/teachcourseMsg", //显示当前学生的选课信息
          data: {
            c_teach:teacher
          },
          headers: {
            "Content-Type": "text/plain"
          }
        }).then(
          result => {
            let arr = result.data;
            console.log(arr.data);
            //去重算法
            var datarray=[];
            for(var i=0;i<arr.data.length;i++){
              for(var j=i+1;j<arr.data.length;j++){
                if(arr.data[i].name===arr.data[j].name){
                  j=++i;
                }
              }
              datarray.push(arr.data[i]);
            }
            //console.log(datarray);
            //统计重复次数算法，班级数
            var count=[];//存储班级数的数组
            var num=0;//计量
            for(var k=0;k<datarray.length;k++){
              for(var z=0;z<arr.data.length;z++){
                if(datarray[k].name===arr.data[z].name){
                  num++;//存在相同则加1
                }
              }
              count.push(num);//班级数添加到数组空间
              num=0;//清空缓存
            }
            //console.log(count);
            let option={
              课程名称: "",
              班级数: 0,
              教学地点: "",
              时间: ""

            }
            for (var i = 0; i < datarray.length; i++) {
              self.items.push(option);
              self.items[i].课程 = datarray[i].name;
              self.items[i].班级数 = count[i];
              self.items[i].教学地点 = datarray[i].address;
              self.items[i].课程时间 = datarray[i].time;
              option={
                课程名称: "",
                班级数: 38,
                教学地点: "",
                时间: ""

              }
            }
            //console.log(self.items);
            //console.log(arr.data);
          },
          err => {
            console.log(err);
          }
        );
      }
    },
    mounted: function() {
      this.getcourse();
    }
  };
</script>

<style lang='less'>
  .table-containter {
    width: 81.4rem;
    overflow: hidden;
    text-align: center;
  }
  .table-detail2 {
    margin: 0 auto;
    width: 50.25rem;
    overflow: hidden;
    color: grey !important;
    font-weight: bold;
    font-size: 0.9375rem;
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
