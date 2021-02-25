<template>
	<div>
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>产品列表</el-breadcrumb-item>
		</el-breadcrumb>
		
	</div>
</template>

<script>
export default {
	name:"product"
}
</script>
<style lang="scss" scoped>
</style>
