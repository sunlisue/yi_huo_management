import axios from 'axios';
import { req } from './axiosFun';

 // 获取侧边栏
export const leftNavList = (params) => { return req("post", "/api/ManagerUserController/jurisdictionAll", params) }; 
 