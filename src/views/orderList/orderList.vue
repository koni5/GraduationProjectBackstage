<template>
	<el-button type="primary" @click="admit">允许浏览器播报</el-button>
	<el-row :gutter="20" style="margin-bottom: 15px">
		<el-col :span="2"
			><div class="grid-content ep-bg-purple" />
			<p style="padding-top: 5px">日期查询:</p></el-col
		>
		<el-col :span="8"
			><div class="grid-content ep-bg-purple" />
			<el-date-picker
				@change="onChange"
				v-model="date"
				type="daterange"
				unlink-panels
				range-separator="To"
				start-placeholder="Start date"
				end-placeholder="End date"
				:shortcuts="shortcuts"
			/>
		</el-col>
		<el-col :span="2"
			><div class="grid-content ep-bg-purple" />
			<p style="padding-top: 5px">订单号查询:</p></el-col
		>
		<el-col :span="6"
			><div class="grid-content ep-bg-purple" />
			<el-input
				v-model="params.number"
				style="width: 240px"
				placeholder="Please input"
				clearable
		/></el-col>
		<el-col :span="2"
			><div class="grid-content ep-bg-purple" />
			<el-button type="primary" @click="getOrders()"
				>确认查询</el-button
			></el-col
		>
	</el-row>

	<el-tabs
		@tabClick="switched"
		tab-position="bottom"
		type="border-card"
		class="demo-tabs"
	>
		<el-tab-pane label="全部订单" tabindex="" style="color: #409eff"
			>全部订单x{{ orderSum }}</el-tab-pane
		>
		<el-tab-pane label="待接单" style="color: #409eff"
			>待接单x{{ orderSum }}</el-tab-pane
		>
		<el-tab-pane label="制作中" style="color: #409eff"
			>制作中x{{ orderSum }}</el-tab-pane
		>
		<el-tab-pane label="已完成" style="color: #409eff"
			>已完成x{{ orderSum }}</el-tab-pane
		>
		<el-tab-pane label="已取消" style="color: #409eff"
			>已取消x{{ orderSum }}</el-tab-pane
		>
		<el-tab-pane label="已退款" style="color: #409eff"
			>已退款x{{ orderSum }}</el-tab-pane
		>
	</el-tabs>
	<el-table
		table-layout="auto"
		fit="true"
		:data="orderTable"
		:default-sort="{ prop: 'orderTime', order: 'descending' }"
		style="width: 100%"
	>
		<el-table-column prop="orderTime" label="下单时间" sortable width="200">
			<template #default="scope">
				{{ new Date(scope.row.orderTime).toLocaleString() }}
			</template></el-table-column
		>
		<el-table-column prop="number" label="订单号" width="200" align="center" />
		<el-table-column prop="name" label="用户名" width="200" align="center" />
		<el-table-column
			prop="amount"
			label="实收金额(￥)"
			width="200"
			align="center"
		/>
		<el-table-column type="index" label="操作" align="left" width="500">
			<template #default="scope">
				<el-button size="small" @click="getDetail(scope.row)"> 详情</el-button>
				<el-button
					@click="receiveOrder(scope.row.id)"
					v-if="scope.row.status === 2"
					size="small"
					type="danger"
				>
					接单
				</el-button>
				<el-button
					@click="completeOrder(scope.row.id, scope.row.number)"
					v-else-if="scope.row.status === 3"
					size="small"
					type="danger"
				>
					完成
				</el-button>
				<el-button
					@click="(rejectFormVisible = true), (rejectOrderId = scope.row.id)"
					v-if="scope.row.status > 1 && scope.row.status < 4"
					size="small"
					type="danger"
				>
					拒单
				</el-button>
			</template>
		</el-table-column>
	</el-table>
	<div class="pagination">
		<el-pagination
			v-model:current-page="currentPage"
			hide-on-single-page="true"
			background
			layout="prev, pager, next"
			:total="orderSum"
		/>
	</div>
	<!--订单详情弹窗-->
	<el-dialog
		v-model="dialogVisible"
		title="订单信息"
		width="53%"
		class="order-dialog"
	>
		<el-scrollbar style="height: 100%">
			<div class="order-top">
				<div>
					<div style="display: inline-block">
						<label style="font-size: 16px">订单号：</label>
						<div class="order-num">
							{{ orderDetail.number }}
						</div>
					</div>
					<div
						v-if="orderDetail.status === 5"
						style="display: inline-block"
						class="order-status status3"
					>
						已取消
					</div>
					<div
						v-else-if="orderDetail.status === 4"
						style="display: inline-block"
						class="order-status"
					>
						已完成
					</div>
					<div
						v-else-if="orderDetail.status === 3"
						style="display: inline-block"
						class="order-status"
					>
						制作中
					</div>
					<div
						v-else-if="orderDetail.status === 2"
						style="display: inline-block"
						class="order-status"
					>
						待接单
					</div>
					<div
						v-else
						style="display: inline-block"
						class="order-status status3"
					>
						已退款
					</div>
				</div>
				<p><label>下单时间：</label>{{ orderDetail.orderTime }}</p>
			</div>

			<div class="order-middle">
				<div class="user-info">
					<div class="user-info-box">
						<div class="user-name">
							<label>用户名：</label>
							<span>{{ orderDetail.name }}</span>
						</div>
					</div>
					<div
						v-if="orderDetail.status === 5"
						class="user-remark"
						:class="{ orderCancel: orderDetail.status === 5 }"
					>
						<div>取消原因</div>
						<span>
							{{ orderDetail.cancelReason }}
						</span>
					</div>
					<div class="user-remark">
						<div>备注</div>
						<span>
							{{ orderDetail.remark || "无" }}
						</span>
					</div>
					<div class="reject" v-if="orderDetail.status === 6">
						<div>拒单原因</div>
						<span>
							{{ orderDetail.rejectionReason }}
						</span>
					</div>
				</div>

				<div class="dish-info">
					<div class="dish-label">菜品</div>
					<div class="dish-list">
						<div :key="index" class="dish-item">
							<div class="dish-item-box">
								<span class="dish-name">{{ orderDetail.orderDishes }}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</el-scrollbar>
	</el-dialog>
	<!-- 拒单退款原因对话框 -->
	<el-dialog v-model="rejectFormVisible" title="拒单原因填写" width="500">
		<el-input type="textarea" v-model="rejectReason" autocomplete="off" />
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="rejectFormVisible = false">取消</el-button>
				<el-button type="primary" @click="confirmReject"> 确认拒单</el-button>
			</div>
		</template>
	</el-dialog>
</template>
<script setup>
	import { onMounted, onUnmounted, ref, watch } from "vue";
	import {
		getOrdersAPI,
		receiveOrderAPI,
		completeOrderAPI,
		rejectOrderAPI,
	} from "@/services/order.js";
	import { useEmployeeStore } from "@/stores/index.js";
	import { WebSocketService } from "@/services/webSocketService";
	import { ElMessage, ElNotification } from "element-plus";
	//用来格式化日期的库函数
	import { format } from "date-fns";
	//选择日期后触发函数
	const onChange = () => {
		if (date.value !== null) {
			params.value.beginTime = format(date.value[0], "yyyy-MM-dd HH:mm:ss");
			params.value.endTime = format(date.value[1], "yyyy-MM-dd HH:mm:ss");
		} else {
			params.value.beginTime = null;
			params.value.endTime = null;
		}
	};
	//拒单原因对话框显示
	let rejectFormVisible = ref(false);
	//拒单原因
	let rejectReason = ref("");
	//退款订单id
	let rejectOrderId = ref();
	//拒单
	const confirmReject = async () => {
		// console.log(rejectOrderId.value)
		if (rejectReason.value === "") {
			// 触发信息消息
			ElMessage({
				message: "拒单原因不能为空",
				type: "error",
				duration: 2000, // 持续时间，2秒后自动关闭
			});
		} else {
			await rejectOrderAPI(rejectOrderId.value, rejectReason.value);
			rejectFormVisible = false;
			getOrders(status.value);
		}
	};
	//允许播放音乐
	const admit = () => {
		new Audio("/src/assets/mp3/preview.mp3").play();
	};
	//店员信息仓库
	let employeeStore = useEmployeeStore();
	//WebSocket配置
	const shopId = employeeStore.profile.shopId;
	const webSocketService = new WebSocketService(
		`ws://localhost:8080/ws/${shopId}`
	);
	const connectWebSocket = () => {
		webSocketService.connect();
	};
	const disconnectWebSocket = () => {
		webSocketService.disconnect();
	};
	//当前tab的状态
	let status = ref(null);
	//当前页数
	let currentPage = ref(1);
	//监听当前页数变化
	const watchCurrentPage = watch(currentPage, (newVal, oldVal) => {
		params.value.page = newVal;
		getOrders();
	});
	//弹窗
	let dialogVisible = ref(false);
	//总条数
	let orderSum = ref();
	//存储订单列表的变量
	let orderTable = ref();
	//存储返回的订单信息
	let orderData = ref();
	//订单详情信息
	let orderDetail = ref();
	//获取订单查询的参数
	let params = ref({
		page: 1,
		pageSize: 10,
		number: null,
		status: undefined,
		shopId: employeeStore.profile.shopId,
		beginTime: null,
		endTime: null,
	});
	//获取订单列表的函数
	const getOrders = async () => {
		// 过滤掉空参数
		const filteredParams = Object.fromEntries(
			Object.entries(params.value).filter(
				([key, value]) => value !== null && value !== "" && value !== undefined
			)
		);
		const queryString = new URLSearchParams(filteredParams).toString();
		let res = await getOrdersAPI(queryString);
		// console.log(res.data)
		orderData = res.data.data;
		orderTable.value = orderData.records;
		orderSum.value = orderData.total;
		// console.log(orderSum.value)
	};
	//获取订单详情
	const getDetail = (val) => {
		// console.log(val)
		orderDetail.value = val;
		dialogVisible.value = true;
		// console.log(orderDetail.value);
	};
	//接单
	const receiveOrder = async (param) => {
		// console.log(param);
		await receiveOrderAPI(param);
		getOrders(status.value);
		// 使用 Element Plus 通知显示消息
		ElNotification({
			title: "接单成功",
			type: "success",
		});
	};
	//订单已完成
	const completeOrder = async (orderId, orderNumber) => {
		// console.log(orderId + "##" + orderNumber);
		await completeOrderAPI(orderId);
		getOrders(status.value);
		ElNotification({
			title: "订单完成",
			message: "订单:" + orderNumber + "完成",
			type: "success", // 你可以选择 'success', 'warning', 'error', 'info'
		});
	};

	//切换选项卡
	const switched = (context) => {
		let statusName = context.props.label;
		// console.log(context.props.label)
		if (statusName === "全部订单") status.value = null;
		else if (statusName === "待接单") status.value = 2;
		else if (statusName === "制作中") status.value = 3;
		else if (statusName === "已完成") status.value = 4;
		else if (statusName === "已取消") status.value = 5;
		else status.value = 6;
		params.value.status = status.value;
		getOrders();
	};
	//选择时间段
	const date = ref([]);
	onMounted(() => {
		getOrders();
	});
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
	onMounted(() => {
		connectWebSocket();
	});
	onUnmounted(() => {
		disconnectWebSocket();
	});
</script>
<style lang="scss" scoped>
	.status3 {
		background: #f56c6c;
	}

	.order-middle {
		.user-info {
			min-height: 140px;
			background: #fbfbfa;
			margin-top: 23px;

			padding: 20px 43px;
			color: #333;

			.user-info-box {
				min-height: 55px;
				display: flex;
				flex-wrap: wrap;

				.user-name {
					flex: 67%;
				}

				.user-phone {
					flex: 33%;
				}

				.user-getTime {
					margin-top: 14px;
					flex: 80%;

					label {
						margin-right: 3px;
					}
				}

				label {
					margin-right: 17px;
					color: #666;
				}

				.user-address {
					margin-top: 14px;
					flex: 80%;

					label {
						margin-right: 30px;
					}
				}
			}

			.orderCancel {
				background: #ffffff;
				border: 1px solid #b6b6b6;

				div {
					padding: 0 10px;
					background-color: #e5e4e4;
				}

				span {
					color: #f56c6c;
				}
			}

			.user-remark {
				min-height: 43px;
				line-height: 43px;
				background: #fffbf0;
				border: 1px solid #fbe396;
				border-radius: 4px;
				margin-top: 10px;
				padding: 6px;
				display: flex;
				align-items: center;

				div {
					display: inline-block;
					min-width: 53px;
					height: 32px;
					background: #fbe396;
					border-radius: 4px;
					text-align: center;
					line-height: 32px;
					color: #333;
					margin-right: 30px;
					// padding: 12px 6px;
				}

				span {
					color: #f2a402;
					line-height: 1.15;
				}
			}
			.reject {
				min-height: 43px;
				line-height: 43px;
				background: #fefefe;
				border: 1px solid #e44d26;
				border-radius: 4px;
				margin-top: 10px;
				padding: 6px;
				display: flex;
				align-items: center;

				div {
					display: inline-block;
					min-width: 53px;
					height: 32px;
					background: #e06c75;
					border-radius: 4px;
					text-align: center;
					line-height: 32px;
					color: #333;
					margin-right: 30px;
					// padding: 12px 6px;
				}

				span {
					color: #e06c75;
					line-height: 1.15;
				}
			}

			.orderCancel {
				background: #ffffff;
				border: 1px solid #b6b6b6;

				div {
					padding: 0 10px;
					background-color: #e5e4e4;
				}

				span {
					color: #f56c6c;
				}
			}
		}

		.dish-info {
			// min-height: 180px;
			display: flex;
			flex-wrap: wrap;
			padding: 20px 40px;
			border-bottom: 1px solid #e7e6e6;

			.dish-label {
				color: #666;
			}

			.dish-list {
				flex: 80%;
				display: flex;
				flex-wrap: wrap;

				.dish-item {
					flex: 50%;
					margin-bottom: 14px;
					color: #333;

					.dish-item-box {
						display: inline-block;
					}
				}
			}

			.dish-label {
				margin-right: 65px;
			}

			.dish-all-amount {
				flex: 1;
				padding-left: 92px;
				margin-top: 10px;

				label {
					color: #333333;
					font-weight: bold;
					margin-right: 5px;
				}

				span {
					color: #f56c6c;
				}
			}
		}
	}

	.order-top {
		// height: 80px;
		border-bottom: 1px solid #e7e6e6;
		padding-bottom: 26px;
		padding-left: 22px;
		padding-right: 22px;
		// margin: 0 30px;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.order-status {
			width: 57.25px;
			height: 27px;
			background: #333333;
			border-radius: 13.5px;
			color: white;
			margin-left: 19px;
			text-align: center;
			line-height: 27px;
		}

		.status3 {
			background: #f56c6c;
		}

		p {
			color: #333;

			label {
				color: #666;
			}
		}

		.order-num {
			font-size: 16px;
			color: #2a2929;
			font-weight: bold;
			display: inline-block;
		}
	}

	.order-dialog {
		.el-dialog {
			max-height: 764px !important;
			display: flex;
			flex-direction: column;
			margin: 0 !important;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			max-height: calc(100% - 30px);
			max-width: calc(100% - 30px);
		}

		.el-dialog__body {
			height: 520px !important;
		}
	}

	.pagination {
		padding-top: 20px;
		width: 500px;
		margin: 0 auto;
	}

	.demo-date-picker {
		display: flex;
		padding: 0;
		flex-wrap: wrap;
	}

	.demo-date-picker .block {
		padding: 10px 0;
		text-align: left;
		border-right: solid 1px var(--el-border-color);
		flex: 1;
	}

	.demo-date-picker .block:last-child {
		border-right: none;
	}

	.demo-date-picker .demonstration {
		display: block;
		color: var(--el-text-color-secondary);
		font-size: 14px;
		margin-bottom: 20px;
	}

	.demo-tabs {
		padding: 15px 0 0;
		color: #6b778c;
		font-size: 40px;
		font-weight: 600;
	}

	.el-tabs--right .el-tabs__content,
	.el-tabs--left .el-tabs__content {
		height: 100%;
	}
</style>
