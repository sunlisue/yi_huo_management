<template>
	<div class="home_slideshow">
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="tab-content">
			<el-button type="primary" size="small" @click="restPost">添加首页轮播图</el-button>
			<el-table :max-height="700" class="el-header-normal-margin-top" size="mini" id="table" :data="tableData" v-loading="isTableLoading"
			 border stripe :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
				<el-table-column type="selection" width="40" fixed></el-table-column>
				<el-table-column type="index" label="序号" width="50" fixed></el-table-column>
				<el-table-column prop="bId" label="轮播图图片" width="180">
					<template slot-scope="scope">
						<el-image style="width: 160px; height: 100px;" :src="scope.row.sPicurl" fit="cover" />
					</template>
				</el-table-column>
				<el-table-column prop="sTitle" label="轮播图标题" width="200"></el-table-column>
				<el-table-column prop="pName" label="对应产品名"></el-table-column>
				<el-table-column prop="sTime" label="创建日期"></el-table-column>
				<el-table-column prop="sHref" label="活动路径"></el-table-column>
				<el-table-column label="状态" width="80">
					<template slot-scope="scope">
						<el-button :type="scope.row.sType==1?'danger':'success'" size="small" @click="tableBtn(scope.row,1)">{{scope.row.sType==1?'隐藏':'显示'}}</el-button>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="150" fixed="right">
					<template slot-scope="scope">
						<el-button type="danger" size="small" @click="tableBtn(scope.row,2)">删除</el-button>
						<el-button type="primary" size="small" @click="tableBtn(scope.row,3)">修改</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- 对话框 -->
		<el-dialog :title="who==1?'添加首页轮播图':'修改首页轮播图'" :visible.sync="dialogVisible" width="500px" :destroy-on-close="true">
			<el-form ref="ruleForm"  label-position="top" label-width="80px" :model="formDialog" :rules="rules">
				<el-form-item label="品牌轮播图:" prop="sPicurl">
					<el-upload accept="image/*" name="imgFile" :data="{imgtype:'spic'}" :show-file-list="false" class="avatar-uploader" action="/api/userclientapi/uploadpic" :on-success="handleAvatarSuccess">
						<img v-if="formDialog.sPicurl" :src="formDialog.sPicurl" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
				<el-form-item label="对应产品:" prop="oId">
					  <el-select v-model="formDialog.oId" filterable placeholder="请选择">
					    <el-option
					      v-for="item in options"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
				</el-form-item>
				<el-form-item label="轮播图标题:" prop="sTitle">
					<el-input v-model="formDialog.sTitle"></el-input>
				</el-form-item>
				<el-form-item label="活动路径:" prop="sHref">
					<el-input v-model="formDialog.sHref"></el-input>
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
	import {selHomeSlideshow,isdisplayedhl,Delhl,addhl,updatehl,selcommodity} from "@/api/userMG.js";
	import classUtil from "@/api/classUtil";
	export default {
		name: "home_slideshow",
		data() {
			return {
				classUtil: classUtil,
				tableData: [],
				isTableLoading: false, //表格加载中
				dialogVisible: false,
				who:1,
				options:[],
				formDialog: {
					sPicurl: "",
					sHref: "",
					sTitle: "",
					oId:""
				},
				rules:{
					sPicurl:[{ required: true, message: '请上传轮播图', trigger: 'blur' }],
					sHref:[{ required: true, message: '活动路径不能为空', trigger: 'blur' }],
					sTitle:[{ required: true, message: '轮播图标题不能为空', trigger: 'blur' }],
					oId:[{ required: true, message: '请选择对应产品', trigger: 'blur' }]
				}
			}
		},
		mounted() {
			this.init();
			selcommodity().then(res=>{
				this.options=[];
				res.datalist.map(item=>{
					this.options.push({value:item.pid,label:item.pName})
				})
			})
		},
		methods: {
			//初始化
			init() {
				this.isTableLoading = true;
				selHomeSlideshow().then(res => {
					this.tableData = res.slideshows;
					this.isTableLoading = false;
				});
			},
			tableBtn(options,status){
				if(status == 3){
					this.who = 2;
					this.dialogVisible = true;
					this.formDialog = {
						sPicurl: options.sPicurl,
						sHref: options.sHref,
						sTitle: options.sTitle,
						oId:options.oId,
						id:options.id
					}
				}else{
					let context = "";
					if(status == 1) context = `是否要${options.sType==1?'隐藏':'显示'}`;
					if(status == 2) context = "是否要删除此轮播图"
					this.$confirm(context, "提示", {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(()=>{
						if(status == 1){
							isdisplayedhl({id:options.id,sType:options.sType==1?2:1}).then(res=>{
								this.$message.success(`${options.sType==1?'隐藏':'显示'}成功`);
								this.init();
							})
						}else if(status == 2){
							Delhl({id:options.id}).then(res=>{
								this.$message.success("删除成功");
								this.init();
							})
						}
					})					
				}
			},
			restPost(){
				this.who=1;
				for(let i in this.formDialog){
					this.formDialog[i] = '';
				};
				this.dialogVisible = true;
			},
			// 确认
			addPost(){
				this.$refs["ruleForm"].validate((valid) => {
					if(valid){
						if(this.who == 1){
							if(this.formDialog.id)delete this.formDialog.id;
							addhl(this.formDialog).then(res=>{
								this.$message.success("添加成功");
								this.dialogVisible=false;
								this.init();
							})
						}else{ 
							updatehl(this.formDialog).then(res=>{
								this.$message.success("修改成功");
								this.dialogVisible=false;
								this.init();
							})
						}
					}
				})
			},
			handleAvatarSuccess(res){
				this.formDialog.sPicurl = res.url;
			}
		},
	}
</script>
<style lang="scss" scoped>
	.home_slideshow {
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
