<template>
	<view>
		这是list页面
		<button @click='goHome'>返回上一页</button>
	</view>
</template>

<script>
export default{
	methods:{
		goHome(){
			uni.navigateBack();
		}
	}
}
</script>

<style>
</style>