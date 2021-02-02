<template>
	<div class="top-time">检测日期:<span class="">{{date}}</span></div>
</template>

<script>
export default {
	name: 'Temtime',
	props: {
		date: {
			type: String,
			default () {
				return ''
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

	}
}
</script>

<style lang="scss" scoped>
.top-time{
	font-size:26px;
}
</style>
