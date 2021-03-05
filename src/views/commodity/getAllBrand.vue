<template>
	<div class="getAllBrand">
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="tab-content">
			<el-button type="primary" size="small" @click="dialogVisible = true;who=1;">添加品牌</el-button>
			<el-table :max-height="700" class="el-header-normal-margin-top" size="mini" id="table" :data="tableData" v-loading="isTableLoading"
			 border stripe :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
				<el-table-column type="selection" width="40" fixed></el-table-column>
				<el-table-column type="index" label="序号" width="50" fixed></el-table-column>
				<el-table-column prop="bId" label="品牌ID" width="80"></el-table-column>
				<el-table-column prop="bName" label="品牌名称" width="250"></el-table-column>
				<el-table-column prop="bLogo" label="品牌LOGO" width="200">
					<template slot-scope="props">
						<el-image style="width: 180px; height: 100px;" :src="props.row.bLogo" fit="cover"></el-image>
					</template>
				</el-table-column>
				<el-table-column prop="bIntroduce" label="品牌介绍" :show-overflow-tooltip="true"></el-table-column>
				<el-table-column prop="bState" label="品牌状态" width="100">
					<template slot-scope="props">
						<el-button :type="props.row.bState==1?'success':'danger'" size="small" @click="tableBth(props.row,1)">{{props.row.bState==1?'显示':'隐藏'}}</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="bState" label="操作" width="150" fixed="right">
					<template slot-scope="props">
						<el-button type="danger" size="small" @click="tableBth(props.row,2)">删除</el-button>
						<el-button type="primary" size="small" @click="tableBth(props.row,3)">修改</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- 对话框 -->
		<el-dialog :title="who==1?'添加新的品牌':'修改品牌'" :visible.sync="dialogVisible" width="500px" :destroy-on-close="true">
			<el-form ref="ruleForm"  label-position="top" label-width="80px" :model="formDialog" :rules="rules">
				<el-form-item label="品牌名称:" prop="name">
					<el-input v-model="formDialog.name"></el-input>
				</el-form-item>
				<el-form-item label="品牌介绍:" prop="action">
					<el-input type="textarea" :rows="2" placeholder="请输入介绍" v-model="formDialog.action">
					</el-input>
				</el-form-item>
				<el-form-item label="品牌logo:" prop="logo">
					<el-upload accept="image/*" name="imgFile" :data="{imgtype:'spic'}" :show-file-list="false" class="avatar-uploader" action="/api/userclientapi/uploadpic" :on-success="handleAvatarSuccess">
						<img v-if="formDialog.logo" :src="formDialog.logo" class="avatar" />
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="restPost">取 消</el-button>
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
	import {MgetAllBrand,updBrand,delBrand,AddBrand} from "@/api/userMG.js";
	import classUtil from "@/api/classUtil";
	import Pagination from "@/components/Pagination.vue";
	export default {
		name: "getAllBrand",
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
					name: "",
					action: "",
					logo: ""
				},
				who:1,
				form: {
					current: 1,
					size: 5,
					bState:3
				},
				rules:{
					name:[{ required: true, message: '品牌名不能为空', trigger: 'blur' }],
					action:[{ required: true, message: '品牌介绍不能为空', trigger: 'blur' }],
					logo:[{ required: true, message: '品牌logo不能为空', trigger: 'blur' }]
				}
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			// 隐藏-显示
			tableBth(options,status){
				if(status == 3){
					this.formDialog.name = options.bName;
					this.formDialog.action = options.bIntroduce;
					this.formDialog.logo = options.bLogo;
					this.dialogVisible = true;
					this.who=2;
					this.whoId=options.bId;
				}else{
					let context="";
					if (status == 1) context = `是否要${options.bState==1?'显示':'隐藏'}轮播`;
					if (status == 2) context = "是否要删除此轮播图"
					this.$confirm(context, "提示", {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(()=>{
						if(status == 1){
							updBrand({bId:options.bId,bState:options.bState==1?2:1}).then(res=>{
								this.$message.success("操作成功");
								this.init();
							});						
						}else if(status == 2){
							delBrand({bId:options.bId}).then(res=>{
								this.$message.success("删除成功");
								this.init();
							});
						}
					})					
				}
			},
			//初始化
			init(options) {
				if(options){
					this.form.current = options.currentPage;
					this.form.size = options.pageSize;
				}
				this.isTableLoading = true;
				MgetAllBrand(this.form).then(res=>{
					this.tableData = res.allBrand;
					this.isTableLoading = false;
				})
			},
			restPost(){
				this.dialogVisible = false;
				for(let i in this.formDialog){
					this.formDialog[i] = '';
				}
			},
			// 确认
			addPost(){
				this.$refs["ruleForm"].validate((valid) => {
					if(valid){
						let data = {
							bName:this.formDialog.name,
							bIntroduce:this.formDialog.action,
							bLogo:this.formDialog.logo
						}
						if(this.who == 1){
							AddBrand(data).then(res=>{
								this.$message.success("添加成功");
								this.init();
								this.restPost();
							})							
						}else{
							data.bId = this.whoId;
							updBrand(data).then(res=>{
								this.$message.success("修改成功");
								this.init();
								this.restPost();
							})
						}
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
	.getAllBrand {
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
