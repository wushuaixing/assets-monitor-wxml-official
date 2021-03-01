import React, {Component} from 'react'
import {Text, View} from '@tarojs/components'
import {AtInput} from 'taro-ui'
import './index.scss'

export default class SearchInput extends Component {


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

  handleChange = (value) => {
    const {handleChange} = this.props;
    if (handleChange) handleChange(value)
  }

  onRemoveClick = () => {
    const {onRemoveClick} = this.props;
    if (onRemoveClick) onRemoveClick()
  }

  render() {
    const {searchValue, current} = this.props;
    const placeholderText = current ? '请输入债务人名称' : '请输入业务编号或业务中的债务人姓名';
    return (
      <View className='yc-monitorManage-top-search'>
        <Text className="iconfont icon-icon-monitorManage-search yc-monitorManage-top-search-icon"/>
        <View className='yc-monitorManage-top-search-input'>
          <AtInput
            name='value'
            title=''
            type='text'
            placeholder={placeholderText}
            value={searchValue}
            onChange={this.handleChange}
            border={false}
          />
        </View>
        {
          searchValue !== "" ?
            <Text className="iconfont icon-remove yc-monitorManage-top-search-removeIcon"
                  onClick={this.onRemoveClick}/> :
            null
        }

      </View>
    )
  }
}
