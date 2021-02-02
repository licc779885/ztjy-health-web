import Mock from 'mockjs'

const data = Mock.mock({
	'items|3': [{
		id: '@id',
		'startTime|+1': ['2018', '2019', '2020'],
		'endTime|+1': ['2018', '2019', '2020']
	}]
})

const albumList = Mock.mock({
	'items|10': [{
		classAlbumName: '清风模板s1',
		codeUrl: '',
		completedAlbumNum: 0,
		gradeName: '中班',
		gradeId: '2dc37642144cd88444a1',
		codeFlag: 0,
		className: '中班-中3班',
		cover: 'http://alpha-album.ztjytest.cn/12700010120200319171730547YNLg1E4t.jpg',
		classId: '4ea0489296be6f2f2d93',
		albumType: 3,
		term: 2,
		id: '712139d1a6414a0db69eb5a320386ab1',
		structVerison: 2,
		totalAlbumNum: 141
	}]
})
export default [
	{
		url: '/api/album/getSchoolYearList',
		type: 'get',
		response: config => {
			const items = data.items
			return {
				code: 200,
				data: items
			}
		}
	},
	{
		url: '/api/album/getAlbumListByTeacher',
		type: 'post',
		response: config => {
			const items = albumList.items
			return {
				code: 200,
				data: items
			}
		}
	}
]
