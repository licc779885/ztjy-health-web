<template>
    <div class="alter-record">
        <van-dialog v-model="alterRecordShow" class="alter-record-dialog" :showConfirmButton="true" confirm-button-text="确定" show-cancel-button @cancel="cancelRecord" @confirm="confirmRecord">
            <van-row>
                <van-col span="6">学生姓名：</van-col>
                <van-col span="8" style="color: #333">{{recordItem.studentName || '-'}}</van-col>
            </van-row>
            <van-row>
                <van-col span="6">体<span style="opacity: 0;">占位</span>温：</van-col>
                <van-col span="8">
                    <van-stepper v-model="recordItem.temperature" step="0.1" min="35.0" max="42.0" disable-input :decimal-length="1" />
                </van-col>
            </van-row>
            <van-row>
                <van-col span="6">状<span style="opacity: 0;">占位</span>态：</van-col>
                <van-col span="8" v-if="recordItem.temperature < zcmin" style="color: #C369ED">异常</van-col>
                <van-col span="8" v-else-if="recordItem.temperature >= zcmin && recordItem.temperature <= zcmax" style="color: #26DD4B">正常</van-col>
                <van-col span="8" v-else-if="recordItem.temperature >= dsmin && recordItem.temperature <= dsmax" style="color: #FF5E68">低烧</van-col>
                <van-col span="8" v-else-if="recordItem.temperature > dsmax" style="color: #FF5E68">高烧</van-col>
            </van-row>
        </van-dialog>
    </div>
</template>

<script>
import { updateTemperatureRecord } from '@/api/temper'
import { Toast } from 'vant'

export default {
    props: {
        recordItem: {
            type: Object,
            default () {
                return {}
            }
        },
        date: {
			type: String,
			default () {
				return ''
			}
        },
        schoolId: {
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
        zcmin: {
			type: Number,
			default: 35.0
        },
        zcmax: {
			type: Number,
			default: 37.0
		},
        dsmin: {
            type: Number,
			default: 37.0
        },
        dsmax: {
            type: Number,
			default: 38.5
        }
    },
    data() {
        return {
            alterRecordShow: false
        }
    },
    methods: {
        cancelRecord() {
            this.alterRecordShow = false
        },
        confirmRecord() {
            updateTemperatureRecord({
                userType: this.userType,
                studentId: this.recordItem.studentId,
                timeType: this.recordItem.timeType,
                date: this.date,
                schoolId: this.schoolId,
                temperature: this.recordItem.temperature
            }).then(res => {
                this.alterRecordShow = false
                Toast('修改成功')
                this.$emit('refreshDataRecord')
            }).catch(res => {
                Toast(res.message || '修改失败')
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.alter-record-dialog {
    width: 560px;
    .van-col--6 {
        text-align: right;
        width: 164px;
        margin-right: 10px;
        color: #333;
    }
    .van-col--8 {
        width: 282px;
    }
    .van-row {
        line-height: 80px;
    }
    /deep/.van-dialog__content {
        padding: 30px 45px;
    }
    /deep/.van-button--default {
        color: #007AFF;
    }

   /deep/.van-stepper__minus, /deep/.van-stepper__plus {
       margin: 0;
       padding: 0;
       background: #fff;
       border: 2px solid #ccc;
       width: 80px;
       height: 70px;
       color: #333;
   }
   /deep/.van-stepper__input {
       margin: 0;
       width: 120px;
       height: 70px;
       background: #fff;
       border-top: 2px solid #ccc;
       border-bottom: 2px solid #ccc;
   }
   /deep/.van-stepper__minus::before, /deep/.van-stepper__plus::before {
       width: 40%;
       color: #333;
   }
   /deep/.van-stepper__minus::after, /deep/.van-stepper__plus::after {
       height: 40%;
       color: #333;
   }
   /deep/.van-stepper__input {
       color: #333;
   }
}
</style>
