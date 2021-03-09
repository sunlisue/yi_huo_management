<template>
	<div class="classify" v-loading="loading">
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
		</el-breadcrumb>
			<!-- 头部 -->
			<div class="classify-header el-header-normal-margin-top">
				<el-input v-model="form.cType" class="el-input-normal-width el-input-normal-margin-right" placeholder="分类名字"></el-input>
				<label class="el-input-normal-margin-right">
					创建日期:
					<el-date-picker v-model="dateDouble" type="daterange" value-format="yyyy-MM-dd" range-separator="至"
					 start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
				</label>
				<el-button type="primary" size="small" @click="getList('query')">快速查询</el-button>
				<el-button type="primary" size="small" @click="reset">重置</el-button>
				<el-button type="primary" size="small" @click="add(1)">添加类型</el-button>
			</div>
			<!-- 身体 -->
			<div class="classify-body el-body-normal-margin-top">
				<el-table :max-height="530" :data="tableData" size="mini" stripe style="width: 100%" border tooltip-effect="dark" :header-cell-style="{ background: '#eef1f6', color: '#606266' }" ref="multipleTable">
					<el-table-column type="selection" width="50"></el-table-column>
					<el-table-column type="index" label="序号" width="50"></el-table-column>
					<el-table-column prop="cType" label="名称" width="100"></el-table-column>
					<el-table-column prop="cTime" label="图片" width="125">
						<template slot-scope="scope">
							<el-image style="width: 100px; height: 100px;" :src="scope.row.cPic" fit="cover"></el-image>
						</template>
					</el-table-column>
					<el-table-column prop="cTime" label="创建时间"></el-table-column>
					<el-table-column width="230" label="操作" fixed="right">
						<template slot-scope="scope">
							<el-button type="success" @click="tableBtn(scope.row,1)" v-if="scope.row.cState == 1" size="small">显示</el-button>
							<el-button type="danger" v-else @click="tableBtn(scope.row,1)" size="small">隐藏</el-button>
							<el-button type="danger" @click="add(scope.row)" size="small">修改</el-button>
							<el-button type="danger" @click="tableBtn(scope.row,3)" size="small">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<!-- 底部 -->
			<div class="useridcard-footer" v-if="form.current">
				<Pagination @callFather="getList" :childMsg="{currentPage:form.current,pageSize:form.size}" />
			</div>
			
			<!-- 对话框 -->
			<el-dialog :title="who==1?'添加品牌':'修改品牌'" :visible.sync="dialogVisible" width="500px" :destroy-on-close="true">
				<el-form ref="ruleForm"  label-position="top" label-width="80px" :model="formDialog" :rules="rules">
					<el-form-item label="轮播图标题:" prop="cType">
						<el-input v-model="formDialog.cType"></el-input>
					</el-form-item>
					<el-form-item label="品牌轮播图:" prop="cPic">
						<el-upload accept="image/*" name="imgFile" :data="{imgtype:'spic'}" :show-file-list="false" class="avatar-uploader" action="/api/userclientapi/uploadpic" :on-success="handleAvatarSuccess">
							<img v-if="formDialog.cPic" :src="formDialog.cPic" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="addPost">确 定</el-button>
				</span>
			</el-dialog>
	</div>
</template>
<script>
	import {
		selAllcategory,addcategory,upcategory,delc,hidec,
		addMyCategory,
		upMycategory,
		hideMyCategory,
		delMyCategory,
		selMyAllcategory
	} from "@/api/userMG.js";
	import Pagination from "@/components/Pagination.vue";
	export default {
		name: "MyClassify",
		components:{Pagination},
		data() {
			return {
				dateDouble: "",
				tableData: [],
				loading: false,
				who:1,
				formDialog:{
					cType:"",
					cPic:""
				},
				form: {
					cType: "", //名称
					startTime: "", //开始日期
					stopTime: "", // 结束日期
					size:10,
					current:1,
				},
				dialogVisible:false,
				rules:{
					cType:[{ required: true, message: '内容不能为空', trigger: 'blur' }],
					cPic:[{ required: true, message: '必须上传图片', trigger: 'blur' }],
				}
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
				if (status == 1) context = data.cState==1?"警告！是否要隐藏！":"警告！是否要显示！";
				if (status == 3) context = "是否要删除此类型!";
				this.$confirm(context, "提示", {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if (status == 1) {
						hideMyCategory({cId:data.cId,cState:data.cState==1?2:1}).then(res=>{
							this.$message.success(data.cState==1?'已显示':'已隐藏');
							this.getList();
						})
					} else if(status == 3){
						delMyCategory({cId:data.cId}).then(res=>{
							if(res.code == 302){
								this.$message.error(res.msg);
							}else{
								this.$message.success("删除成功");
								this.getList();								
							}
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
				selMyAllcategory(this.form).then(res => {
					this.tableData = res.categories;
					this.loading = false;
				})
			},
			add(status){
				// 添加
				if(status == 1){
					this.who = 1;
					for(let i in this.formDialog){
						this.formDialog[i] = '';
					}
					this.dialogVisible = true;
				}else{
					this.who = 2;
					this.dialogVisible = true;
					this.formDialog = {
						cType:status.cType,
						cPic:status.cPic,
						cId:status.cId
					}
				}
			},
			addPost(){
				this.$refs["ruleForm"].validate((valid) => {
					if(valid){
						if(this.who == 1){
							if(this.formDialog.cId) delete this.formDialog.cId;
							addMyCategory(this.formDialog).then(res=>{
								this.$message.success("添加成功");
								this.dialogVisible = false;
								this.getList();
							});
						}else{
							upMycategory(this.formDialog).then(res=>{
								this.$message.success("修改成功");
								this.dialogVisible = false;
								this.getList();
							})
						}
					}
				})
			},
			handleAvatarSuccess(res){this.formDialog.cPic = res.url;},
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
	.MyClassify {
		.MyClassify-body {}

		.MyClassify-header {
			display: flex;
			flex-wrap: wrap;
		}
	}
</style>
