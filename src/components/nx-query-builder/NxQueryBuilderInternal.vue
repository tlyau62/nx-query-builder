<template>
  <div></div>
</template>

<script>
import $ from "jquery";
import "jQuery-QueryBuilder/dist/js/query-builder.js";
import { cloneDeep } from "lodash";

export default {
  name: "NxQueryBuilderInternal",
  props: {
    filters: {
      type: Array,
    },
    value: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  computed: {
    builder() {
      return $(this.$el);
    },
  },
  mounted() {
    const { builder } = this;

    builder.queryBuilder({
      filters: this.filters,
      rules: this.value,
    });

    this.registerRulesChanged();
  },
  watch: {
    filters(filters) {
      this.setFilters(filters);
    },
    value(value) {
      this.setRules(value);
    },
  },
  beforeDestroy() {
    const { builder } = this;

    if (builder) {
      builder.queryBuilder("destroy");
    }
  },
  methods: {
    emitRules() {
      const rules = this.builder.queryBuilder("getRules");

      if (rules) {
        this.$emit("input", rules);
      }
    },
    setFilters(filters) {
      this.builder.queryBuilder("reset");
      this.builder.queryBuilder("setFilters", filters);
    },

    /**
     * https://github.com/mistic100/jQuery-QueryBuilder/issues/833
     */
    setRules(rules) {
      this.registerRulesChanged(() => {
        this.builder.queryBuilder("setRules", cloneDeep(rules));
      });
    },

    registerRulesChanged(fn = () => {}) {
      this.builder.off("rulesChanged.queryBuilder");
      fn();
      this.builder.on("rulesChanged.queryBuilder", (e, level) =>
        this.emitRules()
      );
    },
  },
};
</script>

<style lang="scss">
@import "~jQuery-QueryBuilder/dist/css/query-builder.default.min.css";
</style>
