import React, {Component} from 'react'
import {Text, View, Input} from '@tarojs/components'
import {Message} from "../../../utils/tools/common";
import './index.scss'

type isState = {
  curValue: string
}

type IProps = {};
export default class SearchInput extends Component<IProps, isState> {

  constructor(props) {
    super(props);
    this.state = {
      curValue: ''
    };
    this.searchValue = this.props.searchValue
  }


  componentWillMount() {
    console.log('componentWillMountthis.props',this.props)
    const {searchValue} = this.props;
    this.setState({
      curValue:searchValue
    })
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
    if (e.detail.value.length > 40) {
      Message('最长输入40个字')
    } else {
      const {handleChange} = this.props;
      const value = e.detail.value.slice(0, 40);
      if (handleChange) handleChange(value);
    }
    this.setState({
      curValue: e.detail.value.slice(0, 40)
    })
  }

  onRemoveClick = () => {
    const {onRemoveClick} = this.props;
    if (onRemoveClick) onRemoveClick()
  }

  render() {
    console.log('renderProps',this.props)
    console.log('renderThis',this)
    const {current} = this.props;
    const {curValue} = this.state;
    const placeholderText = current ? '请输入债务人名称' : '请输入业务编号或业务中的债务人姓名';
    return (
      <View className='yc-monitorManage-top-search'>
        <Text className="iconfont icon-icon-monitorManage-search yc-monitorManage-top-search-icon"/>
        <View className='yc-monitorManage-top-search-input'>
          <Input
            type='text'
            placeholder={placeholderText}
            value={curValue}
            onInput={this.handleChange}
          />
        </View>
        {
          curValue !== "" ?
            <Text className="iconfont icon-remove yc-monitorManage-top-search-removeIcon"
                  onClick={this.onRemoveClick}/> :
            null
        }

      </View>
    )
  }
}
