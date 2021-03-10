import axios from 'axios';
import { req } from './axiosFun';

 // 登录
export const login = (params) => { return req("post", "/api/ManagerUserController/managerLogin", params) }; 
// 用户展示
export const selUserAll = (params) => { return req("post", "/api/ManagerUserController/selUserAll", params) }; 
// 店主审核
export const selUseridcardAll = (params) => { return req("post", "/api/ManagerUserController/selUseridcardAll", params) }; 

// 产品列表
export const selcommoditise = (params) => { return req("post", "/api/commodity/selcommoditise", params) }; 
// 分类查询
export const selcategory = (params) => { return req("post", "/api/commodityapi/selcategory", params) }; 

// 类型列表
export const selAllcategory = (params) => { return req("post", "/api/commodity/selAllcategory", params) }; 
// 子分类查询
export const selcategoryBypid = (params) => { return req("post", "/api/commodityapi/selcategoryBypid", params) }; 
// 系列列表
export const getAllseries = (params) => { return req("post", "/api/commodity/getAllseries", params) }; 
// 子分类查询
export const ManagerselcategoryBycid = (params) => { return req("post", "/api/commodityapi/ManagerselcategoryBycid", params) }; 
// 产品列表 - 查看详情
export const productDetails = (params) => { return req("post", "/api/commodity/productDetails", params) }; 
// 冻结 解冻
export const updUserById = (params) => { return req("post", "/api/ManagerUserController/updUserById", params) }; 
// 设置或取消分销身份
export const updShopkeeperById = (params) => { return req("post", "/api/ManagerUserController/updShopkeeperById", params) }; 
// 通过或不通过
export const updUseruserIdcardById = (params) => { return req("post", "/api/ManagerUserController/updUseruserIdcardById", params) }; 
// 添加子分类 
export const addcategory = (params) => { return req("post", "/api/commodity/addcategory", params) }; 
// 修改类型
export const upcategory = (params) => { return req("post", "/api/commodity/upcategory", params) }; 
// 删除类型
export const delc = (params) => { return req("post", "/api/commodity/delc", params) }; 
// 显示或隐藏类型
export const hidec = (params) => { return req("post", "/api/commodity/hidec", params) }; 
// 设置或取消镇店之宝
export const upMerchantTreasureProduct = (params) => { return req("post", "/api/merchantbrandapi/upMerchantTreasureProduct", params) }; 
// 复制
export const copyproduct = (params) => { return req("post", "/api/commodity/copyproduct", params) }; 
// 商品评论
export const getcomment = (params) => { return req("post", "/api/commodity/getcomment", params) }; 
// 添加回复
export const addcommentson = (params) => { return req("post", "/api/userclientapi/addcommentson", params) }; 
// 删除评论
export const delcomment = (params) => { return req("post", "/api/commodity/delcomment", params) }; 
// 查看回复
export const getcommentson = (params) => { return req("post", "/api/commodity/getcommentson", params) }; 
// 删除回复
export const delcommentson = (params) => { return req("post", "/api/commodity/delcommentson", params) }; 
// 订单详情
export const selOrderfromAlls = (params) => { return req("post", "/api/orderapi/selOrderfromAlls", params) }; 
// 订单详情
export const getrefund = (params) => { return req("post", "/api/orderapi/getrefund", params) }; 
// 订单详情
export const enterrefund = (params) => { return req("post", "/api/wxPay/enterrefund", params) }; 
// 上下架
export const isputaway = (params) => { return req("post", "/api/commodity/isputaway", params) }; 
// 产品列表 - 推荐
export const isrecommend = (params) => { return req("post", "/api/commodity/isrecommend", params) }; 
// 产品列表 - 删除商品
export const delproduce = (params) => { return req("post", "/api/commodity/delproduce", params) }; 
// 产品列表 - 批量上架或下架商品
export const batchIsPutAway = (params) => { return req("post", "/api/commodity/batchIsPutAway", params) }; 
// 产品列表 - 推荐宣传
export const updProductDetails = (params) => { return req("post", "/api/commodity/updProductDetails", params) }; 
// 产品列表 - 轮播图管理
export const selHomeSlideshow = (params) => { return req("post", "/api/ManagerUserController/selHomeSlideshow", params) }; 
// 隐藏显示轮播图
export const isdisplayedhl = (params) => { return req("post", "/api/commodity/isdisplayedhl", params) }; 
// 删除轮播
export const Delhl = (params) => { return req("post", "/api/commodity/Delhl", params) }; 
// 添加轮播图
export const addhl = (params) => { return req("post", "/api/commodity/addhl", params) }; 
// 修改轮播图
export const updatehl = (params) => { return req("post", "/api/commodity/updatehl", params) }; 
// 品牌列表
export const MgetAllBrand = (params) => { return req("post", "/api/commodity/MgetAllBrand", params) }; 
// 显示或隐藏
export const updBrand = (params) => { return req("post", "/api/commodity/updBrand", params) }; 
// 品牌列表 - 删除
export const delBrand = (params) => { return req("post", "/api/commodity/delBrand", params) }; 
// 品牌列表 - 添加品牌
export const AddBrand = (params) => { return req("post", "/api/commodity/AddBrand", params) }; 
// 获取茶品
export const selcommodity = (params) => { return req("post", "/api/commodityapi/selcommodity", params) }; 
// 获取员工秘钥
export const getMystaffkeys = (params) => { return req("post", "/api/ManagerUserController/getMystaffkeys", params) }; 
// 删除员工秘钥
export const delstaffkeys = (params) => { return req("post", "/api/ManagerUserController/delstaffkeys", params) }; 
// 添加员工秘钥
export const addMystaffkeys = (params) => { return req("post", "/api/ManagerUserController/addMystaffkeys", params) }; 
// 获取物流
export const sleLogisticAll = (params) => { return req("post", "/api/ApiKdwlController/sleLogisticAll", params) }; 
// 添加物流
export const insSingleLogistic = (params) => { return req("post", "/api/ApiKdwlController/insSingleLogistic", params) }; 
// 删除物流
export const delSingleLogistic = (params) => { return req("post", "/api/ApiKdwlController/delSingleLogistic", params) }; 

// 添加类型
export const addMyCategory = (params) => { return req("post", "/api/merchantbrandapi/addMyCategory", params) }; 
// 修改类型
export const upMycategory = (params) => { return req("post", "/api/merchantbrandapi/upMycategory", params) }; 
// 显示隐藏
export const hideMyCategory = (params) => { return req("post", "/api/merchantbrandapi/hideMyCategory", params) }; 
// 删除
export const delMyCategory = (params) => { return req("post", "/api/merchantbrandapi/delMyCategory", params) }; 
// 列表
export const selMyAllcategory = (params) => { return req("post", "/api/merchantbrandapi/selMyAllcategory", params) }; 
// 后台用户列表
export const selmanagerUserAll = (params) => { return req("post", "/api/ManagerUserController/selmanagerUserAll", params) }; 
// 后台用户列表 - 删除
export const delManagerUser = (params) => { return req("post", "/api/ManagerUserController/delManagerUser", params) }; 
// 后台用户列表 - 删除
export const resetpassword = (params) => { return req("post", "/api/ManagerUserController/resetpassword", params) }; 
// 后台用户列表 - 添加
export const addManagerUser = (params) => { return req("post", "/api/ManagerUserController/addManagerUser", params) }; 
// 基础设置
export const insSetting = (params) => { return req("post", "/api/SettingController/insSetting", params) };
// 获取基础设置
export const getSetting = (params) => { return req("post", "/api/SettingController/getSetting", params) };
// 宣传产品
export const selAdvertiseProductDetailsAll = (params) => { return req("post", "/api/commodity/selAdvertiseProductDetailsAll", params) };
// 生成二维码
export const getQR = (params) => { return req("post", "/api/CreateQRAPI/getQR", params) };
// 发货管理
export const selOrderfromByShipments = (params) => { return req("post", "/api/orderapi/selOrderfromByShipments", params) };



