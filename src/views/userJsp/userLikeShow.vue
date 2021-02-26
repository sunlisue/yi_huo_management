<template>
	<div class="userLikeShow">
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 头部 -->
		<div class="userLikeShow-header">
			<el-input v-model="form.uName" placeholder="用户昵称"></el-input>
			<el-input v-model="form.uName" placeholder="手机号"></el-input>
			    <el-date-picker
			      v-model="dateDouble"
			      type="daterange"
				  value-format="yyyy-MM-dd"
			      range-separator="至"
			      start-placeholder="开始日期"
			      end-placeholder="结束日期">
			    </el-date-picker>
		</div>
	</div>
</template>

<script>
import {selUserAll} from "@/api/userMG.js"
export default {
	name:"userLikeShow",
	data(){
		return{
			dateDouble:"",
			form:{
				uName:"",
				uPhone:"",
				uTime:"",
				fTime:"",
				uShopkeeper:"" //用户角色 0 全部 1 店主 2.普通用户
			}
		}
	},
	watch:{
		dateDouble(res){
			this.form.uTime = res[0];
			this.form.fTime = res[0];
		}
	},
	created() {
		selUserAll()
	}
}
</script>
<style lang="scss" scoped>
.userLikeShow{
	.userLikeShow-header{
		display: flex;
	}
}
</style>
