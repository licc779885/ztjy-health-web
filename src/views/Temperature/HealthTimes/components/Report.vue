<template>
    <div class="report">
        <div class="box">
            <div class="title">
                <div class="text">报告样式</div>
            </div>
            <img :src="reportImg" alt="">
            <!-- <section>
                <div class="txt">动态样式</div>
                <div class="dymic-box">
                    <div class="dymic-bg">
                        <div class="classTitle">大一班今日健康报告</div>
                        <ul>
                            <li class="normal">
                                <span>19</span>
                                <strong>体温正常学生</strong>
                            </li>
                            <li class="exception">
                                <span>0</span>
                                <strong>体温异常学生</strong>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <section>
                <div class="txt">详情样式</div>
                <div class="dymic-box">
                    <div class="list-box">
                        <div class="item van-hairline--bottom">
                            <span class="first">
                                <span class="head"></span>
                                <span class="name">林小雨</span>
                            </span>
                            <span class="temper">36.4℃</span>
                            <span class="time">08:13</span>
                            <span class="comment">正常</span>
                        </div>
                        <div class="item van-hairline--bottom">
                            <span class="first">
                                <span class="head"></span>
                                <span class="name">林小雨</span>
                            </span>
                            <span class="temper">36.4℃</span>
                            <span class="time">08:13</span>
                            <span class="comment">正常</span>
                        </div>
                    </div>
                </div>
            </section> -->

        </div>
    </div>
</template>
<script>
const reportImg = require('@/assets/temperature/img1.png')
export default ({
	name: 'report',
	computed: {},
	watch: {},
	data () {
		return {
			reportImg: reportImg
		}
	},
	created () {

	},
	mounted () {

	},
	methods: {

	}
})
</script>
<style lang="scss" scoped>
    .report {

        img {
            width: 100%;
            margin-top:24px;
        }
        .box {
            background: #FFFFFF;
            padding:36px 36px 50px;
        }
        .title {
            position: relative;
            text-align: center;
            .text {
                font-size: 34px;
                color: #333333;
            }

        }
        .txt {
            font-size: 30px;
            color: #818D9D;
            padding-bottom: 20px;
        }
        .dymic-box {
            border: 2px dotted #ccc;
            padding: 24px;
        }
        .dymic-bg {
            width: 480px;
            height: 270px;
            background: url(~@/assets/healthTimes/bg@2x.png) no-repeat;
            @include hidpi {
                background: url(~@/assets/healthTimes/bg@3x.png) no-repeat;
                background-size: 100% auto;
            }
            background-size: 100% auto;
            font-size: 24px;
            text-align: center;
            .classTitle {
                color: #DA9F19;
                padding-top: 46px;
                padding-bottom: 30px;
            }
            ul {
                display: flex;
                justify-content:space-around;
                margin: 0px 80px;

            }
            span,strong {
                display: block;
            }
            span {
                margin-bottom: 8px;
            }
            strong {
                font-weight: normal;
                font-size: 24px;
                color: #818D9D;
            }
            .normal {
                display: block;
                span {
                    font-size: 46px;
                    color: #26DD4B;
                }
            }
            .exception {
                display: block;
                span {
                    font-size: 46px;
                    color: #FF9700;
                }
            }
        }
        .list-box {
            padding:40px;
            border: 2px solid #EEEEEE;
            font-size: 24px;
            color: #333;
            .item {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .first {
                display: flex;
                align-items: center;
            }
            .head {
                width: 50px;
                height: 50px;
                object-fit: cover;
                display: inline-block;
                img {
                   width: 100%;
                   height: 100%;
                }
            }
            .name {
                margin-left: 12px;
            }
            .temper {

            }
            .time {
                color: #BBBBBD;
            }
            .comment{
                color: #26DD4B;
            }
        }
    }
</style>
