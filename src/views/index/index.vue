<template>
	<div class="wrapper">
		<Header></Header>
		<SideBar></SideBar>
		<div class="content-box" :class="{ 'content-collapse': sidebar.collapse }">
			<div class="content">
				<router-view> </router-view>
			</div>
		</div>
	</div>
</template>
<script setup>
	import { useSidebarStore } from "@/stores";
	import Header from "../../components/header.vue";
	import SideBar from "../../components/sidebar.vue";
	const sidebar = useSidebarStore();
</script>
<style scoped>
	.wrapper {
		height: 100vh;
		overflow: hidden;
	}
	.content-box {
		position: absolute;
		left: 250px;
		right: 0;
		top: 70px;
		bottom: 0;
		padding-bottom: 30px;
		-webkit-transition: left 0.3s ease-in-out;
		transition: left 0.3s ease-in-out;
		background: #eef0fc;
		overflow: hidden;
	}

	.content {
		width: auto;
		height: 100%;
		padding: 20px;
		overflow-y: scroll;
		box-sizing: border-box;
	}

	.content::-webkit-scrollbar {
		width: 0;
	}

	.content-collapse {
		left: 65px;
	}
</style>
