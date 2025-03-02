<template>
	<view class="content" ref='content'>
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<button @click='goNewsPar'>跳转到新闻页并且传值</button>
		<button @click='$u.route("/pages/news/news")'>跳转到新闻页[可以返回首页]</button>
		<button @click='goNews'>跳转到新闻页[不可以返回]</button>
		<u-popup :show="show" @close="close" @open="open">
			<view>
				<text>出淤泥而不染，濯清涟而不妖</text>
				<button @click='$u.route("/pages/news/news")'>跳转到新闻页</button>
			</view>
		</u-popup>
		<u-button @click="show = true">打开</u-button>
		<list></list>
	</view>
</template>

<script>
import list from '@/components/list.vue'
export default {
	components:{
		list
	},
	data() {
		return {
			title: 'Hello',
			show: false
		}
	},
	onLoad() {
		console.log('load');
	},
	onShow(){
		console.log('show',this.$refs['content'] );
	},
	onReady(){
		console.log('onReady' ,this.$refs['content']);
	},
	onHide(){
		console.log('hide');
		this.show = false
	},
	onUnload(){
		console.log('Unload');
	},
	onResize(){
		console.log('resize');
	},
	methods: {
		goNews(){
			this.$u.route({
				type:'redirect',
				url:"/pages/news/news",
			})
		},
		open() {
		  // console.log('open');
		},
		close() {
		  this.show = false
		  // console.log('close');
		},
		goNewsPar(){
			uni.navigateTo({
				url:'/pages/news/news?id=111'
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
