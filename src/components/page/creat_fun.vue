<template>
    <div id="creat_fun">
        <div class="wai_box">
            <div class="creatfun">新建变量</div>
            <div class="summarize">
                <div class="tit">变量概述</div>
                <div class="summarize_content">
                    <el-form ref="form" :model="form" label-width="90px"  size="small">
                        <el-row>
                            <el-col :span="6">
                                <el-form-item label="题目类型">
                                    <el-select v-model="form.title_type" placeholder="请选择">
                                        <el-option
                                            v-for="item in title_type"
                                            :key="item.value"
                                            :label="item.name"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">
                                <el-form-item label="构念名">
                                    <el-input v-model="form.name" style="width: 210px"></el-input>
                                </el-form-item>
                            </el-col>
                            <!--<el-col :span="6">-->
                                <!--<el-form-item label="领域">-->
                                    <!--<el-select v-model="form.realm" placeholder="请选择">-->
                                        <!--<el-option-->
                                                <!--v-for="item in realm"-->
                                                <!--:key="item.value"-->
                                                <!--:label="item.name"-->
                                                <!--:value="item.value">-->
                                        <!--</el-option>-->
                                    <!--</el-select>-->
                                <!--</el-form-item>-->
                            <!--</el-col>-->
                            <el-col :span="6">
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="16">
                                <el-form-item label="选择文件夹" >
                                    <el-select v-model="form.dir_id" placeholder="请选择">
                                        <el-option
                                            v-for="item in dir_ids"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="22" >
                                <div class="iis">
                                    <el-form-item label="描述" >
                                        <el-input type="textarea" v-model="form.desc" resize="none" :rows="5" require></el-input>
                                    </el-form-item>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row><el-col :span="24" class="line" v-if="form.title_type==1"></el-col></el-row>
                        <div class="yuan" v-if="form.title_type==1">原始文献（非必填）</div>
                        <el-row v-if="form.title_type==1">
                            <el-col :span="6">
                                <el-form-item label="文章名">
                                    <el-input v-model="form.article_name" ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="检索信息">
                                    <el-input v-model="form.article_message" ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="作者">
                                    <el-tag
                                            :key="tag"
                                            v-for="tag in form.article_author"
                                            closable
                                            :disable-transitions="false"
                                            @close="handleClose(tag)">
                                        {{tag}}
                                    </el-tag>
                                    <el-input
                                            style="width: 60px"
                                            class="input-new-tag"
                                            v-if="inputVisible"
                                            v-model="inputValue"
                                            ref="saveTagInput"
                                            size="small"
                                            @keyup.enter.native="handleInputConfirm"
                                            @blur="handleInputConfirm"
                                    >
                                    </el-input>
                                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row  >
                        <el-row v-if="form.title_type==1">
                            <el-col :span="22" >
                                <div class="iis">
                                    <el-form-item label="概述" >
                                        <el-input type="textarea" v-model="form.article_content" resize="none" :rows="5" require></el-input>
                                    </el-form-item>
                                </div>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
            </div>
            <div class="line" v-if="form.title_type==1"></div>
            <div class="summarize" v-if="form.title_type==1">
                <div class="tit">编辑维度</div>
                <el-form ref="form" :model="form" label-width="80px"  size="small">
                    <div class="summarize_content  wei" v-for="(item,index1) in form.dimension" style="position: relative">
                        <el-row style="display: flex">
                            <el-col :span="6">
                                <el-form-item :label="'维度'+(index1+1)">
                                    <el-input v-model="item.name" ></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <div class="line"></div>
                        <el-row><el-col>添加题目</el-col></el-row>
                        <div v-for="(item1,index) in item.topic">
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item :label="'题目'+(index+1)">
                                        <el-input v-model="item1.name" ></el-input>
                                    </el-form-item>
                                </el-col >
                                <el-col :span="6"><el-button plain size="small" style="margin-left: 50px" v-if="index>0" @click="de_topic(index1,index)">删除题目</el-button></el-col>
                            </el-row>
                        </div>

                        <div class="add_topic" @click="add_topic(index1)">
                            <img src="../../../static/img/lv_+@4x.png" alt="">
                            添加题目
                        </div>
                        <el-row><el-col :span="24"></el-col><div class="line"></div></el-row>
                        <el-row><el-col>添加选项</el-col></el-row>
                        <div v-for="(item2,index3) in item.option" style="margin-top: 15px">
                            <el-row style="align-items: center;display: flex">
                                <el-col :span="1">{{'选项'+(index3+1)}}</el-col>
                                <el-col :span="6" style="margin-right: 10px">
                                    <el-input v-model="item2.name" placeholder="请输入选项内容"></el-input>
                                </el-col >
                                <el-col :span="6">
                                    <el-input v-model="item2.score" placeholder="请输入选项分数（只限数字输入）" type="number"></el-input>
                                </el-col>
                                <el-col :span="2" style="display: flex;margin: 6px 0 0 10px">
                                    <div class="zuo_box" @click="option_sorce_jia(index1,index3)" style=" -webkit-user-select:none; -moz-user-select:none;-ms-user-select:none;user-select:none;"><img src="../../../static/img/lv_+@4x.png" alt="" style=" -webkit-user-select:none; -moz-user-select:none;-ms-user-select:none;user-select:none;"></div>
                                    <div class="zuo_box" @click="option_sorce_jian(index1,index3)" style=" -webkit-user-select:none; -moz-user-select:none;-ms-user-select:none;user-select:none;"><img src="../../../static/img/lv_-@4x.png" alt="" style=" -webkit-user-select:none; -moz-user-select:none;-ms-user-select:none;user-select:none;"></div>
                                </el-col>
                                <el-col :span="2" style="display: flex;margin: 6px 0 0 10px">
                                    <div class="zuo_boxs" @click="sort('sup',index1,index3)" style=" -webkit-user-select:none; -moz-user-select:none;-ms-user-select:none;user-select:none;"><img src="../../../static/img/up@4x.png" alt="" style=" -webkit-user-select:none; -moz-user-select:none;-ms-user-select:none;user-select:none;"></div>
                                    <div class="zuo_boxs" @click="sort('sub',index1,index3)" style=" -webkit-user-select:none; -moz-user-select:none;-ms-user-select:none;user-select:none;"><img src="../../../static/img/down@4x.png" alt=""  style=" -webkit-user-select:none; -moz-user-select:none;-ms-user-select:none;user-select:none;"></div>
                                </el-col>
                                <el-col :span="4"><el-button plain size="small" style="margin-left: 50px" v-if="index3>1" @click="de_option(index1,index3)">删除选项</el-button></el-col>
                            </el-row>
                        </div>
                        <!--</el-button></el-col></el-row>-->
                        <div class="add_topic" @click="add_option(index1)" style="margin-left: 0;margin-top: 10px">
                            <img src="../../../static/img/lv_+@4x.png" alt="">
                            添加选项
                        </div>
                        <div style="position: absolute;right: 5px;top: 5px;cursor: pointer;display: flex;align-items: center" @click="delwe(index1)" v-if="index1>0">
                            <div style="margin-right: 15px;color: rgba(26, 179, 148, 1);">删除当前维度</div>
                            <img src="../../../static/img/del.png" alt="" style="width: 35px;height: 35px">
                        </div>
                    </div>
                </el-form>
                <!--<el-button type="danger">危险按钮</el-button>-->

            </div>
            <div class="add_box" @click="add_wei" v-if="form.title_type==1">
                <img src="../../../static/img/lv_+@4x.png" alt="">
                添加维度
            </div>
        </div>

        <!--<div class="add_box" style="position: relative">-->
            <!--<div class="line"></div>-->
            <!--<el-button plain size="small" style="margin-left: 80px;width: 153px;border-color:rgba(26, 179, 148, 1);color: rgba(26, 179, 148, 1);position: absolute;top: -18px;left: 38%" @click="add_wei">-->
                <!--<span class="iconfont icon-jia jia" ></span>-->
                <!--添加维度-->
            <!--</el-button>-->
        <!--</div>-->
        <el-dialog title="添加变量" :visible.sync="dir_L">
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
            <div style="text-align: center;color: #ccc;font-size: 14px">选择你想添加到的文件夹</div>
            <div class="item_box">
                <div v-for="(item,index) in dir_list" class="item_box_item">
                    <div class="item_box_item_left">
                        <div>{{item.name}}</div>
                        <div>{{item.num}}条内容</div>
                    </div>
                    <div class="nv_btn_2" @click="addDir(index)" v-if="!item.select">添加</div>
                    <div class="nv_btn_3" v-if="item.select"style="width: 100px;line-height: 40px">已添加</div>
                </div>
            </div>
            <div style="margin: 10px auto;width: 139px">
                <el-button type="primary" @click="innerVisible = true">创建新的文件夹</el-button>
            </div>
        </el-dialog>
        <div class="interaction">
            <div class="nc_btn" @click="order">完成</div>
            <div class="nv_btn_2" @click="cancel">取消</div>
            <!--<el-button type="primary" class="interaction_btn" style="background-color: rgba(26, 179, 148, 1)" @click="order">完成</el-button>-->
            <!--<el-button plain class="interaction_btn">取消</el-button>-->
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                is_admin:"",
                crt_dirname:"",
                innerVisible:false,
                form:{
                    name:"",//构念名
                    realm:"",//领域
                    title_type:"1",//题目类型
                    desc:"",//描述
                    article_name:"",//文章名
                    article_message:"",//检索信息
                    article_content:"",//文章描述
                    article_author:[],//文章作者
                    dimension:[//编辑维度
                        {
                            name:"",//文章名
                            topic:[//题目
                                {
                                    name:""//题目名
                                },
                                {
                                    name:""
                                },
                                {
                                    name:""
                                }
                            ],
                            option:[//添加选项
                                {
                                    name:"",
                                    score:"",
                                    sort:""
                                },
                                {
                                    name:"",
                                    score:"",
                                    sort:""
                                }
                            ]
                        }
                    ],
	                dir_id:0
                },
                dir_L:false,
                value:"",
                realm:[
                    {
                        name:"医疗",
                        value:"1"
                    },
                    {
                      name:"管理",
                      value:"2"
                    },
                    {
                      name:"烹饪",
                      value:"3"
                    },
                ],
                title_type:[
                    {
                        name:"量表",
                        value:"1"
                    },
                    {
                        name:"多选",
                        value:"2"
                    },
                    {
                        name:"单选",
                        value:"3"
                    },
                ],
                dynamicTags: ['标签一', '标签二', '标签三'],
                inputVisible: false,
                inputValue: '',
                dir_list:[
                    {
                        name:"文件加1",
                        num:"15",
                                // select:true
                    }
                ],
	            dir_ids:[]
            }
        },
        mounted(){
            this.is_admin=localStorage.getItem('is_admin');
            this.getdirLists();
            var id=this.$route.query.id;
            if (id){
                this.get_fun_fan(id)
            }
        },
        methods:{
			// index1:每个维度
            // index:每个题目，每个选项
            get_fun_fan(id){
                var self=this
                self.$axios.get('getmine_fun_item_detail',{id:id},(res)=>{
                	   console.log(res)
                    if (res.ret){
                        self.form.article_author=res.data.article_author.split(',');
                        self.form.name=res.data.name;
                        self.form.desc=res.data.desc;
                        self.form.article_message=res.data.article_message;
                        self.form.article_content=res.data.article_content;
                        self.form.article_name=res.data.article_name;
                        res.data.dis.forEach(function (item) {
                              item.topic=item.topics;
                              item.option=item.options
                        });
                          self.form.dimension= res.data.dis;
                          self.form.realm=res.data.realm;
                        self.form.title_type=res.data.title_type
                    }
                })
            },
            add_wei(){//添加维度
	        	this.form.dimension.push({
                name:"",
                topic:[{name:""}],
                option:[{name:"",score:"",sort:""}]
                    })
            },
            add_topic(index){
                this.form.dimension[index].topic.push({name:""})
            },
            de_topic(index1,index){//删除题目
		            this.form.dimension[index1].topic.splice(index,1)
            },
            option_sorce_jia(index1,index){//选项加分

                // this.form.dimension[index1].option[index].score+=0
                this.form.dimension[index1].option[index].score++
                    index1=""
                    index=""
            },
            option_sorce_jian(index1,index){//选项减分
                if (this.form.dimension[index1].option[index].score==0){
                    return
                }else {
                    this.form.dimension[index1].option[index].score--
                }
            },
            add_option(index){
                this.form.dimension[index].option.push({
                    name:"",
                    score:"",
                    sort:"0"
                })
            },
            de_option(index1,index){
                this.form.dimension[index1].option.splice(index,1)
            },

            handleClose(tag) {
                this.form.article_author.splice(this.form.article_author.indexOf(tag), 1);
            },

            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.form.article_author.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },

            order(){//提交表单

                var id=this.$route.query.id;
                if(id){
                    var self=this;
                    if(this.is_admin==0){
	                    self.form.id=id;
	                    self.$axios.post('user_fun_update',this.form,(res)=>{
		                    if (res.ret) {
			                    this.$message.success('编辑成功，正在跳转...');
			                    if(this.$route.query.dir_id){
				                    setTimeout(function () {self.$router.push({path: '/mine_fun_item?id='+self.$route.query.dir_id+'&&name='+self.$route.query.name})}, 1000)
			                    }else {
				                    setTimeout(function () {self.$router.push({path: '/mine_fun_item?type=0'+'&&name='+'全部'})}, 1000)
                                }
		                    }else {
			                    this.$message.error(res.msg)
		                    }
	                    })
                    }else if(this.is_admin==1){
	                    self.form.id=id;
	                    self.$axios.post('terrace_model_fun',this.form,(res)=>{
		                    if (res.ret) {
			                    this.$message.success('编辑成功，正在跳转...');
			                    setTimeout(function () {self.$router.push({path: '/terrace'})}, 1000)
		                    }else {
			                    this.$message.error(res.msg)
		                    }
	                    })
                    }
                }else{
                    if(this.is_admin==0){
                        var self=this;
                        // self.dir_L=true
                        // self.$axios.get('getdir_list',{},(res)=>{
                        //     if (res.ret){
                        //         res.data.forEach(function (item) {
                        //             item.select=false
                        //         })
                        //         self.dir_list=res.data
                        //     }
                        // })
                        //备用提交方法
	                    self.$axios.post('add_fun',this.form,(res)=>{
		                    if (res.ret){
			                    this.$message.success('编写成功');
                                var name="";
                                self.dir_list.forEach(item=>{
                                	if(item.id=self.form.dir_id){
                                		name=item.name
                                    }
                                })
                                if(this.form.dir_id==0){
                                	name="全部变量";
	                                setTimeout(function () {self.$router.push({path: '/mine_fun_item',query:{type:0,name:name}})}, 1000)
                                }else {
	                                setTimeout(function () {self.$router.push({path: '/mine_fun_item',query:{id:self.form.dir_id,name:name}})}, 1000)
                                }
		                    }else{
			                    this.$message.error(res.msg)
		                    }
	                    })
                    }else if(this.is_admin==1){
                    	var self=this
                        this.$axios.post('add_fun',this.form,(res)=>{
                            if (res.ret) {
                                this.$message.success('编写成功');
                                // self.dir_list[index].select=true
                              setTimeout(function () {self.$router.push({path: '/terrace_search_fun?key_words='})}, 1000)
                            }else {
                                this.$message.error(res.msg)
                            }
                        })
                    }
                }
            },
            cancel(){
	            var id=this.$route.query.id;
	            var self=this
                //修改或新建
	            if(id){
                	//管理员或用户
		            if(this.is_admin==0){
		                this.$confirm('是否取消编辑', '提示', {
			                confirmButtonText: '确定',
			                cancelButtonText: '取消',
			                type: 'warning'
		                }).then(() => {
			                if(self.$route.query.dir_id){//从指定文件夹来

				                self.$router.push({path:'/mine_fun_item',query:{id:self.$route.query.dir_id,name:self.$route.query.name}})
			                }else {
				                self.$router.push({path:'/mine_fun_item',query:{type:0,name:'全部'}})
			                }
			                this.$message({
				                type: 'success',
				                message: '取消成功!'
			                });
		                }).catch(() => {
			                this.$message({
				                type: 'info',
				                message: '已取消编辑'
			                });
		                });
                    }else {
		                this.$confirm('是否取消编辑', '提示', {
			                confirmButtonText: '确定',
			                cancelButtonText: '取消',
			                type: 'warning'
		                }).then(() => {
			                this.$message({
				                type: 'success',
				                message: '取消成功!'
			                });
			                self.$router.push({path:'/terrace_search_fun',query:{key_words:""}})
		                }).catch(() => {
			                this.$message({
				                type: 'info',
				                message: '已取消编辑'
			                });
		                });
                    }

                }else{
                	if (this.is_admin==0){
		                this.$confirm('是否取消编辑', '提示', {
			                confirmButtonText: '确定',
			                cancelButtonText: '取消',
			                type: 'warning'
		                }).then(() => {
			                this.$message({
				                type: 'success',
				                message: '取消成功!'
			                });
			                self.$router.push({path:'/mine_fun'})
		                }).catch(() => {
			                this.$message({
				                type: 'info',
				                message: '已取消编辑'
			                });
		                });
                    }else {
                        this.$confirm('是否取消编辑', '提示', {
			                confirmButtonText: '确定',
			                cancelButtonText: '取消',
			                type: 'warning'
		                }).then(() => {
			                this.$message({
				                type: 'success',
				                message: '取消成功!'
			                });
	                        self.$router.push({path:'/terrace_search_fun',query:{key_words:""}})
		                }).catch(() => {
			                this.$message({
				                type: 'info',
				                message: '已取消编辑'
			                });
		                });
                    }
                }
            },
            addDir(index){
                var self=this
                self.form.dir_id=self.dir_list[index].id
                self.$axios.post('add_fun',this.form,(res)=>{
                    if (res.ret){
                        this.$message.success('编写成功');
                        self.dir_list[index].select=true
                        setTimeout(function () {self.$router.push({path: '/mine_fun'})}, 1000)
                    }else{
                       this.$message.error(res.msg)
                    }
                })
            },
            sort(type, index,index1) {
                let self = this

                if(type == 'sub'){
                    var cur = this.form.dimension[index].option.splice(index1, 1)
                    this.form.dimension[index].option.splice(index1+1, 0, cur[0])
                }else {
                    if (index1 == 0) {
                        return;
                    }
                    var cur = this.form.dimension[index].option.splice(index1, 1)
                    this.form.dimension[index].option.splice(index1-1, 0, cur[0])
                }
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
            delwe(index){
                this.$confirm('确认删除当前维度, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log(index)
                        this.form.dimension.splice(index,1)
                        console.log(this.form)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            getdirLists(){
            	this.$axios.get('getdirlist',{},res=>{
            		if(res.ret){
                        res.data.push({
                            name:'全部',
                            id:0
                        })
            			this.dir_ids=res.data
                    }
                })
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
    .yuan{
        color: rgba(16, 16, 16, 1);
        font-size: 14px;
        font-family: Roboto;
        margin-bottom: 12px;
    }
#creat_fun{
    /*width: 1180px;*/
    /*margin-top: 28px;*/
    /*background-color: #fff;*/
    /*border: 1px solid rgba(255, 255, 255, 1);*/
    /*border-radius: 5px;*/
    /*box-shadow: 0px 0px 5px 0px rgba(207, 207, 207, 1);*/
    /*margin: 28px auto 0;*/
}
    .creatfun{
        height: 41px;
        line-height: 41px;
        color: rgba(26, 179, 148, 1);
        font-size: 28px;
        font-family: Roboto;
        margin: 25px 0 0 39px;
    }
    .summarize{
        /*width: 1227px;*/
        margin: 30px auto 27px;
    }
    .summarize .tit{
        line-height: 20px;
        color: rgba(26, 179, 148, 1);
        font-size: 14px;
        font-family: Roboto;
        margin-bottom: 18px;
        margin-left: 50px;
    }
    .summarize_content{
        max-width: 1227px;
        margin: 0 auto;
        /*min-height: 490px;*/
        line-height: 20px;
        border: 1px solid rgba(255, 255, 255, 1);
        border-radius: 5px;
        background-color: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 5px 0px rgba(170, 170, 170, 1);
        padding: 15px 24px;
        min-height: max-content;
    }
    .summarize_content select{
        border-radius: 5px;
        padding: .2rem .6rem;
        width: 140px;
        height: 30px;
        line-height: 20px;
        border: 1px solid rgba(187, 187, 187, 1);
        color: rgba(16, 16, 16, 1);
        font-size: 14px;
        font-family: Microsoft Yahei;
        outline: 0;
    }
    .summarize_content textarea{
        min-height: 100px!important;
    }
    .line{
        height: 2px;
        background-color: #ccc;
        margin: 8px 0 16px;
    }
    .jia{
        color: rgba(26, 179, 148, 1);
        margin-right: 30px;
        font-size: 14px;
    }
    .wei:first-child{
        margin-top: 0;
    }
    .wei{
        margin-top: 20px;
    }
    .wei:last-child{
        margin-top: 43px;
    }
    .author_cao{
        height: 20px;
        color: rgba(26, 179, 148, 1);
        font-size: 18px;
        margin-left: 15px;
        line-height: 33px;
        cursor: pointer;
    }
    .option_cao{
        color: rgba(26, 179, 148, 1);
        font-size: 22px;
        margin-left: 15px;
        line-height: 38px;
        cursor: pointer;
    }
    .option_tiao{
        color: rgba(26, 179, 148, 1);
        font-size: 22px;
        margin-left: 15px;
        line-height: 38px;
        cursor: pointer;
    }
    .interaction{
        padding: 18px 76px;
        display: flex;
        justify-content: flex-start;
    }
    .interaction_btn{
        width: 143px;
    }
    .nc_btn{
        width: 90px;
        height: 40px;
        line-height: 40px;
    }
    .nv_btn_2{
        width: 90px;
        height: 40px;
        line-height: 40px;
        margin-left: 20px;
        font-size: 16px;
        color: #009E79;
        letter-spacing: 0;
    }
    .zuo_box{
        width: 25px;
        height: 25px;
        background: #FFFFFF;
        border: 1px solid #009E79;
        border-radius: 4px;
        cursor: pointer;
    }
    .zuo_box:nth-child(1){
        margin-right: 10px;
    }
    .zuo_box:nth-child(1) img{
        width: 10px;
        height: 10px;
        display: block;
        margin: 7px auto;
    }
    .zuo_box:nth-child(2) img{
        display: block;
        width: 10px;
        margin: 11px auto;
    }
    .zuo_boxs{
        width: 25px;
        height: 25px;
        background: #FFFFFF;
        border: 1px solid #009E79;
        border-radius: 4px;
        cursor: pointer;
    }
    .zuo_boxs img{
        width: 12px;
        height: 7px;
        display: block;
        margin: 8px auto;
    }
    .zuo_boxs:nth-child(1){
        margin-right: 10px;
    }
    .add_topic{
        background: #FFFFFF;
        border: 1px solid #009E79;
        border-radius: 6px;
        font-size: 16px;
        color: #009E79;
        letter-spacing: 0;
        width: 130px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        margin-left: 80px;
        cursor: pointer;
    }
    .add_topic img{
        display: inline-block;
        width: 12px;
        height: 12px;
    }
    .add_box{
        width: 1226px;
        height: 70px;
        margin: 0 auto;
        background: #FFFFFF;
        border: 2px solid #D8D8D8;
        border-radius: 6px;
        font-size: 16px;
        color: #009E79;
        letter-spacing: 0;
        padding: 0 26px;
        text-align: center;
        line-height: 70px;
        cursor: pointer;
    }
    .add_box img{
        width: 12px;
        height: 12px;
    }
    .item_box_item{
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
    }

    .item_box_item_left div:nth-child(1){
        overflow: hidden;
        font-weight: 700;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 15px;
        color: #1a1a1a;
    }
    .item_box_item_left div:nth-child(2){
        font-size: 14px;
        color: #8590a6;
        margin-top: 4px;
    }
    .add_topic:hover{
        color: #00C597;
        border-color: #00C597;
    }
</style>
