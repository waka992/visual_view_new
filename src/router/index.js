import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/**
  * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
  * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
  *                                if not set alwaysShow, only more than one route under the children
  *                                it will becomes nested mode, otherwise not show the root menu
  * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
  * name:'router-name'             the name is used by <keep-alive> (must set!!!)
  * meta : {
    roles: ['admin','editor']    will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/

/**
 * constantRouterMap 代表那些不需要动态判断权限的路由，如登录页、404、等通用页面
 */
export const constantRouterMap = [
    {
        path: '/redirect',
        hidden: true,
        children: [{
            path: '/redirect/:path*',
            component: () => import('@/views/redirect/index')
        }]
    },
    // 404路由
    { path: '/404', component: () => import('@/views/error-page/404'), hidden: true },
    // 401路由
    //{ path: '/401', component: () => import('@/views/error-page/401'), hidden: true },

    /**
     * 首页
     */
    {
        path: '/',
        component: () => import('@/views/index/index'),
        name: 'index',
        meta: {
            title: '首页',
        },
    },

    /**
     * 合作伙伴
     */
    {
        path: '/friend',
        component: () => import('@/views/friend/index'),
        name: 'friend',
        meta: {
            title: '合作伙伴',
        },
    },

    /**
     * 供需关系
     */
    {
        path: '/supply',
        component: () => import('@/views/supply/index'),
        name: 'supply',
        meta: {
            title: '供需关系',
        },
    },

    /**
     * 产业链
     */
    {
        path: '/industrychain',
        component: () => import('@/views/industry-chain/index'),
        name: 'industrychain',
        meta: {
            title: '产业链',
        },
    },
    /**
     * 贸易关系
     */
     {
        path: '/industrychain/trade',
        component: () => import('@/views/industry-chain/canvas'),
        name: 'industrychain_trade',
        meta: {
            title: '贸易关系',
        },
    },
    /**
     * 交易数据
     */
    {
        path: '/exchangedata',
        component: () => import('@/views/exchange-data/index'),
        name: 'exchangedata',
        meta: {
            title: '交易数据',
        },
    },

    /**
     * 行业定位
     */
    {
        path: '/industryposition',
        component: () => import('@/views/industry-position/index'),
        name: 'industryposition',
        meta: {
            title: '行业定位',
        },
    },

    /**
     * 荣誉和大事记
     */
    {
        path: '/memorabilia',
        component: () => import('@/views/memorabilia/index'),
        name: 'industryposition',
        meta: {
            title: '荣誉和大事记',
        },
    },

    /**
     * 指数
     */
    {
        path: '/platformindex',
        component: () => import('@/views/platformindex/index'),
        name: 'platformindex',
        meta: {
            title: '指数',
        },
    },

    /**
     * 培训和沙龙
     */
    {
        path: '/trainsalon',
        component: () => import('@/views/trainsalon/index'),
        name: 'trainsalon',
        meta: {
            title: '培训和沙龙',
        },
    },

    /**
     * 互动交易
     */
    {
        path: '/interactive',
        component: () => import('@/views/interactive/index'),
        name: 'interactive',
        meta: {
            title: '互动交易',
        },
    },

    /**
     * 企业风采
     */
    {
        path: '/corporatestyle',
        component: () => import('@/views/corporatestyle/index'),
        name: 'corporatestyle',
        meta: {
            title: '企业风采',
        },
    },

    /**
     * 欢迎
     */
    {
        path: '/welcome',
        component: () => import('@/views/welcome/index'),
        name: 'welcome',
        meta: {
            title: '欢迎',
        },
    },
]

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})

/**
 * asyncRouterMap： 代表那些需求动态判断权限并通过 addRouters 动态添加的页面
 */
export const asyncRouterMap = [
    { path: '*', redirect: '/404', hidden: true }
]
