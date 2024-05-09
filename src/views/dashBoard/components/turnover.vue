<script setup>
	import { onMounted, ref, onUnmounted, watchEffect } from "vue";
	import * as echarts from "echarts";

	const props = defineProps(["turnoverData"]);
	const chartInstance = ref(null);

	const updateChart = () => {
		if (chartInstance.value) {
			chartInstance.value.setOption({
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
					name: "时间",
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
					name: "营业额",
				},
				series: [
					{
						data: props.turnoverData,
						type: "line",
					},
				],
			});
		}
	};

	onMounted(() => {
		if (!chartInstance.value) {
			chartInstance.value = echarts.init(document.getElementById("turnOver"));
		}
		updateChart();
	});

	watchEffect(() => {
		updateChart();
	});

	onUnmounted(() => {
		if (chartInstance.value) {
			chartInstance.value.dispose();
		}
	});
</script>

<template>
	<div :style="{ width: '90%', height: '450px' }" id="turnOver"></div>
</template>
<style scoped></style>
