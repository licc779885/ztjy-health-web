import Mock from 'mockjs'

const data = Mock.mock({
	'items|10': [{
		classidid: '@id',
		'gradename|+1': ['大班', '小班', '中班'],
		'classname|+1': ['班级1', '班级2', '班级3']
	}]
})
export default [
	{
		url: '/api/school/gradeClassList',
		type: 'get',
		response: config => {
			const items = data.items
			return {
				code: 200,
				data: items
			}
		}
	}
]
