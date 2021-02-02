<template>
    <div class="connect-help">
        <div class="title">
            <span class="line"></span>
            <span class="text">支持连手机的体温枪</span>
        </div>
        <div class="content">
            目前仅支持<span class="device">{{textContent}}</span>，可联系当地服务商进行购买
        </div>
        <div class="title">
            <span class="line"></span>
            <span class="text">手机连体温枪设置</span>
        </div>
        <div class="content">
                点击体温名单页的体温枪图标，进入体温枪连接设置页，
                选择体温枪信号进行连接。
            <img :src="tipImg1" alt="">
        </div>
        <div class="title">
            <span class="line"></span>
            <span class="text">测温操作</span>
        </div>
        <div class="content">
                在未检测名单中，选择测温对象，用体温枪测温，体温
                就会自动传输到手机，提交即可。

            <img :src="tipImg2" alt="">
        </div>
	</div>
</template>
<script>
/* eslint-disable */ 
import { report } from 'dsbridge'
const tipImg1 = require('@/assets/temperature/h5-1.png')
const tipImg2 = require('@/assets/temperature/h5-2.png')
export default ({
	name: 'ConnectHelp',
	components: {

	},
	computed: {
		device () {
			return this.deviceList.join('、')
		}
	},
	watch: {

	},
	data () {
		return {
			date: '',
			show: false,
			tipImg1,
			tipImg2,
			textContent: ''
		}
	},
	created () {
		const { textContent } = this.$route.query
		this.textContent = textContent
	},
	mounted () {
     
	}
})
</script>
<style lang="scss" scoped>
.connect-help {
    padding:0px 30px;
    .device {
        color:#FF5900;
    }
    .content {
        font-size: 28px;
        color: #818D9D;
        line-height:40px;

    }
    .title {
        display:flex;
        align-items: center;
        margin-bottom: 20px;
        margin-top:30px;
        .line {
            background: #00AAFF;
            border-radius: 6px;
            border-radius: 6px;
            display:inline-block;
            width:8px;
            height:30px;
            margin-right:20px;
        }
        .text {
            font-size: 30px;
            color: #333333;
        }
    }
    img {
        display:block;
        width:100%;
    }
}
</style>
