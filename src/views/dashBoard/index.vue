<template>
	<div style="display: flex">
		<DateTimeNow></DateTimeNow>
		<div style="margin-left: 700px; margin-top: 10px">
			<el-button type="success" @click="exportExcel">导出Excel</el-button>
		</div>
	</div>
	<OverView :businessData="businessData"></OverView>
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
	import OverView from "./components/overView.vue";
	import DateTimeNow from "./components/dateTimeNow.vue";
	import {
		getTurnoverAPI,
		getOrdersAPI,
		getExcelAPI,
	} from "@/services/statistics.js";
	import { getBusinessDataAPI } from "@/services/overview.js";
	import { format } from "date-fns";
	import _ from "lodash";

	//导出营业数据报表
	const exportExcel = () => {
		getExcelAPI()
			.then((response) => {
				// 创建一个 Blob 对象
				const blob = new Blob([response.data], {
					type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
				});

				// 创建一个临时链接
				const url = window.URL.createObjectURL(blob);
				const link = document.createElement("a");
				link.href = url;
				link.download = "shopOperationReport.xlsx"; // 下载的文件名
				document.body.appendChild(link);
				link.click();

				// 清理链接和 DOM 元素
				document.body.removeChild(link);
				window.URL.revokeObjectURL(url);
			})
			.catch((error) => {
				console.error("下载失败:", error);
			});
	};
	//存储起始和结束日期
	const dateValue = ref([]);
	//日期组件的配置
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
	//存储今日数据
	let businessData = ref();
	//获取今日数据
	const getBusinessData = async () => {
		let res = await getBusinessDataAPI();
		// console.log(res.data.data);
		businessData.value = res.data.data;
	};
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
		//初始默认展示上一周的营业额数据(图表)
		dateValue.value[0] = format(shortcuts[0].value()[0], "yyyy-MM-dd");
		dateValue.value[1] = format(shortcuts[0].value()[1], "yyyy-MM-dd");
		getTurnover();
		getOrders();
		getBusinessData();
	});
</script>
<style scoped>
	.page {
		display: flex;
	}
	.block {
		margin-top: 50px;
		margin-right: 200px;
		padding: 20px 0;
		text-align: left;
		border-right: solid 1px var(--el-border-color);
		flex: 1;
	}
</style>
