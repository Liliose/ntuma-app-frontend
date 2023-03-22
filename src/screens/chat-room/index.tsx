import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Pressable,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {
  IMessage,
  INavigationProp,
  INavigationPropWithRouteRequired,
  MESSAGE_TYPES_ENUM,
  SENDER_TYPE_ENUM,
} from '../../../interfaces';
import {APP_COLORS} from '../../constants/colors';
import ChatFooter from './footer';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import {fetchMessages, setDeleteMessage} from '../../actions/messages';
import ImageLoader from '../../components/image-loader';
import {app} from '../../constants/app';
import Icon from 'react-native-vector-icons/Feather';
import {viewFlexCenter, viewFlexSpace} from '../../constants/styles';
import CustomAlert from '../../components/custom-alert';
import axios from 'axios';
import {errorHandler, setHeaders} from '../../helpers';
import {fetchClients} from '../../actions/clients';
import TimeAgo from '@andordavoti/react-native-timeago';
const {width} = Dimensions.get('window');
interface IMessageItemProps extends INavigationProp {
  item: IMessage;
  clientId: number;
}
const MessageItem = ({item, clientId, navigation}: IMessageItemProps) => {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState(false);
  const {token, userId} = useSelector((state: RootState) => state.user);
  const deleteMessage = () => {
    setShowAlert(false);
    setIsDeleting(true);
    axios
      .delete(app.BACKEND_URL + '/messages/' + item.id, setHeaders(token))
      .then(res => {
        setIsDeleting(false);
        dispatch(setDeleteMessage(item));
      })
      .catch(error => {
        setIsDeleting(false);
        errorHandler(error);
      });
  };
  return (
    <>
      {item.messageType === MESSAGE_TYPES_ENUM.TEXT ? (
        item.senderId == userId &&
        item.senderType === SENDER_TYPE_ENUM.CLIENT ? (
          <View style={{alignItems: 'flex-end'}}>
            <View style={[viewFlexSpace]}>
              {isDeleting ? (
                <ActivityIndicator size={25} color={APP_COLORS.MAROON} />
              ) : (
                <Pressable onPress={() => setShowAlert(true)}>
                  <Icon name="trash" color={APP_COLORS.MAROON} size={25} />
                </Pressable>
              )}
              <View
                style={{
                  backgroundColor: APP_COLORS.MAROON,
                  borderRadius: 10,
                  marginBottom: 5,
                  borderBottomRightRadius: 0,
                  padding: 10,
                  maxWidth: width - 100,
                  marginLeft: 10,
                }}>
                <Text style={{color: APP_COLORS.WHITE}}>
                  {item.textMessage}
                </Text>
              </View>
            </View>
            <TimeAgo
              dateTo={new Date(item.createdAt)}
              style={{marginBottom: 10, color: APP_COLORS.TEXT_GRAY}}
            />
          </View>
        ) : (
          <View style={{alignItems: 'flex-start'}}>
            <View
              style={{
                backgroundColor: APP_COLORS.WHITE,
                borderRadius: 10,
                marginBottom: 5,
                borderBottomLeftRadius: 0,
                padding: 10,
                maxWidth: width - 100,
              }}>
              <Text style={{color: APP_COLORS.BLACK}}>{item.textMessage}</Text>
            </View>
            <TimeAgo
              dateTo={new Date(item.createdAt)}
              style={{marginBottom: 10, color: APP_COLORS.TEXT_GRAY}}
            />
          </View>
        )
      ) : item.senderId == userId &&
        item.senderType === SENDER_TYPE_ENUM.CLIENT ? (
        <View style={{alignItems: 'flex-end'}}>
          <View style={[viewFlexSpace]}>
            {isDeleting ? (
              <ActivityIndicator size={25} color={APP_COLORS.MAROON} />
            ) : (
              <Pressable onPress={() => setShowAlert(true)}>
                <Icon name="trash" color={APP_COLORS.MAROON} size={25} />
              </Pressable>
            )}
            <Pressable
              style={{marginLeft: 10}}
              onPress={() =>
                navigation.navigate('ImagePreview', {message: item})
              }>
              <View
                style={{
                  backgroundColor: APP_COLORS.MAROON,
                  borderRadius: 10,
                  marginBottom: 5,
                  borderBottomRightRadius: 0,
                  padding: 10,
                  width: width / 2 + 20,
                }}>
                <ImageLoader
                  url={app.FILE_URL + item.file}
                  height={width / 2}
                  width={width / 2}
                  showLoader={true}
                  loaderStyle={{color: APP_COLORS.WHITE}}
                  style={{borderRadius: 10, borderBottomRightRadius: 0}}
                />
                {item.textMessage.trim() !== '' && (
                  <Text style={{color: APP_COLORS.WHITE, marginTop: 5}}>
                    {item.textMessage}
                  </Text>
                )}
              </View>
            </Pressable>
          </View>
          <TimeAgo
            dateTo={new Date(item.createdAt)}
            style={{marginBottom: 10, color: APP_COLORS.TEXT_GRAY}}
          />
        </View>
      ) : (
        <View style={{alignItems: 'flex-start'}}>
          <Pressable
            onPress={() =>
              navigation.navigate('ImagePreview', {message: item})
            }>
            <View
              style={{
                backgroundColor: APP_COLORS.WHITE,
                borderRadius: 10,
                marginBottom: 5,
                borderBottomRightRadius: 0,
                padding: 10,
                width: width / 2 + 20,
              }}>
              <ImageLoader
                url={app.FILE_URL + item.file}
                height={width / 2}
                width={width / 2}
                showLoader={true}
                loaderStyle={{color: APP_COLORS.WHITE}}
                style={{borderRadius: 10, borderBottomLeftRadius: 0}}
              />
              {item.textMessage.trim() !== '' && (
                <Text style={{color: APP_COLORS.WHITE, marginTop: 5}}>
                  {item.textMessage}
                </Text>
              )}
            </View>
          </Pressable>
          <TimeAgo
            dateTo={new Date(item.createdAt)}
            style={{marginBottom: 10, color: APP_COLORS.TEXT_GRAY}}
          />
        </View>
      )}
      <CustomAlert
        setShowAlert={setShowAlert}
        showAlert={showAlert}
        confirmationTitle="Yes, Delete"
        callBack={deleteMessage}>
        <View style={[viewFlexCenter]}>
          <Text style={{color: APP_COLORS.MAROON, fontWeight: '600'}}>
            Confrimation
          </Text>
          <Text style={{marginTop: 10, color: APP_COLORS.BLACK}}>
            Do you want to delete this message?
          </Text>
        </View>
      </CustomAlert>
    </>
  );
};

const ChattRoom = ({navigation, route}: INavigationPropWithRouteRequired) => {
  const dispatch = useDispatch();
  const {clientId} = route.params as {clientId: number};
  const {messages, isLoading} = useSelector(
    (state: RootState) => state.messages,
  );
  const [messagesToShow, setMessagesToShow] = useState<IMessage[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const scrollViewRef = useRef<any>(null);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(fetchMessages());
  };

  useEffect(() => {
    let sub = true;
    if (sub) {
      !isLoading && refreshing && setRefreshing(false);
    }
    return () => {
      sub = false;
    };
  }, [isLoading]);

  useEffect(() => {
    let sub = true;
    if (sub) {
      let msgs = messages.filter(item => item.agentId == clientId);
      setMessagesToShow(msgs);
    }
    return () => {
      sub = false;
    };
  }, [messages]);

  useEffect(() => {
    dispatch(fetchMessages());
    dispatch(fetchClients());
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: APP_COLORS.CHAT_BG_GRAY}}>
      <View style={{flex: 1, padding: 10, paddingBottom: 0}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef?.current &&
            scrollViewRef.current?.scrollToEnd({animated: true})
          }>
          {messagesToShow.map((item, index) => (
            <MessageItem
              key={index}
              item={item}
              clientId={clientId}
              navigation={navigation}
            />
          ))}
        </ScrollView>
      </View>
      <ChatFooter clientId={clientId} navigation={navigation} />
    </View>
  );
};

export default ChattRoom;
