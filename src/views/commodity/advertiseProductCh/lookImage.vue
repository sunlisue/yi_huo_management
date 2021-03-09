<template>
	<div class="lookImage">
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="productCh-header el-header-normal-margin-top">
			<el-button type="primary" @click="$router.go(-1)">返回</el-button>
		</div>
		<img :src="$route.query.url" class="el-header-normal-margin-top" />
	</div>
</template>

<script>
export default {
	name:"lookImage"
}
</script>
<style lang="scss" scoped>
</style>
