import {
  View,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {
  INavigationPropWithRouteRequired,
  TOAST_MESSAGE_TYPES,
} from '../../../../interfaces';
import {APP_COLORS} from '../../../constants/colors';
import ImageLoader from '../../../components/image-loader';
import {viewFlexCenter, viewFlexSpace} from '../../../constants/styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {toastMessage} from '../../../helpers';
import {app} from '../../../constants/app';
import {useDispatch, useSelector} from 'react-redux';
import {setAddSingleMessage} from '../../../actions/messages';
import {RootState} from '../../../reducers';
import {t} from 'i18next';
const {width, height} = Dimensions.get('window');

const InputContainer = ({
  message,
  setMessage,
}: {
  message: string;
  setMessage: any;
}) => {
  return (
    <KeyboardAvoidingView>
      <View
        style={[
          {
            margin: 10,
            backgroundColor: APP_COLORS.WHITE,
            borderRadius: 25,
            padding: 10,
            marginTop: 20,
          },
        ]}>
        <TextInput
          style={{
            padding: 1,
            color: APP_COLORS.BLACK,
            maxHeight: 200,
          }}
          placeholder={t('addCaptionText') as string}
          multiline={true}
          onChangeText={text => setMessage(text)}
          value={message}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const ViewAndSendSelectedFile = ({
  route,
  navigation,
}: INavigationPropWithRouteRequired) => {
  const dispatch = useDispatch();
  const {token} = useSelector((state: RootState) => state.user);
  const {file, clientId} = route.params as {
    file: {uri: string; type: string; name: string};
    clientId: number;
  };
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('message', message);
    formData.append('agentId', clientId);
    setIsLoading(true);
    const url = app.BACKEND_URL + '/messages/image/';
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.onload = function () {
      setIsLoading(false);
      try {
        const response = JSON.parse(xhr.response);
        if (xhr.status === 201) {
          setIsLoading(false);
          dispatch(setAddSingleMessage(response.message));
          setMessage('');
          navigation.goBack();
        } else {
          toastMessage(TOAST_MESSAGE_TYPES.ERROR, response.msg);
        }
      } catch (error) {
        toastMessage(TOAST_MESSAGE_TYPES.ERROR, xhr.response);
      }
    };
    xhr.setRequestHeader('token', token);
    xhr.send(formData);
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: APP_COLORS.MAROON,
        position: 'relative',
      }}>
      <ImageLoader
        url={file.uri}
        height={height}
        width={width}
        showLoader={true}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          width,
          zIndex: 2,
        }}>
        <InputContainer message={message} setMessage={setMessage} />
        <View
          style={[
            viewFlexSpace,
            {
              padding: 10,
              paddingBottom: 20,
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
            },
          ]}>
          <Pressable
            style={{marginLeft: 10, opacity: isLoading ? 0.5 : 1}}
            onPress={() => handleSendMessage()}
            disabled={isLoading}>
            <View
              style={[
                viewFlexCenter,
                {
                  backgroundColor: APP_COLORS.MAROON,
                  borderRadius: 100,
                  padding: 10,
                },
              ]}>
              {isLoading ? (
                <ActivityIndicator size={20} color={APP_COLORS.WHITE} />
              ) : (
                <View style={[viewFlexSpace, {paddingHorizontal: 10}]}>
                  <Icon name="send" size={20} color={APP_COLORS.WHITE} />
                  <Text style={{color: APP_COLORS.WHITE, marginLeft: 10}}>
                    {t('sendFileText')}
                  </Text>
                </View>
              )}
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ViewAndSendSelectedFile;
