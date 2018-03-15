<template>
    <div id="mine_model_detail">
        <div class="wai_box">
            <div class="back_box">
                <div class="back" @click="routeBack"><img src="../../../static/img/back@3x.png" alt="" style="width: 7px;
height: 12px"></div>
            </div>
            <el-row><el-col :span="2" style="margin: 15px 0 15px 71px">模型概述</el-col></el-row>
            <div class="content_box">
                <div class="content_msg">
                    <div class="mouldbox_tit">
                        <span :span="4">文章名：《{{tableData.article_name}}》</span>
                        <span :span="6" style="margin: 0 30px">作者：{{tableData.article_author}}</span>
                        <span :span="6">索引信息：{{tableData.article_message}}</span>
                    </div>
                    <div class="sheji">
                        <div>涉及变量：</div>
                        <!--<div v-for="(blname,index) in tableData.var" style="color:#009E79;cursor: pointer" @click="toFun(index)">-->
                                <!--<span>-->
                                    <!--{{blname.name}}（<span v-for="(blname_item,index) in blname.dis">{{blname_item.name}}<span v-if="index!=blname.dis.length-1">，</span></span>）<span v-if="index!=tableData.var.length-1">，</span>-->
                                <!--</span>-->
                        <!--</div>-->
                        <a :href="baseURL+'#/terrace_fun_item_detail?id='+tableData.var[index].id+'&&type=3&&ids='+$route.query.id" v-for="(blname,index) in tableData.var" style="color:#009E79;cursor: pointer" target="_Blank">
                            <span>
                                    {{blname.name}}（<span v-for="(blname_item,index) in blname.dis">{{blname_item.name}}<span v-if="index!=blname.dis.length-1">，</span></span>）<span v-if="index!=tableData.var.length-1">，</span>
                                </span>
                        </a>
                    </div>
                    <div class="guanxi">
                        <div>变量关系：</div>
                        <div v-for="(relation,index)  in tableData.rea">
                            <span>{{relation.z_bl}}</span>
                            <span>
                                <span v-if="relation.is_adjust==1">{{'（'+relation.adjust+'）'}}</span>
                                <span v-else>（无调节）</span>
                            </span>
                            <span class="iconfont icon-jia2" v-if="relation.is_add==1"></span>
                            <span class="iconfont icon-jian1" v-else="relation.is_add==0"></span>
                            <span class="iconfont icon-jiantouarrow484"></span>
                            <span>{{relation.y_bl}}</span><span  v-if="index!=tableData.rea.length-1">，</span>
                        </div>
                    </div>
                    <div class="mouldbox_bot_box">
                        <div class="mouldbox_left">
                            <el-row style="padding: 0">
                                <el-col :span="2">概述：</el-col>
                                <el-col :span="20" style="margin-left: 18px">{{tableData.article_content}}</el-col>
                            </el-row>
                        </div>
                        <div class="mouldbox_right">
                            <div class="img" :style="{backgroundImage: 'url(' +tableData.img+ ')'}"></div>
                        </div>
                    </div>
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
				tableData:{
					article_name:"",
					article_author:"",
					article_message:"",
					img:"",
					var:[
						{
							name:"",
							dis:[
								{name:""}
							]
						}
					],
					rea:[
						{
							z_bl:"",
							y_bl:"",
							is_add:"0",
							is_adjust:"0",
							adjust:""
						}
					]
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
				self.$axios.get('getmodel_msg',{id:id},(res)=>{
					self.tableData=res.data
				})
			},
			routeBack(){
				var self=this
				var key_words=this.$route.query.key_words;
				debugger;
                if(this.$route.query.type==1){
	                this.$router.push({path:"/science",query: {status:1}})
                }else if(this.$route.query.type==2){
					this.$router.push({path:"/terrace_search_model",query: {status:1}})
				}else {
	                this.$router.push({path:"/terrace_search_model", query: {key_words:key_words}})
                }
            },
			toFun(index){
                var self=this
                var id=self.tableData.var[index].id
				self.$router.push({path:"/terrace_fun_item_detail",query: {id:id,type:3,ids:this.$route.query.id}})
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
        border-bottom: 1px solid #C5C5C5;
    }
    .back{
        background: #FFFFFF;
        border: 2px solid #C5C5C5;
        border-radius: 6px;
        width: 32px;
        height: 32px;
        text-align: center;
        margin-right: 10px;
        margin-left: 20px;
        margin-bottom: 15px;
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
    .content_msg{
        padding: 20px;
    }
    .mouldbox_tit{
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        color: #343434;
        letter-spacing: 0;
        line-height: 26px;
    }
    .sheji,.guanxi{
        display: flex;
        flex-wrap: wrap;
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        color: #343434;
        letter-spacing: 0;
        line-height: 26px;
        margin: 5px 0;
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
        background-size: cover;
    }
    .mouldbox_bot_box{
        display: flex;
    }
</style>