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
import {useDispatch} from 'react-redux';
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
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import FullPageLoader from '../../components/full-page-loader';

const {height} = Dimensions.get('window');
const initialState = {
  emailOrPhone: '',
  password: '',
};
const Login = ({navigation}: INavigationProp) => {
  const dispatch = useDispatch();
  const [state, setState] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'android') {
      changeNavigationBarColor('maroon');
    }
  }, []);

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
        dispatch(setUserImage(image));
        dispatch(saveAppToken());
        dispatch(setUserToken(token));
        toastMessage(TOAST_MESSAGE_TYPES.SUCCESS, res.data.msg);
        navigation.replace('HomeTabs');
      })
      .catch(error => {
        setIsLoading(false);
        errorHandler(error);
      });
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '152826397930-uf6moun65rfu6ov6icilpdops3cg24ce.apps.googleusercontent.com',
    });
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      // await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log({userInfo});
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
      setIsLoading(false);
      toastMessage(
        TOAST_MESSAGE_TYPES.ERROR,
        'Something went wrong while signing in with google',
      );
      console.log({error: JSON.stringify(error)});
    }
  };

  return (
    <KeyboardAvoidingView style={{flex: 1, height: '100%'}}>
      <View style={{flex: 1, backgroundColor: APP_COLORS.WHITE}}>
        <View style={[viewFlexSpace, {alignItems: 'flex-start'}]}>
          <Image
            source={require('../../assets/imigongo.png')}
            style={{width: 10, height}}
          />
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={{padding: 10, flex: 1}}>
              <View style={{marginVertical: 10}}>
                <Text
                  style={{
                    color: APP_COLORS.TEXT_GRAY,
                    fontWeight: '600',
                    fontSize: 16,
                  }}>
                  Email or Phone(07...)
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
                  }}>
                  <GoogleSigninButton
                    style={{width: 192, height: 48}}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={handleGoogleSignIn}
                    disabled={isLoading}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
      <FullPageLoader isLoading={isLoading} />
    </KeyboardAvoidingView>
  );
};

export default Login;
