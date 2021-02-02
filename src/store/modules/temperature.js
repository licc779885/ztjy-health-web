/*
  timeType:时间类型(0-晨检，1-午检，2-晚检)
  stateType:检测状态(0-正常，1-发热，2-未检测)
*/
const state = {
	timeType: 1,
	stateType: 2
}

const mutations = {
	SET_TIME_TYPE: (state, timeType) => {
		state.timeType = timeType
	},
	SET_STATE_TYPE: (state, stateType) => {
		state.stateType = stateType
	}
}

const actions = {
	setTimeType ({ commit }, timeType) {
		commit('SET_TIME_TYPE', timeType)
	},
	setStateType ({ commit }, timeType) {
		commit('SET_STATE_TYPE', timeType)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
