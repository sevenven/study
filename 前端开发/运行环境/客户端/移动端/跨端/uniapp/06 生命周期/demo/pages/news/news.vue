<template>
	<view>
		这是新闻页
	</view>
</template>

<script>
export default{
	onLoad( options ){
		console.log('这是新闻页的load' ,options )
	},
	onShow( options ){
		console.log( '这是新闻的show',options )
	}
}
</script>

<style>
</style>