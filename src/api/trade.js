/**
 * 产业链
 */

import request from "@/utils/request";

// 获取公司列表
export function company(query = {}) {
  return request({
    url: "api/v1/industry/company/",
    method: "get",
    params: query,
  });
}
// 获取某个公司所关联的其他公司
export function related_company(query = {}, id = 5) {
  let url = `api/v1/industry/company/${id}/`;
  return request({
    url,
    method: "get",
    params: query,
  });
}
