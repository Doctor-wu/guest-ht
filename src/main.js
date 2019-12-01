// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
import App from './App'
import router from './router/router'
import store from './store/index'

Vue.config.productionTip = false;
let vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
//路由守卫
router.beforeEach(
  function (to, from, next) {
    console.log(to);
    if(to.path=='/'){
      next();
    }
    else if (vm.$store.state.loginPass) {
      console.log('路由成功');
      next();
    }
    else {
      console.log(111);
      // vm.$route.push('/')
      next('/');
    }
  }
)

export default vm;
