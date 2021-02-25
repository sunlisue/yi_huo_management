<template>
	<div>
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>店主审核</el-breadcrumb-item>
		</el-breadcrumb>
		
	</div>
</template>

<script>
export default {
	name:"ManagerUserLikeShow"
}
</script>
<style lang="scss" scoped>
</style>
