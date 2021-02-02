import { login, logout } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { getUserInfo } from 'dsbridge'
const getDefaultState = () => {
	return {
		token: getToken(),
		name: '',
		avatar: '',
		userInfo: {}
	}
}

const state = getDefaultState()

const mutations = {
	RESET_STATE: (state) => {
		Object.assign(state, getDefaultState())
	},
	SET_TOKEN: (state, token) => {
		state.token = token
	},
	SET_NAME: (state, name) => {
		state.name = name
	},
	SET_AVATAR: (state, avatar) => {
		state.avatar = avatar
	},
	SET_USER_INFO: (state, info) => {
		state.userInfo = info
	}
}

const actions = {
	// user login
	login ({ commit }, userInfo) {
		const { username, password } = userInfo
		return new Promise((resolve, reject) => {
			login({ username: username.trim(), password: password }).then(response => {
				const { data } = response
				commit('SET_TOKEN', data.token)
				setToken(data.token)
				resolve()
			}).catch(error => {
				reject(error)
			})
		})
	},

	// get user info
	getInfo ({ commit, state }) {
		return new Promise((resolve, reject) => {
			getUserInfo().then((info) => {
				commit('SET_USER_INFO', info)
				commit('SET_TOKEN', info.userToken)
				resolve(info)
			})
		})
	},

	// user logout
	logout ({ commit, state }) {
		return new Promise((resolve, reject) => {
			logout(state.token).then(() => {
				removeToken() // must remove  token  first
				resetRouter()
				commit('RESET_STATE')
				resolve()
			}).catch(error => {
				reject(error)
			})
		})
	},

	// remove token
	setToken ({ commit }, token) {
		commit('SET_TOKEN', token)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
