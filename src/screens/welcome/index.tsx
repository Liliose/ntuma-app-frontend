import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useEffect} from 'react';
import {APP_COLORS} from '../../constants/colors';
import {
  btnWithBgContainerStyles,
  btnWithBgTextStyles,
  viewFlexCenter,
  viewFlexSpace,
} from '../../constants/styles';
import {INavigationProp} from '../../../interfaces';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
const {width, height} = Dimensions.get('window');
const Welcome = ({navigation}: INavigationProp) => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      changeNavigationBarColor('maroon');
    }
  }, []);
  return (
    <View
      style={[
        viewFlexSpace,
        {flex: 1, backgroundColor: APP_COLORS.MAROON, flexDirection: 'column'},
      ]}>
      <View style={{flex: 1, paddingTop: 50}}>
        <Text
          style={{color: APP_COLORS.WHITE, fontSize: 25, fontWeight: '600'}}>
          Ntuma App
        </Text>
      </View>
      <View
        style={{
          height: height - 290,
          backgroundColor: APP_COLORS.WHITE,
          borderTopRightRadius: 50,
          borderTopLeftRadius: 50,
          position: 'relative',
          padding: 50,
          width,
        }}>
        <View
          style={[
            viewFlexCenter,
            {position: 'absolute', top: -(width - 210), width},
          ]}>
          <Image
            source={require('../../assets/fruits.png')}
            style={{
              width: width - 100,
              height: width - 100,
            }}
            resizeMode="contain"
          />
        </View>
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
          Ntuma App, the fastest and most reliable delivery service in Rwanda!.
          With just a few taps, you can order a wide range of products and have
          them delivered straight to your doorstep.
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SelectMarket')}>
          <View style={[btnWithBgContainerStyles, {marginTop: 25}]}>
            <Text style={[btnWithBgTextStyles]}>Get Started</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Welcome;
