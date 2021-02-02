
const users = {

	uid: 'e62a227a249c4a45e2a4',

	baby_uid: '85e74843bab4ba7d737f',

	ssid: '873FF8EAFFA44F0489456D8E7952333D',

	token: 'Avx8G7r29thbUVUfp', // 旧的社区token,php接口重构时,已经固定传空字符串.

	userToken: '', // 用户token

	student_uid: '1a3411a91d9a6dc8059c',

	class_uid: '1a3411a91d9a6dc8059c2',

	school_id: 'vE7Z48ptN75viDCtAKX',

	user_type: '1', // 园丁端：2-园长，3-老师, 家长端：1-管理员 2-亲友，3-创建者

	nickname: '', // 家长姓名

	avatar: '', // 家长头像

	schoolName: '', // 老师幼儿园

	familyRelation: 'DAD', //
	isgraduated: '1', // 0:没毕业 1：已毕业

	schoolType: '', // 幼儿园类型     校园类型： 1-报备园 2-正式园 3-演示园

	schoolRecruitStatus: 1, // 当前学校是否开通招生宝 vip服务  1是vip 0不是vip

	schoolVipLevel: 1, // #会员类型: 0非会员 1是高级会员 2试用会员  3过期会员 6.12.1添加 园丁端

	phoneNumber: '', // 手机号

	className: '', // 班级名称 家长端使用

	industryType: '', // 校园行业类型
	moduleType: '', // 北分业务定义
	isAdministrators: true, // 是否是家庭组管理员
	allBabyId: ['001', '002'], // 当前用户所有宝宝的idDS
	babyTrueName: '', // 当前宝宝真实姓名

	babyNickName: '', // 当前宝宝昵称

	babyAge: '2-10-20', // 当前宝宝年龄  6.19.1 添加  2-1-20 代表2岁1个月20天 字符串类型  2-10-20 代表2岁10个月20天    0-0-2  (2天)  1-0-2 （1岁零2天）

	isTrillMode: true, // true 说明开启了抖音模式，此时印记详情页不要自动播放背景音乐；false 未开启抖音模式，印记详情页无需做处理

	userSex: '', // male男 female女

	jobName: '', // 职称

	isAudit: 'NO', // 是否是Appstore审核

	memberInfo: {

		memberName: '会员名称',

		memberLevel: 0, // 会员等级 0：非会员， 50: 白银会员， 100： 黄金会员， 200 黑金会员

		effectiveEndTime: 1576675372, // 会员有效期截止时间 毫秒

		memberStatus: 0 // 会员状态： 0未激活 1 已激活 2已过期

	},

	st: {

		ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15F79',

		density: 2,

		mac: '',

		channel: '3',

		idfa: '00000000-0000-0000-0000-000000000000',

		screen: '750x1334',

		sp: '46000',

		reqcodeversion: '0.0',

		zipcode: '110108',
		cmtReplyHandler: '',

		openudid: 'c1291ac7de24d21e4e67e2b0b1c12f3d1f53cd60',

		platform: '2',

		location: '116.305671,39.977643',

		vendor: 'Apple',

		os_ver: '11.4',

		app_ver: '6.1.0.1072403',

		device_id: 'c1291ac7de24d21e4e67e2b0b1c12f3d1f53cd60',

		network: 'Wifi', // "phone_model" : "iPhone",

		appType: 1 // 是掌通家园家长端 ， 11是掌通家园极速版，12 是掌通家长宝

	}

}

export default [
	// get user info
	{
		url: '/ds/user/info',
		type: 'get',
		response: config => {
			return {
				code: 10000,
				message: '成功',
				data: users
			}
		}
	}
]
