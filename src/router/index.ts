import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home/Home.vue'
import { generateRoutes } from './permission'
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
      path: '*', // 页面不存在的情况下会跳到404页面
      redirect: '/role',
      name: 'notFound',
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      /*{
            path: '/authority',
            component: resolve => require(['../views/authority.vue'], resolve),
            name: 'authority',
            meta: {
              roles: true  // 该部分和权限相关
            }
        },*/
        {
            path: '/role',
            name: 'role',
            component: resolve => require(['../views/role.vue'], resolve),
            meta: {
              roles: true  // 该部分和权限相关
            }
        },
      {
        path: '/',
        name: 'role',
        //component: () => import('../views/index.vue')
        component: resolve => require(['../views/role.vue'], resolve)
      },
      
    ]
  },
  {
        path: '/login',
        name: 'login',
        component: resolve => require(['../views/login.vue'], resolve)
      },
]

let routes2= [
        {
            path: '/',
            name: 'Home',
            component: Home,
            children: [
                {
                  path: '/Index',
                  name: 'index',
                  component: resolve => require(['../views/Index.vue'], resolve),
                  meta: {
                      roles: true  // 该部分和权限相关
                    }
                },
                {
                    path: '/log',
                    name: 'log',
                    component: resolve => require(['../views/log.vue'], resolve),
                    meta: {
                      roles: true  // 该部分和权限相关
                    }
                },
                {
                    path: '/access',
                    name: 'access',
                    component: resolve => require(['../views/access.vue'], resolve),
                    meta: {
                      roles: true  // 该部分和权限相关
                    }
                },
                
                {
                    path: '/keywords',
                    name: 'keywords',
                    component: resolve => require(['../views/keywords.vue'], resolve),
                    meta: {
                      roles: true  // 该部分和权限相关
                    }
                },
                {
                    path: '/user',
                    name: 'user',
                    component: resolve => require(['../views/user.vue'], resolve),
                    meta: {
                      roles: true  // 该部分和权限相关
                    }
                },
                {
                    path: '/adsense',
                    name: 'adsense',
                    component: resolve => require(['../views/adsense.vue'], resolve),
                    meta: {
                      roles: true  // 该部分和权限相关
                    }
                },
                {
                    path: '/link',
                    name: 'link',
                    component: resolve => require(['../views/link.vue'], resolve),
                    meta: {
                      roles: true  // 该部分和权限相关
                    }
                },
                {
                    path: '/system',
                    name: 'system',
                    component: resolve => require(['../views/system.vue'], resolve),
                    meta: {
                      roles: true  // 该部分和权限相关
                    }
                },
                {
                    path: '/copyright',
                    name: 'copyright',
                    component: resolve => require(['../views/copyright.vue'], resolve),
                    meta: {
                      roles: true  // 该部分和权限相关
                    }
                },
                {
                    path: '/index_seo',
                    name: 'index_seo',
                    component: resolve => require(['../views/index_seo.vue'], resolve),
                    meta: {
                      roles: true  // 该部分和权限相关
                    }
                },
                {
                    path: '/slider',
                    name: 'slider',
                    component: resolve => require(['../views/slider.vue'], resolve),
                    meta: {
                      roles: true  // 该部分和权限相关
                    }
                },
                {
                    path: '/article',
                    name: 'article',
                    component: resolve => require(['../views/article.vue'], resolve),
                    meta: {
                      roles: true  // 该部分和权限相关
                    }
                },
                {
                    path: '/article/action',
                    name: 'article_action',
                    component: resolve => require(['../views/article.vue'], resolve),
                    meta: {
                      roles: true  // 该部分和权限相关
                    }
                },
                {
                    path: '/root',
                    name: 'root',
                    component: resolve => require(['../views/root.vue'], resolve),
                    meta: {
                      roles: true  // 该部分和权限相关
                    }
                },
                {
                    path: '/tag',
                    name: 'tag',
                    component: resolve => require(['../views/tag.vue'], resolve),
                    meta: {
                      roles: true  // 该部分和权限相关
                    }
                },
                
               {
                    path: '/help',
                    name: 'help',
                    component: resolve => require(['../views/help.vue'], resolve),
                    meta: {
                      roles: true  // 该部分和权限相关
                    }
                },
                {
                    path: '/cnzz',
                    name: 'cnzz',
                    component: resolve => require(['../views/cnzz.vue'], resolve),
                    meta: {
                      roles: true  // 该部分和权限相关
                    }
                },
                {
                    path: '/bbs',
                    name: 'bbs',
                    component: resolve => require(['../views/bbs.vue'], resolve),
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
               
            ]
        },
    ]

    let permission=localStorage.getItem('permission');
    if(permission!=null){
        let router=[...routes]
        let generateAsyncRoutes = generateRoutes(routes2, permission)  // 根据登录角色生成动态路由
        router = router.concat(generateAsyncRoutes)
       Object.assign(routes,router);
    }

const router = new VueRouter({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
