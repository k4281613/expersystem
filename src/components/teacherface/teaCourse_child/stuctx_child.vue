<template>
  <div class="table-containter">
    <div class="table-detail">
      <b-table :items="items" :fields="fields">
        <template slot="操作" slot-scope="row">
          <b-button size="sm" class="mr-2" @click="delstu(row.item)">删除
          </b-button>
        </template>
      </b-table>
    </div>
    <div class="pag">
    <b-pagination size="md" :total-rows="100" :per-page="10">
    </b-pagination>
  </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        fields: ["学生", "学号", "教学地点","班级", "操作"],
        items: [
          {
            学生: "LJ丶俊",
            学号: 1540624174,
            教学地点: "Dickerson",
            班级:"M2419"
          },
          {
            学生: "WangRJ",
            学号: 1540624174,
            教学地点: "Dickerson",
            班级:"M2418"
          },
          {
            学生: "CuiSL",
            学号: 1540624174,
            教学地点: "Dickerson",
            班级:"M2415"
          },
          {
            学生: "lost丶濠",
            学号: 1540624174,
            教学地点: "Dickerson",
            班级:"M2417"
          },
          {
            学生: "Yzj",
            学号: 1540624174,
            教学地点: "Dickerson",
            班级:"M2414"
          },

        ]
      };
    },
    methods:{
      delstu:function(item){
        var stumes=JSON.stringify(item);
        //console.log(stumes);
        var keys=[];//定义数组接受key
        var arr=[];//定义数组接受value
        for(var key in item){
          keys.push(key);
          arr.push(item[key])
        }
        //console.log(arr);
        var j;
        var le=arr.length;//数组长度存在疑问
        var self=this;
        for(var i=0;i<=le;i++){
          if(item.学生==self.items[i].学生){
            j=i;
          }
        }
        console.log(j);
        self.items.splice(j,1);
        alert("已删除");
      }
    }
  };
</script>

<style lang='less' scoped>
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
