<script>
import { Fragment } from "vue-fragment";
import $ from "jquery";

export default {
  name: "NxQueryFilterInput",
  props: ["context", "rule"],
  components: {
    Fragment,
    Vnodes: {
      functional: true,
      render(h, ctx) {
        const vnodes = ctx.props.vnodes;

        return vnodes;

        // return vnodes.length > 1 ? <fragment>{vnodes}</fragment> : vnodes;
      },
    },
  },
  data() {
    return {
      scope: {
        value: this.rule.value,
      },
    };
  },
  render(h) {
    const defaultSlot = this.context.$scopedSlots.default;

    // intentionally put here to trigger reaction
    this.context.$attrs && this.context.$listeners;

    if (defaultSlot) {
      const vnodes = defaultSlot(this.scope);

      return <Vnodes vnodes={vnodes}></Vnodes>;
    } else {
      throw new Error("Not support slot");
    }
  },
};
</script>
