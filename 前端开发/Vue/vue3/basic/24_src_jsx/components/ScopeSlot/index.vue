<template>
  <child>
    <!-- <p>scoped slot</p> -->
    <template v-slot:default="slotProps">
      <p>msg: {{ slotProps.msg }} 123123</p>
    </template>
  </child>
</template>

<script>
import Child from "./Child/index.vue";

export default {
  components: { Child },
};
</script>
