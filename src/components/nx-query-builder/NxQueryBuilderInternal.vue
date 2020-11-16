<template>
  <div class="nx-query-builder-internal">
    <div class="nx-query-builder-internal__querybuilder" />
    <div style="display: none">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import "jQuery-QueryBuilder/dist/js/query-builder.js";
import { isNil, cloneDeep, clone, isArray } from "lodash";
import NxQueryFilterInput from "./NxQueryFilterInput";
import Vue from "vue";

export default {
  name: "NxQueryBuilderInternal",
  props: {
    value: {
      type: Object,
    },
  },
  data() {
    return {
      init: false,
      tempValue: null,
      comps: {},
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
      this.config.filters.push(filter);

      if (this.init) {
        this.setFilters(this.config.filters);
      }
    });

    this.$on("filter-destroyed", (filter) => {
      const filterIdx = this.config.filters.findIndex(
        (f) => f.context === filter.context
      );

      this.config.filters.splice(filterIdx, 1);

      if (this.init) {
        this.setFilters(this.config.filters);
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

    const filters = this.config.filters.map((filter) => {
      if (!filter.context.$scopedSlots.default) {
        return filter;
      }

      return {
        ...filter,
        input(rule, name) {
          if (name.endsWith(rule.id)) {
            name += "_value_0";
          }

          const valNum = parseInt(name.split("value_")[1]);

          if (!comps[rule.id]) {
            comps[rule.id] = [];
          }

          const comp = comps[rule.id][valNum];

          if (comp) {
            comp.$destroy();
          }

          const InputClass = Vue.extend(NxQueryFilterInput);
          comps[rule.id][valNum] = new InputClass({
            propsData: {
              context: filter.context,
              rule,
            },
          });

          return $(comps[rule.id][valNum].$mount().$el);
        },
        valueGetter(rule) {
          const values = comps[rule.id].map((comp) => comp.scope.value);

          if (rule.operator.nb_inputs === 1) {
            return values.slice(0, rule.operator.nb_inputs).join(",");
          }

          return values;
        },
        valueSetter(rule, value) {
          if (rule.operator.nb_inputs === 1) {
            comps[rule.id][0].scope.value = isArray(value)
              ? value.join(",")
              : value;
          } else {
            for (let i = 0; i < rule.operator.nb_inputs; i++) {
              comps[rule.id][i].scope.value = value[i];
            }
          }
        },
      };
    });

    builder.queryBuilder({
      filters: clone(filters),
      rules: this.value,
    });

    builder.queryBuilder("validate");

    this.registerRulesChanged();

    this.emitRules();

    this.init = true;
  },
  watch: {
    value(value) {
      if (!isNil(value) && value !== this.tempValue) {
        this.setRules(value);
      }
    },
  },
  beforeDestroy() {
    const { builder, comps } = this;

    if (builder) {
      for (const comp of Object.values(comps).flat()) {
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
    /**
     * https://github.com/mistic100/jQuery-QueryBuilder/issues/833
     */
    setRules(rules) {
      this.registerRulesChanged(() => {
        this.builder.queryBuilder("setRules", cloneDeep(rules));
      });
    },

    setFilters(filters) {
      this.builder.queryBuilder("reset");
      this.builder.queryBuilder("setFilters", filters);

      try {
        this.setRules(this.value);
      } catch (ex) {
        console.warn("Invalid rules found after setting rules.");

        this.setRules({
          condition: "AND",
          rules: [
            {
              empty: true,
            },
          ],
        });
      }
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
