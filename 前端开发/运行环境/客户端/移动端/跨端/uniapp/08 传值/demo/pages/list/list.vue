<template>
	<view>
		<view v-for='item in list' :key='item.id' @click='goHome(item.name)'>
			{{ item.name }}
		</view>
	</view>
</template>

<script>
export default{
	data () {
		return {
			list:[
				{id:1,name:'话题1'},
				{id:2,name:'话题2'},
				{id:3,name:'话题3'},
				{id:4,name:'话题4'}
			]
		}
	},
	methods:{
		goHome( name ){
			uni.$emit('cName',name);
			//返回上一页
			uni.navigateBack();
		}
	}
}
</script>

<style>
</style>