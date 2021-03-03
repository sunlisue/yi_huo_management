import axios from 'axios';
import { req } from './axiosFun';

// 获取侧边栏
export const leftNavList = (params) => { return req("post", "/api/ManagerUserController/jurisdictionAll", params) };
// 获取商品品牌
export const getAllBrand = (params) => { return req("post", "/api/commodity/getAllBrand", params) }; 
