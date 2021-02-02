import Vue from 'vue'
import Router from 'vue-router'

/* Layout */
// eslint-disable-next-line no-unused-vars
// import Layout from '@/layout'

Vue.use(Router)

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
	{
		path: '/home',
		component: (resolve) => require(['@/views/Home'], resolve)
	},
	{
		path: '/temperature',
		component: (resolve) => require(['@/layout/index'], resolve),
		redirect: { name: 'collect' },
		children: [
			{
				path: 'collect',
				name: 'collect',
				component: (resolve) => require(['@/views/Temperature/collect/Collect'], resolve),
				meta: { title: '体温汇总',	report: [{ page_category: '2', page: 'temp_group_list', parm: 'stu', query: { userType: 1 } }, { page_category: '2', page: 'temp_group_list', parm: 'tech', query: { userType: 2 } }] }
			},
			{
				path: 'healthTimes',
				name: 'healthTimes',
				component: (resolve) => require(['@/views/Temperature/HealthTimes/index.vue'], resolve),
				meta: { title: '健康日报推送', report: { page_category: '4', page: 'health_diary_push_page' } }
			},
			{
				path: 'classdaily',
				name: 'classdaily',
				component: (resolve) => require(['@/views/Temperature/collect/ClassDaily'], resolve),
				meta: { title: '班级健康日报', report: { page_category: '2', page: 'class_health_diary_page' } }
			},
			{
				path: 'record',
				name: 'record',
				component: (resolve) => require(['@/views/Temperature/collect/Record'], resolve),
				meta: { title: '体温记录', report: [{ page_category: '3', page: 'temp_record_list', parm: 'stu', query: { userType: 1 } }, { page_category: '3', page: 'temp_record_list', parm: 'tech', query: { userType: 2 } }] }
			},
			{
				path: 'connectHelp',
				name: 'connectHelp',
				component: (resolve) => require(['@/views/Temperature/Connect/Help'], resolve),
				meta: { title: '体温枪连手机使用说明', report: { page_category: '4', page: 'temp_gun_instruction' } }
			}
		]
	},
	{
		path: '/404',
		component: (resolve) => require(['@/views/404'], resolve),
		hidden: true
	},
	{ path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
	base: process.env.VUE_APP_BASE_URL,
	mode: 'history', // require service support
	scrollBehavior: () => ({ y: 0 }),
	routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
	const newRouter = createRouter()
	router.matcher = newRouter.matcher // reset router
}

export default router
