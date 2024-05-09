<template>
	<div class="block">
		<span class="demonstration">选择日期范围 </span>
		<el-date-picker
		default-value="2024-4-7"
			v-model="dateValue"
			value-format="YYYY-MM-DD"
			type="daterange"
			unlink-panels
			range-separator="To"
			start-placeholder="Start date"
			end-placeholder="End date"
			:shortcuts="shortcuts"
			:size="size"
		/>
	</div>
	<div class="page">
		<Turnover></Turnover>
		<Turnover></Turnover>
	</div>
	<div class="page">
		<Turnover></Turnover>
		<Turnover></Turnover>
	</div>
</template>
<script setup>
	import { onMounted, ref } from "vue";
	import Turnover from "./components/turnover.vue";
	const dateValue = ref("");
	const shortcuts = [
		{
			text: "Last week",
			value: () => {
				const end = new Date();
				const start = new Date();
				start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
				return [start, end];
			},
		},
		{
			text: "Last month",
			value: () => {
				const end = new Date();
				const start = new Date();
				start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
				return [start, end];
			},
		},
		{
			text: "Last 3 months",
			value: () => {
				const end = new Date();
				const start = new Date();
				start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
				return [start, end];
			},
		},
	];
	onMounted(()=>{
		dateValue.value=shortcuts[0].value()
	})
</script>
<style scoped>
	.page {
		display: flex;
	}
</style>
