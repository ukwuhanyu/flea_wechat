import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import './me.scss'
import touxiang from '../../assets/images/touxiang.png'
import { login } from './model'

export default class Me extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        avatarUrl: touxiang,
        userNameFlag: false
      }
    }
  }
  // 判断是否登录
  isLogin() {
    let that = this;
    try {
      var value = Taro.getStorageSync('token')
      if (value) {
        console.log(res.data, 'token')
        that.setState({
          user: res.data,
          userNameFlag: true
        })
      }
    } catch (e) {
      that.setState({
        userNameFlag: false
      })
    }
    // Taro.getStorage({
    //   key: 'token',
    //   success: function (res) {
    //     if (res) {
    //       console.log(res.data, 'token')
    //       that.setState({
    //         user: res.data,
    //         userNameFlag: true
    //       })
    //     }
    //   }
    // })
  }
  // 登录
  Login(e) {
    let that = this;
    // 判断用户是否允许授权
    if (e.detail.errMsg === 'getUserInfo:fail auth deny') {
      // 用户拒绝授权
      console.log('no')
    } else if (e.detail.errMsg === 'getUserInfo:ok') {
      // 用户允许授权
      console.log('ok')
      Taro.getSetting({
        success(res) {
          console.log(res)
          // 授权
          if (res.authSetting['scope.userInfo']) {
            console.log('授权')
            // 获取用户信息
            Taro.getUserInfo({
              success: function (res) {
                console.log(res)
                let obj = {}
                let userInfo = res.userInfo
                obj.nickName = userInfo.nickName
                obj.avatarUrl = userInfo.avatarUrl //头像
                obj.gender = userInfo.gender //性别 0：未知、1：男、2：女
                obj.province = userInfo.province
                obj.city = userInfo.city
                obj.country = userInfo.country
                obj.rawData = res.rawData
                obj.signature = res.signature
                console.log(obj)
                that.setState({
                  user: obj
                })
                // 登录
                Taro.login({
                  success: function (res) {
                    console.log(res)
                    if (res.code) {
                      login({
                        method: 'POST',
                        data: {
                          code: res.code,
                          rawData: that.state.user.rawData,
                          signature: that.state.user.signature
                        }
                      }).then(res2 => {
                        console.log(res2, 'loginres')
                        if (res2.data.message == '成功') {
                          Taro.setStorage({
                            key: "token",
                            data: that.state.user
                          })
                          that.setState({
                            userNameFlag: true
                          })
                        }
                      })
                    }
                  }
                })
              }
            })
          } else {
            console.log('未授权')
          }
        }
      })
    }
  }
  componentWillMount() {
    this.isLogin()
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: '关于我'
  }

  render() {
    return (
      <View className='me'>
        <View className='me_top'>
          <View className='top_content'>
            <Image src={user.avatarUrl} className='top_content_touxiang'></Image>
            <View className='no_login'>
              <Button openType='getUserInfo' className={`login_text ${this.state.userNameFlag ? 'noshow' : 'show'}`} onGetUserInfo={this.Login} >登录</Button>
              <Text className={`login_name ${this.state.userNameFlag ? 'show' : 'noshow'}`}>{user.nickName}</Text>
            </View>
          </View>
        </View>
        <View className='me_bottom'>
          <View className='bottom_item'>我发布的</View>
          <View className='bottom_item'>我想要的</View>
          <View className='bottom_item'>我发布的</View>
          <View className='bottom_item'>我发布的</View>
        </View>
      </View>
    )
  }
}
