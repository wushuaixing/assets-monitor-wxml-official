import React, {Component} from 'react'
import './index.scss'
import { View,RichText} from "@tarojs/components";
import NavigationBar from "../../../components/navigation-bar";

import {htmlApi} from  '../../../services/home'

import Taro from "@tarojs/taro";

type isState = {
  nodes: any;
  type:any;
  sourceId:any;
}


export default class User extends Component<any, isState> {
  constructor(props) {
    super(props);
    this.state = {
      nodes:'',
      type:'',
      sourceId:''
    };
  }
  //只在页面组件才会触发组件要通过事件监听方式,页面来回切换
  componentDidShow() {
    const  {type,sourceId} = this.state;
    console.log('页面显示',type,sourceId)
    htmlApi().then((res)=>{
      if(!res){
        return false
      }
      let  {htmlText} = res.data
      console.log(htmlText)

      //过滤符号↵，图片img,表格table
      htmlText = htmlText.replace(/↵/g,"").replace(/\<img/gi, '<img class="rich-img" ').replace(/\<table/gi, '<img class="rich-table" ');
      let reg = /<body[^>]*>([\s\S]+?)<\/body>/i;//过滤body标签
      let currentStr = reg.exec(htmlText);
      if (currentStr) {
        currentStr = currentStr[1];
        currentStr = currentStr.replace(/\<div/gi, '<div class="rich-div" ');
        this.setState({
          nodes:currentStr
        })
      }else {
        let text = htmlText.replace(/\<div/gi, '<div class="rich-div" ');
        this.setState({
          nodes:text
        })
      }
    }).catch((error)=>{
      console.log(error)
    })
  }

  onLoad(options){
    const _this = Taro.getCurrentInstance().page;
    const eventChannel = _this.getOpenerEventChannel();
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', (detail) => {
      console.log('detail', detail)
    })
  }

  render() {
    return (
      <View className='writDetails'>
        <NavigationBar  title='文书详情' type='gradient' color='white'></NavigationBar>
        <View className='writDetails-content'>
          <RichText  className='writDetails-content-text' nodes={this.state.nodes}></RichText>
        </View>
      </View>
    )
  }
}

