<template>
	<view class="content">
		<navigator url='/pages/list/list' open-type="switchTab">跳转到list</navigator>
		<button @click='goList'>跳转到列表页</button>
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			goList(){
				uni.navigateTo({
					url:'/pages/list/list'
				})
				// uni.redirectTo({
				// 	url:'/pages/list/list'
				// })
				// uni.switchTab({
				// 	url:'/pages/list/list'
				// })
				
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
