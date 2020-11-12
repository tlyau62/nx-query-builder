<template>
  <div class="nx-query-builder-internal">
    <div class="nx-query-builder-internal__querybuilder" />
    <div style="display: none;">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import "jQuery-QueryBuilder/dist/js/query-builder.js";
import { isNil, cloneDeep } from "lodash";
import NxQueryFilterInput from "./NxQueryFilterInput";
import Vue from "vue";

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
    return {
      init: false,
    };
  },
  computed: {
    builder() {
      return $(this.$el);
    },
  },
  beforeMount() {
    this.componentStore = [];
    this.config.filters = [];

    this.$on("filter-created", (filter) => {
      if (this.init) {
        this.$emit("refresh");
      } else {
        this.config.filters.push(filter);
      }
    });
  },
  created() {
    this.config = {};
  },
  mounted() {
    const { builder } = this;

    if (this.config.filters.length === 0) {
      return;
    }

    let comp;

    const filters = this.config.filters.map((filter) => ({
      ...filter,
      input(rule, name) {
        window.rule = rule;
        const InputClass = Vue.extend(NxQueryFilterInput);

        comp = new InputClass({
          propsData: {
            context: filter.context,
          },
        });

        return $(comp.$mount().$el);
      },
      valueGetter(rule) {
        return comp.scope.value;
      },
      valueSetter(rule, value) {
        if (rule.operator.nb_inputs > 0) {
          comp.scope.value = value;
        }
      },
    }));

    builder.queryBuilder({
      filters,
      rules: this.value,
    });

    window.builder = this.builder;

    builder.queryBuilder("validate");

    this.registerRulesChanged();

    this.emitRules();

    this.init = true;
  },
  watch: {
    filters(filters) {
      this.$emit("refresh");
    },
    value(value) {
      if (!isNil(value)) {
        this.setRules(value);
      }
    },
  },
  beforeDestroy() {
    const { builder } = this;

    if (builder) {
      builder.off("rulesChanged.queryBuilder"); // similar issue to https://github.com/mistic100/jQuery-QueryBuilder/issues/833
      builder.queryBuilder("destroy");
    }
  },
  methods: {
    emitRules() {
      this.$emit(
        "input",
        this.builder.queryBuilder("getRules", {
          allow_invalid: true,
        })
      );
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
