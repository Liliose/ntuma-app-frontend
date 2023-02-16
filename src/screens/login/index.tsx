import {
  View,
  Text,
  Dimensions,
  Image,
  TextInput,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {APP_COLORS} from '../../constants/colors';
import {
  btnWithBgContainerStyles,
  btnWithBgTextStyles,
  btnWithoutBgContainerStyles,
  btnWithoutBgTextStyles,
  commonInput,
  viewFlexCenter,
  viewFlexSpace,
} from '../../constants/styles';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {INavigationProp, TOAST_MESSAGE_TYPES} from '../../../interfaces';
import {errorHandler, toastMessage} from '../../helpers';
import axios from 'axios';
import {app} from '../../constants/app';
import {useDispatch} from 'react-redux';
import {
  setUserEmail,
  setUserId,
  setUserImage,
  setUserNames,
  setUserPhone,
  setUserRole,
  setUserToken,
  setUserWalletAmount,
} from '../../actions/user';

const {height} = Dimensions.get('window');
const initialState = {
  emailOrPhone: '',
  password: '',
};
const Login = ({navigation}: INavigationProp) => {
  const dispatch = useDispatch();
  const [state, setState] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (state.emailOrPhone.trim() === '' || state.password.trim() === '') {
      toastMessage(TOAST_MESSAGE_TYPES.ERROR, 'All fields are required');
      return;
    }
    setIsLoading(true);
    axios
      .post(app.BACKEND_URL + '/users/login/', {...state})
      .then(res => {
        setIsLoading(false);
        const {role, walletAmounts, userId, names, phone, image, email, token} =
          res.data;
        dispatch(setUserNames(names));
        dispatch(setUserRole(role));
        dispatch(setUserWalletAmount(walletAmounts));
        dispatch(setUserId(userId));
        dispatch(setUserPhone(phone));
        dispatch(setUserEmail(email));
        dispatch(setUserToken(token));
        dispatch(setUserImage(image));
        toastMessage(TOAST_MESSAGE_TYPES.SUCCESS, res.data.msg);
        navigation.replace('HomeTabs');
      })
      .catch(error => {
        setIsLoading(false);
        errorHandler(error);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: APP_COLORS.WHITE}}>
      <View style={[viewFlexSpace]}>
        <Image
          source={require('../../assets/imigongo.png')}
          style={{width: 10, height}}
        />
        <KeyboardAwareScrollView style={{flex: 1, height: '100%'}}>
          <ScrollView>
            <View style={{padding: 10}}>
              <View style={{marginVertical: 10}}>
                <Text
                  style={{
                    color: APP_COLORS.TEXT_GRAY,
                    fontWeight: '600',
                    fontSize: 16,
                  }}>
                  Email or Phone
                </Text>
                <TextInput
                  placeholder="Enter your phone or email address"
                  style={commonInput}
                  onChangeText={text =>
                    setState({...state, emailOrPhone: text})
                  }
                />
              </View>
              <View style={{marginVertical: 10}}>
                <Text
                  style={{
                    color: APP_COLORS.TEXT_GRAY,
                    fontWeight: '600',
                    fontSize: 16,
                  }}>
                  Password
                </Text>
                <TextInput
                  secureTextEntry={true}
                  placeholder="Enter your password"
                  style={commonInput}
                  onChangeText={text => setState({...state, password: text})}
                />
              </View>

              <Pressable
                disabled={isLoading}
                style={{marginVertical: 10}}
                onPress={() => handleSubmit()}>
                <View style={[btnWithBgContainerStyles]}>
                  {isLoading && (
                    <ActivityIndicator
                      color={APP_COLORS.WHITE}
                      style={{marginRight: 10}}
                    />
                  )}
                  <Text style={[btnWithBgTextStyles]}>Sign in</Text>
                </View>
              </Pressable>
              <Pressable
                disabled={isLoading}
                onPress={() => navigation.navigate('Register')}
                style={{marginVertical: 10}}>
                <View style={[btnWithoutBgContainerStyles]}>
                  <Text
                    style={[
                      btnWithoutBgTextStyles,
                      {color: APP_COLORS.MAROON},
                    ]}>
                    Sign up
                  </Text>
                </View>
              </Pressable>

              <View style={[viewFlexCenter, {marginTop: 20}]}>
                <Text style={{color: APP_COLORS.BLACK}}>Or Sign in with</Text>

                <View
                  style={{
                    marginVertical: 30,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderColor: APP_COLORS.DARK_GRAY,
                    borderWidth: 1,
                  }}>
                  <Image
                    source={require('../../assets/google.png')}
                    style={{width: 50}}
                    resizeMode="contain"
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default Login;
