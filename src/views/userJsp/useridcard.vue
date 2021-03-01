<template>
	<div class="useridcard" v-loading="loading">
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
		</el-breadcrumb>

		<!-- 身体 -->
		<div class="useridcard-body el-body-normal-margin-top">
			<el-table :data="tableData" stripe style="width: 100%" tooltip-effect="dark" ref="multipleTable">
				<el-table-column type="selection" width="50">
				</el-table-column>
				<el-table-column type="index" label="序号" width="80">
				</el-table-column>
				<el-table-column prop="uName" label="用户昵称" width="150">
				</el-table-column>
				<el-table-column label="身份证正面">
					<template slot-scope="scope">
						<el-image @click="lookImage(scope.row.iOne)" style="width: 100px; height: 100px;" :src="scope.row.iOne" fit="cover"></el-image>
					</template>
				</el-table-column>
				<el-table-column label="身份证反面">
					<template slot-scope="scope">
						<el-image @click="lookImage(scope.row.iTwo)" style="width: 100px; height: 100px;" :src="scope.row.iTwo" fit="cover"></el-image>
					</template>
				</el-table-column>
				<el-table-column prop="uPhone" label="手机号">
				</el-table-column>
				<el-table-column prop="iTime" label="注册时间">
				</el-table-column>

				<el-table-column width="300" label="操作">
					<template slot-scope="scope">
						<el-button type="danger" @click="tableBtn(scope.row,1)" size="small">通过</el-button>
						<el-button type="danger" @click="tableBtn(scope.row,2)" size="small">不通过</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- 底部 -->
		<div class="useridcard-footer" v-if="form.current">
			<Pagination @callFather="getList" :childMsg="{currentPage:form.current,pageSize:form.size}" />
		</div>
		
		<!-- 相册查看器 -->
		<el-image-viewer v-if="showViewer" :on-close="closeViewer" :url-list="[url]" />
	</div>
</template>

<script>
	import {
		selUseridcardAll
	} from "@/api/userMG.js";
	import ElImageViewer from 'element-ui/packages/image/src/image-viewer';
	import Pagination from "@/components/Pagination.vue";
	export default {
		name: "useridcard",
		components: {
			ElImageViewer,Pagination
		},
		data() {
			return {
				tableData: [],
				loading: false,
				showViewer:false,
				url:"",
				form:{
					current:1,
					size:5
				},
			}
		},
		created() {
			this.getList();
		},
		methods: {
			tableBtn(data,status){
				let context;
				if (status == 1) context = "警告！是否要升级该用户为店主！";
				else context = "警告！是否要为该用户办理升级店主未通过！";
				
				this.$confirm(context, "提示", {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if (status == 1) {
						this.$message.success("通过！")
					} else {
						this.$message.success("不通过！")
					}
				})
			},
			
			// 关闭查看器
			closeViewer() {
			 this.showViewer = false
			},
			lookImage(url){
				this.url = url;
				this.showViewer = true
			},
			// 获取列表
			getList(options) {
				if(options){
					this.form.current = options.currentPage;
					this.form.size = options.pageSize;
				}
				this.loading = true;
				selUseridcardAll(this.form).then(res => {
					this.tableData = res.useridcards;
					this.loading = false;
				})
			},
		}
	}
</script>
<style lang="scss" scoped>
	.useridcard-body {}
</style>
