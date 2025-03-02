<script setup>
import { ref } from "vue";

// 可能会产生反射性XSS攻击 反射型XSS攻击在服务端不起作用
const name = ref(getQueryVariable("name") || "seven");
function getQueryVariable(variable) {
  const query = window.location.search.substring(1);
  const vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split("=");
    if (pair[0] == variable) {
      return decodeURI(pair[1]);
    }
  }
  return false;
}

// 假设数据从后端来 可能获取一段攻击脚本
const image = '<img src="1" onerror="alert(123)" />';
const _src = '1" onerror="alert(456)';
// data = "hello;"alert(1);
const data = getQueryVariable("data");
</script>

<template>
  <h1>web安全-客户端渲染</h1>
  {{ name }}
  HTML节点---不起作用 会作为字符串解析
  <div>
    {{ image }}
  </div>
  <!-- HTML属性---不起作用 会整体作为字符串解析 -->
  <img :src="_src" />
  <!-- 渲染富文本 -->
  <div v-html="image"></div>
</template>

<style scoped></style>
<!-- <script>
alert(123);
</script> -->
