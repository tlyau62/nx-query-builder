<template>
  <div id="app" class="container">
    <nx-query-builder :filters="filters" v-model="rules" :key="id" />

    <p>
      {{ rules }}
    </p>

    <button @click="setFilterB">Set Filter B</button>
    <button @click="setRulesB">Set Rule B</button>
    <button @click="incId">Inc id</button>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import NxQueryBuilder from "@/components/nx-query-builder/NxQueryBuilder";

export default {
  components: { NxQueryBuilder },
  data() {
    return {
      id: 0,
      query: {},
      filters: [
        {
          id: "name",
          label: "Name",
          type: "string",
        },
        {
          id: "category",
          label: "Category",
          type: "integer",
          input: "select",
          values: {
            1: "Books",
            2: "Movies",
            3: "Music",
            4: "Tools",
            5: "Goodies",
            6: "Clothes",
          },
          operators: [
            "equal",
            "not_equal",
            "in",
            "not_in",
            "is_null",
            "is_not_null",
          ],
        },
        {
          id: "in_stock",
          label: "In stock",
          type: "integer",
          input: "radio",
          values: {
            1: "Yes",
            0: "No",
          },
          operators: ["equal"],
        },
        {
          id: "price",
          label: "Price",
          type: "double",
          validation: {
            min: 0,
            step: 0.01,
          },
        },
        {
          id: "id",
          label: "Identifier",
          type: "string",
          placeholder: "____-____-____",
          operators: ["equal", "not_equal"],
          validation: {
            format: /^.{4}-.{4}-.{4}$/,
          },
        },
      ],
      rules: {
        condition: "AND",
        rules: [
          {
            id: "price",
            operator: "less",
            value: 10.25,
          },
          {
            condition: "OR",
            rules: [
              {
                id: "category",
                operator: "equal",
                value: 2,
              },
              {
                id: "category",
                operator: "equal",
                value: 1,
              },
              {
                id: "id",
                operator: "equal",
                value: "asd",
              },
            ],
          },
        ],
      },
    };
  },
  methods: {
    incId() {
      this.id++;
    },
    setFilterB() {
      this.filters = [
        {
          id: "name",
          label: "Name",
          type: "string",
        },
      ];
    },
    setRulesB() {
      this.rules = {
        condition: "AND",
        rules: [
          {
            condition: "OR",
            rules: [
              {
                id: "name",
                field: "name",
                type: "string",
                input: "text",
                operator: "equal",
                value: "asd",
              },
            ],
          },
        ],
        valid: true,
      };
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
