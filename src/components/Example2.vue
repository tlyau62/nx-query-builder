<template>
  <div id="example2" class="container">
    <h1>Example 2</h1>

    <nx-query-builder v-model="rules">
      <template v-for="filter in filters">
        <nx-query-filter
          :key="filter.id"
          :id="filter.id"
          :label="filter.label"
          :type="filter.type"
          :operators="['equal', 'in', 'between']"
        />
      </template>
    </nx-query-builder>

    <div>
      {{ rules }}
    </div>

    <div>
      <button @click="addFilter">Add filter</button>
      <button @click="dropFilter">Drop filter</button>
    </div>
  </div>
</template>

<script>
import NxQueryBuilder from "@/components/nx-query-builder/NxQueryBuilder";
import NxQueryFilter from "@/components/nx-query-builder/NxQueryFilter";
import $ from "jquery";

export default {
  components: { NxQueryBuilder, NxQueryFilter },
  data() {
    return {
      filters: [
        {
          id: "root.name",
          label: "name",
          type: "string",
        },
        {
          id: "root.lastModificationDate",
          label: "last modification date",
          type: "string",
        },
        {
          id: "jmeter_7c6fw.intval",
          label: "jmeter_7c6fw: Int val",
          type: "integer",
        },
        {
          id: "jmeter_7c6fw.strval",
          label: "jmeter_7c6fw: String val",
          type: "string",
        },
      ],
      rules: {
        condition: "AND",
        rules: [
          {
            id: "root.name",
            operator: "equal",
            value: "name",
          },
        ],
      },
    };
  },
  methods: {
    addFilter() {
      this.filters.push({
        id: "root.creator",
        label: "creator",
        type: "integer",
      });
    },
    dropFilter() {
      this.filters.pop();
    },
  },
};
</script>

<style lang="scss"></style>
