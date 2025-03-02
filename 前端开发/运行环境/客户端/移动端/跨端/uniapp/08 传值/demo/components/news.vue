<template>
	<view>
		这是新闻页 ==> {{ val }}
	</view>
</template>

<script>
export default{
	props:{
		val:{
			type:String,
			default:''
		}
	}
}
</script>

<style>
</style>