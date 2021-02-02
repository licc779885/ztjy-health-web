import Mock from 'mockjs'

const data1 = Mock.mock({
	'items|10': [
		{
			'timeType|+1': [1, 2, 3],
			orgId: '@id',
			'orgName|+1': ['一年级大班', '一年级中班', '一年级小班'],
			userType: 1,
			date: '2020-02-28',
			normalNum: 1,
			feverNum: 1,
			unDetectedNum: 0
		}
	]
})
const data2 = Mock.mock({
	'items|20': [
		{
			'timeType|+1': [1, 2, 3],
			'signFlag|+1': [0, 1],
			'measuringStatus|+1': [2, 3, 4, ''],
			time: '08:25',
			'temperature|+1': [36, 37.5, 38.3, ''],
			userSex: 'male',
			userPic: '',
			'studentName|+1': ['名称1', '名称2', '名称3', '名称4'],
			studentId: '@id'
		}
	]
})

const teacher = Mock.mock({
	'items|20': [
		{
			'timeType|+1': [1, 2, 3],
			'signFlag|+1': [0, 1],
			'measuringStatus|+1': [2, 3, 4, ''],
			time: '08:25',
			'temperature|+1': [36, 37.5, 38.3, ''],
			userSex: 'male',
			userPic: '',
			'studentName|+1': ['名称1', '名称2', '名称3', '名称4'],
			teacherId: '@id',
			'teacherType|+1': ['teacher', 'leader']
		}
	]
})

const data3 = Mock.mock({
	items: {
		'temperatureList|20': [
			{
				'timeType|+1': [1, 2, 3],
				'signFlag|+1': [0, 1],
				'measuringStatus|+1': [1, 2, 3],
				time: '08:25',
				'temperature|+1': [36, 37.5, 38.3, ''],
				userSex: 'male',
				userPic: '',
				'studentName|+1': ['名称1', '名称2', '名称3', '名称4'],
				studentId: '@id'
			}
		],
		gradeName: '一年级',
		className: '大班'
	}
})

const data4 = Mock.mock({
	items: {
		classList: [
			{
				status: 3,
				className: '班级1',
				classId: '21213'
			},
			{
				status: 3,
				className: '班级2',
				classId: '21213'
			},
			{
				status: 3,
				className: '班级3',
				classId: '21213'
			},
			{
				status: 3,
				className: '班级4',
				classId: '21213'
			}
		]
	}
})

export default [
	{
		url: '/health/web/token/temperature/count/countForOrg/v1.0',
		type: 'post',
		response: () => {
			const data = {
				data: data1.items
			}
			return {
				code: 10000,
				body: data
			}
		}
	},
	{
		url: '/health/web/token/temperature/studentRecord/list/v1.0',
		type: 'post',
		response: () => {
			const data = data2.items
			return {
				code: 10000,
				body: data
			}
		}
	},
	{
		url: '/health/web/token/temperature/teacherRecord/list/v1.0',
		type: 'post',
		response: () => {
			const data = teacher.items
			return {
				code: 10000,
				body: data
			}
		}
	},
	{
		url: '/health/web/token/temperature/count/countUnConfirmedForH5/v2.0',
		type: 'post',
		response: () => {
			return {
				code: 10000,
				message: '成功',
				body: {
					unConfirmedNum: 111
				}
			}
		}
	},
	{
		url: '/health/web/token/temperature/record/getConfig/v1.0',
		type: 'post',
		response: () => {
			return {
				code: 10000,
				message: '成功',
				body: {
					data: [{
						type: 1,
						minTemperature: '36',
						maxTemperature: '100'
					}]
				}
			}
		}
	},
	{
		url: '/health/web/token/temperature/classHealthDaily/getDetails/v1.0',
		type: 'post',
		response: () => {
			const data = data3.items
			return {
				code: 10000,
				message: '成功',
				body: data
			}
		}
	},
	{
		url: '/health/web/token/temperature/classHealthDaily/getClass/v1.0',
		type: 'post',
		response: () => {
			const data = data4.items
			return {
				code: 10000,
				message: '成功',
				body: data
			}
		}
	},
	{
		url: '/health/web/token/temperature/classHealthDaily/push/v1.0',
		type: 'post',
		response: () => {
			const success = {
				code: 10000,
				message: '成功',
				body: {}
			}
			return success
		}
	},
	{
		url: '/health/web/token/temperature/record/save/v1.0',
		type: 'post',
		response: () => {
			return {
				code: 10000,
				message: '成功',
				body: {}
			}
		}
	}

]
