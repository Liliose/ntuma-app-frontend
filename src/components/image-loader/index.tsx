import {
  View,
  ActivityIndicator,
  Image,
  ImageProps,
  ActivityIndicatorProps,
} from 'react-native';
import React, {useState} from 'react';
import {viewFlexCenter} from '../../constants/styles';

interface IImageLoaderProps {
  url: string;
  width: number;
  height: number;
  style?: ImageProps;
  isBanner?: boolean;
  showLoader?: true;
  loaderWidth?: number;
  loaderStyle?: ActivityIndicatorProps;
}
const ImageLoader = ({
  url,
  width,
  height,
  style,
  isBanner,
  showLoader,
  loaderWidth,
  loaderStyle,
}: IImageLoaderProps) => {
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
            <Image
              source={require('../../assets/placeholder_banner.jpg')}
              style={
                style !== undefined
                  ? {height, width, ...style}
                  : {height, width}
              }
              resizeMode="contain"
            />
          ) : (
            <Image
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
      <Image
        source={{uri: url}}
        style={
          style !== undefined
            ? {width, height, zIndex: 1, ...style}
            : {width, height, zIndex: 1}
        }
        resizeMode="contain"
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
      />
    </View>
  );
};

export default ImageLoader;
