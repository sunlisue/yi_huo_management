<template>
	<div class="refund" v-loading="loading">
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
		</el-breadcrumb>
			<!-- 头部 -->
			<div class="refund-header el-header-normal-margin-top">
				<el-input v-model="form.oNumber" class="el-input-normal-width el-input-normal-margin-right" placeholder="订单编号"></el-input>
				<el-input v-model="form.uPhone" class="el-input-normal-width el-input-normal-margin-right" placeholder="手机号"></el-input>
				<el-button type="primary" size="small" @click="getList('query')">快速查询</el-button>
				<el-button type="primary" size="small" @click="reset">重置</el-button>
			</div>
			<!-- 身体 -->
			<div class="refund-body el-body-normal-margin-top">
				<el-table :max-height="490" :data="tableData" size="mini" stripe style="width: 100%" border tooltip-effect="dark" :header-cell-style="{ background: '#eef1f6', color: '#606266' }" ref="multipleTable">
					<el-table-column type="selection" width="50"></el-table-column>
					<el-table-column type="index" label="序号" width="50"></el-table-column>
					<el-table-column label="用户头像" width="80">
						<template slot-scope="scope">
							<el-image style="width: 50px; height: 50px" :src="scope.row.uPic" fit="cover" />
						</template>
					</el-table-column>
					<el-table-column prop="uName" label="用户名" width="100"></el-table-column>
					<el-table-column prop="uPhone" label="手机号" width="150"></el-table-column>
					<el-table-column prop="rOPrice" label="退款金额" width="100"></el-table-column>
					<el-table-column label="订单状态" width="100">
						<template slot-scope="scope">
							{{scope.row.rHOType | rHOType}}
						</template>
					</el-table-column>
					<el-table-column prop="oNumber" label="订单编号" width="200"></el-table-column>
					<el-table-column label="退款图" width="80">
						<template slot-scope="scope">
							<el-image style="width: 50px; height: 50px" :src="scope.row.rPicurl" fit="cover" />
						</template>
					</el-table-column>
					</el-table-column>
					<el-table-column prop="rContent" label="退款理由" width="200"></el-table-column>
					<el-table-column prop="rtime" label="申请退款时间" width="150"></el-table-column>
					<el-table-column prop="rOPaytime" label="支付时间" width="150"></el-table-column>
					<el-table-column width="100" label="操作" fixed="right">
						<template slot-scope="scope">
							<el-button type="danger" @click="tableBtn(scope.row,1)" size="small">退款</el-button>
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
	import { getrefund,enterrefund } from "@/api/userMG.js";
	import Pagination from "@/components/Pagination.vue";
	export default {
		name: "refund",
		components:{Pagination},
		data() {
			return {
				tableData: [],
				loading: false,
				form: {
					oNumber: "", 
					uPhone:"",
					size:5,
					current:1,
				},
			}
		},
		created() {
			this.getList();
		},
		methods: {
			// 表格里的点击事件
			tableBtn(data, status) {
				this.$confirm("是否要退款","提示", {
					 confirmButtonText: '确定',
					 cancelButtonText: '取消',
					 type: 'warning',
				}).then(()=>{
					enterrefund({rid:data.rid,oNumber:data.oNumber}).then(res=>{
						this.getList();
						this.$message.success("退款成功");
					})
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
				getrefund(this.form).then(res => {
					this.tableData = res.orderfrom;
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
	.refund {
		.refund-body {}

		.refund-header {
			display: flex;
			flex-wrap: wrap;
		}
	}
</style>
