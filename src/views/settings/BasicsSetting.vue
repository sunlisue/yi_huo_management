<template>
	<div class="BasicsSetting">
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
		</el-breadcrumb>
		
		<div class="BasicsSetting-body el-header-normal-margin-top">
			<el-form :model="form"  :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
			  <el-form-item label="分销比例：" prop="distributorRatio">
			    <el-input v-model="form.distributorRatio" placeholder="例:0.00%(不用输入%)"></el-input>
			  </el-form-item>
			  <el-form-item label="合作商分销比例：" prop="cooperativeDistribution">
			    <el-input v-model="form.cooperativeDistribution" placeholder="例:0.00%(不用输入%)"></el-input>
			  </el-form-item>
			  <el-form-item label="产品需知：" prop="needKnow">
			    <el-input v-model.number="form.needKnow" type="textarea" :autosize="{ minRows: 5}" placeholder="产品需知"></el-input>
			  </el-form-item>
			  <el-form-item label="退换货说明：" prop="refundexchanged">
			    <el-input v-model.number="form.refundexchanged" type="textarea" :autosize="{ minRows: 5}" placeholder="退换货说明"></el-input>
			  </el-form-item>
			  <el-form-item label="活动图片：" prop="propagandizePic">
			    <!-- <el-input v-model.number="form.propagandizePic"></el-input> -->
				<el-upload
				  class="avatar-uploader"
				  :show-file-list="false"
				  name="imgFile"
				  :data="{imgtype:'activeimg'}"
				  action="/api/userclientapi/uploadpic"
				  :on-success="onSuccess"
				  >
				  <img fit="cover" v-if="form.propagandizePic" :src="form.propagandizePic" class="avatar">
				  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			  </el-form-item>
			  
			  
			  <el-form-item>
			    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
			    <el-button @click="resetForm('ruleForm')">重置</el-button>
			  </el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
import {insSetting,getSetting} from "@/api/userMG.js"
export default {
	name:"BasicsSetting",
	data(){
		return {
			form:{
				distributorRatio:"",
				cooperativeDistribution:"",
				needKnow:"",
				refundexchanged:"",
				propagandizePic:"",
			},
			rules:{
				distributorRatio:[{ required: true, message: '分销比例不能为空', trigger: 'blur' }],
				cooperativeDistribution:[{ required: true, message: '合作商分销比例不能为空', trigger: 'blur' }],
				needKnow:[{ required: true, message: '产品需知不能为空', trigger: 'blur' }],
				refundexchanged:[{ required: true, message: '退换货说明不能为空', trigger: 'blur' }],
				propagandizePic:[{ required: true, message: '请上传活动图片', trigger: 'blur' }],
			}
		}
	},
	created() {
		getSetting().then(res=>{
			this.form={
				distributorRatio:res.settings.distributorRatio,
				cooperativeDistribution:res.settings.cooperativeDistribution,
				needKnow:res.settings.needKnow,
				refundexchanged:res.settings.refundexchanged,
				propagandizePic:res.settings.propagandizePic
			};
		})
	},
	methods:{
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
			  if (valid) {
				insSetting(this.form).then(res=>{
					this.$message.success("提交成功");
				});
			  } 
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		onSuccess(res){
			this.form.propagandizePic = res.url;

		}
	}
}
</script>
<style lang="scss" scoped>
.BasicsSetting{
	.BasicsSetting-body{
		width: 800px;
	}
	  .avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9 ;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	  }
	  .avatar-uploader .el-upload:hover {
	    border-color: #409EFF ;
	  }
	  .avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 178px;
	    height: 178px;
	    line-height: 178px;
	    text-align: center;
	  }
	  .avatar {
	    width: 178px;
	    height: 178px;
	    display: block;
	  }
}
</style>
