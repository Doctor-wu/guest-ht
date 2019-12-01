<template>
  <div class="container-fluid" style="padding:0 10px">
    <div class="row" style="margin:0;padding:0;text-align:center">
      <div class="page-header" style="overflow:hidden; padding-top:5px;margin-left:0px">
        <h3 class="text-primary" style="margin-top:5px;float:left">
          <el-button
            type="primary"
            @click="goBack()"
            size="small"
            style="display:inline-block;padding:5px auto"
          >
            <span class="el-icon-arrow-left"></span> 返回
          </el-button>
        </h3>
        <h3 class="text-primary" style="margin:9px 0 0 7px ;float:left">搜索结果</h3>
      </div>
      <div  v-if="!has_Found" class="jumbotron" style="margin-top:5px">
        <h1>什么都没找到噢</h1>
        <p>换一个参数试试吧</p>
      </div>
      <div  v-if="searchDatas.length != 0" class="panel panel-default">
        <div class="panel-body">
          <el-row :span="24" :gutter="80" style="margin:0;">
            <div v-for="item in curPage_search_data" :key="item.id">
              <guestMedia :data_item="item" />
            </div>
          </el-row>
        </div>
      </div>
      <div  v-if="searchDatas.length != 0" style="text-align:center;width:100%;padding-bottom:10px">
        <div class="block">
          <el-pagination
            layout="prev, pager, next"
            :total="searchDatas.length"
            :current-page.sync="currentPage"
            :page-size="8"
            :pager-count="5"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import guestMedia from "./guest";
export default {
  name: "searchResult",
  data() {
    return {
      index: 1,
      currentPage: this.$store.state.curPage_search | 1,
      pageSize: 8
    };
  },
  methods: {
    ...mapActions([
      "update_search_guest",
      "getData_search",
      "changePage_search",
      "update_nav_active"
    ]),
    exchangeCurrentPage(newV) {
      this.changePage_search(newV);
      // this.update_search_guest(newV);
    },
    goBack(){
      this.$router.go(-1);
      // this.update_nav_active('3');
    },
  },
  created() {
    this.$store.state.nav_show = false;
    // this.$store.dispatch('update_nav_active',3)
    // update_nav_active('3');
    // console.log(this.currentPage);
  },
  computed: {
    ...mapGetters(["search", "searchDatas", "curPage_search_data","has_Found"]),
    ...mapState(["curPage_search"]),
  },
  watch: {
    currentPage(newV, oldV) {
      this.exchangeCurrentPage(newV);
    }
  },
  components: { guestMedia },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // console.log(vm.$store.state.loginPass);
      // console.log(vm)
      if (vm.$store.state.loginPass) {
        return;
      } else {
        vm.$router.push("/");
      }
    });
  }
};
</script>

<style scoped>
.page-header {
  margin: 0 0 0 10px;
  width: 100%;
}

.main {
  top: 0;
}
</style>