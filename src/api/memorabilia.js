import request from '@/utils/request'
/**
 * 大事记
 */
// 列表
export function history(query) {
    return request({
        url: '/api/v1/history/story/',
        method: 'get',
        params: {
            expand : 'atlas,atlas.items',
            fields : 'id,atlas,content,date'
        }
    })
}