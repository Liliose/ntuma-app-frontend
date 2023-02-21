import {View, Text, Pressable, InputAccessoryView} from 'react-native';
import React from 'react';
import {RootState} from '../../../../reducers';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon4 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import {APP_COLORS} from '../../../../constants/colors';
import {viewFlexCenter, viewFlexSpace} from '../../../../constants/styles';
import {INavigationProp} from '../../../../../interfaces';
import {resetUser} from '../../../../actions/user';
import {resetCart} from '../../../../actions/cart';
import {resetMarkets} from '../../../../actions/markets';

const LoggedIn = ({navigation}: INavigationProp) => {
  const dispatch = useDispatch();
  const {image, names, email, phone} = useSelector(
    (state: RootState) => state.user,
  );
  return (
    <View>
      <View style={[viewFlexCenter, {flexDirection: 'column'}]}>
        <View
          style={[
            {
              width: 120,
              height: 120,
              borderRadius: 100,
              position: 'relative',
              backgroundColor: APP_COLORS.MAROON,
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <Icon2 name="user" size={50} color={APP_COLORS.WHITE} />
          <View
            style={{
              position: 'absolute',
              right: 0,
              marginTop: 60,
              marginRight: -25,
            }}>
            <View
              style={{
                backgroundColor: APP_COLORS.DARK_GRAY,
                borderRadius: 100,
                padding: 5,
              }}>
              <Icon name="edit" size={30} color={APP_COLORS.BLACK} />
            </View>
          </View>
        </View>
        <Text
          style={{
            marginTop: 5,
            fontWeight: '700',
            fontSize: 20,
            color: APP_COLORS.TEXT_GRAY,
          }}
          numberOfLines={1}>
          {names}
        </Text>
        <Text style={{marginTop: 5, color: APP_COLORS.TEXT_GRAY}}>{email}</Text>
        <Text style={{marginTop: 5, color: APP_COLORS.TEXT_GRAY}}>{phone}</Text>
      </View>
      <View style={{marginVertical: 15}}>
        <View style={[viewFlexSpace, {marginVertical: 10}]}>
          <Icon2 name="setting" size={25} color={APP_COLORS.BLACK} />
          <Text
            style={{
              color: APP_COLORS.TEXT_GRAY,
              flex: 1,
              marginHorizontal: 10,
            }}>
            Account Settings
          </Text>
          <Icon4 name="chevron-right" size={25} color={APP_COLORS.TEXT_GRAY} />
        </View>
        <View style={[viewFlexSpace, {marginVertical: 10}]}>
          <Icon2 name="wallet" size={25} color={APP_COLORS.BLACK} />
          <Text
            style={{
              color: APP_COLORS.TEXT_GRAY,
              flex: 1,
              marginHorizontal: 10,
            }}>
            My Wallet
          </Text>
          <Icon4 name="chevron-right" size={25} color={APP_COLORS.TEXT_GRAY} />
        </View>
        <View style={[viewFlexSpace, {marginVertical: 10}]}>
          <Icon3 name="history" size={25} color={APP_COLORS.BLACK} />
          <Text
            style={{
              color: APP_COLORS.TEXT_GRAY,
              flex: 1,
              marginHorizontal: 10,
            }}>
            Order History
          </Text>
          <Icon4 name="chevron-right" size={25} color={APP_COLORS.TEXT_GRAY} />
        </View>
        <Pressable
          style={{marginVertical: 10}}
          onPress={() => navigation.navigate('Locations')}>
          <View style={[viewFlexSpace]}>
            <Icon3 name="map-marker" size={25} color={APP_COLORS.BLACK} />
            <Text
              style={{
                color: APP_COLORS.TEXT_GRAY,
                flex: 1,
                marginHorizontal: 10,
              }}>
              Saved Location
            </Text>
            <Icon4
              name="chevron-right"
              size={25}
              color={APP_COLORS.TEXT_GRAY}
            />
          </View>
        </Pressable>
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
          <Icon4 name="chevron-right" size={25} color={APP_COLORS.TEXT_GRAY} />
        </View>
      </View>
      <Pressable
        onPress={() => {
          dispatch(resetUser());
          dispatch(resetCart());
          //   dispatch(resetMarkets());
        }}>
        <View style={[viewFlexSpace]}>
          <Icon3 name="logout" size={25} color={APP_COLORS.MAROON} />
          <Text style={{flex: 1, marginLeft: 10, color: APP_COLORS.MAROON}}>
            Signout
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default LoggedIn;
