import Vue from 'vue'
import Vuex from 'vuex'
import {
	setLocalStorage
} from '@/common/local-storage.js';

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		Authorization: '',
		userInfo: {},
	},
	mutations: {
		// state 为 方法返回值
		// provider 为 方法传入参数
		login(state, provider) {
			uni.request({
				url: 'https://www.xinghuohan.cn/xhh-wx-api/wx/auth/login',
				method: 'POST',
				data: {
					username: provider.username,
					password: provider.password
				},
				success: res => {
					if (res.data.errno === 0) {
						// this.userInfo = res.data.data.userInfo;
						// 登陆成功后将用户信息写入localStorage

						// setLocalStorage({
						// 	Authorization: res.data.data.token,
						// 	avatar: res.data.data.userInfo.avatarUrl,
						// 	nickName: res.data.data.userInfo.nickName
						// });

						state.hasLogin = true;
						state.Authorization = res.data.data.token;
						state.userInfo = res.data.data.userInfo;
						uni.setStorage({ //缓存用户登陆状态
							key: 'userInfo',
							data: res.data.data.userInfo
						})

						uni.switchTab({
							url: '/pages/user/user'
						})
					} else {
						this.$api.msg(res.data.errmsg);
						this.logining = false;
					}
				},
				fail: () => {},
				complete: () => {}
			});

		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({
				key: 'userInfo'
			})
		}
	},
	actions: {

	}
})

export default store
