<template>
    <div class="healthTimes">
		<div class="box">
		<div class="tip">
			<div class="text">将给家长推送班级今日体温检测汇报，并展示班中每个孩子体温记录，消除家长的担忧。</div>
			<p>
				1.报告仅统计和展示体温正常学生，自动过滤异常学生；<br/>
				2.班级体温正常人数＜5人的班级不推送报告；<br/>
				3.今日体温异常的学生家长不推送报告；
			</p>
			<div class="title" @click="reportEvent">报告样式</div>
		</div>
		<van-cell-group title="选择推送班级" v-if="classList.length > 0">
			<van-cell :title="item.className" v-for="item in classList" :key="item.classId">
				<template #right-icon>
					<span>
						<strong class="gray" v-if="item.status!==1">{{item.status | statusStr}}</strong>
						<checkbox v-model="item.checked" v-else ></checkbox>
					</span>
				</template>
			</van-cell>
		</van-cell-group>
		<van-loading type="spinner" class="loadding" v-else/>
		</div>
		<div class="footer">
			<div class="item check">
				<checkbox v-model="checkAll" :disabled="disabled">全选</checkbox>
			</div>
			<v-touch @tap="submit" class="item submit" :class="{disabled:this.classIds.length === 0}">
				提交
			</v-touch>
		</div>
		<van-dialog v-model="show" :showConfirmButton="false">
			<van-icon name="cross" class="cross" slot="default" @click="show=false"/>
			<report />
		</van-dialog>
		<van-number-keyboard safe-area-inset-bottom />
	</div>
</template>
<script>
import { getClassList, pushTemperatureClass } from '@/api/temper'
import Report from './components/Report'
import { Toast } from 'vant'
import Checkbox from '@/components/Checkbox'
import { report } from 'dsbridge'
export default ({
	name: 'HealthTimes',
	components: {
		Report,
		Checkbox
	},
	computed: {
		classIds () {
			const classArr = this.classList.filter(item => item.checked)
			return classArr.map(item => item.classId)
		},
		disabled () {
			const disabled = this.classList.every((item) => {
				// eslint-disable-next-line
				return item.status == 2 || item.status == 3
			})
			return disabled
		},
		checkAll: {
			set (bol) {
				if (bol) {
					this.classList.forEach(element => {
						// eslint-disable-next-line
						if (element.status == 2 || element.status == 3) {
							element.checked = false
						} else {
							element.checked = true
						}
					})
				} else {
					this.classList.forEach(element => {
						element.checked = false
					})
				}
			},
			get () {
				if (this.classList.length > 0) {
					const list = this.classList.filter((item) => {
						// eslint-disable-next-line
						return item.status == 2 || item.status == 3
					})
					const classArr = this.classList.filter(item => item.checked)
					// 选中的数量跟状态不等于2或者3的数量一致 则返回true
					const statusNum = this.classList.length - list.length
					const checkNum = classArr.length
					if (statusNum !== 0) {
						if (statusNum === checkNum) {
							return true
						} else {
							return false
						}
					} else {
						return false
					}
				} else {
					return false
				}
			}

		}
	},
	watch: {

	},
	data () {
		const { schoolId } = this.$route.query
		return {
			schoolId,
			loadding: true,
			classList: [],
			show: false
		}
	},
	filters: {
		// 状态 1-可推送 2-已推送 3-未满足推送规则
		statusStr (status) {
			let str = ''
			switch (status) {
			case 2:
				str = '已推送'
				break
			case 3:
				str = '不满足推送条件'
				break
			}
			return str
		}
	},
	created () {
		this.getClassList()
	},
	mounted () {

	},
	methods: {
		reportEvent () {
			this.show = true
			report(2, { event_id: 'health_diary_popup_show' })
		},
		changeCheckAll (bol) {
			this.checkAll = bol
		},
		getClassList () {
			// todo 获取班级列表api
			return getClassList({ schoolId: this.schoolId }).then((res) => {
				const { classList } = res.body
				classList.forEach(element => {
					// eslint-disable-next-line
					if (element.status == 2 || element.status == 3) {
						element.checked = false
					} else {
						element.checked = true
					}
				})
				this.classList = classList
			})
		},
		submit () {
			if (this.classIds.length === 0) {
				return
			}
			this.loading()
			const classIds = this.classIds.join()
			report(2, { event_id: 'health_diary_push_click' })
			pushTemperatureClass({ schoolId: this.schoolId, classIds }).then((res) => {
				this.removeLoading()
				this.setClassidStatus()
				Toast.success(res.message)
				report(2, { event_id: 'health_diary_push_suc' })
			})
		},
		closeDialog () {
			this.show = false
		},
		// todo 点击推送，遍历classList 将已经推送的班级重新刷新状态
		setClassidStatus () {
			this.classList.map((item) => {
				if (this.classIds.some(target => target === item.classId)) {
					item.checked = false
					item.status = 2
				}
			})
		}
	}
})
</script>
<style lang="scss" scoped>
	/**解决vant 弹出组件模糊问题**/
	.van-dialog {
		width: 600px;
		margin-left:-300px;
		transform: translate3d(0,0,0);
		border-radius: 8px;
		top: 10%;
		.cross {
			position: absolute;
			right: 36px;
			top: 42px;
			font-size: 40px;
			z-index: 999;
		}
	}
	.healthTimes {
		font-size: 30px;
		display: flex;
		flex-direction: column;
		height: 100%;
		background-color: #f2f3f5;
		.report-popup {
			width: 100%;
			background-color: transparent;
		}
		.loadding {
			text-align: center;
			margin-top: 300px;
		}
		.box {
			flex: 1;
			overflow-y: auto;
		}
		span,strong,div {
			font-size: inherit;
		}
		strong {
			font-weight: normal;
		}
		.tip {
			padding:24px 30px;
			p {
				padding: 16px 0px;
				font-size: 26px;
				color: #BBBBBD;
				line-height: 40px;
				margin: 0px;
			}
			.title {
				color: #00AAFF;
			}
		}
		.text {
			font-size: 30px;
			color: #818D9D;
		}
		.gray {
			color: #BBBBBD;
		}
		/deep/ .van-cell__title {
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}
		/deep/ .van-cell-group__title,
		/deep/ .van-cell  {
			color: #333;
		}
		/deep/ .van-cell-group__title {
			padding:22px 30px;
			font-size: 26px;
			background-color: #ffffff;
		}
		/deep/ .van-checkbox__icon--checked .van-icon {
			background-color: #00a9ff;
			border-color: #00a9ff;
		}
		.footer {
			display: flex;
			position: relative;
			border-top:2px solid #eee;
			.item {
				flex:1;
				text-align: center;
				padding: 24px 0px;
			}
			.item.check {
				padding-left:30px;
				background-color: #fff;
			}
			.submit {
				background-color: #00AAFF;
				color: #fff;
				&.disabled {
					background-color: #cccccc;
				}
			}
		}
	}
</style>
