<template>
  <div class="tem-menu">
	<div class="btn-menu" v-for="(tab,index) in tabs" :class="{active:stateNum==index}" @click="ChangeState(index)" :key="index"><span class="spn">{{tab}}</span></div>
  </div>
</template>

<script>
export default {
	name: 'Temstate',
	props: {
		stateNum: {
			type: Number,
			default: 0
		}
	},
	data () {
		return {
			tabs: ['正常', '发热', '未检测'],
			num: 0
		}
	},
	watch: {

	},
	methods: {
		ChangeState (index) {
			this.$emit('getStateNum', index)
		}
	}
}
</script>

<style lang="scss" scoped>
.tem-menu{
	height: 88px;
	line-height: 88px;
	// display: flex;
	// display: -webkit-flex;
	// align-items: center;
	// justify-content: space-around;
	overflow: hidden;
	// position: relative;
	.btn-menu{
		height: 100%;
		position: relative;
		// flex: auto;
		text-align: center;
		width: 33.3%;
		float: left;
		.spn{
			display: inline-block;
			position: relative;
		}
	}
	.btn-menu.active .spn:after{
		content: "";
		width: 100%;
		height: 6px;
		background: #00AAFF;
		border-radius: 6px;
		position: absolute;
		left: 0;
		bottom:10px;
	}
}
</style>
