<script>
function add(a, b) {
  return a + b;
}
</script>

<script setup>
import { ref, reactive, toRefs, onMounted } from "vue";
import Child1 from "./Child1";
import Child2 from "./Child2";
import Child3 from "./Child3";

const countRef = ref(100);

function addCount() {
  countRef.value++;
}

const state = reactive({
  name: "seven",
});
const { name } = toRefs(state);

console.log(add(10, 20));

function onChange(info) {
  console.log("on change", info);
}
function onDelete(info) {
  console.log("on delete", info);
}

const child3Ref = ref(null);
onMounted(() => {
  // 拿到 Child3 组件的一些数据
  console.log(child3Ref.value);
  console.log(child3Ref.value.a);
  console.log(child3Ref.value.b);
});
</script>

<template>
  <p @click="addCount">{{ countRef }}</p>
  <p>{{ name }}</p>
  <Child1 />
  <hr />
  <Child2 :name="name" :age="countRef" @change="onChange" @delete="onDelete" />
  <hr />
  <Child3 ref="child3Ref" />
</template>
