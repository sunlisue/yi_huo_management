<template>
	<div class="ManagerUserLikeShow" v-loading="loading">
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
		</el-breadcrumb>
		<div>
			<!-- 头部 -->
			<div class="ManagerUserLikeShow-header el-header-normal-margin-top">
				<el-input v-model="form.uName" class="el-input-normal-width el-input-normal-margin-right" placeholder="用户昵称"></el-input>
				<el-input v-model="form.uPhone" class="el-input-normal-width el-input-normal-margin-right" placeholder="手机号"></el-input>
				<el-button type="primary" size="small" @click="getList('query')">快速查询</el-button>
				<el-button type="primary" size="small" @click="reset">重置</el-button>
				<el-button type="primary" size="small" @click="add(1)">添加管理员</el-button>
			</div>
			<!-- 身体 -->
			<div class="ManagerUserLikeShow-body el-body-normal-margin-top">
				<el-table :max-height="490" :data="tableData" size="mini" stripe style="width: 100%" border tooltip-effect="dark" :header-cell-style="{ background: '#eef1f6', color: '#606266' }" ref="multipleTable">
					<el-table-column type="selection" width="50"></el-table-column>
					<el-table-column type="index" label="序号" width="100"></el-table-column>
					<el-table-column prop="uName" label="用户名" ></el-table-column>
					<el-table-column prop="uPhone" label="手机号"></el-table-column>
					<el-table-column prop="uTime" label="注册时间"></el-table-column>
					<el-table-column prop="uTime" label="等级">
						<template slot-scope="scope">
							<span>{{scope.row.uRank==2?'普通管理员':'超级管理员'}}</span>
						</template>
					</el-table-column>
					<el-table-column width="180" label="操作" fixed="right">
						<template slot-scope="scope">
							<el-button type="danger" @click="tableBtn(scope.row,2)" size="small">删除</el-button>
							<el-button type="danger" @click="tableBtn(scope.row,1)" size="small">重置密码</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<!-- 底部 -->
			<div class="useridcard-footer" v-if="form.current">
				<Pagination @callFather="getList" :childMsg="{currentPage:form.current,pageSize:form.size}" />
			</div>
			<!-- 添加 -->
			<el-dialog title="添加用户" :visible.sync="dialogVisible" width="500px" :destroy-on-close="true">
				<el-form ref="ruleForm"  label-position="top" label-width="80px" :model="formDialog" :rules="rules">
					<el-form-item label="用户名:" prop="uName">
						<el-input v-model="formDialog.uName"></el-input>
					</el-form-item>
					<el-form-item label="手机号:" prop="uPhone">
						<el-input v-model="formDialog.uPhone"></el-input>
					</el-form-item>
					<el-form-item label="密码:" prop="uPwd">
						<el-input show-password v-model="formDialog.uPwd"></el-input>
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
		selmanagerUserAll,
		delManagerUser,
		resetpassword,
		addManagerUser
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
					uName: "",
					uPhone:"",
					size:10,
					current:1,
				},
				formDialog:{
					uName:"",
					uPhone:"",
					uPwd:"",
				},
				rules:{
					uName:[{ required: true, message: '用户名不能为空', trigger: 'blur' }],
					uPhone:[{ required: true, message: '手机号不能为空', trigger: 'blur' }],
					uPwd:[{ required: true, message: '密码不能为空', trigger: 'blur' }],
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
				if(status == 1)context = "是否要重置密码为123456"
				if(status == 2)context = "是否要删除此账户";
				this.$confirm(context, "提示", {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if(status == 2){
						delManagerUser({id:data.id,uStaus:1}).then(res=>{
							this.$message.success("删除成功");
							this.getList();
						})
					}else if(status == 1){
						resetpassword({id:data.id}).then(res=>{
							this.$message.success("重置密码成功");
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
				selmanagerUserAll(this.form).then(res => {
					this.tableData = res.managerUsers;
					this.loading = false;
				})
			},
			addPost(){
				 this.$refs["ruleForm"].validate((valid) => {
					if(valid){
						this.formDialog.uRank = 2;
						addManagerUser(this.formDialog).then(res=>{
							this.$message.success("添加成功");
							this.dialogVisible = false;
							this.getList();
						})						
					} 
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
	.ManagerUserLikeShow {
		.ManagerUserLikeShow-body {}
		.ManagerUserLikeShow-header {
			display: flex;
			flex-wrap: wrap;
		}
	}
</style>
