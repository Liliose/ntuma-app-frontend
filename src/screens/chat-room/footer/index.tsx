import {
  View,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {APP_COLORS} from '../../../constants/colors';
import {viewFlexCenter, viewFlexSpace} from '../../../constants/styles';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Feather';
import axios from 'axios';
import {app} from '../../../constants/app';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../reducers';
import {errorHandler, setHeaders} from '../../../helpers';
import {setAddSingleMessage} from '../../../actions/messages';
import DocumentPicker from 'react-native-document-picker';
import {INavigationProp} from '../../../../interfaces';
interface IChatFooterProps extends INavigationProp {
  clientId: number;
}
const ChatFooter = ({clientId, navigation}: IChatFooterProps) => {
  const dispatch = useDispatch();
  const {token} = useSelector((state: RootState) => state.user);
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messageRef = useRef<any>(null);
  const handleSendMessage = () => {
    if (message.trim() === '') {
      messageRef?.current && messageRef.current.focus();
    } else {
      setIsLoading(true);
      axios
        .post(
          app.BACKEND_URL + '/messages',
          {message, agentId: clientId},
          setHeaders(token),
        )
        .then(res => {
          setIsLoading(false);
          dispatch(setAddSingleMessage(res.data.message));
          setMessage('');
        })
        .catch(error => {
          errorHandler(error);
          setIsLoading(false);
        });
    }
  };

  const handleDocumentSelect = async () => {
    try {
      const results = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
        allowMultiSelection: false,
      });
      //   setState({...state, idNumberDocument: results as any});
      navigation.navigate('ImageBeforeSendPreview', {file: results, clientId});
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };
  return (
    <KeyboardAvoidingView>
      <View
        style={[
          viewFlexSpace,
          {
            margin: 10,
            backgroundColor: APP_COLORS.WHITE,
            borderRadius: 25,
            padding: 10,
            alignItems: 'flex-end',
            marginTop: 0,
          },
        ]}>
        <View style={{flex: 1}}>
          <TextInput
            style={{
              padding: 5,
              color: APP_COLORS.BLACK,
              maxHeight: 200,
            }}
            placeholder="Type a message"
            multiline={true}
            onChangeText={text => setMessage(text)}
            value={message}
            ref={messageRef}
          />
        </View>
        <Pressable onPress={() => handleDocumentSelect()}>
          <View
            style={[
              viewFlexCenter,
              {
                borderRadius: 100,
                padding: 10,
              },
            ]}>
            <Icon name="attachment" size={20} color={APP_COLORS.BLACK} />
          </View>
        </Pressable>
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
              <Icon2 name="send" size={20} color={APP_COLORS.WHITE} />
            )}
          </View>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatFooter;
