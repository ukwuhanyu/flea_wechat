import request from '../../utils/request'
let baseURL = 'https://zhu.ukwuhanyu.cn:9091'
export const login = (p) => request(baseURL + '/wx-user/login', p)