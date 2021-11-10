import { asyncRouterMap, constantRouterMap } from '@/router'
import { getToken } from '@/utils/auth'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role))
    } else {
        return true
    }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * 
 * @param routes 可访问路由
 * @param roles  用户角色
 * @param roles  用户角色权限
 */
function filterAsyncRouter(routes, roles, permissions) {
    const res = []
    routes.forEach(route => {
        const tmp = { ...route }
        if( permissions.page.includes(tmp.name) ){
            tmp.meta.roles = permissions.role
            if (tmp.children) {
                tmp.children = filterAsyncRouter(tmp.children, roles, permissions)
            }
            res.push(tmp)
        } 
        // else {
        //     if( tmp.meta !== undefined ){
        //         tmp.meta.roles = []
        //         if (tmp.children) {
        //             tmp.children = filterAsyncRouter(tmp.children, roles, permissions)
        //         }
        //     }
        // }
        // res.push(tmp)
    })
    return res
}

const permission = {
    state: {
        routers: constantRouterMap,
        addRouters: [],
        token: getToken(),
    },
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers
            state.routers = constantRouterMap.concat(routers)
        }
    },
    actions: {
        GenerateRoutes({ commit }, data) {
            return new Promise(resolve => {
                const { roles, permissions } = data
                // 可访问路由
                let accessedRouters
                // 超级管理员用户
                if (roles.includes('administrator')) {
                    accessedRouters = asyncRouterMap || []
                } else {
                    accessedRouters = filterAsyncRouter(asyncRouterMap, roles, permissions)
                }
                commit('SET_ROUTERS', accessedRouters)
                resolve()
            })
        },
    }
}

export default permission
