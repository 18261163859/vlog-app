<template>
	
	<view>
		
		<!-- #ifdef MP -->
		<uni-nav-bar :shadow="false" :border="false" @click-left="clickLeft" @click-right="clickRight">
			<!-- 左边图标 -->
			<block slot="left">
				<view class="iconfont icon-qiandao ml-2 mr-2" style="font-size: 22px;color: #FF9619;"></view>
			</block>
			<!-- 中间搜索框 -->
			<view
				class="flex justify-center align-center rounded text-muted bg-light flex-1 mt-1"
				style="margin-left: -46upx;height: 60upx;"
				@tap="openSearch"
			>
				<view class="iconfont icon-sousuo mr-1"></view>
				搜索帖子
			</view>
			
			<!-- 右边图标 -->
			<block slot="right">
				<view class="icon iconfont icon-bianji1 text-dark" style="font-size: 22px;"></view>
			</block>
			
		</uni-nav-bar>
		
		<!-- #endif -->
		<view class="content">
			<!-- text>{{cards}}</text> -->
			<view class="item" v-for="(card,index) in cards" :key="index">
				<text>{{card.title}}</text>
				<image :src="card.bgImg" ></image>
				<text>{{card.content}}</text>
			</view>
		</view>
		
		
	</view>

</template>

<script>
	import uniNavBar from '@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue';
	
	export default {
		components:{
				uniNavBar
		},
		data() {
			return {
				title: 'Hello',
				cards:[]
			}
		},
		onLoad() {
			this.getData();
		},
		methods: {
			getData(){
				this.$H.get('/cards').then(res=>{
					console.log(res);
					this.cards=res;
				});
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
	
		
	.item{
		display: flex;
		flex-direction: column;
		background-color: pink;
		margin-bottom: 30rpx;
		padding-left: 25rpx;
		padding-right: 25rpx;
		border-radius: 5%;
	}
	
	.item image{
		width: 700rpx;
	}
	
	

</style>
