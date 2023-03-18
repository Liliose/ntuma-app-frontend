import {View, Text} from 'react-native';
import React from 'react';
import {IClient} from '../../../interfaces';
import ImageLoader from '../image-loader';
import Icon from 'react-native-vector-icons/AntDesign';
import {APP_COLORS} from '../../constants/colors';
import {app} from '../../constants/app';

interface IUserImageProps {
  image: string;
  bgColor?: string;
  iconColor?: string;
  height?: number;
  width?: number;
  borderRadius?: number;
}
const UserImage = ({
  image,
  bgColor,
  iconColor,
  borderRadius,
  width,
  height,
}: IUserImageProps) => {
  return (
    <>
      {image?.trim() === '' ? (
        <View
          style={{
            height: height !== undefined ? height : 30,
            width: width !== undefined ? width : 30,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: borderRadius !== undefined ? borderRadius : 100,
            backgroundColor:
              bgColor !== undefined ? bgColor : APP_COLORS.MAROON,
          }}>
          <Icon
            name="user"
            size={width !== undefined ? width - 10 : 30 - 10}
            color={iconColor !== undefined ? iconColor : APP_COLORS.WHITE}
          />
        </View>
      ) : (
        <ImageLoader
          height={height !== undefined ? height : 30}
          width={width !== undefined ? width : 30}
          url={app.FILE_URL + image}
          style={{
            borderRadius: borderRadius !== undefined ? borderRadius : 100,
          }}
        />
      )}
    </>
  );
};

export default UserImage;
