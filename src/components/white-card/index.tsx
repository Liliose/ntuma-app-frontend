import {View, ViewStyle} from 'react-native';
import React from 'react';

interface IWhiteCardProps {
  children: JSX.Element[] | JSX.Element;
  style?: ViewStyle;
}
const WhiteCard = (props: IWhiteCardProps) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        borderRadius: 10,
        ...props.style,
      }}>
      {props.children}
    </View>
  );
};

export default WhiteCard;
