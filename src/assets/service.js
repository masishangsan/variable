export default{
    url(u){
        let t = this;
        return t.baseURL.trim() + t[u.trim()];
    },
    baseURL: "",

	add_fun:"/index/variable/add",//新增变量

	add_model:"/index/mould/add",//新增模型

	deleteModel:"/index/mould/delete",//我的模型库删除模型

	getblMsg:"/index/variable/getvarname",//获取变量选项值

	getwd_Bybl:"/index/variable/getdisname",//通过变量获取维度值

	add_file:"/index/dir/add",//新建文件夹

	update_file:"/index/dir/update",//修改文件夹名

	getpingtai_fun:"/index/dir/index",//获取个人变量库信息

	getmine_fun_item:"/index/dir/getvarlist",//获取个人变量库单条信息

	search_fun_item:"/index/dir/search",//搜索个人变量库单条信息

	getmine_fun_item_detail:"/index/variable/get",//获取个人变量库单条信息的详细信息

	getmine_fun_item_detailw:"/index/variable/getdis",//获取个人变量库单条信息的详细信息_维度

	getmine_model:"/index/mould/getmouldlist",//获取个人模型库数据

	getmodel_msg:"/index/mould/get",//获取单条模型信息

	delmodel_msg:"/index/mould/delete",//删除单条模型信息

	search_model:"/index/mould/search",//搜索个人模型库单条信息

	delvar:"/index/variable/delete",//移除单条变量

	terrace_search:"/index/mould/getmould",//平台变量搜索

	terrace_search_get:"/index/variable/getvarlist",//获取平台变量搜索结果

	import_search_fun:"/index/variable/imports",//导入搜索结果

	terrace_search_model:"/index/mould/getmould",//平台模型搜索

	terrace_search_model_get:"/index/mould/getmould",//平台模型搜索结果

	terrace_model_update:"/index/mould/update",//平台模型编辑提交

	terrace_model_fun:"/index/variable/update",//平台模型编辑提交

	imports_model:"/index/mould/import",//导入我的模型库

	xueshu:"/index/learning/cat",//学术搜索

	register:"/index/user/add",//注册

	login:"/index/user/login",//登陆

	tuiLogin:"/index/user/exit",//退出登陆

	getdir_list:"/index/dir/get",//获取文件夹列表

	getdirlist:"/index/dir/getdirlist",//获取文件夹列表2

	deldir_list:'/index/dir/delete',//删除文件夹

	getAll_fun:"/index/dir/getuservar",//获取所有变量

	moveDir:"/index/dir/mobile",//移动变量到新的文件夹

	addvar:"/index/dir/addvar",//从所有文件夹移动到新的文件夹

	copyDir:"/index/dir/copy",//复制变量到新的文件夹

	user_fun_update:"/index/variable/update",//用户编辑

	getzong:"/index/mould/num",//获取平台总数量

	model_isupdate:"/index/mould/isupdate ",//查询是否有权编辑模型

	fun_isupdate:"/index/variable/isupdate ",//查询是否有权编辑变量

	getAllNumbers:"/index/dir/countuservar",//获取全部文件夹变量数量

	// qiniu
    qiniu: "/api/tools/getToken",
}
