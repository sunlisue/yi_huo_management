<template>
	<div class="classify" v-loading="loading">
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
		</el-breadcrumb>
		<div v-if="!cId">
			<!-- 头部 -->
			<div class="classify-header el-header-normal-margin-top">
				<el-input v-model="form.pName" class="el-input-normal-width el-input-normal-margin-right" placeholder="类型名称"></el-input>
				<label class="el-input-normal-margin-right">
					创建日期:
					<el-date-picker v-model="dateDouble" type="daterange" value-format="yyyy-MM-dd" range-separator="至"
					 start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
				</label>
				<el-button type="primary" size="small" @click="getList('query')">快速查询</el-button>
				<el-button type="primary" size="small" @click="reset">重置</el-button>
				<el-button type="primary" size="small" @click="add">添加类型</el-button>
			</div>
			<!-- 身体 -->
			<div class="classify-body el-body-normal-margin-top">
				<el-table :data="tableData" size="mini" stripe style="width: 100%" border tooltip-effect="dark" :header-cell-style="{ background: '#eef1f6', color: '#606266' }" ref="multipleTable">
					<el-table-column type="selection" width="50"></el-table-column>
					<el-table-column type="index" label="序号" width="50"></el-table-column>
					<el-table-column prop="cType" label="产品类型名称" width="350"></el-table-column>
					<el-table-column prop="cTime" label="产品类型创建时间"></el-table-column>
					<el-table-column width="550" label="操作" fixed="right">
						<template slot-scope="scope">
							<el-button type="danger" @click="tableBtn(scope.row,1)" size="small">修改类型</el-button>
							<el-button type="danger" @click="tableBtn(scope.row,1)" size="small">已隐藏</el-button>
							<el-button type="danger" @click="tableBtn(scope.row,2)" size="small">推荐宣传</el-button>
							<el-button type="danger" @click="tableBtn(scope.row,1)" size="small">删除</el-button>
							<el-button type="warning" @click="cId = scope.row.cId" size="small">查看子分类</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<!-- 底部 -->
			<div class="useridcard-footer" v-if="form.current">
				<Pagination @callFather="getList" :childMsg="{currentPage:form.current,pageSize:form.size}" />
			</div>
		</div>
		<div v-else>
			<classifyCh />
		</div>
	</div>
</template>

<script>
	import {
		selAllcategory
	} from "@/api/userMG.js";
	import Pagination from "@/components/Pagination.vue";
	import classifyCh from "@/components/classify/classifyCh.vue";
	export default {
		name: "classify",
		components:{Pagination,classifyCh},
		data() {
			return {
				dateDouble: "",
				tableData: [],
				loading: false,
				cId:null,
				form: {
					pName: "", //名称
					startTime: "", //开始日期
					stopTime: "", // 结束日期
					pType: "", //分类
					pBrandid: "", //品牌
					size:10,
					current:1,
				},
			}
		},
		watch: {
			dateDouble(res){
				this.form.startTime = res[0];
				this.form.stopTime = res[1];
			}
		},
		created() {
			this.getList();
		},
		methods: {
			// 表格里的点击事件
			tableBtn(data, status) {
				let context;
				console.log(data, status);
				if (status == 1) context = "警告！是否要冻结该用户！";
				else context = "是否要添加该用户的分销员身份！";
				
				this.$confirm(context, "提示", {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if (status == 1) {
						this.$message.success("已冻结！")
					} else {
						this.$message.success("已添加！")
					}
				})
			},
			// 获取列表
			getList(options) {
				if(options == "query"){  //快速查找
					this.form.current = 0;
					this.form.size = 0;
				}else if(options){
					this.form.current = options.currentPage;
					this.form.size = options.pageSize;
				}
				this.loading = true;
				selAllcategory(this.form).then(res => {
					this.tableData = res.productDetails;
					this.loading = false;
				})
			},
			add(){
				this.$prompt('请输入添加的类型', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				}).then(({ value }) => {
				  this.$message({
					type: 'success',
					message: '输入了' + value
				  });
				})
			},
			// 重置
			reset() {
				for (let i in this.form) {
					this.form[i] = "";
				};
				this.form.current = 1;
				this.form.size = 10;
				this.getList();
			}
		}
	}
</script>
<style lang="scss" scoped>
	.classify {
		.classify-body {}

		.classify-header {
			display: flex;
			flex-wrap: wrap;
		}
	}
</style>
