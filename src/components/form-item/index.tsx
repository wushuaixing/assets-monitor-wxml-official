import React, {FC, useState} from "react";
import {Text, View} from "@tarojs/components";
import { AtInput } from 'taro-ui';
import './index.scss';

type IProps = {
  type: string,
  field: any,
  label?: string,
  placeholder?: string,
  requird?: boolean
  onChange?: () => void
}

// FC就是FunctionComponent的缩写，是函数组件
const FormItem: FC<IProps> = (props) => {
  const { type, field, label, placeholder, requird, onChange, options } = props;
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e);
    onChange(props, e);
  };

  return(
    <View>
      {
        type === 'input' ? <AtInput
          required={requird}
          name={field}
          title={label}
          type='text'
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleChange(e)}
        /> : null
      }
      {
        type === 'choose' ? <View className='choose'>
          <View>{label}</View>
          <View className='choose-box'>
            {
              options.map(item => {
                return(
                  <Text className='choose-box-value'>{item.label}</Text>
                )
              })
            }
          </View>
        </View> : null
      }
    </View>
  )
};

export default FormItem;
