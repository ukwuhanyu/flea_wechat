import request from '../../utils/request'
let baseURL = 'https://zhu.ukwuhanyu.cn:9091'
export const getDetail = (p) => request(baseURL + '/wx-commodity/'+p)