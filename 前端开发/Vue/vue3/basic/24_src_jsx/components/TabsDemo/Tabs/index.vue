<template>
  <div>
    <!-- tabs 头，按钮 -->
    <button
      v-for="titleInfo in titles"
      :key="titleInfo.key"
      :style="{ color: titleInfo.key === actKey ? 'blue' : '#333' }"
      @click="changeActKey(titleInfo.key)"
    >
      {{ titleInfo.title }}
    </button>
  </div>

  <slot></slot>
</template>

<script>
import { ref } from "vue";

export default {
  name: "Tabs",
  props: ["defaultActiveKey"],
  emits: ["change"],
  setup(props, context) {
    const children = context.slots.default();
    const titles = children.map((panel) => {
      const { key, title } = panel.props || {};
      return {
        key,
        title,
      };
    });

    // 当前 actKey
    const actKey = ref(props.defaultActiveKey);
    function changeActKey(key) {
      actKey.value = key;
      context.emit("change", key);
    }

    return {
      titles,
      actKey,
      changeActKey,
    };
  },
};
</script>
