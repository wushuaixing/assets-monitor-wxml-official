import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Textarea, View} from '@tarojs/components'
import {AtTextarea, AtImagePicker, AtButton} from 'taro-ui'
import './index.scss'
import Taro from "@tarojs/taro";
import {base} from '../../../utils/config'

type isState = {
  value: string,
  files: any,
  fileList: any,
}

type IProps = {
  count: number,
  dispatch: ({type: string, payload: object}) => {
    then(param: (result) => void): any;
  },
};
const Message = title => Taro.showToast({title, icon: 'none'});
@connect(({user}) => ({user}))
export default class FeedBack extends Component<IProps, isState> {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      files: [],
      fileList: []
    };
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

  onTextAreaChange = (e) => {
    this.setState({
      value:e.detail.value
    })
  }

  onImgChange = (files) => {
    this.setState({
      fileList: [],
      files
    })
    const that = this;
    for (var i = 0; i < files.length; i++) {
      Taro.uploadFile({
        url: `${base}/yc/file/upload`,
        filePath: files[i].url,
        name: 'file',
        header: {
          'Content-Type': 'multipart/form-data',
          'Authorization': Taro.getStorageSync("token"),
        },
        formData: {
          method: 'POST',
        },
        success(res) {
          that.onHandleChange(res)
        }
      })
    }
  }

  onHandleChange = (res) => {
    const dataSource = JSON.parse(res.data);
    const {fileList} = this.state;
    if (dataSource.code === 200) {
      this.setState({
        fileList: fileList.concat(dataSource.data)
      })
    }
  }


  onSubmit = () => {
    const {value, fileList} = this.state;
    if (value !== '' || fileList.length !== 0) {
      const params = {
        fileList,
        suggestion: value
      }
      this.props.dispatch({
        type: 'user/getAdvice',
        payload: {...params},
      }).then(res => {
        const {code, message} = res;
        if (code === 200) {
          Message('意见反馈成功');
          setTimeout(() => {
            Taro.navigateBack({
              delta: 1
            })
          }, 800)
        } else {
          Message(message || '意见反馈失败');
        }
      }).catch(() => {
        Message('网络异常请稍后再试！')
      })
    } else {
      Message('反馈意见不能为空');
    }
  }

  render() {
    const {value, files} = this.state;
    return (
      <View className='yc-feedBack'>
        <View className='yc-feedBack-top'/>
        <View className='yc-feedBack-content'>
          <View className='yc-feedBack-content-idea'>
            <View className='yc-feedBack-content-idea-text'>请提出您宝贵的意见</View>
            <View style={{position: 'relative'}} className='yc-feedBack-content-idea-textarea'>
              <Textarea
                style={{width:'100%',fontSize:'32rpx',color:'#333',lineHeight:'48rpx',minHeight:'240rpx'}}
                autoHeight
                placeholder='您的意见，是我们改进的动力！'
                value={value}
                maxlength={150}
                onInput={this.onTextAreaChange}
              />
              <View className='yc-feedBack-content-idea-number'>{value.length}/150</View>
              {/*<AtTextarea*/}
              {/*  value={value}*/}
              {/*  onChange={this.onTextAreaChange}*/}
              {/*  maxLength={150}*/}
              {/*  placeholder='您的意见，是我们改进的动力！'*/}
              {/*  count={false}*/}
              {/*/>*/}
              {/*<View className='at-textarea__counter' style={{position: 'absolute', bottom: '18rpx', right: '18rpx'}}>*/}
              {/*  {value.length}/150*/}
              {/*</View>*/}
            </View>
          </View>
          <View className='yc-feedBack-content-image'>
            <View className='yc-feedBack-content-image-text'>上传图片(可选)</View>
            <AtImagePicker
              count={4 - files.length}
              showAddBtn={files.length < 4}
              multiple
              files={files}
              onChange={this.onImgChange}
            />
          </View>
        </View>
        <View className='yc-feedBack-bottom'>
          <View className='yc-feedBack-bottom-text'>
            我们会尽快处理您的反馈。
            <View>您还可以拨打客服电话133-7256-7936来提出意见和建议。</View>
          </View>
          <View className='yc-feedBack-bottom-btn' onClick={this.onSubmit}>
            {/*<AtButton type='primary' onClick={this.onSubmit}>提交反馈</AtButton>*/}
            <View className='yc-feedBack-bottom-btn-text'>提交反馈</View>
          </View>
        </View>
      </View>
    )
  }
}
