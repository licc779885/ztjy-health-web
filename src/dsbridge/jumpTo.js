import { bridge } from './dsbridge'
const namespace = bridge.call('getNameSpace') || ''
// 跳转到体温记录
export function toTemperatureRecord (data) {
	return new Promise((resolve, reject) => {
		bridge.call(namespace + '.jumpTo', JSON.stringify({
			action: 'toTemperatureRecord',
			data: {
				url: window.domain + '/temperature/record' + encodeURI(data.params),
				userType: data.userType,
				orgId: data.orgId,
				orgName: data.orgName,
				date: data.date,
				timetype: data.timetype,
				stateNum: data.stateNum,
				hostUrl: data.hostUrl
			}
		}), function () {
			resolve()
		})
	})
}

// 跳转h5接口
export function html (data) {
	return new Promise((resolve, reject) => {
		bridge.call(
			namespace + '.jumpTo',
			JSON.stringify({
				action: 'html',
				data: {
					url: data.url,
					title: data.title || '',
					needResult: data.needResult || false,
					pageType: data.pageType || ''
				}
			}),
			function () {
				resolve()
			}
		)
	})
}

// 跳转到签到体温检测确认
export function checkTemperature () {
	return new Promise((resolve, reject) => {
		bridge.call(namespace + '.jumpTo', JSON.stringify({
			action: 'checkTemperature'
		}), function () {
			resolve()
		})
	})
}

// 设置页面自动关闭
export function autoFinish () {
	return new Promise((resolve, reject) => {
		bridge.call(
			namespace + '.jumpTo',
			JSON.stringify({
				action: 'autoFinish'
			}),
			function () {
				resolve()
			}
		)
	})
}

// 刷新顶部左上角按钮接口 6.8.1添加
export function topBack (data) {
	return new Promise((resolve, reject) => {
		bridge.call(
			namespace + '.jumpTo',
			JSON.stringify({
				action: 'topBack',
				data: {
				// 左上角文案
					leftIcon: data.leftIcon,
					clickAction: namespace + '.' + data.clickAction,
					js: namespace + '.' + data.js
				}
			}),
			function () {
				resolve()
			}
		)
	})
}

//  关闭当前界面
export function finish () {
	return new Promise((resolve, reject) => {
		bridge.call(
			namespace + '.jumpTo',
			JSON.stringify({
				action: 'finish'
			}),
			function () {
				resolve()
			}
		)
	})
}

//  刷新顶部右上角按钮接口
export function topbar (data, callback) {
	return new Promise((resolve, reject) => {
		bridge.call(
			namespace + '.jumpTo',
			JSON.stringify({
				action: 'topbar',
				data: {
					right_txt: data.rightTxt || '',
					right_icon: data.right_icon || '',
					speed_right_icon: data.speed_right_icon || '',
					clickAction: data.clickAction || 'js',
					js: namespace + '.' + data.js
				}
			}),
			function () {
				resolve()
			}
		)
		if (data.js) {
			bridge.register(namespace + '.' + data.js, () => {
				if (callback) {
					callback()
				}
			})
		}
	})
}
