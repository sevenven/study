<template>
  <p>get instance</p>
</template>

<script>
import { onMounted, getCurrentInstance } from "vue";

export default {
  name: "GetInstance",
  data() {
    return {
      x: 1,
      y: 2,
    };
  },
  setup() {
    console.log("this in setup", this);

    const instance = getCurrentInstance();
    console.log("instance in setup", instance);

    onMounted(() => {
      console.log("this in setup onMounted", this);
      console.log("instance in setup onMounted", instance);
    });
  },
  mounted() {
    console.log("this in options mouted", this);
  },
};
</script>
