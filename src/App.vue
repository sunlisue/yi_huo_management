<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
    name: "App"
};
</script>

<style lang="scss"> 
@import "./assets/css/common.css";
html,
body {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0px;
    margin: 0px;
}
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    widows: 100%;
    height: 100%;
	.el-input__inner{
		height: 35px;
		line-height: 35px;
	}
	.el-input__icon{
		line-height: 30px;
	}
	.el-date-editor .el-range__icon {
		line-height: 28px;
	}
	.el-range-separator{
		line-height: 28px;
	}
	// 正常输入框宽度
	.el-input-normal-width{
		width: 200px;
	}
	// 选择宽度
	.el-input-normal-select-width{
		width: 150px;
	}
	// 正常 间距
	.el-input-normal-margin-right{
		margin-right: 10px;
	}
	.el-header-normal-margin-top{
		margin-top: 20px;
	}
	.el-body-normal-margin-top{
		margin-top: 10px;
	}
	
	
	// 上传图片
	.avatar-uploader .el-upload {
	  border: 1px dashed #d9d9d9;
	  border-radius: 6px;
	  cursor: pointer;
	  position: relative;
	  overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
	  border-color: #409EFF;
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
	// 富文本禁止输入
	.editor-ban{
		position: relative;
		&:before{
			position: absolute;
			content: "";
			top: 0;left: 0;right: 0;bottom: 0;
			z-index: 999;
			background-color: rgba(245,247,250,0.6);
			cursor: not-allowed;
		}
	}
}
</style>
