import { defineComponent, ref } from "vue";

export default defineComponent({
  props: ["render"],
  setup(props) {
    const msgRef = ref("作用域插槽 Child - JSX");

    return () => {
      return <p>{props.render(msgRef.value)}</p>;
    };
  },
});
