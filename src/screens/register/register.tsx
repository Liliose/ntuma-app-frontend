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
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import CustomErrorAlert from '../../components/custom-error-alert';
import {INavigationProp, TOAST_MESSAGE_TYPES} from '../../../interfaces';
import {errorHandler, returnErroMessage, toastMessage} from '../../helpers';
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
import ImageLoader from '../../components/image-loader';
import FullPageLoader from '../../components/full-page-loader';

const {height} = Dimensions.get('window');
const initialState = {
  names: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
};
const googleInitialState = {
  email: '',
  id: '',
  givenName: '',
  familyName: '',
  photo: '',
  name: '',
  phone: '',
};
const Register = ({navigation}: INavigationProp) => {
  const dispatch = useDispatch();
  const [state, setState] = useState(initialState);
  const [googleState, setGoogleState] = useState<any>(googleInitialState);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [googleErrorMessage, setGoogleErrorMessage] = useState('');
  const [showGoogleLoginScreen, setShowGoogleLoginScreen] = useState(false);
  const validPhoneCode = ['8', '9', '2', '3'];

  useEffect(() => {
    if (Platform.OS === 'android') {
      changeNavigationBarColor('maroon');
    }
    GoogleSignin.configure({
      webClientId: app.WEB_CLIENT_ID,
    });
    googleSignOut();
  }, []);

  const googleSignOut = async () => {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    if (state.phone?.trim() === '') {
      toastMessage(TOAST_MESSAGE_TYPES.ERROR, 'Please enter your phone number');
    } else if (
      !validPhoneCode.includes(state.phone[1]) ||
      state.phone[0] !== '7' ||
      state.phone.length !== 9
    ) {
      toastMessage(
        TOAST_MESSAGE_TYPES.ERROR,
        '250' +
          state.phone +
          ' is invalid phone number. please provide a valid MTN or AIRTEL-TIGO phone number.',
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

  const handleGoogleSignup = () => {
    try {
      if (googleState.phone?.trim() === '') {
        toastMessage(
          TOAST_MESSAGE_TYPES.ERROR,
          'Please enter your phone number',
        );
        return;
      }
      if (
        !validPhoneCode.includes(googleState.phone[1]) ||
        googleState.phone[0] !== '7' ||
        googleState.phone.length !== 9
      ) {
        toastMessage(
          TOAST_MESSAGE_TYPES.ERROR,
          '250' +
            googleState.phone +
            ' is invalid phone number. please provide a valid MTN or AIRTEL-TIGO phone number.',
        );
        return;
      }
      setIsLoading(true);
      axios
        .post(app.BACKEND_URL + '/users/register/google', {
          ...googleState,
          phone: '0' + googleState.phone,
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
          const err = returnErroMessage(error);
          setIsLoading(false);
          setGoogleErrorMessage(err);
          setShowAlert(true);
        });
    } catch (error) {
      const err = returnErroMessage(error);
      setIsLoading(false);
      setGoogleErrorMessage(err);
      setShowAlert(true);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      setIsLoading(true);
      const userInfo = await GoogleSignin.signIn();
      setGoogleState({...googleState, ...userInfo.user});
      setIsLoading(false);
      setShowGoogleLoginScreen(true);
    } catch (error: any) {
      setIsLoading(false);
      toastMessage(
        TOAST_MESSAGE_TYPES.ERROR,
        'Something went wrong while signing in with google.Try again later. If this error persits, close the app and open it again.',
      );
    }
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: APP_COLORS.WHITE}}>
        <View style={[viewFlexSpace, {alignItems: 'flex-start'}]}>
          <Image
            source={require('../../assets/imigongo.png')}
            style={{width: 10, height}}
          />
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={{padding: 10, paddingBottom: 50, flex: 1}}>
              {!showGoogleLoginScreen ? (
                <>
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
                        style={{
                          flex: 1,
                          marginLeft: 10,
                          padding: 10,
                          color: APP_COLORS.BLACK,
                        }}
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
                      onChangeText={text =>
                        setState({...state, password: text})
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
                    <Text style={{color: APP_COLORS.BLACK}}>Or</Text>
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
                </>
              ) : (
                <View style={{marginTop: 10}}>
                  <View style={[viewFlexCenter]}>
                    <ImageLoader
                      url={googleState.photo}
                      width={50}
                      height={50}
                      style={{borderRadius: 100}}
                      showLoader={true}
                      loaderStyle={{color: APP_COLORS.MAROON}}
                    />
                    <Text
                      style={{
                        color: APP_COLORS.BLACK,
                        textAlign: 'center',
                        marginTop: 10,
                      }}>
                      Welcome{' '}
                      <Text style={{fontWeight: 'bold'}}>
                        {googleState.name}
                      </Text>
                    </Text>
                  </View>
                  <View style={{paddingVertical: 20}}>
                    <Text
                      style={{
                        color: APP_COLORS.BLACK,
                        fontWeight: '600',
                        fontSize: 16,
                        textAlign: 'center',
                      }}>
                      Let us know your phone Number to get you started!
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
                        style={{
                          flex: 1,
                          marginLeft: 10,
                          padding: 10,
                          color: APP_COLORS.BLACK,
                        }}
                        onChangeText={text =>
                          setGoogleState({...googleState, phone: text})
                        }
                        keyboardType="number-pad"
                      />
                    </View>
                    <Pressable
                      style={{marginVertical: 20}}
                      disabled={isLoading}
                      onPress={() => handleGoogleSignup()}>
                      <View style={[btnWithBgContainerStyles]}>
                        {isLoading && (
                          <ActivityIndicator
                            color={APP_COLORS.WHITE}
                            style={{marginRight: 10}}
                          />
                        )}
                        <Text style={[btnWithBgTextStyles]}>Finish</Text>
                      </View>
                    </Pressable>
                  </View>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
      <FullPageLoader isLoading={isLoading} />
      <CustomErrorAlert showAlert={showAlert} setShowAlert={setShowAlert}>
        <Text style={{color: APP_COLORS.TEXT_GRAY, textAlign: 'center'}}>
          {googleErrorMessage}
        </Text>
      </CustomErrorAlert>
    </KeyboardAvoidingView>
  );
};

export default Register;
