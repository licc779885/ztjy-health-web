<template>
  <div class="tem-list">
	<div class="tem-lt" v-for="(item,index) in list" :key="index">
		<div class="lt-info">
			<div class="imt"><img src=""></div>
			<div class="name">学生名字</div>
		</div>
		<div class="lt-state">
			<span class="end">已签到</span>
		</div>
		<div class="lt-entry">
			<div class="entry-btn c0a" v-if="current != index" @click="goEntry(index)">录入体温</div>
			<div class="entry-content" v-if="current == index">
			<div class="entry-step"><van-stepper v-model="item.value" step="0.1" :decimal-length="1" min="35.0" max="40.0" /></div>
			<div class="entry-sum"><van-button round type="default" class="btn-end" @click="outEntry(index)">取消</van-button><van-button round type="info" class="btn-sum" :sid="item.id" @click="sumEntry($event,index)">提交</van-button></div>
			</div>
		</div>
	</div>
  </div>
</template>

<script>
import { report } from 'dsbridge'
export default {
	name: 'Tementry',
	props: {

	},
	data () {
		return {
			current: -1,
			list: [
				{
					id: '0101',
					value: 36.5
				},
				{
					id: '0202',
					value: 36.5
				},
				{
					id: '0303',
					value: 36.5
				}
			],
			isentry: true
		}
	},
	watch: {

	},
	methods: {
		goEntry (index) {
			this.current = index
			report(2, { event_id: 'temp_enter_click' })
		},
		outEntry (index) {
			this.current = -1
		},
		sumEntry (e, index) {
			report(2, { event_id: 'temp_enter_submit' })
		}
	}
}
</script>

<style lang="scss" scoped>
.tem-list{
	padding-left: 30px;
	margin-top: 20px;
	.tem-lt{
		display: flex;
		display: -webkit-flex;
		align-items: center;
		justify-content: space-between;
		padding:10px 30px;
		border-bottom:2px solid #eee;
		.lt-info{
			display: flex;
			display: -webkit-flex;
			align-items: center;
			color: #333;
			.imt{
				line-height: 0;
				img{
					margin-right:20px;
					width:80px;
					height: 80px;
				}
			}
		}
	}
	.tem-lt:last-child{
		border-bottom: none;
	}
}
</style>
