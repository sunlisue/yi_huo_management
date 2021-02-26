<template>
	<div class="product" v-loading="loading">
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 头部 -->
		<div class="product-header el-header-normal-margin-top">
			<el-input v-model="form.pName" class="el-input-normal-width el-input-normal-margin-right" placeholder="产品名称"></el-input>
			<label class="el-input-normal-margin-right">
				创建日期:
				<el-date-picker v-model="dateDouble" type="daterange" value-format="yyyy-MM-dd" range-separator="至"
				 start-placeholder="开始日期" end-placeholder="结束日期">
				</el-date-picker>
			</label>
			<el-select v-model="form.uShopkeeper" placeholder="请选择" class="el-input-normal-margin-right el-input-normal-select-width">
				<el-option v-for="(item,index) in selcategoryArray" :key="index" :value="item.cId" :label="item.cType"></el-option>
			</el-select>
			<el-select v-model="form.uShopkeeper" placeholder="请选择" class="el-input-normal-margin-right el-input-normal-select-width">
				<el-option v-for="(item,index) in selcategoryArray" :key="index" :value="item.cId" :label="item.cType"></el-option>
			</el-select>
			<el-button type="primary" size="small" @click="getList">快速查询</el-button>
			<el-button type="primary" size="small" @click="reset">重置</el-button>
		</div>
		<!-- 身体 -->
		<div class="product-body el-body-normal-margin-top">
			<el-table :data="tableData" stripe style="width: 100%" tooltip-effect="dark" ref="multipleTable">
				<el-table-column type="selection" width="50">
				</el-table-column>
				<el-table-column type="index" label="序号" width="50">
				</el-table-column>
				<el-table-column prop="pName" label="产品名称" width="130">
				</el-table-column>
				<el-table-column label="产品封面" width="125">
					<template slot-scope="scope">
						<el-image style="width: 100px; height: 100px;" :src="scope.row.pCover" fit="cover"></el-image>
					</template>
				</el-table-column>
				<el-table-column  label="产品价格" width="120">
					<template slot-scope="scope">
						<div>原价：{{scope.row.pPrice}}</div>
						<div>现价：{{scope.row.pPricef}}</div>
					</template>
				</el-table-column>
				<el-table-column label="分销比例" width="130">
					<template slot-scope="scope">
						<span>分销比例：{{scope.row.distributorRatio}}%</span>
					</template>
				</el-table-column>
				<el-table-column label="产品评分">
					<template slot-scope="scope">
						<span>{{scope.row.pGrade}}分</span>
					</template>
				</el-table-column>
				<el-table-column prop="pCount" label="产品库存">
				</el-table-column>
				<el-table-column label="产品创建时间">
					<template slot-scope="scope">
						<span>{{scope.row.uShopkeeper==1?"店主":"普通用户"}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="uStaus" label="产品类型">
					<template slot-scope="scope">
						<span :style="scope.row.uStaus==0?'color:green':'color:red'">{{scope.row.uStaus==0?"可用":"禁用"}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="uStaus" label="折扣">
					<template slot-scope="scope">
						<span :style="scope.row.uStaus==0?'color:green':'color:red'">{{scope.row.uStaus==0?"可用":"禁用"}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="uStaus" label="会员级别">
					<template slot-scope="scope">
						<span :style="scope.row.uStaus==0?'color:green':'color:red'">{{scope.row.uStaus==0?"可用":"禁用"}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="uStaus" label="运费">
					<template slot-scope="scope">
						<span :style="scope.row.uStaus==0?'color:green':'color:red'">{{scope.row.uStaus==0?"可用":"禁用"}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="uStaus" label="推荐状态">
					<template slot-scope="scope">
						<span :style="scope.row.uStaus==0?'color:green':'color:red'">{{scope.row.uStaus==0?"可用":"禁用"}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="uStaus" label="上下架状态">
					<template slot-scope="scope">
						<span :style="scope.row.uStaus==0?'color:green':'color:red'">{{scope.row.uStaus==0?"可用":"禁用"}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="uStaus" label="宣传">
					<template slot-scope="scope">
						<span :style="scope.row.uStaus==0?'color:green':'color:red'">{{scope.row.uStaus==0?"可用":"禁用"}}</span>
					</template>
				</el-table-column>
				<el-table-column width="300" label="操作">
					<template slot-scope="scope">
						<el-button type="danger" @click="tableBtn(scope.row,1)" size="small">点击冻结</el-button>
						<el-button type="primary" @click="tableBtn(scope.row,2)" size="small">设置为分销身份</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	import {
		selcommoditise,selcategory
	} from "@/api/userMG.js"
	export default {
		name: "product",
		data() {
			return {
				dateDouble: "",
				tableData: [],
				loading: false,
				form: {
					pName: "",
					uTime: "",
					fTime: "",
					uShopkeeper: ""
				},
				selcategoryArray:[]
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
			selcategory().then(res=>{
				this.selcategoryArray=res.datalist
			})
		},
		methods: {
			// 表格里的点击事件
			tableBtn(data, status) {
				let context;
				console.log(data, status);
				if (status == 1) context = "警告！是否要冻结该用户！";
				else context = "是否要添加该用户的分销员身份！";
				
				this.$confirm(context, "提示", {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if (status == 1) {
						this.$message.success("已冻结！")
					} else {
						this.$message.success("已添加！")
					}
				})
			},
			// 获取列表
			getList() {
				this.loading = true;
				selcommoditise(this.form).then(res => {
					this.tableData=res;
					this.loading = false;
				})
			},
			// 重置
			reset() {
				for (let i in this.form) {
					this.form[i] = "";
				};
				this.getList();
			}
		}
	}
</script>
<style lang="scss" scoped>
	.product {
		.product-body {}

		.product-header {
			display: flex;
			flex-wrap: wrap;
		}
	}
</style>
