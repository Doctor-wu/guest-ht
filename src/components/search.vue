<template>
  <div class="container-fluid">
    <div class="row" style="margin:0">
      <div class="panel panel-default">
        <div class="panel-body">
          <el-tabs tab-position="left" style="height: 300px">
            <el-tab-pane label="月份查询" style="height:100%">
              <div class="block" style="height:100%">
                <div class="jumbotron text-center" style="width:100%;height:300px;">
                  <h3>
                    月份筛选
                    <br />
                    <small>
                      将会列出所选月份被推荐的嘉宾
                      <br />
                    </small>
                  </h3>
                  <br />
                  <el-row>
                    <el-col :md="24" :lg="24">
                      <el-date-picker
                        v-model="value1"
                        value-format="timestamp"
                        style="width:85%;"
                        type="month"
                        placeholder="选择月"
                      ></el-date-picker>
                    </el-col>
                    <el-col :md="24" class="hidden-md-and-up">
                      <br />
                    </el-col>
                    <el-col :md="24" :lg="24">
                      <el-button
                        type="primary"
                        @click="goResult(1)"
                        style="width:85%"
                        icon="el-icon-search"
                      >搜索</el-button>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="姓名查询">
              <div class="block" style="height:100%">
                <div class="jumbotron text-center" style="width:100%;height:300px;">
                  <!-- <h4>根据姓名筛选</h4> -->
                  <h3>
                    姓名筛选
                    <br />
                    <small>将会筛选出姓名符合的嘉宾</small>
                  </h3>
                  <br />
                  <el-row>
                    <el-col :md="24" :lg="24">
                      <el-input style="width:85%" v-model="value2" placeholder="请输入内容">
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                      </el-input>
                    </el-col>
                    <el-col :md="24" class="hidden-md-and-up">
                      <br />
                    </el-col>
                    <el-col :md="24" :lg="24">
                      <el-button
                        type="primary"
                        style="width:85%"
                        @click="goResult(2)"
                        icon="el-icon-search"
                      >搜索</el-button>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="职业查询">
              <div class="block" style="height:100%">
                <div class="jumbotron text-center" style="width:100%;height:300px;">
                  <!-- <h4>根据姓名筛选</h4> -->
                  <h3>
                    职业筛选
                    <br />
                    <small>将会筛选出职业符合的嘉宾</small>
                  </h3>
                  <br />
                  <el-row>
                    <el-col :md="24" :lg="24">
                      <el-select
                        v-model="value3"
                        filterable
                        placeholder="请选择"
                        style="width:85%"
                        popper-class="drop"
                      >
                        <el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
                      </el-select>
                    </el-col>
                    <el-col :md="24" class="hidden-md-and-up">
                      <br />
                    </el-col>
                    <el-col :md="24" :lg="24">
                      <el-button
                        type="primary"
                        style="width:85%"
                        @click="goResult(3)"
                        icon="el-icon-search"
                      >搜索</el-button>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      value1: "",
      value2: "",
      value3: ""
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    fail(msg) {
      this.$notify.error({
        title: "错误",
        message: msg,
        offset: 128,
        position: "top-left"
      });
    },
    goResult(s) {
      switch (s) {
        case 1: {
          if (this.value1 == 0) {
            this.fail("请选择月份");
            return;
          }
          this.getData_search({ type: 1, data: this.value1 });
          this.$router.push("searchResult");
          break;
        }
        case 2: {
          if (this.value2 == "") {
            this.fail("请输入姓名");
            return;
          }
          this.getData_search({ type: 2, data: this.value2 });
          this.$router.push("searchResult");
          break;
        }
        case 3: {
          if (this.value3 == "") {
            this.fail("请选择职业");
            return;
          }
          this.getData_search({ type: 3, data: this.value3 });
          this.$router.push("searchResult");
          break;
        }
      }
    },
    ...mapActions(["getData_search","update_nav_active"])
  },
  created() {
    this.$store.state.nav_show = true;
    this.update_nav_active('3');
    this.$store.dispatch("getOptions");
  },
  computed: {
    ...mapGetters(["options"])
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
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
.container-fluid {
  padding: 0;
}

.row {
  padding: 0;
}
</style>