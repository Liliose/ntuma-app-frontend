import {
  View,
  Text,
  Dimensions,
  Image,
  TextInput,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
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

import {INavigationProp, TOAST_MESSAGE_TYPES} from '../../../interfaces';
import {errorHandler, toastMessage} from '../../helpers';
import axios from 'axios';
import {app} from '../../constants/app';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {
  saveAppToken,
  setUserEmail,
  setUserId,
  setUserImage,
  setUserNames,
  setUserPhone,
  setUserRole,
  setUserToken,
  setUserWalletAmount,
} from '../../actions/user';
import {useDispatch} from 'react-redux';

const {height} = Dimensions.get('window');
const initialState = {
  names: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
};
const Register = ({navigation}: INavigationProp) => {
  const dispatch = useDispatch();
  const [state, setState] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const validPhoneCode = ['8', '9', '2', '3'];

  useEffect(() => {
    if (Platform.OS === 'android') {
      changeNavigationBarColor('maroon');
    }
  }, []);

  const handleSubmit = () => {
    if (state.phone.trim() === '') {
      toastMessage(TOAST_MESSAGE_TYPES.ERROR, 'Please enter your phone number');
    } else if (
      !validPhoneCode.includes(state.phone[1]) ||
      state.phone[0] !== '7' ||
      state.phone.length !== 9
    ) {
      toastMessage(
        TOAST_MESSAGE_TYPES.ERROR,
        'Invalid phone number. please provide a valid MTN or AIRTEL-TIGO phone number.',
      );
    } else {
      if (state.password !== state.confirmPassword) {
        toastMessage(TOAST_MESSAGE_TYPES.ERROR, 'Passwords do not match');
        return;
      }
      setIsLoading(true);
      axios
        .post(app.BACKEND_URL + '/users/register/', {
          ...state,
          phone: '0' + state.phone,
        })
        .then(res => {
          setIsLoading(false);
          const {
            role,
            walletAmounts,
            userId,
            names,
            phone,
            image,
            email,
            token,
          } = res.data.user;
          dispatch(setUserNames(names));
          dispatch(setUserRole(role));
          dispatch(setUserWalletAmount(walletAmounts));
          dispatch(setUserId(userId));
          dispatch(setUserPhone(phone));
          dispatch(setUserEmail(email));
          dispatch(setUserImage(image));
          dispatch(saveAppToken());
          dispatch(setUserToken(token));
          toastMessage(TOAST_MESSAGE_TYPES.SUCCESS, res.data.msg);
          navigation.replace('HomeTabs');
        })
        .catch(error => {
          errorHandler(error);
          setIsLoading(false);
        });
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: APP_COLORS.WHITE}}>
      <View style={[viewFlexSpace, {alignItems: 'flex-start'}]}>
        <Image
          source={require('../../assets/imigongo.png')}
          style={{width: 10, height}}
        />
        <KeyboardAvoidingView>
          <ScrollView>
            <View style={{padding: 10, paddingBottom: 50}}>
              <View style={{marginVertical: 10}}>
                <Text
                  style={{
                    color: APP_COLORS.TEXT_GRAY,
                    fontWeight: '600',
                    fontSize: 16,
                  }}>
                  Full Name
                </Text>
                <TextInput
                  placeholder="Enter your names"
                  style={commonInput}
                  onChangeText={text => setState({...state, names: text})}
                />
              </View>
              <View style={{marginVertical: 10}}>
                <Text
                  style={{
                    color: APP_COLORS.TEXT_GRAY,
                    fontWeight: '600',
                    fontSize: 16,
                  }}>
                  Email address
                </Text>
                <TextInput
                  placeholder="Enter your email"
                  style={commonInput}
                  onChangeText={text => setState({...state, email: text})}
                  keyboardType="email-address"
                />
              </View>
              <View style={{marginVertical: 10}}>
                <Text
                  style={{
                    color: APP_COLORS.TEXT_GRAY,
                    fontWeight: '600',
                    fontSize: 16,
                  }}>
                  Phone Number
                </Text>
                <View
                  style={[
                    viewFlexSpace,
                    {
                      backgroundColor: APP_COLORS.WHITE,
                      marginTop: 5,
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: APP_COLORS.DARK_GRAY,
                    },
                  ]}>
                  <Text
                    style={{
                      padding: 10,
                      borderRightColor: APP_COLORS.DARK_GRAY,
                      borderRightWidth: 1,
                    }}>
                    +250
                  </Text>
                  <TextInput
                    placeholder="Enter your phone number"
                    style={{flex: 1, marginLeft: 10, padding: 10}}
                    onChangeText={text => setState({...state, phone: text})}
                    keyboardType="number-pad"
                  />
                </View>
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
                  placeholder="Enter your password"
                  style={commonInput}
                  secureTextEntry={true}
                  onChangeText={text => setState({...state, password: text})}
                />
              </View>
              <View style={{marginVertical: 10}}>
                <Text
                  style={{
                    color: APP_COLORS.TEXT_GRAY,
                    fontWeight: '600',
                    fontSize: 16,
                  }}>
                  Confirm Password
                </Text>
                <TextInput
                  placeholder="Re-enter your password"
                  style={commonInput}
                  onChangeText={text =>
                    setState({...state, confirmPassword: text})
                  }
                  secureTextEntry={true}
                />
              </View>

              <Pressable
                style={{marginVertical: 10}}
                disabled={isLoading}
                onPress={() => handleSubmit()}>
                <View style={[btnWithBgContainerStyles]}>
                  {isLoading && (
                    <ActivityIndicator
                      color={APP_COLORS.WHITE}
                      style={{marginRight: 10}}
                    />
                  )}
                  <Text style={[btnWithBgTextStyles]}> Sign up</Text>
                </View>
              </Pressable>
              <Pressable
                disabled={isLoading}
                onPress={() => navigation.navigate('Login')}
                style={{marginVertical: 10}}>
                <View style={[btnWithoutBgContainerStyles]}>
                  <Text
                    style={[
                      btnWithoutBgTextStyles,
                      {color: APP_COLORS.MAROON},
                    ]}>
                    Sign in
                  </Text>
                </View>
              </Pressable>

              <View style={[viewFlexCenter, {marginTop: 20}]}>
                <Text style={{color: APP_COLORS.BLACK}}>Or Singn up with</Text>
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
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default Register;
