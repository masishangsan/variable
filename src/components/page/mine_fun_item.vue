<template>
    <div id="mine_fun_item">
        <div class="wai_box">
            <div class="back_box">
                <div class="back" @click="$router.push('/mine_fun')"><img src="../../../static/img/back@3x.png" alt="" style="width: 7px;height: 12px"></div>
                <div class="item_name">我的变量库/<span>{{item_name}}</span> </div>
            </div>
            <div class="content_box_search content_box">
                <el-row style="padding-left: 20px">
                    <el-col :span="8"><el-input v-model="input" placeholder="请输入内容" prefix-icon="el-icon-search" @keyup.enter="consoles"></el-input></el-col>
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
                        @sort-change="mysort"
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-table :data="props.row.dis" :show-header='false' style="padding: 0" border:false>
                                <el-table-column label="维度名"prop=""  width="450"></el-table-column>
                                <!--<el-table-column label="维度名"prop=""  width="250"></el-table-column>-->
                                <el-table-column label="维度名"  width="400" align="left" header-align="center">
                                    <template slot-scope="scope">
                                        <a :href="baseURL+'#/mine_fun_item_detailw?id='+scope.row.id+'&&type=1'+'&&dir_id='+$route.query.id+'&&name='+item_name" style="cursor: pointer;color: #009E79;width: 100%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"  target="_Blank">{{scope.row.name}}</a>
                                        <!--<span @click="get_detailw(props.$index,scope.$index)" style="cursor: pointer">{{scope.row.name}}</span>-->
                                    </template>
                                </el-table-column>
                                <el-table-column label="创建时间"prop="create_time"  width="150" align="center"></el-table-column>
                                <el-table-column label="操作"><template slot-scope="scope"></template> </el-table-column>
                            </el-table>
                        </template>
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
                                    :type="scope.row.title_type === '单选' ? 'primary' : 'success'"
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
                            <a :href="baseURL+'#/mine_fun_item_detail?id='+scope.row.id+'&&type=4'+'&&dir_id='+$route.query.id+'&&name='+item_name" style="cursor: pointer;color: #009E79;width: 100%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;" target="_Blank">{{scope.row.name}}</a>
                            <!--<span  @click="get_detail(scope.$index)" style="cursor: pointer">{{scope.row.name}}</span>-->
                        </template>
                    </el-table-column>
                    <el-table-column
                            width="350"
                            label="维度名"
                            align="left"
                            >
                            <template slot-scope="scope">
                                <div v-if="scope.row.dis.length>0" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
                                    <!--<a :href="baseURL+'#/mine_fun_item_detailw?id='+scope.row.dis[0].id+'&&type=1'+'&&dir_id='+$route.query.id+'&&name='+item_name" style="cursor: pointer;color: #009E79;width: 100%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"  target="_Blank">{{scope.row.dis_name+'(共'+scope.row.dis.length+'个维度)'}}</a>-->

                                    <a :href="baseURL+'#/mine_fun_item_detailw?id='+scope.row.dis[0].id+'&&type=1'+'&&dir_id='+$route.query.id+'&&name='+item_name" style="cursor: pointer;color: #009E79;"  target="_Blank">{{scope.row.dis_name}}</a>
                                    <div><a :href="baseURL+'#/mine_fun_item_detailw?id='+scope.row.dis[0].id+'&&type=1'+'&&dir_id='+$route.query.id+'&&name='+item_name" style="cursor: pointer;color: #009E79;"  target="_Blank">{{'(共'+scope.row.dis.length+'个维度)'}}</a></div>
                                </div>
                                <!--<span @click="get_detailw(scope.$index)" style="cursor: pointer">{{scope.row.dis[0].name+'(共'+scope.row.dis.length+'个维度)'}}</span>-->
                            </template>
                    </el-table-column>
                    <el-table-column
                            width="250"
                            label="更新时间"
                            prop="update_time"
                            align="center">
                    </el-table-column>
                    <el-table-column label="操作" min-width="100" fixed="right" style="position: relative">
                        <template slot-scope="scope">

                            <el-dropdown :hide-on-click="true" trigger="click">
                                  <span class="el-dropdown-link">操作菜单<i class="el-icon-arrow-down el-icon--right"></i></span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item><el-button size="mini" type="primary" @click="handleUpdate(scope.row.id)">编辑</el-button></el-dropdown-item>
                                    <el-dropdown-item><el-button size="mini" type="" @click="handleMove(scope.row.id)">移动</el-button></el-dropdown-item>
                                    <el-dropdown-item><el-button size="mini" type="warning" @click="handleCopy(scope.row.id)">复制</el-button></el-dropdown-item>
                                    <el-dropdown-item><el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">移除</el-button></el-dropdown-item>
                                    <!--<el-dropdown-item divided>蚵仔煎</el-dropdown-item>-->
                                </el-dropdown-menu>
                            </el-dropdown>
                            <!--<el-button size="mini" type="primary" @click="handleUpdate(scope.row.id)">编辑</el-button>-->
                            <!--<el-button size="mini" type="" @click="handleMove(scope.row.id)">移动</el-button>-->
                            <!--<el-button size="mini" type="warning" @click="handleCopy(scope.row.id)">复制</el-button>-->
                            <!--<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">移除</el-button>-->
                        </template>
                    </el-table-column>
                </el-table>
                <div class="fenye">
                    <el-pagination
                            background
                            layout="prev, pager, next"
                            @current-change="handleCurrentChange"
                            :current-page.sync="current_page"
                            :total="pages*10">
                    </el-pagination>
                </div>
            </div>
            <el-dialog :title="action_title" :visible.sync="moveNew">
                <el-select v-model="newdir_id" placeholder="请选文件夹">
                    <el-option v-for="item in myDir" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="moveNew = false">取 消</el-button>
                    <el-button type="primary" @click="toMoveNew">确 定</el-button>
                </div>
            </el-dialog>
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
                    //     ],
	                 //    update_time:"2018-02-02 18:50:17"
                    // }
                ],
                pages:"",
                key_words:"",
                moveNew:false,//移动文件夹弹框是否显示
                newdir_id:"",//新文件夹ID
				myDir:[],//我的文件夹列表
                rowId:"",//当前行ID
				action_type:null,//操作类型 true:移动；false:复制
				action_title:"",//操作名称
				is_admin:"",
				current_page:1
            }
        },
        mounted(){
	        this.is_admin=localStorage.getItem('is_admin')
			if(this.$route.query.type==0){
                this.getAllData();
                this.item_name=this.$route.query.name
            }else {
				var id=this.$route.query.id;
				this.item_name=this.$route.query.name
				this.getData(id);
            }
			this.tableData.forEach(function (item) {
                if (item.title_type==1){
	                item.title_type="量表"
                }else if (item.title_type==2){
	                item.title_type="多选"
                }else if (item.title_type==3){
	                item.title_type="单选"
                }
                item.select_flag=false
			})
        },
        methods:{
            getData(id){
            	var self=this;
            	self.$axios.get('getmine_fun_item',{id:id},(res)=>{
		            console.log(res);
		            if (res.ret){
		            	self.pages=res.msg/10;
			            res.data.forEach(function (item) {
				            item.select_flag=false
			            })
			            self.tableData=res.data
			            this.current_page=1
                    }
	            })
            },
	        handleCurrentChange(val){

            	if(this.$route.query.type==0){
            		var self=this
		            self.$axios.get('getAll_fun',{page:val},(res)=>{
			            if (res.ret){
				            res.data.forEach(function (item) {
					            item.select_flag=false
				            })
				            self.tableData=res.data
			            }
		            })
                }else {
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
						            res.data.forEach(function (item) {
							            item.select_flag=false
						            })
						            self.tableData=res.data
					            }else {
						            res.data.forEach(function (item) {
							            item.select_flag=false
						            })
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
						            res.data.forEach(function (item) {
							            item.select_flag=false
						            })
						            self.tableData=res.data
					            }else {
						            res.data.forEach(function (item) {
							            item.select_flag=false
						            })
						            self.tableData=res.data
					            }
				            })
			            })
		            }
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
                if(this.$route.query.type==0){
	                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
		                confirmButtonText: '确定',
		                cancelButtonText: '取消',
		                type: 'warning'
	                }).then(() => {
		                self.$axios.post('delvar',{var_id:var_id,type:1},(res)=>{
			                if (res.ret){
				                self.tableData.splice(index,1);
				                this.$message({
					                message: '移除成功',
					                type: 'success'
				                });
				                this.getAllData();
			                }
		                })
	                }).catch(() => {
		                this.$message({
			                type: 'info',
			                message: '已取消删除'
		                });
	                });
                }else {
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
				                this.getData(this.$route.query.id)
			                }
		                })
	                }).catch(() => {
		                this.$message({
			                type: 'info',
			                message: '已取消删除'
		                });
	                });
                }
            },
	        handleMove(id){
                this.rowId=id
                this.moveNew=true
                this.action_type=true
                this.action_title="移动到新的文件夹";
                this.$axios.get('getdir_list',{},res=>{
                	if(res.ret){
                		this.myDir=res.data
                    }
                })
            },
	        handleCopy(id){
		        this.rowId=id;
		        this.moveNew=true;
		        this.action_type=false;
		        this.action_title="复制到新的文件夹";
		        this.$axios.get('getdir_list',{},res=>{
			        if(res.ret){
				        this.myDir=res.data
			        }
		        })
            },
	        handleUpdate(id){
		        var self=this
		        if(this.is_admin==1){
			        this.$router.push({path:"/creat_fun", query: { id: id }})
		        }else if(this.is_admin==0){
			        self.$axios.post('fun_isupdate',{id:id},res=>{
				        if(res.ret){
				        	if(self.$route.query.type){
						        this.$router.push({path:"/creat_fun", query: { id: id }})
					        }else {
						        this.$router.push({path:"/creat_fun", query: { id: id ,dir_id:this.$route.query.id,name:this.$route.query.name}})
					        }
				        }else {
					        self.$message.error('您无权操作')
				        }
			        })
		        }
            },
	        toMoveNew(){
            	if(this.action_type){
		            if(this.$route.query.type==0){
			            this.$axios.post('addvar',{var_id:this.rowId,dir_id:this.newdir_id},res=>{
				            if(res.ret){
					            this.$message.success('移动成功');
					            this.getAllData()
				            }
			            })
		            }else {
			            this.$axios.post('moveDir',{var_id:this.rowId,old_dir:this.$route.query.id,dir_id:this.newdir_id},res=>{
				            if(res.ret){
					            this.$message.success('移动成功');
					            this.getData(this.$route.query.id)
				            }
			            })
		            }
                }else if(this.action_type==false){
		            this.$axios.post('copyDir',{var_id:this.rowId,dir_id:this.newdir_id},res=>{
			            if(res.ret){
				            this.$message.success('复制成功');
				            if(this.$route.query.id){
					            this.getData(this.$route.query.id)
                            }else {
					            this.getAllData()
                            }
                            this.current_page="1"
			            }
		            })
                }

            },
            getAllData(){
	            var self=this;
	            self.$axios.get('getAll_fun',{},(res)=>{
		            if (res.ret){
			            self.pages=res.msg/10;
			            res.data.forEach(function (item) {
				            item.select_flag=false
			            })
			            self.tableData=res.data
			            this.current_page=1
		            }
	            })
            },

	        open_select(index){
		        // console.log(this.tableData[index])
		        this.tableData[index].select_flag = true;
		        // this.$set(this.tableData[index],'select_flag',true)
		        // console.log(this.tableData[index])

	        },
	        close_select(index){
		        this.tableData[index].select_flag = false

	        },
	        mysort(o){
		        var self=this
            	if(o.order==='ascending'){
		            this.is_admin=localStorage.getItem('is_admin')
		            if(this.$route.query.type==0){
			            self.$axios.get('getAll_fun',{order_type:'asc'},(res)=>{
				            if (res.ret){
					            self.pages=res.msg/10;
					            res.data.forEach(function (item) {
						            item.select_flag=false
					            })
					            self.tableData=res.data
					            this.current_page=1
				            }
			            })
			            this.item_name=this.$route.query.name
		            }else {
			            var id=this.$route.query.id;
			            this.item_name=this.$route.query.name
			            self.$axios.get('getmine_fun_item',{id:id,order_type:'asc'},(res)=>{
				            console.log(res);
				            if (res.ret){
					            self.pages=res.msg/10;
					            res.data.forEach(function (item) {
						            item.select_flag=false
					            })
					            self.tableData=res.data
					            this.current_page=1
				            }
			            })
		            }
		            this.tableData.forEach(function (item) {
			            if (item.title_type==1){
				            item.title_type="量表"
			            }else if (item.title_type==2){
				            item.title_type="多选"
			            }else if (item.title_type==3){
				            item.title_type="单选"
			            }
			            item.select_flag=false
		            })
                }else if(o.order==='descending'){
		            this.is_admin=localStorage.getItem('is_admin')
		            if(this.$route.query.type==0){
			            self.$axios.get('getAll_fun',{order_type:'desc'},(res)=>{
				            if (res.ret){
					            self.pages=res.msg/10;
					            res.data.forEach(function (item) {
						            item.select_flag=false
					            })
					            self.tableData=res.data
					            this.current_page=1
				            }
			            })
			            this.item_name=this.$route.query.name
		            }else {
			            var id=this.$route.query.id;
			            this.item_name=this.$route.query.name
			            self.$axios.get('getmine_fun_item',{id:id,order_type:'desc'},(res)=>{
				            console.log(res);
				            if (res.ret){
					            self.pages=res.msg/10;
					            res.data.forEach(function (item) {
						            item.select_flag=false
					            })
					            self.tableData=res.data
					            this.current_page=1
				            }
			            })
		            }
		            this.tableData.forEach(function (item) {
			            if (item.title_type==1){
				            item.title_type="量表"
			            }else if (item.title_type==2){
				            item.title_type="多选"
			            }else if (item.title_type==3){
				            item.title_type="单选"
			            }
			            item.select_flag=false
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
    .item_name span{
        color: #1C9A7E;
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
    .nv_btn_2:hover{
        color: #00C597;
        border-color: #00C597;
    }
    .box_select{
    }
    .bottom{
        position: absolute;
        width: 65px;
        padding: 5px 5px;
        /*height: 120px;*/
        bottom: 40px;
        z-index: 99999;
        background-color: #fff;
        border: 1px solid #00a580;
        border-radius: 3px;
    }
    .bottom:nth-child(1){
        position: absolute;
        width: 65px;
        padding: 5px 5px;
        /*height: 120px;*/
        top: 40px;
        z-index: 99999;
        background-color: #fff;
        border: 1px solid #00a580;
        border-radius: 3px;
    }
    #mine_fun_item  tr:nth-child(1)  div.bottom{
        position: absolute;
        width: 65px;
        padding: 5px 5px;
        height: 155px;
        top: 40px;
        z-index: 99999;
        background-color: #fff;
        border: 1px solid #00a580;
        border-radius: 3px;
    }
    #mine_fun_item  tr:nth-child(2)  div.bottom{
        position: absolute;
        width: 65px;
        padding: 5px 5px;
        height: 155px;
        top: 40px;
        z-index: 99999;
        background-color: #fff;
        border: 1px solid #00a580;
        border-radius: 3px;
    }
    #mine_fun_item  tr:nth-child(3)  div.bottom{
        position: absolute;
        width: 65px;
        padding: 5px 5px;
        height: 155px;
        top: 40px;
        z-index: 99999;
        background-color: #fff;
        border: 1px solid #00a580;
        border-radius: 3px;
    }

</style>