<template>
	<view>
		<view class='main'>
			<view class='container'>111</view>
			<view class='container'>222</view>
		</view>
		<text selectable='true'>3333</text>
		{{ title }}
		{{ str }}
		{{ number }}
		<button @click='add'>按钮</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: 'Hello',
			str:'123',
			number:1
		}
	},
	methods: {
		add(){
			this.number++;
		}
	}
}
</script>

<style lang='scss'>
.main{
	display: flex;
	justify-content: space-around;
}
.container{
	width: 362rpx;
	height: 357rpx;
	background: #FFFFFF;
	border-radius: 6px 6px 6px 6px;
	opacity: 1;
	background-color: red;
}
</style>
