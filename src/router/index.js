// 导入组件
import Vue from 'vue';
import Router from 'vue-router';
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}
// 登录
import login from '@/views/login';
// 首页
import index from '@/views/index';


// 用户管理 //

// 用户展示
const userLikeShow = () => import("@/views/userJsp/userLikeShow");
// 店主审核
const useridcard = () => import("@/views/userJsp/useridcard");

// 产品管理 //

// 产品列表 
const product = () => import("@/views/commodity/product");
// 类型列表
const classify = () => import("@/views/commodity/classify");
// 产品销量
const productsales = () => import("@/views/commodity/productsales");
// 我的产品
const myproduct = () => import("@/views/commodity/myproduct");
// 宣传产品
const advertiseProduct = () => import("@/views/commodity/advertiseProduct");
// 商品品牌
const getAllBrand = () => import("@/views/commodity/getAllBrand");
// 系列管理
const series = () => import("@/views/commodity/series");
// 产品详情
const product_ch = () => import("@/views/commodity/productCh/productCh")


// 订单管理 //

// 订单详情
const orderFromNew = () => import("@/views/order/orderFromNew");
// 退款申请
const refund = () => import("@/views/order/refund");
// 发货管理
const DispatchBill = () => import("@/views/order/DispatchBill");
// 物流查询
const logisticsshow = () => import("@/views/order/logisticsshow");
// 提现申请
const withdraw = () => import("@/views/order/withdraw");
// 换货申请
const exchangeapply = () => import("@/views/order/exchangeapply");
// 合伙人提现申请
const companywithdraw = () => import("@/views/order/companywithdraw");
// 订单总览
const orderFromAll = () => import("@/views/order/orderFromAll");
// 导出日志
const excellog = () => import("@/views/order/excellog");
// 运费模板
const getFreighttemplate = () => import("@/views/freight/getFreighttemplate");
// 评论
const comment = () => import("@/views/commodity/myproductCh/comment")
// 回复
const commentCh = () => import("@/views/commodity/myproductCh/commentCh")


// 系统设置 //

// 轮播图管理
const home_slideshow = () => import("@/views/settings/home_slideshow");
// 物流管理
const logisticsshowAll = () => import("@/views/settings/logisticsshowAll");
// 基础设置
const BasicsSetting = () => import("@/views/settings/BasicsSetting");
// 查看二维码
const lookImage = () => import("@/views/commodity/advertiseProductCh/lookImage")


// 账号管理 //

// 后台用户
const ManagerUserLikeShow = () => import("@/views/userJsp/ManagerUserLikeShow");


// 员工秘钥 //

// 员工秘钥
const staffkeys = () => import("@/views/commodity/staffkeys");


// 我的品牌 //

// 品牌分类管理
const MyClassify = () => import("@/views/brand/MyClassify");


// 首页
const home = () => import("@/views/home");






const error = ()=> import("@/components/error")
// 启用路由
Vue.use(Router);

// 导出路由 
export default new Router({
	routes: [{
		path: '/',
		name: '',
		component: login,
		hidden: true,
		meta: {
			requireAuth: false
		}
	}, 
	{
		path: '*',
		name:"404",
		component: error ,
	}, {
		path: '/login',
		name: '登录',
		component: login,
		hidden: true,
		meta: {
			requireAuth: false
		}
	}, {
		path: '/index',
		name: '首页',
		component: index,
		iconCls: 'el-icon-tickets',
		redirect: "/home.jsp",
		children: [{
				path: '/home.jsp',
				name: '首页',
				component: home,
				meta: {
					requireAuth: true
				}
			},
			{
				path: '/commodity/lookImage',
				name: '宣传产品',
				component: lookImage,
				meta: {
					requireAuth: true
				}
			},			{
				path: '/myproductCh/commentCh',
				name: '我的产品',
				component: commentCh,
				meta: {
					requireAuth: true
				}
			},
			{
				path: '/myproductCh/comment',
				name: '我的产品',
				component: comment,
				meta: {
					requireAuth: true
				}
			},
			{
				path: '/userJsp/userLikeShow.jsp',
				name: '用户展示',
				component: userLikeShow,
				meta: {
					requireAuth: true
				}
			},
			{
				path: '/freight/getFreighttemplate.jsp',
				name: '运费模板',
				component: getFreighttemplate,
				meta: {
					requireAuth: true
				}
			},
			{
				path: '/userJsp/useridcard.jsp',
				name: '店主审核',
				component: useridcard,
				meta: {
					requireAuth: true
				}
			},
			{
				path: '/commodity/product_ch.jsp',
				name: '产品',
				component: product_ch,
				meta: {
					requireAuth: true
				}
			},
			{
				path: '/commodity/product.jsp',
				name: '产品列表',
				component: product,
				meta: {
					requireAuth: true
				}
			},
			{
				path: '/commodity/classify.jsp',
				name: '类型列表',
				component: classify,
				meta: {
					requireAuth: true
				}
			},
			{
				path: '/commodity/productsales.jsp',
				name: '产品销量',
				component: productsales,
				meta: {
					requireAuth: true
				}
			},
			{
				path: '/commodity/myproduct.jsp',
				name: '我的产品',
				component: myproduct,
				meta: {
					requireAuth: true
				}
			},
			{
				path: '/commodity/advertiseProduct.jsp',
				name: '宣传产品',
				component: advertiseProduct,
				meta: {
					requireAuth: true
				}
			},
			{
				path: '/commodity/getAllBrand.jsp',
				name: '商品品牌',
				component: getAllBrand,
				meta: {
					requireAuth: true
				}
			},
			{
				path: '/commodity/series.jsp',
				name: '系列管理',
				component: series,
				meta: {
					requireAuth: true
				}
			},
			{
				path: '/order/orderFromNew.jsp',
				name: '订单详情',
				component: orderFromNew,
				meta: {
					requireAuth: true
				}
			},
			{
				path: '/order/refund.jsp',
				name: '退款申请',
				component: refund,
				meta: {
					requireAuth: true
				}
			},
			{
				path: '/order/DispatchBill.jsp',
				name: '发货管理',
				component: DispatchBill,
				meta: {
					requireAuth: true
				}
			},
			{
				path: '/order/logisticsshow.jsp',
				name: '物流查询',
				component: logisticsshow,
				meta: {
					requireAuth: true
				}
			},
			{
				path: '/order/withdraw.jsp',
				name: '提现申请',
				component: withdraw,
				meta: {
					requireAuth: true
				}
			},
			{
				path: '/order/exchangeapply.jsp',
				name: '换货申请',
				component: exchangeapply,
				meta: {
					requireAuth: true
				}
			},
			{
				path: '/order/companywithdraw.jsp',
				name: '合伙人提现申请',
				component: companywithdraw,
				meta: {
					requireAuth: true
				}
			},
			{
				path: '/order/orderFromAll.jsp',
				name: '订单总览',
				component: orderFromAll,
				meta: {
					requireAuth: true
				}
			},
			{
				path: '/order/excellog.jsp',
				name: '导出日志',
				component: excellog,
				meta: {
					requireAuth: true
				}
			},
			{
				path: '/settings/home_slideshow.jsp',
				name: '轮播图管理',
				component: home_slideshow,
				meta: {
					requireAuth: true
				}
			},
			{
				path: '/settings/logisticsshowAll.jsp',
				name: '物流管理',
				component: logisticsshowAll,
				meta: {
					requireAuth: true
				}
			},
			{
				path: '/settings/BasicsSetting.jsp',
				name: '基础设置',
				component: BasicsSetting,
				meta: {
					requireAuth: true
				}
			},
			{
				path: '/userJsp/ManagerUserLikeShow.jsp',
				name: '后台用户',
				component: ManagerUserLikeShow,
				meta: {
					requireAuth: true
				}
			},
			{
				path: '/commodity/staffkeys.jsp',
				name: '员工秘钥',
				component: staffkeys,
				meta: {
					requireAuth: true
				}
			},
			{
				path: '/brand/MyClassify.jsp',
				name: '品牌分类管理',
				component: MyClassify,
				meta: {
					requireAuth: true
				}
			}

		]
	}]
})
