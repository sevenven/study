<template>
  <p>Vue3 JSX</p>
  <br />
  <hr />
  <Demo />
  <DemoJSX />
  <br />
  <hr />
  <TabsDemo />
  <br />
  <hr />
  <ScopedSlotDemo />
  <ScopedSlotDemoJSX />
</template>

<script>
import Demo from "./components/BasicDemo/index.vue";
import DemoJSX from "./components/BasicDemo/index.jsx";
import TabsDemo from "./components/TabsDemo/index.vue";
import ScopedSlotDemo from "./components/ScopeSlot/index.vue";
import ScopedSlotDemoJSX from "./components/ScopeSlot/index.jsx";

export default {
  name: "App",
  components: {
    Demo,
    DemoJSX,
    TabsDemo,
    ScopedSlotDemo,
    ScopedSlotDemo,
    ScopedSlotDemoJSX,
  },
};
</script>
