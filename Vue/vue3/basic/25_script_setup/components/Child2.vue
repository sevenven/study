<script setup>
import { defineProps, defineEmits } from "vue";

// 定义属性
const props = defineProps({
  name: String,
  age: Number,
});

// 定义事件
const emit = defineEmits(["change", "delete"]);
function deleteHandler() {
  emit("delete", "aaa");
}
</script>

<template>
  <p>Child2 - name: {{ props.name }}, age: {{ props.age }}</p>
  <button @click="$emit('change', 'bbb')">change</button>
  <button @click="deleteHandler">delete</button>
</template>
