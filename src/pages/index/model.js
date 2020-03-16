import request from '../../utils/request'
let baseURL = 'https://zhu.ukwuhanyu.cn:9091'
// 获取轮播图
export const getCarouselImg = (p) => request(baseURL + '/wx-carousel/list', p)
// 获取热门商品
export const getHotSp = (p) => request(baseURL + '/wx-commodity/hot', p)
// 获取为你推荐商品
export const getRecommend = (p) => request(baseURL + '/wx-recommend/limit', p)