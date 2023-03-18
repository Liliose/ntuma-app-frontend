import {View, Text} from 'react-native';
import React from 'react';
import {viewFlexCenter} from '../../constants/styles';
import {APP_COLORS} from '../../constants/colors';
import FastImage from 'react-native-fast-image';
interface INotFoundProps {
  title: string;
  textColor?: string;
  height?: number;
  lightImage?: boolean;
}
const NotFound = ({title, textColor, height, lightImage}: INotFoundProps) => {
  return (
    <View
      style={[
        viewFlexCenter,
        {flex: 1, height: height !== undefined ? height : '100%'},
      ]}>
      {lightImage ? (
        <FastImage
          source={require('../../assets/logo-white.png')}
          style={{width: 150, height: 150, opacity: 0.7}}
          resizeMode="contain"
        />
      ) : (
        <FastImage
          source={require('../../assets/logo.png')}
          style={{width: 150, height: 150}}
          resizeMode="contain"
        />
      )}
      <Text
        style={{
          marginTop: 10,
          color: textColor ? textColor : APP_COLORS.MAROON,
        }}>
        {title}
      </Text>
    </View>
  );
};

export default NotFound;
