import request from '@/utils/request'
export function getSchoolYearList (data) {
	return request({
		url: '/api/album/getSchoolYearList',
		method: 'get',
		params: data
	})
}
export function getAlbumListByTeacher (data) {
	return request({
		url: '/api/album/getAlbumListByTeacher',
		method: 'post',
		data
	})
}
