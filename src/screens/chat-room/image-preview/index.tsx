import {View, Dimensions} from 'react-native';
import React from 'react';
import {APP_COLORS} from '../../../constants/colors';
import ImageLoader from '../../../components/image-loader';
import {
  IMessage,
  INavigationPropWithRouteRequired,
} from '../../../../interfaces';
import {app} from '../../../constants/app';

const {height, width} = Dimensions.get('window');
const ImagePreview = ({route}: INavigationPropWithRouteRequired) => {
  const {message} = route.params as {message: IMessage};
  return (
    <View style={{flex: 1, backgroundColor: APP_COLORS.BLACK}}>
      <ImageLoader
        height={height}
        width={width}
        url={app.FILE_URL + message.file}
        showLoader={true}
        loaderStyle={{color: APP_COLORS.WHITE}}
      />
    </View>
  );
};

export default ImagePreview;
