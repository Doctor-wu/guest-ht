<template>
  <div id="app">
    <Nav class="nav" />
    <Main class="main" @reload-main="reload()" ref="main"></Main>
  </div>
</template>

<script>
import Nav from "@/components/nav";
import Main from "@/components/main";

export default {
  name: "App",
  components: { Nav, Main },
  data(){
    return{
    }
  }
};
</script>

<style scoped>
#app {
  height: 100%;
  width: 100%;
}

li,
a {
  text-decoration: none !important;
}


.nav {
  position: fixed;
  top: 0;
  z-index: 9999;
  background-color: #fff;
  width: 100%;
  height: 120px;
  left: 50%;
  padding-left: 3%; 
  margin-left: -50%;
}
.main {
  position: absolute;
  width: 100%;
  /* margin: 0 auto; */
  top: 120px;
  left: 0;
}

@media (min-width: 768px) {
  .main {
    width: 100%;
  }
}
</style>
