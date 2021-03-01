/**
* 左边菜单
*/ 
<template>
  <el-menu default-active="2" :collapse="collapsed" collapse-transition router :default-active="$route.path" unique-opened class="el-menu-vertical-demo" background-color="#334157" text-color="#fff" active-text-color="#ffd04b">
    <div class="logobox">
      <img class="logoimg" src="../assets/img/logo1.png" alt="">
    </div>
    <el-submenu v-for="menu in allmenu" :key="menu.jId" :index="menu.jname">
      <template slot="title">
        <i class="iconfont" :class="menu.icon"></i>
        <span>{{menu.jname}}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item v-for="chmenu in menu.jurisdictions" :index="'/'+chmenu.jUrl" :key="chmenu.jId">
          <i v-if="chmenu.icon" class="iconfont" :class="chmenu.icon"></i>
          <span>{{chmenu.jname}}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<script>
import {leftNavList} from "@/api/basisMG.js";
export default {
  name: 'leftnav',
  data() {
    return {
      collapsed: false,
      allmenu: []
    }
  },
  // 创建完毕状态(里面是操作)
  created() {
	// 获取侧边数据
	leftNavList({uRank:JSON.parse(localStorage.getItem("userdata")).uRank}).then(res=>{
		this.allmenu = res;
	});
    // 监听
    this.$root.Bus.$on('toggle', value => {
      this.collapsed = !value
    })
  }
}
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 240px;
  min-height: 400px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  border: none;
  text-align: left;
}
.el-menu-item-group__title {
  padding: 0px;
}
.el-menu-bg {
  background-color: #1f2d3d !important;
}
.el-menu {
  border: none;
}
.logobox {
  height: 40px;
  line-height: 40px;
  color: #9d9d9d;
  font-size: 20px;
  text-align: center;
  padding: 20px 0px;
}
.logoimg {
  height: 40px;
}
.el-aside{
	overflow: overlay !important;
}


</style>