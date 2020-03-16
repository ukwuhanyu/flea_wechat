import request from '../../utils/request'
let baseURL = 'https://zhu.ukwuhanyu.cn:9091'
// 获取分类
export const getClassify = () => request(baseURL + '/wx-category/list')
