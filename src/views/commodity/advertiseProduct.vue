<template>
	<div class="advertiseProduct" v-loading="loading">
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 身体 -->
		<div class="advertiseProduct-body el-header-normal-margin-top">
			<el-table @select="selectTble" @select-all="selectAll" :max-height="600" :data="tableData" size="mini" stripe style="width: 100%" border tooltip-effect="dark" :header-cell-style="{ background: '#eef1f6', color: '#606266' }" ref="multipleTable">
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
				<el-table-column  label="产品价格" width="100">
					<template slot-scope="scope">
						<div>原价：{{scope.row.pPrice}}</div>
						<div>现价：{{scope.row.pPricef}}</div>
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
				<el-table-column prop="uStaus" label="运费">
					<template slot-scope="scope">
						<span>{{scope.row.pFreight==0?"免费":scope.row.pFreight}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="uStaus" label="推荐状态">
					<template slot-scope="scope">
						<span :style="scope.row.pRecommendtype==1?'color:green':'color:red'">{{scope.row.pRecommendtype==1?"已推荐":"未推荐"}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="uStaus" label="上下架状态" width="100">
					<template slot-scope="scope">
						<span :style="scope.row.pPutawaytype==1?'color:green':'color:red'">{{scope.row.pPutawaytype==1?"上架中":"未上架"}}</span>
					</template>
				</el-table-column>
				<el-table-column width="200" label="操作" fixed="right">
					<template slot-scope="scope">
<!-- 						<el-button :type="scope.row.pPutawaytype==1?'danger':'success'" @click="tableBtn(scope.row,1)" size="small">{{scope.row.pPutawaytype==1?'下架':'上架'}}</el-button>
						<el-button :type="scope.row.pAdvertise==1?'danger':'success'" @click="tableBtn(scope.row,2)" size="small">{{scope.row.pAdvertise==1?"不推荐宣传":"推荐宣传"}}</el-button> -->
						<el-button type="primary" @click="$router.push({query:{pid:scope.row.pid,show:true},path:'/commodity/product_ch.jsp'})" size="small">查看</el-button>
						<el-button type="danger" @click="tableBtn(scope.row,4)" size="small">生成二维码</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- 底部 -->
		<div class="useridcard-footer" v-if="form.current">
			<Pagination @callFather="getList" :childMsg="{currentPage:form.current,pageSize:form.size}" />
		</div>
		<!-- 弹出 -->
		<el-dialog destroy-on-close title="生成二维码（生成二维码后鼠标右击另存即可）" :visible.sync="dialogVisible" width="500px" >
		  <span></span>
		  <el-form :model="formDialog" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		    <el-form-item label="宽度" prop="width">
		      <el-input v-model="formDialog.width" type="Number" style="width: 200px;" placeholder="二维码的宽度例如:400"></el-input>
		    </el-form-item>
			<el-form-item label="路径" prop="page">
			    <el-select v-model="formDialog.page" placeholder="请选择" style="width: 200px;">
			      <el-option label="商品" value="pages/class/goodsDetails;0" />
				  <el-option label="分众" value="pages/class/goodsDetails;FenZhong" />
				  <el-option label="活动页" value="pages/index/publicLists;0" />
			    </el-select>
			</el-form-item>
			<el-form-item label="底色是否透明">
			  <el-select v-model="formDialog.ishyaline" placeholder="请选择" style="width: 200px;">
			    <el-option label="透明" :value="1" />
			    <el-option label="不透明" :value="0" />
			  </el-select>
			</el-form-item>
		  </el-form>
		  
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="addPost">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
	import {
		selAdvertiseProductDetailsAll,
		getQR
	} from "@/api/userMG.js";
	import { getAllBrand } from "@/api/basisMG.js";
	import Pagination from "@/components/Pagination.vue"
	export default {
		name: "advertiseProduct",
		components:{Pagination},
		data() {
			return {
				tableData: [],
				loading: false,
				dialogVisible:false,
				formDialog:{
					pid:"",
					width:"",
					page:"",
					ishyaline:0
				},
				form: {
					size:5,
					current:1,
				},
				 rules:{
					 width:[{required: true, message: '请输入宽', trigger: 'blur'}],
					 page:[{required: true, message: '请选择二维码跳转的路径', trigger: 'blur'}]
				 }
			}
		},
		created() {
			this.getList();
		},
		methods: {
			selectTble(options,row){
				this.upDownAll = options;
			},
			selectAll(options){
				this.upDownAll = options;
			},
			// 表格里的点击事件
			tableBtn(data, status) {
				if(status == 4){
				    this.dialogVisible = true;	
					this.formDialog.pid = data.pid;
					for(let i in this.formDialog){
						if(i == "ishyaline")this.formDialog[i]=0;
						else this.formDialog[i]="" ;
					}
				}
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
				selAdvertiseProductDetailsAll(this.form).then(res => {
					this.tableData = res.list;
					this.loading = false;
				})
			},
			// 生成二维码
			addPost(){
				this.$refs["ruleForm"].validate((valid)=>{
					if(valid){
						getQR(this.formDialog).then(res=>{
							this.$router.push({path:"/commodity/lookImage",query:{url:res.url}})
						})						
					}
				})

			}
		}
	}
</script>
<style lang="scss" scoped>
	.advertiseProduct {
		.advertiseProduct-body {}

		.advertiseProduct-header {
			display: flex;
			flex-wrap: wrap;
		}
	}
</style>
