<template>
  <div id="example2" class="container">
    <h1>Example 3</h1>

    {{ rules }}

    <nx-query-builder v-model="rules">
      <nx-query-filter
        id="values"
        label="Values"
        type="string"
        :defaultValue="['str1', 'str2']"
        :operators="['between', 'equal']"
      />
      <nx-query-filter
        id="custom-values"
        label="CustomValues"
        type="string"
        :defaultValue="['str1', 'str2']"
        :operators="['between', 'equal']"
        #default="scope"
      >
        test input:
        <input type="text" v-model="scope.value" @input="scope.update()" />
      </nx-query-filter>
      <nx-query-filter
        id="datetime"
        label="Datetimes"
        type="string"
        :defaultValue="['2020-11-01', '2020-11-02']"
        :operators="['between', 'equal']"
        #default="scope"
      >
        <b-form-datepicker
          v-model="scope.value"
          @input="scope.update()"
          menu-class="w-100"
          calendar-width="100%"
          style="min-width: 300px"
        ></b-form-datepicker>
      </nx-query-filter>
    </nx-query-builder>
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
      rules: {
        condition: "AND",
        rules: [
          {
            empty: true,
          },
        ],
      },
    };
  },
};
</script>

<style lang="scss"></style>
