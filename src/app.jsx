import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'

import './app.scss'
// import 'swiper/css/swiper.css'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  config = {
    pages: [
      'pages/index/index',
      'pages/classify/classify',
      'pages/issue/issue',
      'pages/me/me',
      'pages/spdetail/spdetail'
    ],
    // 底部导航栏
    tabBar: {
      color: "#333",
      selectedColor: "#f03d37",
      backgroundColor: "#fff",
      borderStyle: "black",
      list: [
        {
          pagePath: "pages/index/index",
          text: "首页",
          iconPath: "./assets/images/index.png",
          selectedIconPath: "./assets/images/sel_index.png"
        },
        {
          pagePath: "pages/classify/classify",
          text: "分类",
          iconPath: "./assets/images/classify.png",
          selectedIconPath: "./assets/images/sel_classify.png"
        },
        {
          pagePath: "pages/issue/issue",
          text: "发布",
          iconPath: "./assets/images/issue.png",
          selectedIconPath: "./assets/images/sel_issue.png"
        },
        {
          pagePath: "pages/me/me",
          text: "我的",
          iconPath: "./assets/images/me.png",
          selectedIconPath: "./assets/images/sel_me.png"
        }
      ]
    },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
