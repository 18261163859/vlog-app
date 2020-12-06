<template>
	<view>
		<uni-status-bar></uni-status-bar>
		<view>
			<view class="iconfont icon-guanbi flex align-center justify-center font-lg"
				style="width: 100rpx;height: 100rpx;"
				hover-class="bg-light"
				@click="back"
			></view>
		</view>
		
		<view class="text-center" style="padding-top: 130rpx;padding-bottom: 70rpx;font-size: 55rpx;">
			{{loginType?"账号密码登录":"手机验证码登录"}}
		</view>
		
		<template v-if="loginType">
			<view class="px-2">
				<view class="mb-2">
					<input type="text" v-model="phone" placeholder="请输入手机号"  class="border-bottom p-2"/>
				</view>
				<view class="mb-2 flex align-stretch">
					<input type="text" v-model="password" placeholder="请输入密码" class="border-bottom p-2 flex-1" />
					
					<view  class="border-bottom flex align-center justify-center font text-muted" style="width: 150rpx;">
						忘记密码？
					</view>
				</view>
			</view>
		</template>
		<template v-else>
			<view class="px-2">
				<view class="mb-2 flex ">
					<view class="border-bottom flex align-center justify-center font px-2">+86</view>
					<input type="text" v-model="phone" placeholder="手机号"  class="border-bottom p-2"/>
				</view>
				<view class="mb-2 flex align-stretch">
					<input type="text" v-model="code" placeholder="请输入验证码" class="border-bottom p-2 flex-1" />
					
					<view @click="getCode()" class=" flex align-center justify-center font bg-main text-white" style="width: 200rpx;">
						{{codeTime>0?codeTime+' s':'获取验证码'}}
					</view>
				</view>
			</view>
		</template>
		
		<view class="py-2 px-3">
			<button type="primary" 
			:class="disabled?'bg-main-disabled':'bg-main'" 
			class=" text-white" style="border-radius: 50rpx;border: 0;"
			@click="submit()" :loading="loading">{{loading?'登录中...':'登录'}}</button>
		</view>
		
		<view class="flex align-center justify-center pt-2 pb-4">
			<view class="text-primary font-sm" @click="changeLoginType()">{{loginType?'验证码登录':'账号密码登录'}}</view>
			<view class="text-muted mx-2">|</view>
			<view class="text-primary font-sm">登录遇到问题</view>
		</view>
		
		<view class="flex align-center justify-center">
			<view style="height: 1rpx;background-color: #dddddd;width: 100rpx;"></view>
			<view class="mx-2 text-muted">社交账号登录</view>
			<view style="height: 1rpx;background-color: #dddddd;width: 100rpx;"></view>
		</view>
		
	</view>
</template>

<script>
	import uniStatusBar from '@/components/uni-ui/uni-status-bar/uni-status-bar.vue'
	export default {
		components:{
			uniStatusBar
		},
		data() {
			return {
				loginType:true,
				password:"",
				phone:"",
				code:"",
				codeTime:0,
				loading:false
			}
		},
		computed:{
			disabled(){
				if((this.phone===''||this.password==='')&&(this.phone===''||this.code==='')){
					return true;
				}
				return false;
			}
		},
		methods: {
			back(){
				uni.navigateBack({
					delta:1
				});
			},
			changeLoginType(){
				this.loginType=!this.loginType;
			},
			//初始化表单
			initForm(){
				this.phone='';
				this.password='';
				this.code='';
			},
			//获取验证码
			getCode(){
				if(this.codeTime>0){
					return;
				}
				//验证手机号
				if(!this.validate())return;
				//请求数据
				this.$H.post('/user/sendcode?phone='+this.phone,{
					native:true
				})
				.then(res=>{
					//倒计时
					this.codeTime=60;
					let timer=setInterval(()=>{
						if(this.codeTime>=1){
							this.codeTime--;
						}else{
							this.codeTime=0;
							clearInterval(timer);
						}
					},1000)
				});
			},
			//表单验证
			validate(){
				var mPattern=/^1[345789]\d{9}$/;
				if(!mPattern.test(this.phone)){
					uni.showToast({
						title:'手机号格式不正确',
						icon:'none'
					})
					return false;
				}
				return true;
			},
			submit(){
				//表单验证
				let url='';
				let data='';
				if(!this.loginType){
					//手机验证码登录
					if(!this.validate())return;
					url='/user/phonelogin';
					data={
						phone:this.phone,
						code:this.code
					};
				}else{
					//账号密码登录
					url='/user/login';
					data={
						phone:this.phone,
						password:this.password
					}
				}
				
				//提交后端
				this.loading=true;
				this.$H.post(url,data).then(res=>{
					this.loading=false;
					console.log(res);
					//修改vuex的state，持久化存储
					this.$store.commit('login',res);
					//提示和跳转
					uni.showModal({
						title:'登录成功',
						content:'去看看',
						success:function(res){
							if(res.confirm){
								uni.switchTab({
									url:'../my/my'
								});
							}else if(res.cancel){
								console.log('用户点击取消');
								return;
							}
						}
					});
				}).catch(err=>{
					//登录失败
					this.loading=false
				})
			},
			
		}
	}
</script>

<style>

</style>
