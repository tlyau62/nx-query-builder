<template>
  <div class="nx-query-filter">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "NxQueryFilter",
  props: ["id", "label", "type", "input", "values", "operators"],
  beforeMount() {
    this.$parent.$emit("filter-created", {
      id: this.id,
      label: this.label,
      type: this.type,
      input: this.input,
      values: this.values,
      operators: this.operators,
      context: this,
    });
  },
};
</script>

<style lang="scss" scoped></style>
