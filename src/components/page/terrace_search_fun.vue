<template>
    <div id="terrace_search">
        <div class="wai_box">
            <div class="nc_box">
                <div class="nc_box_left">平台变量库/变量搜索</div>
                <div class="nc_box_right btn_box">
                    <div class="nv_btn_2"  @click="$router.push({path:'/creat_model'})" v-if="is_admin==1"><strong>+</strong>新建模型</div>
                    <div class="nv_btn_2"  @click="$router.push({path:'/creat_fun'})" v-if="is_admin==1"><strong>+</strong>新建变量</div>
                </div>
            </div>
            <div class="content_box">
                <el-row style="padding: 0 40px">
                    <el-col :span="6">
                        <el-input v-model="input" placeholder="请输入变量名称"></el-input>
                    </el-col>
                    <el-col :span="2" style="margin-left: 20px">
                        <div class="nc_btn" @click="insearch">搜索</div>
                    </el-col>
                </el-row>
            </div>
            <el-row style="padding: 0 70px"><el-col>搜索结果</el-col></el-row>
            <div class="content_box">
                <el-row style="padding: 10px 40px"><el-col>共{{tableData.length}}条数据</el-col></el-row>
                <el-table
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @sort-change="mysort"
                        @selection-change="handleSelectionChange">
                    <el-table-column type="expand" align="center">
                        <template slot-scope="props">
                            <el-table :data="props.row.dis" :show-header='false' style="padding: 0" border:false>
                                <el-table-column label="维度名"prop=""  width="405"></el-table-column>
                                <!--<el-table-column label="维度名"prop=""  width="180"></el-table-column>-->
                                <el-table-column label="维度名"prop="name"  width="350" align="left"header-align="center">
                                    <template slot-scope="scope">
                                        <a :href="baseURL+'#/terrace_fun_item_detailw?id='+scope.row.id" style="cursor: pointer;color: #009E79;width: 100%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"  target="_Blank">{{scope.row.name}}</a>
                                        <!--<span @click="get_detailw(scope.$index)" style="cursor: pointer;    color: #009E79;">{{scope.row.name}}</span>-->
                                    </template>
                                </el-table-column>
                                <el-table-column label="创建时间"prop="create_time"  width="175" align="center"></el-table-column>
                                <el-table-column label="操作"><template slot-scope="scope"></template> </el-table-column>
                            </el-table>
                        </template>
                    </el-table-column>
                    <el-table-column
                            type="selection"
                            width="40">
                    </el-table-column>
                    <el-table-column
                            prop="title_type"
                            label="类别"
                            width="100"
                            :filters="[{ text: '单选', value: '单选' }, { text: '多选', value: '多选' },{ text: '量表', value: '量表' }]"
                            :filter-method="filterTag"
                            filter-placement="bottom-end">
                        <template slot-scope="scope">
                            <el-tag
                                    :type="scope.row.title_type === '单条' ? 'primary' : 'success'"
                                    close-transition>{{scope.row.title_type}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                            width="350"
                            label="构念名"
                            align="left"
                            sortable="custom"

                    >
                        <template  slot-scope="scope">
                            <a :href="baseURL+'#/terrace_fun_item_detail?id='+scope.row.id" style="cursor: pointer;color: #009E79;width: 100%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;" target="_Blank"  >{{scope.row.name}}</a>
                            <!--<span  @click="get_detail(scope.$index)" style="cursor: pointer;color: #009E79;">{{scope.row.name}}</span>-->
                        </template>
                    </el-table-column>
                    <el-table-column
                            width="350"
                            label="维度名"
                            align="left"
                            >
                        <template slot-scope="scope">

                            <a :href="baseURL+'#/terrace_fun_item_detailw?id='+scope.row.dis_id" style="cursor: pointer;color: #009E79;"  target="_Blank">{{scope.row.dis_name}}</a>
                            <div><a :href="baseURL+'#/terrace_fun_item_detailw?id='+scope.row.dis_id" style="cursor: pointer;color: #009E79;"  target="_Blank">{{'(共'+scope.row.dis.length+'个维度)'}}</a></div>


                            <!--<a :href="baseURL+'#/terrace_fun_item_detailw?id='+scope.row.dis_id" style="cursor: pointer;color: #009E79;width: 100%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"  target="_Blank">{{scope.row.dis_name+'(共'+scope.row.dis.length+'个维度)'}}</a>-->
                            <!--<span @click="get_detailw(scope.$index)" style="cursor: pointer;color: #009E79;">{{scope.row.dis[0].name+'(共'+scope.row.dis.length+'个维度)'}}</span>-->
                        </template>
                    </el-table-column>
                    <el-table-column
                            width="120"
                            label="更新时间"
                            align="center"
                            >
                        <template slot-scope="scope">
                            <span>{{scope.row.update_time}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作 " align="center">
                        <template slot-scope="scope">
                            <div v-if="is_admin==0">
                                <span class="dao" @click="imports(scope.$index)" v-if="scope.row.is_add==0">导入我的变量库</span>
                                <span class="bdao" v-if="scope.row.is_add==1">已导入</span>
                            </div>
                            <div v-if="is_admin==1" style="display: flex;">
                                <el-button type="primary"  @click="toBian(scope.$index)" size="small">编辑</el-button>
                                <el-button type="danger" size="small" @click="delBian(scope.$index)">删除</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog title="导入列表" :visible.sync="importsV">
                    <el-dialog
                            width="30%"
                            title="创建新文件夹"
                            :visible.sync="innerVisible"
                            append-to-body>
                        <el-input v-model="crt_dirname" placeholder="文件夹名"></el-input>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="innerVisible = false">取 消</el-button>
                            <el-button type="primary" @click="creat_dir">确 定</el-button>
                        </span>
                    </el-dialog>
                    <div class="tits" style="padding: 0 38px;margin-top: 4px;font-size: 14px;line-height: 1.5;color: #8590a6;text-align: center;">请选择你想添加的收藏夹</div>
                    <div v-for="(dir,index) in dir_list" class="item_dir">
                        <div class="item_dir_left">
                            <div>{{dir.name}}</div>
                        </div>
                        <div class="item_dir_right">
                            <el-button type="primary" @click="imports_V(index)">导入</el-button>
                        </div>
                    </div>
                    <div style="margin: 10px auto;width: 139px">
                        <el-button type="primary" @click="innerVisible = true">创建新的文件夹</el-button>
                    </div>
                </el-dialog>
                <div class="fenye_wai">
                    <div class="fenye">
                        <el-pagination
                                background
                                layout="prev, pager, next"
                                @current-change="handleCurrentChange"
                                :total="pages*10">
                        </el-pagination>
                    </div>
                    <div> <el-button plain @click="piimports" v-if="is_admin==0">批量导入</el-button></div>
                </div>
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
				input:"",
                tableData:[
	                // {
		             //    title_type:"1",
		             //    name:"构念名1",
		             //    dis:[
			         //        {
				     //            id:"1",
				     //            name:"维度1",
				     //            create_time:"2018-02-02 18:50:17"
			         //        },
			         //        {
				     //            id:"2",
				     //            name:"维度2",
				     //            create_time:"2018-02-02 18:50:17"
			         //        },
		             //    ]
	                // },
	                // {
		             //    title_type:"1",
		             //    name:"构念名1",
		             //    dis:[
			         //        {
				     //            id:"1",
				     //            name:"维度1",
				     //            create_time:"2018-02-02 18:50:17"
			         //        },
			         //        {
				     //            id:"2",
				     //            name:"维度2",
				     //            create_time:"2018-02-02 18:50:17"
			         //        },
		             //    ]
	                // },
	                // {
		             //    title_type:"2",
		             //    name:"构念名1",
		             //    dis:[
			         //        {
				     //            id:"1",
				     //            name:"维度1",
				     //            create_time:"2018-02-02 18:50:17"
			         //        },
			         //        {
				     //            id:"2",
				     //            name:"维度2",
				     //            create_time:"2018-02-02 18:50:17"
			         //        },
		             //    ]
	                // },
                    // {
		             //    title_type:"3",
		             //    name:"构念名1",
		             //    dis:[
			         //        {
				     //            id:"1",
				     //            name:"维度1",
				     //            create_time:"2018-02-02 18:50:17"
			         //        },
			         //        {
				     //            id:"2",
				     //            name:"维度2",
				     //            create_time:"2018-02-02 18:50:17"
			         //        },
		             //    ]
	                // },
                ],
                pages:"",
				multipleSelection:[],
                is_admin:"",
				importsV:false,
				innerVisible:false,
				crt_dirname:"",
                dir_list:[],
                selectId:"",
                piselectId:[],
                isPi:false,
				baseURL:""
            }
        },
        mounted(){
	        this.is_admin=localStorage.getItem('is_admin');
			this.getData();

        },
        methods:{
	        handleSelectionChange(val) {
		        this.multipleSelection = val;
	        },
	        filterTag(value, row) {
		        return row.title_type === value;
	        },
	        handleCurrentChange(val){
		        var key_words=this.$route.query.key_words
		        var self=this;
		        // if (self.input==""){
			     //    self.$axios.get('terrace_search_get',{key_words:key_words,page:val},(res)=>{
				 //        console.log(res);
				 //        res.data.forEach(function (item) {
					//         if (item.dis.length==0){
					// 	        item.dis.push({
					// 		        id:"",
					// 		        name:"",
					// 		        create_time:""
					// 	        })
					// 	        self.tableData=res.data.rows
					//         }else {
					// 	        self.tableData=res.data.rows
					//         }
				 //        })
			     //    })
		        // }else {
			     //    self.$axios.get('terrace_search_get',{id:id,page:val,key_words:self.input},(res)=>{
				 //        console.log(res);
				 //        res.data.forEach(function (item) {
					//         if (item.dis.length==0){
					// 	        item.dis.push({
					// 		        id:"",
					// 		        name:"",
					// 		        create_time:""
					// 	        })
					// 	        self.tableData=res.data.rows
					//         }else {
					// 	        self.tableData=res.data.rows
					//         }
				 //        })
			     //    })
		        // }
                self.$axios.get('terrace_search_get',{page:val,key_words:key_words},(res)=>{
                	console.log(res)
                    if (res.ret){
	                    res.data.rows.forEach(function (item) {
		                    if (item.title_type==1){
			                    item.title_type="量表"
		                    }else if (item.title_type==2){
			                    item.title_type="多选"
		                    }else if (item.title_type==3){
			                    item.title_type="单选"
		                    }
	                    })
	                    self.tableData=res.data.rows
                    }
                })
	        },
            getData(){
	        	var self=this
                self.$axios.get('terrace_search_get',{key_words:this.$route.query.key_words},(res)=>{
                	if (res.ret){
		                self.pages=res.msg/10;
		                res.data.rows.forEach(function (item) {
			                if (item.title_type==1){
				                item.title_type="量表"
			                }else if (item.title_type==2){
				                item.title_type="多选"
			                }else if (item.title_type==3){
				                item.title_type="单选"
			                }
		                })
		                self.tableData=res.data.rows
	                }
                })
            },
	        imports(index){
	        	var self=this
	        	self.selectId=self.tableData[index].id
                self.importsV=true
                self.$axios.get('getdir_list',{},(res)=>{
                	console.log(res)
                    if (res.ret){
                		self.dir_list=res.data
                    }
                })
            },
	        imports_V(index){
	        	var self=this
	        	var dir_id=self.dir_list[index].id;
	        	if(self.isPi){
			        self.$axios.post('import_search_fun',{dir_id:dir_id,var_id:self.piselectId,type:1},(res)=>{
				        if(res.ret){
					        self.importsV=false;
					        this.$message({
						        message: '导入成功',
						        type: 'success'
					        });
					        self.getData();
				        }
				        console.log(res)
			        })
                }else {
			        self.$axios.post('import_search_fun',{dir_id:dir_id,var_id:self.selectId},(res)=>{
				        if(res.ret){
					        self.importsV=false;
					        this.$message({
						        message: '导入成功',
						        type: 'success'
					        });
					        self.getData();
				        }
				        console.log(res)
			        })
		        }
            },
	        piimports(){
	        	var self=this

                if(self.multipleSelection.length<1){
	        		return
                }else {

	                var id=[];
	                self.multipleSelection.forEach(function (item) {
	                	if (item.is_add==0){
			                id.push(item.id)
		                }
	                })
                    self.piselectId=id;
	                console.log(self.piselectId)
	                self.importsV=true;
	                self.isPi=true;
	                self.$axios.get('getdir_list',{},(res)=>{
		                console.log(res)
		                if (res.ret){
			                self.dir_list=res.data
		                }
	                })
	                // self.$axios.post('import_search_fun',{var_id:id,type:1},(res)=>{
		             //    if (res.ret){
			         //        self.$message({
				     //            message: '已成功帮您导入'+id.length+'条数据',
				     //            type: 'success'
			         //        });
		             //    }
		             //    console.log(res)
	                // })
                }
            },
	        insearch(){
	        	var self=this
                if (self.input==""){
	                self.$axios.get('terrace_search_get',{key_words:self.input},(res)=>{
		                if (res.ret){
			                self.pages=res.msg/10;
			                res.data.rows.forEach(function (item) {
				                if (item.title_type==1){
					                item.title_type="量表"
				                }else if (item.title_type==2){
					                item.title_type="多选"
				                }else if (item.title_type==3){
					                item.title_type="单选"
				                }
			                })
			                self.tableData=res.data.rows
		                }
	                })
                }else {
	        		self.$axios.get('terrace_search_get',{key_words:self.input},(res)=>{
	        			if (res.ret){
					        self.pages=res.msg/10;
					        res.data.rows.forEach(function (item) {
						        if (item.title_type==1){
							        item.title_type="量表"
						        }else if (item.title_type==2){
							        item.title_type="多选"
						        }else if (item.title_type==3){
							        item.title_type="单选"
						        }
					        })
	        				self.tableData=res.data.rows
                        }
                    })
                }
            },
	        get_detailw(index){
	        	var self=this
	        	var id=self.tableData[index].id;
		        var key_words=this.$route.query.key_words
		        self.$router.push({path:"/terrace_fun_item_detailw", query: { id: id ,key_words:key_words}})
            },
	        get_detail(index){
		        var self=this
		        var id=self.tableData[index].id;
		        var key_words=this.$route.query.key_words;
		        self.$router.push({path:"/terrace_fun_item_detail", query: { id: id ,key_words:key_words}})
            },
	        toBian(index){
		        var id=this.tableData[index].id;
		        this.$router.push({path:"/creat_fun", query: { id: id }})
            },
	        delBian(index){
		        var id=this.tableData[index].id;
		        var self=this
		        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
			        confirmButtonText: '确定',
			        cancelButtonText: '取消',
			        type: 'warning'
		        }).then(() => {
			        self.$axios.post('delvar',{var_id:id},(res)=>{
				        if(res.ret){
					        self.tableData.splice(index,1);
					        this.$message({
						        message: '删除成功',
						        type: 'success'
					        });
					        self.getData();
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
	        creat_dir(){
		        var self=this
		        if (!self.crt_dirname){
			        this.$message({
				        message: '不能为空',
				        type: 'warning'
			        });
		        }else {
			        self.$axios.post('add_file',{name:self.crt_dirname},(res)=>{
				        console.log(res)
				        // self.
				        if(res.ret){
					        self.innerVisible=false;
					        self.crt_dirname="";
					        this.$message({
						        message: '新建成功',
						        type: 'success'
					        });
					        self.$axios.get('getdir_list',{},(res)=>{
						        console.log(res)
						        if (res.ret){
							        self.dir_list=res.data
						        }
					        })
				        }
			        })
		        }
            },
	        mysort(o){
	        	console.log(o)
		        var self=this
                if(o.order==='ascending'){
	                self.$axios.get('terrace_search_get',{key_words:this.$route.query.key_words,order_type:'asc'},(res)=>{
		                if (res.ret){
			                self.pages=res.msg/10;
			                res.data.rows.forEach(function (item) {
				                if (item.title_type==1){
					                item.title_type="量表"
				                }else if (item.title_type==2){
					                item.title_type="多选"
				                }else if (item.title_type==3){
					                item.title_type="单选"
				                }
			                })
			                self.tableData=res.data.rows
		                }
	                })
                }else if(o.order==='descending'){
	                self.$axios.get('terrace_search_get',{key_words:this.$route.query.key_words,order_type:'desc'},(res)=>{
		                if (res.ret){
			                self.pages=res.msg/10;
			                res.data.rows.forEach(function (item) {
				                if (item.title_type==1){
					                item.title_type="量表"
				                }else if (item.title_type==2){
					                item.title_type="多选"
				                }else if (item.title_type==3){
					                item.title_type="单选"
				                }
			                })
			                self.tableData=res.data.rows
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
    .content_box{
          background: #FFFFFF;
          border: 2px solid #D8D8D8;
          border-radius: 6px;
          padding: 27px 0;
          width: 1227px;
          margin: 10px auto;
          ont-family: AppleSystemUIFont;
          font-size: 16px;
          color: #343434;
          letter-spacing: 0;
          line-height: 26px;
          position: relative;
      }
    .fenye{
        padding: 15px 0 0;
        /*padding: 20px 55px;*/
    }
    .fenye_wai{
        display: flex;
        justify-content: space-between;
        padding: 10px 40px;
        align-items: center;
    }
    .dao{
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        color: #009E79;
        letter-spacing: 0;
        line-height: 26px;
        text-decoration:underline;
        cursor: pointer;
    }
    .item_dir{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ebebeb;
        padding: 8px 0;
    }
    .item_dir_left>div:nth-child(1){
        font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;
        font-size: 15px;
        color: #1a1a1a;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: 700;
        -webkit-tap-highlight-color: rgba(26,26,26,0);
    }
    .nc_btn{
        width: 108px;
        height: 40px;
        line-height: 40px;
    }
    .nc_box{
        padding: 0 72px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 20px 0;
    }
    .btn_box{
        display: flex;
    }
    .btn_box>div{
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
    .btn_box>div:nth-child(1){
       margin-right: 20px;
    }
    .cell{
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space:nowrap;
    }
</style>