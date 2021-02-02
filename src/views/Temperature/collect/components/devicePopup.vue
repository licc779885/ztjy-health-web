<template>
	<van-dialog v-model="showPopup" :showConfirmButton="false">
	<div class="device-popup" :class="{connect:deviceStatus,start:temperature}">
        <div class="title" >
            <span class="ico"></span>
            <span class="txt">
                {{deviceStatus?'体温枪已连接':'体温枪未连接'}}
            </span>
        </div>
        <div class="box">
            <div class="people">
            <div class="img-box">
                <img :src="teacherMan" alt="">
            </div>
            <div class="name">
                {{userName}}
            </div>
            <div class="temperatures">
                <span class="degree">{{temperature}}℃</span>
                <span class="text normal">异常</span>
            </div>
            </div>
            <div class="status" v-if="!temperature">
                 {{deviceStatus?'等待测温':'体温枪未连接手机'}}
            </div>
            <div class="tip" v-if="deviceStatus"></div>
            <div class="tip" v-else>
                去检查连接情况
            </div>
            <div class="temper-status" v-if="temperature">
                    {{temperStatusStr}}
               </div>
            <div class="btn-box" v-if="temperature">
                <van-button plain hairline type="primary" class="btn cancel" @click="showPopup=false">取消</van-button>
                <van-button plain hairline type="primary" class="btn confirm" @click="saveTemperature">提交</van-button>
            </div>
            <van-button plain hairline type="primary" class="btn" @click="showPopup=false" v-else >取消测温</van-button>

        </div>
	</div>
    </van-dialog>
</template>

<script>
import { saveTemperature } from '@/api/temper'
import { Toast } from 'vant'
import { report } from 'dsbridge'
const teacherMan = require('@/assets/common/defaultImg/teacher_man@2x.png')
/**
 * 体温计测温 不需要手动填写温度功能
 * 点击头像弹出当前组件 判断蓝牙体温枪是否连接
 * zcmin：正常温度最小值
 * dsmin：低烧最小值
 * dsmax：高烧最大值
 */
export default {
	name: 'devicePopup',
	props: ['zcmin', 'dsmin', 'dsmax', 'userType', 'timeType'],
	data () {
		const date = new Date()
		const today = date.getFullYear() + (date.getMonth() + 1) + date.getDay()
		return {
			userName: '',
			userId: '',
			showPopup: false,
			teacherMan,
			deviceStatus: true, // 体温枪连接状态
			temperature: 34, // 体温枪上报的温度
			date: today
		}
	},
	computed: {
		temperStatusStr () {
			if (this.temperature < this.zcmin) {
				return '体温过低，请再测一次'
			} else if (this.temperature >= this.zcmin && this.temperature <= this.zcmax) {
				return ''
			} else if (this.temperature >= this.dsmin && this.temperature <= this.dsmax) {
				return '结果可能受环境影响，建议再测一次'
			} else if (this.temperature > this.dsmax) {
				return '结果可能受环境影响，建议再测一次'
			}
		}
	},
	watch: {

	},
	mounted () {

	},
	methods: {
		show (userName, userId) {
			this.userName = userName
			this.userId = userId
			this.showPopup = true
		},
		hide () {
			this.showPopup = false
		},
		saveTemperature (item) {
			const params = {
				userType: this.userType,
				userId: this.userId,
				temperature: this.temperature,
				date: this.date,
				timeType: this.timeType,
				schoolId: this.schoolId
			}
			// this.loading()
			saveTemperature(params).then((res) => {
				Toast.message(res.message)
				this.showPopup = false
				// this.removeLoading()
			})
			report(2, { event_id: 'temp_enter_submit' })
		}
	}
}
</script>

<style lang="scss" scoped>
.device-popup {
    padding:15px 15px 30px;
    .box {
        display:flex;
        flex-direction: column;
        align-items: center;
    }
    // 开始测温
    &.start {
        .tip {
            display:none;
        }
    }
    // 已经连接状态
    &.connect {
        .title {
            .ico {
                background: url(~@/assets/temperature/icon-bluetooth-on@2x.png) no-repeat;
                @include hidpi {
                    background: url(~@/assets/temperature/icon-bluetooth-on@3x.png) no-repeat;
                    background-size: 100% auto;
                }
            }
            .txt {
                color: #00AAFF;
            }
        }
        .tip {
             width:150px;
            height:42px;
            background: url(~@/assets/temperature/img-tips@2x.png) no-repeat;
            @include hidpi {
                background: url(~@/assets/temperature/img-tips@3x.png) no-repeat;
                background-size: 100% auto;
            }
        }
        .status {
            color:#818D9D;
        }
    }
    .temperatures {
        display:flex;
        align-items:center;
        font-size: 25px;
        .degree {
            font-size:inherit;
            color: #333333;
            margin-right:20px;
        }
        .text {
            font-size:inherit;
            &.normal {
                color: #26DD4B;
            }
            &.exception {
                color: #C369ED;
            }
             &.lowfever {
                color: #FF5E68;
            }

        }
    }
    .title {
        display:flex;
        align-items: center;
        .ico {
            width:14px;
            height:14px;
            margin-right:8px;
            background: url(~@/assets/temperature/icon-bluetooth-off@2x.png) no-repeat;
            @include hidpi {
                background: url(~@/assets/temperature/icon-bluetooth-off@3x.png) no-repeat;
                background-size: 100% auto;
            }
        }
        .txt {
            color: #FF5E68;
        }
    }
    .people {
        display:flex;
        flex-direction: column;
        align-items: center;
        margin-top:20px;
        margin-top:15px;
        .img-box {
            img {
                width:70px;
                height:70px;
                display:block;
            }
        }
        .name {
            font-size: 16px;
            color: #333333;
            margin:10px 0px;
        }
    }
    .status {
        font-size: 14px;
        color: #FF5E68;
        margin:10px 0px;
    }
    .tip {
        font-size: 13px;
        color: #00AAFF;
        margin-bottom:25px;
    }
    .btn{
        height:44px;
        padding:0px 58px;
        border-radius:44px;
        color:#00AAFF;
        border-color:#00AAFF;
        font-size:16px;
        &.van-button::before,
        &.van-button--hairline::after{
            border-color:inherit;
            border-radius: inherit;
        }
        &.van-button:active::before {
            background-color: #fff;
        }
    }
    .btn-box {
        display: flex;
        .btn {
            padding-left:34px;
            padding-right:34px;
            &.cancel {
                margin-right: 20px;
            }
            &.confirm {
                background-color: #00AAFF;
                color:#fff;
            }
        }
    }
    .temper-status {
        color:#FF5E68;
        font-size:13px;
        padding:12px 0px 18px;
    }
}
</style>
