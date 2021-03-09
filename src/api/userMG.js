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
// 发货管理
export const selOrderfromByShipments = (params) => { return req("post", "/api/orderapi/selOrderfromByShipments", params) };