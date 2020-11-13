<template>
  <div class="nx-query-filter">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "NxQueryFilter",
  props: [
    "id",
    "label",
    "type",
    "input",
    "values",
    "operators",
    "default-value",
    "validation",
  ],
  beforeMount() {
    this.$parent.$emit("filter-created", {
      id: this.id,
      label: this.label,
      type: this.type,
      input: this.input,
      values: this.values,
      operators: this.operators,
      default_value: this.defaultValue,
      validation: this.validation,
      context: this,
    });
  },
};
</script>

<style lang="scss" scoped></style>
