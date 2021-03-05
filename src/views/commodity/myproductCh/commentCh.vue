<template>
	<div class="comment">
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="comment-header el-header-normal-margin-top">
			  <el-button type="primary" @click="$router.go(-1)">返回</el-button>
		</div>
		<div class="el-header-normal-margin-top">
			<el-table :max-height="700" class="el-header-normal-margin-top" size="mini" id="table" :data="tableData" v-loading="isTableLoading"
			 border :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
				<el-table-column type="selection" width="40" fixed></el-table-column>
				<el-table-column type="index" label="序号" width="50" fixed></el-table-column>
				<el-table-column prop="uName" label="回复人" width="120"></el-table-column>
				<el-table-column prop="eComment" label="回复内容"></el-table-column>
				<el-table-column prop="esTime" label="回复时间"></el-table-column>
				<el-table-column label="操作" width="100">
					<template slot-scope="scope">
						<el-button type="danger" @click="tableBtn(scope.row,1)" size="small">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- 底部 -->
		<!-- 		<div class="useridcard-footer" v-if="form.current">
			<Pagination @callFather="init" :childMsg="{currentPage:form.current,pageSize:form.size}" />
		</div> -->
	</div>
</template>

<script>
	import {getcommentson,delcommentson} from "@/api/userMG.js";
	import classUtil from "@/api/classUtil";
	import Pagination from "@/components/Pagination.vue";
	export default {
		name: "comment",
		components: {
			Pagination
		},
		data() {
			return {
				classUtil: classUtil,
				tableData: [],
				isTableLoading: false, //表格加载中
				dialogVisible: false,
				imageUrl: "",
				form: {
					current: 1,
					size: 5
				},
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			//初始化
			init() {
				this.isTableLoading = true;
				getcommentson({eId:this.$route.query.id}).then(res=>{
					this.tableData = res.allCommentSon;
					this.isTableLoading = false;
				})
			},
			// 操作
			tableBtn(data,status){
				this.$confirm('此回复将被删除, 是否继续?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
					delcommentson({esId:data.esId}).then(res=>{
						this.$message.success("删除回复成功");
						this.init();
					})
				})
			}
		},
	}
</script>
<style lang="scss" scoped>
	.comment {
		.add-btn {
			padding-left: 10px;
			padding-bottom: 10px;
		}
		.lunbo-table-img {
			height: 100px;
		}
	}
</style>
