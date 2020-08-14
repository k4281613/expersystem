<template>
  <div>
    <addctxcon v-if="coursctx_bool">
      <div slot="bbstitle">
        <span :style="{color:'#6c757d'}">请填写相应的内容</span>
      </div>
      <div slot="bbsctx">
        <b-form @submit.prevent="addcourse" @reset="onReset">
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
          <div :style="{marginTop:'0.625rem',marginLeft:'5rem',paddingBottom:'0.625rem'}">
            <b-button type="submit" :style="{backgroundColor:'#6c757d'}">Submit</b-button>
            <b-button type="reset" :style="{backgroundColor:'#6c757d'}">Reset</b-button>
          </div>
        </b-form>
      </div>
      <div slot="bbsfooter">
        <b-button @click="closethis" :style="{backgroundColor:'#6c757d'}">关闭
        </b-button>
      </div>
    </addctxcon>
    <experChild v-if="minctx_bool">
      <div slot="mintitle">
        课程名称：{{minMsg.courseName}}
        教学地点：{{minMsg.courseAddress}}
        <div>
          <b-button size="sm" :style="{position:'absolute',right:'4.0625rem',marginTop:'-2.5rem',zIndex:'999',width:'6.25rem',backgroundColor:'#6c757d'}" @click="openaddclass">增加
          </b-button>
        </div>
      </div>
      <div slot="minctx">
        <div class="table-detail2">
          <b-table :items="item2s" :fields="field2s" hover striped>
            <template slot="操作" slot-scope="row">
              <b-button size="sm" class="mr-2" v-b-modal.modal1 @click="delclassMsg(row.item)">删除</b-button>
              <b-button size="sm" class="mr-2" v-b-modal.modal1 @click="changclassMsg(row.item)">修改</b-button>
            </template>
          </b-table>
        </div>
      </div>
      <div slot="minfooter">
        <div>
          脚部
        </div>
        <b-button  :style="{float:'right'}" @click="closecmin">关闭
        </b-button>
      </div>
    </experChild>
    <addctxcon v-if="class_bool">
      <div slot="bbstitle">
        <span :style="{color:'#6c757d'}">请填写相应的内容</span>
      </div>
      <div slot="bbsctx">
        <b-form @submit.prevent="addclass" @reset="onResetclass">
          <b-container class="bv-example-row" v-for="(ctx,index) in ctxs3" :key="index">
            <b-row>
              <b-col sm="4" :style="{marginBottom:'1.25rem'}">
                <span :style="{fontSize:'1rem'}">{{ctx.name}}</span>
              </b-col>
              <b-col sm="8">
                <b-form-input v-model="ctx.context" type="text"></b-form-input>
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
        <b-button @click="closeaddclass" :style="{backgroundColor:'#6c757d'}">关闭
        </b-button>
      </div>
    </addctxcon>
    <addctxcon v-if="upctx_bool">
      <div slot="bbstitle">
        <span :style="{color:'#6c757d'}">请修改相应的内容</span>
      </div>
      <div slot="bbsctx">
        <b-form @submit.prevent="upclassMsg" @reset="onReset">
          <b-container class="bv-example-row" v-for="(ctx,index) in ctxs2" :key="index">
            <b-row>
              <b-col sm="4" :style="{marginBottom:'1.25rem'}">
                <span :style="{fontSize:'1rem'}">{{ctx.name}}</span>
              </b-col>
              <b-col sm="8">
                <b-form-input v-model="ctx.context" type="text" :disabled="ctx.dis"></b-form-input>
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
        <b-button @click="closeup" :style="{backgroundColor:'#6c757d'}">关闭
        </b-button>
      </div>
    </addctxcon>
    <p>管理人:{{myteacher}}</p>
    <div class="table-containter">
      <div>
        <b-button size="sm" :style="{position:'absolute',right:'14.0625rem',marginTop:'-2.5rem',zIndex:'999',width:'6.25rem',backgroundColor:'#6c757d'}" @click="openthis">增加
        </b-button>
      </div>

      <div class="table-containter">
        <div class="table-detail">
          <b-table :items="items" :fields="fields" hover striped>
            <template slot="操作" slot-scope="row">
              <b-button size="sm" class="mr-2" @click="opencmin(row.item)">详情
              </b-button><!--changMsg(row.item)-->
              <b-button size="sm" class="mr-2" @click="deleteMsg(row.item)">删除
              </b-button>
            </template>
          </b-table>
        </div>
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
  import store from '../../../store/store'
  import experChild from '../teaExper_child/exper_child'
  export default {
    data() {
      return {
        // 增加
        ctxs: [
          { name: "课程名称:", context: "" },
          { name: "人数:", context: "" },
          { name: "班级:", context: "" },
          { name: "时间:", context: "" },
          { name: "教学地点",context: ""}
        ],
        // 修改
        ctxs2: [
          { name: "班级:", context: "",dis:"disabled" },
          { name: "人数:", context: "" },
          { name: "时间:", context: "" }
        ],
        ctxs3:[
          { name: "班级:", context: "" },
          { name: "人数:", context: "" },
          { name: "时间:", context: "" }
        ],
        ctxindex:0,
        file: "",
        class_bool:false,
        coursctx_bool: false,
        upctx_bool: false,
        minctx_bool: false,
        minMsg:{
          courseName:'',
          courseAddress:''
        },
        field2s:["班级","人数","时间","操作"],
        item2s: [],
        classindex:0,
        fields: ["课程名称", "班级数", "教学地点", "时间", "操作"],
        items: [],
        myteacher:'',
      };
    },
    mounted: function() {
      this.getcourseMsg();
    },
    components: {
      addctxcon,experChild
    },
    methods: {
      opencmin:function(item){
        this.minMsg.courseName=item.课程名称;
        this.minMsg.courseAddress=item.教学地点;
        var minC_name=this.minMsg.courseName;
        var myteacher=this.myteacher
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
        this.minctx_bool=true;
      },
      closecmin:function(){
        var arr=this.item2s;
        this.item2s.splice(0,arr.length);
        this.minctx_bool=false;
      },
      addcourse: function(evt) {
        var self = this;
        alert("提交");
        var c_name = this.ctxs[0].context;
        var c_people = this.ctxs[1].context;
        var c_class = this.ctxs[2].context;
        var c_time = this.ctxs[3].context;
        var c_place = this.ctxs[4].context;
        var c_teach = this.myteacher;
        this.$http({
          method: "post",
          url: "/api/teachaddcourseMsg", //显示当前学生的选课信息
          data: {
            courseName: c_name,
            coursePeople: c_people,
            courseClass: c_class,
            courseTime: c_time,
            coursePlace: c_place,
            courseTeach: c_teach,

          },
          headers: {
            "Content-Type": "text/plain"
          }
        }).then(
          result => {
            let arr = result.data;
            console.log(arr);
            if (arr.data == "fault") {
              alert("该课程已存在");
            } else {
              let option = {
                课程名称: c_name,
                班级数: 1,
                班级: c_class,
                时间: c_time,
                教学地点: c_place
              };
              self.items.push(option);
              alert("课程增加成功");
              self.coursctx_bool=false;
              //console.log(self.items);
            }
          },
          err => {
            console.log(err);
          }
        );
      },
      onReset: function(evt) {
        evt.preventDefault();
        /* Reset our form values */
        var ctxlen = this.ctxs.length;
        for (var i = 0; i < ctxlen; i++) {
          this.ctxs[i].context = "";
        }
      },
      closethis: function() {
        this.coursctx_bool = false;
      },
      closeup:function(){
        this.upctx_bool = false;
      },
      openthis: function() {
        this.coursctx_bool = true;
      },
      deleteMsg: function(item) {
        var courseName = JSON.stringify(item.课程名称);
        var courseTeach = this.myteacher;
        console.log("课程名字:" + courseName + "创建者:" + courseTeach);
        var self = this;
        this.$http({
          method: "post",
          url: "/api/teachdeletecourseMsg", //显示当前学生的选课信息
          data: {
            courseN: JSON.parse(courseName),
            courseT: courseTeach
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
              var le=self.items.length;
              for(var i=0;i<le;i++){
                if(item.课程名称==self.items[i].课程名称){
                  j=i;
                }
              }
              //console.log(item,j);
              self.items.splice(j, 1);
              alert("已删除");
            }
          },
          err => {
            console.log(err);
          }
        );
      },
      getcourseMsg: function() {
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
              self.items[i].课程名称 = datarray[i].name;
              self.items[i].班级数 = count[i];
              self.items[i].教学地点 = datarray[i].address;
              self.items[i].时间 = datarray[i].time;
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
      },
      openaddclass:function () {
        this.class_bool=true;
      },
      addclass:function () {
        var self = this;
        alert("提交");
        var c_class = this.ctxs3[0].context;
        var c_people = this.ctxs3[1].context;
        var c_time = this.ctxs3[2].context;
        var c_teach = this.myteacher;
        var coures_name=this.minMsg.courseName;
        var c_address=this.minMsg.courseAddress;
        this.$http({
          method: "post",
          url: "/api/teachaddclassMsg", //显示当前学生的选课信息
          data: {
            className: c_class,
            classPeople: c_people,
            classTime: c_time,
            classteach:c_teach,
            courseName:coures_name,
            courseAddress:c_address
          },
          headers: {
            "Content-Type": "text/plain"
          }
        }).then(
          result => {
            let arr = result.data;
            console.log(arr);
            if (arr.data == "fault") {
              alert("该班级已存在");
            } else {
              let option = {
                班级: c_class,
                人数: c_people,
                时间: c_time,
              };
              self.item2s.push(option);
              alert("班级增加成功");
              self.class_bool=false;
              //console.log(self.items);
            }
          },
          err => {
            console.log(err);
          }
        );
      },
      onResetclass:function (evt) {
        evt.preventDefault();
        /* Reset our form values */
        var ctxlen = this.ctxs3.length;
        for (var i = 0; i < ctxlen; i++) {
          this.ctxs3[i].context = "";
        }
      },
      closeaddclass:function () {
        this.class_bool=false;
      },
      changclassMsg: function(item) {
        /*var min = JSON.stringify(item);
        alert("详情.....:" + min);
        console.log(item);*/
        //对象转换为数组
        var self=this;
        var keys=[];//定义数组来接受key
        var arr=[];//定义数组来接受value
        for(var key in item){
          keys.push(key);
          arr.push(item[key]);
        }
        //console.log(arr);
        var ctxlen = this.ctxs2.length;
        for (var i = 0; i < ctxlen; i++) {
          this.ctxs2[i].context =arr[i];
        }
        //获取当前内容index
        var le=self.item2s.length;
        for(var i=0;i<le;i++){
          if(item.班级==self.item2s[i].班级){
            // self.ctxindex=i;//记录下标
            self.classindex=i;//记录下标
          }
        }
        console.log(self.classindex);
        this.upctx_bool=true;
      },
      upclassMsg:function(){
        var self = this;
        alert("提交");
        var class_name = this.ctxs2[0].context;
        var c_people = this.ctxs2[1].context;
        var c_time = this.ctxs2[2].context;
        var c_teach = this.myteacher;
        var c_name=this.minMsg.courseName
        this.$http({
          method: "post",
          url: "/api/teachupcourseMsg", //显示当前学生的选课信息
          data: {
            className: class_name,
            coursePeople: c_people,
            courseTime: c_time,
            courseTeach: c_teach,
            courseName:c_name
          },
          headers: {
            "Content-Type": "text/plain"
          }
        }).then(
          result => {
            let arr = result.data;
            console.log(arr);
            if(arr.n==1){
              let cindex=self.classindex;
              self.item2s[cindex].人数=c_people;
              self.item2s[cindex].时间=c_time;
              alert("修改成功");
              self.upctx_bool=false;
            }else{
              alert("修改失败");
            }
          },
          err => {
            console.log(err);
          }
        );
      },
      delclassMsg:function(item){
        var className = item.班级;
        var courseTeach = this.myteacher;
        var courseName = this.minMsg.courseName;
        console.log("班级名字:" + className + "老师:" + courseTeach);
        var self = this;
        this.$http({
          method: "post",
          url: "/api/teachdelclassMsg",
          data: {
            classN:className,
            courseT:courseTeach,
            courseN:courseName
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
                if(item.班级==self.item2s[i].班级){
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
  .table-detail2 {
    margin: 0 auto;
    width: 60.25rem;
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
