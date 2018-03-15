<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">管理系统</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <div class="configBtn">
                    <el-button type="text" @click="dialogVisible = true">去注册</el-button>
                </div>
            </el-form>
        </div>
        <el-dialog
            width="26%"
            class="tan"
            title="用户注册"
            :visible.sync="dialogVisible"
            size="tiny">
            <div class="bBOX">
                <el-form  label-width="100px" :model="formData">

                    <el-form-item label="邮箱">
                        <el-input v-model="formData.email" style="width: 200px"></el-input>
                    </el-form-item>

                    <el-form-item label="用户名">
                        <el-input v-model="formData.name" style="width: 200px"></el-input>
                    </el-form-item>

                    <el-form-item label="密码">
                        <el-input v-model="formData.password" type="password" style="width: 200px"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码">
                        <el-input v-model="formData.confirm" type="password" style="width: 200px"></el-input>
                    </el-form-item>
                </el-form>
            </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="save">注册</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                dialogVisible: false,
                formData: {
                    email: '',
	                password: '',
	                confirm:'',
	                name:''
                },
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                const self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post('login', {
                            email: self.ruleForm.username,
	                        password: self.ruleForm.password,
                        }, (resp) => {
                            if (resp.ret) {
                                this.$message.success('登陆成功，正在跳转...');
                                localStorage.setItem('name', resp.data.name);
                                localStorage.setItem('is_admin', resp.data.is_admin);
	                            localStorage.setItem('num', resp.data.num);
                                // if (resp.data.power == '1' || resp.data.setUp == '3') {
                                //     setTimeout(function(){self.$router.push('/apply');},1000);
                                // }else if(resp.data.setUp == '4'){
                                //      setTimeout(function(){self.$router.push('/financeManage')},1000)
                                // }else {
                                //      setTimeout(function(){self.$router.push('/testActivity');},1000);
                                // }
                                setTimeout(function () {self.$router.push({path: '/terrace'})}, 1000)

                            }else {
                                this.$message.error(resp.msg)
                            }

                        })
                    } else {
                        this.$message.error('请输入正确的账号密码');
                        return false;
                    }
                });
            },
            save(){

            	var self=this
                if (self.formData.email=="" ||self.formData.password=="" ||self.formData.confirm=="" ){
            		return
                }else {
	                self.$axios.post('register',self.formData,(res)=>{
		                if (res.ret){
			                this.dialogVisible = false
			                this.$message({
				                message: '注册成功！',
				                type: 'success'
			                });
		                }else{
			                self.$message.error(res.msg)
		                }
		                console.log(res)
	                })

                }
            },
        }
    }
</script>

<style scoped>
    .tan{
    }
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        /* background-image: url('/static/img/bg.jpg'); */
        background-image: url('/static/img/bj.jpg');
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }
    .ms-title{
        /* top:50%; */
        /* width:100%; */
        /* margin-top: -230px; */
        /* position: absolute; */
        left: 50%;
        /* transform: translate(-50%, 0); */
        top: 20px;
        text-align: center;
        font-size:19px;
        /* color: #fff; */
        margin-bottom: 20px;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        background-color: rgba(255,255,255, .6);
        /* height:190px; */
        margin:-180px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        /* background: #fff; */
        box-shadow: 0 0 6px 0 rgba(0,0,0,.04), 0 2px 4px 0 rgba(0,0,0,.12);

    }
    .ms-login .el-form-item {
        margin-bottom: 30px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
    .configBtn {
        text-align: center;
        padding-top: 25px;
    }
    .configBtn .el-button--text{
        color: #20a0ff;
    }
</style>
