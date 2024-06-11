<script setup>
import { ref, defineExpose } from "vue";

const a = ref(101);
const b = 201;

defineExpose({
  a,
  b,
});
</script>

<template>
  <p>Child3</p>
</template>
