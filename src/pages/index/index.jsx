import Taro, { Component } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import './index.scss'
import hotImg from '../../assets/images/hot.png'
import foryouImg from '../../assets/images/foryou.jpg'
import loding from '../../assets/images/loding.gif'
import { getCarouselImg, getHotSp, getRecommend } from './model'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      CarouselImg: [], //轮播图
      HotImg: [], // 热门推荐
      Recommend: '',
      add: 6, //上拉加载多少
      myLimit: 1, //当前页码
      count: '', //为你推荐商品总数量
      lodingFlag: true,
      noMore: false
    }
  }
  // 获取为你推荐商品
  getR(p, f) {
    // 加载更多
    if(f) {
      console.log('more')
      getRecommend(p).then(res => {
        console.log(res, 'limit')
        this.setState({
          Recommend: this.state.Recommend.concat(res.data.data),
          lodingFlag: false
        }, () => {
          // 判断还有没有数据
          if(this.state.Recommend.length == this.state.count) {
            console.log('没有更多了')
            this.setState({
              noMore: true
            })
          }
        })
      })
    } else {
      // 首次加载
      setTimeout(() => {
        getRecommend(p).then(res => {
          console.log(res, 'limit')
          this.setState({
            Recommend: res.data.data,
            count: res.data.count,
            lodingFlag: false
          }, () => {
            console.log(this.state, 'ooo')
          })
        })
      }, 2000);
    }
  }
  toDetail(id) {
    console.log('detail',id)
    Taro.navigateTo({
      url: '/pages/spdetail/spdetail?id=' + id
    });
  }
  componentWillMount() {
    // 获取轮播图
    getCarouselImg({
      method: 'GET'
    }).then(res => {
      console.log(res)
      this.setState({
        CarouselImg: res.data.data
      }, () => {
        console.log(this.state.CarouselImg)
      })
    })
    // 获取热门商品
    getHotSp({
      method: 'GET'
    }).then(res => {
      console.log(res, 'hot')
      this.setState({
        HotImg: res.data.data
      }, () => {
        console.log(this.state.HotImg)
      })
    })
    // 为你推荐
    this.getR({
      method: 'GET',
      data: {
        limit: this.state.add,
        page: this.state.myLimit
      }
    },'')
  }
  // 上拉加载
  onReachBottom() {
    let that = this;
    console.log('加载')
    console.log(that.state.add)
    this.setState({
      lodingFlag: true,
      myLimit: this.state.myLimit + 1
    }, () => {
      this.getR({
        method: 'GET',
        data: {
          limit: this.state.add,
          page: this.state.myLimit
        }
      }, 'more')
    })
  }
  componentDidMount() {

  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: '首页'
  }

  render() {
    return (
      <View className='index'>
        {/* 搜索板块 */}
        <View className='index_search'>
          <View className='index_search_content'>
            <Text className='u_searchicon'></Text>
            <Text className='j_searchbanner'>爱的艺术</Text>
          </View>
        </View>
        {/* 搜索板块end */}
        {/* 图片轮播 */}
        <View className='index_carousel'>
          <Swiper
            className='test-h'
            indicatorColor='#999'
            indicatorActiveColor='#333'
            circular
            indicatorDots
            autoplay={true}>
            {this.state.CarouselImg.map((item, index) => (
              <SwiperItem key={index}>
                <Image className='swiper-img' src={item.carouselImg}></Image>
              </SwiperItem>
            ))}
          </Swiper>
        </View>
        {/* 图片轮播end */}
        {/* 热门推荐 */}
        <View className='index_recommend'>
          <View className='index_recommend_content'>
            <View className='content_hot'>
              <Image className='hot_img' src={hotImg}></Image>
              <Text className='hot_title'>热门推荐</Text>
            </View>
            <View className='recommend_list'>
              {
                this.state.HotImg.map((item, index) => (
                  <View className='recommend_item' key={index}>
                    <Image className='item_img' src={item.img1}></Image>
                    <View className='item_name'>{item.commodityName}</View>
                    <Text className='item_price'>¥{item.price}</Text>
                  </View>
                ))
              }
            </View>
          </View>
        </View>
        {/* 热门推荐end */}
        {/* 为你推荐 */}
        <View className='foryou'>
          <View className='foryou_img'>
            <Image className='foryou_imgs' src={foryouImg}></Image>
          </View>
          <View className='foryou_list'>
            {
              this.state.Recommend ?
                this.state.Recommend.map((item, index) => (
                  <View className='foryou_item' key={index} onClick={()=>this.toDetail(item.commodityId)}>
                    <View className='foryou_top'>
                      <View className='top_touxiang'>
                        <Image className='top_touxiang_img' src={item.avatarurl}></Image>
                      </View>
                      <View className='top_username'>{item.nickname}</View>
                      <View className='top_time'>{item.wxCommodity.createTime}</View>
                    </View>
                    <View className='foryou_sp_img'>
                      <Image className='sp_img_item' src={item.wxCommodity.img1}></Image>
                      <Image className='sp_img_item' src={item.wxCommodity.img2}></Image>
                      <Image className='sp_img_item' src={item.wxCommodity.img3}></Image>
                      <Image className='sp_img_item' src={item.wxCommodity.img4}></Image>
                      <Image className='sp_img_item' src={item.wxCommodity.img5}></Image>
                    </View>
                    <View className='foryou_sp_price'>
                      <View className='price_rmb'>¥{item.wxCommodity.price}</View>
                      <View className='sp_want'>2人想要</View>
                    </View>
                    <View className='foryou_sp_title'>
                      {item.wxCommodity.commodityContent}
                    </View>
                  </View>
                )) : <Image src={loding} className='loding'></Image>
            }
            <Image src={loding} className={`loding loding_show`}></Image>
            <View className={`nomore ${this.state.noMore?'':'nomore_show'}`}>已经到底了...</View>
            {/* <View className='foryou_item'>
              <View className='foryou_top'>
                <View className='top_touxiang'>
                  <Image className='top_touxiang_img' src={hotImg}></Image>
                </View>
                <View className='top_username'>小甜甜</View>
                <View className='top_time'>2020/3/2</View>
              </View>
              <View className='foryou_sp_img'>
                <Image className='sp_img_item' src={hotImg}></Image>
                <Image className='sp_img_item' src={hotImg}></Image>
                <Image className='sp_img_item' src={hotImg}></Image>
                <Image className='sp_img_item' src={hotImg}></Image>
                <Image className='sp_img_item' src={hotImg}></Image>
                <Image className='sp_img_item' src={hotImg}></Image>
                <Image className='sp_img_item' src={hotImg}></Image>

              </View>
              <View className='foryou_sp_price'>
                <View className='price_rmb'>¥588</View>
                <View className='sp_want'>2人想要</View>
              </View>
              <View className='foryou_sp_title'>
                APPLE 11 美国版本 64GB APPLE 11 美国版本 64GBAPPLE 11 美国版本 64GBAPPLE 11 美国版本 64GB
              </View>
            </View> */}
          </View>
        </View>
        {/* 为你推荐end */}
      </View>
    )
  }
}
