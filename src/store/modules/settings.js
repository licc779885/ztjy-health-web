import defaultSettings from '@/settings'

const { requestApi } = defaultSettings

const state = {
	requestApi
}

const mutations = {
	CHANGE_SETTING: (state, { key, value }) => {
		// 新版本的ESLint使用了禁止直接调用 Object.prototypes 的内置属性开关
		if (Object.prototype.hasOwnProperty.call(state, key)) {
			state[key] = value
		}
	}
}

const actions = {
	changeSetting ({ commit }, data) {
		commit('CHANGE_SETTING', data)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
