import { related_company } from "@/api/trade";

const relationship = {
    state: {
        company: {},  // 贸易公司
        company_relation: [], // 贸易关系
        company_status: false, // 状态
        company_canvas: [], // 贸易绘制
    },

    mutations: {
        SET_COMPANY: (state, company) => {
            state.company = company
        },
        SET_COMPANY_RELATION: (state, relation) => {
            state.company_relation = relation
        },
        SET_COMPANY_STATUS: (state, status) => {
            state.company_status = status
        },
        SET_COMPANY_CANVAS: (state, canvas) => {
            state.company_canvas = canvas
        },
    },

    actions: {
        // 获取贸易关系
        GetCompanyRelation({ commit }, compony_id) {
            commit('SET_COMPANY_STATUS', true);
            return new Promise((resolve, reject) => {
                related_company({
                    fields: "id,title,type,partners",
                }, compony_id)
                .then(response => {
                    if (response.code === 1000) {                         
                        commit('SET_COMPANY_RELATION', response.data.partners);
                        // commit('SET_COMPANY_RELATION', [1,23,3,41,6,7,8,10,11,12,13,14]);
                        delete response.data.partners;
                        commit('SET_COMPANY', response.data);
                        resolve(response)
                    }
                }).catch(error => {
                    reject(error)
                })                 
            })
        },

        // 移除贸易关系
        RemoveCompanyRelation({ commit }){
            commit('SET_COMPANY_RELATION', []);
            commit('SET_COMPANY_CANVAS', []);
            commit('SET_COMPANY', {});
            commit('SET_COMPANY_STATUS', false);
        }
    }
}

export default relationship