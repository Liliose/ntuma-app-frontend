import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  RefreshControl,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../reducers';
import {
  IClient,
  IMessage,
  INavigationProp,
  IUser,
  MESSAGE_STATUS_ENUM,
  MESSAGE_TYPES_ENUM,
  SENDER_TYPE_ENUM,
} from '../../../../interfaces';
import {APP_COLORS} from '../../../constants/colors';
import {TextInput} from 'react-native-gesture-handler';
import {
  btnWithBgContainerStyles,
  commonInput,
  viewFlexCenter,
  viewFlexSpace,
} from '../../../constants/styles';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  fetchMessages,
  setIsHardReloadingMessages,
} from '../../../actions/messages';
import NotFound from '../../../components/not-found';
import {fetchClients} from '../../../actions/clients';
import CustomAlert from '../../../components/custom-alert';
import FastImage from 'react-native-fast-image';
import UserImage from '../../../components/user-image';
import TimeAgo from '@andordavoti/react-native-timeago';
import Loader from '../products-tabs/loader';
import {t} from 'i18next';

interface IMessageItemProps extends INavigationProp {
  item: IMessage;
  currentUser: IUser;
  clients: IClient[];
}
const MessageItem = ({
  item,
  currentUser,
  clients,
  navigation,
}: IMessageItemProps) => {
  const [client, setClient] = useState<IClient | undefined>(undefined);
  useEffect(() => {
    // let sub = true;
    // if (sub) {
    const cl = clients.find(it => Number(it.agentId) == item.agentId);
    if (cl) {
      setClient(cl);
    }
    // }
    // return () => {
    //   sub = false;
    // };
  }, [clients]);
  return (
    <Pressable
      onPress={() => navigation.navigate('ChatRoom', {clientId: item.agentId})}
      style={{marginBottom: 5}}>
      <View
        style={[
          viewFlexSpace,
          {backgroundColor: APP_COLORS.WHITE, padding: 10},
        ]}>
        <View>
          {client !== undefined && (
            <UserImage image={client.image} height={40} width={40} />
          )}
        </View>
        <View style={{flex: 1, marginLeft: 10}}>
          <View style={[viewFlexSpace]}>
            <Text
              numberOfLines={1}
              style={{
                flex: 1,
                marginRight: 5,
                color: APP_COLORS.BLACK,
                textTransform: 'capitalize',
                fontWeight:
                  item.status == MESSAGE_STATUS_ENUM.DELIVERED
                    ? '600'
                    : 'normal',
              }}>
              {client?.names}
            </Text>
            <TimeAgo
              dateTo={new Date(item.createdAt)}
              style={{color: APP_COLORS.TEXT_GRAY}}
            />
          </View>
          {item.messageType === MESSAGE_TYPES_ENUM.TEXT ? (
            <Text style={{color: APP_COLORS.TEXT_GRAY}} numberOfLines={1}>
              {item.senderId == currentUser.userId &&
                item.senderType === SENDER_TYPE_ENUM.CLIENT &&
                'You: '}
              {item.textMessage}
            </Text>
          ) : (
            <Text
              style={[viewFlexCenter, {color: APP_COLORS.TEXT_GRAY}]}
              numberOfLines={1}>
              <>
                <Icon2 name="image" color={APP_COLORS.BLACK} size={20} /> Image
                {item.textMessage.trim() !== '' && ' : ' + item.textMessage}
              </>
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  );
};

const Messages = ({navigation}: INavigationProp) => {
  const dispatch = useDispatch();
  const {messages, isLoading, loadingError} = useSelector(
    (state: RootState) => state.messages,
  );
  const {token} = useSelector((state: RootState) => state.user);
  const {clients} = useSelector((state: RootState) => state.clients);
  const userReducer = useSelector((state: RootState) => state.user);
  const [showAlert, setShowAlert] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [messagesToShow, setMessagesToShow] = useState<IMessage[]>([]);
  const [allMessagesToShow, setAllMessagesToShow] = useState<IMessage[]>([]);
  const [keyword, setKeyword] = useState<string>('');

  const compare = (a: any, b: any) => {
    if (a.id > b.id) {
      return -1;
    }
    if (a.id < b.id) {
      return 1;
    }
    return 0;
  };

  useEffect(() => {
    dispatch(fetchMessages());
    dispatch(fetchClients());
  }, []);

  useEffect(() => {
    let sub = true;
    if (sub) {
      loadingError.trim().length > 0 &&
        messages.length === 0 &&
        setShowAlert(true);
    }
    return () => {
      sub = false;
    };
  }, [loadingError]);

  useEffect(() => {
    // let sub = true;
    // if (sub) {
    const allMessges = [...messages];
    const lastMessages: IMessage[] = [];
    const sortedMessages = allMessges.sort(compare);
    for (let i = 0; i < sortedMessages.length; i++) {
      const exists = lastMessages.find(
        item => item.agentId === sortedMessages[i].agentId,
      );
      if (!exists) {
        lastMessages.push(sortedMessages[i]);
      }
    }
    // setMessagesToShow(lastMessages);
    setAllMessagesToShow(lastMessages);
    // }
    // return () => {
    //   sub = false;
    // };
  }, [messages]);

  useEffect(() => {
    let sub = true;
    if (sub) {
      !isLoading && refreshing && setRefreshing(false);
    }
    return () => {
      sub = false;
    };
  }, [isLoading]);

  const alertCallBack = () => {
    setShowAlert(false);
    dispatch(setIsHardReloadingMessages(true));
    dispatch(fetchMessages());
    dispatch(fetchClients());
  };

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(setIsHardReloadingMessages(true));
    dispatch(fetchMessages());
    dispatch(fetchClients());
  };

  useEffect(() => {
    if (keyword.trim() !== '') {
      const clnts = clients.filter(item =>
        item.names.toLowerCase().includes(keyword.toLowerCase()),
      );
      const clientsKeys = clnts.map(item => item.agentId);
      const newMsgs = allMessagesToShow.filter(
        item =>
          item.textMessage.toLowerCase().includes(keyword.toLowerCase()) ||
          clientsKeys.includes(item.agentId),
      );
      setMessagesToShow(newMsgs);
    } else {
      setMessagesToShow(allMessagesToShow);
    }
  }, [keyword, allMessagesToShow]);

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      {token.trim() !== '' ? (
        <>
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View
              style={{
                flex: 1,
                backgroundColor: APP_COLORS.GRAY_BG,
              }}>
              {isLoading && messages.length === 0 ? (
                <Loader />
              ) : messages.length > 0 ? (
                <View>
                  <View style={{paddingHorizontal: 10, paddingTop: 10}}>
                    <View style={{position: 'relative'}}>
                      <TextInput
                        style={[commonInput, {height: 45, paddingLeft: 45}]}
                        placeholder={t('searchMessagesText') as string}
                        value={keyword}
                        onChangeText={text => setKeyword(text)}
                      />
                      <View
                        style={{
                          position: 'absolute',
                          top: 0,
                          width: 45,
                          height: 45,
                        }}>
                        <View
                          style={[viewFlexCenter, {flex: 1, paddingTop: 10}]}>
                          <Icon
                            name="search1"
                            color={APP_COLORS.BLACK}
                            size={25}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={{marginTop: 15}}>
                    {messagesToShow.map((item, index) => (
                      <MessageItem
                        key={index}
                        navigation={navigation}
                        item={item}
                        currentUser={userReducer}
                        clients={clients}
                      />
                    ))}
                  </View>
                </View>
              ) : (
                <NotFound
                  title={t('noMessagesFoundText')}
                  textColor={APP_COLORS.BLACK}
                />
              )}
            </View>
          </ScrollView>
          <CustomAlert
            showAlert={showAlert}
            setShowAlert={setShowAlert}
            confirmationTitle="Try Again"
            callBack={alertCallBack}>
            <View style={[viewFlexCenter]}>
              <FastImage
                source={require('../../../assets/error-black.gif')}
                style={{width: 120, height: 120}}
              />
              <Text
                style={{
                  color: APP_COLORS.MAROON,
                  fontWeight: 'bold',
                  fontSize: 18,
                }}>
                {t('somethingWentWrongText')}
              </Text>
              <Text style={{color: APP_COLORS.TEXT_GRAY}}>{loadingError}</Text>
            </View>
          </CustomAlert>
        </>
      ) : (
        <View style={{padding: 10}}>
          <Pressable
            onPress={() => navigation.navigate('Login')}
            style={{marginBottom: 15}}>
            <View style={[btnWithBgContainerStyles]}>
              <Icon3 name="login" size={25} color={APP_COLORS.WHITE} />
              <Text style={{flex: 1, marginLeft: 10, color: APP_COLORS.WHITE}}>
                {t('signinText')}
              </Text>
            </View>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Register')}>
            <View style={[btnWithBgContainerStyles]}>
              <Icon name="adduser" size={25} color={APP_COLORS.WHITE} />
              <Text style={{flex: 1, marginLeft: 10, color: APP_COLORS.WHITE}}>
                {t('signupText')}
              </Text>
            </View>
          </Pressable>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default Messages;
