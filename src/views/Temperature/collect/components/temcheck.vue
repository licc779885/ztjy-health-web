<template>
  <div class="check-btn">
	<van-button round type="" v-for="(tab,index) in tabs" :class="{active:timeTypeNum==index}" :key="index" @click="changeTimeType(index)">{{tab}}</van-button>
 </div>
</template>

<script>

export default {
	name: 'Temcheck',
	props: {
		timeTypeNum: {
			type: Number,
			default: 0
		}
	},
	data () {
		return {
			tabs: ['晨', '午', '晚']
		}
	},
	watch: {

	},
	methods: {
		changeTimeType (index) {
			this.$emit('getTimeTypeNum', index)
		}
	}
}
</script>

<style lang="scss" scoped>
.check-btn{
	border: 2px solid #00AAFF;
	// display: flex;
	// display: -webkit-flex;
	// align-items: center;
	padding:6px;
	border-radius:30px;
	width: 240px;
	overflow: hidden;
	text-align: center;
	button{
		border: none;
		background:none;
		width: 80px;
		height: 44px;
		line-height: 48px;
		padding: 0;
		display: block;
		float: left;
		text-align: center;
		.van-button__text{
			color: #00AAFF;
			font-size: 28px;
		}
	}
	button.active{
		background: #00AAFF;
		.van-button__text{
			color: #fff;
		}
	}
}

</style>
