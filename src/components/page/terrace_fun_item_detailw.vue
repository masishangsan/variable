<template>
    <div id="mine_fun_item_detail">
        <div class="wai_box">
            <div class="back_box">
                <div class="back" @click="getBack"><span class="iconfont icon-fanhui"></span></div>
                <div>维度</div>
            </div>
            <el-row ><el-col :span="24" style="margin-left: 70px;">概念描述</el-col></el-row>
            <div class="content_box content_box_summarize">
                <el-row style="margin-bottom: 10px">
                    <el-col :span="4" >构念名：{{messageInfo.name}}</el-col>
                    <el-col :span="4" >领域：{{messageInfo.realm}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="1">概述：</el-col>
                    <el-col :span="22" style="margin-left: 18px">{{messageInfo.desc}}</el-col>
                </el-row>
                <div class="line"></div>
                <el-row><el-col :span="4" style="margin-bottom: 20px">原始文献</el-col></el-row>
                <el-row>
                    <el-col :span="4" style="margin-right: 20px">文章名： 《{{messageInfo.article_name}}》</el-col>
                    <el-col :span="6" style="margin-right: 20px">作者：{{messageInfo.article_author}}</el-col>
                    <el-col :span="6" style="margin-right: 20px">索引信息：{{messageInfo.article_message}}</el-col>
                </el-row>
            </div>
            <el-row ><el-col :span="24" style="margin-left: 70px;">维度详情</el-col></el-row>
            <div class="content_box" >
                <div class="content_box_item">
                    <el-row><el-col :span="2">维度1</el-col></el-row>
                    <div class="display">
                        <div>类型：{{messageInfo.title_type}}</div>
                        <!--<el-button plain style="border: 1px solid  #009E79;color: #009E79">导入到我的变量</el-button>-->
                    </div>
                    <div class="topic_box">
                        <el-table
                                border
                                :data="messageInfo.topics"
                                style="width: 100%">
                            <el-table-column
                                    label="维度"
                                    width="205">
                                <template  slot-scope="scope">
                                    条目{{scope.$index+1}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="领导关注"
                                    width="935">
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="display">
                        <div>量表值</div>
                    </div>
                    <div class="topic_box">
                        <el-table
                                border
                                :show-header='false'
                                :data="messageInfo.options"
                                style="width: 100%">
                            <el-table-column
                                    label="维度"
                                    prop="score"
                                    width="205">
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="领导关注"
                                    width="935">
                            </el-table-column>
                        </el-table>
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
				}
			}
		},
		mounted(){
			var id=this.$route.query.id
			this.getData(id)
		},
		methods:{
			getData(id){
				var self=this
				self.$axios.post('getmine_fun_item_detailw',{id:id},(res)=>{
					console.log(res)
					if(res.data.title_type==1){
						res.data.title_type="量表"
					}else if(res.data.title_type==2){
						res.data.title_type="多选"
					}else if(res.data.title_type==3){
						res.data.title_type="单选"
					}
					self.messageInfo=res.data
				})
			},
			getBack(){
				var key_words=this.$route.query.key_words;
				if (this.$route.query.type==1){
					this.$router.push({path:"/mine_fun_item", query: {key_words:key_words}})
                }else {
					this.$router.push({path:"/terrace_search_fun", query: {key_words:key_words}})
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
        ont-family: .AppleSystemUIFont;
        font-size: 16px;
        color: #343434;
        letter-spacing: 0;
        line-height: 26px;
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
</style>