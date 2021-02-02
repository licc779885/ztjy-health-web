<template>
	<div class="tem-record tem-record-wrap">
		<div v-if="recordList.length > 0">
			<ul>
				<li class="lt-record" v-for="(item,index) in recordList" :key="item.userId" :timeType="item.timeType" @click.stop="recordItemHandler(item)">
					<div class="lt-imt" @click="showPopup(item)">
						<img :src="item.userPic">
						<div class="lt-name">{{item.userName}}</div>
					</div>
					<template v-if="item.measuringStatus!='' && item.measuringStatus">
						<div class="lt-tem c33">{{item.temperature}}℃</div>
						<div class="lt-time cbd">{{item.time}}</div>
						<div class="lt-state">
							<span class="normal" v-if="item.measuringStatus==2">正常</span>
							<span class="cf9" v-else-if="item.measuringStatus==3">低烧</span>
							<span class="cf5" v-else-if="item.measuringStatus==4">高烧</span>
						</div>
					</template>
					<template v-else>
						<div class="lt-state">
							<template v-if="current !== index">
								<span class="end" v-if="item.signFlag==1">已签到</span>
							</template>
							<template v-else>
								<span v-if="nowValue < zcmin" class="c36">异常</span>
								<span v-else-if="nowValue>=zcmin && nowValue <= zcmax" class="normal">正常</span>
								<span v-else-if="nowValue >= dsmin && nowValue <= dsmax" class="cf9">低烧</span>
								<span v-else-if="nowValue > dsmax" class="cf5">高烧</span>
							</template>
						</div>
						<div class="lt-entry" v-if="istoday">
							<div class="entry-btn c0a" v-if="current !== index" @click="goEntry(index)">录入体温</div>
							<div class="entry-content" v-else>
								<div class="entry-step"><van-stepper v-model="value" step="0.1" :decimal-length="1" min="35.0" max="42.0" disable-input /></div>
								<div class="entry-sum"><van-button round type="default" class="btn-end" @click="outEntry(index)">取消</van-button><van-button round type="info" class="btn-sum" @click="saveTemperature(item)">提交</van-button></div>
							</div>
						</div>
					</template>
				</li>
			</ul>
		</div>

		<van-action-sheet v-model="actionSheetShow" :actions="actionSheet" cancel-text="取消" close-on-click-action @select="onSelect" @cancel="onCancelRecord" />

		<AlterRecord ref="alterRecord" @refreshDataRecord="refreshDataRecord" :date="date" :userType="userType" :schoolId="schoolId" :zcmin="zcmin" :zcmax="zcmax" :dsmin="dsmin" :dsmax="dsmax" :recordItem="recordItem"></AlterRecord>

		<!-- <DevicePopup ref="devicePopup" :userType="userType" :schoolId="schoolId" :timeType="timeTypeNum+1" :zcmin="zcmin" :dsmin="dsmin" :dsmax="dsmax" v-if="zcmin"></DevicePopup> -->
	</div>
</template>

<script>
import Vue from 'vue'
import { Toast, Dialog, ActionSheet } from 'vant'
import { saveTemperature, deleteTemperatureRecord } from '@/api/temper'
import { report, callNativeShowTemperatureView, callJsSaveBabyTemperature, callJsParserTemperatureState, callNativeSaveBabyTemperatureResult } from 'dsbridge'
// import DevicePopup from './devicePopup.vue'

import AlterRecord from './alterRecord.vue'

export default {
	name: 'Temrecord',
	components: {
		AlterRecord,
		ActionSheet
		// DevicePopup
	},
	props: {
		schoolId: {
			type: String,
			default () {
				return ''
			}
		},
		recordList: {
			type: Array,
			default () {
				return []
			}
		},
		date: {
			type: String,
			default () {
				return ''
			}
		},
		userType: {
			type: Number,
			default () {
				return 1
			}
		},
		stateNum: {
			type: Number,
			default: 0
		},
		stateCurrent: {
			type: Number
		},
		dsmin: {
			type: Number,
			default: 37.0
		},
		dsmax: {
			type: Number,
			default: 38.5
		},
		zcmin: {
			type: Number,
			default: 35.0
		},
		zcmax: {
			type: Number,
			default: 37.0
		},
		timeTypeNum: {
			type: Number,
			default: 0
		},
		istoday: {
			type: Boolean,
			default () {
				return false
			}
		}
	},
	data () {
		return {
			current: '',
			value: 36.5,
			show: false,
			actionSheetShow: false,
			actionSheet: [{
				name: '修改',
				type: 1
			}, {
				name: '删除检测记录',
				type: 0
			}],
			recordItem: {}
		}
	},
	computed: {
		nowValue () {
			return this.value
		}
	},
	watch: {
		stateCurrent (newV, oldV) {
			this.current = ''
		}
	},
	mounted () {
		this.callJsSaveBabyTemperature()
		this.callJsParserTemperatureState()
		// this.current = this.stateCurrent
	},
	methods: {
		refreshDataRecord() {
			this.$emit('refreshData')
		},
		onSelect(item) {
			this.actionSheetShow = false
			if (item.type === 1) { // 修改
				this.$refs.alterRecord.alterRecordShow = true
			} else { // 删除
				Dialog.confirm({
					title: '',
					confirmButtonText: '删除',
					cancelButtonColor: '#007AFF',
					className: 'temperature-record',
					message: `确定删除【${this.recordItem.userName}】今天【${this.timeTypeNum == 0 ? '晨' : this.timeTypeNum == 1 ? '午' : '晚'}检】的记录吗？`,
				}).then(() => {
					deleteTemperatureRecord({
						userType: this.userType,
						studentId: this.recordItem.studentId,
						timeType: this.timeTypeNum + 1,
						date: this.date,
						schoolId: this.schoolId,
						temperature: this.recordItem.temperature
					}).then(res => {
						if (res) {
							Toast('删除成功')
							this.$emit('refreshData')
						}
					}).catch(res => {
						Toast(res.message || '删除失败')
					})
				}).catch(() => {
					this.actionSheetShow = false
				})
			}
		},
		onCancelRecord() {
			this.actionSheetShow = false
			this.$refs.alterRecord.alterRecordShow = false
		},
		recordItemHandler(item) {
			event.stopPropagation()

			// 未解析
			if (this.stateNum === 2) {
				return
			}
			if (!this.istoday) {
				Toast('目前APP不支持查看历史记录')
				return
			}

			this.recordItem = item
			this.$refs.alterRecord.alterRecordShow = false
			this.actionSheetShow = true
		},
		test () {
			return new Promise((resolve, reject) => {
				return 'hello world'
			})
		},
		goEntry (index) {
			this.value = 36.5
			this.current = index
			report(2, { event_id: 'temp_enter_click' })
		},
		outEntry (index) {
			this.current = -1
		},
		saveTemperature (item) {
			const params = {
				userType: this.userType,
				userId: item.userId,
				temperature: Number(this.value),
				date: this.date,
				timeType: this.timeTypeNum + 1,
				schoolId: this.schoolId
			}
			this.loading({
				message: '加载中...'
			})
			report(2, { event_id: 'temp_enter_submit' })
			return saveTemperature(params).then((res) => {
				Toast(res.message)
				setTimeout(() => {
					this.$emit('parentEven')
				}, 600)
			})
		},
		// 显示原生测温弹窗
		showPopup (val) {
			let objType = 'tech'
			/* eslint-disable-next-line eqeqeq */
			if (this.userType == 1) {
				objType = 'stu'
			}
			report(2, { event_id: 'tempmeasure_popup_show', obj_type: objType })
			if (!this.istoday) {
				Toast('历史日期不支持连体温枪测温')
				return
			}
			if (this.stateNum !== 2) {
				return
			}
			// 默认头像需要加上domain
			let imgUrl = val.userPic
			if (imgUrl.indexOf('http') === -1) {
				imgUrl = window.domain + imgUrl
			}
			// 判断是学生还是老师
			let role = ''
			if (val.teacherId) {
				if (val.teacherType === 'leader') {
					role = 'leader'
				} else {
					role = 'teacher'
				}
			} else if (val.studentId) {
				role = 'baby'
			}
			callNativeShowTemperatureView({
				userSex: val.userSex,
				avatar: imgUrl,
				userId: val.userId,
				name: val.userName,
				role: role
			})
			// this.$refs['devicePopup'].show(val.userName,val.userId)
		},

		// 原生调用h5 保存温度
		callJsSaveBabyTemperature () {
			callJsSaveBabyTemperature().then((res) => {
				const data = JSON.parse(res)
				this.value = data.temperature
				this.saveTemperature(data).then(() => {
					// 调用原生，传达保存成功信息
					callNativeSaveBabyTemperatureResult({
						code: 10000,
						message: '成功',
						body: {
							userId: data.userId
						}
					})
				}).catch((error) => {
					callNativeSaveBabyTemperatureResult({
						code: 404,
						message: '失败',
						body: error
					})
				})
			})
		},

		// 原生调用h5 获取温度异常状态
		callJsParserTemperatureState () {
			callJsParserTemperatureState((temperature) => {
				return this.temperature2str(temperature)
			})
		},

		// 温度异常状态转化
		temperature2str (temperature) {
			if (temperature < this.zcmin) {
				return {
					stateString: '异常',
					stateStringHexColor: '#C369ED',
					warnString: '体温过低,请再测一次',
					warnStringHexColor: '#FF5E68',
					alertString: '体温过低，提交失败',
					isAbnormal: true
				}
			} else if (temperature >= this.zcmin && temperature <= this.zcmax) {
				return {
					stateString: '正常',
					stateStringHexColor: '#26DD4B',
					warnString: '',
					warnStringHexColor: '',
					alertString: '',
					isAbnormal: false
				}
			} else if (temperature >= this.dsmin && temperature <= this.dsmax) {
				return {
					stateString: '低烧',
					stateStringHexColor: '#FF5E68',
					warnString: '结果可能受环境影响，建议再测一次',
					warnStringHexColor: '#FF5E68',
					alertString: '体温发热，确定提交？',
					isAbnormal: false
				}
			} else if (temperature > this.dsmax) {
				return {
					stateString: '高烧',
					stateStringHexColor: '#FF5E68',
					warnString: '结果可能受环境影响，建议再测一次',
					warnStringHexColor: '#FF5E68',
					alertString: '体温发热，确定提交？',
					isAbnormal: false
				}
			}
		}

	}
}
</script>

<style lang="scss" scoped>
@import '@/styles/temperature/record.scss';

.tem-record-wrap {
	/deep/.van-popup {
		background: initial;
		margin: 0 20px;
		box-sizing: border-box;
		margin-bottom: 18px;
		width: auto;
		right: 0;
		span {
			color: #007AFF;
			font-size: 40px;
		}
	}
	/deep/.van-action-sheet__content {
		border-radius: 26px;
		.van-action-sheet__item:first-child {
			border-bottom: 1px solid #a6a6a6;
		}
		.van-action-sheet__item:last-child {
			border-top: 1px solid #8a8a8a;
		}
	}
	/deep/.van-action-sheet__gap {
		display: none;
	}
	/deep/.van-action-sheet__cancel {
		border-radius: 26px;
		color: #007AFF;
		font-size: 40px;
		margin-top: 20px;
	}
}
.temperature-record {
	width: 540px;
}
</style>

<style lang="scss">
.temperature-record {
	width: 540px;
	.van-dialog__message {
		font-size: 34px;
		line-height: 48px;
	}
}
</style>
