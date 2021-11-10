import request from '@/utils/request'
/**
 * 指数
 */
// 华南铝价
export function aluminumPrice(query) {
    return request({
        url: 'api/v1/index/hnaluprice/',
        method: 'get',
        params: {
            ordering : '-statis_date',
            fields  : 'id,price,high_price,low_price,statis_date,change',
            limit  : '1' 
        }
    })
}

// 首发价
export function startPrice(query) {
    return request({
        url: 'api/v1/index/issueprice/getLatestIssuePrices/',
        method: 'get',
        params: query
    })
}

// 今日现货指数
export function latestSpotIndex(query) {
    return request({
        url: 'api/v1/index/spotindex/getLatestSpotIndexes/',
        method: 'get',
        params: query
    })
}

// 综合指数
export function spotIndex(query) {
    return request({
        url: 'api/v1/index/spotindex/',
        method: 'get',
        params: {
            ordering : '-statis_date',
            is_composite : 'true',
            fields  : 'id,statis_date,index,change,chg',
            limit  : '20' 
        }
    })
}

