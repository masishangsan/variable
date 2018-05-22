<template>
    <div id="#mine_fun">
        <div class="wai_box">
            <div class="creat_fun">
                <div class="head">
                    <div class="tit">共{{xiangmu.length}}个文件夹</div>
                    <div style="display: flex;align-items: center">
                        <div class="creat_funs"  @click="$router.push({path:'/creat_fun'})"><span>+</span><span>新建变量</span></div>
                        <div class="nc_btn" @click="dialogFormVisible = true"><span>+</span><span>新建文件夹</span></div>
                    </div>
                    <!--<el-button type="primary" style="border: 1px solid rgba(255, 255, 255, 1);background-color:rgba(26, 179, 148, 1);"  @click="dialogFormVisible = true">新建文件夹</el-button>-->
                </div>
                <div class="item_box">
                    <div class="item"  @click="tomine_All_fun_item">
                        <div class="item_left">
                            <div >全部变量</div>
                            <div>共{{allNum}}个变量</div>
                        </div>
                        <div class="item_right">
                            <span class="iconfont icon-more gd"></span>
                        </div>
                    </div>
                    <div class="item" v-for="(item,index) in xiangmu" v-model="xiangmu" @click="tomine_fun_item(index)">
                        <span class="iconfont icon-bianji bianji" @click.stop="bianji(index)"></span>
                        <span class="iconfont icon-shanchu shanchu" @click.stop="shanchu(index)"></span>
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
                ],
				form:{
                    name:"",
                },
				dialogFormVisible:false,
                samedir:true,
                allNum:""
            }
        },
        mounted(){
            this.getIndexMessage();
            this.getAllNumber();
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
            getAllNumber(){
	            this.$axios.get('getAllNumbers',{},res=>{
	            	if(res.ret){
                    this.allNum=res.data.num
                    }
                })
            },
	        tomine_fun_item(index){
	        	console.log(index)
                var id=this.xiangmu[index].id
                this.$router.push({path:"/mine_fun_item", query: { id: id ,name:this.xiangmu[index].name}})
            },
	        bianji(index){
	        	var self=this
	        	var id=this.xiangmu[index].id;
		        self.samedir=true;
		        this.$prompt('请输入新文件夹名', '提示', {
			        confirmButtonText: '确定',
			        cancelButtonText: '取消',
			        inputPattern: /\S/,
			        inputErrorMessage: '请输入内容'
		        }).then(({ value }) => {
		        	self.xiangmu.forEach(item=>{
		        		if(value==item.name){
					        this.$message({
						        type: 'error',
						        message: '您已经有同名文件夹了'
					        });
					        self.samedir=false
                        }
                    })
                    if(self.samedir){
		        		self.$axios.post('update_file',{name:value,id:id},res=>{
		        			if (res.ret){
		        				self.$message.success('修改成功');
						        this.getIndexMessage();
                            }
                        })
                    }
		        }).catch(() => {
			        this.$message({
				        type: 'info',
				        message: '取消输入'
			        });
		        });
            },
	        shanchu(index){
		        var id=this.xiangmu[index].id;
		        var self=this
		        this.$confirm('此操作将永久删除该文件夹, 是否继续?', '提示', {
			        confirmButtonText: '确定',
			        cancelButtonText: '取消',
			        type: 'warning'
		        }).then(() => {
			        self.$axios.post('deldir_list',{id:id},res=>{
			        	if(res.ret){
					        this.$message({
						        type: 'success',
						        message: '删除成功!'
					        });
					        this.getIndexMessage();
                        }
                    })
		        }).catch(() => {
			        this.$message({
				        type: 'info',
				        message: '已取消删除'
			        });
		        });
            },
	        tomine_All_fun_item(){
		        this.$router.push({path:"/mine_fun_item", query: { type: 0 ,name:'全部'}})
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
        margin-left: 27px;
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
        position: relative;
    }
    .bianji{
        position: absolute;
        left: 130px;
        top: 3px;
        cursor: pointer;
    }
    .bianji:hover{
        color: #00a580;
    }
    .shanchu{
        position: absolute;
        left: 160px;
        top: 3px;
        cursor: pointer;
    }
    .item:hover{
        border: 1px solid rgba(26, 179, 148, 1);
        cursor: pointer;
    }
    .shanchu:hover{
        color: #00a580;
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
    .creat_funs{
        width: 140px;
        height: 40px;
        line-height: 40px;
        margin-right: 40px;
        text-align: center;
        border: 1px solid #009E79;
        border-radius: 6px;
        font-size: 18px;
        color: #009E79;
        letter-spacing: 0;
        cursor: pointer;
    }
    .creat_funs:hover{
        color: #00C597;
        border-color: #00C597;
    }
</style>