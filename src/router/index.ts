import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      /*{
        path: '/',
        name: '首页',
        //component: () => import('../views/index.vue')
        component: resolve => require(['../views/Index.vue'], resolve)
      },*/
      {
        path: '/Index',
        name: '首页',
        component: resolve => require(['../views/Index.vue'], resolve)
      },
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
        path: '/adsense',
        name: '广告管理',
        component: resolve => require(['../views/adsense.vue'], resolve)
      },
      {
        path: '/slider',
        name: '图片轮播',
        component: resolve => require(['../views/slider.vue'], resolve)
      }
    ]
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
