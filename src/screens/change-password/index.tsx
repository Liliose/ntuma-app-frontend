import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {APP_COLORS} from '../../constants/colors';
import {
  btnWithBgContainerStyles,
  btnWithBgTextStyles,
  commonInput,
} from '../../constants/styles';
import FullPageLoader from '../../components/full-page-loader';
import {errorHandler, setHeaders, toastMessage} from '../../helpers';
import {INavigationProp, TOAST_MESSAGE_TYPES} from '../../../interfaces';
import axios from 'axios';
import {app} from '../../constants/app';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import {t} from 'i18next';

const initialState = {oldPassword: '', newPassword: '', confirmPassword: ''};
const ChangePassword = ({navigation}: INavigationProp) => {
  const [state, setState] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const {token} = useSelector((state: RootState) => state.user);
  const handleSubmit = () => {
    if (
      state.confirmPassword.trim() === '' ||
      state.newPassword.trim() === '' ||
      state.oldPassword.trim() === ''
    ) {
      toastMessage(TOAST_MESSAGE_TYPES.ERROR, 'All fields are required.');
      return;
    }
    if (state.newPassword.trim().length < 5) {
      toastMessage(
        TOAST_MESSAGE_TYPES.ERROR,
        'Password minimum characters must be 5.',
      );
      return;
    }
    if (state.confirmPassword !== state.newPassword) {
      toastMessage(TOAST_MESSAGE_TYPES.ERROR, 'Passwords do not match.');
      return;
    }
    setIsLoading(true);
    axios
      .put(app.BACKEND_URL + '/users/pwd', state, setHeaders(token))
      .then(res => {
        setState(initialState);
        setIsLoading(false);
        toastMessage(TOAST_MESSAGE_TYPES.SUCCESS, res.data.msg);
        navigation.goBack();
      })
      .catch(error => {
        setIsLoading(false);
        errorHandler(error);
      });
  };
  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          backgroundColor: APP_COLORS.WHITE,
          paddingHorizontal: 10,
          paddingVertical: 15,
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{marginVertical: 5}}>
            <Text style={{color: APP_COLORS.TEXT_GRAY}}>Old Password</Text>
            <TextInput
              style={[commonInput]}
              placeholder="Enter old password"
              secureTextEntry={true}
              value={state.oldPassword}
              onChangeText={text => setState({...state, oldPassword: text})}
            />
          </View>
          <View style={{marginVertical: 5}}>
            <Text style={{color: APP_COLORS.TEXT_GRAY}}>New Password</Text>
            <TextInput
              style={[commonInput]}
              placeholder="Enter new password"
              secureTextEntry={true}
              value={state.newPassword}
              onChangeText={text => setState({...state, newPassword: text})}
            />
          </View>
          <View style={{marginVertical: 5}}>
            <Text style={{color: APP_COLORS.TEXT_GRAY}}>
              Confirm New Passoword
            </Text>
            <TextInput
              style={[commonInput]}
              placeholder="Confirm password"
              secureTextEntry={true}
              value={state.confirmPassword}
              onChangeText={text => setState({...state, confirmPassword: text})}
            />
          </View>
          <Pressable style={{marginTop: 10}} onPress={() => handleSubmit()}>
            <View style={[btnWithBgContainerStyles]}>
              <Text style={[btnWithBgTextStyles]}>{t('submitText')}</Text>
            </View>
          </Pressable>
        </ScrollView>
      </View>
      <FullPageLoader isLoading={isLoading} />
    </KeyboardAvoidingView>
  );
};

export default ChangePassword;
