import Vue from 'vue';
import Vuex from 'vuex';

import guestData from './guest_data';


let PATH = process.env.NODE_ENV == 'development' ?
  'http://gmw.dgut.edu.cn/jbtj-ht/server/tp5.1-blog/public/gq_jbtj/index/' :
  '/jbtj-ht/server/tp5.1-blog/public/gq_jbtj/index/';


Vue.use(Vuex);

//vuex3-声明store对象
export default new Vuex.Store({
  strict: false, //严格模式：防止直接修改state process.env.NODE_ENV != 'production'
  state: { //核心：数据
    detail_id: -1,
    detail_data_item: {},
    guest_star: -1,
    curPage: 1,
    curPage_star: 1,
    curPage_search: 1,
    nav_show: true,
    loginPass: false,
    nav_active: '1'
  },
  mutations: {
    async update_normal_guest(state, Data) {
      (Data.data).forEach(item => {
        item.star = 0;
        if (item.photo == null) {
          item.photo = 'default.jpg';
        }
      })
      guestData.state.datas = Data;
      window.scrollTo(0, 0);
    },
    async update_star_guest(state, Data) {
      console.log(Data);
      (Data.data).forEach(item => {
        item.star = 1;
        if (item.photo == null) {
          item.photo = 'default.jpg';
        }
      })
      guestData.state.stardatas = Data;
      window.scrollTo(0, 0);
    },
    async update_search_guest(state, Data) {
      console.log(Data);
      (Data.data).forEach(item => {
        item.star = 0;
        if (item.photo == null) {
          item.photo = 'default.jpg';
        }
      })
      guestData.state.searchdatas = Data;
      window.scrollTo(0, 0);
    },
    detail_render_id(state, n) {
      console.log(n);
      state.detail_id = n;
    },
    detail_render_data(state, n) {
      let find = 0;
      console.log(n);
      console.log(guestData.state.datas.data);
      if (guestData.state.datas.data != undefined) {
        guestData.state.datas.data.forEach(item => {
          if (item.id == n) {
            item.sex = item.sex == 0 || item.sex == '男' ? '男' : '女';
            state.detail_data_item = item;
            find = 1;
          }
        })
      }
      if (find == 0) {
        guestData.state.curPage_search_data.forEach(item => {
          if (item.id == n) {
            item.sex = item.sex == 0 || item.sex == '男' ? '男' : '女';
            state.detail_data_item = item;
            find =1;
          }
        });
      }
      if (find == 0) {
        guestData.state.stardatas.data.forEach(item => {
          if (item.id == n) {
            item.sex = item.sex == 0 || item.sex == '男' ? '男' : '女';
            state.detail_data_item = item;
          }
        });
      }
      window.scrollTo(0, 0);
    },
    changePage(state, n) {
      state.curPage = n;
    },
    changePage_star(state, n) {
      state.curPage_star = n;
    },
    changePage_search(state, n) {
      window.scrollTo(0, 0);
      state.curPage_search = n;
    },
    set_nav_active(state,n){
      state.nav_active = n;
      console.log('active已修改为'+state.nav_active)
    }
  },
  actions: {
    async update_normal_guest({
      commit
    }, s) {
      let new_guest_data = await fetch(PATH + 'show' + '?page=' + s);
      new_guest_data = await new_guest_data.json();
      commit('update_normal_guest', new_guest_data.data);
    },
    async update_star_guest({
      commit
    }, n) {
      let new_guest_data = await fetch(PATH + 'collectionShow' + '?page=' + n);
      new_guest_data = await new_guest_data.json();
      commit('update_star_guest', new_guest_data.data);
    },
    // async update_search_guest({
    //   commit
    // }, n) {
    //   let new_guest_data = await fetch(PATH + 'show' + '?page=' + n);
    //   new_guest_data = await new_guest_data.json();
    //   commit('update_search_guest', new_guest_data.data);
    // },
    detail_render_id({
      commit
    }, n) {
      commit('detail_render_id', n);
    },
    detail_render_data({
      commit
    }, n) {
      commit('detail_render_data', n);
    },
    changePage({
      commit
    }, n) {
      commit('changePage', n);
    },
    changePage_star({
      commit
    }, n) {
      commit('changePage_star', n);
    },
    changePage_search({ commit }, n) {
      guestData.state.curPage_search_data = [];
      let c = (n - 1) * 8;
      let t = c + 8;
      t = t > guestData.state.searchdatas.length ? guestData.state.searchdatas.length : c + 8;
      console.log('c=' + c + 't=' + t);
      for (let i = c; i < t; i++) {
        guestData.state.curPage_search_data.push(guestData.state.searchdatas[i]);
      }
      console.log('当前页:' + guestData.state.curPage_search_data);
      commit('changePage_search', n);
    },
    getShow(state) {
      return state.nav_show;
    },
    update_nav_active({commit},n){
      commit('set_nav_active',n);
    }
  },
  getters: {
  },
  modules: {
    guestData,
  }
})
