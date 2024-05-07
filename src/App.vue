<script setup>
	import { RouterView } from "vue-router";
</script>

<template>
	<el-config-provider :locale="zhCn">
		<RouterView />
	</el-config-provider>
</template>

<style>
	@import url("./assets/css/main.css");
</style>
