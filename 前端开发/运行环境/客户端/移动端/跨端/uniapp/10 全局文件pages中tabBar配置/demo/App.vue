<script>
	export default {
		onLaunch: function() {
			uni.onTabBarMidButtonTap(()=>{
				
				console.log('中间');
				
			})
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
