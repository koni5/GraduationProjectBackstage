<template>
	<div class="block">
		<span class="demonstration" style="font-size: 22px; padding-top: 20px"
			>选择查询的日期范围
		</span>
		<el-date-picker
			@change="onChange"
			default-value="2024-4-7"
			v-model="dateValue"
			value-format="YYYY-MM-DD"
			type="daterange"
			unlink-panels
			range-separator="To"
			start-placeholder="Start date"
			end-placeholder="End date"
			:shortcuts="shortcuts"
			size="large"
		/>
	</div>
	<el-row>
		<el-col :span="12" style="padding-right: 10px">
			<Turnover :turnoverData="turnoverData"></Turnover
		></el-col>
		<el-col :span="12"> <Order :ordersData="ordersData"></Order></el-col>
	</el-row>
</template>
<script setup>
	import { onMounted, ref } from "vue";
	import Turnover from "./components/turnover.vue";
	import Order from "./components/order.vue";
	import { getTurnoverAPI, getOrdersAPI } from "@/services/statistics.js";
	import { format } from "date-fns";
	import _ from "lodash";

	const dateValue = ref([]);
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
	//营业额表的显示数据
	let turnover_x = ref([]);
	let turnover_y = ref([]);
	let turnoverData = ref([]);
	//获取营业额表的数据
	const getTurnover = async () => {
		let res = await getTurnoverAPI(dateValue.value[0], dateValue.value[1]);
		// console.log(res)
		turnover_x.value = res.data.data.dateList.split(",");
		turnover_y.value = res.data.data.turnoverList.split(",");
		turnoverData.value = _.zip(turnover_x.value, turnover_y.value);
	};
	//存放订单统计数据的变量
	let ordersData = ref();
	//获取订单统计表数据
	const getOrders = async () => {
		let res = await getOrdersAPI(dateValue.value[0], dateValue.value[1]);
		// console.log(res.data.data);
		ordersData.value = res.data.data;
	};
	//日期修改触发函数
	const onChange = () => {
		getTurnover();
		getOrders();
	};
	onMounted(() => {
		//初始默认展示上一周的营业额数据
		dateValue.value[0] = format(shortcuts[0].value()[0], "yyyy-MM-dd");
		dateValue.value[1] = format(shortcuts[0].value()[1], "yyyy-MM-dd");
		getTurnover();
		getOrders();
	});
</script>
<style scoped>
	.page {
		display: flex;
	}
	.block {
		margin-right: 200px;
		padding: 30px 0;
		text-align: center;
		border-right: solid 1px var(--el-border-color);
		flex: 1;
	}
</style>
