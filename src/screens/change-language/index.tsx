import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {APP_COLORS} from '../../constants/colors';
import {viewFlexSpace} from '../../constants/styles';
import Icon from 'react-native-vector-icons/Fontisto';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import {setLanguage} from '../../actions/language';
import i18next, {t} from 'i18next';

const ChangeLanguage = () => {
  const dispatch = useDispatch();
  const {language} = useSelector((state: RootState) => state.language);
  return (
    <View
      style={{flex: 1, paddingVertical: 20, backgroundColor: APP_COLORS.WHITE}}>
      <Pressable
        onPress={() => {
          dispatch(setLanguage('en'));
          i18next.changeLanguage('en');
        }}>
        <View
          style={[
            viewFlexSpace,
            {
              padding: 10,
              borderBottomColor: APP_COLORS.BORDER_COLOR,
              borderBottomWidth: 1,
            },
          ]}>
          <Text style={{color: APP_COLORS.BLACK}}>English</Text>
          <Icon
            name={
              language === '' || language === 'en'
                ? 'checkbox-active'
                : 'checkbox-passive'
            }
            size={25}
            color={APP_COLORS.BLACK}
          />
        </View>
      </Pressable>
      <Pressable
        onPress={() => {
          dispatch(setLanguage('kinya'));
          i18next.changeLanguage('kinya');
        }}>
        <View
          style={[
            viewFlexSpace,
            {
              padding: 10,
              borderBottomColor: APP_COLORS.BORDER_COLOR,
              borderBottomWidth: 1,
            },
          ]}>
          <Text style={{color: APP_COLORS.BLACK}}>Ikinyarwanda</Text>
          <Icon
            name={language === 'kinya' ? 'checkbox-active' : 'checkbox-passive'}
            size={25}
            color={APP_COLORS.BLACK}
          />
        </View>
      </Pressable>

      <Text>{t('welcomeText')}</Text>
    </View>
  );
};

export default ChangeLanguage;
