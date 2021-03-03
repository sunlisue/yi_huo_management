<template>
	<div class="getAllBrand">
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="tab-content">

			<el-button type="primary" size="small" @click="dialogVisible = true">添加品牌</el-button>


			<el-table :max-height="700" class="el-header-normal-margin-top" size="mini" id="table" :data="tableData" v-loading="isTableLoading"
			 border :header-cell-style="{ background: '#eef1f6', color: '#606266' }" :style="{ width: `${windowWidth - 260}px` }">
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
			</el-table>
		</div>
		<!-- 对话框 -->
		<el-dialog title="添加新的品牌" :visible.sync="dialogVisible" width="500px" :destroy-on-close="true">
			<el-form ref="ruleForm"  label-position="top" label-width="80px" :model="formDialog" :rules="rules">
				<el-form-item label="品牌名称:" prop="name">
					<el-input v-model="formDialog.name"></el-input>
				</el-form-item>
				<el-form-item label="品牌介绍:" prop="action">
					<el-input type="textarea" :rows="2" placeholder="请输入介绍" v-model="formDialog.action">
					</el-input>
				</el-form-item>
				<el-form-item label="品牌logo:" prop="logo">
					<el-upload class="avatar-uploader" action="" :show-file-list="false" :on-success="handleAvatarSuccess">
						<img v-if="imageUrl" :src="imageUrl" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
			</el-form>


			<span slot="footer" class="dialog-footer">
				<el-button @click="restPost">取 消</el-button>
				<el-button type="primary" @click="addPost">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 底部 -->
		<!-- 		<div class="useridcard-footer" v-if="form.current">
			<Pagination @callFather="init" :childMsg="{currentPage:form.current,pageSize:form.size}" />
		</div> -->
	</div>
</template>

<script>
	import {
		getAllBrand
	} from "@/api/basisMG.js";
	import classUtil from "@/api/classUtil";
	import Pagination from "@/components/Pagination.vue";
	export default {
		name: "getAllBrand",
		components: {
			Pagination
		},
		data() {
			return {
				classUtil: classUtil,
				tableData: [],
				isTableLoading: false, //表格加载中
				dialogVisible: false,
				windowWidth: document.documentElement.clientWidth, //实时屏幕宽度
				imageUrl: "",
				formDialog: {
					name: "",
					action: "",
					logo: ""
				},
				form: {
					current: 1,
					size: 5
				},
				rules:{
					name:[{ required: true, message: '品牌名不能为空', trigger: 'blur' }],
					action:[{ required: true, message: '品牌介绍不能为空', trigger: 'blur' }],
					logo:[{ required: true, message: '品牌logo不能为空', trigger: 'blur' }]
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
				this.getAllBrand(params).then(data => {
					this.tableData = data.allBrand;
					this.isTableLoading = false;
				});
			},
			restPost(){
				this.dialogVisible = false;
				setTimeout(()=>{
					for(let i in this.formDialog){
						this.formDialog[i] = '';
					}
				},500)
			},
			// 确认
			addPost(){
				this.$refs["ruleForm"].validate((valid) => {
					if(valid){
						console.log(valid)
					}
				})
			},
			// 上传图片
			handleAvatarSuccess(res) {
				// imageUrl
				console.log(res)
			},
			async getAllBrand() {
				let res = await getAllBrand();
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
	.getAllBrand {
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
	}
</style>
