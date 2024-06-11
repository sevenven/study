import { defineComponent } from "vue";
import Child from "./Child/index.jsx";

export default defineComponent(() => {
  function render(msg) {
    return <p>msg: {msg} 123123</p>;
  }

  return () => (
    <>
      <p>Demo - JSX</p>
      <Child render={render}></Child>
    </>
  );
});
