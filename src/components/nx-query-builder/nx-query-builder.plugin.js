import NxQueryBuilder from "@/components/nx-query-builder/NxQueryBuilder";
import NxQueryFilter from "@/components/nx-query-builder/NxQueryFilter";

const DatatablePlugin = {
  install(Vue) {
    Vue.component("nx-query-builder", NxQueryBuilder);
    Vue.component("nx-query-filter", NxQueryFilter);
  },
};

export default DatatablePlugin;
