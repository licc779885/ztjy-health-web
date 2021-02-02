<template>
	<div class="tem-class">
		班级：{{className}}
	</div>
</template>

<script>
export default {
	name: 'Temclass',
	props: {

	},
	data () {
		return {
			className: '大班-大一班'
		}
	},
	watch: {

	},
	methods: {

	}
}
</script>

<style lang="scss" scoped>
.tem-class{
	font-size:26px;
}
</style>
