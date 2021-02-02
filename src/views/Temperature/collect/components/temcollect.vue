<template>
<div class="collect-list" :class="{'ptm':istodayTime}">
	<template v-if="listData.length > 0">
		<div class="collect-title" v-for="item in listData" :key="item.orgId" @click="btnToRecord($event,item)">
			<div class="title-name spn c33">{{item.orgName}}</div>
			<div class="title-normal spn">
				<span :class="item.normalNum > 0 ? 'c33' : 'cbd'">{{item.normalNum}}</span>
			</div>
			<div class="title-hot spn">
				<span :class="item.feverNum > 0 ? 'cf5' : 'cbd'">{{item.feverNum}}</span>
			</div>
			<div class="title-not spn">
				<span :class="item.unDetectedNum > 0 ? 'c33' : 'cbd'">{{item.unDetectedNum}}</span>
			</div>
			<van-icon name="arrow" />
		</div>
	</template>
</div>
</template>
<script>
import { param2Obj } from '@/utils/index'
import { toTemperatureRecord } from 'dsbridge'
export default {
	name: 'TemCollect',
	props: {
		listData: {
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
		istodayTime: {
			type: Boolean,
			default () {
				return true
			}
		}
	},
	data () {
		return {

		}
	},
	watch: {

	},
	methods: {
		btnToRecord (e, item) {
			let params = ''
			const userId = item.orgId
			const timeType = item.timeType - 1
			const orgName = item.orgName
			if (this.userType === '1') {
				params = '?userType=' + this.userType + '&date=' + this.date + '&classId=' + userId + '&timetype=' + timeType + '&orgName=' + orgName + '&stateNum=0'
			} else if (this.userType === '2') {
				params = '?userType=' + this.userType + '&date=' + this.date + '&departmentId=' + userId + '&timetype=' + timeType + '&orgName=' + orgName + '&stateNum=0'
			}
			if (process.env.NODE_ENV === 'local') {
				this.$router.push({ name: 'record', query: param2Obj(params) })
			} else {
				toTemperatureRecord({
					params: params,
					userType: this.userType,
					orgId: userId,
					orgName: orgName,
					date: this.date,
					timetype: timeType,
					stateNum: 0,
					hostUrl: window.domain + '/temperature/record'
				})
			}
		}
	}
}
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
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
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
.collect-list{
	background: #F2F3F5;
}
.collect-list.ptm{
	padding-bottom: 120px;
}
.collect-list>div{
	background: #fff;
	height: 100px;
	line-height: 100px;
	position: relative;
	padding-left: 30px;
}
.collect-list>div:after{
	content: '';
	height: 2px;
	background: #eee;
	position: absolute;
	right: 0;
	bottom: 0;
	left: 30px;
}
.collect-list>div:last-child:after{
	display: none;
}
</style>
