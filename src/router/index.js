import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
    routes: [
	    {
		    path: '/',
		    redirect: '/logins'
	    },
	    {
		    path: '/',
		    component: resolve => require(['../components/common/Home.vue'], resolve),
		    children:[
			    {
				    path:'/terrace',
				    component: resolve => require(['../components/page/terrace.vue'], resolve)
			    },
			    {
				    path:'/mine_fun',
				    component: resolve => require(['../components/page/mine_fun.vue'], resolve)
			    },
			    {
				    path:'/mine_model',
				    component: resolve => require(['../components/page/mine_model.vue'], resolve)
			    },
			    {
				    path:'/science',
				    component: resolve => require(['../components/page/science.vue'], resolve)
			    },
			    {
				    path:'/creat_fun',
				    component: resolve => require(['../components/page/creat_fun.vue'], resolve)
			    },
			    {
				    path:'/creat_model',
				    component: resolve => require(['../components/page/creat_model.vue'], resolve)
			    },
			    {
				    path:'/mine_fun_item',
				    component: resolve => require(['../components/page/mine_fun_item.vue'], resolve)
			    },
			    {
				    path:'/mine_fun_item_detail',
				    component: resolve => require(['../components/page/mine_fun_item_detail.vue'], resolve)
			    },
			    {
				    path:'/mine_fun_item_detailw',
				    component: resolve => require(['../components/page/mine_fun_item_detailw.vue'], resolve)
			    },
			    {
				    path:'/mine_model_detail',
				    component: resolve => require(['../components/page/mine_model_detail.vue'], resolve)
			    },
			    {
				    path:'/terrace_search_fun',
				    component: resolve => require(['../components/page/terrace_search_fun.vue'], resolve)
			    },
			    {
				    path:'/terrace_search_model',
				    component: resolve => require(['../components/page/terrace_search_model.vue'], resolve)
			    },
			    {
				    path:'/terrace_model_detail',
				    component: resolve => require(['../components/page/terrace_model_detail.vue'], resolve)
			    },
			    {
				    path:'/terrace_fun_item_detailw',
				    component: resolve => require(['../components/page/terrace_fun_item_detailw.vue'], resolve)
			    },
			    {
				    path:'/terrace_fun_item_detail',
				    component: resolve => require(['../components/page/terrace_fun_item_detail.vue'], resolve)
			    },
			    {
				    path:'/login',
				    component: resolve => require(['../components/page/Login.vue'], resolve)
			    },
		    ]
	    },
	    {
		    path: '/logins',
		    component: resolve => require(['../components/page/logins.vue'], resolve)
	    },
    ]
})
