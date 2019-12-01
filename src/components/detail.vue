<template>
  <div>
    <div class="container-fluid">
      <div class="row" style="margin:0">
        <el-row>
          <el-col :md="{span:16,offset:4}">
            <div class="page-header">
              <h1>
                {{detail_data_item.name}}
                <small>{{detail_data_item.job}}</small>
              </h1>
            </div>
            <el-card :body-style="{ padding: '0px' }" style="text-align:center;">
              <div class="img-wrapper">
                <img
                  :src="'http://gmw.dgut.edu.cn/jbtj/server/tp5.1-blog/application/gq_jbtj/image/'+detail_data_item.photo"
                  class="image img-thumbnail"
                  style="width:100%"
                />
              </div>
              <div style="padding: 14px;">
                <h3>{{detail_data_item.profession}}</h3>
              </div>
            </el-card>
            <table class="table table-striped">
              <tbody>
                <tr>
                  <td class="item_title">
                    <strong>嘉宾姓名</strong>
                  </td>
                  <td class="col-xs-8">{{detail_data_item.name}}</td>
                </tr>
                <tr>
                  <td class="item_title">
                    <strong>嘉宾性别</strong>
                  </td>
                  <td>{{detail_data_item.sex}}</td>
                </tr>
                <tr>
                  <td class="item_title">
                    <strong>嘉宾专业领域</strong>
                  </td>
                  <td>{{detail_data_item.profession}}</td>
                </tr>
                <tr>
                  <td class="item_title">
                    <strong>推荐理由</strong>
                  </td>
                  <td>{{detail_data_item.reason}}</td>
                </tr>
                <tr>
                  <td class="item_title">
                    <strong>从事职业</strong>
                  </td>
                  <td>{{detail_data_item.job}}</td>
                </tr>
                <tr>
                  <td class="item_title">
                    <strong>电话</strong>
                  </td>
                  <td>{{detail_data_item.phone}}</td>
                </tr>
                <tr>
                  <td class="item_title">
                    <strong>微信</strong>
                  </td>
                  <td>{{detail_data_item.wechat}}</td>
                </tr>
                <tr>
                  <td class="item_title">
                    <strong>微博</strong>
                  </td>
                  <td>{{detail_data_item.weibo}}</td>
                </tr>
                <tr>
                  <td class="item_title">
                    <strong>邮箱</strong>
                  </td>
                  <td>{{detail_data_item.email}}</td>
                </tr>
              </tbody>
            </table>
          </el-col>
        </el-row>
        <div class="row" style="text-center">
          <button
            col-xs-12
            v-if="detail_data_item.star==0"
            @click="star(detail_id)"
            class="btn btn-success"
            style="display:block"
          >收藏</button>
          <button
            col-xs-12
            v-if="detail_data_item.star==1"
            @click="cancel_star(detail_id)"
            class="btn btn-warning"
            style="display:block"
          >取消收藏</button>
          <button col-xs-6 class="btn btn-danger" @click="del(detail_id)" style="display:block">删除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

let PATH =
  process.env.NODE_ENV == "development"
    ? "http://gmw.dgut.edu.cn/jbtj-ht/server/tp5.1-blog/public/gq_jbtj/index/"
    : "/jbtj-ht/server/tp5.1-blog/public/gq_jbtj/index/";
export default {
  name: "guestDetail",
  data() {
    return {};
  },
  methods: {
    //成功的提示
    success(msg) {
      const h = this.$createElement;
      this.$notify({
        title: "成功",
        message: h(
          "i",
          { style: "color: teal;" },
          `${this.detail_data_item.name}已${msg}`
        ),
        position: "top-left",
        offset: 128,
        type: "success"
      });
      this.$router.go(-1);
    },
    //失败的提示
    error(msg) {
      const h = this.$createElement;
      this.$notify.error({
        title: "错误",
        message: `${this.detail_data_item.name}${msg}失败`,
        position: "top-left",
        offset: 128
      });
    },
    //收藏嘉宾
    async star(id) {
      let data = await fetch(PATH + "collection?id=" + id);
      data = await data.json();

      if (data.code == 1) {
        this.success("收藏");
      } else {
        this.error("收藏");
      }
    },
    //取消收藏嘉宾
    async cancel_star(id) {
      let data = await fetch(PATH + "cancelCollection?id=" + id);
      data = await data.json();
      console.log(data);
      if (data.code == 1) this.success("取消收藏");
      else this.error("取消收藏");
    },
    //删除嘉宾，有一次询问是否删除
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let data = await fetch(PATH + "delete?id=" + id);
          data = await data.json();
          if (data.code == 1) this.success("删除");
          else this.error("删除");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  computed: {
    //获取详情页的id，id对应的嘉宾的数据，
    ...mapState(["detail_id", "detail_data_item"])
  },
  //创建时nav栏显示
  created() {
    this.$store.state.nav_show = true;
  },
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
.img-thumbnail {
  width: 200px;
  display: block;
  margin: 10px auto;
}

tr {
  height: 50px;
  padding-top: 10px;
}

td {
  padding-left: 5%;
}
.item_title {
  text-align: right;
  padding-right: 4%;
}

.img-wrapper {
  width: 60%;
  margin: 0 auto;
}

.btn {
  width: 70%;
  margin: 1% auto 5% auto;
}

@media (max-width: 1000px) {
  .img-wrapper {
    width: 90%;
  }
  .btn {
    width: 90%;
    margin: 1% auto 5% auto;
  }
}
</style>