import {View, Text, TextInput, ScrollView, Pressable} from 'react-native';
import React, {useState} from 'react';
import {APP_COLORS} from '../../constants/colors';
import {
  btnWithBgContainerStyles,
  btnWithBgTextStyles,
  commonInput,
} from '../../constants/styles';
import CustomAlert from '../../components/custom-alert';
import {returnErroMessage, setHeaders, toastMessage} from '../../helpers';
import {TOAST_MESSAGE_TYPES} from '../../../interfaces';
import axios from 'axios';
import {app} from '../../constants/app';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import {resetOrders} from '../../actions/orders';
import {resetCart} from '../../actions/cart';
import {resetNotifications} from '../../actions/notifications';
import {resetLocations} from '../../actions/locations';
import {resetMessages} from '../../actions/messages';
import {resetUser} from '../../actions/user';
import FullPageLoader from '../../components/full-page-loader';
import CustomErrorAlert from '../../components/custom-error-alert';

const DeleteAccount = () => {
  const dispatch = useDispatch();
  const {token} = useSelector((state: RootState) => state.user);
  const [reason, setReason] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErroMessage] = useState('');
  const [showErrorModal, setShowErroModal] = useState(false);

  const handleOpen = () => {
    if (reason.trim() === '') {
      toastMessage(
        TOAST_MESSAGE_TYPES.ERROR,
        'Please give us a feedback so that you can be able to delete your accountz.',
      );
    } else {
      setShowModal(true);
    }
  };

  const handleSubmit = () => {
    if (password === '') {
      toastMessage(TOAST_MESSAGE_TYPES.INFO, 'Please enter your password');
      return;
    }
    setShowModal(false);
    setIsLoading(false);
    setErroMessage('');
    axios
      .post(
        app.BACKEND_URL + '/users/delete',
        {password, reason},
        setHeaders(token),
      )
      .then(res => {
        setIsLoading(false);
        dispatch(resetOrders());
        dispatch(resetCart());
        dispatch(resetNotifications());
        dispatch(resetLocations());
        dispatch(resetMessages());
        dispatch(resetUser());
      })
      .catch(error => {
        const err = returnErroMessage(error);
        setIsLoading(false);
        setErroMessage(err);
        setShowErroModal(true);
      });
  };

  return (
    <>
      <View style={{flex: 1, backgroundColor: APP_COLORS.WHITE, padding: 10}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <Text style={{color: APP_COLORS.BLACK}}>
            Please answer this question? why do you want to delete your account?
          </Text>
          <TextInput
            style={[
              {
                padding: 5,
                color: APP_COLORS.BLACK,
                maxHeight: 200,
                height: 100,
                textAlignVertical: 'top',
              },
              commonInput,
            ]}
            placeholder="Why do you want to delete this account?"
            multiline={true}
            onChangeText={text => setReason(text)}
            value={reason}
          />
          <Text style={{color: APP_COLORS.RED, marginVertical: 10}}>
            NB: There will be no way to undo this action. Please make sure that
            your are sure about this. If you have some amount on your wallet
            from this account, you will also lost your money after performing
            this action.
          </Text>
          <Pressable style={{marginTop: 10}} onPress={handleOpen}>
            <View style={[btnWithBgContainerStyles]}>
              <Text style={[btnWithBgTextStyles]}>Continue</Text>
            </View>
          </Pressable>
        </ScrollView>
      </View>
      <CustomAlert
        setShowAlert={setShowModal}
        showAlert={showModal}
        confirmationTitle="Delete Account"
        callBack={handleSubmit}>
        <Text
          style={{
            color: APP_COLORS.MAROON,
            textAlign: 'center',
            fontWeight: '600',
            fontSize: 20,
          }}>
          Confirmation
        </Text>
        <View style={{marginTop: 10}}>
          <Text style={{color: APP_COLORS.TEXT_GRAY}}>
            Enter your password to confirm account deletion
          </Text>
          <TextInput
            style={[commonInput]}
            placeholder="Enter your password"
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
            value={password}
          />
        </View>
      </CustomAlert>
      <CustomErrorAlert
        showAlert={showErrorModal}
        setShowAlert={setShowErroModal}>
        <Text>{errorMessage}</Text>
      </CustomErrorAlert>
      <FullPageLoader isLoading={isLoading} />
    </>
  );
};

export default DeleteAccount;
