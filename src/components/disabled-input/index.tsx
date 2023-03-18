import {View, Text, TextInput} from 'react-native';
import React from 'react';
import {commonInput} from '../../constants/styles';
import {APP_COLORS} from '../../constants/colors';

interface IDisabledInputProps {
  disabled?: boolean;
  placeholder?: string;
  onChangeText: any;
  style?: any;
  maxLength?: number;
  value: string;
}
const DisabledInput = (props: IDisabledInputProps) => {
  return (
    <>
      {props.disabled ? (
        <View
          style={
            props.style
              ? [
                  commonInput,
                  {backgroundColor: APP_COLORS.GRAY_BG},
                  {...props.style},
                ]
              : [commonInput, {backgroundColor: APP_COLORS.GRAY_BG}]
          }>
          <Text style={{color: APP_COLORS.TEXT_GRAY}}>{props.value}</Text>
        </View>
      ) : (
        <TextInput
          style={props.style ? [commonInput, {...props.style}] : [commonInput]}
          onChangeText={props.onChangeText}
          value={props.value}
          placeholder={props.placeholder}
          maxLength={props.maxLength}
        />
      )}
    </>
  );
};

export default DisabledInput;
