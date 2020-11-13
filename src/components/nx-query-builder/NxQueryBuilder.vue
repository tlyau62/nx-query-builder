<template>
  <div>
    <NxQueryBuilderInternal
      :key="id"
      @refresh="id++"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <slot></slot>
    </NxQueryBuilderInternal>
  </div>
</template>

<script>
import NxQueryBuilderInternal from "./NxQueryBuilderInternal";

export default {
  name: "NxQueryBuilder",
  components: {
    NxQueryBuilderInternal,
  },
  data() {
    return {
      id: 0,
    };
  },
};
</script>

<style></style>
