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
      tempValue: null,
      comps: [],
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

    const comps = this.comps;

    const filters = this.config.filters.map((filter) => ({
      ...filter,
      input(rule, name) {
        const InputClass = Vue.extend(NxQueryFilterInput);
        const existComp = $(rule.$el).data("vue");
        const comp = new InputClass({
          propsData: {
            context: filter.context,
            rule,
          },
        });

        if (existComp) {
          comps.splice(comps.indexOf(existComp), 1);
          existComp.$destroy();
        }

        comps.push(comp);
        $(rule.$el).data("vue", comp);

        return $(comp.$mount().$el);
      },
      valueGetter(rule) {
        return $(rule.$el).data("vue").scope.value;
      },
      valueSetter(rule, value) {
        if (rule.operator.nb_inputs > 0) {
          $(rule.$el).data("vue").scope.value = value;
        }
      },
    }));

    builder.queryBuilder({
      filters,
      rules: this.value,
    });

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
      if (!isNil(value) && value !== this.tempValue) {
        this.setRules(value);
      }
    },
  },
  beforeDestroy() {
    const { builder } = this;

    if (builder) {
      for (const comp of comps) {
        comp.$destroy();
      }
      builder.off("rulesChanged.queryBuilder"); // similar issue to https://github.com/mistic100/jQuery-QueryBuilder/issues/833
      builder.queryBuilder("destroy");
    }
  },
  methods: {
    emitRules() {
      const rules = this.builder.queryBuilder("getRules", {
        allow_invalid: true,
      });

      this.tempValue = rules;

      this.$emit("input", rules);
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
