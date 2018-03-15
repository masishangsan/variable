<template>
    <div id="mine_fun_item">
        <div class="wai_box">
            <div class="back_box">
                <div class="back" @click="$router.push('/mine_fun')"><img src="../../../static/img/back@3x.png" alt="" style="width: 7px;
height: 12px"></div>
                <div class="item_name">我的变量库/{{item_name}}</div>
            </div>
            <div class="content_box_search content_box">
                <el-row style="padding-left: 20px">
                    <el-col :span="8"><el-input v-model="input" placeholder="请输入内容" prefix-icon="el-icon-search"></el-input></el-col>
                    <el-col :span="2">
                        <div class="nc_btn" @click="search">搜索</div>
                        <!--<el-button type="primary" style="margin-left: 20px;background-color: rgba(26, 179, 148, 1);" @click="search">搜索</el-button>-->
                    </el-col>
                </el-row>
            </div>
            <el-row ><el-col :span="24" style="margin-left: 70px">搜索内容</el-col></el-row>
            <div class="content_box_content content_box" >
                <div class="content_box_content_head"   >
                    <div>共{{tableData.length}}条数据</div>
                    <div class="nv_btn_2" @click="$router.push({path:'/creat_fun'})" style="cursor: pointer">
                        <strong>+</strong>
                        新建变量
                    </div>
                    <!--<el-button plain icon="el-icon-circle-plus-outline">新建变量</el-button>-->
                </div>
                <el-table
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-table :data="props.row.dis" :show-header='false' style="padding: 0" border:false>
                                <el-table-column label="维度名"prop=""  width="250"></el-table-column>
                                <el-table-column label="维度名"prop=""  width="250"></el-table-column>
                                <el-table-column label="维度名"  width="250">
                                    <template slot-scope="scope">
                                        <a :href="baseURL+'#/terrace_fun_item_detailw?id='+scope.row.id+'&&type=1'" style="cursor: pointer;color: #009E79;"  target="_Blank">{{scope.row.name}}</a>
                                        <!--<span @click="get_detailw(props.$index,scope.$index)" style="cursor: pointer">{{scope.row.name}}</span>-->
                                    </template>
                                </el-table-column>
                                <el-table-column label="创建时间"prop="create_time"  width="250"></el-table-column>
                                <el-table-column label="操作"><template slot-scope="scope"></template> </el-table-column>
                            </el-table>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="title_type"
                            label="类别"
                            width="250"
                            :filters="[{ text: '单选', value: '单选' }, { text: '多选', value: '多选' },{ text: '量表', value: '量表' }]"
                            :filter-method="filterTag"
                            filter-placement="bottom-end">
                        <template slot-scope="scope">
                            <el-tag
                                    :type="scope.row.title_type === '单选' ? 'primary' : 'success'"
                                    close-transition>{{scope.row.title_type}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                            width="250"
                            label="构念名"
                            >
                        <template  slot-scope="scope">
                            <a :href="baseURL+'#/terrace_fun_item_detail?id='+scope.row.id+'&&type=4'" style="cursor: pointer;color: #009E79;" target="_Blank">{{scope.row.name}}</a>
                            <!--<span  @click="get_detail(scope.$index)" style="cursor: pointer">{{scope.row.name}}</span>-->
                        </template>
                    </el-table-column>
                    <el-table-column
                            width="250"
                            label="维度名"
                            >
                            <template slot-scope="scope">
                                <a :href="baseURL+'#/terrace_fun_item_detailw?id='+scope.row.dis[0].id+'&&type=1'" style="cursor: pointer;color: #009E79;"  target="_Blank">{{scope.row.dis[0].name+'(共'+scope.row.dis.length+'个维度)'}}</a>
                                <!--<span @click="get_detailw(scope.$index)" style="cursor: pointer">{{scope.row.dis[0].name+'(共'+scope.row.dis.length+'个维度)'}}</span>-->
                            </template>
                    </el-table-column>
                    <el-table-column
                            width="250"
                            label="更新时间"
                            prop="dis[0].create_time">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">移除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
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
    </div>
</template>

<script>
	import service from '../../assets/service';
	this.baseURL=service.baseURL;
	export default {
		data(){
			return{
				baseURL:"",
                item_name:"",
				input:"",
                content_list:[],
				tableData: [
                    // {
                    //     id:"1",
                    //     title_type:"1",
                    //     name:"构念名1",
                    //     dis:[
                    //         {
                    //         	id:"1",
	                 //            name:"维度1",
	                 //            create_time:"2018-02-02 18:50:17"
                    //         },
	                 //        {
		             //            id:"2",
		             //            name:"维度2",
		             //            create_time:"2018-02-02 18:50:17"
	                 //        },
                    //     ]
                    // }
                ],
                pages:"",
                key_words:""
            }
        },
        mounted(){
			var id=this.$route.query.id
            this.getData(id);
			this.tableData.forEach(function (item) {
                if (item.title_type==1){
	                item.title_type="量表"
                }else if (item.title_type==2){
	                item.title_type="多选"
                }else if (item.title_type==3){
	                item.title_type="单选"
                }
			})
        },
        methods:{
            getData(id){
            	var self=this;
            	self.$axios.get('getmine_fun_item',{id:id},(res)=>{
		            console.log(res);
		            if (res.ret){
		            	self.pages=res.msg/10;
			            self.tableData=res.data
                    }
	            })
            },
	        handleCurrentChange(val){
		        var id=this.$route.query.id
		        var self=this;
		        if (self.input==""){
			        self.$axios.get('getmine_fun_item',{id:id,page:val},(res)=>{
				        console.log(res);
				        res.data.forEach(function (item) {
					        if (item.dis.length==0){
						        item.dis.push({
							        id:"",
							        name:"",
							        create_time:""
						        })
						        self.tableData=res.data
					        }else {
						        self.tableData=res.data
					        }
				        })
			        })
		        }else {
			        self.$axios.get('getmine_fun_item',{id:id,page:val,key_words:self.input},(res)=>{
				        console.log(res);
				        res.data.forEach(function (item) {
					        if (item.dis.length==0){
						        item.dis.push({
							        id:"",
							        name:"",
							        create_time:""
						        })
						        self.tableData=res.data
					        }else {
						        self.tableData=res.data
					        }
				        })
			        })
                }
            },
	        filterTag(value, row) {
		        return row.title_type === value;
	        },
	        get_detail(index){
		        debugger;
		        var id=this.tableData[index].id;
		        console.log(id);
		        this.$router.push({path:"/mine_fun_item_detail", query: { id: id }})
            },
	        get_detailw(index,index1){
            	console.log(index,index1)
		        var id=this.tableData[index].dis[index1].id;
		        this.$router.push({path:"/mine_fun_item_detailw", query: { id: id }})
            },
	        search(){
            	var self=this;
		        var dir_id=this.$route.query.id
                self.$axios.get('search_fun_item',{key_words:self.input,id:dir_id},(res)=>{
                    self.pages=res.msg/10;
                    res.data.forEach(function (item) {
                        if (item.title_type==1){
                            item.title_type="量表"
                        }else if (item.title_type==2){
                            item.title_type="多选"
                        }else if (item.title_type==3){
                            item.title_type="单选"
                        }
                    })
                    self.tableData=res.data
                })

            },
	        handleDelete(index){
            	var var_id=this.tableData[index].id
		        var dir_id=this.$route.query.id
                var self=this
		        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
			        confirmButtonText: '确定',
			        cancelButtonText: '取消',
			        type: 'warning'
		        }).then(() => {
			        self.$axios.post('delvar',{var_id:var_id,dir_id:dir_id},(res)=>{
				        if (res.ret){
					        self.tableData.splice(index,1)
					        this.$message({
						        message: '移除成功',
						        type: 'success'
					        });
				        }
			        })
		        }).catch(() => {
			        this.$message({
				        type: 'info',
				        message: '已取消删除'
			        });
		        });
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
    .back_box{
        display: flex;
        line-height: 32px;
        align-items: center;
        margin-left: 20px;
    }
    .back{
        background: #FFFFFF;
        border: 2px solid #C5C5C5;
        border-radius: 6px;
        width: 32px;
        height: 32px;
        text-align: center;
        margin-right: 10px;
    }
    .item_name{
        font-family: PingFang-SC-Medium;
        font-size: 16px;
        color: #343434;
        letter-spacing: 0;
        line-height: 26px;
    }
    .content_box{
        background: #FFFFFF;
        border: 2px solid #D8D8D8;
        border-radius: 6px;
        /*padding: 27px 44px;*/
        padding: 27px 0;
        width: 1227px;
        margin: 10px auto;
    }
    .content_box_search{
    }
    .content_box_content_head{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 35px;
    }


    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .el-table__expanded-cell{
        padding: 0!important;
    }
    .fenye{
        padding: 15px 0 0;
        /*padding: 20px 55px;*/
    }
    .nc_btn{
        width: 108px;
        height: 40px;
        line-height: 40px;
        margin-left: 11px;
    }
    .nv_btn_2{
        width: 130px;
        height: 40px;
        line-height: 40px;
    }
</style>