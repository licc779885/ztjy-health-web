<template>
	<div class="temperature tem-record">
		<div class="tem-top">
			<Temcheck @getTimeTypeNum="changeType" :timeTypeNum="timeTypeNum"></Temcheck>
			<Temtime :date="date"></Temtime>
		</div>
		<Temstate @getStateNum="changeState" :stateNum="stateNum"></Temstate>
		<template v-if="isshow">
			<Temrecord @refreshData="refreshData" :schoolId="schoolIdNum" :stateNum="stateNum" :timeTypeNum="timeType" @parentEven="newparentEven" :recordList="currentRecode" :date="date" :userType="userType" :stateCurrent='stateCurrent' :dsmin='dsmin' :dsmax='dsmax' :zcmin="zcmin" :zcmax="zcmax" :istoday="istoday" v-if="currentRecode.length > 0"></Temrecord>
			<Temnone v-else :textnone="textnone"></Temnone>
		</template>
    </div>
</template>

<script>
import '@/styles/temperature/style.css'
import { getStudentRecord, getTeacherRecord, getTemperatureConfig } from '@/api/temper'
import { isToday } from '@/utils/index'
import Temcheck from './components/temcheck.vue'
import Temtime from './components/temtime.vue'
import Temstate from './components/temstate.vue'
import Temnone from './components/temnone.vue'
import Temrecord from './components/temrecord.vue'

let urlData = ''
let date = ''
let userType = ''
let timeTypeNum = ''
let stateNum = ''
// switchType=1从顶部选项卡切换
let switchType = ''
/* eslint-disable-next-line no-useless-escape */
let istodayDate = ''
let istoday = ''
// const userPic = ''
let userId = ''
// const parmType = ''
const boyImg = require('@/assets/common/defaultImg/boy@1x.png')
const girlImg = require('@/assets/common/defaultImg/girl@1x.png')
const teacherMan = require('@/assets/common/defaultImg/teacher_man@2x.png')
const teacherGirl = require('@/assets/common/defaultImg/teacher_girl@2x.png')
const professorMan = require('@/assets/common/defaultImg/professor@2x.png')
const professorWomen = require('@/assets/common/defaultImg/professor-women@2x.png')

export default ({
	name: 'Record',
	computed: {
		currentRecode () {
			return this.recodeList[this.timeTypeNum][this.stateNum]
		},
		textnone () {
			if (this.recodeList[this.timeTypeNum][this.stateNum].length === 0) {
				return '暂无名单'
			} else {
				return ''
			}
		},
		schoolIdNum () {
			return this.schoolId
		},
		timeType () {
			return this.timeTypeNum
		},
		istoday () {
			return istoday
		}
	},
	watch: {

	},
	components: {
		Temcheck,
		Temtime,
		Temstate,
		Temnone,
		Temrecord
	},
	data () {
		urlData = this.$route.query
		date = urlData.date || '2020-04-20'
		userType = parseInt(urlData.userType) || 1
		timeTypeNum = parseInt(urlData.timetype) || 0
		stateNum = parseInt(urlData.stateNum) || 0
		// switchType=1从顶部选项卡切换
		switchType = parseInt(urlData.switchType) || 0
		/* eslint-disable-next-line no-useless-escape */
		istodayDate = date.replace(/\-/g, '/')
		istoday = isToday(istodayDate)
		const userInfo = this.$store.state.user.userInfo
		const schoolId = userInfo.school_id
		const userSex = userInfo.userSex
		const teacherType = userInfo.user_type
		// 从顶部切换班级timeType stateType 需要被缓存 并且优先级最高
		timeTypeNum = switchType === 1 ? this.$store.state.temperature.timeType : timeTypeNum
		stateNum = switchType === 1 ? this.$store.state.temperature.stateType : stateNum

		return {
			date: date,
			userType: userType,
			timeTypeNum: timeTypeNum,
			stateNum: stateNum,
			stateCurrent: -1,
			configData: [],
			listData: [],
			zcmin: 35.0,
			zcmax: 37.0,
			dsmin: 37.0,
			dsmax: 38.5,
			schoolId,
			userSex,
			teacherType,
			isshow: false,
			recodeList: [
				[
					[],
					[],
					[]
				],
				[
					[],
					[],
					[]
				],
				[
					[],
					[],
					[]
				]
			]
		}
	},
	created () {
		// this.getTemperatureConfig()
		// if (userType === 1) {
		// 	userId = urlData.classId
		// 	/* eslint-disable-next-line eqeqeq */
		// 	if (typeof userId == 'object') {
		// 		if (userId[1] && userId[1] !== '') {
		// 			this.getStudentRecord(userId[1])
		// 		}
		// 	} else {
		// 		if (userId && userId !== '') {
		// 			this.getStudentRecord(userId)
		// 		}
		// 	}
		// } else if (userType === 2) {
		// 	userId = urlData.departmentId
		// 	/* eslint-disable-next-line eqeqeq */
		// 	if (typeof userId == 'object') {
		// 		if (userId[1] && userId[1] !== '') {
		// 			this.getTeacherRecord(userId[1])
		// 		}
		// 	} else {
		// 		if (userId && userId !== '') {
		// 			this.getTeacherRecord(userId)
		// 		}
		// 	}
		// }
		this.createdHandler()
	},
	mounted () {

	},
	methods: {
		createdHandler() {
			this.getTemperatureConfig()
			if (userType === 1) {
				userId = urlData.classId
				/* eslint-disable-next-line eqeqeq */
				if (typeof userId == 'object') {
					if (userId[1] && userId[1] !== '') {
						this.getStudentRecord(userId[1])
					}
				} else {
					if (userId && userId !== '') {
						this.getStudentRecord(userId)
					}
				}
			} else if (userType === 2) {
				userId = urlData.departmentId
				/* eslint-disable-next-line eqeqeq */
				if (typeof userId == 'object') {
					if (userId[1] && userId[1] !== '') {
						this.getTeacherRecord(userId[1])
					}
				} else {
					if (userId && userId !== '') {
						this.getTeacherRecord(userId)
					}
				}
			}


			this.recodeList = [
				[
					[],
					[],
					[]
				],
				[
					[],
					[],
					[]
				],
				[
					[],
					[],
					[]
				]
			]
		},
		refreshData() {
			this.createdHandler()
		},
		newparentEven () {
			this.isshow = false
			this.recodeList = [
				[
					[],
					[],
					[]
				],
				[
					[],
					[],
					[]
				],
				[
					[],
					[],
					[]
				]
			]
			if (userType === 1) {
				userId = urlData.classId
				/* eslint-disable-next-line eqeqeq */
				if (typeof userId == 'object') {
					if (userId[1] && userId[1] !== '') {
						this.getStudentRecord(userId[1])
					}
				} else {
					if (userId && userId !== '') {
						this.getStudentRecord(userId)
					}
				}
			} else if (userType === 2) {
				userId = urlData.departmentId
				/* eslint-disable-next-line eqeqeq */
				if (typeof userId == 'object') {
					if (userId[1] && userId[1] !== '') {
						this.getTeacherRecord(userId[1])
					}
				} else {
					if (userId && userId !== '') {
						this.getTeacherRecord(userId)
					}
				}
			}
		},
		changeType (timeTypeNum) {
			this.$store.dispatch('temperature/setTimeType', timeTypeNum)
			this.timeTypeNum = timeTypeNum
			this.stateNum = 0
			this.stateCurrent = -1
		},
		changeState (stateNum) {
			this.$store.dispatch('temperature/setStateType', stateNum)
			this.stateNum = stateNum
			this.stateCurrent = stateNum
		},
		getTemperatureConfig () {
			const params = {
				schoolId: this.schoolId
			}
			getTemperatureConfig(params).then((res) => {
				this.configData = res.body.data
				this.configData.forEach(element => {
					if (element.type === 2) {
						this.zcmin = Number(element.minTemperature)
						this.zcmax = Number(element.maxTemperature)
					}
					if (element.type === 3) {
						this.dsmin = Number(element.minTemperature)
						this.dsmax = Number(element.maxTemperature)
					}
				})
			})
		},
		getStudentRecord (data) {
			this.loading({
				message: '加载中...'
			})
			const params = {
				classId: data,
				date: date,
				schoolId: this.schoolId
			}
			getStudentRecord(params).then((res) => {
				this.isshow = true
				this.listData = res.body
				this.getTemperatureData(this.listData)
				this.removeLoading()
			})
		},
		getTeacherRecord (data) {
			this.loading({
				message: '加载中...'
			})
			const params = {
				departmentId: data,
				date: date,
				schoolId: this.schoolId
			}
			getTeacherRecord(params).then((res) => {
				this.isshow = true
				this.listData = res.body
				this.getTemperatureData(this.listData)
				this.removeLoading()
			})
		},
		getTemperatureData (dataArr) {
			dataArr.forEach(element => {
				if (element.teacherId) {
					element.userId = element.teacherId
				} else if (element.studentId) {
					element.userId = element.studentId
				}
				if (element.teacherName) {
					element.userName = element.teacherName
				} else if (element.studentName) {
					element.userName = element.studentName
				}
				if (element.teacherId) {
					if (element.userPic === null || element.userPic === '') {
						// 判断是园长
						/* eslint-disable-next-line eqeqeq */
						if (element.teacherType == 'leader') {
							if (element.userSex === 'male') {
								element.userPic = professorMan
							} else {
								element.userPic = professorWomen
							}
						} else {
							if (element.userSex === 'male') {
								element.userPic = teacherMan
							} else {
								element.userPic = teacherGirl
							}
						}
					}
				} else if (element.studentId) {
					if (element.userPic === null || element.userPic === '') {
						if (element.userSex === 'male') {
							element.userPic = boyImg
						} else {
							element.userPic = girlImg
						}
					}
				}
				if (element.timeType === 1) {
					if (element.measuringStatus === 2) {
						this.recodeList[0][0].push(element)
					} else if (element.measuringStatus === 3 || element.measuringStatus === 4) {
						this.recodeList[0][1].push(element)
					} else {
						this.recodeList[0][2].push(element)
					}
				} else if (element.timeType === 2) {
					if (element.measuringStatus === 2) {
						this.recodeList[1][0].push(element)
					} else if (element.measuringStatus === 3 || element.measuringStatus === 4) {
						this.recodeList[1][1].push(element)
					} else {
						this.recodeList[1][2].push(element)
					}
				} else if (element.timeType === 3) {
					if (element.measuringStatus === 2) {
						this.recodeList[2][0].push(element)
					} else if (element.measuringStatus === 3 || element.measuringStatus === 4) {
						this.recodeList[2][1].push(element)
					} else {
						this.recodeList[2][2].push(element)
					}
				}
			})
		}
	}
})
</script>

<style lang="scss" scoped>
.tem-record{
	.tem-none{
		top: 188px;
	}
}
</style>
