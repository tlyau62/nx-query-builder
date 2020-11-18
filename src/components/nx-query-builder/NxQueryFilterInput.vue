<script>
import $ from "jquery";

export default {
  name: "NxQueryFilterInput",
  props: ["context", "rule"],
  components: {
    Vnodes: {
      functional: true,
      render(h, ctx) {
        return <span>{ctx.props.vnodes}</span>;
      },
    },
  },
  data() {
    return {
      scope: {
        value: this.rule.value,
        update: this.update,
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
  watch: {
    "scope.value"(value) {
      this.update();
    },
  },
  methods: {
    update() {
      $(this.$el).trigger("change");
    },
  },
};
</script>
