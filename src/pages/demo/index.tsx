import React, { Component } from 'react'
import Taro from '@tarojs/taro';
import {Text, View} from '@tarojs/components'
import VirtualList from '@tarojs/components/virtual-list'
import { connect } from 'react-redux';
import QueryDrop from '../../components/query-drop/index';

function buildData (offset = 0) {
  return Array(10).fill(0).map((_, i) => i + offset);
}

const Row = React.memo(({ id, index, style, data }: {id: string, index: number, style: object, data: []}) => {
  return (
    <View id={id} className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} style={style ? style: { height: index % 2 ? 100 : 110 }}>
      {
        index % 2 && <View>this is new view</View>
      }
      <Text> Row {index} : {data[index]} </Text>
    </View>
  );
});

interface IProps{
  count: number,
  dispatch: ({type: string, payload: object}) => {}
}

interface IState{
  data: [],
}

@connect(({ home }) => ({ ...home }))
class Demo extends Component <IProps, IState>{
  constructor(props: IProps) {
    super(props);
    this.state = {
      // @ts-ignore
      data: buildData(0),
      config: {
        "first" : {
          "title" : "拍卖日期",
          "type"  : "time",
          "field" : ["startStart", "startEnd"]
        },
        "second" : {
          "title" : "更新日期",
          "type"  : "time",
          "field" : ["updateTimeStart", "updateTimeEnd"]
        },
        "inquiry" : [
          {
            "title"       : "债务人",
            "placeholder" : "请输入债务人姓名/公司名",
            "type"        : "input",
            "field"       : "obligorName"
          },
          {
            "title"       : "信息标题",
            "placeholder" : "请输入信息标题",
            "type"        : "input",
            "field"       : "title"
          },
          {
            "title"       : "处置单位",
            "placeholder" : "请输入处置单位名称",
            "type"        : "input",
            "field"       : "court"
          },
          {
            "title"  : "拍卖状态",
            "type"   : "choose",
            "field"  : "status",
            "option" : [
              { "id" : 1, "label" : "不限", "value" : "" },
              { "id" : 2, "label" : "即将开始", "value" : 1 },
              { "id" : 3, "label" : "正在进行", "value" : 3 },
              { "id" : 4, "label" : "已成交", "value" : 5 },
              { "id" : 5, "label" : "已流拍", "value" : 7 },
              { "id" : 6, "label" : "中止", "value" : 9 },
              { "id" : 7, "label" : "撤回", "value" : 11 }
            ]
          },
          {
            "title" : "评估价（万元）",
            "type"  : "price",
            "field" : ["consultPriceStart", "consultPriceEnd"]
          }
        ]
      },
      readState: 0,
    };
    this.loading = false;
    this.params = {};
  }


  componentWillMount () { }

  componentDidMount () {
    // const { dispatch } = this.props;
    // dispatch({type: 'home/getJsSession', payload: {
    //   jsCode: '001exAFa12PDoA03K2Ga1hUlK72exAFX',
    //   }})
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  listReachBottom = () => {
    Taro.showLoading()
    // 如果 loading 与视图相关，那它就应该放在 `this.state` 里
    // 我们这里使用的是一个同步的 API 调用 loading，所以不需要
    this.loading = true;
    setTimeout(() => {
      const { data } = this.state;
      const arr = data.concat(buildData(data.length));
      console.log('arr ==== ', arr);
      this.setState({
        data: arr,
      }, () => {
        this.loading = false;
        Taro.hideLoading()
      })
    }, 1000)
  };


  render () {
    const { data, config } = this.state;
    const dataLen: number = data.length;
    const height: number = 580;
    const itemSize: number = 30;
    console.log('data === ', data);

    return (
      <View>
        <QueryDrop/>
        {/*{*/}
        {/*  <VirtualList*/}
        {/*    useIsScrolling={true}*/}
        {/*    className='List'*/}
        {/*    // unlimitedSize={true}*/}
        {/*    position={'relative'}*/}
        {/*    height={height}*/}
        {/*    width={'100%'}*/}
        {/*    itemData={data}*/}
        {/*    itemCount={dataLen}*/}
        {/*    itemSize={itemSize}*/}
        {/*    onScroll={({ scrollDirection, scrollOffset }) => {*/}
        {/*      const showNum: number = Math.ceil(height / itemSize) ;*/}
        {/*      const offsetHeight = (10 - showNum) * itemSize - 100;*/}
        {/*      console.log('scrollDirection === ', scrollDirection, scrollOffset, this.loading, showNum, offsetHeight);*/}
        {/*      if (*/}
        {/*        // 避免重复加载数据*/}
        {/*        !this.loading &&*/}
        {/*        // 只有往前滚动我们才触发*/}
        {/*        scrollDirection === 'forward' &&*/}
        {/*        // 5 = (列表高度 / 单项列表高度)*/}
        {/*        // 100 = 滚动提前加载量，可根据样式情况调整*/}
        {/*        scrollOffset > offsetHeight*/}
        {/*      ) {*/}
        {/*        this.listReachBottom()*/}
        {/*      }*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    {*/}
        {/*      Row*/}
        {/*    }*/}
        {/*  </VirtualList>*/}
        {/*}*/}
      </View>
    )
  }
}
export default Demo;

