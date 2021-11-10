import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import errorLog from './modules/errorLog'
import user from './modules/user'
import settings from './modules/settings'
import getters from './getters'

// 贸易关系
import relationship from './modules/relationship'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        app,
        user,
        permission,
        tagsView,
        errorLog,
        settings,
        relationship
    },
    getters
})

export default store
