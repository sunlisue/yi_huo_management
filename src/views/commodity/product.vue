<template>
	<div class="product" v-loading="loading">
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 头部 -->
		<div class="product-header el-header-normal-margin-top">
			<el-input v-model="form.pName" class="el-input-normal-width el-input-normal-margin-right"
				placeholder="产品名称"></el-input>
			<label class="el-input-normal-margin-right">
				创建日期:
				<el-date-picker v-model="dateDouble" type="daterange" value-format="yyyy-MM-dd" range-separator="至"
					start-placeholder="开始日期" end-placeholder="结束日期">
				</el-date-picker>
			</label>
			<el-select v-model="form.pType" placeholder="请选择分类"
				class="el-input-normal-margin-right el-input-normal-select-width">
				<el-option v-for="(item,index) in selcategoryArray" :key="index" :value="item.cId" :label="item.cType">
				</el-option>
			</el-select>
			<el-select v-model="form.pBrandid" placeholder="请选择品牌"
				class="el-input-normal-margin-right el-input-normal-select-width">
				<el-option v-for="(item,index) in selectBrandArray" :key="index" :value="item.bId" :label="item.bName">
				</el-option>
			</el-select>
			<el-button type="primary" size="small" @click="getList('query')">快速查询</el-button>
			<el-button type="primary" size="small" @click="reset">重置</el-button>
			<el-button type="success" size="small" v-if="upDownAll.length" @click="upDownAllAjax(1)">上架</el-button>
			<el-button type="danger" size="small" v-if="upDownAll.length" @click="upDownAllAjax(2)">下架</el-button>
		</div>
		<!-- 身体 -->
		<div class="product-body el-body-normal-margin-top">
			<el-table @select="selectTble" @select-all="selectAll" :max-height="600" :data="tableData" size="mini"
				stripe style="width: 100%" border tooltip-effect="dark"
				:header-cell-style="{ background: '#eef1f6', color: '#606266' }" ref="multipleTable">
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
				<el-table-column label="产品价格" width="100">
					<template slot-scope="scope">
						<div>原价：{{scope.row.pPrice}}</div>
						<div>现价：{{scope.row.pPricef}}</div>
					</template>
				</el-table-column>
				<el-table-column label="分销比例" width="120">
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
				<el-table-column label="产品创建时间" prop="pTime" width="150"></el-table-column>
				<el-table-column prop="cType" label="产品类型"></el-table-column>
				<el-table-column prop="pDiscount" label="折扣"></el-table-column>
				<el-table-column prop="sTitle" label="会员级别"></el-table-column>
				<el-table-column prop="sTitle" label="自营" width="130">
					<template slot-scope="scope">
						  <el-select v-model="scope.row.isAutotrophy" @change="isAutotrophyE(scope.row)" placeholder="请选择">
						    <el-option label="自营" :value="1" />
							<el-option label="非自营" :value="0" />
						  </el-select>
					</template>
				</el-table-column>
				<el-table-column prop="uStaus" label="运费">
					<template slot-scope="scope">
						<span>{{scope.row.pFreight==0?"免费":scope.row.pFreight}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="uStaus" label="推荐状态">
					<template slot-scope="scope">
						<span
							:style="scope.row.pRecommendtype==1?'color:green':'color:red'">{{scope.row.pRecommendtype==1?"已推荐":"未推荐"}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="uStaus" label="上下架状态" width="100">
					<template slot-scope="scope">
						<span
							:style="scope.row.pPutawaytype==1?'color:green':'color:red'">{{scope.row.pPutawaytype==1?"上架中":"未上架"}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="uStaus" label="宣传" width="100">
					<template slot-scope="scope">
						<span
							:style="scope.row.pAdvertise==1?'color:green':'color:red'">{{scope.row.pAdvertise==1?"已推荐宣传":"未推荐宣传"}}</span>
					</template>
				</el-table-column>
				<el-table-column width="420" label="操作" fixed="right">
					<template slot-scope="scope">
						<el-button :type="scope.row.pPutawaytype==1?'danger':'success'" @click="tableBtn(scope.row,1)"
							size="small">{{scope.row.pPutawaytype==1?'下架':'上架'}}</el-button>
						<el-button :type="scope.row.pAdvertise==1?'danger':'success'" @click="tableBtn(scope.row,2)"
							size="small">{{scope.row.pAdvertise==1?"不推荐宣传":"推荐宣传"}}</el-button>
						<el-button :type="scope.row.pRecommendtype==1?'danger':'warning'" @click="tableBtn(scope.row,3)"
							size="small">{{scope.row.pRecommendtype==1?'不推荐':'推荐'}}</el-button>
						<el-button type="primary"
							@click="$router.push({query:{pid:scope.row.pid,show:true},path:'/commodity/product_ch.jsp'})"
							size="small">查看</el-button>
						<el-button type="danger" @click="tableBtn(scope.row,4)" size="small">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- 底部 -->
		<div class="useridcard-footer" v-if="form.current">
			<Pagination @callFather="getList" :childMsg="{currentPage:form.current,pageSize:form.size}" />
		</div>
	</div>
</template>

<script>
	import {
		selcommoditise,
		selcategory,
		isputaway,
		isrecommend,
		delproduce,
		batchIsPutAway,
		updProductDetails,
		upproductsautotrophy
	} from "@/api/userMG.js";
	import {
		getAllBrand
	} from "@/api/basisMG.js";
	import Pagination from "@/components/Pagination.vue"
	export default {
		name: "product",
		components: {
			Pagination
		},
		data() {
			let isme = JSON.parse(localStorage.getItem("userdata")).id;
			return {
				dateDouble: "",
				tableData: [],
				loading: false,
				form: {
					pName: "", //名称
					startTime: "", //开始日期
					stopTime: "", // 结束日期
					pType: "", //分类
					pBrandid: "", //品牌
					size: 5,
					current: 1,
					// isme
				},
				upDownAll: [],
				selcategoryArray: [],
				selectBrandArray: [],
			}
		},
		watch: {
			dateDouble(res) {
				this.form.startTime = res[0];
				this.form.stopTime = res[1];
			}
		},
		created() {
			this.getList();
			selcategory().then(res => {
				this.selcategoryArray = res.datalist;
			});
			getAllBrand().then(res => {
				this.selectBrandArray = res.allBrand;
			})
		},
		methods: {
			upDownAllAjax(pPutawaytype) {
				let pIds = "";
				this.upDownAll.map((res, index) => {
					if (this.upDownAll.length == (index + 1)) pIds = pIds + res.pid;
					else pIds = pIds + res.pid + ';';
				})
				batchIsPutAway({
					pIds,
					pPutawaytype
				}).then(res => {
					this.$message.success("设置成功");
					this.$refs.multipleTable.clearSelection();
					this.upDownAll = [];
					this.getList();
				})
			},
			selectTble(options, row) {
				this.upDownAll = options;
			},
			selectAll(options) {
				this.upDownAll = options;
			},
			// 设置自营
			isAutotrophyE(e){
				console.log(e);
				upproductsautotrophy({isAutotrophy:e.isAutotrophy,pId:e.pid}).then(res=>{
					this.$message.success("设置成功");
				})
			},
			// 表格里的点击事件
			tableBtn(data, status) {
				let context;
				if (status == 1) context = `是否要${data.pPutawaytype==1?'下架':'上架'}此产品`;
				if (status == 2) context = `是否要${data.pAdvertise==1?'不推荐宣传':'推荐宣传'}此产品`;
				if (status == 3) context = `是否要${data.pRecommendtype==1?'不推荐':'推荐'}此产品`;
				this.$confirm(context, "提示", {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if (status == 1) {
						isputaway({
							pid: data.pid,
							pPutawaytype: data.pPutawaytype == 1 ? 2 : 1
						}).then(res => {
							this.$message.success(`已${data.pPutawaytype==1?'下架':'上架'}此产品`);
							this.getList();
						})
					} else if (status == 2) {
						updProductDetails({
							pid: data.pid,
							pAdvertise: data.pAdvertise == 1 ? 2 : 1
						}).then(res => {
							this.$message.success('设置成功');
							this.getList();
						})
					} else if (status == 3) {
						isrecommend({
							pid: data.pid,
							pRecommendtype: data.pRecommendtype == 1 ? 0 : 1
						}).then(res => {
							this.$message.success('设置成功');
							this.getList();
						})
					} else if (status == 4) {
						delproduce({
							pid: data.pid
						}).then(res => {
							this.$message.success("删除成功");
							this.getList();
						})
					}
				})
			},
			// 获取列表
			getList(options) {
				if (options == "query") { //快速查找
					this.form.current = 0;
					this.form.size = 0;
				} else if (options) {
					this.form.current = options.currentPage;
					this.form.size = options.pageSize;
				}
				this.loading = true;
				selcommoditise(this.form).then(res => {
					this.tableData = res.productDetailsList;
					this.loading = false;
				})
			},
			// 重置
			reset() {
				for (let i in this.form) {
					this.form[i] = "";
				};
				this.form.current = 1;
				this.form.size = 5;
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
