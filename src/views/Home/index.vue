<template>
    <div class="test">
		<van-cell title="选择单个日期" :value="date" @click="show = true" />
		<van-calendar v-model="show" @confirm="onConfirm" />
		<van-button type="default">默认按钮</van-button>
<van-button type="primary">主要按钮</van-button>
<van-button type="info">信息按钮</van-button>
<van-button type="warning">警告按钮</van-button>
<van-button type="danger">危险按钮</van-button>
	</div>
</template>
<script>
export default ({
	name: 'Home',
	components: {

	},
	computed: {

	},
	watch: {

	},
	data () {
		return {
			date: '',
			show: false
		}
	},
	created () {

	},
	mounted () {

	},
	methods: {
		formatDate (date) {
			return `${date.getMonth() + 1}/${date.getDate()}`
		},
		onConfirm (date) {
			this.show = false
			this.date = this.formatDate(date)
		}
	}
})
</script>
<style lang="scss">

</style>
