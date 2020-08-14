import vbutton from '../components/vbutton'
export default {
  name: 'resindex',
  data() {
    return {
      resmes:{
        username:'LvJiaJun',
        password:'123456',
        telphone:'13414104942'
      },
      selected: 'student',
      options: [
        { text: 'student', value: 'student' },
        { text: 'teacher', value: 'teacher' },
      ]
    }
  },
  components:{
    vbutton
  },
  methods:{
    returnlogin:function(){
      this.$router.back(-1);
    },
    gotologin:function(){

      var resname=this.resmes.username;
      var respass=this.resmes.password;
      var resprofes=this.selected;
      var self=this;
      this.$http({
        method: "post",
        url: "/api/resMsg", //显示当前学生的选课信息
        data: {
          username:resname,
          userpass:respass,
          profession:resprofes
        },
        headers: {
          "Content-Type": "text/plain"
        }
      }).then(
        result => {
          let arr = result.data;
          console.log(arr);
          if(arr=='success'){
            alert("注册成功");
            // self.$router.replace({path:'/'})
          }else{
            alert("注册失败，用户名重复");
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  }
}
