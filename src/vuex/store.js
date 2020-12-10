import Vue from 'vue'
import Vuex from 'vuex'
// import Path from 'path'
import axios from 'axios';
Vue.use(Vuex)

Vue.prototype.$axios = axios;
const store = new Vuex.Store({
	// 定义状态
	state: {
        state: {
            topFixed:localStorage.getItem("topFixed")=='true'?true:false,
            sidebar:localStorage.getItem("sidebar")=='true'?true:false,
            permission:{},
            menu2:{},
            roleId:'',
            counter:0,
            pickerOptions: {
              disabledDate(time) {
                return time.getTime() < Date.now() - 8.64e7;
              },
            },
            webTitle:"vue + typeScript",
            headTitle:"个人博客日常笔记",
            marquee:"精简个人博客网站平台管理系统，售价 ￥150 元！有需要或想了解的朋友们请联系QQ：2970302840",
            authority:'',
            account:'',
            bbsTotal:0,
            logTotal:0,
            userTotal:0,
            path:'',
            paramsType:0,
            paramsStatus:0,
            Imgpath:'dist/server/images/',
            //Imgpath:'../dist/server/images/',
            // 左侧导航
            menu:[
               /* {
                  title:'统计',
                  select:true,
                  icon:'fa fa-tachometer',
                  children:[
                    {title:'首页',select:true,url:'index'},
                    {title:'登录日志',select:false,url:'log'},
                  ]
                },*/
                {
                  title:'权限设置',
                  select:false,
                  icon:'fa fa-cog',
                  children:[
                    /*{title:'栏目中心',select:false,url:'root'},
                    {title:'标签中心',select:false,url:'tag'},
                    {title:'关键词库',select:false,url:'keywords'},
                    {title:'文章中心',select:false,url:'article'},
                    {title:'用户管理',select:false,url:'user'},
                    {title:'友情链接',select:false,url:'link'},
                    {title:'广告管理',select:false,url:'adsense'},
                    {title:'图片轮播',select:false,url:'slider'},*/
                    {title:'角色权限',select:false,url:'role'},
                    // {title:'菜单设置',select:false,url:'authority'},
                    // {title:'新功能开发中',select:false,url:''},
                  ]
                },
                /*{
                  title:'功能',
                  select:false,
                  icon:'fa fa-windows',
                  children:[
                    {title:'留言板',select:false,url:'bbs'},
                    {title:'客服信息',select:false,url:'help'},
                    {title:'站长统计',select:false,url:'cnzz'},
                    // {title:'页面静态化',select:false,url:'html'},
                  ]
                },
                {
                  title:'设置',
                  select:false,
                  icon:'fa fa-cogs',
                  children:[
                    {title:'首页SEO',select:false,url:'index_seo'},
                    {title:'版权信息',select:false,url:'copyright'},
                    {title:'常规选项',select:false,url:'system'},
                    // {title:'用户管理权限',select:false,url:'authority'},
                  ]
                },*/
            ]
            // 左侧导航

        },


	},
  mutations: {
    
  },
  actions: {
    
  }
})
export default store