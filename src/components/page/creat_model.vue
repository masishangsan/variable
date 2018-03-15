<template>
    <div id="creat_fun">
        <div class="wai_box">
            <div class="creatfun">创建模型</div>
            <div class="summarize">
                <div class="tit">检索信息</div>
                <div class="summarize_content" style="min-height: 220px">
                    <el-form ref="form" :model="form" label-width="80px"  size="small">
                        <el-row>
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
                            <el-col :span="10" class="author">
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
                        </el-row>
                        <el-row>
                            <el-col :span="22" >
                                <div class="iis">
                                    <el-form-item label="描述" required>
                                        <el-input type="textarea" v-model="form.article_content" resize="none" :rows="5" require></el-input>
                                    </el-form-item>
                                </div>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
            </div>
            <div class="line"></div>
            <div class="summarize">
                <div class="tit">构建模型</div>
                <el-form ref="form" :model="form" label-width="80px"  size="small">
                    <div class="summarize_content  wei">
                        <el-row><el-col :span="24" style="font-size: 14px">所涉变量</el-col></el-row>
                        <div v-for="(item,index) in form.variable">
                            <el-row>
                                <el-col :span="6">
                                    <el-form-item :label="'变量'+(index+1)">
                                        <!--<el-input v-model="item.name" placeholder="请输入变量"></el-input>-->
                                        <el-select v-model="item.var_id" placeholder="请选择" @change="blchangeval(index)" filterable>
                                            <el-option
                                                    v-for="bl in bloption"
                                                    :key="bl.id"
                                                    :label="bl.name"
                                                    :disabled="bl.disabled"
                                                    :value="bl.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item >
                                        <el-select class="tags"
                                                   @change="tagsChange(index)"
                                                   v-model="item.dis_id"
                                                   multiple
                                                   collapse-tags
                                                   style="margin-left: 20px;"
                                                   placeholder="全部维度">
                                            <el-option
                                                    v-for="item in wdoptions[index]"
                                                    :key="item.id"
                                                    :label="item.name"
                                                    :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6" style="margin-left: 60px">
                                    <span class="iconfont icon-chazishanchudaibiankuang option_tiao" @click="de_fun(index)" v-if="index>1"></span>
                                </el-col>
                            </el-row>
                        </div>
                        <!--<el-row><el-col> <el-button plain size="small" style="margin-left: 80px;width: 153px;border-color:rgba(26, 179, 148, 1);color: rgba(26, 179, 148, 1)" @click="add_fun">-->
                        <!--<span class="iconfont icon-jia jia" ></span>-->
                        <!--添加变量-->
                        <!--</el-button></el-col></el-row>-->
                        <div class="add_topic" @click="add_fun">
                            <img src="../../../static/img/lv_+@4x.png" alt="">
                            添加变量
                        </div>
                        <el-row style="margin-top: 10px"><el-col :span="24"><div class="line"></div></el-col></el-row>
                        <el-row><el-col :span="24" style="font-size: 14px">变量关系</el-col></el-row>
                        <div v-for="(item1,index1) in form.relation">
                            <el-row style="font-size: 14px;margin-top: 10px">
                                <el-col :span="1" style="margin-left: 30px"><span style="line-height: 40px">逻辑{{index1+1}}</span></el-col>
                                <el-col :span="4">
                                    <el-select v-model="item1.z_bl" placeholder="自变量" filterable @change="Zchange(item1)">
                                        <el-option
                                                v-for="item in Zluoji"
                                                :key="item.id"
                                                :label="item.name"
                                                :disabled="!item.len > 0"
                                                :value="item.name">
                                        </el-option>
                                    </el-select>
                                    <!--<el-input v-model="item1.z_bl"  placeholder="自变量"></el-input>-->
                                </el-col>
                                <el-col :span="1"><span class="iconfont icon-jiantouarrow484 option_tiao"></span></el-col>
                                <el-col :span="2" class="du">
                                    <el-select v-model="item1.is_add" placeholder="" >
                                        <el-option
                                                v-for="item in is_add"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="4" style="margin:0 20px">
                                    <!--<el-input v-model="item1.y_bl"  placeholder="因变量" ></el-input>-->
                                    <el-select v-model="item1.y_bl" placeholder="因变量" filterable @change="Ychange(item1)">
                                        <el-option
                                                v-for="item in Yluoji"
                                                :key="item.id"
                                                :label="item.name"
                                                :disabled="!item.len > 0 || item1.z_bl == item.id"
                                                :value="item.name">
                                        </el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="4" style="margin-right: 20px">
                                    <el-select v-model="item1.is_adjust" placeholder="是否调节" >
                                        <el-option
                                                v-for="item in is_adjust"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="3" v-if="item1.is_adjust==1">
                                    <el-input v-model="item1.adjust"  placeholder="调节变量"></el-input>
                                </el-col>
                                <el-col :span="2" v-if="index1>0"><span class="iconfont icon-chazishanchudaibiankuang option_tiao" @click="de_logic(index1)"></span></el-col>
                            </el-row>
                        </div>
                        <!--<el-row><el-col> <el-button plain size="small" style="margin-left: 76px;margin-top: 20px;width: 153px;border-color:rgba(26, 179, 148, 1);color: rgba(26, 179, 148, 1)" @click="add_logic">-->
                        <!--<span class="iconfont icon-jia jia" ></span>-->
                        <!--添加逻辑-->
                        <!--</el-button></el-col></el-row>-->
                        <div class="add_topic" @click="add_logic" style="margin-top: 10px">
                            <img src="../../../static/img/lv_+@4x.png" alt="">
                            添加逻辑
                        </div>
                        <el-row style="margin-top: 10px"><el-col :span="24"><div class="line"></div></el-col></el-row>
                        <el-row><el-col :span="24" style="font-size: 14px">添加图片</el-col></el-row>
                        <el-upload
                                class="avatar-uploader"
                                action="http://39.104.56.226/index/mould/upload"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                style="border: 1px solid rgba(255,255,255,1)"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="form.img" :src="form.img" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>
                </el-form>
            </div>
        </div>
        <div class="interaction">
            <div class="nc_btn" @click="order">完成</div>
            <div class="nv_btn_2" @click="cancel">取消</div>
            <!--<el-button type="primary" class="interaction_btn" style="background-color: rgba(26, 179, 148, 1)" @click="order">完成</el-button>-->
            <!--<el-button plain class="interaction_btn" @click="cancel">取消</el-button>-->
        </div>
    </div>
</template>

<script>
	export default {
		data(){
			return{
				form:{
					article_name:"",//文章名
					article_author:[],//文章作者
					article_message:"",//检索信息
					article_content:"",//文章描述
                    variable:[
                        {
                            var_id:"",
                            dis_id:[]
                        },
	                    {
		                    var_id:"",
		                    dis_id:[]
	                    },
                    ],
					relation:[
                        {
                            z_bl:"",
                            y_bl:"",
                            is_add:"",
                            is_adjust:"",
                            adjust:""
                        }
                    ],
                    img:""
				},
				inputVisible: false,
				inputValue: '',
				wdoptions:[],
				bloption:[],//变量选项值
				is_add:[
                    {
	                    label:"+",
                        value:"1"
                    },
					{
						label:"-",
						value:"0"
					}
                ],
				is_adjust:[
                    {
                    	label:"无调节",
                        value:"0"
                    },
					{
						label:"有调节",
						value:"1"
					},
                ],
				value:"",
                luoji:[],
                Zluoji:[],
				Yluoji:[],
				YluojiIds: [],
                handArray:[]
			}
		},
		mounted(){

			var id=this.$route.query.id;
            // console.log(id)
            if (id){
				this.get_model_fan(id);
            }else{
	            this.getblMsg();
            }
		},
		methods:{
			tagsChange(index){
				// console.log(this.form.variable[index])
				if (this.form.variable[index].dis_id.indexOf(0)>-1) {
					this.form.variable[index].dis_id = [0];
				}
			},
			add_fun(){//添加变量
                if (this.form.variable.length>this.wdoptions.length){
                	return
                }else {
	                this.form.variable.push({var_id:"",dis_id:[]})
                }
            },
			de_fun(index){//删除变量
				this.form.variable.splice(index,1)
                this.bloption[index].disabled=false
            },
			add_logic(){//删除逻辑
				this.form.relation.push({
					z_bl:"",
					y_bl:"",
					is_add:"",
					is_adjust:"",
					adjust:""
                })
            },
			de_logic(index){//添加逻辑
				this.form.relation.splice(index,1)
                this.handArray.splice(index,1)
                console.log(this.handArray)
            },
            getblMsg(){//获取变量的值
                var self=this
                self.$axios.post('getblMsg',{},(res)=>{
                	self.bloption=res.data
	                self.bloption.forEach(function (item) {
                        item.disabled=false
	                })

                    var variableIds = [];
	                this.form.variable.forEach((item)=>{
		                variableIds.push(item.var_id)
	                })
	                this.bloption.forEach((item2)=>{
                        if (variableIds.indexOf(item2.id) > -1) {
	                        item2.disabled=true
                        }
	                })
                    // console.log(self.form.variable,'753965654164165')
                })
            },
			Zchange(row){

				// console.log(row);
                var self = this;
                self.Zluoji.forEach((item, index)=>{
					if (item.id == row.z_bl) {
						self.Zluoji[index].len = item.len - 1;
					}
				})

				self.luoji.forEach((item, index)=>{
					if (item.id == row.z_bl) {
						self.luoji[index].len = item.len - 1;
					}
				})



				// var ZIds = [];
				// this.form.relation.forEach((item)=>{
				// 	ZIds.push(item.z_bl)
				// })
				// this.Zluoji.forEach((item2)=>{
				// 	if (ZIds.indexOf(item2.id) > -1) {
				// 		item2.disabled=true
				// 	}else {
				// 		item2.disabled=false
				// 	}
				// })
            },
            Ychange(row){
				// console.log(row)
                if (row.y_bl==row.z_bl){
	                this.$message.error('该因变量不可选');
	                row.y_bl=""
                }
                var self=this

                if (self.handArray.indexOf(row.z_bl + '' + row.y_bl) === -1) {
	                self.handArray.push(row.z_bl + '' + row.y_bl)
                }else{
	                self.$message.error('这条关系已存在');
	                row.y_bl="";
                    row.z_bl=""
                }
            },
			blchangeval(index){
				var self=this
                var  val = self.form.variable[index].var_id;
                self.$axios.get('getwd_Bybl',{id:val},(res)=>{
	                // console.log(self.wdoptions)
                    res.data.push({name:"全部维度",id:0})
                    self.$set(self.wdoptions, index, res.data)
                    // self.wdoptions[index] = res.data

	                // self.wdoptions.push({name:"全部变量",id:0})
                });

                this.handleChange()
                var arr=[]
                self.Zluoji=[];
                self.Yluoji=[];
                self.form.variable.forEach(function (item) {
                	if(item.var_id!=''){
		                arr.push(item.var_id)
	                }
                })
                arr.forEach(function (item) {
                    self.bloption.forEach(function (item1) {
                        if(item1.id==item){
                        	// self.luoji.push({id:item1.id,name:item1.name,disabled:false})
	                        self.Zluoji.push({id:item1.id,name:item1.name,disabled:false})
	                        self.Yluoji.push({id:item1.id,name:item1.name,disabled:false})

	                        self.Zluoji.forEach((val)=>{
	                        	val['len'] = (self.Zluoji.length - 1);
                            })
	                        self.Yluoji.forEach((val)=>{
		                        val['len'] = (self.Yluoji.length - 1);
	                        })
	                        // self.luoji.forEach(function (item2) {
                             //    item2.disabled=false
	                        // })
                        }
                    })
                })
            },
            handleChange(){
	            var variableIds = [];
	            this.form.variable.forEach((item)=>{
		            variableIds.push(item.var_id)
	            })
	            this.bloption.forEach((item2)=>{
		            if (variableIds.indexOf(item2.id) > -1) {
			            item2.disabled=true
		            }else {
			            item2.disabled=false
                    }
	            })
            },
			handleAvatarSuccess(res, file) {
				this.form.img = res.data;
			},
			beforeAvatarUpload(file) {

				// const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				// if (!isJPG) {
				// 	this.$message.error('上传头像图片只能是 JPG 格式!');
				// }
				if (!isLt2M) {
					this.$message.error('上传图片大小不能超过 2MB!');
				}
				return isLt2M;
			},
			order(){//提交表单
				var id=this.$route.query.id;
                if (id){
	                var self=this;
	                self.form.id=id;
	                self.$axios.post('terrace_model_update',this.form,(res)=>{
		                if (res.ret) {
			                this.$message.success('编辑成功，正在跳转...');
			                setTimeout(function () {self.$router.push({path: '/terrace'})}, 1000)
		                }else {
			                this.$message.error(res.msg)
                        }
	                })
                }else {
	                var self=this;
	                // self.form.variable.forEach(function (item) {
                     //    if(item.var_id==""||item.dis_id==[]){
	                //         self.$message({
		             //            message: '您有未填完的表单',
		             //            type: 'warning'
	                //         });
                     //    }else {
	                        self.$axios.post('add_model',self.form,(res)=>{
		                        if (res.ret) {
			                        this.$alert('创建成功！', '编辑提示', {
				                        confirmButtonText: '确定',
				                        callback: action => {
					                        this.$message.success('编写成功，正在跳转...');
					                        setTimeout(function () {self.$router.push({path: '/mine_model'})}, 1000)
				                        }
			                        });
		                        }else {
			                        this.$message.error(res.msg)
		                        }
	                        })
                     //    }
	                // })
                }
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

            get_model_fan(id){
				var self=this
                self.$axios.get('getmodel_msg',{id:id},(res)=>{
                	console.log(res)
                	// self.form.article_author=res.data.article_author;
	                self.form.article_content=res.data.article_content;
	                self.form.article_message=res.data.article_message;
	                self.form.article_name=res.data.article_name;
                    self.form.article_author=res.data.article_author.split(',')
	                self.form.img=res.data.img
                    res.data.var.forEach(function (item) {
	                    item.dis_id = [];
	                    item.dis.forEach(function (item1) {
		                    item.dis_id.push(item1.id);
	                    })
                        item.var_id=item.id
                        self.blchangeval(item.var_id);
                    })
                    console.log( res.data.var);
	                self.form.variable=res.data.var;
	                self.form.relation=res.data.rea;

	                self.getblMsg();
                })
            },

			getFocus(){
                var self=this
                self.form.variable.forEach(function (item) {

	                self.bloption.forEach(function (item2) {
		                item2.disabled=true
                        // if (item.var_id==item2.id){
                         //    item2.disabled=true
                        // }
		                // item2.disabled=false
	                })
                })
            },

			cancel(){
				var id=this.$route.query.id;
				if(id){
					this.$confirm('是否取消编辑', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$message({
							type: 'success',
							message: '取消成功!'
						});
						this.$router.push({path:'/terrace_search_model',query:{key_words:""}})
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
						this.$router.push({path:'/mine_model'})
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消编辑'
						});
					});
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
    .yuan{
        color: rgba(16, 16, 16, 1);
        font-size: 14px;
        font-family: Roboto;
        margin-bottom: 12px;
    }
    #creat_fun{
        /*width: 1180px;*/
        /*margin: 28px auto 0;*/
        /*background-color: #fff;*/
        /*border: 1px solid rgba(255, 255, 255, 1);*/
        /*border-radius: 5px;*/
        /*box-shadow: 0px 0px 5px 0px rgba(207, 207, 207, 1);*/

    }
    .creatfun{
        height: 41px;
        line-height: 41px;
        color: rgba(26, 179, 148, 1);
        font-size: 28px;
        font-family: Roboto;
        margin: 25px 0 0 39px;
    }
    /*.summarize{*/
        /*width: 924px;*/
        /*margin: 30px auto 27px;*/
    /*}*/
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
        min-height: 490px;
        line-height: 20px;
        border: 1px solid rgba(255, 255, 255, 1);
        border-radius: 5px;
        background-color: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 5px 0px rgba(170, 170, 170, 1);
        padding: 15px 24px;
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
    .option_tiao{
        color: #333;
        font-size: 22px;
        margin-left: 15px;
        line-height: 38px;
        cursor: pointer;
    }
    .interaction{
        padding: 18px 126px;
        display: flex;
        justify-content: flex-start;
    }
    .interaction_btn{
        width: 143px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 132px;
        height: 132px;
        line-height: 132px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    .el-upload--text{
        border: 1px dashed #d9d9d9;
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
</style>