import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import $C from '@/common/config.js';
import $http from '@/common/request.js';
import $U from '@/common/util.js';

export default new Vuex.Store({
	state: {
		//登录
		loginStatus:false,
		token:false,
		user:{}
	},
	getters: {},
	mutations: {
		//登录成功后，用户数据存入本地存储
		login(state,user){
			state.loginStatus=true
			state.user=user
			state.token=state.user.token
			uni.setStorageSync('user',JSON.stringify(user));
		},
		//退出登录
		logout(state){
			state.loginStatus=false
			state.user={}
			state.token=false
			uni.removeStorageSync('user');
		}
	},
	actions: {

	}
})