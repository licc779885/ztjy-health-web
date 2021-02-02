import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import temperature from './modules/temperature'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
	// 需要持久化的
	plugins: [
		createPersistedState({
			reducer (val) {
				return {
					temperature: {
						timeType: val.temperature.timeType,
						stateType: val.temperature.stateType
					}

				}
			}
		})
	],
	modules: {
		app,
		settings,
		user,
		temperature
	},
	getters
})

export default store
