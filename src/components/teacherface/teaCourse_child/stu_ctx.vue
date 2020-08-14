<template>
  <div>
    <p>课程</p>
    <div class="containter">
      <div>
        <b-button size="sm" :style="{position:'absolute',right:'14.0625rem',marginTop:'-2.5rem',zIndex:'999',width:'6.25rem',backgroundColor:'#6c757d'}">操作
        </b-button>
      </div>
      <div>
        <b-tabs pills card class="stu_context">
          <b-tab :title="item.course" active v-for="(item,index) in items" :key="index">
            <router-view></router-view>
          </b-tab>
        </b-tabs>
      </div>
      <!--<b-pagination size="md" :total-rows="100" :per-page="10">-->
      <!--</b-pagination>-->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { course: "JAVA" },
        { course: "NODEJS" },
        { course: "JAVASCRIPT" },
        { course: "MATH" },
        { course: "ENGLISH" },
        { course: "CHINESE" },
        { course: "HISTORY" }
      ],
      courseindex: 0
    };
  },
  methods: {
    stu_manage: function(index) {
      this.courseindex = index;
      alert(this.courseindex);
    }
  }
};
</script>

<style lang='less'>
.stu_context {
  padding: 0 1.25rem;
}
.stu_context .nav-link.active {
  background-color: #666666;
}
.stu_context .nav-link {
  color: #666666;
}
.stu_context .card-header {
  background-color: #f2f2f2;
  margin-left: -0.625rem;
}
</style>
