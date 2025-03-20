<template>
	<div class="main-app">
		<h1>主应用</h1>
		<div class="nav">
			<router-link to="/">首页</router-link> |
			<router-link to="/sub-app">子应用</router-link>
		</div>
		<div id="sub-app-container"></div>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped>
.main-app {
	text-align: center;
	margin-top: 20px;
}
.nav {
	margin: 20px 0;
}
.nav a {
	margin: 0 10px;
	color: #2c3e50;
	text-decoration: none;
}
.nav a.router-link-active {
	color: #42b983;
}
</style>
