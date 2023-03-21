import {View, Linking, Dimensions, Pressable} from 'react-native';
import React from 'react';
import {APP_COLORS} from '../../../../constants/colors';
import {IBanner, INavigationProp} from '../../../../../interfaces';
import Carousel from 'pinar';
import FastImageLoader from '../../../../components/fast-image-loader';
import {app} from '../../../../constants/app';
import ImageLoader from '../../../../components/image-loader';

interface IBannersProps extends INavigationProp {
  banners: IBanner[];
}
const {width} = Dimensions.get('window');
const Banners = ({banners, navigation}: IBannersProps) => {
  const openLink = async (url: string) => {
    if (await Linking.canOpenURL(url)) {
      await Linking.openURL(url);
    } else {
      console.log(`Unable to open URL: ${url}`);
      //@ts-ignore
      alert(`Unable to open URL: ${url}`);
      //@ts-ignore
    }
  };

  const handleClick = (item: IBanner) => {
    if (item.hasScreenComponent) {
      navigation.navigate(item.urlOrComponentValue);
    }
    if (item.hasUrl) {
      openLink(item.urlOrComponentValue);
    }
  };

  return (
    <View style={{padding: 10, height: 100}}>
      <Carousel loop={true} showsControls={false} autoplay={banners.length > 0}>
        {banners.map((item, index) => (
          <Pressable key={index} onPress={() => handleClick(item)}>
            <View>
              <FastImageLoader
                url={app.FILE_URL + item.image}
                height={100}
                width={width - 10}
                isBanner={true}
              />
            </View>
          </Pressable>
        ))}
      </Carousel>
    </View>
  );
};

export default Banners;
