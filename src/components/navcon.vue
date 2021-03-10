/**
* 头部菜单
*/ 
<template>
<div>
  <el-menu class="el-menu-demo" mode="horizontal" background-color="#334157" text-color="#fff" active-text-color="#fff">
	<el-button class="buttonimg">
	  <img class="showimg" :src="collapsed?imgsq:imgshow" @click="toggle(collapsed)">
	</el-button>
	<el-submenu index="2" class="submenu">
	  <template slot="title">{{user.uName}}</template>
	  <el-menu-item @click="dialogVisible=true" index="2-1">修改密码</el-menu-item>
	  <el-menu-item @click="upDataShop" index="2-2">修改店铺</el-menu-item>
	  <el-menu-item @click="exit()" index="2-3">退出</el-menu-item>
	</el-submenu>
  </el-menu>		
  <!-- 修改密码 -->
   <el-dialog title="修改密码" :visible.sync="dialogVisible" width="500px">
	 <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
	   <el-form-item label="旧密码" prop="password" :rules="[{ required: true, message: '请输入旧密码'}]">
	     <el-input  v-model.number="numberValidateForm.password"  style="width: 260px;"></el-input>
	   </el-form-item>
	   <el-form-item label="新密码" prop="newpassword" :rules="[{ required: true, message: '请输入新密码'}]">
	     <el-input show-password v-model.number="numberValidateForm.newpassword" style="width: 260px;"></el-input>
	   </el-form-item>
	   <el-form-item  label="确认密码" prop="yan" :rules="[{ required: true,validator:double, message: '密码不一致'}]">
	     <el-input show-password v-model.number="numberValidateForm.yan" style="width: 260px;"></el-input>
	   </el-form-item>
	 </el-form>
     <span slot="footer" class="dialog-footer">
       <el-button @click="passwordOut">取 消</el-button>
       <el-button type="primary" @click="passwodAdd">确 定</el-button>
     </span>
   </el-dialog>
   <!-- 上传店铺 -->
    <el-dialog title="修改店铺" :visible.sync="updatestoreShow" width="500px">
   	 <el-form :model="updateForm" ref="updatestoreShow" label-width="100px" class="demo-ruleForm">
   	   <el-form-item label="名 称" prop="uName" :rules="[{ required: true, message: '请输入名称'}]">
   	     <el-input  v-model.number="updateForm.uName"  style="width: 260px;"></el-input>
   	   </el-form-item>
   	   <el-form-item label="店铺logo" prop="uPic" :rules="[{ required: true, message: '请上传logo'}]">
			<el-upload accept="image/*" name="imgFile" :data="{imgtype:'logo'}" :show-file-list="false" class="avatar-uploader" 
				action="/api/userclientapi/uploadpic" :on-success="handLogo">
				<img v-if="updateForm.uPic" :src="updateForm.uPic" class="avatar">
				<i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
   	   </el-form-item>
   	   <el-form-item  label="店铺封面" prop="uStorepic" :rules="[{ required: true, message: '请上传封面'}]">
		 <el-upload accept="image/*" name="imgFile" :data="{imgtype:'logo'}" :show-file-list="false" class="avatar-uploader"
		 	action="/api/userclientapi/uploadpic" :on-success="handUStorepic">
		 	<img v-if="updateForm.uStorepic" :src="updateForm.uStorepic" class="avatar">
		 	<i v-else class="el-icon-plus avatar-uploader-icon"></i>
		 </el-upload>
   	   </el-form-item>
   	 </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updatestoreOut">取 消</el-button>
        <el-button type="primary" @click="updatestoreAdd">确 定</el-button>
      </span>
    </el-dialog>
</div>
</template>
<script>
import { updatepwd,updatestore } from '../api/userMG'
export default {
  name: 'navcon',
  data() {
    return {
      collapsed: true,
      imgshow: require('../assets/img/show.png'),
      imgsq: require('../assets/img/sq.png'),
	  dialogVisible:false,
	  updatestoreShow:false,
	  updateForm:{
		  uPic:"",
		  uName:"",
		  uStorepic:""
	  },
	  numberValidateForm:{
		  password:"",
		  newpassword:"",
		  yan:"",
	  },
      user: {}
    }
  },
  // 创建完毕状态(里面是操作)
  created() {
    this.user = JSON.parse(localStorage.getItem('userdata'))
  },
  methods: {
	// 上传图片
	handLogo(options){
		this.updateForm.uPic = options.url;
	},
	handUStorepic(options){
		this.updateForm.uStorepic = options.url;
	},
	// 店铺取消
	updatestoreOut(){
		this.updatestoreShow = false;
		setTimeout(()=>{
			this.$refs["updatestoreShow"].resetFields();
		},500)
	},
	// 店铺确定
	updatestoreAdd(){
		this.$refs["updatestoreShow"].validate((valid) => {
			if(valid){
				updatestore(this.updateForm).then(res=>{
					this.$message.success("修改店铺成功");
					this.updatestoreOut();
				})
			}
		})
	},
    // 退出登录
    exit() {
      this.$confirm('退出登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          setTimeout(() => {
            this.$store.commit('logout', 'false')
            this.$router.push({ path: '/login' })
            this.$message({
              type: 'success',
              message: '已退出登录!'
            })
          }, 1000)
        })
    },
	// 判断两次输入的密码
	double(rule, value, callback){
		if (value !== this.numberValidateForm.newpassword) {
		  callback(new Error());
		} else {
		  callback();
		}
	},
	// 修改密码取消
	passwordOut(){
		this.dialogVisible = false;
		setTimeout(()=>{
			this.$refs["numberValidateForm"].resetFields();
		},500)
	},
	// 修改密码
	passwodAdd(){
	this.$refs["numberValidateForm"].validate((valid) => {
	  let {password,newpassword} = this.numberValidateForm;
	  if (valid) {
		 updatepwd({password,newpassword}).then(res=>{
			 console.log(res);
			 if(res.code == 200){
				this.$message.success("修改成功")
				console.log(res);
				this.passwordOut(); 				 
			 }else{
				this.$message.error(res.msg)
			 }
		 })
	  } 
	});
	},
	upDataShop(){
		this.updateForm={
			  uPic:this.user.uPic,
			  uName:this.user.uName,
			  uStorepic:this.user.uStorepic
		},
		this.updatestoreShow=true;
	},
    // 切换显示
    toggle(showtype) {
      this.collapsed = !showtype
      this.$root.Bus.$emit('toggle', this.collapsed)
    }
  }
}
</script>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  border: none;
}
.submenu {
  float: right;
}
.buttonimg {
  height: 60px;
  background-color: transparent;
  border: none;
}
.showimg {
  width: 26px;
  height: 26px;
  position: absolute;
  top: 17px;
  left: 17px;
}
.showimg:active {
  border: none;
}
</style>