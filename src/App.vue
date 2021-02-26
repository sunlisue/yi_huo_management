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
	
}
</style>
