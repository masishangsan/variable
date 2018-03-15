<template>
    <div id="#mine_fun">
        <div class="wai_box">
            <div class="creat_fun">
                <div class="head">
                    <div class="tit">共{{xiangmu.length}}个项目</div>
                    <div class="nc_btn" @click="dialogFormVisible = true"><span>+</span><span>新建文件夹</span></div>
                    <!--<el-button type="primary" style="border: 1px solid rgba(255, 255, 255, 1);background-color:rgba(26, 179, 148, 1);"  @click="dialogFormVisible = true">新建文件夹</el-button>-->
                </div>
                <div class="item_box">
                    <div class="item" v-for="(item,index) in xiangmu" v-model="xiangmu" @click="tomine_fun_item(index)">
                        <div class="item_left">
                            <div>{{item.name}}</div>
                            <div>共{{item.num}}个变量</div>
                        </div>
                        <div class="item_right">
                            <span class="iconfont icon-more gd"></span>
                        </div>
                    </div>
                </div>
            </div>
            <el-dialog title="输入信息" :visible.sync="dialogFormVisible" width="30%">
                <el-form :model="form">
                    <el-form-item label="文件夹名称">
                        <el-input v-model="form.name" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="add_file">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
	export default {
		data(){
			return{
				xiangmu:[
                    // {
	                 //    num:"",
	                 //    name:"",
                    //     id:""
                    // }
                ],
				form:{
                    name:"",
                },
				dialogFormVisible:false
            }
        },
        mounted(){
            this.getIndexMessage();
        },
        methods:{
	        add_file(){
	        	var self=this
                if (!self.form.name){
	                this.$message({
		                message: '不能为空',
		                type: 'warning'
	                });
                }else {
	                self.$axios.post('add_file',{name:self.form.name},(res)=>{
		                console.log(res)
                        // self.
		                if(res.ret){
			                self.dialogFormVisible=false;
			                self.getIndexMessage();
			                this.$message({
				                message: '新建成功',
				                type: 'success'
			                });
		                }
	                })
                }
            },
	        getIndexMessage(){
	        	var self=this;
	        	self.$axios.post('getpingtai_fun',{},(res)=>{

	        		console.log(res)
                    if (res.data){
	        			self.xiangmu=res.data
                    }
                })
            },
	        tomine_fun_item(index){
	        	console.log(index)
                var id=this.xiangmu[index].id
                this.$router.push({path:"/mine_fun_item", query: { id: id }})
            }
        }
	}
</script>

<style scoped>
    .gd{
        font-size: 26px;
        line-height: 60px;
        color: rgba(26, 179, 148, 1);
    }
.head{
    display: flex;
    justify-content: space-between;
    padding: 20px 20px;
    border-bottom: 1px solid #ccc;
}
.creat_fun{
    max-width: 1180px;
    margin: 28px auto 20px;
    background-color: #fff;
    border: 1px solid rgba(255, 255, 255, 1);
    border-radius: 5px;
    box-shadow: 0px 0px 5px 0px rgba(207, 207, 207, 1);

}
    .head .tit{
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        color: #737373;
        letter-spacing: 0;
        line-height: 26px;
    }
    .item_box{
        padding: 15px 20px 0;
    }
    .item{
        display: flex;
        justify-content: space-between;
        background: #FFFFFF;
        border: 1px solid #D8D8D8;
        border-radius: 6px;
        min-height: 60px;
        padding: 15px 27px;
        margin-bottom: 20px;
    }
    .item:hover{
        border: 1px solid rgba(26, 179, 148, 1);
        cursor: pointer;
    }
    .item_left{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        color: #343434;
        letter-spacing: 0;
        line-height: 26px;
        font-family: PingFang-SC-Medium;
    }
    .item_left>div:nth-child(1){
        font-size: 18px;
    }
    .item_left>div:nth-child(2){
        font-size: 14px;
    }
    .wai_box{
        background: #EFEFEF;
        border: 2px solid #D8D8D8;
        border-radius: 6px;
        max-width: 1270px!important;
        margin: 20px auto;
    }
    .nc_btn{
        width: 147px;
        height: 40px;
        line-height: 40px;
    }
    .nc_btn>span:nth-child(1){
        font-size: 20px;
        margin-right: 5px;
    }
</style>