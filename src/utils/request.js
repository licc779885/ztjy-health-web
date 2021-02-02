import axios from 'axios'
import store from '@/store'
import qs from 'qs'
import { Toast } from 'vant'
import { refreshToken, tokenOverdue } from 'dsbridge'
/**
 * 刷新token的锁
 * 当有请求正在刷新token的时候，其他请求等待
 */
let isRefreshing = false
/**
 * 当刷新token时，等待token返回的队列
 */
let waitingRequestArray = []

let tipText = ''
// eslint-disable-next-line no-unused-vars
const axiosInstance = null

const axiosMethod = options => {
	return new Promise((resolve, reject) => {
		// create an axios instance
		const instance = axios.create({
			baseURL: store.state.settings.requestApi, // url = base url + request url
			// withCredentials: true, // send cookies when cross-domain requests
			timeout: 60000, // request timeout
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			transformRequest: [
				function (data, headers) {
					if (headers['Content-Type'] === 'multipart/form-data') {
						return data
					} else {
						return qs.stringify(data)
					}
				}
			],
			// 携带凭证
			// withCredentials: true,
			// 返回数据类型
			responseType: 'json'
		})

		// request interceptor
		instance.interceptors.request.use(
			config => {
				return valiatorParam(config.url, config.params || config.data, config.valiator).then(() => {
					// do something before request is sent
					if (typeof config.data === 'string') {
						config.data = qs.parse(config.data)
						config.data = { ...config.data }
					}

					if (store.getters.token && !config.withoutToken) {
						// let each request carry token
						// ['X-Token'] is a custom headers key
						// please modify it according to the actual situation
						config.headers.Authorization = 'Bearer ' + store.getters.token
					}
					if (config.json) {
						config.headers['Content-Type'] = 'application/json'
					}
					// console.log(config)
					return config
				}).catch(() => {
					reject()
				})
			},
			error => {
				return Promise.reject(error)
			}
		)

		// response interceptor
		instance.interceptors.response.use(
			/**
       * If you want to get http information such as headers or status
       * Please return  response => response
       */

			/**
       * Determine the request status by custom code
       * Here is just an example
       * You can also judge the status by HTTP Status Code
       */
			response => {
				return new Promise((resolve, reject) => {
					// IE 9
					if (
						typeof response.data === 'undefined' &&
						response.config.responseType === 'json' &&
						response.request.responseText != null
					) {
						try {
							response.data = JSON.parse(response.request.responseText)
						} catch (e) { }
					}
					const res = response.data
					// alert(JSON.stringify(response))
					// 请求成功，但是有可能存在自定义错误，只有当返回状态码为100或200或返回的是Token的时候，才作为成功处理
					if (
						(typeof res !== 'undefined' && res.code === 10000) ||
						response.config.responseType === 'blob'
					) {
						resolve(res)
						// try {
						// 	resolve(res)
						// } catch (error) {
						// 	console.log(error)
						// 	alert(JSON.stringify(error))
						// }
					} else {
						const message = (res || {}).message || 'Error'
						tip(message)
						reject(res)
					}
				})
			},
			error => {
				return new Promise((resolve, reject) => {
					// 请求失败
					const { response } = error
					if (response) {
						errorHandler(response, error)
							.then(result => {
								resolve(result)
							})
							.catch(err => {
								reject(err)
							})
					} else {
						// 处理断网的情况
						// eg:请求超时或断网时，更新state的network状态
						// network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
						// 关于断网组件中的刷新重新获取数据，会在断网组件中说明
						// store.commit("changeNetwork", false);
						tip('网络异常')
						// axios.interceptors.response.eject(responseInterceptor)
						// axios.interceptors.request.eject(requestInterceptor)

						reject(error)
					}
				})
			}
		)

		// 请求处理
		instance(options)
			.then(res => {
				resolve(res)
			})
			.catch(error => {
				reject(error)
			})
	})
}

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
	tip('登录过期')
	tokenOverdue().then((data) => {

	})
}

/**
 * 提示函数
 * 禁止点击蒙层、显示2秒后关闭
 */
const tip = msg => {
	if (tipText !== msg) {
		tipText = msg
		Toast({
			message: msg,
			type: 'error',
			duration: 2 * 1000,
			className: ['van-noneText'],
			onClose: () => {
				tipText = ''
			}
		})
	}
}

/**
 * http请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandler = (response, error) => {
	const status = response.status
	let code = ''
	let data = ''
	if (response.data) {
		code = response.data.code
		data = error.response.data
	}
	return new Promise((resolve, reject) => {
		switch (status) {
		// 请求错误 可能是用户名校验失败
		case 400:
			if (data && data.message) {
				tip(data.message)
			} else {
				tip('请求无效')
			}
			reject(error)
			break
			// 请求错误 可能是用户名校验失败
		case 401:
		case 403:
			if (!isRefreshing) {
				isRefreshing = true
				if (code === 10004 || code === 10005) { // access token无效和过期,调用客户端refreshtoken拿token
					// tip(data.message)
					refreshToken()
						.then(obj => {
							if (obj) {
								store.commit('user/SET_TOKEN', obj.accessToken)
								// 修改flag
								isRefreshing = false
								// 释放等待队列中的请求
								popupAllWaitingArray()
							} else {
								toLogin()
							}
						})
						.catch(err => {
							popupAllWaitingArray(err)
							toLogin()
						})
				} else if (code === 10006) { // refresh token无效和过期,直接跳转到登陆
					toLogin()
				}
			}
			// 将当前的请求保存在观察者数组中
			addWaitingRequestArray(err => {
				/* 这边不需要baseURL是因为会重新请求url
					*url中已经包含baseURL的部分了
					*如果不修改成空字符串，会变成'api/api/xxxx'的情况 */
				if (err) {
					reject(err)
				} else {
					const config = error.config
					config.baseURL = ''
					axiosMethod(config).then(res => {
						resolve(res)
					}).catch(err => {
						reject(err)
					})
				}
			})
			break
			// 404请求不存在
		case 404:
			tip('请求的资源不存在')
			reject(error)
			break

		case 408:
			tip('请求超时')
			reject(error)
			break

		case 500:
			tip('服务器内部错误')
			reject(error)
			break

		case 501:
			tip('服务未实现')
			reject(error)
			break

		case 502:
			tip('服务器异常')
			reject(error)
			break

		case 503:
			tip('服务不可用')
			reject(error)
			break

		case 504:
			tip('网关超时')
			reject(error)
			break

		case 505:
			tip('HTTP版本不受支持')
			reject(error)
			break
		default:
			console.log('其他错误')
			reject(error)
		}
	})
}

const popupAllWaitingArray = err => {
	waitingRequestArray.forEach(waitingRequest => {
		waitingRequest(err)
	})
	waitingRequestArray = []
}

const addWaitingRequestArray = waitingRequest => {
	waitingRequestArray.push(waitingRequest)
}

/**
 *
 * @param {请求地址} url
 * @param {请求参数} param
 * @param {请求参数验证器} valiator
 */
const valiatorParam = (url, param, valiator) => {
	return new Promise((resolve, reject) => {
		let isEror = false
		// 判断传递的参数是否完整
		if (param && valiator) {
			for (const x in param) {
				// 判断参数是否存在验证器中
				if (Object.prototype.hasOwnProperty.call(valiator, x)) {
					// 判断参数类型是否正确
					// eslint-disable-next-line valid-typeof
					if (typeof param[x] === typeof valiator[x].type()) {
						// 判断是否是必填项
						if (valiator[x].require && param[x] === '') {
							console.error(`${url}参数${x}不能为空`)
							isEror = true
						} else {

						}
					} else {
						console.error(`${url}参数${x}类型错误，必须为${typeof valiator[x].type()}`)
						isEror = true
					}
				} else {
					console.error(`${url}验证器缺少${x}`)
					isEror = true
				}
			}
		} else {
			// 判断验证器是否存在必传参数
			if (param && !valiator) {
				for (const x in param) {
					console.error(`${url}参数${x}缺少验证`)
					isEror = true
				}
			}
			if (!param && valiator) {
				for (const x in valiator) {
					if (valiator[x].require) {
						console.error(`${url}参数${x}缺失`)
						isEror = true
					}
				}
			}
		}
		if (isEror) {
			resolve()
		} else {
			resolve()
		}
	})
}

export default axiosMethod
