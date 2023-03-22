import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import {AlertNotificationRoot} from 'react-native-alert-notification';
import Navigation from './src/navigation';
import {store} from './src/store';
import {subscribeToSocket, unSubscribeToSocket} from './src/worker/socket';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

function App(): JSX.Element {
  useEffect(() => {
    subscribeToSocket(store);

    // window.addEventListener("online", handleOnline);
    // window.addEventListener("offline", handleOffline);

    return () => {
      unSubscribeToSocket();
      // window.removeEventListener("online", handleOnline);
      // window.removeEventListener("offline", handleOffline);
    };
  }, []);
  return (
    <AlertNotificationRoot theme="dark">
      <Navigation />
    </AlertNotificationRoot>
  );
}

export default App;
