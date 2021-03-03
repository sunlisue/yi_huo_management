<template>
	<div class="userLikeShow" v-loading="loading">
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 头部 -->
		<div class="userLikeShow-header el-header-normal-margin-top">
			<el-input v-model="form.uName" class="el-input-normal-width el-input-normal-margin-right" placeholder="用户昵称"></el-input>
			<el-input v-model="form.uPhone" class="el-input-normal-width el-input-normal-margin-right" placeholder="手机号"></el-input>
			<label class="el-input-normal-margin-right">
				注册日期:
				<el-date-picker v-model="dateDouble" type="daterange" value-format="yyyy-MM-dd" range-separator="至"
				 start-placeholder="开始日期" end-placeholder="结束日期">
				</el-date-picker>
			</label>
			<el-select v-model="form.uShopkeeper" placeholder="请选择" class="el-input-normal-margin-right el-input-normal-select-width">
				<el-option :value="1" label="店主"></el-option>
				<el-option :value="2" label="普通用户"></el-option>
			</el-select>
			<el-button type="primary" size="small" @click="getList('query')">快速查询</el-button>
			<el-button type="primary" size="small" @click="reset">重置</el-button>
		</div>
		<!-- 身体 -->
		<div class="userLikeShow-body el-body-normal-margin-top">
			<el-table :max-height="700" :data="tableData" stripe style="width: 100%" tooltip-effect="dark" ref="multipleTable">
				<el-table-column type="selection" width="50">
				</el-table-column>
				<el-table-column type="index" label="序号" width="80">
				</el-table-column>
				<el-table-column label="用户头像" width="180">
					<template slot-scope="scope">
						<el-image style="width: 100px; height: 100px;border-radius: 50%;" :src="scope.row.uPic" fit="cover"></el-image>
					</template>
				</el-table-column>
				<el-table-column prop="uName" label="用户昵称">
				</el-table-column>
				<el-table-column prop="address" label="手机号">
				</el-table-column>
				<el-table-column prop="uTime" label="注册时间" width="180">
				</el-table-column>
				<el-table-column label="性别">
					<template slot-scope="scope">
						<span>{{scope.row.uSex==1?"男":"女"}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="uAge" label="年龄">
				</el-table-column>
				<el-table-column label="角色">
					<template slot-scope="scope">
						<span>{{scope.row.uShopkeeper==1?"店主":"普通用户"}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="uStaus" label="状态">
					<template slot-scope="scope">
						<span :style="scope.row.uStaus==0?'color:green':'color:red'">{{scope.row.uStaus==0?"可用":"解冻"}}</span>
					</template>
				</el-table-column>
				<el-table-column width="300" label="操作">
					<template slot-scope="scope">
						<el-button v-if="scope.row.uStaus == 0" type="danger" @click="tableBtn(scope.row,1)" size="small">点击冻结</el-button>
						<el-button v-else type="success" @click="tableBtn(scope.row,1)" size="small">点击解冻</el-button>
						<el-button type="primary" v-if="scope.row.uShopkeeper == 2" @click="tableBtn(scope.row,2)" size="small">设置为分销身份</el-button>
						<el-button type="primary" v-else @click="tableBtn(scope.row,2)" size="small">取消分销身份</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- 底部 -->
		<div class="userLikeShow-footer" v-if="form.current">
			<Pagination @callFather="getList" :childMsg="{currentPage:form.current,pageSize:form.size}" />
		</div>
	</div>
</template>

<script>
	import {
		selUserAll,updUserById,updShopkeeperById
	} from "@/api/userMG.js";
	import Pagination from "@/components/Pagination.vue";
	export default {
		name: "userLikeShow",
		components:{Pagination},
		data() {
			return {
				dateDouble: "",
				tableData: [],
				loading: false,
				form: {
					uName: "",
					uPhone: "",
					uTime: "",
					fTime: "",
					uShopkeeper: "",
					current:1,
					size:5
				}
			}
		},
		watch: {
			dateDouble(res) {
				this.form.uTime = res[0];
				this.form.fTime = res[0];
			}
		},
		created() {
			this.getList();
		},
		methods: {
			// 表格里的点击事件
			tableBtn(data, status) {
				console.log(data)
				let context;
				if (status == 1) context = data.uStaus==0?'警告！是否要冻结该用户！':'警告！是否要解冻该用户！';
				else context = data.uShopkeeper==1?"是否要添加该用户的分销员身份！":"是否要取消该用户的分销员身份！";
				
				this.$confirm(context, "提示", {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if (status == 1) {
						updUserById({id:data.id,uStaus:data.uStaus==0?1:0}).then(res=>{
							this.$message.success(data.uStaus==0?'已冻结':'已解冻');
							this.getList();
						})
					} else {
						updShopkeeperById({id:data.id,uShopkeeper:data.uShopkeeper==1?2:1}).then(res=>{
							this.$message.success(data.uShopkeeper==1?'已取消':'已添加');
							this.getList();
						})
						
					}
				})
			},
			// 获取列表
			getList(options) {
				if(options == "query"){  //快速查找
					this.form.current = 0;
					this.form.size = 0;
				}else if(options){
					this.form.current = options.currentPage;
					this.form.size = options.pageSize;
				}
				this.loading = true;
				selUserAll(this.form).then(res => {
					this.tableData=res.user;
					this.loading = false;
				})
			},
			// 重置
			reset() {
				for (let i in this.form) {
					this.form[i] = "";
				};
				this.form.current=1;
				this.form.size=5;
				this.getList();
			}
		}
	}
</script>
<style lang="scss" scoped>
	.userLikeShow {
		.userLikeShow-body {}

		.userLikeShow-header {
			display: flex;
			flex-wrap: wrap;
		}
	}
</style>
