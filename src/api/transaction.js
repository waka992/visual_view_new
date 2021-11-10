import request from '@/utils/request'
/**
 * 交易数据
 */
// 获取月度交易量
export function tradevolume(query) {
    return request({
        url: 'api/v1/transaction/tradevolume/',
        method: 'get',
        params: {
            fields : 'id,statis_date,amount',
            ordering : '-statis_date',
            limit : '12',
        }
    })
}

// 获取平台历年交易数据
export function tradeVolumeYear(query) {
    return request({
        url: 'api/v1/transaction/tradevolume/gettradevolumebyyear/',
        method: 'get',
        params: query
    })
}

// 获取当前交易额
export function currentVolume(query) {
    return request({
        url: 'api/v1/transaction/tradevolume/gettradevolumetotal/',
        method: 'get',
        params: query
    })
}

// 获取平台客户量
export function clientNumber(query) {
    return request({
        url: 'api/v1/transaction/clientnumber/',
        method: 'get',
        params: {
            fields : 'id,statis_date,amount'
        }
    })
}

// 品种交易量占比
export function tradeVolumeKind(query) {
    return request({
        url: 'api/v1/transaction/tradevolumebycommodity/',
        method: 'get',
        params: query
    })
}

// 需要涂色的省份列表
export function tradeVolumeMap(query) {
    return request({
        url: 'api/v1/transaction/tradevolumebyprovince/',
        method: 'get',
        params: query
    })
}

// 平台占国内交易量比重
export function tradeVolumeByPlatform(year) {
    return request({
        url: 'api/v1/transaction/tradevolumebyplatform/',
        method: 'get',
        params: {
            fields : 'id,amount,name',
            year   : year
        }
    })
}

// 8.中国占世界消费量比重
export function consumptionByCountry(year) {
    return request({
        url: 'api/v1/transaction/consumptionbycountry/',
        method: 'get',
        params: {
            fields : 'id,amount,name',
            year   : year
        }
    })
}
