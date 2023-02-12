import {View, Text} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../reducers';
import NotLoggedIn from './not-logged-in';
import LoggedIn from './logged-in';
import {APP_COLORS} from '../../../constants/colors';
import {INavigationProp} from '../../../../interfaces';

const Profile = ({navigation}: INavigationProp) => {
  const {token} = useSelector((state: RootState) => state.user);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: APP_COLORS.WHITE,
        paddingVertical: 10,
        paddingHorizontal: 20,
      }}>
      {token.trim() === '' ? (
        <NotLoggedIn navigation={navigation} />
      ) : (
        <LoggedIn navigation={navigation} />
      )}
    </View>
  );
};

export default Profile;
