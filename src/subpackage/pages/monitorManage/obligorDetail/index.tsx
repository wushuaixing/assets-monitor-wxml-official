import React, {Component} from 'react'
import {connect} from 'react-redux';
import {ScrollView, View} from '@tarojs/components'
import NavigationBar from "../../../../components/navigation-bar";
import BaseInfo from './baseInfo';
import RelationBusiness from './relationBusiness';
import AssetsRisk from "./assetsRisk";
import Taro, {eventCenter, getCurrentInstance} from "@tarojs/taro";
import {arraySum, isEmpty, handleDealAuthRule, isRule} from "../../../../utils/tools/common";
import './index.scss'
import {getGlobalData, setGlobalData} from "../../../../utils/const/global";

type isState = {
  scrollHeight: number,
  obligorDetail: {
    obligorNature: number
  },
  relationBusiness: any,
  assetsData: any,
  riskData: any,
}

type IProps = {
  dispatch: ({type: string, payload: object}) => {
    then(param: (result) => void): any;
  },
};
@connect(({monitorManage}) => ({monitorManage}))
export default class ObligorDetail extends Component<IProps, isState> {
  $instance = getCurrentInstance();

  constructor(props) {
    super(props);
    this.state = {
      scrollHeight: 0,
      obligorDetail: {
        obligorNature: 2
      },
      relationBusiness: [],
      assetsData: [],
      riskData: [],
    };
  }

  componentWillMount() {
    const {router: {params: {obligorId}}} = getCurrentInstance();
    Taro.showLoading({title: '加载中...'});
    const fetchs = ['getObligorDetail', 'getObligorRelation', 'getObligorAssetTotalCount', 'getObligorRiskTotalCountCount', 'getAuthRule'];
    const buildArr = fetchs.map(i => {
      return this.props.dispatch({
        type: `monitorManage/${i}`,
        payload: {obligorId}
      }).then((res) => {
        const {code, data} = res;
        if (code === 200) {
          return data
        }
        return null
      }).catch(() => {
        return null
      })
    })
    Promise.all(buildArr).then((data) => {
      Taro.hideLoading();
      setGlobalData('ruleArray', data[4] ? handleDealAuthRule(data[4].orgPageGroups) : []);
      this.setState({
        obligorDetail: data[0] ? data[0] : {},
        relationBusiness: data[1] ? data[1] : [],
        assetsData: data[2] ? this.handleAssetsData(data[2]) : {},
        riskData: data[3] ? this.handleRiskData(data[3]) : {},
      })
    })
    const onReadyEventId = this.$instance.router.onReady;
    eventCenter.once(onReadyEventId, () => {
      let height = 0;
      Taro.getSystemInfo({
        success: (info) => {
          height = info.windowHeight;
          Taro.createSelectorQuery().select('#navBar')
            .boundingClientRect()
            .exec(res => {
              this.setState({
                scrollHeight: height - res[0].height
              })
            })
        }
      });
    });
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  handleAssetsData = (data) => {
    const buildData = [{}];
    if (!isEmpty(data)) {
      Object.keys(data).forEach(item => {
        // 代位权-开庭数量 dwq
        if (item === 'courtCount') {
          buildData.push({
            type: 'dwq',
            label: item,
            title: '代位权-开庭',
            icon: 'icon-subrogation',
            number: data[item] || 0,
            status: isRule("zcwjdwq")
          })
        }
        // 代位权-裁判文书数量 dwq
        if (item === 'judgementCount') {
          buildData.push({
            type: 'dwq',
            label: item,
            title: '代位权-裁判文书',
            icon: 'icon-subrogation',
            number: data[item] || 0,
            status: isRule("zcwjdwq")
          })
        }
        // 代位权-立案数量 dwq
        if (item === 'trialCount') {
          buildData.push({
            type: 'dwq',
            label: item,
            title: '代位权-立案',
            icon: 'icon-subrogation',
            number: data[item] || 0,
            status: isRule("zcwjdwq")
          })
        }
        // 资产拍卖数量 zcpm
        if (item === 'auctionCount') {
          buildData.push({
            type: 'zcpm',
            label: item,
            title: '资产拍卖',
            icon: 'icon-auction',
            number: data[item] || 0,
            status: isRule("zcwjzcpm")
          })
        }
      })
    }
    return buildData
  }

  handleRiskData = (data) => {
    const buildRiskData = [{}];
    if (!isEmpty(data)) {
      Object.keys(data).forEach(item => {
        // 破产重组数量 pccz
        if (item === 'bankruptCount') {
          buildRiskData.push({
            type: 'pccz',
            label: item,
            title: '破产重组',
            icon: 'icon-bankruptcy',
            number: data[item] || 0,
            status: isRule("fxjkqypccz")
          })
        }
        // 涉诉-开庭数量 ss
        if (item === 'courtCount') {
          buildRiskData.push({
            type: 'ss',
            label: item,
            title: '涉诉-开庭',
            icon: 'icon-litigation',
            number: data[item] || 0,
            status: isRule("fxjkssjk")
          })
        }
        // 涉诉-裁判文书数量 ss
        if (item === 'judgementCount') {
          buildRiskData.push({
            type: 'ss',
            label: item,
            title: '涉诉-裁判文书',
            icon: 'icon-litigation',
            number: data[item] || 0,
            status: isRule("fxjkssjk")
          })
        }
        // 涉诉-立案数量 ss
        if (item === 'trialCount') {
          buildRiskData.push({
            type: 'ss',
            label: item,
            title: '涉诉-立案',
            icon: 'icon-litigation',
            number: data[item] || 0,
            status: isRule("fxjkssjk")
          })
        }
      })
    }
    return buildRiskData
  }

  handleSumData = (curArr, data, curType, curTitle, curIcon) => {
    if (data && data.length > 0) {
      const dwqSum = arraySum(data.filter(i => i.type === curType && i.status), 'number')
      if (typeof (dwqSum) !== "undefined") {
        curArr.push({type: curType, title: curTitle, icon: curIcon, number: dwqSum})
      }
    }
    return curArr
  }

  render() {
    const {scrollHeight, relationBusiness, obligorDetail, assetsData, riskData} = this.state;
    const assetsArr = [];
    const riskArr = [];
    this.handleSumData(assetsArr, assetsData, 'zcpm', '司法拍卖', 'icon-auction'); // 司法拍卖总数量
    this.handleSumData(assetsArr, assetsData, 'dwq', '代位权', 'icon-subrogation'); // 代位权总数量
    this.handleSumData(riskArr, riskData, 'pccz', '破产重整', 'icon-bankruptcy'); // 破产重整总数量
    this.handleSumData(riskArr, riskData, 'ss', '涉诉信息', 'icon-litigation'); // 涉诉信息总数量
    return (
      <View className='yc-obligorDetail'>
        <NavigationBar title='债务人详情' obligorCustom='obligorCustom'/>
        <ScrollView scrollY style={{height: scrollHeight}}>
          <BaseInfo obligorDetail={obligorDetail}/>
          <View className='yc-obligorDetail-line'/>
          {
            relationBusiness && relationBusiness.length > 0 ? (
              <View>
                <RelationBusiness relationBusiness={relationBusiness}/>
                <View className='yc-obligorDetail-line'/>
              </View>
            ) : null
          }
          <AssetsRisk
            obligorNature={!isEmpty(obligorDetail) && obligorDetail.obligorNature}
            assetsArr={assetsArr}
            riskArr={riskArr}
          />
          <View className='yc-obligorDetail-line'/>
        </ScrollView>
      </View>
    )
  }
}
