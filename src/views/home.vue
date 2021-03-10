<template>
	<div class="home">
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item>首页</el-breadcrumb-item>
		</el-breadcrumb>
		<iframe src="../static/home.html" class="home-if el-header-normal-margin-top"></iframe>
	</div>
</template>

<script>
export default {
	name:"home"
}
</script>
<style lang="scss" scoped>
.home{
	.home-if{
		width: 100%;
		height: 80vh;
	}
}
</style>
