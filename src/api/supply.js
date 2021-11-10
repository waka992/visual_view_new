/**
 * 供需关系
 */

import request from "@/utils/request";

/**
 * @description 生产量
 */
export function production(query = {}) {
  return request({
    url: "api/v1/industry/production/",
    method: "get",
    params: query,
  });
}
/**
 * @description 消费量
 */
export function consumption(query = {}) {
  return request({
    url: "api/v1/industry/consumption/",
    method: "get",
    params: query,
  });
}
/**
 * @description 库存
 */
export function storage(query = {}) {
  return request({
    url: "api/v1/industry/storage/",
    method: "get",
    params: query,
  });
}
/**
 * @description 下游行业
 */
export function downstreamindustry(query = {}) {
  return request({
    url: "api/v1/industry/downstreamindustry/",
    method: "get",
    params: query,
  });
}
/**
 * @description 加工企业
 */
export function manufacturingenterprise(query = {}) {
  return request({
    url: "api/v1/industry/manufacturingenterprise/",
    method: "get",
    params: query,
  });
}
