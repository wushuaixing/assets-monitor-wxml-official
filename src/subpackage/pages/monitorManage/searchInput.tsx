import React, {Component} from 'react'
import {Text, View, Input} from '@tarojs/components'
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

  handleChange = (e) => {
    console.log('value', e)
    const {handleChange} = this.props;
    if (handleChange) handleChange(e.detail.value)
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
          <Input
            type='text'
            placeholder={placeholderText}
            value={searchValue}
            onInput={this.handleChange}
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
