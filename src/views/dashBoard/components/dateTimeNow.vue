<!-- src/components/DateTimeDisplay.vue -->
<template>
	<div class="page">
		<h2 class="text">今日数据</h2>
		<p class="time">{{ currentDateTime }}</p>
	</div>
</template>

<script setup>
	import { ref, onMounted, onUnmounted } from "vue";

	// 创建一个响应式变量来保存当前日期和时间
	const currentDateTime = ref("");

	// 定义一个函数来更新当前日期和时间
	const updateDateTime = () => {
		const now = new Date();
		// 格式化日期和时间
		const formattedDateTime = now.toLocaleString(); // 包含日期和时间的字符串
		currentDateTime.value = formattedDateTime;
	};

	// 当组件挂载时，设置一个定时器
	onMounted(() => {
		// 更新一次初始值
		updateDateTime();

		// 定时器每秒更新一次
		const interval = setInterval(updateDateTime, 1000);

		// 当组件卸载时，清除定时器
		onUnmounted(() => {
			clearInterval(interval);
		});
	});
</script>
<style scoped>
	.page {
		display: flex;
		margin-bottom: 20px;
		.text{
			font-size: 35px;
			color: #014077;
		}
		.time{
			margin-left: 15px;
			padding-top: 10px;
			font-size: 30px;
			color: #324157;
		}
	}
</style>
