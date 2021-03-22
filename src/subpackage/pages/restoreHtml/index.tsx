import React, {Component} from 'react'
import './index.scss'
import {View, RichText, Image, Text} from "@tarojs/components";
import  networkFailed from '../../../assets/img/page/networkLoadFailed.png'
import NavigationBar from "../../../components/navigation-bar";

import {getWritRestore} from '../../../services/monitorManage'

import Taro from "@tarojs/taro";

type isState = {
  nodes: any;
  pid:any;
  sourceId:any;
  requestFailed:boolean
}


export default class User extends Component<any, isState> {
  constructor(props) {
    super(props);
    this.state = {
      nodes:'',
      pid:'',
      sourceId:'',
      requestFailed:false
    };
  }


  onLoad(options){
    const _this = Taro.getCurrentInstance().page;
    const eventChannel = _this.getOpenerEventChannel();
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', (detail) => {
      const {pid,sourceId} =  detail
      this.handleReuqestHtml(pid, sourceId);
    })
  }

  handleReuqestHtml = (pid, sourceId) => {
    getWritRestore({pid,sourceId}).then((res)=>{
      if(res.code == 200){
        let {data} = res
        console.log('请求的数据',data)
        //过滤符号↵，图片img,表格table,处理/div>,div>,"<"
        data = data.replace(/↵/g,"").replace(/\<img/gi, '<img class="rich-img" ').replace(/\<table/gi, '<table class="rich-table" ').replace(/\/div>/g,'</div>').replace(/div>/g,'</div>').replace(/<<\/<\/div>/g,'</div>');
        let reg = /<body[^>]*>([\s\S]+?)<\/body>/i;//过滤body标签
        let currentStr = reg.exec(data);
        if (currentStr) {
          console.log('if 111',this.state.nodes, data)
          currentStr = currentStr[1];
          currentStr = currentStr.replace(/\<div/gi, '<div class="rich-div" ');
          console.log('if ==currentStr',currentStr,)
          this.setState({
            nodes:currentStr
          })
        }else {
          let text = data.replace(/\<div/gi, '<div class="rich-div" ');
          console.log('else ==text',text)
          this.setState({
            nodes:text
          })
        }
      }else {
        console.log('正在加载')
        this.setState({
          requestFailed:true
        })
      }
    }).catch((error)=>{
      console.log(error)
    })
  }

  render() {
    const  {nodes,requestFailed} = this.state
    return (
      <View className='writDetails'>
        <NavigationBar  title='文书详情' border></NavigationBar>
        {/*neworkState请求成功与失败条件渲染*/}
        {
          !requestFailed && <View className='writDetails-content'>
            <RichText  className='writDetails-content-text' nodes={nodes}></RichText>
          </View>
        }
        {
          requestFailed && <View className='writDetails-networkFailed'>
           <Image src={networkFailed} className='writDetails-networkFailed-img'></Image>
           <Text className='writDetails-networkFailed-text'>文书请求失败，请稍后尝试</Text>
         </View>
        }
      </View>
    )
  }
}

