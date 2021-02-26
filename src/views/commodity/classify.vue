<template>
	<div>
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
</template>

<script>
export default {
	name:"classify"
}
</script>
<style lang="scss" scoped>
</style>
