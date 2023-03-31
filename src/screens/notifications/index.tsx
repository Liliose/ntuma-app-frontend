import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  Image,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {APP_COLORS} from '../../constants/colors';
import NotFound from '../../components/not-found';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import CustomAlert from '../../components/custom-alert';
import FastImage from 'react-native-fast-image';
import {
  fetchNotifications,
  resetNotifications,
  setIsHardReloadingNotifications,
  setShowClearAllNotificatonsConfirmation,
} from '../../actions/notifications';
import {viewFlexCenter, viewFlexSpace} from '../../constants/styles';
import TimeAgo from '@andordavoti/react-native-timeago';
import FullPageLoader from '../../components/full-page-loader';
import axios from 'axios';
import {app} from '../../constants/app';
import {errorHandler, setHeaders} from '../../helpers';
import Loader from '../select-market/loader';

const Notifications = () => {
  const dispatch = useDispatch();
  const {
    isLoading,
    loadingError,
    hardReloading,
    notifications,
    showConfirmation,
  } = useSelector((state: RootState) => state.notifications);
  const {token} = useSelector((state: RootState) => state.user);

  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    token && token.trim() !== '' && dispatch(fetchNotifications());
  }, []);

  useEffect(() => {
    let sub = true;
    if (sub) {
      loadingError.trim().length > 0 &&
        notifications.length === 0 &&
        setShowErrorAlert(true);
    }
    return () => {
      sub = false;
    };
  }, [loadingError]);

  useEffect(() => {
    let sub = true;
    if (sub) {
      !isLoading && refreshing && setRefreshing(false);
    }
    return () => {
      sub = false;
    };
  }, [isLoading]);

  const handleConfirmationClose = () => {
    dispatch(setShowClearAllNotificatonsConfirmation(false));
  };

  const alertCallBack = () => {
    setShowErrorAlert(false);
    dispatch(setIsHardReloadingNotifications(true));
    dispatch(fetchNotifications());
  };

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(setIsHardReloadingNotifications(true));
    dispatch(fetchNotifications());
  };

  const handleClearAll = () => {
    dispatch(setShowClearAllNotificatonsConfirmation(false));
    setIsSubmitting(true);
    axios
      .delete(app.BACKEND_URL + '/notifications/agent', setHeaders(token))
      .then(res => {
        setIsSubmitting(false);
        dispatch(resetNotifications());
      })
      .catch(error => {
        setIsSubmitting(false);
        errorHandler(error);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: APP_COLORS.MAROON}}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        {hardReloading ? (
          <View style={{padding: 10}}>
            <Loader />
          </View>
        ) : isLoading && notifications.length === 0 ? (
          <View style={{padding: 10}}>
            <Loader />
          </View>
        ) : notifications.length === 0 ? (
          <NotFound
            title="No data found"
            textColor={APP_COLORS.WHITE}
            lightImage={true}
          />
        ) : (
          notifications.map((item, index) => (
            <Pressable style={{marginBottom: 10}} key={index}>
              <View
                style={[
                  viewFlexSpace,
                  {
                    padding: 10,
                    backgroundColor: APP_COLORS.WHITE,
                    alignItems: 'flex-start',
                  },
                ]}>
                <View
                  style={{
                    backgroundColor: APP_COLORS.MAROON,
                    borderRadius: 100,
                  }}>
                  <Image
                    source={require('../../assets/logo-white.png')}
                    style={{width: 50, height: 50, borderRadius: 100}}
                    resizeMode="contain"
                  />
                </View>
                <View style={{flex: 1, marginLeft: 10}}>
                  {item.title !== '-' && (
                    <Text
                      style={{
                        color: APP_COLORS.BLACK,
                        fontWeight: '600',
                        textTransform: 'capitalize',
                      }}>
                      {item.title}
                    </Text>
                  )}
                  <Text style={{color: APP_COLORS.BLACK}}>{item.message}</Text>
                  <TimeAgo
                    dateTo={new Date(item.createdAt)}
                    style={{color: APP_COLORS.TEXT_GRAY}}
                  />
                </View>
              </View>
            </Pressable>
          ))
        )}
      </ScrollView>
      <CustomAlert
        showAlert={showErrorAlert}
        setShowAlert={setShowErrorAlert}
        confirmationTitle="Try Again"
        callBack={alertCallBack}>
        <View style={[viewFlexCenter]}>
          <FastImage
            source={require('../../assets/error-black.gif')}
            style={{width: 120, height: 120}}
          />
          <Text
            style={{
              color: APP_COLORS.MAROON,
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            Something Went Wrong
          </Text>
          <Text style={{color: APP_COLORS.TEXT_GRAY}}>{loadingError}</Text>
        </View>
      </CustomAlert>
      <CustomAlert
        setShowAlert={handleConfirmationClose}
        showAlert={showConfirmation}
        confirmationTitle="Yes, Delete"
        callBack={handleClearAll}>
        <View style={[viewFlexCenter]}>
          <Text style={{color: APP_COLORS.MAROON, fontWeight: '600'}}>
            Confrimation
          </Text>
          <Text style={{marginTop: 10, color: APP_COLORS.BLACK}}>
            Do you want to delete all notifications?
          </Text>
        </View>
      </CustomAlert>
      <FullPageLoader isLoading={isSubmitting} />
    </View>
  );
};

export default Notifications;
