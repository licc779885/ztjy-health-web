/* eslint-disable no-unused-vars */
import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title'
import { report } from 'dsbridge'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
	// 初始化
	if (to.query.debug) {
		const VConsole = require('@/libs/vconsole.min.js')
		const vConsole = new VConsole()
	}
	// start progress bar
	NProgress.start()
	// 上报日志
	if (to.meta.report) {
		const reportObj = to.meta.report
		// 多页面上报
		if (reportObj instanceof Array) {
			// 存在两个容器同时请求同一个页面的情况 需要判断url 上的参数上报不同的页面
			reportObj.forEach((item) => {
				const key = Object.keys(item.query)[0]
				const val = Object.values(item.query)[0]
				// eslint-disable-next-line eqeqeq
				if (to.query[key] == val) {
					report(1, { page_category: item.page_category, page: item.page, parm: item.parm })
				}
			})
		} else {
			// 页面埋点
			report(1, { page_category: reportObj.page_category, page: reportObj.page, parm: reportObj.parm })
		}
	}

	// set page title
	document.title = getPageTitle(to.meta.title)
	// // determine whether the user has logged in
	const hasToken = store.getters.token
	if (hasToken) {
		next()
		NProgress.done()
	} else {
		await store.dispatch('user/getInfo').then((data) => {
			next()
			NProgress.done()
		})
	}
})

router.afterEach((to, from, next) => {
	// finish progress bar
	NProgress.done()
})
