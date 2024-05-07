<template>
	<div class="sidebar">
		<el-menu
			class="sidebar-el-menu"
			:default-active="onRoutes"
			:collapse="sidebar.collapse"
			:background-color="sidebar.bgColor"
			:text-color="sidebar.textColor"
            router
		>
			<div v-for="item in menuData">
				<div>
					<el-menu-item
						:index="item.index"
						:key="item.index"
						v-permiss="item.id"
					>
						<el-icon>
							<component :is="item.icon"></component>
						</el-icon>
						<template #title>{{ item.title }}</template>
					</el-menu-item>
				</div>
			</div>
		</el-menu>
	</div>
</template>

<script setup>
	import { computed } from "vue";
	import { useSidebarStore } from "@/stores";
	import { useRoute } from "vue-router";
	import { menuData } from "@/components/menu";
	const route = useRoute();
	const onRoutes = computed(() => {
		return route.path;
	});
	const sidebar = useSidebarStore();
</script>

<style scoped>
	.sidebar {
		display: block;
		position: absolute;
		left: 0;
		top: 70px;
		bottom: 0;
		overflow-y: scroll;
	}

	.sidebar::-webkit-scrollbar {
		width: 0;
	}

	.sidebar-el-menu:not(.el-menu--collapse) {
		width: 250px;
	}

	.sidebar-el-menu {
		min-height: 100%;
	}
</style>
