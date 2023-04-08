import {View, Text, Pressable} from 'react-native';
import React from 'react';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import {APP_COLORS} from '../../../../constants/colors';
import {
  btnWithBgContainerStyles,
  viewFlexSpace,
} from '../../../../constants/styles';
import {INavigationProp} from '../../../../../interfaces';

const NotLoggedIn = ({navigation}: INavigationProp) => {
  return (
    <View>
      <View style={{marginVertical: 15}}>
        <Pressable onPress={() => navigation.navigate('HelpAndSupport')}>
          <View style={[viewFlexSpace, {marginVertical: 10}]}>
            <Icon3
              name="help-circle-outline"
              size={25}
              color={APP_COLORS.BLACK}
            />
            <Text
              style={{
                color: APP_COLORS.TEXT_GRAY,
                flex: 1,
                marginHorizontal: 10,
              }}>
              Help&Support
            </Text>
            <Icon2 name="right" size={25} color={APP_COLORS.TEXT_GRAY} />
          </View>
        </Pressable>
      </View>
      <Pressable
        onPress={() => navigation.navigate('Login')}
        style={{marginBottom: 15}}>
        <View style={[btnWithBgContainerStyles]}>
          <Icon3 name="login" size={25} color={APP_COLORS.WHITE} />
          <Text style={{flex: 1, marginLeft: 10, color: APP_COLORS.WHITE}}>
            Sign in
          </Text>
        </View>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Register')}>
        <View style={[btnWithBgContainerStyles]}>
          <Icon2 name="adduser" size={25} color={APP_COLORS.WHITE} />
          <Text style={{flex: 1, marginLeft: 10, color: APP_COLORS.WHITE}}>
            Sign up
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default NotLoggedIn;
