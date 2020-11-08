import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
        {
            path: '*', // 页面不存在的情况下会跳到404页面
            redirect: '/index',
            name: 'notFound',
            hidden: true
        },
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/login',
            component: resolve => require(['../views/login.vue'], resolve)
        },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
        {
            path: '/',
            component: resolve => require(['../views/Readme.vue'], resolve)
        },
        {
            path: '/index',
            component: resolve => require(['../views/index.vue'], resolve),
            meta: {
              roles: true  // 该部分和权限相关
            }
        },
        
        {
            path: '/authority',
            component: resolve => require(['../views/authority.vue'], resolve),
            name: 'authority',
            meta: {
              roles: true  // 该部分和权限相关
            }
        },
        {
            path: '/role',
            name: 'role',
            component: resolve => require(['../views/role.vue'], resolve),
            meta: {
              roles: true  // 该部分和权限相关
            }
        },


      /*{
        path: '/',
        name: '首页',
        //component: () => import('../views/index.vue')
        component: resolve => require(['../views/Index.vue'], resolve)
      },*/
      /*{
        path: '/Index',
        name: '首页',
        component: resolve => require(['../views/Index.vue'], resolve)
      },*/
      {
        path: '/keywords',
        name: '关键词库',
        component: resolve => require(['../views/keywords.vue'], resolve)
      },
      {
        path: '/article',
        name: '文章中心',
        component: resolve => require(['../views/article.vue'], resolve)
      },
      {
        path: '/user',
        name: '用户管理',
        component: resolve => require(['../views/user.vue'], resolve)
      },
      {
        path: '/link',
        name: '友情链接',
        component: resolve => require(['../views/link.vue'], resolve)
      },
      {
        path: '/Index',
        name: '首页',
        component: resolve => require(['../views/Index.vue'], resolve)
      },
      {
        path: '/log',
        name: 'log',
        component: resolve => require(['../views/log.vue'], resolve)
      },
      {
        path: '/root',
        name: 'root',
        component: resolve => require(['../views/root.vue'], resolve)
      },
      {
        path: '/tag',
        name: 'tag',
        component: resolve => require(['../views/tag.vue'], resolve)
      },
      {
        path: '/adsense',
        name: 'adsense',
        component: resolve => require(['../views/adsense.vue'], resolve)
      },
      {
        path: '/bbs',
        name: 'bbs',
        component: resolve => require(['../views/bbs.vue'], resolve)
      },
      {
        path: '/help',
        name: 'help',
        component: resolve => require(['../views/help.vue'], resolve)
      },
      {
        path: '/cnzz',
        name: 'cnzz',
        component: resolve => require(['../views/cnzz.vue'], resolve)
      },
      {
        path: '/index_seo',
        name: 'index_seo',
        component: resolve => require(['../views/index_seo.vue'], resolve)
      },
      {
        path: '/copyright',
        name: 'copyright',
        component: resolve => require(['../views/copyright.vue'], resolve)
      },
      {
        path: '/system',
        name: 'system',
        component: resolve => require(['../views/system.vue'], resolve)
      },
      {
        path: '/slider',
        name: '图片轮播',
        component: resolve => require(['../views/slider.vue'], resolve)
      }
    ]
  },
  {
        path: '/login',
        name: 'login',
        component: resolve => require(['../views/login.vue'], resolve)
      },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
