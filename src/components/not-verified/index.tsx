import {View, Text, Pressable, Dimensions} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {INavigationProp} from '../../../interfaces';
import {APP_COLORS} from '../../constants/colors';

const {width} = Dimensions.get('window');
const NotVerified = ({navigation}: INavigationProp) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
      }}>
      <FastImage
        source={require('../../assets/error-black.gif')}
        style={{width: width / 2 + 50, height: width / 2 + 50}}
        resizeMode="contain"
      />
      <Text
        style={{
          color: APP_COLORS.MAROON,
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 16,
        }}>
        Your account is not yet verified.
      </Text>
      <Text style={{color: APP_COLORS.BLACK, textAlign: 'center'}}>
        Press on button bellow to check the details or contact admin for further
        information.
      </Text>
      <Pressable
        style={{marginTop: 20}}
        onPress={() => navigation.navigate('VerificationDetails')}>
        <View
          style={{
            backgroundColor: APP_COLORS.MAROON,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 10,
          }}>
          <Text style={{color: APP_COLORS.WHITE}}>Check Details</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default NotVerified;
