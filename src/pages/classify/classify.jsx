import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { getClassify } from './model.js'
import './classify.scss'

export default class Classify extends Component {
  change(id, name) {
    console.log(id, name)
    let arr = this.state.classifyItem.filter((item) => {
      return item.categoryId == id
    })
    console.log(arr,'arr',this.state.classifyItem)
    this.setState({
      activeFlag: name,
      nowClassify: arr[0].children
    })
  }
  constructor (props) {
    super(props)
    this.state = {
      classifyItem: [],
      activeFlag: '手机数码',
      nowClassify: []
    }
  }
  componentWillMount () {
    // 获取分类列表
    getClassify({
      method: 'GET'
    }).then((res) => {
      console.log(res,'llll')
      this.setState({
        classifyItem: res.data.data,
        nowClassify: res.data.data[0].children
      })
    })
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '分类'
  }

  render () {
    return (
      <View className='classify'>
        <View className='classify_left'>
          {
            this.state.classifyItem.map((item, index) => (
              <View onClick={()=>{this.change(item.categoryId, item.categoryName)}} className={`classify_item ${this.state.activeFlag==item.categoryName? 'classify_left_active': ''}`} key={index}>
                {item.categoryName}
              </View>
            ))
          }
        </View>
        <View className='classify_right'>
          {
            this.state.nowClassify.map((item, index) => (
              <View className='right_item' key={index}>
                <Image className='right_item_img' src={item.categoryImg}></Image>
                <View className='right_item_title'>{item.categoryName}</View>
              </View>
            ))
          }
        </View>
      </View>
    )
  }
}
