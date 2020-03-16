import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './issue.scss'

export default class Issue extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '发布'
  }

  render () {
    return (
      <View className='index'>
        <Text>发布</Text>
      </View>
    )
  }
}
