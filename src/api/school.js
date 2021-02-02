import request from '@/utils/request'
export function gradeClassList (data) {
	return request({
		url: '/api/school/gradeClassList',
		method: 'get',
		params: data
	})
}
