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

export const commonButtonWithBackgroundTextStyles: StyleProp<TextStyle> = {
  color: APP_COLORS.WHITE,
  textAlign: 'center',
  fontSize: 18,
  marginLeft: 10,
};

export const commonButtonWithBackgroundContainerStyles: StyleProp<ViewStyle> = {
  backgroundColor: APP_COLORS.MAROON,
  padding: 15,
  marginTop: 10,
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
};
