<template>
  <div>
    <div class="container-fluid">
      <div class="row" style="margin: 0">
        <div class="panel panel-default">
          <div class="panel-body">
            <el-row :span="24" :gutter="80" style="margin:0;">
              <div v-for="item in guestDatas_star" :key="item.id">
                <guestMedia :data_item="item" />
              </div>
            </el-row>
          </div>
        </div>
        <div style="text-align:center">
          <div class="block">
            <el-pagination
              layout="prev, pager, next"
              :total="datas_star.total"
              :current-page.sync="currentPage"
              :page-size="pageSize"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import guestMedia from "./guest";
export default {
  name: "star",
  data() {
    return {
      index: 1,
      currentPage: this.$store.state.curPage_star,
      pageSize: 8
      // pageNum: 1
    };
  },
  methods: {
    //获取三个actions
    //1.翻页时用来更新数据
    //2.创建页面是用来获取第一批数据
    //3.改变vuex里state对应的curPage_star
    ...mapActions([
      "update_star_guest",
      "getData_star",
      "changePage_star",
      "update_nav_active"
    ]),
    //当前页改变时触发的函数
    exchangeCurrentPage(newV) {
      //改变页数
      this.changePage_star(newV);
      //更新数据
      this.update_star_guest(newV);
    },
  },
  computed: {
    //获取guestDatas_star和datas_star
    ...mapGetters(["guestDatas_star", "datas_star"]),
  },
  //页面初始化时获取第一批数据，nav栏显示
  created(){
      this.getData_star(this.currentPage);
      this.$store.state.nav_show = true;
      this.update_nav_active('2');
  },
  //监视当前页的变化，变化时触发exchangeCurrentPage函数
  watch: {
    currentPage(newV, oldV) {
      this.exchangeCurrentPage(newV);
    }
  },
  //注册组件
  components: { guestMedia },
  beforeRouteEnter(to, from, next) {
      next(vm=>{
        // console.log(vm.$store.state.loginPass);
        // console.log(vm)
        if(vm.$store.state.loginPass){
          return ;
        }else{
          vm.$router.push('/');
        }
      });
  }
};
</script>

<style scoped>
.block {
  margin-bottom: 15px;
}

.container-fluid {
  padding: 0;
}

.row {
  padding: 0;
}
.panel-body {
  padding: 0;
}

@media (max-width: 768px) {
  .main_col {
    padding: 0 !important;
  }
}
</style>