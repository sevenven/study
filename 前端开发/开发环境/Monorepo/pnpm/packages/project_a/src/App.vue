<template>
	<div id="app">
		<img alt="Vue logo" src="./assets/logo.png" />
		<HelloWorld msg="Welcome to Your Vue.js App" />
		<button @click="getUser">getUser</button>
	</div>
</template>

<script>
import { HelloWorld } from '@chexiao/component_a';
import { getUser } from '@chexiao/utils';

export default {
	name: 'App',
	components: {
		HelloWorld
	},
	methods: {
		getUser
	}
};
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
