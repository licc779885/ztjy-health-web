<template>
<div class="collect-dom">
	<div class="dom-lt dom-tem dom-first" @click="btnConfirmed()">体温待确认(<span class="cf5 ctnum">{{unConfirmedNum}}</span>)</div>
	<div class="dom-lt dom-tem" @click="noonCheck()">午检录入</div>
	<div class="dom-lt dom-ttm" @click="dailyPush()" v-if="isshow">健康日报推送家长</div>
</div>
</template>

<script>
import { toTemperatureRecord, checkTemperature, report, html } from 'dsbridge'
export default {
	name: 'Temdom',
	props: {
		unConfirmedNum: {
			type: [String, Number],
			default () {
				return 0
			}
		},
		userRank: {
			type: Array,
			default () {
				return []
			}
		},
		userType: {
			type: String,
			default () {
				return '1'
			}
		},
		schoolId: {
			type: String,
			default () {
				return ''
			}
		},
		date: {
			type: String,
			default () {
				return ''
			}
		},
		userSex: {
			type: String,
			default () {
				return 'male'
			}
		},
		teacherType: {
			type: [String, Number],
			default () {
				return '3'
			}
		},
		firstOrgid: {
			type: String,
			default () {
				return ''
			}
		},
		firstOrgName: {
			type: String,
			default () {
				return ''
			}
		}
	},
	data () {
		return {
			isshow: false
		}
	},
	watch: {

	},
	created () {
		// eslint-disable-next-line
		if ((this.userRank.indexOf(10) >= 0 || this.userRank.indexOf(15) >= 0) && this.userType == 1) {
			report(2, { event_id: 'health_diary_enter_show' })
			this.isshow = true
		}
	},
	methods: {
		btnConfirmed () {
			// 事件埋点
			report(2, { event_id: 'temp_confirm_click' })
			// 通知客户端跳转到签到体温检测确认页
			setTimeout(function () {
				checkTemperature()
			}, 500)
		},
		noonCheck () {
			// 时间埋点
			report(2, { event_id: 'noon_temp_entry_click' })
			let params = ''
			if (this.userType === '1') {
				params = '?schoolId=' + this.schoolId + '&userType=' + this.userType + '&date=' + this.date + '&userSex=' + this.userSex + '&timetype=1' + '&stateNum=2' + '&classId=' + this.firstOrgid
			} else if (this.userType === '2') {
				params = '?schoolId=' + this.schoolId + '&userType=' + this.userType + '&date=' + this.date + '&userSex=' + this.userSex + '&teacherType=' + this.teacherType + '&timetype=1' + '&stateNum=2' + '&departmentId=' + this.firstOrgid
			}
			setTimeout(() => {
				toTemperatureRecord({
					params: params,
					userType: this.userType,
					orgId: this.firstOrgid,
					orgName: this.firstOrgName,
					date: this.date,
					timetype: 1,
					stateNum: 2,
					hostUrl: window.domain + '/temperature/record'
				})
			}, 500)
		},
		dailyPush () {
			report(2, { event_id: 'health_diary_enter_click' })
			const params = `?schoolId=${this.schoolId}`
			if (process.env.NODE_ENV === 'local') {
				this.$router.push({ name: 'healthTimes', query: { schoolId: this.schoolId } })
			}
			setTimeout(() => {
				const url = window.domain + '/temperature/healthTimes' + params
				html({ url: url })
			}, 500)
		}
	}
}
</script>

<style lang="scss" scoped>
.collect-dom{
	background: #fff;
	height: 100px;
	display: flex;
	display: -webkit-flex;
	align-items: center;
	text-align: center;
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	z-index: 9;
	justify-content:space-between;
	border-top: 2px solid #eee;
	.dom-lt{
		height: 100%;
		font-size: 28px;
		display: flex;
		display: -webkit-flex;
		align-items: center;
		text-align: center;
		justify-content: center;
		position: relative;
		flex: 1;
		.ctnum{
			padding-top: 4px;
		}
	}
	.dom-tem{
		color: #00AAFF;
	}
	.dom-ttm{
		background: #00AAFF;
		color: #fff;
	}
	.dom-first::after{
		content: '';
		height: 50px;
		width: 2px;
		background: #eee;
		position: absolute;
		right: 0;
		top: 50%;
		margin-top: -25px;
	}
}
@media only screen and (max-width:340px) {
	.collect-dom .dom-lt .ctnum{
		padding-top: 0;
	}
}
</style>
