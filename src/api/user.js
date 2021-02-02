import request from '@/utils/request'

export function login (data) {
	return request({
		url: '/vue-admin-template/user/login',
		method: 'post',
		data
	})
}

export function getInfo (params) {
	return request({
		url: '/ds/user/info',
		method: 'get',
		params
	})
}

export function logout () {
	return request({
		url: '/vue-admin-template/user/logout',
		method: 'post'
	})
}
