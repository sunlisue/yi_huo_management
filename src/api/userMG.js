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