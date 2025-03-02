import { defineComponent, ref, reactive, computed } from "vue";
import Child from "../BasicDemo/Child";

export default defineComponent(() => {
  const flagRef = ref(true);

  function changeFlag() {
    flagRef.value = !flagRef.value;
  }

  const state = reactive({
    list: ["a:jsx", "b:jsx", "c:jsx"],
  });

  const listStr = computed(() => {
    return state.list.join("-");
  });

  return () => (
    <>
      <p onClick={changeFlag}>DemoJSX {flagRef.value.toString()}</p>
      {flagRef.value && <Child a={listStr.value} />}
      <ul>
        {state.list.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    </>
  );
});

// 1. setup 函数
// 2. 组件的配置
