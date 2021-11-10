const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    userid: state => state.user.userid,
    username: state => state.user.username,
    nickname: state => state.user.nickname,
    roles: state => state.user.roles,
    role_names: state => state.user.role_names,
    permission_routers: state => state.permission.routers,
    addRouters: state => state.permission.addRouters,
    errorLogs: state => state.errorLog.logs,
    shops_id:state => state.user.shops_id,

    company:state => state.relationship.company,
    company_relation:state => state.relationship.company_relation,
    company_status:state => state.relationship.company_status,
    company_canvas:state => state.relationship.company_canvas,
}

export default getters
