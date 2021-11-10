/**
 * 产业链
 */

import request from "@/utils/request";

// 进口国家排名
export function materialimportsource(query = {}) {
  return request({
    url: "api/v1/industry/materialimportsource/",
    method: "get",
    params: Object.assign({limit : 5}, query),
  });
}
// 有色金属进口趋势
export function materialimporttotal(query = {}) {
  return request({
    url: "api/v1/industry/materialimporttotal/",
    method: "get",
    params: query,
  });
}
// 飞线图
export function flyline(query = {}) {
  return request({
    url: "api/v1/industry/flyline/",
    method: "get",
    params: query,
  });
}
// 产量
export function materialproduction(query = {}) {
  return request({
    url: "api/v1/industry/materialproduction/",
    method: "get",
    params: query,
  });
}

// 产量
export function company(query = {}) {
  return request({
    url: "api/industry/company",
    method: "get",
    params: query,
  });
}