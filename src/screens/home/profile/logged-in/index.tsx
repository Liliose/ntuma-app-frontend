import {View, Text, Pressable, Alert} from 'react-native';
import React, {useState} from 'react';
import {RootState} from '../../../../reducers';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon4 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import {APP_COLORS} from '../../../../constants/colors';
import {viewFlexCenter, viewFlexSpace} from '../../../../constants/styles';
import {INavigationProp, TOAST_MESSAGE_TYPES} from '../../../../../interfaces';
import {resetUser, setUserImage} from '../../../../actions/user';
import {resetCart} from '../../../../actions/cart';
import {resetMarkets} from '../../../../actions/markets';
import {resetLocations} from '../../../../actions/locations';
import {resetFavourites} from '../../../../actions/favourites';
import {resetOrders} from '../../../../actions/orders';
import DocumentPicker from 'react-native-document-picker';
import {app} from '../../../../constants/app';
import {toastMessage} from '../../../../helpers';
import ImageLoader from '../../../../components/image-loader';
import FullPageLoader from '../../../../components/full-page-loader';

const LoggedIn = ({navigation}: INavigationProp) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const {image, names, email, phone, token} = useSelector(
    (state: RootState) => state.user,
  );

  const handleLogout = () => {
    dispatch(resetUser());
    dispatch(resetCart());
    dispatch(resetFavourites());
    dispatch(resetOrders());
  };

  const confirmLogout = () => {
    Alert.alert(
      'confirmation',
      'Do you want to logout from your account?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'confirm',
          onPress: () => handleLogout(),
        },
      ],
      {cancelable: true},
    );
  };

  const handleDocumentSelect = async () => {
    try {
      const results = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
        allowMultiSelection: false,
      });
      const doc = {
        uri: results?.uri,
        type: results?.type,
        name: results?.name,
      };
      const formData = new FormData();
      formData.append('file', doc);
      setIsLoading(true);
      const url = app.BACKEND_URL + '/users/image/';
      var xhr = new XMLHttpRequest();
      xhr.open('PUT', url);
      xhr.onload = function () {
        setIsLoading(false);
        try {
          const response = JSON.parse(xhr.response);
          if (xhr.status === 200) {
            const {image} = response;
            dispatch(setUserImage(image));
          } else {
            toastMessage(TOAST_MESSAGE_TYPES.ERROR, response.msg);
          }
        } catch (error) {
          toastMessage(TOAST_MESSAGE_TYPES.ERROR, xhr.response);
        }
      };
      xhr.setRequestHeader('token', token);
      xhr.send(formData);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

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
          {image?.trim().length === 0 ? (
            <Icon2 name="user" size={50} color={APP_COLORS.WHITE} />
          ) : (
            <ImageLoader
              url={app.FILE_URL + image}
              height={120}
              width={120}
              style={{borderRadius: 100}}
              showLoader={true}
              loaderStyle={{color: APP_COLORS.WHITE}}
            />
          )}
          <View
            style={{
              position: 'absolute',
              right: 0,
              marginTop: 60,
              marginRight: -25,
              zIndex: 2,
            }}>
            <Pressable onPress={() => handleDocumentSelect()}>
              <View
                style={{
                  backgroundColor: APP_COLORS.DARK_GRAY,
                  borderRadius: 100,
                  padding: 5,
                }}>
                <Icon name="edit" size={30} color={APP_COLORS.BLACK} />
              </View>
            </Pressable>
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
        <Pressable
          onPress={() => navigation.navigate('AccountSettings')}
          style={{marginVertical: 10}}>
          <View style={[viewFlexSpace]}>
            <Icon2 name="setting" size={25} color={APP_COLORS.BLACK} />
            <Text
              style={{
                color: APP_COLORS.TEXT_GRAY,
                flex: 1,
                marginHorizontal: 10,
              }}>
              Account Settings
            </Text>
            <Icon4
              name="chevron-right"
              size={25}
              color={APP_COLORS.TEXT_GRAY}
            />
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Wallet')}>
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
            <Icon4
              name="chevron-right"
              size={25}
              color={APP_COLORS.TEXT_GRAY}
            />
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Orders')}>
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
            <Icon4
              name="chevron-right"
              size={25}
              color={APP_COLORS.TEXT_GRAY}
            />
          </View>
        </Pressable>
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
            <Icon4
              name="chevron-right"
              size={25}
              color={APP_COLORS.TEXT_GRAY}
            />
          </View>
        </Pressable>
      </View>
      <Pressable onPress={() => confirmLogout()}>
        <View style={[viewFlexSpace]}>
          <Icon3 name="logout" size={25} color={APP_COLORS.MAROON} />
          <Text style={{flex: 1, marginLeft: 10, color: APP_COLORS.MAROON}}>
            Signout
          </Text>
        </View>
      </Pressable>
      <FullPageLoader isLoading={isLoading} />
    </View>
  );
};

export default LoggedIn;
