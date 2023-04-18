import {View, Text, Pressable} from 'react-native';
import React from 'react';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import {APP_COLORS} from '../../../../constants/colors';
import Icon5 from 'react-native-vector-icons/FontAwesome';
import {
  btnWithBgContainerStyles,
  viewFlexSpace,
} from '../../../../constants/styles';
import {INavigationProp} from '../../../../../interfaces';
import {t} from 'i18next';

const NotLoggedIn = ({navigation}: INavigationProp) => {
  return (
    <View>
      <View style={{marginVertical: 15}}>
        <Pressable onPress={() => navigation.navigate('HelpAndSupport')}>
          <View style={[viewFlexSpace, {marginVertical: 10}]}>
            <Icon3
              name="help-circle-outline"
              size={20}
              color={APP_COLORS.BLACK}
            />
            <Text
              style={{
                color: APP_COLORS.TEXT_GRAY,
                flex: 1,
                marginHorizontal: 10,
              }}>
              {t('helpAndSupportText')}
            </Text>
            <Icon2 name="right" size={20} color={APP_COLORS.TEXT_GRAY} />
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('ChangeLanguage')}>
          <View style={[viewFlexSpace, {marginVertical: 10}]}>
            <Icon5 name="exchange" size={25} color={APP_COLORS.BLACK} />
            <Text
              style={{
                color: APP_COLORS.TEXT_GRAY,
                flex: 1,
                marginHorizontal: 10,
              }}>
              {t('changeLanguageText')}
            </Text>
            <Icon2 name="right" size={20} color={APP_COLORS.TEXT_GRAY} />
          </View>
        </Pressable>
      </View>
      <Pressable
        onPress={() => navigation.navigate('Login')}
        style={{marginBottom: 15}}>
        <View style={[btnWithBgContainerStyles]}>
          <Icon3 name="login" size={25} color={APP_COLORS.WHITE} />
          <Text style={{flex: 1, marginLeft: 10, color: APP_COLORS.WHITE}}>
            {t('signinText')}
          </Text>
        </View>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Register')}>
        <View style={[btnWithBgContainerStyles]}>
          <Icon2 name="adduser" size={25} color={APP_COLORS.WHITE} />
          <Text style={{flex: 1, marginLeft: 10, color: APP_COLORS.WHITE}}>
            {t('signupText')}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default NotLoggedIn;
