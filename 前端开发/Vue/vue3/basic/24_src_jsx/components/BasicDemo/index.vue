<template>
  <p @click="changeFlag">Demo {{ flagRef }}</p>
  <Child v-if="flagRef" :a="listStr" />
  <ul>
    <li v-for="item in list" :key="item">{{ item }}</li>
  </ul>
</template>

<script>
import { ref, reactive, toRefs, computed } from "vue";
import Child from "../BasicDemo/Child";

export default {
  name: "Demo",
  components: { Child },
  setup() {
    const flagRef = ref(true);

    function changeFlag() {
      flagRef.value = !flagRef.value;
    }

    const state = reactive({
      list: ["a", "b", "c"],
    });

    const listStr = computed(() => {
      return state.list.join("-");
    });

    return {
      flagRef,
      changeFlag,
      ...toRefs(state),
      listStr,
    };
  },
};
</script>
