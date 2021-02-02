import request from '@/utils/request'
// 获取班级列表
export function getClassList (data) {
	const valiator = {
		schoolId: {
			type: String,
			require: true
		}
	}
	return request({
		url: '/health/web/token/temperature/classHealthDaily/getClass/v1.0',
		method: 'post',
		valiator,
		data
	})
}
// 体温分组汇总
export function getAll (data) {
	const valiator = {
		schoolId: {
			type: String,
			require: true
		},
		date: {
			type: String,
			require: true
		},
		userId: {
			type: String,
			require: true
		}
	}
	return request({
		url: '/health/web/token/temperature/count/countForOrg/v1.0',
		method: 'post',
		valiator,
		data
	})
}
// 获取今日体温待确认数值
export function getUnconfirm (data) {
	const valiator = {
		schoolId: {
			type: String,
			require: true
		}
	}
	return request({
		url: '/health/web/token/temperature/count/countUnConfirmedForH5/v2.0',
		method: 'post',
		valiator,
		data
	})
}
// 获取学生体温记录
export function getStudentRecord (data) {
	const valiator = {
		schoolId: {
			type: String,
			require: true
		},
		classId: {
			type: String,
			require: true
		},
		date: {
			type: String,
			require: true
		}
	}
	return request({
		url: '/health/web/token/temperature/studentRecord/list/v1.0',
		method: 'post',
		valiator,
		data
	})
}

// 获取正常的学生体温记录
export function getNormalStudentRecord (data) {
	const valiator = {
		schoolId: {
			type: String,
			require: true
		},
		classId: {
			type: String,
			require: true
		},
		date: {
			type: String,
			require: true
		}
	}
	return request({
		url: '/health/web/token/temperature/classHealthDaily/getDetails/v1.0',
		method: 'post',
		valiator,
		data
	})
}

// 获取老师体温记录
export function getTeacherRecord (data) {
	const valiator = {
		schoolId: {
			type: String,
			require: true
		},
		departmentId: {
			type: String,
			require: true
		},
		date: {
			type: String,
			require: true
		}
	}
	return request({
		url: '/health/web/token/temperature/teacherRecord/list/v1.0',
		method: 'post',
		valiator,
		data
	})
}
// 体温提交
export function saveTemperature (data) {
	const valiator = {
		schoolId: {
			type: String,
			require: true
		},
		userType: {
			type: Number,
			require: true
		},
		userId: {
			type: String,
			require: true
		},
		temperature: {
			type: Number,
			require: true
		},
		date: {
			type: String,
			require: true
		},
		timeType: {
			type: Number,
			require: true
		}
	}
	return request({
		url: '/health/web/token/temperature/record/save/v1.0',
		method: 'post',
		valiator,
		data
	})
}
// 获取体温配置
export function getTemperatureConfig (data) {
	const valiator = {
		schoolId: {
			type: String,
			require: true
		}
	}
	return request({
		url: '/health/web/token/temperature/record/getConfig/v1.0',
		method: 'post',
		valiator,
		data
	})
}

// 获取体温配置
export function pushTemperatureClass (data) {
	const valiator = {
		schoolId: {
			type: String,
			require: true
		},
		classIds: {
			type: String,
			require: true
		}
	}
	return request({
		url: '/health/web/token/temperature/classHealthDaily/push/v1.0',
		method: 'post',
		valiator,
		data
	})
}

// 体温检测修改数据
export function updateTemperatureRecord (data) {
	const valiator = {
		userType: {
			type: Number,
			require: true
		},
		timeType: {
			type: Number,
			require: true
		},
		date: {
			type: String,
			require: false
		},
		studentId: {
			type: String,
			require: false
		},
		schoolId: {
			type: String,
			require: false
		},
		temperature: {
			type: String,
			require: true
		}
	}
	return request({
		url: '/health/web/token/temperature/record/update/v1.0',
		method: 'post',
		valiator,
		data
	})
}

// 体温检测删除数据
export function deleteTemperatureRecord (data) {
	const valiator = {
		userType: {
			type: Number,
			require: true
		},
		timeType: {
			type: Number,
			require: true
		},
		date: {
			type: String,
			require: false
		},
		studentId: {
			type: String,
			require: false
		},
		schoolId: {
			type: String,
			require: false
		},
		temperature: {
			type: String,
			require: true
		}
	}
	return request({
		url: '/health/web/token/temperature/record/delete/v1.0',
		method: 'post',
		valiator,
		data
	})
}
