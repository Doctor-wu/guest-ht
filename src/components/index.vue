<template>
  <div>
    <div class="container-fluid">
      <div class="row" style="margin: 0">
        <div class="panel panel-default">
          <div class="panel-body">
            <el-row :span="24" :gutter="80" style="margin:0;">
              <div v-for="item in guestDatas" :key="item.id">
                <guestMedia :data_item="item" />
              </div>
            </el-row>
          </div>
        </div>
        <div style="text-align:center">
          <div class="block">
            <el-pagination
              layout="prev, pager, next"
              :total="datas.total"
              :current-page.sync="currentPage"
              :page-size="pageSize"
              :pager-count="5"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import guestMedia from "./guest";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "index",
  data() {
    return {
      index: 1,
      currentPage: this.$store.state.curPage,
      pageSize: 8
    };
  },
  //获取三个actions
    //1.翻页时用来更新数据
    //2.创建页面是用来获取第一批数据
    //3.改变vuex里state对应的curPage
  methods: {
    ...mapActions([
      "update_normal_guest",
      "getData",
      "changePage",
      "update_nav_active",
    ]),
    //当前页改变时触发的函数
    exchangeCurrentPage(newV) {
      //改变页数
      this.changePage(newV);
      //更新数据
      this.update_normal_guest(newV);
    },
  },
  computed: {
    //获取guestDatas和datas
    ...mapGetters(["guestDatas", "datas"]),
  },
  //页面初始化时获取第一批数据，nav栏显示
  created(){
      this.getData(this.currentPage);
      this.$store.state.nav_show = true;
      this.update_nav_active('1');
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

.panel-body {
  padding: 0;
}
</style>