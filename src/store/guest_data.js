let PATH = process.env.NODE_ENV == 'development'
  ? 'http://gmw.dgut.edu.cn/jbtj-ht/server/tp5.1-blog/public/gq_jbtj/index/'
  : '/jbtj-ht/server/tp5.1-blog/public/gq_jbtj/index/';

export default {
  state: {
    datas: {},
    stardatas: {},
    searchdatas: [],
    curPage_search_data: [],
    options: [],
    hasFound: true
  },
  mutations: {
    'setData': function (state, Data) {
      // console.log(datas)
      Data.data.forEach(item => {
        item.star = 0;
        if (item.photo == null) {
          item.photo = 'default.jpg';
        }
      })
      state.datas = Data;
    },
    'setData_star': function (state, Data) {
      console.log(Data);
      Data.data.forEach(item => {
        item.star = 1;
        if (item.photo == null) {
          item.photo = 'default.jpg';
        }
      })
      state.stardatas = Data;
    },
    'setData_search': function (state, Data) {

      console.log('Data:' + Data);
      state.curPage_search_data = [];
      state.searchdatas = [];
      if (Data[0].length == 0 && Data[1].length == 0) {
        state.hasFound = false;
        return;
      };
      Data[1].forEach(item => {
        item.star = 1;
        if (item.photo == null) {
          item.photo = 'default.jpg';
        }
        state.searchdatas.push(item);
      });
      Data[0].forEach(item => {
        item.star = 0;
        if (item.photo == null) {
          item.photo = 'default.jpg';
        }
        state.searchdatas.push(item);
      })
      let t = state.searchdatas.length > 8 ? 8 : state.searchdatas.length;
      for (let i = 0; i < t; i++) {
        if (i > state.searchdatas.length) return;
        state.curPage_search_data.push(state.searchdatas[i]);
      }
      console.log('分类完毕', state.searchdatas)
    },
    'getOptions': function (state, op) {
      state.options = op;
    },
  },
  actions: {
    async getData({
      commit
    }, s) {
      window.scrollTo(0, 0);
      console.log('加载第' + s + '页');
      let new_guest_data = await fetch(PATH + 'show' + '?page=' + s);
      new_guest_data = await new_guest_data.json();
      commit('setData', new_guest_data.data);
    },
    async getData_star({
      commit
    }, s) {
      window.scrollTo(0, 0);
      console.log('加载第' + s + '页收藏');
      let new_guest_data = await fetch(PATH + 'collectionShow' + '?page=' + s);
      new_guest_data = await new_guest_data.json();
      commit('setData_star', new_guest_data.data);
    },
    async getData_search({
      commit, state
    }, s) {
      window.scrollTo(0, 0);
      let type = s.type;
      try {
        switch (type) {
          case 1: {
            state.hasFound = true;
            let new_guest_data = await fetch(PATH + 'searchTime' + '?time=' + s.data / 1000);
            new_guest_data = await new_guest_data.json();
            commit('setData_search', new_guest_data);
            break;
          }
          case 2: {
            let new_guest_data = await fetch(PATH + 'searchName' + '?name=' + s.data);
            new_guest_data = await new_guest_data.json();
            commit('setData_search', new_guest_data);
            break;
          }
          case 3: {
            state.hasFound = true;
            let new_guest_data = await fetch(PATH + 'searchJob' + '?job=' + s.data);
            new_guest_data = await new_guest_data.json();
            commit('setData_search', new_guest_data);
            break;
          }
        }
      } catch (e) { 
        alert('异步请求失败，请检查网络并刷新页面');
      }


    },
    async getOptions({ commit }, s) {
      let op = await fetch(PATH + 'job');
      op = await op.json();
      commit('getOptions', op);
    }
  },
  getters: {
    datas(state) {
      return state.datas;
    },
    guestDatas(state) {
      return state.datas.data;
    },
    datas_star(state) {
      return state.stardatas
    },
    guestDatas_star(state) {
      return state.stardatas.data;
    },
    search(state) {
      return state.searchdatas
    },
    searchDatas(state) {
      return state.searchdatas;
    },
    options(state) {
      return state.options;
    },
    curPage_search_data(state) {
      return state.curPage_search_data;
    },
    has_Found(state) {
      return state.hasFound;
    }
  }
}
