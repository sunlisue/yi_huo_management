<template>
	<div class="product" v-loading="loading">
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 头部 -->
		<div class="product-header el-header-normal-margin-top">
			<el-input size="mini" v-model="form.oNumber" class="el-input-normal-width el-input-normal-margin-right" placeholder="订单号"></el-input>
			<el-input size="mini" v-model="form.defaddress" class="el-input-normal-width el-input-normal-margin-right" placeholder="地址"></el-input>
			<el-input size="mini" v-model="form.oPeople" class="el-input-normal-width el-input-normal-margin-right" placeholder="收件人"></el-input>
			<el-input size="mini" v-model="form.muName" class="el-input-normal-width el-input-normal-margin-right" placeholder="商户名"></el-input>
			<el-input size="mini" v-model="form.userDistributioName" class="el-input-normal-width el-input-normal-margin-right" placeholder="分销账号"></el-input>
			<div style="margin-top:10px;">
				<label class="el-input-normal-margin-right">
					下单日期:
					<el-date-picker size="mini" v-model="dateDouble" type="daterange" value-format="yyyy-MM-dd" range-separator="至"
					start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
				</label>
				<el-select size="mini" v-model="form.oType" placeholder="支付类型" class="el-input-normal-margin-right el-input-normal-select-width">
					<el-option :value="0" label="未选择" />
					<el-option :value="1" label="未支付" />
					<el-option :value="2" label="待发货" />
					<el-option :value="3" label="申请退款中" />
					<el-option :value="4" label="已退款" />
					<el-option :value="5" label="已发货" />
					<el-option :value="6" label="已完成" />
					<el-option :value="7" label="已取消" />
				</el-select>
				<el-select size="mini" v-model="form.oDistribution" placeholder="订单类型" class="el-input-normal-margin-right el-input-normal-select-width">
					<el-option :value="0" label="未选择" />
					<el-option :value="1" label="分销账单" />
					<el-option :value="2" label="普通账单" />
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
				<el-table-column prop="oNumber" label="订单号" width="150"></el-table-column>
				<el-table-column prop="defaddress" label="详细地址" width="150"></el-table-column>
				<el-table-column label="收件人" prop="oPeople" width="100"></el-table-column>
				<el-table-column prop="uName" label="下单账号" width="150"></el-table-column>
				<el-table-column prop="pName" label="下单产品" width="300"></el-table-column>
				<el-table-column prop="pColorname" label="颜色" width="150"></el-table-column>
				<el-table-column prop="pNum" label="产品数量" width="100"></el-table-column>
				<el-table-column prop="oPrice" label="订单价格" width="100"></el-table-column>
				<el-table-column prop="oTime" width="140" label="下单时间"></el-table-column>
				<el-table-column label="支付状态" width="100">
					<template slot-scope="scope">
						{{scope.row.oType | oType}}
					</template>
				</el-table-column>
				<el-table-column label="订单类型">
					<template slot-scope="scope">
						{{scope.row.oDistribution | oType}}
					</template>
				</el-table-column>
				<el-table-column prop="muName" label="所属商家" width="150" fixed="right"></el-table-column>
				<el-table-column prop="distributionUid" label="分销ID" width="150" fixed="right"></el-table-column>
				<el-table-column prop="userDistributioName" label="分销账号" width="150" fixed="right"></el-table-column>
			</el-table>
		</div>
		<!-- 底部 -->
		<div class="useridcard-footer" v-if="form.current">
			<Pagination @callFather="getList" :childMsg="{currentPage:form.current,pageSize:form.size}" />
		</div>
	</div>
</template>

<script>
	import { selOrderfromAlls } from "@/api/userMG.js";
	import Pagination from "@/components/Pagination.vue"
	export default {
		name: "orderFromNew",
		components:{Pagination},
		data() {
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
				this.form.oTime = res[0];
				this.form.fTime = res[1];
			}
		},
		created() {
			this.getList();
		},
		methods: {
			// 获取列表
			getList(options) {
				if(options == 'query'){
					this.form.current = 1;
					this.form.size = 5;
				}else if(options){
					this.form.current = options.currentPage;
					this.form.size = options.pageSize;
				}
				this.loading = true;
				selOrderfromAlls(this.form).then(res => {
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
