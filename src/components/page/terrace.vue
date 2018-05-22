<template>
    <div id="terrace ">
        <!--<div class="creat">-->
            <!--<div class="creat_button" @click="$router.push('/creat_fun')">新建变量</div>-->
        <!--</div>-->
        <div class="content_box">
            <div class="logoimg"><img src="../../../static/img/logoimg.jpg" alt=""></div>
            <div class="tit">
                <div>{{wen}}</div>
                <div>篇顶级学术文献收录在库</div>
            </div>
            <div class="search_box">
                <div class="input display" >
                    <span class="iconfont icon-fangdajing"></span>
                    <input type="text" placeholder="输入您想搜索的内容" v-model="input" style="background-color: #fff">
                </div>
                <div class="fun">
                    <el-select v-model="searchValue" placeholder="请选择" class="sar">

                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"

                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="search_btn" @click="search"><div>搜索</div></div>

                <!--<div class="creat_fun"  @click="$router.push({path:'/creat_fun'})"><span>+</span><span>新建变量</span></div>-->
            </div>
        </div>
    </div>
</template>

<script>
	export default {
		data(){
			return{
				wen:"",
				input:"",
				options:[
                    {
	                    label:"搜模型",
	                    value:1,
                    },
					{
						label:"搜变量",
						value:2,
					}
                ],
                searchValue:2
            }
        },
		mounted(){
			this.getnum();
            this.wen=localStorage.getItem('num')
            this.wen=parseFloat(this.wen).toLocaleString()
        },
        methods:{
	        search(){
	        	var self=this
	        	if (self.input==""&&self.searchValue==""){
			        this.$message({
				        message: '请输入搜索内容',
				        type: 'warning'
			        });
	        		return
                }else if (self.input==""&&self.searchValue!==""){
	        		if (self.searchValue==1){
				        self.$axios.get('terrace_search_model',{key_words:""},(res)=>{
					        if (res.ret){
						        self.$router.push({path:"/terrace_search_model", query: {key_words:self.input}})
					        }
				        })
                    }else if (self.searchValue==2){
				        self.$axios.get('terrace_search_get',{key_words:""},(res)=>{
					        if (res.ret){
						        self.$router.push({path:"/terrace_search_fun", query: {key_words:self.input}})
					        }
				        })
                    }
                }
                else if (self.input!=""&&self.searchValue==""){
			        this.$message({
				        message: '请选择搜索类型',
				        type: 'warning'
			        });
                } else {
	        		if (self.searchValue==1){
				        self.$axios.get('terrace_search_model',{key_words:self.input},(res)=>{
					        if (res.ret){
						        self.$router.push({path:"/terrace_search_model", query: {key_words:self.input}})
					        }
					        console.log(res)
				        })
                    }else if(self.searchValue==2){
				        self.$axios.get('terrace_search_get',{key_words:self.input},(res)=>{
					        if (res.ret){
						        self.$router.push({path:"/terrace_search_fun", query: {key_words:self.input}})
					        }
					        console.log(res)
				        })
                    }
                }
            },
            getnum(){
	        	var self=this
                self.$axios.get('getzong',{},(res)=>{
                	self.wen=res.data
                })
            }
        }
	}
</script>

<style scoped>
    .creat{
        display: flex;
        justify-content: flex-end;
    }
    .creat_button{
        width: 159px;
        height: 30px;
        border: 1px solid rgba(255, 255, 255, 1);
        border-radius: 4px;
        background-color: rgba(26, 179, 148, 1);
        color: rgba(255, 255, 255, 1);
        font-size: 14px;
        text-align: center;
        line-height: 30px;
        margin-top: 31px;
        cursor: pointer;
    }
    .content_box{
        max-width: 1095px;
        height: 585px;
        line-height: 20px;
        border: 1px solid rgba(255, 255, 255, 1);
        border-radius: 5px;
        box-shadow: 0px 0px 5px 0px rgba(207, 207, 207, 1);
        background-color: #fff;
        /*margin-top: 56px au;*/
        background: url("../../../static/img/WechatIMG116.png");
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        margin: 56px auto 0;
    }
    .logoimg{
        width: 426px;
        height: 107px;
        display: flex;
        align-items: center;
        margin: 139px auto 51px;
    }
    .logoimg>img{
        display: block;
        margin: 0 auto;
    }
    .tit{
        display: flex;
        justify-content: center;
        line-height: 26px;
        color: rgba(16, 16, 16, 1);
        font-size: 18px;
        font-family: Roboto;
        text-align: center;
        margin: 50px 0 50px;
    }
    .tit>div:nth-child(1){
        font-family: DINCondensed-Bold;
        font-size: 42px;
        color: #00A580;
        letter-spacing: 1.4px;
        line-height: 26px;
    }
    .tit>div:nth-child(2){
        margin-left: 5px;
        font-size: 24px;
        color: #00A580;
        letter-spacing: 0;
        line-height: 26px;
    }
    .search_box{
        margin: 43px auto 0;
        display: flex;
        align-items: center;
    }
    .input{
        width: 447px;
        height: 42px;
        line-height: 20px;
        border: 1px solid rgba(255, 255, 255, 1);
        border-radius: 6px 0 0 6px;
        background-color: rgba(247, 247, 247, 1);
        color: rgba(207, 207, 207, 1);
        font-size: 14px;
        box-shadow: 0px 0px 2px 0px rgba(193, 193, 193, 1);
        font-family: Roboto;
        padding: 5px 16px;
        margin-left: 96px;
        background-color: #fff;
    }
    .input>input{
        border: 0;
        outline: 0;
        width: 80%;
        height: 100%;
        background-color: rgba(247, 247, 247, 1);
    }
    .input>span{
        font-size: 18px;
        color: #000;
        background-color: rgba(247, 247, 247, 1);
        margin-right: 10px;
    }
    .fun select{
        border-radius: 5px;
        padding: .4rem .6rem;
        width: 110px;
        /*height: 55px;*/
        line-height: 26px;
        border: 1px solid rgba(247, 247, 247, 1);
        color: rgba(16, 16, 16, 1);
        font-size: 18px;
        background-color: #fff;
        text-align: center;
        font-family: Microsoft Yahei;
        outline: 0;
    }
    .fun select option{
        outline: 0;
    }
    .search_btn{

        background-image: linear-gradient(-180deg, #00BF93 4%, #1C9A7E 98%);
        width: 108px;
        height: 50px;
        line-height: 50px;
        color: #fff;
        border-radius: 6px;
        text-align: center;
        margin-left: 14px;
        cursor: pointer;
    }
    .search_btn:hover{
        background-image: linear-gradient(-180deg, #01D9A7 4%, #25B293 98%);
    }
    .fun{
        width: 120px;
        /*height: 60px;*/
    }
    .el-input,.el-input--suffix input{
        height: 60px;
    }
    .el-input__inner{
        height: 100%;
    }
    .creat_fun{
        width: 140px;
        height: 50px;
        line-height: 50px;
        margin-left: 40px;
        text-align: center;
        border: 1px solid #009E79;
        border-radius: 6px;
        font-size: 18px;
        color: #009E79;
        letter-spacing: 0;
        cursor: pointer;
    }
    .creat_fun:hover{
        color: #00C597;
        border-color: #00C597;
    }
    .creat_fun>span:nth-child(1){
        font-weight: 700;
        font-size: 20px;
        margin-right: 12px;
    }
</style>