<template>
    <div id="#science">
        <div class="wai_box">
            <div class="content_box">
                <div class="nei_box">
                    <div class="nei_box_left">
                        <img src="../../../static/img/xueshu.png" alt="">
                    </div>
                    <div class="nei_box_right">
                        <el-row style="align-items: center;display: flex">
                            <el-col :span="2" style="margin-right: 20px">X=</el-col>
                            <el-col :span="12"><el-input v-model="form.X"></el-input></el-col>
                        </el-row>
                        <el-row style="align-items: center;display: flex;margin-top: 10px">
                            <el-col :span="2" style="margin-right: 20px">M=</el-col>
                            <el-col :span="12"><el-input v-model="form.M"></el-input></el-col>
                        </el-row>
                        <el-row style="align-items: center;display: flex;margin-top: 10px">
                            <el-col :span="2" style="margin-right: 20px">Y=</el-col>
                            <el-col :span="12"><el-input v-model="form.Y"></el-input></el-col>
                        </el-row>
                        <div class="tip" v-if="form.X==''&&form.Y==''&&form.M==''">请至少输入一个变量</div>
                    </div>
                </div>
            </div>
            <el-row style="padding: 10px 72px"><el-col :span="4">必要逻辑关系</el-col></el-row>
            <div class="content_box">
                <el-checkbox-group v-model="form.type" style="padding: 20px 60px">
                    <el-checkbox label="1" name="type">X<span class="iconfont icon-jiantouarrow484"></span>M</el-checkbox>
                    <el-checkbox label="2" name="type">M<span class="iconfont icon-jiantouarrow484"></span>Y</el-checkbox>
                    <el-checkbox label="3" name="type">X<span class="iconfont icon-jiantouarrow484"></span>Y</el-checkbox>
                </el-checkbox-group>
            </div>
            <div class="nc_btn" @click="search">探索</div>
        </div>
        <div class="wai_box" v-if="tableData.length>0">
            <el-row style="padding: 10px 72px"><el-col :span="4">探索结果</el-col></el-row>
            <div class="content_box">
                <div class="jieguo"><span>共探索到{{tiao}}个潜在结果</span></div>
                <div v-for="(item,index) in tableData" style="border-bottom: 1px solid #d8d8d8;padding: 20px 0">
                    <div class="tit">
                        <div><span>X:</span><span>{{tableData[index].rea[0]}}</span></div>
                        <div><span>M:</span><span>{{tableData[index].rea[1]}}</span></div>
                        <div><span>Y:</span><span>{{tableData[index].rea[2]}}</span></div>
                    </div>
                    <div class="oneBox">
                        <div>X<img src="../../../static/img/black_jiantou@4x.png" alt="" style="width: 14px; height: 11px;margin: 0 5px">M</div>
                        <div class="dBox">
                            <div class="linesOne" v-for="(one,index1) in item.ones" v-show="one.isShow">
                                <div class="name" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
                                    <span style="font-weight: bold">文章名称：</span>
                                    <a :href="baseURL+'#/terrace_model_detail?id='+tableData[index].ones[index1].id+'&&type=1'" style="color: #252525"  @click="tode_X(index,index1)" target="_Blank">《{{one.article_name}}》</a>
                                    <!--<span style="cursor: pointer">《{{one.article_name}}》</span>-->
                                    <span v-if="index1==0"  @click="visibleToggle(index, item.ones)">
                                        共{{item.ones.length}}篇
                                        <span v-if="!one.select"  @click="tableData[index].ones[index1].select=true"><img src="../../../static/img/down@2x.png" alt="" style="width: 10px;height: 10px"></span>
                                        <span v-if="one.select" @click="tableData[index].ones[index1].select=false"><img src="../../../static/img/up@2x.png" alt="" style="width: 10px;height: 10px"></span>
                                    </span>
                                </div>
                                <div class="msg"> <span style="font-weight: bold">索引信息：</span> {{one.article_message}}</div>
                                <div class="bian">
                                    <span style="font-weight: bold">涉及变量（{{one.num}}个）：</span>
                                    <span>{{one.var_name}}</span>
                                </div>
                            </div>
                            <div v-if="item.ones.length<1" style="line-height: 20px;margin-left: 25px">无文献支持</div>
                        </div>
                    </div>
                    <div class="twoBox">
                        <div>M<img src="../../../static/img/black_jiantou@4x.png" alt="" style="width: 14px; height: 11px;margin: 0 5px">Y</div>
                        <div class="dBox">
                            <div class="linesOne" v-for="(two,index1) in item.twos" v-show="two.isShow">
                                <div class="name" >
                                    <span style="font-weight: bold">文章名称：</span>
                                    <a :href="baseURL+'#/terrace_model_detail?id='+tableData[index].twos[index1].id+'&&type=1'" style="color: #252525"  @click="tode_Y(index,index1)" target="_Blank">《{{two.article_name}}》</a>
                                    <!--<span style="cursor: pointer" @click="tode_Y(index,index1)">《{{two.article_name}}》</span>-->
                                    <span v-if="index1==0" @click="visibleToggle(index, item.twos)">
                                        共{{item.twos.length}}篇
                                        <span v-if="!two.select"  @click="tableData[index].twos[index1].select=true"><img src="../../../static/img/down@2x.png" alt="" style="width: 10px;height: 10px"></span>
                                        <span v-if="two.select" @click="tableData[index].twos[index1].select=false"><img src="../../../static/img/up@2x.png" alt="" style="width: 10px;height: 10px"></span>
                                    </span>
                                </div>
                                <div class="msg"><span style="font-weight: bold">索引信息：</span>{{two.article_message}}</div>
                                <div class="bian">
                                    <span style="font-weight: bold">涉及变量（{{two.num}}个）：</span>
                                    <span>{{two.var_name}}</span>
                                </div>
                            </div>
                            <div v-if="item.twos.length<1" style="line-height: 20px;margin-left: 25px">无文献支持</div>
                        </div>
                    </div>
                    <div class="threeBox">
                        <div>X<img src="../../../static/img/black_jiantou@4x.png" alt="" style="width: 14px; height: 11px;margin: 0 5px">Y</div>
                        <div class="dBox">
                            <div class="linesOne" v-for="(three,index1) in item.threes" v-show="three.isShow">
                                <div class="name" >
                                    <span style="font-weight: bold">文章名称：</span>
                                    <a :href="baseURL+'#/terrace_model_detail?id='+tableData[index].threes[index1].id+'&&type=1'" style="color: #252525"  @click="tode_M(index,index1)" target="_Blank">《{{three.article_name}}》</a>
                                    <!--<span style="cursor: pointer" @click="tode_M(index,index1)">《{{three.article_name}}》</span>-->
                                    <span v-if="index1==0" @click="visibleToggle(index, item.threes)">
                                        共{{item.threes.length}}篇
                                        <span v-if="!three.select"  @click="tableData[index].threes[index1].select=true"><img src="../../../static/img/down@2x.png" alt="" style="width: 10px;height: 10px"></span>
                                        <span v-if="three.select" @click="tableData[index].threes[index1].select=false"><img src="../../../static/img/up@2x.png" alt="" style="width: 10px;height: 10px"></span>
                                    </span>
                                </div>
                                <div class="msg"><span style="font-weight: bold">索引信息：</span>{{three.article_message}}</div>
                                <div class="bian">
                                    <span style="font-weight: bold">涉及变量（{{three.num}}个）：</span>
                                    <span>{{three.var_name}}</span>
                                </div>
                            </div>
                            <div v-if="item.threes.length<1" style="line-height: 20px;margin-left: 25px">无文献支持</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="fenye_wai">
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
        <div class="wai_box" v-if="tableData.length<1&&noneX">
            <div style="font-weight: 700;font-size: 26px;text-align: center;color: #8c939d;line-height: 200px">暂无模型支持</div>
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
				form:{
					X:"",
                    Y:"",
                    M:"",
					type:[]
				},
                tableData:[

                ],
                pages:"",
                noneX:false,
                tiao:""
            }
        },
        mounted(){
            if(this.$route.query.status==1){
            	var self=this;
            	this.form=JSON.parse(localStorage.getItem('form'))
	            self.$axios.post('xueshu',{keys_one:self.form.X, keys_two:self.form.Y,keys_three:self.form.M,type:self.form.type,page:1},(res)=>{
		            console.log(res)
		            if (res.ret){
			            self.pages=res.msg/10;
			            self.tiao=res.msg
			            self.noneX=true
			            res.data.forEach(function (item) {
				            item.ones.forEach(function (item1) {
					            item1.isShow=true
				            })
				            item.twos.forEach(function (item1) {
					            item1.isShow=true
				            })
				            item.threes.forEach(function (item1) {
					            item1.isShow=true
				            })
			            })
			            self.tableData=res.data
		            }
	            })
                localStorage.removeItem('form')
            }
        },
        methods:{
	        visibleToggle(index, row){
		        row.forEach((item, key)=>{
		        	if (key > 0) {
		        		item.isShow = !item.isShow;
                    }
                })
            },
	        search(){
                var self=this;
                if (self.form.X==""&&self.form.Y==""&&self.form.M==""){
	        		return
                }else if(self.form.type==[]){
                	return
                }else {
                	self.$axios.post('xueshu',{keys_one:self.form.X, keys_two:self.form.M,keys_three:self.form.Y,type:self.form.type,page:1},(res)=>{
                		console.log(res)
                        if (res.ret){
	                        self.pages=res.msg/10;
	                        self.tiao=res.msg
	                        self.noneX=true
	                        res.data.forEach(function (item) {
		                        item.ones.forEach(function (item1) {
			                        item1.isShow=true
		                        })
		                        item.twos.forEach(function (item1) {
			                        item1.isShow=true
		                        })
		                        item.threes.forEach(function (item1) {
			                        item1.isShow=true
		                        })
	                        })
	                        self.tableData=res.data
                        }
                    })
                }
            },
	        Onela(index,index1){
	        	this.tableData[index].one[index1].select=true
            },
	        Oneshou(index,index1){

            },
	        handleCurrentChange(val){
		        var key_words=this.$route.query.key_words
		        var self=this;
		        self.$axios.post('xueshu',{page:val,keys_one:self.form.X, keys_two:self.form.Y,keys_three:self.form.M,type:self.form.type},(res)=>{
			        console.log(res)
			        if (res.ret){
				        self.pages=res.msg/10;
				        self.noneX=true
				        self.tiao=res.msg
                        console.log(res.data);
				        res.data.forEach(function (item) {
					        item.ones.forEach(function (item1) {
						        item1.isShow=true
					        })
					        item.twos.forEach(function (item1) {
						        item1.isShow=true
					        })
					        item.threes.forEach(function (item1) {
						        item1.isShow=true
					        })
				        })
				        self.tableData=res.data
			        }
		        })
	        },
	        tode_X(index,index1){
	        	var self=this
                // var id=self.tableData[index].ones[index1].id
                // console.log(id)
                localStorage.setItem('form',JSON.stringify(self.form));
		        // this.$router.push({path:"/terrace_model_detail", query: {id:id,type:1}})
            },
	        tode_Y(index,index1){
		        var self=this
		        // var id=self.tableData[index].twos[index1].id
		        // console.log(id)
		        localStorage.setItem('form',JSON.stringify(self.form));
		        // this.$router.push({path:"/terrace_model_detail", query: {id:id,type:1}})
	        },
	        tode_M(index,index1){
		        var self=this
		        // var id=self.tableData[index].threes[index1].id
		        // console.log(id)
		        localStorage.setItem('form',JSON.stringify(self.form));
		        // this.$router.push({path:"/terrace_model_detail", query: {id:id,type:1}})
	        },
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
        /*padding: 27px 44px;*/
        padding: 27px 0;
        max-width: 1227px;
        margin: 10px auto;
    }
    .nei_box{
        width: 95%;
        height: 304px;
        border: 1px solid #D8D8D8;
        margin: 0 auto;
        display: flex;
    }
    .nei_box_left{
        /*width: 70%;*/
        /*height: 100%;*/
        flex: 7;
        border-right: 1px solid #D8D8D8;
    }
    .nei_box_right{
        flex: 3;
        /*height: 100%;*/
        padding: 100px 70px 52px;
    }
    .tip{
        font-size: 14px;
        color: #EA463E;
        letter-spacing: 0;
        line-height: 26px;
    }
    .nc_btn{
        width: 90px;
        height: 40px;
        line-height: 40px;
        margin-left: 70px;
        cursor: pointer;
    }
    .nei_box_left img{
        width: 514px;
        height: 236px;
        display: block;
        margin: 20px auto;
    }
    .jieguo{
        border-bottom:1px solid #D8D8D8;
        font-size: 14px;
        color: #737373;
        letter-spacing: 0;
        line-height: 26px;
    }
    .jieguo span{
        margin-left: 20px;
        margin-bottom: 10px;
    }
    .tit{
        display: flex;
        margin-left: 20px;
    }
    .tit>div:nth-child(2){
        margin: 0 40px;
    }
    .tit>div{
        font-size: 14px;
        color: #737373;
        letter-spacing: 0;
        line-height: 26px;
    }
    .oneBox,.twoBox,.threeBox{
        display: flex;
        padding: 0 20px;
        margin-top: 40px;
    }
    .oneBox .dBox .linesOne:nth-child(2) .msg,.oneBox .dBox .linesOne:nth-child(3) .msg,.twoBox .dBox .linesOne:nth-child(2) .msg,.threeBox .dBox .linesOne:nth-child(3) .msg{
        /*margin-left: 146px;*/
    }
    .dBox{
        width: 100%;
    }
    .linesOne{
        display: flex;
        justify-content: space-around;
    }
    .name,.msg{
        /*margin: 0 40px;*/
    }
    .name{
        width: 220px;
        margin-left: 20px;
        flex: 1;
    }
    .msg{
        /*margin-left: 120px;*/
        /*margin-right: 100px;*/
        width: 281px;
        line-height: 20px;
        color: rgba(16, 16, 16, 1);
        font-size: 14px;
        text-align: left;
        font-family: Roboto;
        /*margin: 0 60px!important;*/
        flex: 1;
    }
    .bian{
        font-size: 14px;
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 371px;
    }
    .fenye{
        padding: 15px 0 0;
        /*padding: 20px 55px;*/
    }
    .fenye_wai{
        display: flex;
        justify-content: space-between;
        padding: 10px 55px;
        align-items: center;
    }
    .oneBox>div:nth-child(1),.twoBox>div:nth-child(1),.threeBox>div:nth-child(1){
        min-width: 50px;
    }
    .name,.msg{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 14px;
    }
</style>