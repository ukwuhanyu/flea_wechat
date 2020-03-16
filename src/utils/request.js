import Taro from '@tarojs/taro'

export default function request(url, options) {
  // let baseURL = 'http://101.37.25.201:9091'
  // let urls = baseURL + url
  // console.log(urls)
  let newOptions = { ...options };
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    // if (!(newOptions.body instanceof FormData)) {
      newOptions.header = {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        ...newOptions.header
      };
    // } else {
      // newOptions.body is FormData
      // newOptions.header = {
      //   Accept: 'application/json',
      //   ...newOptions.header
      // };
    // }
  } else {
    newOptions.header = {
      'Content-Type': 'json',  // 这里是特殊处理
      ...newOptions.header
    }
  }

  return Taro.request({ url, ...newOptions })
}
