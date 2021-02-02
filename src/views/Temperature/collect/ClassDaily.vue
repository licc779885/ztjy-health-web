<template>
	<div class="temperature">
		<div class="tem-top">
			<Temcheck  @getTimeTypeNum="changeType" :timeTypeNum="timeTypeNum"></Temcheck>
			<span class="grade ellipsis">班级：{{gradeName}}-{{className}}</span>
		</div>
      <div class="tem-record" v-if="complete">
			<div v-if="currentRecode.length > 0">
				<ul>
					<li class="lt-record" v-for=" item in currentRecode" :key="item.studentId" :timeType="item.timeType" >
						<div class="lt-imt">
							<img :src="item.userSex=='male'?boyImg:girlImg" v-if="!item.userPic">
							<img :src="item.userPic" v-else>
							<div class="lt-name">{{item.studentName}}</div>
						</div>
						<div class="lt-tem c33">{{item.temperature}}℃</div>
						<div class="lt-time cbd">{{item.time}}</div>
						<div class="lt-state">
							<span class="normal">正常</span>
						</div>
					</li>
				</ul>
			</div>
			<Temnone :textnone="textnone" v-else ></Temnone>
		</div>
    </div>
</template>

<script>
import '@/styles/temperature/style.css'
import Temcheck from './components/temcheck.vue'
import Temnone from './components/temnone.vue'

import { getNormalStudentRecord } from '@/api/temper'
import { topbar } from 'dsbridge'
import { Dialog } from 'vant'
import { dataFormate } from '@/utils/index'
const boyImg = require('@/assets/common/defaultImg/boy@1x.png')
const girlImg = require('@/assets/common/defaultImg/girl@1x.png')
const rightIco2 = require('@/assets/healthTimes/icon_help@2x.png')
const rightIco3 = require('@/assets/healthTimes/icon_help@3x.png')
export default ({
	name: 'ClassDaily',
	computed: {
		currentRecode () {
			const timeType = this.timeTypeNum + 1
			const list = this.recordList.filter(element => {
				return element.timeType === timeType
			})
			return list
		}
	},
	watch: {

	},
	components: {
		Temcheck,
		Temnone
	},
	data () {
		const { schoolId, classId } = this.$route.query
		const date = this.$route.query.date || dataFormate('yyyy-MM-dd')
		return {
			schoolId,
			classId,
			recordList: [],
			timeTypeNum: 0,
			boyImg,
			girlImg,
			date,
			complete: false,
			textnone: '暂无名单',
			gradeName: '',
			className: ''
		}
	},
	created () {
		// 刷新顶部右上角按钮接口 点击出现回调出发弹窗
		topbar({
			right_icon: rightIco3,
			speed_right_icon: rightIco2,
			js: 'open'
		}, () => {
			this.openTip()
		})
		this.loading()
		this.getNormalStudentRecord().then(() => {
			this.complete = true
			this.removeLoading()
		})
	},
	mounted () {

	},
	methods: {
		/**
		* @description 根据班级获取学生体温记录
		*/
		getNormalStudentRecord () {
			this.loading()
			const params = {
				classId: this.classId,
				schoolId: this.schoolId,
				date: this.date
			}
			return getNormalStudentRecord(params).then((res) => {
				const { temperatureList, gradeName, className } = res.body
				this.recordList = temperatureList
				this.gradeName = gradeName
				this.className = className
			})
		},
		changeType (timeTypeNum) {
			this.timeTypeNum = timeTypeNum
		},
		/**
		* @return 返回今天日期 格式2020-04-30
		*/
		today () {
			const day = new Date()
			return day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate()
		},
		openTip () {
			Dialog.alert({
				title: '说明',
				className: 'openPopup',
				confirmButtonText: '知道了',
				message: '班级名单显示当日最新最全的测温学生，校园动态卡片的人数统计于推送当时，因此班级名单人数可能比动态卡片人数多。'
			}).then(() => {

			})
		}

	}
})
</script>

<style lang="scss" scoped>
	@import '@/styles/temperature/record.scss';

</style>
<style lang="scss">
.openPopup {
	&.van-dialog {
		border-radius:24px;
		.van-dialog__header {
			padding-top: 34px;
			font-size: 34px;
			color: #030303;
		}
		.van-dialog__message--has-title {
			padding: 26px 52px 40px;
		}
		.van-button{
			.van-button__text {
				font-size: 32px;
				color: #007AFF;
			}
		}
		.van-dialog__message {
			font-size: 28px;
			color: #818D9D;
			line-height: 40px;
		}
		[class*=van-hairline]::after {
			border-color:#4D4D4D;
		}
	}
}
.grade {
	margin-left:20px;
	flex:1;
	text-align:right;
}
</style>
