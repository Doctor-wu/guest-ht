<template>
  <div>
    <el-col
      :xs="{span:22,offset:1}"
      :sm="{span:12,offset:0}"
      :md="{span:8,offset:0}"
      :lg="{span:6,offset:0}"
      class="main_col"
    >
      <el-card :body-style="{ padding: '0px' }" shadow="always" class="card">
        <router-link to="/guestDetail">
          <div
            class="guest_head"
            @click="detail_render_id(data_item.id);detail_render_data(data_item.id);"
          >
            <img
              :src="'http://gmw.dgut.edu.cn/jbtj/server/tp5.1-blog/application/gq_jbtj/image/'+data_item.photo"
              class="image"
            />
          </div>
          <div
            class="bottom text-center clearfix"
            @click="detail_render_id(data_item.id);detail_render_data(data_item.id)"
          >
            <h3 style="text-center;position:relative">
              <strong>{{data_item.name}}</strong>
              <el-tag
                v-if="data_item.star == 1"
                type="success"
                style="position: absolute;right: 10px;bottom: -4px;"
                effect="light"
              >已收藏</el-tag>
            </h3>
            <el-button
              type="primary"
              style=" padding: 20px 0;position:absolute;bottom:0;"
              class="detail"
              plain
            >查看详情</el-button>
          </div>
        </router-link>
      </el-card>
    </el-col>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  props: ["data_item"],
  name: "guestMedia",
  data() {
    return {};
  },
  computed: {},
  methods: {
    //获取两个actions，第一个是把被点击的嘉宾的id传入vuex的state里，第二个是把改id对应嘉宾的数据传过去
    ...mapActions(["detail_render_id", "detail_render_data"])
  }
};
</script>

<style scoped>
/* .guest_head {
  width: 100%;
  height: 300px;
} */
.card {
  height: 420px !important;
  position: relative;
}
.guest_head {
  width: 500px;
  height: 300px;
  /* border: 1px solid black; */
  display: table-cell;
  vertical-align: middle;
  overflow: hidden;
}
.guest_head img {
  max-width: 100%;
  max-height: 100%;
  display: block;
  margin: 0 auto;
}

a {
  text-decoration: none;
}

.detail {
  width: 100%;
  text-align: center;
  height: 12% !important;
  display: block;
  text-decoration: none;
}

/* .image {
  width: 100%;
  height: 100%;
} */

.main_col {
  margin-bottom: 30px;
  box-sizing: border-box;
}

@media (max-width: 767px) {
  .main_col {
    padding: 0 !important;
  }
}
</style>