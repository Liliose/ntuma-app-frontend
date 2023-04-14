import React, {useEffect} from 'react';
import {LogBox, SafeAreaView} from 'react-native';
import {AlertNotificationRoot} from 'react-native-alert-notification';
import messaging from '@react-native-firebase/messaging';
import Navigation from './src/navigation';
import {store} from './src/store';
import SplashScreen from 'react-native-splash-screen';
import {subscribeToSocket, unSubscribeToSocket} from './src/worker/socket';
import {saveAppToken, setFbToken} from './src/actions/user';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const requestCloudMessagingNotificationPermissionFromUser = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    //get tokent
    const token = await messaging().getToken();
    console.log({token});
    if (token) {
      //subscribe to broadcast topic
      const subscription = await messaging().subscribeToTopic('broadcast');
      console.log({subscription});
      //save token to db
      store.dispatch(setFbToken(token));
      store.dispatch(saveAppToken());
    }
  }
};

function App(): JSX.Element {
  const {user}: any = store.getState();
  useEffect(() => {
    subscribeToSocket(store);
    requestCloudMessagingNotificationPermissionFromUser();

    // window.addEventListener("online", handleOnline);
    // window.addEventListener("offline", handleOffline);

    return () => {
      unSubscribeToSocket();
      // window.removeEventListener("online", handleOnline);
      // window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    let sub = true;
    if (sub) {
      store.dispatch(saveAppToken());
    }
    return () => {
      sub = false;
    };
  }, [user.fbToken]);

  return (
    <AlertNotificationRoot theme="dark">
      <Navigation />
    </AlertNotificationRoot>
  );
}

export default App;
