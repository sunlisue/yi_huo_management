<template>
	<div class="product" v-loading="loading">
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 头部 -->
		<div class="product-header el-header-normal-margin-top">
			<el-input size="mini" v-model="form.pName" class="el-input-normal-width el-input-normal-margin-right" placeholder="订单号"></el-input>
			<el-input size="mini" v-model="form.pName" class="el-input-normal-width el-input-normal-margin-right" placeholder="地址"></el-input>
			<el-input size="mini" v-model="form.pName" class="el-input-normal-width el-input-normal-margin-right" placeholder="收件人"></el-input>
			<el-input size="mini" v-model="form.pName" class="el-input-normal-width el-input-normal-margin-right" placeholder="商户号"></el-input>
			<el-input size="mini" v-model="form.pName" class="el-input-normal-width el-input-normal-margin-right" placeholder="分销账号"></el-input>
			<div style="margin-top:10px;">
				<label class="el-input-normal-margin-right">
					下单日期:
					<el-date-picker size="mini" v-model="dateDouble" type="daterange" value-format="yyyy-MM-dd" range-separator="至"
					start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
				</label>
				<el-select size="mini" v-model="form.pType" placeholder="支付类型" class="el-input-normal-margin-right el-input-normal-select-width">
					<el-option v-for="(item,index) in selcategoryArray" :key="index" :value="item.cId" :label="item.cType"></el-option>
				</el-select>
				<el-select size="mini" v-model="form.pBrandid" placeholder="订单类型" class="el-input-normal-margin-right el-input-normal-select-width">
					<el-option v-for="(item,index) in selectBrandArray" :key="index" :value="item.bId" :label="item.bName"></el-option>
				</el-select>
				<el-button size="mini" type="primary" @click="getList('query')">快速查询</el-button>
				<el-button size="mini" type="primary" @click="reset">重置</el-button>
				<el-button size="mini" type="primary" @click="reset">验证</el-button>
			</div>
			
		</div>
		<!-- 身体 -->
		<div class="product-body el-body-normal-margin-top">
			<el-table :max-height="600" :data="tableData" size="mini" stripe style="width: 100%" border tooltip-effect="dark" :header-cell-style="{ background: '#eef1f6', color: '#606266' }" ref="multipleTable">
				<el-table-column type="selection" width="50"></el-table-column>
				<el-table-column type="index" label="序号" width="50"></el-table-column>
				<el-table-column prop="oNumber" label="订单号" width="130"></el-table-column>
				<!-- <el-table-column label="oNumber" width="125"></el-table-column> -->
				<!-- <el-table-column  label="产品价格" width="100">
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
				</el-table-column> -->
				<el-table-column prop="defaddress" label="详细地址"></el-table-column>
				<el-table-column label="收件人" prop="oPeople" width="150"></el-table-column>
				<el-table-column prop="uName" label="下单账号"></el-table-column>
				<el-table-column prop="pName" label="下单产品"></el-table-column>
				<el-table-column prop="pColorname" label="颜色"></el-table-column>
				<el-table-column prop="pNum" label="产品数量"></el-table-column>
				<el-table-column prop="oPrice" label="订单价格"></el-table-column>
				<el-table-column prop="oTime" width="140" label="下单时间"></el-table-column>
				<el-table-column prop="sTitle" label="支付状态"></el-table-column>
				<el-table-column prop="sTitle" label="订单类型"></el-table-column>
				<el-table-column prop="sTitle" label="所属商家"></el-table-column>
				<el-table-column prop="sTitle" label="分销ID"></el-table-column>
				<el-table-column prop="sTitle" label="分销账号"></el-table-column>
			</el-table>
		</div>
		<!-- 底部 -->
		<div class="useridcard-footer" v-if="form.current">
			<Pagination @callFather="getList" :childMsg="{currentPage:form.current,pageSize:form.size}" />
		</div>
	</div>
</template>

<script>
	import { selOrderAllPlatform } from "@/api/payMG.js";
	import { getAllBrand } from "@/api/basisMG.js";
	import Pagination from "@/components/Pagination.vue"
	export default {
		name: "orderFromAll",
		components:{Pagination},
		data() {
			let isme = JSON.parse(localStorage.getItem("userdata")).id;
			return {
				dateDouble: "",
				tableData: [],
				loading: false,
				form: {
					size:5,
					current:1,
					muName:"", //商户名
					defaddress:"", //地址
					oTime:"", //订单开始日期
					fTime:"", //订单结束日期
					oType:0, //订单类型
					oPeople:"", //收件人
					userDistributioName:"", //分销账号
					oNumber:"", //订单号
					oDistribution:0, //订单类型
				},
				selcategoryArray:[],
				selectBrandArray:[],
			}
		},
		watch: {
			dateDouble(res){
				this.form.startTime = res[0];
				this.form.stopTime = res[1];
			}
		},
		created() {
			this.getList();
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
			getList(options) {
				if(options == "query"){  //快速查找
					this.form.current = 0;
					this.form.size = 0;
				}else if(options){
					this.form.current = options.currentPage;
					this.form.size = options.pageSize;
				}
				this.loading = true;
				selOrderAllPlatform(this.form).then(res => {
					this.tableData = res.orders;
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
			},
			async getAllBrand(){
				let res = await getAllBrand({});
				if (res.code === 200) {
					return res;
				} else {
					this.$message.error(res.msg);
				}
			},
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
