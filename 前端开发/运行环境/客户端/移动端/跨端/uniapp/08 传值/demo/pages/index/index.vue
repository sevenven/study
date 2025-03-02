<template>
	<view class="content">
		<input type="text" v-model='key'>
		<button @click='goSearch'>搜索</button>
		<news :val='val'></news>
		<navigator url='/pages/list/list'>选择话题</navigator>
		{{ name }}
	</view>
</template>

<script>
	import news from '@/components/news.vue'
	export default {
		data() {
			return {
				key: '',
				val:'这是父组件的数据',
				name:''
			}
		},
		components:{
			news
		},
		onShow() {
			uni.$on('cName',( res )=>{
				this.name = res;
			})
		},
		methods: {
			goSearch(){
				uni.navigateTo({
					url:`/pages/search/search?key=${this.key}&id=111`
				})
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
