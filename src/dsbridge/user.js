import { bridge } from './dsbridge'
import { userInfo } from '@/api/dsbridge'
const namespace = bridge.call('getNameSpace') || ''

// 获取用户信息
export function getUserInfo (data) {
	return new Promise((resolve, reject) => {
		if (process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'pcdev') {
			resolve(userInfo)
		} else {
			bridge.call(namespace + '.getUserInfo', '', (data) => {
				const info = JSON.parse(data)
				resolve(info)
			})
		}
	})
}

// 刷新token
export function refreshToken (data) {
	return new Promise((resolve, reject) => {
		bridge.call(namespace + '.refreshToken', '', (data) => {
			const info = JSON.parse(data)
			resolve(info)
		})
	})
}

export function tokenOverdue (data) {
	return new Promise((resolve, reject) => {
		bridge.call(namespace + '.tokenOverdue', '', (data) => {
			const info = JSON.parse(data)
			resolve(info)
		})
	})
}
