import React, { Component } from 'react'
import {Image, View} from '@tarojs/components'
import { AtIcon,AtToast  } from 'taro-ui'
import AssetsImg from '../../assets/img/search/search_assetsLogo.png'
import AssetsBgImg from '../../assets/img/search/search_assets_bg.png'
import ErrorIcon from '../../assets/img/search/search_errorIcon.png'
import './index.scss'

type isState = {
  showErrorMessage:boolean
}
export default class Search extends Component<any, isState> {
  constructor(props: any) {
    super(props);
    this.state = {
      showErrorMessage:false
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onClick= () =>{
   this.setState({
     showErrorMessage:true
   })
  }

  render () {
    const {showErrorMessage} = this.state;
    return (
      <View className='yc-search'>
        <View className='yc-search-assets' onClick={this.onClick}>
          <Image src={AssetsBgImg} className='yc-search-assets-bgImg'/>
          <View className='yc-search-assets-content'>
            <Image src={AssetsImg} />
            <View className='yc-search-assets-content-text'>
              <View className='yc-search-assets-content-text-top'>资产线索</View>
              <View className='yc-search-assets-content-text-bottom'>个人/企业概况一手掌握</View>
            </View>
            <View className='yc-search-assets-content-icon'>
              <AtIcon value='chevron-right' size='24' color='#fff' />
            </View>
          </View>
        </View>
        {
          showErrorMessage && <AtToast isOpened text="即将上线，敬请关注" image={ErrorIcon} />
        }
      </View>
    )
  }
}
