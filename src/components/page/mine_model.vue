<template>
    <div id="mine_model">
        <div class="wai_box">
            <div class="tit">
                <div>我的模型库/模型搜索</div>
                <div class="btn_box">
                    <div class="nv_btn_2"  @click="$router.push({path:'/creat_model'})">新建模型</div>
                    <!--<div class="nv_btn_2"  @click="$router.push({path:'/creat_fun'})">新建变量</div>-->
                </div>
            </div>
            <div class="content_box">
                <el-row style="padding: 0 30px">
                    <el-col :span="8" class="nc_select">
                        <el-input v-model="input" placeholder="请输入你想搜索的模型" prefix-icon="el-icon-search">

                        </el-input>
                    </el-col>
                    <el-col :span="2"><div class="nc_btn" @click="insearch">搜索</div></el-col>
                    <!--<el-col :span="6"><el-button type="primary" style="background-color: #1C9A7E;margin-left: 10px;border-color: #1C9A7E" @click="search">搜索</el-button></el-col>-->
                </el-row>
            </div>
            <el-row style="padding-left: 20px"><el-col>搜索结果</el-col></el-row>
            <div class="content_box">
                <el-row style="padding-left: 20px;height: 30px;font-size: 14px;color: #737373;"><el-col>共{{tableData.length}}条数据</el-col></el-row>
                <div class="model_item" v-for="(item,index) in tableData">
                    <el-row style="font-size: 14px"><el-col :span="24"> <span style="font-size: 14px;font-weight: 700;min-width: 70px"> 文章名：&nbsp</span>《{{item.article_name}}》</el-col></el-row>
                    <div style="display: flex;font-size: 14px;margin: 7px 0">
                        <div style="min-width: 70px;font-weight: 600">作者：</div>
                        <div>{{item.article_author}}</div>
                    </div>
                    <div style="display: flex;font-size: 14px">
                        <div style="min-width: 70px;font-weight: 600">索引信息：</div>
                        <div>{{item.article_message}}</div>
                    </div>
                    <!--<el-row style="font-size: 14px"><el-col :span="24"> <span style="font-size: 14px;font-weight: 700">索引信息：</span> {{item.article_message}}</el-col></el-row>-->
                    <div class="sheji">
                        <div style="font-size: 14px;font-weight: 700;min-width: 70px">涉及变量：</div>
                        <div style="text-align: left">
                            <div v-for="(blname,index) in item.var" style="color:#009E79;display: inline">
                            <span>
                                {{blname.name}}（<span v-for="(blname_item,index) in blname.dis">{{blname_item.name}}<span v-if="index!=blname.dis.length-1">，</span></span>）<span v-if="index!=item.var.length-1">，</span>
                            </span>
                            </div>
                        </div>

                    </div>
                    <div class="guanxi">
                        <div style="font-size: 14px;font-weight: 700;min-width: 70px;">变量关系：</div>
                        <div style="text-align: left">
                            <div v-for="(relation,index)  in item.rea" style="display: inline;">
                                <span>{{relation.z_bl}}</span>
                                <span v-if="relation.is_add==1">（<span class="iconfont icon-jia2" ></span>）</span>
                                <span v-else="relation.is_add==0">（<span class="iconfont icon-jian1" ></span>）</span>
                                <span class="iconfont icon-jiantouarrow484"></span>
                                <span>{{relation.y_bl}}</span>
                                <span v-if="relation.is_adjust==1">{{'（调节变量：'+relation.adjust+'）'}}</span>
                                <span v-else>（无调节）</span>
                                <span  v-if="index!=item.rea.length-1">，</span>
                            </div>

                        </div>
                    </div>
                    <div class="nc_box">
                        <div class="nc_box_btn" @click="deleteModel(index)" style="margin-right: 20px;color: #e00;border-color: #e00">删除模型</div>
                        <a :href="baseURL+'#/mine_model_detail/?id='+tableData[index].id+'&&key_words='+$route.query.key_words" class="nc_box_btn" target="_Blank">查看详情</a>
                        <div class="btn_update" @click="toUpdate(index)" >编辑</div>
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
                    // {
	                //     article_name:"文章名称",
	                //     article_author:"作者1",
	                //     article_message:"检索信息",
	                //    var:[
	                //        {
	                //        	name:"构念名称",
	                //            dis:[
	                //                {name:"匆匆"},{name:"匆匆"},{name:"匆匆"},{name:"匆匆"},{name:"匆匆"}
	                //            ]
	                //        },
	                //         {
	                //            name:"构念名称",
	                //            dis:[
	                //                {name:"匆匆"},{name:"匆匆"},{name:"匆匆"},{name:"匆匆"}
	                //            ]
	                //         },
	                //         {
	                //            name:"构念名称",
	                //            dis:[
	                //                {name:"匆匆"},{name:"匆匆"},{name:"匆匆"},{name:"匆匆"}
	                //            ]
	                //         },
	                //    ],
	                //    rea:[
	                //        {
	                //             z_bl:"自变量1",
	                //             y_bl:"因变量1",
	                //             is_add:"0",
	                //             is_adjus:"0",
	                //             adjust:""
	                //        },
	                //         {
	                //            z_bl:"自变量1",
	                //            y_bl:"因变量1",
	                //            is_add:"0",
	                //            is_adjus:"0",
	                //            adjust:""
	                //         },
	                //         {
	                //            z_bl:"自变量1",
	                //            y_bl:"因变量1",
	                //            is_add:"0",
	                //            is_adjus:"0",
	                //            adjust:""
	                //         },
	                //    ],
	                //    id:1
	                // },
	                // {
	                //    article_name:"文章名称",
	                //    article_author:"作者1",
	                //    article_message:"检索信息",
	                //    var:[
	                //        {
	                //            name:"构念名称",
	                //            dis:[
	                //                {name:"匆匆"},{name:"匆匆"},{name:"匆匆"},{name:"匆匆"},{name:"匆匆"}
	                //            ]
	                //        },
	                //        {
	                //            name:"构念名称",
	                //            dis:[
	                //                {name:"匆匆"},{name:"匆匆"},{name:"匆匆"},{name:"匆匆"}
	                //            ]
	                //        },
	                //        {
	                //            name:"构念名称",
	                //            dis:[
	                //                {name:"匆匆"},{name:"匆匆"},{name:"匆匆"},{name:"匆匆"}
	                //            ]
	                //        },
	                //    ],
	                //    rea:[
	                //        {
	                //            z_bl:"自变量1",
	                //            y_bl:"因变量1",
	                //            is_add:"0",
	                //            is_adjus:"0",
	                //            adjust:""
	                //        },
	                //        {
	                //            z_bl:"自变量1",
	                //            y_bl:"因变量1",
	                //            is_add:"0",
	                //            is_adjus:"0",
	                //            adjust:""
	                //        },
	                //        {
	                //            z_bl:"自变量1",
	                //            y_bl:"因变量1",
	                //            is_add:"0",
	                //            is_adjus:"0",
	                //            adjust:""
	                //        },
	                //    ]
	                // },
	                // {
	                //    article_name:"文章名称",
	                //    article_author:"作者1",
	                //    article_message:"检索信息",
	                //    var:[
	                //        {
	                //            name:"构念名称",
	                //            dis:[
	                //                {name:"匆匆"},{name:"匆匆"},{name:"匆匆"},{name:"匆匆"},{name:"匆匆"}
	                //            ]
	                //        },
	                //        {
	                //            name:"构念名称",
	                //            dis:[
	                //                {name:"匆匆"},{name:"匆匆"},{name:"匆匆"},{name:"匆匆"}
	                //            ]
	                //        },
	                //        {
	                //            name:"构念名称",
	                //            dis:[
	                //                {name:"匆匆"},{name:"匆匆"},{name:"匆匆"},{name:"匆匆"}
	                //            ]
	                //        },
	                //    ],
	                //    rea:[
	                //        {
	                //            z_bl:"自变量1",
	                //            y_bl:"因变量1",
	                //            is_add:"0",
	                //            is_adjus:"0",
	                //            adjust:""
	                //        },
	                //        {
	                //            z_bl:"自变量1",
	                //            y_bl:"因变量1",
	                //            is_add:"0",
	                //            is_adjus:"0",
	                //            adjust:""
	                //        },
	                //        {
	                //            z_bl:"自变量1",
	                //            y_bl:"因变量1",
	                //            is_add:"0",
	                //            is_adjus:"0",
	                //            adjust:""
	                //        },
	                //    ]
	                // },
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
                self.$axios.post('getmine_model',{},(res)=>{
                	console.log(res)
                    if(res.ret){
	                    self.pages=res.msg/10;
	                    self.tableData=res.data
                    }
                })
            },
	        handleCurrentChange(val){
		        var self=this;
		        if (self.input==""){
			        self.$axios.get('getmine_model',{page:val},(res)=>{
				        console.log(res);
				        res.data.forEach(function (item) {
					        if(res.ret){
						        self.tableData=res.data
					        }
				        })
			        })
		        }else {
			        self.$axios.get('getmine_model',{page:val,key_words:self.input},(res)=>{
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
            		return
                }else {
            		self.$axios.get('search_model',{key_words:self.input},(res)=>{
            			console.log(res)
                        if (res.ret){
	                        self.pages=res.msg/1;
            				self.tableData=res.data
                        }
                    })
                }
            },
	        tomodel_de(index){
            	var self=this;
            	var id=self.tableData[index].id;
		        self.$router.push({path:"/mine_model_detail", query: { id: id }})
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
	        insearch(){
		        var self=this;
		        if (self.input==""){
			        self.$axios.get('getmine_model',{page:1},(res)=>{
				        console.log(res);
				        res.data.forEach(function (item) {
					        if(res.ret){
						        self.tableData=res.data
					        }
				        })
			        })
		        }else {
			        self.$axios.get('getmine_model',{page:1,key_words:self.input},(res)=>{
				        console.log(res);
				        if (res.ret){
					        self.tableData=res.data
				        }
			        })
		        }
            },
	        deleteModel(index){
            	var id=this.tableData[index].id
		        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
			        confirmButtonText: '确定',
			        cancelButtonText: '取消',
			        type: 'warning'
		        }).then(() => {
		        	console.log(id)
			        this.$axios.post('deleteModel',{id:id},res=>{
				        if(res.ret){
					        this.$message.success('删除成功！')
					        this.getdataMsg();
				        }
			        })
		        }).catch(() => {
			        this.$message({
				        type: 'info',
				        message: '已取消删除'
			        });
		        });

            },
	        toUpdate(index){
            	var self=this
                var id=this.tableData[index].id
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
            }
        }
	}
</script>

<style scoped>
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
        max-width: 1327px;
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
    .nv_btn_2:hover{
        color: #00C597;
        border-color: #00C597;
    }
    .nv_btn_2:nth-child(1){
        margin-right: 20px;
    }
    .nc_box{
        display: flex;
        margin: 20px 0;
    }

    .nc_box>div:nth-child(1){
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
    .nc_box>a{
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
    .btn_update{
        width: 120px;
        height: 40px;
        line-height: 40px;
        border: 1px solid #009E79;
        text-align: center;
        color: #009E79;
        margin-left: 20px;
        border-radius: 5px;
        cursor: pointer;
    }
    .nc_box_btn:hover,.btn_update:hover{
        color: #00C597;
        border-color: #00C597;
    }
    .nc_box_btn:nth-child(1):hover{
        color: #FF4040;
        border-color: #FF4040;
    }
</style>