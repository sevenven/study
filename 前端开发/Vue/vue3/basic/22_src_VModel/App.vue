<template>
  <p>{{ name }} {{ age }}</p>
  <user-info v-model:name="name" v-model:age="age"></user-info>
</template>

<script>
import { reactive, toRefs } from "vue";
import UserInfo from "./components/UserInfo.vue";

export default {
  name: "App",
  components: { UserInfo },
  setup() {
    const state = reactive({
      name: "seven",
      age: "20",
    });

    return toRefs(state);
  },
};
</script>
