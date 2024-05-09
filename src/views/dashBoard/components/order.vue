<script setup>
	import VChart from "vue-echarts";
	import { ref, defineProps, computed } from "vue";
	const props = defineProps(["ordersData"]);
	const option = ref({
		tooltip: {
			trigger: "axis",
		},
		legend: {
			data: [ "有效订单","全部订单",],
		},
		xAxis: {
			type: "category",
			boundaryGap: false,
			data: computed(() => {
				return props.ordersData?.dateList.split(",");
			}),
		},
		yAxis: {
			type: "value",
		},
		color: ["#009688", "#f44336"],
		series: [
			{
				name: "全部订单",
				type: "line",
				areaStyle: {},
				smooth: true,
				data: computed(() => {
					return props.ordersData?.orderCountList.split(",");
				}),
			},
			{
				name: "有效订单",
				type: "line",
				areaStyle: {},
				smooth: true,
				data: computed(() => {
					return props.ordersData?.validOrderCountList.split(",");
				}),
			},
		],
	});
</script>

<template>
	<el-card class="mgb20" shadow="hover">
		<template #header>
			<div class="page">
				<div class="content-title">订单统计</div>
				<div class="statistic">
					订单总数:{{ props.ordersData?.totalOrderCount }}
				</div>
				<div class="statistic">
					有效订单:{{ props.ordersData?.validOrderCount }}
				</div>
				<div class="statistic">
					订单完成率:{{
						Math.floor(props.ordersData?.orderCompletionRate * 100)
					}}%
				</div>
			</div>
		</template>
		<v-chart class="schart" :option="option" />
	</el-card>
</template>
<style scoped>
	.page {
		display: flex;
	}
	.statistic {
		color: #c2c5c6;
		padding-top: 5px;
		padding-left: 35px;
		font-size: 17px;
	}
	.schart {
		height: 310px;
	}
	.content-title {
		font-weight: 400;
		font-size: 25px;
		color: #1f2f3d;
	}
</style>
