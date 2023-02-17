import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {APP_COLORS} from '../../../constants/colors';
import {
  btnWithBgContainerStyles,
  btnWithBgTextStyles,
  viewFlexSpace,
} from '../../../constants/styles';
import Icon from 'react-native-vector-icons/Entypo';

const Payment = () => {
  const handleNext = () => {};
  return (
    <View
      style={[
        viewFlexSpace,
        {
          padding: 10,
          flexDirection: 'column',
          alignItems: 'flex-start',
          flex: 1,
        },
      ]}>
      <View>
        <Text style={{color: APP_COLORS.BLACK, fontSize: 20}}>
          Choose payment method
        </Text>
        <Text style={{color: APP_COLORS.TEXT_GRAY}}>
          You will not be charged until you review and submit this order on the
          next page.
        </Text>
      </View>
      <Pressable style={{width: '100%'}} onPress={() => handleNext()}>
        <View style={[btnWithBgContainerStyles]}>
          <Text style={[btnWithBgTextStyles, {alignItems: 'center'}]}>
            Continue
          </Text>
          <Icon name="chevron-small-right" size={30} color={APP_COLORS.WHITE} />
        </View>
      </Pressable>
    </View>
  );
};

export default Payment;
