<template>
  <div class="container" style="margin-top:">
    <div class="page-header text-center text-info">
      <h1>
        嘉宾推荐后台
        <br />
        <small>登陆页面</small>
      </h1>
    </div>
    <form class="form-signin">
      <h2 class="form-signin-heading">请登录</h2>
      <label for="inputEmail" class="sr-only">User</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="User"
        v-model="user"
        required
      />
      <label for="inputPassword" class="sr-only">Password</label>
      <input
        v-model="pass"
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="Password"
        required
        eye
        autofocus
      />
      <router-link to="/index">
        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </router-link>
    </form>
  </div>
</template>

<script>
import { reject } from "q";

let PATH =
  process.env.NODE_ENV == "development"
    ? "http://gmw.dgut.edu.cn/jbtj-ht/server/tp5.1-blog/public/gq_jbtj/index/"
    : "/jbtj-ht/server/tp5.1-blog/public/gq_jbtj/index/";
export default {
  name: "Login",
  data() {
    return {
      pass: "",
      user: "root"
    };
  },
  methods: {
    async verify() {
      //登录验证
      try {
        let ver = await fetch(PATH + "login", {
          method: "POST",
          body: JSON.stringify({
            name: this.user,
            password: this.pass
          }),
          headers: new Headers({
            "Content-Type": "application/json"
          })
        });
        ver = await ver.json();
        console.log(ver);
        if (ver.code == 1) {
          this.$store.state.loginPass = true;
        }
      } catch (e) {
        throw new Error("发送异步登录请求失败");
      }
    },
    success() {
      const h = this.$createElement;
      this.$notify({
        title: "成功",
        message: h("i", { style: "color: teal;" }, `登录成功`),
        position: "top-left",
        offset: 128,
        type: "success"
      });
    },
    fail() {
      const h = this.$createElement;
      this.$notify.error({
        title: "失败",
        message: "登陆失败",
        position: "top-left",
        offset: 128
      });
    }
  },
  created() {
    this.$store.state.nav_show = false;
    this.$store.state.loginPass = false;
    this.$store.state.nav_active = 1;
  },
  async beforeRouteLeave(to, from, next) {
    await this.verify();
    if (this.$store.state.loginPass) {
      this.success();
      next();
    } else {
      this.fail();
      next(false);
    }
  }
};
</script>

<style scoped>
.main {
  top: 0;
}

.form-signin {
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .form-signin-heading,
.form-signin .checkbox {
  margin-bottom: 10px;
}
.form-signin .checkbox {
  font-weight: normal;
}
.form-signin .form-control {
  position: relative;
  height: auto;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>