<template>
	<div class="temperature">
		<div class="tem-top">
		<Temcheck @getTimeTypeNum='changeType' :timeTypeNum="timeTypeNum"></Temcheck>
		<Temtime :date="date"></Temtime>
		</div>
		<div class="collect-title">
		<span class="title-name spn" v-if="userType==1">班级</span>
		<span class="title-name spn" v-if="userType==2">部门</span>
		<span class="title-normal spn">正常</span>
		<span class="title-hot spn">发热</span>
		<span class="title-not spn">未检测</span>
		</div>
		<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
			<template v-if="isshow">
				<Temcollect :listData="currentRecode" v-if="currentRecode.length > 0" :userType="userType" :schoolId="schoolId" :date="date" :userSex="userSex" :istodayTime="istodayTime"></Temcollect>
				<Temnone v-else :textnone="textnone"></Temnone>
			</template>
		</van-pull-refresh>
		<template v-if="istoday">
			<template v-if="userType==1">
				<Temdom :unConfirmedNum="unConfirmedNum" :userRank="userRank" v-if="currentRecode.length > 0" :firstOrgid="firstOrgid" :firstOrgName="firstOrgName" :schoolId="schoolId" :userType="userType" :date="date" :userSex="userSex" :teacherType="teacherType"></Temdom>
			</template>
			<template v-else>
				<Temdom :unConfirmedNum="unConfirmedNum" :userRank="userRank" :firstOrgid="firstOrgid" :firstOrgName="firstOrgName" :schoolId="schoolId" :userType="userType" :date="date" :userSex="userSex" :teacherType="teacherType"></Temdom>
			</template>
		</template>
    </div>
</template>

<script>
import '@/styles/temperature/style.css'
import { getAll, getUnconfirm } from '@/api/temper'
import { isToday } from '@/utils/index'
import Temcheck from './components/temcheck.vue'
import Temtime from './components/temtime.vue'
import Temdom from './components/temdom.vue'
import Temnone from './components/temnone.vue'
import Temcollect from './components/temcollect.vue'
let urlData = ''
let userType = ''
let date = ''
let timeTypeNum = ''
let userRank = []
/* eslint-disable no-useless-escape */
let istodayDate = ''
let istoday = ''
export default ({
	name: 'Collect',
	computed: {
		currentRecode () {
			return this.recodeList[this.timeTypeNum]
		},
		firstOrgid () {
			const firstId = this.recodeList[this.timeTypeNum][0]
			if (firstId && firstId !== '') {
				return firstId.orgId
			} else {
				return ''
			}
		},
		firstOrgName () {
			const firstId = this.recodeList[this.timeTypeNum][0]
			if (firstId && firstId !== '') {
				return firstId.orgName
			} else {
				return ''
			}
		},
		textnone () {
			if (this.recodeList[this.timeTypeNum].length === 0) {
				return '暂无班级'
			} else {
				return ''
			}
		},
		istodayTime () {
			return istoday
		}
	},
	watch: {

	},
	components: {
		Temcheck,
		Temtime,
		Temdom,
		Temnone,
		Temcollect
	},
	data () {
		urlData = this.$route.query
		userType = urlData.userType || '1'
		date = urlData.date
		timeTypeNum = parseInt(urlData.timetype) || 0
		userRank = []
		/* eslint-disable no-useless-escape */
		istodayDate = date.replace(/\-/g, '/')
		istoday = isToday(istodayDate)
		if (urlData.userRank && urlData.userRank !== '') {
			userRank = JSON.parse(urlData.userRank)
		}

		const userInfo = this.$store.state.user.userInfo
		const schoolId = userInfo.school_id
		const userSex = userInfo.userSex
		const teacherType = userInfo.user_type
		const userId = userInfo.uid
		return {
			timeTypeNum: timeTypeNum,
			userRank: [],
			listData: [],
			recodeList: [
				[],
				[],
				[]
			],
			unConfirmedNum: 0,
			userType: userType,
			date: date,
			schoolId,
			userSex,
			teacherType,
			userId,
			isshow: false,
			istoday: istoday,
			isLoading: false
		}
	},
	created () {
		this.getAllData()
		this.getUnconfirm()
		this.userRank = userRank
	},
	mounted () {

	},
	methods: {
		changeType (timeTypeNum) {
			this.timeTypeNum = timeTypeNum
		},
		getAllData () {
			this.loading({
				message: '加载中...'
			})
			const params = {
				schoolId: this.schoolId,
				date: date,
				userId: this.userId
			}
			getAll(params).then((res) => {
				this.recodeList = [
					[],
					[],
					[]
				]
				this.isshow = true
				this.listData = res.body.data
				this.listData.forEach(element => {
					/* eslint-disable-next-line eqeqeq */
					if (element.userType == userType) {
						/* eslint-disable-next-line eqeqeq */
						if (element.timeType == 1) {
							this.recodeList[0].push(element)
						/* eslint-disable-next-line */
						} else if (element.timeType == 2) {
							this.recodeList[1].push(element)
						} else {
							this.recodeList[2].push(element)
						}
					}
				})
				this.removeLoading()
				this.isLoading = false
			})
		},
		getUnconfirm () {
			const params = {
				schoolId: this.schoolId
			}
			getUnconfirm(params).then((res) => {
				const unConfirmedNum = res.body.unConfirmedNum
				if (unConfirmedNum > 0) {
					if (unConfirmedNum <= 99) {
						this.unConfirmedNum = unConfirmedNum
					} else {
						this.unConfirmedNum = '99+'
					}
				} else {
					this.unConfirmedNum = 0
				}
			})
		},
		onRefresh () {
			this.getAllData()
		}
	}
})
</script>

<style lang="scss" scoped>
.collect-title{
	height: 70px;
	line-height: 70px;
	background: #F2F3F5;
	font-size: 28px;
	color: #818D9D;
	overflow: hidden;
	text-align: center;
	padding-left: 30px;
	.spn{
		display: block;
		float: left;
	}
	.title-name{
		width: 30%;
	}
	.title-normal,.title-hot{
		width: 20%;
	}
	.title-not{
		width: 20%;
	}
	.van-icon{
		color: #BBBBBD;
		position: absolute;
		right: 30px;
		top: 50%;
		margin-top: -14px;
	}
}
</style>
