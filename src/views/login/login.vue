<template>
	<div class="login-bg">
		<div class="login-container">
			<div class="login-header">
				<img class="logo mr10" src="../../assets//img/login/login.png" alt="" />
				<div class="login-title">后台管理系统</div>
			</div>
			<el-form :model="param" :rules="rules" ref="login" size="large">
				<el-form-item prop="username">
					<el-input v-model="param.username" placeholder="用户名">
						<template #prepend>
							<el-icon>
								<User />
							</el-icon>
						</template>
					</el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input v-model="param.password" type="password" placeholder="密码">
						<template #prepend>
							<el-icon>
								<Lock />
							</el-icon>
						</template>
					</el-input>
				</el-form-item>
				<el-button
					class="login-btn"
					type="primary"
					size="large"
					@click="submitForm(login)"
					>登录
				</el-button>
			</el-form>
		</div>
	</div>
</template>

<script setup>
	import { ElMessage } from "element-plus";
	import { useEmployeeStore } from "@/stores";
	import { loginAPI } from "../../services/employee";
	import { ref } from "vue";
	import { useRouter } from "vue-router";
	//获取路由实例
	let router = useRouter();
	//店员仓库信息
	const employeeStore = useEmployeeStore();
	//登录表达组件实例
	let login = ref();
	//账号密码参数对象
	let param = ref({
		username: "",
		password: "",
	});
	//规则
	const rules = {
		username: [
			{
				required: true,
				message: "请输入用户名",
				trigger: "blur",
			},
		],
		password: [{ required: true, message: "请输入密码", trigger: "blur" }],
	};
	//存储店员信息的变量
	let employeeInfo = ref();
	//登录
	const submitForm = async (formEl) => {
		if (!formEl) return;
		await formEl.validate(async (valid, fields) => {
			if (valid) {
				let res = await loginAPI(param.value);
				// console.log(res);
				employeeInfo.value = res.data.data;
				if (employeeInfo.value.code === 0) {
					ElMessage.error(employeeInfo.value.message);
				} else {
					//持久化存储
					employeeStore.setProfile(employeeInfo.value);
					ElMessage.success("登录成功");
					await router.push("/dashBoard");
				}
			} else {
				ElMessage.error("请输入完整信息");
			}
		});
	};
</script>

<style lang="scss" scoped>
	.login-bg {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100vh;
		background: url(../../assets/img/login.jpg) center/cover no-repeat;
	}

	.login-header {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 40px;
	}

	.logo {
		width: 35px;
	}

	.login-title {
		font-size: 22px;
		color: #333;
		font-weight: bold;
	}

	.login-container {
		width: 450px;
		border-radius: 5px;
		background: #fff;
		padding: 40px 50px 50px;
		box-sizing: border-box;
	}

	.pwd-tips {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		margin: -10px 0 10px;
		color: #787878;
	}

	.pwd-checkbox {
		height: auto;
	}

	.login-btn {
		display: block;
		width: 100%;
	}

	.login-tips {
		font-size: 12px;
		color: #999;
	}

	.login-text {
		display: flex;
		align-items: center;
		margin-top: 20px;
		font-size: 14px;
		color: #787878;
	}
</style>
