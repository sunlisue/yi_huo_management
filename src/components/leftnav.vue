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
		<span class="icon-tost" v-if="menu.orderCount">{{menu.orderCount}}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item v-for="chmenu in menu.jurisdictions" :index="'/'+chmenu.jUrl" :key="chmenu.jId">
          <i v-if="chmenu.icon" class="iconfont" :class="chmenu.icon"></i>
          <span>{{chmenu.jname}}</span>
		<!-- 消息 -->
			<el-popover v-if="chmenu.orderCount" placement="top-start" :width="50" trigger="hover">
				<span>
					<i class="el-icon-time" style="margin:0 6px;"></i>
					{{chmenu.orderCount}} 条待处理
				</span>
				<button slot="reference" class="icon-btn">
					<i class="el-icon-bell"></i>
				</button>
			</el-popover>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<script>
import {leftNavList} from "@/api/basisMG.js";
import {getOrderType} from "@/api/userMG.js";
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
	this.getList();
    // 监听
    this.$root.Bus.$on('toggle', value => {
      this.collapsed = !value
    })
  },
  methods:{
	  getList(e){
		  getOrderType().then(sres=>{
			if(!this.allmenu.length){
				leftNavList({uRank:JSON.parse(localStorage.getItem("userdata")).uRank}).then(res=>{
					this.type(sres,res);
				});				
			}else{
					this.type(sres,this.allmenu);
			}

		  })
	  },
	  // 添加气泡
	  type(options,menu){
		  this.allmenu = menu.filter(item=>{
			item.jurisdictions.filter(i=>{
				if(i.jUrl == "order/withdraw.jsp"){
					// 提现申请
					i.orderCount = options.withdrawscount;
					return i ;
				}else if (i.jUrl == "order/DispatchBill.jsp"){
					// 待发货
					i.orderCount = options.waitdelivercount;
					return i ;
				}else if (i.jUrl == "order/exchangeapply.jsp"){
					// 换货申请
					i.orderCount = options.exchangecount;
					return i ;
				}else if (i.jUrl == "order/refund.jsp"){
					// 退款申请
					i.orderCount = options.refundcount;
					return i ;
				}else if (i.jUrl == "order/companywithdraw.jsp"){
					// 合伙人提现申请
					i.orderCount = options.companywithdrawcount;
					return i ;
				}else{
					return i ;
				}
			});
			if(item.jname == "订单管理"){
				item.orderCount = options.companywithdrawcount+options.refundcount+options.exchangecount+options.waitdelivercount+options.withdrawscount;
				return item
			}else{
			    return item ;	
			}
		  });
	  }
  }
}
</script>
<style lang="scss">
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
.icon-btn {
	height: 35px;
	width: 35px;
	margin-bottom: 5px;
	border-radius: 50%;
	background-color: transparent;
	border: none;
	color: #409EFF;
	background-color: #FFFFFF;

	i {
		margin-left: -1.5px;
	}
}

.icon-tost {
	font-size: 10px;
	display: inline-block;
	border-radius: 50%;
	width: 20px;
	line-height: 20px;
	background-color: red;
	color: #FFFFFF;
	height: 20px;
	text-align: center;
	transform: scale(0.8);
}
</style>