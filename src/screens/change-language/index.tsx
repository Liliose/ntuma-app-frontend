import {View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import {APP_COLORS} from '../../constants/colors';
import {viewFlexSpace} from '../../constants/styles';
import Icon from 'react-native-vector-icons/Fontisto';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import {setLanguage} from '../../actions/language';
import i18next, {t} from 'i18next';
import RNRestart from 'react-native-restart';
import FullPageLoader from '../../components/full-page-loader';

const ChangeLanguage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const {language} = useSelector((state: RootState) => state.language);
  const handleChangeLanguage = (lang: string) => {
    dispatch(setLanguage(lang));
    i18next.changeLanguage(lang);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      RNRestart.restart();
    }, 1000);
  };
  return (
    <View
      style={{flex: 1, paddingVertical: 20, backgroundColor: APP_COLORS.WHITE}}>
      <Pressable onPress={() => handleChangeLanguage('en')}>
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
      <Pressable onPress={() => handleChangeLanguage('kinya')}>
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
      <FullPageLoader isLoading={isLoading} />
    </View>
  );
};

export default ChangeLanguage;
