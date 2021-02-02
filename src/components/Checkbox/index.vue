<template>
        <van-checkbox :disabled="disabled" :value="checked" @click="change">
            <template #icon="props">
                <img class="img-icon" :src="disableIcon" v-if="disabled" />
                <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" v-else/>
            </template>
            <slot></slot>
        </van-checkbox>
</template>
<script>

export default {
	name: 'Checkbox',
	props: ['checked', 'disabled'],
	model: {
		prop: 'checked',
		event: 'change'
	},
	data () {
		const activeIcon = require('@/assets/common/form_icon_checked@2x.png')
		const inactiveIcon = require('@/assets/common/form_icon_unchecked@2x.png')
		const disableIcon = require('@/assets/common/form_icon_disable@2x.png')
		return {
			activeIcon,
			inactiveIcon,
			disableIcon
		}
	},
	watch: {

	},
	methods: {
		change () {
			this.$emit('change', !this.checked)
		}
	}
}
</script>
<style lang="scss" scoped>
    .img-icon {
        width: 36px;
        height: 36px;
    }
</style>
