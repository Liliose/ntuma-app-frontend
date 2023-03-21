import {
  View,
  ActivityIndicator,
  ImageProps,
  ActivityIndicatorProps,
} from 'react-native';
import React, {useState} from 'react';
import {viewFlexCenter} from '../../constants/styles';
import FastImage from 'react-native-fast-image';

interface IFastImageLoaderProps {
  url: string;
  width: number;
  height: number;
  style?: ImageProps;
  isBanner?: boolean;
  showLoader?: true;
  loaderWidth?: number;
  loaderStyle?: ActivityIndicatorProps;
}
const FastImageLoader = ({
  url,
  width,
  height,
  style,
  isBanner,
  showLoader,
  loaderWidth,
  loaderStyle,
}: IFastImageLoaderProps) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={{width, height, position: 'relative'}}>
      {isLoading && (
        <View style={{width, height, position: 'absolute', top: 0, zIndex: 2}}>
          {showLoader ? (
            <View style={[viewFlexCenter, {flex: 1}]}>
              <ActivityIndicator
                size={loaderWidth !== undefined ? loaderWidth : 50}
                style={loaderStyle !== undefined ? loaderStyle : {}}
              />
            </View>
          ) : isBanner ? (
            <FastImage
              source={require('../../assets/placeholder_banner.jpg')}
              style={
                style !== undefined
                  ? {height, width, ...style}
                  : {height, width}
              }
              resizeMode="cover"
            />
          ) : (
            <FastImage
              source={require('../../assets/placeholder_image.jpg')}
              style={
                style !== undefined
                  ? {height, width, ...style}
                  : {height, width}
              }
              resizeMode="contain"
            />
          )}
        </View>
      )}
      <FastImage
        source={{uri: url}}
        style={
          style !== undefined
            ? {width, height, zIndex: 1, ...style}
            : {width, height, zIndex: 1}
        }
        resizeMode={
          isBanner !== undefined ? (isBanner ? 'cover' : 'contain') : 'contain'
        }
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
      />
    </View>
  );
};

export default FastImageLoader;
