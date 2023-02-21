import {View, Text} from 'react-native';
import React from 'react';
import {viewFlexCenter} from '../../constants/styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {APP_COLORS} from '../../constants/colors';
interface INotFoundProps {
  title: string;
}
const NotFound = ({title}: INotFoundProps) => {
  return (
    <View style={[viewFlexCenter, {flex: 1}]}>
      <Icon name="sad-tear" size={50} color={APP_COLORS.MAROON} />
      <Text style={{marginTop: 10, color: APP_COLORS.MAROON}}>{title}</Text>
    </View>
  );
};

export default NotFound;
