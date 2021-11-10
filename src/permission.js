import router from './router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式

// 重定向白名单
const whiteList = ['/login']

router.beforeEach((to, from, next) => {
    // start progress bar
    NProgress.start();

    // set page title
    //document.title = getPageTitle(to.meta.title)
    if (whiteList.indexOf(to.path) === -1) {
        // 不在白名单中，直接进入
        next()
        NProgress.done()
    } else {
        // 转到首页
        next({ path: '/' })
        NProgress.done()
    }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})
