<template>
	<div class="logisticsshowAll" v-loading="loading">
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
		</el-breadcrumb>
		<div>
			<!-- 头部 -->
			<div class="logisticsshowAll-header el-header-normal-margin-top">
				<el-input v-model="form.lName" class="el-input-normal-width el-input-normal-margin-right" placeholder="物流名称"></el-input>
				<el-button type="primary" size="small" @click="getList('query')">快速查询</el-button>
				<el-button type="primary" size="small" @click="reset">重置</el-button>
				<el-button type="primary" size="small" @click="add(1)">添加物流</el-button>
			</div>
			<!-- 身体 -->
			<div class="logisticsshowAll-body el-body-normal-margin-top">
				<el-table :max-height="490" :data="tableData" size="mini" stripe style="width: 100%" border tooltip-effect="dark" :header-cell-style="{ background: '#eef1f6', color: '#606266' }" ref="multipleTable">
					<el-table-column type="selection" width="50"></el-table-column>
					<el-table-column type="index" label="序号" width="100"></el-table-column>
					<el-table-column prop="lName" label="物流名称" ></el-table-column>
					<el-table-column prop="lNumber" label="物流编号"></el-table-column>
					<el-table-column prop="lPhone" label="物流电话"></el-table-column>
					<el-table-column width="120" label="操作" fixed="right">
						<template slot-scope="scope">
							<el-button type="danger" @click="tableBtn(scope.row,3)" size="small">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<!-- 底部 -->
			<div class="useridcard-footer" v-if="form.current">
				<Pagination @callFather="getList" :childMsg="{currentPage:form.current,pageSize:form.size}" />
			</div>
			<!-- 添加 -->
			<el-dialog title="添加物流" :visible.sync="dialogVisible" width="500px" :destroy-on-close="true">
				<el-form ref="ruleForm"  label-position="top" label-width="80px" :model="formDialog" :rules="rules">
					<el-form-item label="物流名称:" prop="lName">
						<el-input v-model="formDialog.lName"></el-input>
					</el-form-item>
					<el-form-item label="物流编号:" prop="lNumber">
						<el-input v-model="formDialog.lNumber"></el-input>
					</el-form-item>
					<el-form-item label="物流电话:" prop="lPhone">
						<el-input v-model="formDialog.lPhone"></el-input>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="addPost">确 定</el-button>
				</span>
			</el-dialog>
		</div>
	</div>
</template>
<script>
	import {
		sleLogisticAll,insSingleLogistic,delSingleLogistic
	} from "@/api/userMG.js";
	import Pagination from "@/components/Pagination.vue";
	export default {
		name: "classify",
		components:{Pagination},
		data() {
			return {
				tableData: [],
				loading: false,
				classifyChData:null,
				form: {
					lName: "", //名称
					size:10,
					current:1,
				},
				formDialog:{
					lName:"",
					lNumber:"",
					lPhone:"",
				},
				rules:{
					lName:[{ required: true, message: '物流名称不能为空', trigger: 'blur' }],
					lNumber:[{ required: true, message: '物流编号不能为空', trigger: 'blur' }],
					lPhone:[{ required: true, message: '手机号不能为空', trigger: 'blur' }],
				},
				dialogVisible:false
			}
		},
		created() {
			this.getList();
		},
		methods: {
			// 表格里的点击事件
			tableBtn(data, status) {
				let context;
				if(status == 3)context = "是否要删除此物流!";
				this.$confirm(context, "提示", {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if(status == 3){
						delSingleLogistic({lId:data.lId}).then(res=>{
							this.$message.success("删除成功");
							this.getList();
						})
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
				sleLogisticAll(this.form).then(res => {
					this.tableData = res.logistics;
					this.loading = false;
				})
			},
			addPost(){
				insSingleLogistic(this.formDialog).then(res=>{
					this.$message.success("添加成功");
					this.dialogVisible = false;
					this.getList();
				})
			},
			add(options){
				if(options == 1){
					for(let i in this.formDialog){
						this.formDialog[i] = '';
					};
					this.dialogVisible = true;
				}
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
	.logisticsshowAll {
		.logisticsshowAll-body {}
		.logisticsshowAll-header {
			display: flex;
			flex-wrap: wrap;
		}
	}
</style>
