<template>
	<el-row :gutter="20">
		<el-col :span="6">
			<div class="statistic-card">
				<el-statistic :value="outputTurnover">
					<template #title>
						<div
							style="
								display: inline-flex;
								align-items: center;
								font-size: 35px;
								color: #409eff;
							"
						>
							营业额(￥)
						</div>
					</template>
				</el-statistic>
			</div>
		</el-col>
		<el-col :span="6">
			<div class="statistic-card">
				<el-statistic :value="outputValidOrderCount">
					<template #title>
						<div
							style="
								display: inline-flex;
								align-items: center;
								font-size: 35px;
								color: #409eff;
							"
						>
							有效订单
						</div>
					</template>
				</el-statistic>
			</div>
		</el-col>
		<el-col :span="6">
			<div class="statistic-card">
				<el-statistic
					:value="props.businessData?.orderCompletionRate"
					title="New transactions today"
				>
					<template #title>
						<div
							style="
								display: inline-flex;
								align-items: center;
								font-size: 35px;
								color: #409eff;
							"
						>
							订单完成率
						</div>
					</template>
				</el-statistic>
			</div>
		</el-col>
		<el-col :span="6">
			<div class="statistic-card">
				<el-statistic
					:value="props.businessData?.unitPrice"
					title="New transactions today"
				>
					<template #title>
						<div
							style="
								display: inline-flex;
								align-items: center;
								font-size: 35px;
								color: #409eff;
							"
						>
							平均客单价
						</div>
					</template>
				</el-statistic>
			</div>
		</el-col>
	</el-row>
</template>

<script setup>
	import { ref, watchEffect } from "vue";
	import { useTransition } from "@vueuse/core";
	const props = defineProps(["businessData"]);
	let turnover = ref(0);
	let outputTurnover = useTransition(turnover, {
		duration: 1500,
	});
	let validOrderCount = ref(0);
	let outputValidOrderCount = useTransition(validOrderCount, {
		duration: 1500,
	});
	// 监听父组件传来的数据
	watchEffect(() => {
		let newTurnover = props.businessData?.turnover;
		if (newTurnover != null) {
			turnover.value = newTurnover; // 当 props 更新时，更新 turnover
		}
	});
	// 监听父组件传来的数据
	watchEffect(() => {
		let newValidOrderCount = props.businessData?.validOrderCount;
		if (newValidOrderCount != null) {
			validOrderCount.value = newValidOrderCount; // 当 props 更新时，更新 validOrderCount
		}
	});
</script>

<style scoped>
	:global(h2#card-usage ~ .example .example-showcase) {
		background-color: var(--el-fill-color) !important;
	}

	.el-statistic {
		--el-statistic-content-font-size: 28px;
	}

	.statistic-card {
		height: 80%;
		padding: 20px;
		border-radius: 12px;
		background-color: var(--el-bg-color-overlay);
	}
</style>
