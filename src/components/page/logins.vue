<template>
    <div id="logins">
        <div class="wais_box">
            <div class="left">
                <div class="content_box">
                    <div class="logo"><img src="../../../static/img/logoimg.jpg" alt=""></div>
                    <div class="tab_box">
                        <div class="tab" :class="tab?'':'on'" @click="tab=!tab">
                            登陆
                        </div>
                        <div class="tab" :class="tab?'on':''" @click="tab=!tab">
                            注册
                        </div>
                    </div>
                    <div class="login_box" v-if="!tab">
                        <div class="warn" v-if="msgL!=''">
                            <img src="../../../static/img/Shape@3x.png" alt="" >
                            <div>{{msgL}}</div>
                        </div>
                        <div class="inp_box">
                            <img src="../../../static/img/youxiang@3x.png" alt="" >
                            <input type="email" placeholder="登陆邮箱" @input="emailL" v-model="form_L.email">
                        </div>
                        <div class="inp_box">
                            <img src="../../../static/img/mima@3x.png" alt="" style="width: 16px;height: 21px">
                            <input type="email" placeholder="登陆密码"  v-model="form_L.passward" style="width: 80%" :type="this.form_Z.pwdType">
                            <img :src="this.form_Z.src" alt="" style="width: 22px;height: 19px;cursor: pointer" @click="changeType">
                        </div>
                        <div class="btn" @click="loginTo">立即登陆</div>
                    </div>
                    <div class="login_box" v-if="tab==true">
                        <div class="warn" v-if="msg!=''">
                            <img src="../../../static/img/Shape@3x.png" alt="" >
                            <div>{{msg}}</div>
                        </div>
                        <div class="inp_box">
                            <img src="../../../static/img/youxiang@3x.png" alt="" >
                            <input type="email" placeholder="登陆邮箱" @input="emails" v-model="form_Z.email">
                        </div>
                        <div class="inp_box">
                            <img src="../../../static/img/ni.png" alt="" style="width: 20px;height: 20px;margin-right: 15px">
                            <input type="email" placeholder="昵称" v-model="form_Z.name" style="width: 80%">
                        </div>
                        <div class="inp_box">
                            <img src="../../../static/img/mima@3x.png" alt="" style="width: 16px;height: 21px">
                            <input type="email" placeholder="设置密码" @input="psw" v-model="form_Z.passward" style="width: 80%" :type="this.form_Z.pwdType">
                            <img :src="this.form_Z.src" alt="" style="width: 22px;height: 19px;cursor: pointer" @click="changeType">
                        </div>
                        <div class="inp_box">
                            <img src="../../../static/img/mima@3x.png" alt="" style="width: 16px;height: 21px">
                            <input type="email" placeholder="确认密码" @input="pswC" v-model="form_Z.confirm" style="width: 80%" :type="this.form_Z.pwdType">
                            <img :src="this.form_Z.src" alt="" style="width: 22px;height: 19px;cursor: pointer" @click="changeType">
                        </div>
                        <div class="tip"><p>密码必须包含有大小写字母、数字、符号，密码长度为6-20个字符</p></div>
                        <div class="btn" @click="save">立即注册</div>
                        <el-checkbox  name="type" v-model="isDisabled"><span class="xieyi">我已阅读并同意 <span>《SURVEY BOX用户协议》</span></span></el-checkbox>
                    </div>
                    <div class="bei"><p>Copyright © 2018 SURVEY BOX 北京思维盒科技有限公司 京ICP备 12000008</p></div>
                </div>
            </div>
            <div class="right"></div>
        </div>
    </div>
</template>

<script>
	export default {
		data(){
			return{
                tab:false,
                msg:"",
                msgL:"",
                form_Z:{
                	email:'',
                    passward:'',
                    src:require("../../../static/img/yincangmima@3x.png"),
	                pwdType:"password",
	                confirm:"",
                    name:""
                },
                form_L:{
                    email:"",
	                passward:""
                },
				isDisabled:true
            }
        },
        mounted(){

        },
        methods:{
	        emails(){
		        var regEmail=/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
		        if(!regEmail.test(this.form_Z.email)){
			        this.msg="邮箱格式错误"
		        }else if(regEmail.test(this.form_Z.email)){
                    this.msg=""
                }
            },
	        emailL(){
		        var regEmail=/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
		        if(!regEmail.test(this.form_L.email)){
			        this.msgL="邮箱格式错误"
		        }else if(regEmail.test(this.form_L.email)){
			        this.msgL=""
		        }
            },
	        psw(){
		        var regPsw=/(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,20}/;
		        if(!regPsw.test(this.form_Z.passward)){
			        this.msg="密码格式不对"
		        }else if(regPsw.test(this.form_Z.passward)){
			        this.msg=""
		        }
            },
	        pswC(){
	        	if (this.form_Z.confirm!=this.form_Z.passward){
	        		this.msg="与初始密码不一致"
                }else {
			        this.msg=""
                }
            },
	        changeType(){
		        this.form_Z.pwdType = this.form_Z.pwdType==='password'?'text':'password';
		        this.form_Z.src=this.form_Z.src==require("../../../static/img/yincangmima@3x.png")?require("../../../static/img/xianshimima@3x.png"):require("../../../static/img/yincangmima@3x.png");
	        },
	        save(){
	        	var self=this
	        	if (self.form_Z.name==""){
	        		self.msg="请输入昵称"
                }else {
	        		self.msg=""
                }
                if (!self.isDisabled){
	        		return
                }
                if (self.msg!=''){
	        		return
                }else {
	                self.$axios.post('register',{email:self.form_Z.email,password:self.form_Z.passward,confirm:self.form_Z.confirm,name:self.form_Z.name},(res)=>{
		                if (res.ret){
			                this.dialogVisible = false
			                this.$message({
				                message: '注册成功！',
				                type: 'success'
			                });
			                self.tab=false;
			                self.form_Z.email=""
			                self.form_Z.name=""
			                self.form_Z.passward=""
			                self.form_Z.confirm=""
		                }else{
			                self.$message.error(res.msg)
		                }
	                })
                }
            },
	        loginTo(){
	        	var self=this
	        	if (self.form_L.email==""){
	        		self.msgL="请填写邮箱"
                }else {
			        self.msgL=""
                }
		        if (self.form_L.passward==""){
			        self.msgL="请填写密码"
		        }else {
			        self.msgL=""
		        }
		        self.$axios.post('login',{email:self.form_L.email,password:self.form_L.passward},(res)=>{
		        	if (res.ret){
				        this.$message.success('登陆成功，正在跳转...');
				        localStorage.setItem('name', res.data.name);
				        localStorage.setItem('is_admin', res.data.is_admin);
				        setTimeout(function () {self.$router.push({path: '/terrace'})}, 1000)
                    }else {
		        		self.msgL=res.msg
                    }
                })
            }
        }
	}
</script>

<style scoped>
    .wais_box{
        background-color: #fff;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
    }
    .left{
        flex: 6;
        /*width: 1100px;*/
        height: 100%;
    }
    .right{
        flex: 4;
        height: 100%;
        background-image: url("../../../static/img/kuanpng@1x.png");
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }
    .right img{
        height: 99.5%;
        width: 639px;
    }
    .content_box{
        /*margin-top: 27px;*/
        padding: 0px 260px 0px 111px;
        height: 100%;
        max-height: 797.2px;
        position: relative;
    }
    .wais_box{
    display: flex;
    }
    .logo img{
        width: 160px;
        height: 37px;
    }
    .logo{
        margin-bottom: 16.5px;
        padding-top: 15px;
    }
    .tab_box{
        display: flex;
        width: 500px;
        border-bottom: 1px solid #d8d8d8;
    }
    .tab{
        height: 100%;
        padding: 11px 0;
        font-family: .SFNSDisplay;
        font-size: 26px;
        color: #A1A1A1;
        letter-spacing: 0;
        line-height: 26px;
        /*border-bottom: 2px solid #cc0000;*/
        cursor: pointer;
    }
    .tab:nth-child(1){
        margin-right: 20px;
    }
    .on{
        color: #343434;
        border-bottom: 2px solid #009e79;
        box-sizing: border-box;
    }
    .login_box{
        margin-top: 38px;
    }
    .warn{
        width: 500px;
        height: 60px;
        background: rgba(234,70,62,0.08);
        border: 1px solid #EA463E;
        border-radius: 6px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        font-family: .AppleSystemUIFont;
        font-size: 16px;
        color: #EA463E;
        letter-spacing: 0;
    }
    .warn img{
        width: 20px;
        height: 20px;
        margin: 0 14px 0 23px;
    }
    .inp_box{
        display: flex;
        width: 500px;
        height: 60px;
        border: 1px solid #9D9D9D;
        border-radius: 6px;
        align-items: center;
        margin-bottom: 20px;
    }
    .inp_box img{
        width: 20px;
        height: 16px;
        margin: 0 14px 0 23px;
    }
    .inp_box input{
        width: 90%;
        height: 80%;
        border: 0;
        outline: 0;
        font-size: 18px;
    }
    .tip{
        font-family: .AppleSystemUIFont;
        font-size: 14px;
        color: #737373;
        letter-spacing: 0;
    }
    .btn{
        width: 180px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        font-size: 20px;
        color: #fff;
        background-image: linear-gradient(-180deg, #00BF93 4%, #1D9A7E 98%);
        border-radius: 6px;
        cursor: pointer;
        margin: 43px 0 42px;
    }
    .xieyi{
        font-size: 16px;
        color: #737373;
        letter-spacing: 0;
    }
    .xieyi span{
        color: #00a580;

    }
    .bei{
        font-family: .AppleSystemUIFont;
        font-size: 16px;
        color: #737373;
        letter-spacing: 0;
        position: absolute;
        bottom: 0;
    }
</style>