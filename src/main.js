import 'lib-flexible'
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import '@/permission' // permission control
import Vant, { Toast } from 'vant'
import 'vant/lib/index.css'
import '@/styles/index.scss'
import '@/utils/AOP'
const VueTouch = require('vue-touch')

// 设定手势阈值
// VueTouch.config.swipe = {
// 	threshold: 200
// }
Vue.use(VueTouch, { name: 'v-touch' })
Vue.use(Vant)
Vue.prototype.loading = (option) => {
	if (!option) {
		option = {}
	}
	Toast.loading({
		message: option.message || '',
		duration: 0,
		forbidClick: true,
		loadingType: 'spinner'
	})
}
Vue.prototype.removeLoading = (option) => {
	Toast.clear()
}
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
let baseUrl = process.env.VUE_APP_BASE_URL
// 去除目录斜杠
baseUrl = baseUrl.replace(/(.*)\//, '$1')
window.domain = window.location.origin + baseUrl
if (process.env.NODE_ENV === 'local') {
	const { mockXHR } = require('../mock')
	mockXHR()
}
// eslint-disable-next-line
if (process.env.VUE_APP_DEBUG == 1) {
	const VConsole = require('@/libs/vconsole.min.js')
	// eslint-disable-next-line
	const vConsole = new VConsole()
}

Vue.config.productionTip = false
// eslint-disable-next-line no-new
new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
})
