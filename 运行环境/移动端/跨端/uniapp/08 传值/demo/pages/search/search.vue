<template>
	<view>
		搜索页
		{{ keyName }}
	</view>
</template>

<script>
export default{
	data () {
		return {
			keyName:''
		}
	},
	onLoad( options ) {
		this.keyName = options.key;
	}
}
</script>

<style>
</style>