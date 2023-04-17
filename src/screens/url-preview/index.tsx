import {View, Text, Dimensions} from 'react-native';
import React, {useState} from 'react';
import {WebView} from 'react-native-webview';
import {
  INavigationPropWithRouteRequired,
  TOAST_MESSAGE_TYPES,
} from '../../../interfaces';
import {toastMessage} from '../../helpers';
import FullPageLoader from '../../components/full-page-loader';
const {width, height} = Dimensions.get('window');

const UrlPreview = ({route, navigation}: INavigationPropWithRouteRequired) => {
  const {url} = route.params as any;
  const [isLoading, setIsLoading] = useState(true);
  return (
    <View style={{flex: 1}}>
      <WebView
        source={{uri: url}}
        style={{flex: 1}}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        onError={syntheticEvent => {
          const {nativeEvent} = syntheticEvent;
          // console.warn('WebView error: ', nativeEvent);
          toastMessage(TOAST_MESSAGE_TYPES.ERROR, nativeEvent.title);
        }}
      />
      <FullPageLoader isLoading={isLoading} />
    </View>
  );
};

export default UrlPreview;
