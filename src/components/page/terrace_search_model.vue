<template>
    <div id="mine_model">
        <div class="wai_box">
            <div class="tit">
                <div>平台变量库/模型搜索</div>
                <div class="btn_box">
                    <div class="nv_btn_2"  @click="$router.push({path:'/creat_model'})">新建模型</div>
                    <div class="nv_btn_2"  @click="$router.push({path:'/creat_fun'})">新建变量</div>
                    <!--<el-button plain icon="el-icon-plus" @click="$router.push({path:'/creat_model'})">新建模型</el-button>-->
                    <!--<el-button plain icon="el-icon-plus" @click="$router.push({path:'/creat_fun'})">新建变量</el-button>-->
                </div>
            </div>
            <div class="content_box">
                <el-row style="padding: 0 30px">
                    <el-col :span="8">
                        <el-input v-model="input" placeholder="请输入模型名称" suffix-icon="el-icon-search">
                            <!--<el-select v-model="input" slot="prepend"  placeholder="请选择">-->
                                <!--<el-option-->
                                        <!--v-for="item in options"-->
                                        <!--:key="item.value"-->
                                        <!--:label="item.label"-->
                                        <!--:value="item.label">-->
                                <!--</el-option>-->
                            <!--</el-select>-->
                        </el-input>
                    </el-col>
                    <el-col :span="2"><div class="nc_btn"  @click="search">搜索</div></el-col>

                    <!--<el-col :span="2"><el-button type="primary" style="background-color: #1C9A7E;margin-left: 10px;border-color: #1C9A7E" @click="search">搜索</el-button></el-col>-->
                </el-row>
            </div>
            <el-row style="padding-left: 20px"><el-col>搜索结果</el-col></el-row>
            <div class="content_box">
                <el-row style="padding-left: 20px;height: 30px;font-size: 14px;color: #737373;"><el-col>共{{tableData.length}}条数据</el-col></el-row>
                <div class="model_item" v-for="(item,index) in tableData">
                    <el-row style="font-size: 14px">
                        <el-col :span="24"> <span style="font-weight: 600;font-size: 14px"> 文章名：</span>《{{item.article_name}}》</el-col>
                        <!--<el-col :span="6">作者：{{item.article_author}}</el-col>-->
                        <!--<el-col :span="6">索引信息：{{item.article_message}}</el-col>-->
                    </el-row>
                    <!--<el-row style="margin: 7px 0">-->
                        <!--<el-col :span="24"> <span style="font-weight: 600;font-size: 14px">作者：</span> {{item.article_author}}</el-col>-->
                    <!--</el-row>-->
                    <div style="display: flex;font-size: 14px;margin: 7px 0">
                        <div style="min-width: 40px;font-weight: 600">作者：</div>
                        <div>{{item.article_author}}</div>
                    </div>
                    <!--<el-row>-->
                        <!--<el-col :span="24"> <span style="font-weight: 600;font-size: 16px">索引信息：</span> {{item.article_message}}</el-col>-->
                    <!--</el-row>-->
                    <div style="display: flex;font-size: 14px">
                        <div style="min-width: 70px;font-weight: 600">索引信息：</div>
                        <div>{{item.article_message}}</div>
                    </div>
                    <div class="sheji">
                        <div style="font-weight: 600;font-size: 14px;min-width: 80px">涉及变量：</div>
                        <div style="text-align: left">
                            <a v-for="(blname,indexs) in item.var" style="color:#009E79;cursor: pointer" @click="toModel(index,indexs)" :href="baseURL+'#/terrace_fun_item_detail/?id='+tableData[index].var[indexs].id+'&&type=2' " target="_Blank">
                            <span>{{blname.name}}（<span v-for="(blname_item,index) in blname.dis">{{blname_item.name}}<span v-if="index!=blname.dis.length-1">，</span></span>）<span v-if="index!=item.var.length-1">，</span>
                            </span>
                            </a>
                        </div>
                    </div>
                    <div class="guanxi">
                        <div style="font-weight: 600;font-size: 14px;min-width: 80px">变量关系：</div>
                        <div style="text-align: left">
                            <div v-for="(relation,index)  in item.rea" style="display: inline">
                                <span>{{relation.z_bl}}</span>
                                <span v-if="relation.is_add==1">(<span class="iconfont icon-jia2" ></span>)</span>
                                <span v-else="relation.is_add==0">(<span class="iconfont icon-jian1" ></span>)</span>
                                <span class="iconfont icon-jiantouarrow484"></span>
                                <span>{{relation.y_bl}}</span>
                                <span>
                                    <span v-if="relation.is_adjust==1">{{'(调节变量：'+relation.adjust+')'}}</span>
                                    <span v-else>（无调节）</span>
                                </span>
                                <span  v-if="index!=item.rea.length-1">，</span>
                            </div>
                        </div>
                    </div>
                    <div class="nc_box" v-if="is_admin==1">
                        <a :href="baseURL+'#/terrace_model_detail/?id='+tableData[index].id+'&&key_words='+$route.query.key_words" class="nc_box_btn" target="_Blank">查看详情</a>
                        <!--<div class="nc_box_btn" @click="tomodel_de(index)" >查看详情</div>-->
                        <div class="nc_box_btn" @click="demodel(index)">移除</div>
                        <div class="nc_box_btn" @click="tobian(index)">编辑</div>
                    </div>
                    <div class="nc_box2" v-if="is_admin==0">
                        <!--<div class="nc_box_btn" @click="tomodel_de(index)">查看详情</div>-->
                        <a :href="baseURL+'#/terrace_model_detail/?id='+tableData[index].id+'&&key_words='+$route.query.key_words" class="nc_box_btn" target="_Blank">查看详情</a>
                        <div class="nc_box_btn" v-if="tableData[index].is_add==0" @click="imports_model(index)"><strong>+</strong>添加到我的模型库</div>
                        <div class="nc_box_btn" v-if="tableData[index].is_add==1" style="width: 88px; height: 40px;line-height: 40px;border: 1px solid #AFAFAF;color: #AFAFAF;">已添加</div>
                        <!--<div class="nc_box_btn" @click="tobian(index)" style="width: 110px;line-height: 40px;margin-left: 20px">编辑</div>-->
                    </div>
                </div>
            </div>
            <div class="fenye">
                <el-pagination
                        background
                        layout="prev, pager, next"
                        @current-change="handleCurrentChange"
                        :total="pages*10">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
	import service from '../../assets/service';
	this.baseURL=service.baseURL;
	export default {
		data(){
			return{
				baseURL:"",
				input:"",
				options:[
					{
						value:"1",
						label:"变量"
					},{
						value:"2",
						label:"变量"
					},{
						value:"3",
						label:"变量"
					},
				],
				tableData:[
					{
						article_name:"文章名称",
						article_author:"作者1",
						article_message:"检索信息",
						var:[
							{
								name:"构念名称",
								dis:[
									{name:"匆匆"},{name:"匆匆"},{name:"匆匆"},{name:"匆匆"},{name:"匆匆"}
								]
							},
							{
								name:"构念名称",
								dis:[
									{name:"匆匆"},{name:"匆匆"},{name:"匆匆"},{name:"匆匆"}
								]
							},
							{
								name:"构念名称",
								dis:[
									{name:"匆匆"},{name:"匆匆"},{name:"匆匆"},{name:"匆匆"}
								]
							},
						],
						rea:[
							{
								z_bl:"自变量1",
								y_bl:"因变量1",
								is_add:"0",
								is_adjust:"0",
								adjust:""
							},
							{
								z_bl:"自变量1",
								y_bl:"因变量1",
								is_add:"0",
								is_adjust:"0",
								adjust:""
							},
							{
								z_bl:"自变量1",
								y_bl:"因变量1",
								is_add:"0",
								is_adjust:"0",
								adjust:""
							},
						]
					},
					{
						article_name:"文章名称",
						article_author:"作者1",
						article_message:"检索信息",
						var:[
							{
								name:"构念名称",
								dis:[
									{name:"匆匆"},{name:"匆匆"},{name:"匆匆"},{name:"匆匆"},{name:"匆匆"}
								]
							},
							{
								name:"构念名称",
								dis:[
									{name:"匆匆"},{name:"匆匆"},{name:"匆匆"},{name:"匆匆"}
								]
							},
							{
								name:"构念名称",
								dis:[
									{name:"匆匆"},{name:"匆匆"},{name:"匆匆"},{name:"匆匆"}
								]
							},
						],
						rea:[
							{
								z_bl:"自变量1",
								y_bl:"因变量1",
								is_add:"0",
								is_adjus:"0",
								adjust:""
							},
							{
								z_bl:"自变量1",
								y_bl:"因变量1",
								is_add:"0",
								is_adjus:"0",
								adjust:""
							},
							{
								z_bl:"自变量1",
								y_bl:"因变量1",
								is_add:"0",
								is_adjus:"0",
								adjust:""
							},
						]
					},
					{
						article_name:"文章名称",
						article_author:"作者1",
						article_message:"检索信息",
						var:[
							{
								name:"构念名称",
								dis:[
									{name:"匆匆"},{name:"匆匆"},{name:"匆匆"},{name:"匆匆"},{name:"匆匆"}
								]
							},
							{
								name:"构念名称",
								dis:[
									{name:"匆匆"},{name:"匆匆"},{name:"匆匆"},{name:"匆匆"}
								]
							},
							{
								name:"构念名称",
								dis:[
									{name:"匆匆"},{name:"匆匆"},{name:"匆匆"},{name:"匆匆"}
								]
							},
						],
						rea:[
							{
								z_bl:"自变量1",
								y_bl:"因变量1",
								is_add:"0",
								is_adjust:"1",
								adjust:"dsafgadf"
							},
							{
								z_bl:"自变量1",
								y_bl:"因变量1",
								is_add:"0",
								is_adjust:"0",
								adjust:""
							},
							{
								z_bl:"自变量1",
								y_bl:"因变量1",
								is_add:"0",
								is_adjust:"0",
								adjust:""
							},
						]
					},
				],
				pages:"",
                is_admin:""
			}
		},
		mounted(){
			this.is_admin=localStorage.getItem('is_admin')
			this.getdataMsg();
		},
		methods:{
			getdataMsg(){
				var self=this
				var key_words=this.$route.query.key_words
				self.$axios.get('terrace_search_model_get',{key_words:key_words},(res)=>{
					console.log(res)
					if(res.ret){
						self.pages=res.msg/10;
						self.tableData=res.data.data
					}
				})
			},
			handleCurrentChange(val){
				var self=this;
				if (self.input==""){
					self.$axios.get('terrace_search_model_get',{page:val},(res)=>{
						console.log(res);
                        if(res.ret){
                            self.tableData=res.data
                        }

					})
				}else {
					self.$axios.get('terrace_search_model_get',{page:val,key_words:self.input},(res)=>{
						console.log(res);
						if (res.ret){
							self.tableData=res.data
						}
					})
				}
			},
			search(){
				var self=this
				if (self.input==""){
					self.$axios.get('terrace_search_model',{key_words:self.input},(res)=>{
						if (res.ret){
							self.pages=res.msg/1;
							self.tableData=res.data.data
						}
					})
				}else {
					self.$axios.get('terrace_search_model',{key_words:self.input},(res)=>{
						console.log(res)
						if (res.ret){
							self.pages=res.msg/1;
							self.tableData=res.data.data
						}
					})
				}
			},
			tomodel_de(index){
				var self=this;
				var id=self.tableData[index].id;
				var key_words=this.$route.query.key_words
				self.$router.push({path:"/terrace_model_detail", query: { id: id ,key_words:key_words}})
			},
			tobian(index){
				var self=this;
				var id=self.tableData[index].id;

                if(this.is_admin==1){
	                self.$router.push({path:"/creat_model", query: { id: id}})
                }else if(this.is_admin==0){
                	self.$axios.post('model_isupdate',{id:id},res=>{
                		if(res.ret){
			                self.$router.push({path:"/creat_model", query: { id: id}})
                        }else {
                			self.$message.error('您无权操作')
                        }
                    })
                }
            },
			demodel(index){
				var self=this;
				var id=self.tableData[index].id;
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					self.$axios.post('delmodel_msg',{id:id},(res)=>{
						if(res.ret){
							self.tableData.splice(index,1);
							this.$message({
								message: '删除成功',
								type: 'success'
							});
						}else {
							this.$message({
								message: '操作失败',
								type: 'warning'
							});
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});

			},
			imports_model(index){
				var self=this
                var id=self.tableData[index].id
                self.$axios.post('imports_model',{id:id},(res)=>{
                	if(res.ret){
		                this.$message({
			                message: '添加成功',
			                type: 'success'
		                });
		                self.getdataMsg();
                    }else {
		                this.$message({
			                message: '添加失败，请稍后再试',
			                type: 'warning'
		                });
                    }
                })
            },
			toModel(index,indexs){
                var self=this
                var id=self.tableData[index].var[indexs].id
                console.log(id)
				// self.$router.push({path:"/terrace_fun_item_detail", query: { id: id,type:2}})
            }
		}
	}
</script>

<style scoped>
    a{
        text-decoration: none;
    }
    .wai_box{
        background: #EFEFEF;
        border: 2px solid #D8D8D8;
        border-radius: 6px;
        max-width: 1370px!important;
        margin: 20px auto;
        min-height: 137px;
        padding: 20px 0;
    }
    .tit{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
    }
    .content_box{
        background: #FFFFFF;
        border: 2px solid #D8D8D8;
        border-radius: 6px;
        /*padding: 27px 44px;*/
        padding: 27px 0;
        width: 1327px;
        margin: 10px auto;
    }
    .model_item{
        padding: 15px 20px;
    }
    .el-row{

    }
    .sheji,.guanxi{
        display: flex;
        /*flex-wrap: wrap;*/
        font-size: 14px;
        color: #343434;
        letter-spacing: 0;
        line-height: 26px;
        margin: 5px 0;
    }
    .model_item{
        border-top: 1px solid #D8D8D8;
    }
    .fenye{
        padding: 15px 0 0 10px;
        /*padding: 20px 55px;*/
    }
    .nc_box{
        display: flex;
        margin: 20px 0;
    }

    .nc_box>a:nth-child(1){
        width: 110px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        background: #FFFFFF;
        border: 1px solid #009E79;
        border-radius: 6px;
        font-size: 16px;
        color: #009E79;
        letter-spacing: 0;
        cursor: pointer;
    }
    .nc_box>div:nth-child(2){
        width: 78px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        background: #FFFFFF;
        border: 1px solid #EA463E;
        border-radius: 6px;
        font-size: 16px;
        color: #EA463E;
        letter-spacing: 0;
        margin: 0 20px;
        cursor: pointer;
    }
    .nc_box>div:nth-child(3){
        width: 110px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        background: #FFFFFF;
        border: 1px solid #009E79;
        border-radius: 6px;
        font-size: 16px;
        color: #009E79;
        letter-spacing: 0;
        cursor: pointer;
    }



    .nc_btn{
        width: 108px;
        height: 50px;
        line-height: 50px;
        margin-left: 11px;
    }
    .btn_box{
        display: flex;
    }
    .nv_btn_2{
        width: 130px;
        height: 40px;
        line-height: 40px;
        color: #009E79;
    }
    .nv_btn_2:nth-child(1){
        margin-right: 20px;
    }
    .nv_btn_2:nth-child(1):hover{
        color: #00C597;
        border-color: #00C597;
    }
    .nv_btn_2:nth-child(2):hover{
        color: #00C597;
        border-color: #00C597;
    }
    .nc_btn{
        width: 108px;
        height: 40px;
        line-height: 40px;
    }
    .nc_box2{
        display: flex;
    }
    .nc_box2>a{
        background: #FFFFFF;
        border: 1px solid #009E79;
        border-radius: 6px;
        text-align: center;
        color: #009E79;
        font-size: 16px;
        cursor: pointer;
        width: 110px;
        height: 40px;
        line-height: 40px;
    }
    .nc_box2>a:hover{
        color: #00c597;
        border-color: #00c597;
    }
    .nc_box2>div:hover{
        color: #00c597;
        border-color: #00c597;
    }
    .nc_box2>div{
        background: #FFFFFF;
        border: 1px solid #009E79;
        border-radius: 6px;
        text-align: center;
        color: #009E79;
        font-size: 16px;
        cursor: pointer;
    }
    .nc_box2>div:nth-child(1){
        width: 110px;
        height: 40px;
        line-height: 40px;
    }
    .nc_box2>div:nth-child(2){
        width: 193px;
        height: 40px;
        line-height: 40px;
        margin-left: 20px;
    }
</style>