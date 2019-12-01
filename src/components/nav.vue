<template>
  <div class="container-fluid" style="width:100%;" v-if="nav_show">
    <div class="row">
      <div class="page-header" style="width:100%;">
        <h2>
          <a href="/jbtj-ht/" style="color:#409EFF">嘉宾推荐</a>
          <small>后台管理系统</small>
        </h2>
        <el-menu
          :default-active="nav_active"
          class="el-menu-demo"
          mode="horizontal"
          style="border:none"
        >
          <router-link to="/index" class="ib">
            <el-menu-item index="1" class="el_tab" style="margin:0;width:100%">
              <span class="glyphicon glyphicon-book" style="padding-right:10px;padding-bottom:0px"></span>
              首页
            </el-menu-item>
          </router-link>
          <router-link to="/star" class="ib">
            <el-menu-item class="el_tab" index="2">
              <span class="el-icon-star-on"></span> 收藏
            </el-menu-item>
          </router-link>
          <router-link to="/search" class="ib">
            <el-menu-item class="el_tab" index="3">
              <span class="el-icon-search"></span> 搜索
              <!-- <input type="text" v-model="activeIndex"> -->
            </el-menu-item>
          </router-link>
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
export default {
  name: "Nav",
  data() {
    return {
    };
  },
  methods: {},
  computed: {
    ...mapState(["nav_show", "nav_active"]),
  },
  created() {
    // console.log(this.$store.state.nav_active)
    // this.activeIndex = this.nav_active;
    // // 通过url哈希值判断分页
    // // this.activeIndex = (() => {
    // //   console.log(window.location.hash);
    // //   if (window.location.hash == "#/") return "1";
    // //   if (window.location.hash == "#/index") return "1";
    // //   if (window.location.hash == "#/star") return "2";
    // //   if (window.location.hash == "#/search") return "3";
    // // })();
  },
  watch: {
    activeIndex(newV, oldV) {
      console.log(newV, oldV);
    }
  }
};
</script>

<style scoped>
.ib {
  display: inline-block;
}

.row {
  margin: 0;
  padding: 0;
}

.el_tab {
  padding: 0 10px;
  width: 100%;
}

.page-header {
  border: none;
  margin: 0;
  width: 100%;
  padding-bottom: 0;
}

.is-active {
  border-bottom: 2px solid #409eff;
}
</style>