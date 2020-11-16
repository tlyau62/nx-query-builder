<template>
  <div id="app" class="container">
    <example1></example1>
    <example2></example2>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import Vue from "vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import Example1 from "@/components/Example1";
import Example2 from "@/components/Example2";

window.$ = $;

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

export default {
  components: { Example1, Example2 },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
