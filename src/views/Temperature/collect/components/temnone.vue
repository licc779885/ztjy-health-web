<template>
<div class="tem-none">
	<div class="none-imt"><img src="@/assets/common/xy_wxx@2x.png"></div>
    <div class="none-text">{{textnone}}</div>
</div>
</template>

<script>
export default {
	name: 'Temnone',
	props: {
		textnone: {
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
	methods: {}
}
</script>

<style lang="scss" scoped>
    .tem-none{
        position: absolute;
        width: 100%;
        left: 0;
        top: 150px;
        bottom: 0;
        .none-imt{
            width: 374px;
            margin: 0 auto;
            padding: 130px 0px 52px;
        }
        .none-text{
            text-align: center;
            font-size: 32px;
            color: #333;
        }
    }
</style>
