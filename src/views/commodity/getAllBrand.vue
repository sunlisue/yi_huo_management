<template>
	<div>
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="tab-content">
			<el-table size="mini" id="table" :data="tableData" v-loading="isTableLoading" border :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
			 :style="{ width: `${windowWidth - 260}px` }">
				<el-table-column type="selection" width="40" fixed></el-table-column>
				<el-table-column type="index" label="顺序" width="50px" fixed></el-table-column>
				<el-table-column prop="bId" label="品牌ID" width="80px"></el-table-column>
				<el-table-column prop="bName" label="品牌名称"></el-table-column>
				<el-table-column prop="bLogo" label="品牌LOGO">
					<template slot-scope="props">
						<img class="lunbo-table-img" :src="props.row.bLogo" alt="暂无图片" />
					</template>
				</el-table-column>
				<el-table-column prop="bIntroduce" label="品牌介绍" :show-overflow-tooltip="true"></el-table-column>
				<el-table-column prop="bState" label="品牌状态">
					<template slot-scope="props">
						<span :class="classUtil.addBrandIsTable(props.row.bState)" slot="reference">{{ props.row.bState | filterBrandState }}</span>
					</template>
				</el-table-column>
				<!-- <el-table-column label="操作" width="115" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleLook(scope.row)" v-has="'allOrder-查看入住人'"
              >查看入住人</el-button
            >
          </template>
        </el-table-column> -->
			</el-table>
		</div>
		<!-- 底部 -->
		<div class="useridcard-footer" v-if="form.current">
			<Pagination @callFather="init" :childMsg="{currentPage:form.current,pageSize:form.size}" />
		</div>
	</div>
</template>

<script>
	import {
		getAllBrand
	} from "@/api/basisMG.js";
	import classUtil from "@/api/classUtil";
	import Pagination from "@/components/Pagination.vue"
	export default {
		name: "getAllBrand",
		components:{Pagination},
		data() {
			return {
				classUtil: classUtil,
				tableData: [],
				isTableLoading: false, //表格加载中
				windowWidth: document.documentElement.clientWidth, //实时屏幕宽度
				form:{
					current:1,
					size:5
				}
			}
		},
		watch: {
			windowWidth(val) {
				this.windowWidth = val;
			},
		},
		mounted() {
			this.init();
			window.onresize = () => {
				return (() => {
					this.windowWidth = document.documentElement.clientWidth;
				})();
			};
		},
		methods: {
			//初始化
			init(params) {
				this.isTableLoading = true;
				if(params){
					this.form.current = params.currentPage;
					this.form.size = params.pageSize;
				}
				this.getAllBrand(params).then(data => {
					this.tableData = data.allBrand;
					this.isTableLoading = false;
				});
			},
			async getAllBrand() {
				let res = await getAllBrand(this.form);
				if (res.code === 200) {
					return res;
				} else {
					this.$message.error(res.msg);
				}
			},
		},
	}
</script>
<style lang="scss" scoped>
	.add-btn {
		padding-left: 10px;
		padding-bottom: 10px;
	}

	.tab-content {
		margin-top: 20px;
	}

	.lunbo-table-img {
		height: 100px;
	}
</style>
