<template>
  <h2>我是Test组件</h2>
  <h2>当前点击时鼠标的坐标为：x：{{ x }}，y：{{ y }}</h2>
</template>

<script>
import usePoint from "../hooks/usePoint";
export default {
  name: "Test",
  setup() {
    const { x, y } = usePoint();
    return { x, y };
  },
};
</script>
