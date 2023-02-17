import {View, Text} from 'react-native';
import React from 'react';
import {APP_COLORS} from '../../constants/colors';
import {viewFlexCenter} from '../../constants/styles';
import Icon from 'react-native-vector-icons/Feather';

interface ICheckedCircleProps {
  countNumber: number;
  isChecked: boolean;
}
const CheckedCircle = ({countNumber, isChecked}: ICheckedCircleProps) => {
  return (
    <View
      style={[
        viewFlexCenter,
        {
          width: 30,
          height: 30,
          backgroundColor: isChecked ? APP_COLORS.MAROON : APP_COLORS.BLACK,
          borderRadius: 100,
          marginRight: 5,
        },
      ]}>
      {isChecked ? (
        <Icon name="check" size={25} color={APP_COLORS.WHITE} />
      ) : (
        <Text style={{color: APP_COLORS.WHITE}}>{countNumber}</Text>
      )}
    </View>
  );
};

export default CheckedCircle;
