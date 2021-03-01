<template>
	<div class="classify" v-loading="loading">
			<!-- 头部 -->
			<div class="classify-header el-header-normal-margin-top">
				<el-input v-model="form.pName" class="el-input-normal-width el-input-normal-margin-right" placeholder="子类型名称"></el-input>
				<el-button type="primary" size="small" @click="getList('query')">快速查询</el-button>
				<el-button type="primary" size="small" @click="reset">重置</el-button>
				<el-button type="primary" size="small" @click="add">添加子类型</el-button>
				<el-button type="warning" size="small" @click="$parent.cId = null">返回上一页</el-button>
			</div>
			<!-- 身体 -->
			<div class="classify-body el-body-normal-margin-top">
				<el-table :data="tableData" size="mini" stripe style="width: 100%" border tooltip-effect="dark" :header-cell-style="{ background: '#eef1f6', color: '#606266' }" ref="multipleTable">
					<el-table-column type="selection" width="50"></el-table-column>
					<el-table-column type="index" label="序号" width="200"></el-table-column>
					<el-table-column prop="cType" label="子类型名称" width="400"></el-table-column>
					<el-table-column width="550" label="操作" fixed="right">
						<template slot-scope="scope">
							<el-button type="success" @click="tableBtn(scope.row,1)" size="small">修改子类型</el-button>
							<el-button type="danger" @click="tableBtn(scope.row,1)" size="small">删除子类型</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<!-- 底部 -->
			<div class="useridcard-footer" v-if="form.current">
				<Pagination @callFather="getList" :childMsg="{currentPage:form.current,pageSize:form.size}" />
			</div>
	</div>
</template>

<script>
	import {
		selcategoryBypid
	} from "@/api/userMG.js";
	import Pagination from "@/components/Pagination.vue";
	export default {
		components:{Pagination},
		data() {
			return {
				tableData: [],
				loading: false,
				form: {
					size:10,
					current:1,
				},
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
			// 添加子类型
			add(){
				this.$prompt('请输入添加的子类型', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				}).then(({ value }) => {
				  this.$message({
					type: 'success',
					message: '输入了' + value
				  });
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
				this.form.cId = this.$parent.cId;
				this.loading = true;
				selcategoryBypid(this.form).then(res => {
					this.tableData = res.categorys;
					this.loading = false;
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
