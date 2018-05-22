<template>
    <div id="mine_fun_item_detail">
        <div class="wai_box">
            <div class="back_box">
                <div class="back" @click="back"><span class="iconfont icon-fanhui"></span></div>
            </div>
            <el-row ><el-col :span="24" style="margin-left: 70px;">概念描述</el-col></el-row>
            <div class="content_box content_box_summarize">
                <el-row>
                    <div class="flex">
                        <div>构念名：</div>
                        <div>{{messageInfo.name}}</div>
                    </div>
                    <el-col :span="4" ></el-col>
                    <!--<el-col :span="4" >领域：{{messageInfo.realm}}</el-col>-->
                    <el-col :span="5" ></el-col>
                </el-row>
                <el-row>
                    <span style="font-size: 14px;font-weight: 700">共{{messageInfo.dis.length}}个维度</span>
                </el-row>
                <el-row>
                    <div class="flex">
                        <div>概述：</div>
                        <div>{{messageInfo.desc}}</div>
                    </div>
                </el-row>
                <div class="line"></div>
                <el-row><el-col :span="4" style="margin-bottom: 20px;font-weight: bold;font-size: 14px">原始文献</el-col></el-row>
                <el-row >
                    <div class="flex">
                        <div>文章名：</div>
                        <div>《{{messageInfo.article_name}}》</div>
                    </div>
                </el-row>
                <div style="display: flex;font-size: 14px;margin:10px 0 0 25px">
                    <div style="min-width: 70px;font-weight: 600">作者：</div>
                    <div>{{messageInfo.article_author}}</div>
                </div>
                <div style="display: flex;font-size: 14px;margin:10px 0 0 25px">
                    <div style="min-width: 70px;font-weight: 600">索引信息：</div>
                    <div>{{messageInfo.article_message}}</div>
                </div>
                <div style="display: flex;font-size: 14px;margin:10px 0 0 25px">
                    <div style="min-width: 70px;font-weight: 600">文献概述：</div>
                    <div>{{messageInfo.article_content}}</div>
                </div>
            </div>
            <el-row ><el-col :span="24" style="margin-left: 70px;">下属维度（共{{messageInfo.dis.length}}个维度）</el-col></el-row>
            <div class="content_box" :class="[zk1?'':'maxhe']">
                <div v-for="(item,index) in messageInfo.dis" class="content_box_item ">
                    <el-row><el-col :span="8"> <span style="font-weight: bold">维度{{index+1}}</span>： {{item.name}}</el-col></el-row>
                    <el-row><el-col :span="8"><span> <span style="font-weight: bold">类型：</span>{{messageInfo.title_type}}</span></el-col></el-row>
                    <div class="topic_box">
                        <el-table
                                border
                                :data="item.topics"
                                style="width: 100%">
                            <el-table-column
                                    label="条目"
                                    width="205">
                                <template  slot-scope="scope">
                                    条目{{scope.$index+1}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="条目内容"
                                    width="935">
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="display">
                        <div style="font-weight: bold;font-size: 14px">量表值</div>
                    </div>
                    <div class="topic_box">
                        <el-table
                                border
                                :show-header='false'
                                :data="item.options"
                                style="width: 100%">
                            <el-table-column
                                    label="维度"
                                    prop="score"
                                    width="205">
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="题目名称"
                                    width="935">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <div class="zk1">
                    <div style="text-align: center" v-if="!zk1">
                        <div @click="zk1=true">展开</div>
                        <img src="../../../static/img/zhankai@4x.png" alt="" style="width: 12px;height: 7px">
                        <!--<span class="iconfont icon-sanjiaodown"></span>-->
                    </div>
                    <div style="text-align: center" v-if="zk1">
                        <div @click="zk1=false" v-if="zk1=true">收起</div>
                        <span class="iconfont icon-triangle-top"></span>
                    </div>
                </div>
            </div>
            <el-row ><el-col :span="24" style="margin-left: 70px;">索引与模型（共{{messageInfo.mould.length}}篇文章）</el-col></el-row>
            <div class="content_box">
                <div v-for="(mould,index) in messageInfo.mould" class="wai_mouldbox">
                    <div class="display">
                        <div>文章{{index+1}}</div>
                        <!--<el-button plain>导入到我的变量库</el-button>-->
                    </div>
                    <div class="mouldbox">
                        <div class="mouldbox_tit">
                            <div class="flex">
                                <div>文章名：</div>
                                <div>《{{mould.article_name}}》</div>
                            </div>
                        </div>
                        <div class="mouldbox_tit">
                            <div class="flex">
                                <div>作者：</div>
                                <div>《{{mould.article_author}}》</div>
                            </div>
                        </div>
                        <div style="display: flex;font-size: 14px">
                            <div style="min-width: 70px;font-weight: 600">索引信息：</div>
                            <div>{{mould.article_message}}</div>
                        </div>
                        <div class="sheji">
                            <div style="font-weight: 700;font-size: 14px;min-width: 70px">涉及变量：</div>
                            <div style="text-align: left">
                                <div v-for="(blname,index) in mould.var" style="color:#009E79;display: inline">
                                <span>
                                    {{blname.name}}（<span v-for="(blname_item,index) in blname.dis">{{blname_item.name}}<span v-if="index!=blname.dis.length-1">，</span></span>）<span v-if="index!=mould.var.length-1">，</span>
                                </span>
                                </div>
                            </div>
                        </div>
                        <div class="guanxi">
                            <div style="font-weight: 700;font-size: 14px;min-width: 70px">变量关系：</div>
                            <div style="text-align: left">
                                <div v-for="(relation,index)  in mould.rea" style="display: inline;">
                                    <span>{{relation.z_bl}}</span>
                                    <span v-if="relation.is_adjus==1">（{{relation.adjust}}）</span>
                                    <span v-if="relation.is_adjus==0">（无调节）</span>
                                    <span class="iconfont icon-jia2" v-if="relation.is_add==1"></span>
                                    <span class="iconfont icon-jian1" v-else="relation.is_add==0"></span>
                                    <span class="iconfont icon-jiantouarrow484"></span>
                                    <span>{{relation.y_bl}}</span><span  v-if="index!=mould.rea.length-1">，</span>
                                </div>
                            </div>
                        </div>
                        <div class="mouldbox_bot_box">
                            <div style="display: flex;font-size: 14px">
                                <div style="min-width: 70px;font-weight: 600">构念概述：</div>
                                <div>{{mould.article_content}}</div>
                            </div>
                            <div class="mouldbox_right">
                                <div class="img" :style="{backgroundImage: 'url(' +mould.img+ ')'}"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	export default {
		data(){
			return{
                messageInfo:{
                	id:"",
                    user_id:"",
                    name:"构念名称",
	                realm:"医疗",
	                title_type:"量表",
	                desc:"新华社北京1月31日电中共中央政治局1月30日下午就建设现代化经济体系进行第三次集体学习。中共中央总书记习近平在主持学习时强调，建设现代化经济体系是一篇大文章，既是一个重大理论命题，更是一个重大实践课题，需要从理论和实践的结合上进行深入探讨。建设现代化经济体系是我国发展的战略目标，也是转变经济发展方式、优化经济结构、转换经济增长动力的迫切要求。全党一定要深刻认识建设现代化经济体系的重要性和艰巨性，科学把握建设现代化经济体系的目标和重点，推动我国经济发展焕发新活力、迈上新台阶。",
	                article_name:"文章名",
	                article_author:"abc,bca,cma,askdj",
	                article_message:"A杂志2012-12P78-P89",
                    dis:[
                        {
	                        topics:[
		                        {
			                        id:"1",
			                        name:"题目"
		                        },
		                        {
			                        id:"1",
			                        name:"题目"
		                        },
	                        ],

	                        options:[
                                {
                                	id:"1",
                                    name:"选项1",
                                    score:"1",
                                },
		                        {
			                        id:"2",
			                        name:"选项2",
			                        score:"2",
		                        },
                            ],
                        },
	                    {
		                    topic:[
			                    {
				                    id:"1",
				                    name:"题目"
			                    },
			                    {
				                    id:"1",
				                    name:"题目"
			                    },
		                    ],

		                    options:[
			                    {
				                    id:"1",
				                    name:"选项1",
				                    score:"1",
			                    },
			                    {
				                    id:"2",
				                    name:"选项2",
				                    score:"2",
			                    },
		                    ],
	                    },
	                    {
		                    topic:[
			                    {
				                    id:"1",
				                    name:"题目"
			                    },
			                    {
				                    id:"1",
				                    name:"题目"
			                    },
		                    ],

		                    options:[
			                    {
				                    id:"1",
				                    name:"选项1",
				                    score:"1",
			                    },
			                    {
				                    id:"2",
				                    name:"选项2",
				                    score:"2",
			                    },
		                    ],
	                    },
	                    {
		                    topic:[
			                    {
				                    id:"1",
				                    name:"题目"
			                    },
			                    {
				                    id:"1",
				                    name:"题目"
			                    },
		                    ],

		                    options:[
			                    {
				                    id:"1",
				                    name:"选项1",
				                    score:"1",
			                    },
			                    {
				                    id:"2",
				                    name:"选项2",
				                    score:"2",
			                    },
		                    ],
	                    },
                    ],
                    mould:[
                        {
	                        article_name:"文章名称",
	                        article_author:"作者1",
	                        article_message:"检索信息",
	                        article_content:"新华社北京1月31日电中共中央政治局1月30日下午就建设现代化经济体系进行第三次集体学习。中共中央总书记习近平在主持中共中央总书记习近平在主持学习时强调，建设现代化经济体系是一篇大文章，既是一个重大理论命题，更是一个重大实践课题，",
                            img:"http://oxn1gy8g5.bkt.clouddn.com/IMG_1001.JPG",
                            var:[
                                {
                                	name:"构念名称",
	                                dis:[{name:"聪聪"}]
                                }
                            ],
                            rea:[
                                {
	                                z_bl:"自变量1",
	                                y_bl:"因变量1",
	                                is_add:"0",
	                                is_adjust:"1",
	                                adjust:""
                                }
                            ]
                        }
                    ]
                },
                zk1:false
            }
        },
        mounted(){
	        var id=this.$route.query.id
            this.getData(id)
        },
        methods:{
	        getData(id){
                var self=this
                self.$axios.get('getmine_fun_item_detail',{id:id},(res)=>{
                	console.log(res)
	                if(res.data.title_type==1){
		                res.data.title_type="量表"
	                }else if(res.data.title_type==2){
		                res.data.title_type="多选"
	                }else if(res.data.title_type==3){
		                res.data.title_type="单选"
	                }
                    self.messageInfo=res.data
                    // console.log(self.messageInfo.dis[0])
                })
            },
            back(){
		        // if (this.$route.query.type==4){
		        // 	if(this.$route.query.dir_id){
				 //        this.$router.push({path:"/mine_fun_item",query: {id:this.$route.query.dir_id}})
                //
			     //    }else {
				 //        this.$router.push({path:"/mine_fun_item",query: {type:0}})
                //
			     //    }
		        // }
                if(this.$route.query.dir_name){
	                this.$router.push({path:"/mine_fun_item",query: {id:this.$route.query.dir_id,name:this.$route.query.name}})
                }else {
	                this.$router.push({path:"/mine_fun_item",query: {type:0,name:this.$route.query.name}})
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
        margin-bottom: 20px;
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
    .content_box_summarize{
    }
    .line{
        height: 1px;
        background-color: #D8D8D8;;
        margin: 8px 0 16px;
    }
    .el-row{
        padding: 0 46px 0 24px;
    }
    .display{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
    }
    .topic_box{
        width: 1140px;
        margin: 20px auto;
    }
    .content_box_item{
        border-bottom: 1px solid #D8D8D8;
        padding: 15px 0;
    }
    .zk1{
        margin-top: 10px;
        font-size: 16px;
        color: #009E79;
        cursor: pointer;
        position: absolute;
        height: 50px;
        bottom: 0;
        left: 0 ;
        right: 0;
        background-color: #fff;
        z-index: 1;
        /*border-top: 1px solid #D8D8D8;*/
    }
    .maxhe{
        max-height: 890px!important;
        overflow: hidden;
    }
    .wai_mouldbox{
        border-bottom: 1px solid #D8D8D8;
        padding: 20px;
    }
    .mouldbox{
        border: 1px solid #D8D8D8;
        padding: 15px 20px;
        width: 1133px;
        margin: 22px auto 30px;
    }
    .sheji,.guanxi{
        display: flex;
        /*flex-wrap: wrap;*/
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        color: #343434;
        letter-spacing: 0;
        line-height: 26px;
        margin: 5px 0;
    }
    .mouldbox_tit{
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        color: #343434;
        letter-spacing: 0;
        line-height: 26px;
    }
    .mouldbox_left{
        padding-right: 20px;
        width: 60%;
        border-right: 1px solid #D8D8D8;
    }
    .mouldbox_right{
        width: 35%;
        padding: 8px 15px 15px 15px;
    }
    .mouldbox_right .img{
        height: 200px;
        background: url("http://oxn1gy8g5.bkt.clouddn.com/IMG_1001.JPG");
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
    }
    .mouldbox_bot_box{
        display: flex;
        justify-content: space-between;
    }
    .mouldbox_bot_box>div:nth-child(1){
        flex: 6;
    }
    .mouldbox_bot_box>div:nth-child(2){
        flex: 4;
    }
    .flex{
        display: flex;
        font-size: 14px;
    }
    .flex>div:nth-child(1){
        font-weight: 600;
        min-width: 70px;
    }
</style>