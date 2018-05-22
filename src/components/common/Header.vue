<template>
    <div id="Header">
        <div class="head">
            <div class="head_left display">
                <div class="logo" @click="roots" style="cursor: pointer"><img src="../../../static/img/logo3.png" alt=""></div>
                <el-menu mode="horizontal" active-text-color="#009688" router :default-active="$route.meta.menu" index="science">
                    <el-menu-item index="science">模型探索</el-menu-item>
                    <el-menu-item index="terrace">平台数据库</el-menu-item>
                    <el-menu-item index="mine_fun">我的变量库</el-menu-item>
                    <el-menu-item index="mine_model">我的模型库</el-menu-item>
                    <!--<el-menu-item index="creat_model">创建模型</el-menu-item>-->
                </el-menu>
            </div>
            <div class="head_right display">
                <span class="iconfont icon-my"></span>
                <div class="user display">
                    <div class="user_nmae">{{username}}</div>
                    <!--<div v-popover:popover5><span class="iconfont icon-sanjiaodown"></span></div>-->
                    <el-popover
                            ref="popover5"
                            placement="top"
                            width="160"
                            v-model="visible2">
                        <p>确定退出登录?</p>
                        <div style="text-align: right; margin: 0">
                            <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
                            <el-button type="primary" size="mini" @click="tuis">确定</el-button>
                        </div>
                    </el-popover>
                    <el-button v-popover:popover5 style="background-color: #3c3c3c;border: 0;color: #ccc">退出登录</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	export default {
		data(){
			return{
                username:"诸葛泽东",
				visible2:false
            }
        },
        mounted(){
			this.username=localStorage.getItem('name')

        },
        methods:{
	        tuis(){
		        var self=this
		        self.$axios.post('tuiLogin',{},(res)=>{
		        	if(res.ret){
		               this.$message({
		                   message: '已成功退出',
		                   type: 'success'
		               });
		               self.$router.push({path:'/logins'})
		            }
		        })
            },
	        roots(){
	        	this.$router.push({path:'/terrace'})
            }
        },
	}
</script>

<style scoped>
    .display{
        display: flex;
        align-items: center;
    }
    .head{

    }
    .head{
        display: flex;
        align-items: center;
        padding: 0 17px;
        height: 60px;
        background: #3C3C3C;
        box-shadow: 0 2px 6px 0 rgba(0,0,0,0.36);
        border-bottom: 1px solid rgba(187, 187, 187, 1);
        justify-content: space-between;
        font-family: .PingFang-SC-Medium;
        font-size: 16px;
        color: #FFFFFF;
        letter-spacing: 0;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 999;
    }
    .logo{
        width: 172px;
        height: 60px;
        background: #3C3C3C;
        box-shadow: 4px 0 6px 0 rgba(25,25,25,0.74);
    }
    .logo img{
        width: 152px;
        height: 42px;
        /*margin-right: 104px;*/
        margin-top: 10px;
    }
    ul{
        border-bottom: 0!important;
        background: #3C3C3C;
        color: #FFFFFF;
    }
    li{
        color: #FFFFFF!important;
    }
    li:hover{
        background: #3C3C3C!important;
        color: #FFFFFF!important;
    }
    li:active{
        background: #3C3C3C!important;
    }
    .head_right{
        margin-right: 43px;
    }
    .head_right .user_nmae{
        margin: 0 2px 0 7px;
    }
    .is-active{
        background: #3C3C3C!important;
    }
</style>