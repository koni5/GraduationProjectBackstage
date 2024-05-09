<script setup>
	import VChart from "vue-echarts";
	import { ref, defineProps, watch, computed } from "vue";
	const props = defineProps(["turnoverData"]);
	let data = computed(() => {
		return props.turnoverData;
	});
	const option = ref({
		tooltip: {
			trigger: "axis",
			axisPointer: {
				type: "cross",
				label: {
					backgroundColor: "#6a7985",
				},
			},
		},
		xAxis: {
			type: "time",
			splitLine: {
				show: false,
			},
			axisLabel: {
				formatter: function (value) {
					// 将时间戳转换为日期对象
					var date = new Date(value);
					// 获取月份和日期
					var month = date.getMonth() + 1; // 月份从0开始，因此需要加1
					var day = date.getDate(); // 获取日期
					// 返回所需格式
					return month + "-" + day;
				},
				interval: "auto",
				showMinLabel: true,
				showMaxLabel: true,
			},
		},
		yAxis: {
			type: "value",
		},
		color: "#52b4fd",
		series: [
			{
				data: data,
				type: "line",
			},
		],
	});
</script>

<template>
	<el-card class="mgb20" shadow="hover">
		<template #header>
			<div class="content-title">营业额统计(￥)</div>
		</template>
		<v-chart class="schart" :option="option" />
	</el-card>
</template>
<style scoped>
	.schart {
		height: 310px;
	}
	.content-title {
		font-weight: 400;
		font-size: 25px;
		color: #1f2f3d;
	}
</style>
