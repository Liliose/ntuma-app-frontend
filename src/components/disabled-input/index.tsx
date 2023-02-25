import {View, Text, TextInput} from 'react-native';
import React from 'react';
import {commonInput} from '../../constants/styles';

interface IDisabledInputProps {
  desabled?: boolean;
  placeHolder?: string;
  onChangeText: any;
  styles?: any;
  value: string;
}
const DisabledInput = (props: IDisabledInputProps) => {
  return (
    <>
      {props.desabled ? (
        <View
          style={
            props.styles ? [commonInput, {...props.styles}] : [commonInput]
          }>
          <Text>{props.value}</Text>
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
