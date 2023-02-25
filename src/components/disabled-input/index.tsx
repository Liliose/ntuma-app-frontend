import {View, Text, TextInput} from 'react-native';
import React from 'react';
import {commonInput} from '../../constants/styles';
import {APP_COLORS} from '../../constants/colors';

interface IDisabledInputProps {
  disabled?: boolean;
  placeHolder?: string;
  onChangeText: any;
  styles?: any;
  value: string;
}
const DisabledInput = (props: IDisabledInputProps) => {
  return (
    <>
      {props.disabled ? (
        <View
          style={
            props.styles
              ? [
                  commonInput,
                  {backgroundColor: APP_COLORS.GRAY_BG},
                  {...props.styles},
                ]
              : [commonInput, {backgroundColor: APP_COLORS.GRAY_BG}]
          }>
          <Text style={{color: APP_COLORS.TEXT_GRAY}}>{props.value}</Text>
        </View>
      ) : (
        <TextInput
          style={
            props.styles ? [commonInput, {...props.styles}] : [commonInput]
          }
          onChangeText={props.onChangeText}
          value={props.value}
        />
      )}
    </>
  );
};

export default DisabledInput;
