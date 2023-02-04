import {View, Text, Image, Dimensions, TouchableOpacity} from 'react-native';
import React from 'react';
import {APP_COLORS} from '../../constants/colors';
import {
  commonButtonWithBackgroundContainerStyles,
  commonButtonWithBackgroundTextStyles,
  viewFlexCenter,
} from '../../constants/styles';
import FitImage from 'react-native-fit-image';
import {INavigationProp} from '../../../interfaces';
const {width, height} = Dimensions.get('window');
const Welcome = ({navigation}: INavigationProp) => {
  return (
    <View style={{flex: 1, backgroundColor: APP_COLORS.MAROON}}>
      <View>
        <View style={[viewFlexCenter]}>
          <Image
            source={require('../../assets/woman.png')}
            style={{width: width - 50, height: undefined, aspectRatio: 1}}
            resizeMode="contain"
          />
        </View>
      </View>
      <View
        style={{
          height: height - 200,
          backgroundColor: APP_COLORS.WHITE,
          borderTopRightRadius: 50,
          borderTopLeftRadius: 50,
          padding: 50,
        }}>
        <Text
          style={{
            color: APP_COLORS.BLACK,
            fontWeight: '700',
            marginTop: 30,
            fontSize: 35,
          }}>
          Order & Lets eat Healthy{' '}
          <Text style={{color: APP_COLORS.MAROON}}>Food</Text>
        </Text>
        <Text style={{marginTop: 10, color: APP_COLORS.BLACK}}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SelectMarket')}>
          <View
            style={[
              commonButtonWithBackgroundContainerStyles,
              {marginTop: 25},
            ]}>
            <Text style={[commonButtonWithBackgroundTextStyles]}>
              Get Started
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Welcome;
