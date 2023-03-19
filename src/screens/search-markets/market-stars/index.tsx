import {View, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {viewFlexCenter} from '../../../constants/styles';
import {APP_COLORS} from '../../../constants/colors';
const MarketStars = () => {
  return (
    <View
      style={[
        viewFlexCenter,
        {
          flexDirection: 'row',
          justifyContent: 'flex-start',
          marginVertical: 10,
        },
      ]}>
      <Text style={{fontSize: 15, marginRight: 5}}>0.0</Text>
      <Icon name="star-o" color={APP_COLORS.BLACK} size={15} />
      <Icon name="star-o" color={APP_COLORS.BLACK} size={15} />
      <Icon name="star-o" color={APP_COLORS.BLACK} size={15} />
      <Icon name="star-o" color={APP_COLORS.BLACK} size={15} />
      <Icon name="star-o" color={APP_COLORS.BLACK} size={15} />
    </View>
  );
};

export default MarketStars;
