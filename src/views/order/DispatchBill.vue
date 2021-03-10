<template>
	<div class="product" v-loading="loading">
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 头部 -->
		<div class="product-header el-header-normal-margin-top">
			<el-input v-model="form.oNumber" class="el-input-normal-width el-input-normal-margin-right" placeholder="订单号"></el-input>
			<el-input v-model="form.uName" class="el-input-normal-width el-input-normal-margin-right" placeholder="用户名"></el-input>
			<el-button type="primary" size="small" @click="getList('query')">快速查询</el-button>
			<el-button type="primary" size="small" @click="reset">重置</el-button>
		</div>
		<!-- 身体 -->
		<div class="product-body el-body-normal-margin-top">
			<el-table :max-height="600" :data="tableData" size="mini" stripe style="width: 100%" border tooltip-effect="dark" :header-cell-style="{ background: '#eef1f6', color: '#606266' }" ref="multipleTable">
				<el-table-column type="selection" width="50"></el-table-column>
				<el-table-column type="index" label="序号" width="50"></el-table-column>
				<el-table-column prop="oNumber" label="订单号" width="150"></el-table-column>
				<el-table-column prop="defaddress" label="详细地址"></el-table-column>
				<el-table-column prop="uName" label="下单账号" width="80"></el-table-column>
				<el-table-column prop="pName" label="下单产品"></el-table-column>
				<el-table-column prop="oPrice" label="订单价格" width="80"></el-table-column>
				<el-table-column prop="oTime" label="下单时间" width="140"></el-table-column>
				<el-table-column label="支付状态" width="100">
					<template slot-scope="scope">
						<span>{{
              scope.row.oType | filterOrder
            }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="oDistribution" label="订单类型" width="130">
					<template slot-scope="scope">
						<span>{{scope.row.oDistribution==1 ? "分销订单" : "普通订单"}}</span>
					</template>
				</el-table-column>
				<el-table-column width="220" label="操作" fixed="right">
					<template slot-scope="scope">
						<el-button type="success" @click="updatePassword(scope.row)" v-if="scope.row.oType == 2 || scope.row.oType == 12 ? true : false" size="small">录入发货信息</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- 录入发货信息 -->
		<el-dialog :close-on-click-modal="false" center title="录入发货物流信息" :visible.sync="pwdVisible" width="30%">
			<el-form :model="pwdForm"  :rules="rules" ref="pwdForm" label-width="100px" size="mini">
				<el-form-item label="物流订单号" prop="loId">
					<el-input  v-model="pwdForm.loId" ></el-input>
				</el-form-item>
				<el-form-item label="物流公司" prop="lId">
					<el-select v-model="pwdForm.lId" placeholder="请选择物流公司"
						class="el-input-normal-margin-right el-input-normal-select-width">
						<el-option v-for="(item, index) in logisticsList" :key="index" :value="item.lId" :label="item.lName">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button icon="el-icon-check" size="mini" type="primary" @click="submitForm('pwdForm')">提交</el-button>
					<el-button icon="el-icon-close" size="mini" @click="resetForm('pwdForm')">重置</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<!-- 底部 -->
		<div class="useridcard-footer" v-if="form.current">
			<Pagination @callFather="getList" :childMsg="{currentPage:form.current,pageSize:form.size}" />
		</div>
	</div>
</template>

<script>
	import { selOrderfromByShipments, sleLogisticAll, instLogisticOrder } from "@/api/userMG.js";
	import Pagination from "@/components/Pagination.vue"
	export default {
		name: "product",
		components:{Pagination},
		data() {
			return {
				dateDouble: "",
				tableData: [],
				listActive:"",
				loading: false,
				form: {
					oNumber:"", //订单号
					uName:"", //用户名
					size:5,
					current:1,
				},
				pwdVisible: false, //录入发货信息
				pwdForm:{
					oId:"",
					loId:"",
					lId:"",
				},
				rules: {
					loId: [{
						required: true,
						message: "物流单号不能为空",
						trigger: ["blur", "change"],
					},],
					lId: [{
						required: true,
						message: "请选择物流公司",
						trigger: ["blur", "change"],
					},],
				},
				logisticsList: [], //物流公司
			}
		},
		created() {
			this.getList();
		},
		methods: {
			submitForm(){
				this.$refs['pwdForm'].validate(valid => {
					if(valid){
						this.pwdForm.oId=this.listActive.oNumber;
						instLogisticOrder(this.pwdForm).then(res=>{
							this.$message.success("录入成功");
							this.pwdVisible = false;
							this.getList();
						})
					}
				})
			},
			  resetForm(formName) {
				this.$refs[formName].resetFields();
			  },
			//录入发货信息
			updatePassword(data) {
				this.listActive = data;
				this.inputForm = JSON.parse(JSON.stringify(this.form));
				this.pwdVisible = true;
			},
			// 获取列表
			getList(options) {
				if(options == "query"){  //快速查找
					this.form.current = 1;
					this.form.size = 5;
				}else if(options){
					this.form.current = options.currentPage;
					this.form.size = options.pageSize;
				}
				this.loading = true;
				selOrderfromByShipments(this.form).then(res => {
					this.tableData = res.orders;
					this.loading = false;
				});
				sleLogisticAll().then(res => {
					this.logisticsList = res.logistics;
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
