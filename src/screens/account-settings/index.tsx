import {View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import {APP_COLORS} from '../../constants/colors';
import {viewFlexSpace} from '../../constants/styles';
import Icon from 'react-native-vector-icons/Entypo';
import {INavigationProp} from '../../../interfaces';

const AccountSettings = ({navigation}: INavigationProp) => {
  return (
    <View style={{flex: 1, backgroundColor: APP_COLORS.WHITE}}>
      <Pressable onPress={() => navigation.navigate('UpdateUserInfo')}>
        <View
          style={[
            viewFlexSpace,
            {
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: APP_COLORS.BORDER_COLOR,
            },
          ]}>
          <Text
            style={{
              flex: 1,
              marginHorizontal: 10,
              color: APP_COLORS.BLACK,
            }}>
            Update Personal Information
          </Text>
          <Icon name="chevron-right" size={25} color={APP_COLORS.TEXT_GRAY} />
        </View>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('ChangePassword')}>
        <View
          style={[
            viewFlexSpace,
            {
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: APP_COLORS.BORDER_COLOR,
            },
          ]}>
          <Text
            style={{
              flex: 1,
              marginHorizontal: 10,
              color: APP_COLORS.BLACK,
            }}>
            Change Password
          </Text>
          <Icon name="chevron-right" size={25} color={APP_COLORS.TEXT_GRAY} />
        </View>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('DeleteAccount')}>
        <View
          style={[
            viewFlexSpace,
            {
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: APP_COLORS.BORDER_COLOR,
            },
          ]}>
          <Text
            style={{
              flex: 1,
              marginHorizontal: 10,
              color: APP_COLORS.BLACK,
            }}>
            Delete Account
          </Text>
          <Icon name="chevron-right" size={25} color={APP_COLORS.TEXT_GRAY} />
        </View>
      </Pressable>
    </View>
  );
};

export default AccountSettings;
