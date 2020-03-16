import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import './spdetail.scss'
import {getDetail} from './model'

export default class Spdetail extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentWillMount() {
    console.log(this.$router.params.id)
    getDetail(this.$router.params.id).then(res => {
      console.log(res)
    })
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: '商品名称'
  }

  render() {
    return (
      <View>detail</View>
    )
   
  }
}
