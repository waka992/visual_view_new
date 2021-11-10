import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
    state: {
        token: getToken(),
        name: '',
        avatar: '',
        roles: [],
        shops_id:'',
        role_names: [],
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_USERID: (state, id) => {
            state.userid = id
        },
        SET_USERNAME: (state, name) => {
            state.username = name
        },
        SET_NICKNAME: (state, name) => {
            state.nickname = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_SHOPS_ID: (state, shops_id) => {
            state.shops_id = shops_id
        },
        SET_ROLE_NAMES: (state, role_names) => {
            state.role_names = role_names
        }
    },

    actions: {
        // 登录
        Login({ commit }, userInfo) {
            const username = userInfo.username.trim()
            return new Promise((resolve, reject) => {
                login(username, userInfo.password, userInfo.sms_code)
                .then(response => {
                    if( response.status === 10000 ){
                        setToken(response.data.token)
                        commit('SET_TOKEN', response.data.token)
                    }
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },

        // 获取用户信息
        GetInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                getInfo(state.token)
                .then(response => {
                    const data = response.data
                    // 验证返回的roles是否是一个非空数组
                    if (data.roles && data.roles != '{}') { 
                        commit('SET_ROLES', data.roles.map(role => role.alias))
                        commit('SET_ROLE_NAMES', data.roles.map(role => role.name))
                    } else {
                        reject('getInfo: roles must be a non-null array !')
                    }
                    commit('SET_USERID', data.id)
                    commit('SET_USERNAME', data.username)
                    commit('SET_NICKNAME', data.nickname)
                    commit('SET_AVATAR', data.avatar)
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },

        // 登出
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {
                logout(state.token).then(() => {
                    commit('SET_TOKEN', '')
                    commit('SET_ROLES', [])
                    commit('SET_ROLE_NAMES', [])
                    removeToken()
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 前端 登出
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                removeToken()
                resolve()
            })
        }
    }
}

export default user
