import { bridge } from './dsbridge'
const namespace = bridge.call('getNameSpace') || ''

/**
 * 呼叫原生展示体温检测界面，获取体温
 * @param 头像信息
 */
export function callNativeShowTemperatureView (data) {
	return new Promise((resolve, reject) => {
		bridge.call(namespace + '.callNativeShowTemperatureView', JSON.stringify({
			avatar: data.avatar,
			userId: data.userId,
			name: data.name,
			userSex: data.userSex,
			role: data.role
		}), () => {
			resolve()
		})
	})
}

/**
 * 呼叫H5保存体温
 * @param
 *  userId:用户id
 *  temperature:温度
 * @returns
 *  returnCode:10000
 *  returnString:'保存成功'
 */
export function callJsSaveBabyTemperature () {
	return new Promise((resolve, reject) => {
		bridge.register(namespace + '.callJsSaveBabyTemperature', async (res) => {
			resolve(res)
		})
	})
}

/**
 * 呼叫h5解释体温状态
 * func 过滤数据
 * @param
 * 	"temperature":"36.5"
 * @returns
 * 	"stateString":"正常", //正常、异常、低烧
	"stateStringHexColor":"#333333",
	"warnString":"体温过低,请再测一次",
	"warnStringHexColor":"#818D9D",
 */
export function callJsParserTemperatureState (func) {
	return new Promise((resolve, reject) => {
		bridge.register(namespace + '.callJsParserTemperatureState', (res) => {
			const { temperature } = JSON.parse(res)
			const data = func(parseFloat(temperature))
			return {
				code: 10000,
				message: '成功',
				body: data
			}
			// responCallback(JSON.stringify(data))
		})
	})
}

/**
 * 调用原生 传达保存信息
 * @param {Object} data
 */
export function callNativeSaveBabyTemperatureResult (data) {
	return new Promise((resolve, reject) => {
		bridge.call(namespace + '.callNativeSaveBabyTemperatureResult', JSON.stringify({
			code: data.code,
			message: data.message,
			body: data.body
		}), () => {
			resolve()
		})
	})
}
