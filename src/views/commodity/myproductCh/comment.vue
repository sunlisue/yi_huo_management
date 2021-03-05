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
				<el-table-column prop="bId" label="用户头像" width="80">
					<template slot-scope="scope">
					    <el-image style="width: 50px; height: 50px" :src="scope.row.uPic" fit="cover" />
					</template>
				</el-table-column>
				<el-table-column prop="uName" label="评论人" width="100"></el-table-column>
				<el-table-column prop="uPhone" label="评论人手机号"></el-table-column>
				<el-table-column prop="eComment" label="评论内容"></el-table-column>
				<el-table-column prop="eScore" label="评分" width="100"></el-table-column>
				<el-table-column prop="eTime" label="评论时间"></el-table-column>
				<el-table-column label="操作" width="300">
					<template slot-scope="scope">
						<el-button type="warning" @click="tableBtn(scope.row,1)" size="small">回复</el-button>
						<el-button type="danger" @click="tableBtn(scope.row,2)" size="small">删除</el-button>
						<el-button type="success" @click="$router.push({query:{id:scope.row.eId},path:'/myproductCh/commentCh'})" size="small">查看和回复</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- 底部 -->
		<div class="useridcard-footer" v-if="form.current">
			<Pagination @callFather="init" :childMsg="{currentPage:form.current,pageSize:form.size}" />
		</div>
	</div>
</template>

<script>
	import {getcomment,addcommentson,delcomment} from "@/api/userMG.js";
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
			init(options) {
				if(options){
					this.form.current = options.currentPage;
					this.form.size = options.pageSize;
				}
				this.isTableLoading = true;
				getcomment({pid:this.$route.query.id,...this.form}).then(res => {
					this.tableData = res.allComment;
					this.isTableLoading = false;
				});
			},
			// 操作
			tableBtn(data,status){
				if(status == 1){
						this.$prompt('请输入要回复的内容', '提示', {
						  confirmButtonText: '确定',
						  cancelButtonText: '取消',
						  inputPattern: /\S/,
						  inputErrorMessage: '不能为空'
						}).then(({ value }) => {
							addcommentson({esComment:value,eId:data.eId}).then(res=>{
								this.$message.success("回复成功")
							})
						})
				}else if (status == 2){
					this.$confirm('此回复将被删除, 是否继续?', '提示', {
					  confirmButtonText: '确定',
					  cancelButtonText: '取消',
					  type: 'warning'
					}).then(() => {
						delcomment({eId:data.eId}).then(res=>{
							this.$message.success("删除回复成功");
							this.init();
						})
					})
				}
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
