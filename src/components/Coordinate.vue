<template>
  <div>
    <input type="text" v-model="scope.value" @change="change" />
    <button @click="appendA">Append A</button>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  props: {
    scope: {
      type: Object,
    },
  },
  methods: {
    appendA() {
      this.scope.value += "A";
      $(this.$el).trigger("change");
    },
    change() {
      $(this.$el).trigger("change");
    },
  },
};
</script>

<style lang="scss"></style>
