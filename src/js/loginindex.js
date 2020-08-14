import vbutton from '../components/vbutton'
import store from '../store/store'
export default {
  name: 'loginindex',
  data() {
    return {
    logintopic:'login',
      loginmes:{
        username:'admin',
        userpass:'123456'
      }
    }
  },
  components:{
    vbutton
  },
  methods:{
    gotoindex:function () {
      var loginname=this.loginmes.username;
      var loginpass=this.loginmes.userpass;
      var self=this;
      this.$http({
        method: "post",
        url: "/api/loginMsg", //显示当前学生的选课信息
        data: {
          username:loginname,
          userpase:loginpass
        },
        headers: {
          "Content-Type": "text/plain"
        }
      }).then(
        result => {
          let arr = result.data;
          console.log(arr);
          if(arr.length>0){
            if(arr.length==1){
              if(arr[0][0].password==loginpass){
                alert("登录成功");
                if(arr[0][0].ptype=='student'){
                  self.$router.push({path:'/zhuye'});
                }
                else {
                  var option={
                    name:arr[0][0].name,
                    tel:arr[0][0].tel,
                    sex:arr[0][0].sex,
                    email:arr[0][0].email,
                    introduce:arr[0][0].introduce,
                    num:arr[0][0].num
                  }
                  store.state.logintemmes=option;
                  //console.log(store.state.logintemmes);
                  self.$router.push({path:'/teacherindex'});}
              }else{
                alert("密码错误");
              }
            }else{
                alert("数据录入错误，用户名重复");
            }
          }else{
            alert("用户未注册");
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    gotores:function(){
      this.$router.push({path:'/resindex'})
      console.log(123);
    },
  }
}
