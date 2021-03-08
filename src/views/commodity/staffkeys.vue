<template>
	<div class="staffkeys">
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="tab-content">
			<el-button type="primary" size="small" @click="restPost">添加品牌</el-button>
			<el-table :max-height="700" class="el-header-normal-margin-top" size="mini" id="table" :data="tableData" v-loading="isTableLoading"
			 border stripe :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
				<el-table-column type="selection" width="40" fixed></el-table-column>
				<el-table-column type="index" label="序号" width="50" fixed></el-table-column>
				<el-table-column prop="stafKey" label="秘钥" width="400"></el-table-column>
				<el-table-column prop="stafName" label="持有人" width="150"></el-table-column>
				<el-table-column prop="stafUrank" label="秘钥权限">
					<template slot-scope="scope">
						 <span v-if="scope.row.stafUrank == 0">员工级别</span>
						 <span v-else>最大权限</span>
					</template>
				</el-table-column>
				<el-table-column prop="bState" label="操作" width="150" fixed="right">
					<template slot-scope="scope">
						<el-button type="danger" size="small" @click="tableBth(scope.row,2)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- 对话框 -->
		<el-dialog title="添加员工秘钥" :visible.sync="dialogVisible" width="400px" :destroy-on-close="true">
			<el-form ref="ruleForm"  label-position="top" label-width="80px" :model="formDialog" :rules="rules">
				<el-form-item label="秘钥持有人" prop="stafName">
				<el-input v-model="formDialog.stafName" ></el-input>
				</el-form-item>
				<el-form-item label="秘钥权限" prop="stafUrank">
					<el-select v-model="formDialog.stafUrank" placeholder="请选择活动区域">
					  <el-option label="员工级别" :value="0"></el-option>
					  <el-option label="最大权限" :value="1"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="addPost">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 底部 -->
		<div class="useridcard-footer" v-if="form.current">
			<Pagination @callFather="init" :childMsg="{currentPage:form.current,pageSize:form.size}" />
		</div>
	</div>
</template>

<script>
	import {getMystaffkeys,delstaffkeys,addMystaffkeys} from "@/api/userMG.js";
	import classUtil from "@/api/classUtil";
	import Pagination from "@/components/Pagination.vue";
	export default {
		name: "staffkeys",
		components: {
			Pagination
		},
		data() {
			return {
				classUtil: classUtil,
				tableData: [],
				isTableLoading: false, //表格加载中
				dialogVisible: false,
				whoId:"",
				formDialog: {
					stafName: "",
					stafUrank: ""
				},
				who:1,
				form: {
					current: 1,
					size: 5,
					bState:3
				},
				rules:{
					stafName:[{ required: true, message: '秘钥持有人不能为空', trigger: 'blur' }],
					stafUrank:[{ required: true, message: '请选择秘钥权限', trigger: 'blur' }]
				}
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			// 隐藏-显示
			tableBth(options,status){
					let context="";
					if (status == 2) context = "是否要删除此秘钥"
					this.$confirm(context, "提示", {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(()=>{
						if(status == 2){
							delstaffkeys({stafKey:options.stafKey}).then(res=>{
								this.$message.success("删除成功");
								this.init();
							})
						}
					})					
			},
			//初始化
			init(options) {
				if(options){
					this.form.current = options.currentPage;
					this.form.size = options.pageSize;
				}
				this.isTableLoading = true;
				getMystaffkeys(this.form).then(res=>{
					this.tableData = res.staffkeys;
					this.isTableLoading = false;
				})
			},
			restPost(){
				for(let i in this.formDialog){
					this.formDialog[i] = '';
				};
				this.dialogVisible = true;
			},
			// 确认
			addPost(){
				this.$refs["ruleForm"].validate((valid) => {
					if(valid){
						addMystaffkeys(this.formDialog).then(res=>{
							this.$message.success("添加成功");
							this.dialogVisible = false;
							this.init();
						})
					}
				})
			},
			// 上传图片
			handleAvatarSuccess(res) {
				this.formDialog.logo = res.url;
			},
		},
	}
</script>
<style lang="scss" scoped>
	.staffkeys {
		.add-btn {
			padding-left: 10px;
			padding-bottom: 10px;
		}

		.tab-content {
			margin-top: 20px;
		}

		.lunbo-table-img {
			height: 100px;
		}
	}
</style>
