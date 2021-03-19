import React, {Component} from 'react'
import {Text, View} from '@tarojs/components'
import TagGroup from "../../../../../components/tag-group";
import {isEmpty} from "../../../../../utils/tools/common";
import './index.scss'

type isState = {}

export default class BaseInfo extends Component<any, isState> {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  handleNumber = (obligorNumber) =>{
    if(obligorNumber){
      const number = obligorNumber.slice(0,6) +' ' + obligorNumber.slice(6,14) +' ' + obligorNumber.slice(14,);
      return number
    }
    return '--'
  }


  render() {
    const {obligorDetail = {}} = this.props;
    const buildArr = !isEmpty(obligorDetail) ? obligorDetail.usedName : [];
    const obligorNature = !isEmpty(obligorDetail) && obligorDetail.obligorNature;
    return (
      <View className='obligorDetail-baseInfo'>
        <View className='obligorDetail-baseInfo-line'/>
        <View className='obligorDetail-baseInfo-content'>
          <View className='obligorDetail-baseInfo-content-top'>
            <View className='obligorDetail-baseInfo-content-top-image'>{!isEmpty(obligorDetail) && obligorDetail.obligorName && obligorDetail.obligorName.slice(0, 4)}</View>
            {
              obligorNature === 2 ? (
                <View className='obligorDetail-baseInfo-content-top-info'>
                  <View
                    className='obligorDetail-baseInfo-content-top-info-text'>{!isEmpty(obligorDetail) && obligorDetail.obligorName || '--'}</View>
                  <View className='obligorDetail-baseInfo-content-top-info-content'>
                    <TagGroup
                      dishonestStatus={!isEmpty(obligorDetail) && obligorDetail.dishonestStatus}
                      bankruptcyStatus={!isEmpty(obligorDetail) && obligorDetail.bankruptcy}
                      limitHeightStatus={!isEmpty(obligorDetail) && obligorDetail.limitConsumption}
                      isAll
                      regStatus={!isEmpty(obligorDetail) && obligorDetail.regStatus}
                    />
                  </View>
                </View>
              ) : null
            }
            {
              obligorNature === 1 ? (
                <View className='obligorDetail-baseInfo-content-top-info'>
                  <View className='obligorDetail-baseInfo-content-top-info-personal'>
                    <View className='obligorDetail-baseInfo-content-top-info-personal-text'>{!isEmpty(obligorDetail) && obligorDetail.obligorName || '--'}</View>
                    <TagGroup
                      dishonestStatus={!isEmpty(obligorDetail) && obligorDetail.dishonestStatus}
                      limitHeightStatus={!isEmpty(obligorDetail) && obligorDetail.limitConsumption}
                    />
                  </View>
                  <View className='obligorDetail-baseInfo-content-top-info-personalNumber'>证件号：{!isEmpty(obligorDetail) && this.handleNumber(obligorDetail.obligorNumber) || '--'}</View>
                </View>
              ) :null
            }
          </View>
          {
            obligorNature === 2 && buildArr && buildArr.length > 0 ? (
              <View>
                <View className='obligorDetail-baseInfo-line'/>
                <View className='obligorDetail-baseInfo-content-bottom'>
                  <View className='obligorDetail-baseInfo-content-bottom-beforeName'>
                    <Text className="iconfont icon-link obligorDetail-baseInfo-content-bottom-beforeName-icon"/>
                    <View className='obligorDetail-baseInfo-content-bottom-beforeName-label'>曾用名：</View>
                    <View className='obligorDetail-baseInfo-content-bottom-beforeName-content'>
                      {
                        buildArr && buildArr.length > 0 && buildArr.map(i => {
                          return <View
                            className='obligorDetail-baseInfo-content-bottom-beforeName-content-value'>{i}</View>
                        })
                      }
                    </View>
                  </View>
                </View>
              </View>
            ) : null
          }
        </View>
      </View>
    )
  }
}
