<template>
  <div id="example1" class="container">
    <h1>Example 1</h1>

    <nx-query-builder v-model="rules" :key="id">
      <nx-query-filter id="name" label="Name" type="string" />
      <nx-query-filter id="pw" label="password" type="string" #default="scope">
        <input type="text" v-model="scope.value" />
        <button @click="appendA(scope)">Append A</button>
      </nx-query-filter>
      <nx-query-filter
        id="age"
        label="Age"
        type="string"
        value="ABC"
        #default="scope"
      >
        <button @click="appendB(scope)">Append B</button>
      </nx-query-filter>
      <nx-query-filter
        id="number"
        label="Number"
        type="integer"
        default-value="123"
        :operators="['in', 'between']"
        #default="scope"
      >
        <input type="number" v-model="scope.value" />
      </nx-query-filter>
      <nx-query-filter
        id="datetime"
        label="Date time"
        type="date"
        :operators="['in', 'between']"
        default-value="2020-11-01"
        #default="scope"
      >
        {{ scope.value }}
        <b-form-datepicker
          v-model="scope.value"
          menu-class="w-100"
          calendar-width="100%"
          style="min-width: 300px"
        ></b-form-datepicker>
      </nx-query-filter>
      <nx-query-filter
        id="silder"
        label="Silder"
        type="integer"
        #default="scope"
      >
        <span class="d-flex">
          <b-form-input type="range" v-model="scope.value" />
          <span class="ml-2">
            {{ scope.value }}
          </span>
        </span>
      </nx-query-filter>
    </nx-query-builder>

    <p>
      {{ rules }}
    </p>

    <button @click="setFilterB">Set Filter B</button>
    <button @click="setRulesB">Set Rule B</button>
    <button @click="id++">Inc id</button>
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
            empty: true,
          },
        ],
      },
    };
  },
  methods: {
    appendA(scope) {
      scope.value += "A";
    },
    appendB(scope) {
      scope.value += "B";
    },
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

<style lang="scss"></style>
