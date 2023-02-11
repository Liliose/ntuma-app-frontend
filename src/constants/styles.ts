import {StyleProp} from 'react-native';
import {TextStyle, ViewStyle} from 'react-native';
import {APP_COLORS} from './colors';

export const viewFlexSpace: StyleProp<ViewStyle> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'row',
};

export const viewFlexCenter: StyleProp<ViewStyle> = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export const commonInput = {
  backgroundColor: APP_COLORS.WHITE,
  marginTop: 10,
  borderRadius: 5,
  padding: 10,
  borderWidth: 1,
  borderColor: APP_COLORS.BORDER_COLOR,
};

export const btnWithBgTextStyles: StyleProp<TextStyle> = {
  color: APP_COLORS.WHITE,
  textAlign: 'center',
  fontSize: 18,
};

export const btnWithBgContainerStyles: StyleProp<ViewStyle> = {
  backgroundColor: APP_COLORS.MAROON,
  padding: 15,
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
};

export const btnWithoutBgTextStyles: StyleProp<TextStyle> = {
  color: APP_COLORS.BLACK,
  textAlign: 'center',
  fontSize: 18,
};

export const btnWithoutBgContainerStyles: StyleProp<ViewStyle> = {
  borderColor: APP_COLORS.MAROON,
  borderWidth: 1,
  padding: 15,
  marginTop: 10,
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
};
