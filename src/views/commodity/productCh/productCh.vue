<template>
	<div class="productCh" v-if="loading">
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 返回 -->
		<div class="productCh-header el-header-normal-margin-top">
			<el-button type="primary" @click="$router.go(-1)">返回</el-button>
		</div>
		<!-- 内容 -->
		<div class="productCh-body el-header-normal-margin-top">
			<el-form label-position="right" label-width="150px" :model="form">
				<el-form-item label="简介:">
					<el-input type="textarea" :rows="3" :disabled="disabled" placeholder="未输入" v-model="form.pIntroduce"></el-input>
				</el-form-item>
				<el-form-item label="产品名:">
					<el-input v-model="form.pName" :disabled="disabled"  ></el-input>
				</el-form-item>
				<el-form-item label="类别:">
					<el-cascader placeholder="未选择" :disabled="disabled" :options="productDetailsArray" v-model="form.pType" :props="{multiple: true}" collapse-tags clearable @change="caScader" />
				</el-form-item>
				<el-form-item label="品牌:">
					<el-select v-model="form.pBrandid" :disabled="disabled" placeholder="未选择"><el-option v-for="(item,index) in allBrandArray" :key="index" :label="item.bName" :value="item.bId" /></el-select>
				</el-form-item>
				<el-form-item label="颜色:">
					<el-input v-model="form.pColorname" :disabled="disabled" ></el-input>
				</el-form-item>
				<el-form-item label="单个产品的数量:">
					<el-input v-model="form.pCount" :disabled="disabled" ></el-input>
				</el-form-item>
				<el-form-item label="单位:">
					<el-input v-model="form.pUnits" :disabled="disabled" ></el-input>
				</el-form-item>
				<el-form-item label="运费:">
					<el-input v-model="form.pFreight" :disabled="disabled" ></el-input>
				</el-form-item>
				<el-form-item label="库存:">
					<el-input v-model="form.pCount" :disabled="disabled" ></el-input>
				</el-form-item>
				<el-form-item label="评分:">
					<el-input v-model="form.pGrade" :disabled="disabled" ></el-input>
				</el-form-item>
				<el-form-item label="原价:">
					<el-input v-model="form.pPrice" :disabled="disabled" ></el-input>
				</el-form-item>
				<el-form-item label="现价:">
					<el-input v-model="form.pPricef" :disabled="disabled" ></el-input>
				</el-form-item>
				<el-form-item label="出厂价:">
					<el-input v-model="form.pCost" :disabled="disabled" ></el-input>
				</el-form-item>
				<el-form-item label="分销比例:">
					<el-input v-model="form.distributorRatio" :disabled="disabled" ></el-input>
				</el-form-item>
				<el-form-item label="系列:">
					 <el-select v-model="form.seriesId" :disabled="disabled" placeholder="未选择"><el-option v-for="(item,index) in getAllseriesArray" :key="index" :label="item.seriesName" :value="item.seriesId" /></el-select>
				</el-form-item>
				<el-form-item label="轮播图:" style="width: 1300px;">
				  <div v-if="!disabled">
					  <vuedraggable class="wrapper" v-model="form.productSlideshowList">
						<transition-group>
						  <div v-for="(item) in form.productSlideshowList" :key="item.sId" class="item">
							  <el-image style="width: 100px; height: 100px" :src="item.sPic" fit="cover"></el-image>
							  <div class="item-close" @click="formProductSlideshowList(item.sPic)">
							    <i class="el-icon-close"></i>
							  </div>
						  </div>
						</transition-group>
					  </vuedraggable>
					<el-upload accept="image/*" name="imgFile" :data="{imgtype:'spic'}" :show-file-list="false" :on-success="onSuccess" class="upload-demo" action="/api/userclientapi/uploadpic"  multiple>
					  <el-button size="small" type="primary" icon="el-icon-upload">点击上传</el-button>
					</el-upload>
				  </div>
				  <div class="wrapper" v-else>
					 <span>
						  <div v-for="(item,index) in form.productSlideshowList" :key="index" class="item">
							  <el-image style="width: 100px; height: 100px" :src="item.sPic" fit="cover"></el-image>
						  </div>
					 </span> 
				  </div>
				</el-form-item>
				<el-form-item label="富文本:" style="width:100%;">
					<editor :class="disabled?'editor-ban':''" :content="form.pImagetext" :height="500" @change="updateData" :z-index="100" :auto-height="true" :show-module-name="true" />
				</el-form-item>
				<el-form-item label="操作:" style="width:100%;" v-if="!disabled">
					<el-button icon="el-icon-check" type="primary">提交</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
	import {productDetails,selcategory,getAllseries,ManagerselcategoryBycid} from "@/api/userMG.js";
	import {getAllBrand} from "@/api/basisMG.js";
	import options_data from "@/utils/VueHtml5Editor_data.js";
	import vuedraggable from "vuedraggable";
	import VueHtml5Editor from "vue-html5-editor";
	const editor = new VueHtml5Editor(options_data);
	export default {
		components:{vuedraggable,editor},
		data() {
			return {
				form: {
					pName:"",
					pType:[],
					pBrandid:"",
					pColorname:"",
					pCount:"",
					pUnits:"",
					pFreight:"",
					pCount:"",
					pGrade:"",
					pPrice:"",
					pPricef:"",
					pCost:"",
					distributorRatio:"",
					seriesId:"",
					productSlideshowList:[],
					pImagetext:"",
				},
				disabled:true,
				productDetailsArray:[],
				getAllseriesArray:[{seriesName:"暂无系列",seriesId:0}],
				allBrandArray:[{bName:"暂无品牌",bId:0}],
				loading:false,
			}
		},
	async mounted() {
			if(!this.$route.query.pid){
				this.loading = true;
			}else{
				// 详情
				await productDetails({pid: this.$route.query.pid}).then(res => {this.form = res.productDetails;this.loading=true;this.cIdMap(res.productDetails.pType)});				
			}
			// 品牌列表
			await getAllBrand().then(res=>{this.allBrandArray.push(...res.allBrand)})
			// 系列列表
			await getAllseries().then(res=>{this.getAllseriesArray.push(...res.series);})
			// 产品类型
			await selcategory().then(res=>{this.classCh(res.datalist)});
			this.disabled=this.$route.query.show=='true';
		},
		methods: {
			// 富文本事件
			updateData(e){
				console.log(e)
			},
			caScader(e){
				// console.log("选中",e)
			},
			// 产品类别的数据转换
			cIdMap(e){
				this.form.pType=[];
				e.map(res=>{res.productCategorySons.map(item=>{this.form.pType.push([res.cId,item.cId])});});
			},
			classCh(e){
				e.map(res=>{
					let obj = {};
					obj.value = res.cId;
					obj.label = res.cType;
					obj.children = [] ;
					res.categories.map(item=>{obj.children.push({value:item.cId,label:item.cType})});
					this.productDetailsArray.push(obj)
				})
			},
			formProductSlideshowList(e){
				this.form.productSlideshowList = this.form.productSlideshowList.filter(res=>{
					return res.sPic != e;
				});
			},
			onSuccess(res){
				this.form.productSlideshowList.push({sPic:res.url})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.productCh {
		.productCh-body {
			.el-form {
				// margin-left: 350px;
				display: flex;
				flex-wrap: wrap;
				.el-form-item {
					margin-bottom: 10px;
					width: 500px;
				}
			}
			.wrapper{
				span{
				  display: flex;
				  width: 100%;
				  overflow-x: auto;
				  height: 120px;
				}
			} 
			.item{
				margin-right: 5px;
				position: relative;
				.item-close{
					position: absolute;
					top: 0;
					right: 0;
					width: 15px;
					height: 15px;
					cursor: pointer;
					display: flex;
					align-items: center;
					justify-content: center;
					border-radius: 50%;
					background-color: rgba(0,0,0,0.5);
					border: 1px solid rgba(255,255,255,0.5);
					.el-icon-close{
						color: rgba(255,255,255,0.5);
						font-size: 10px;
					}
				}
			}
		}
	}
</style>
