import {View, Text, ScrollView, Pressable, Linking} from 'react-native';
import React from 'react';
import {APP_COLORS} from '../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {viewFlexSpace} from '../../constants/styles';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import {t} from 'i18next';

const HelpAndSupport = () => {
  const handleCall = () => {
    Linking.openURL(`tel:0788712248`);
  };
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
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: APP_COLORS.WHITE,
        paddingVertical: 20,
      }}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View
          style={[
            viewFlexSpace,
            {
              borderBottomColor: APP_COLORS.BORDER_COLOR,
              borderBottomWidth: 1,
              padding: 10,
            },
          ]}>
          <Icon name="email" size={20} color={APP_COLORS.BLACK} />
          <Text style={{flex: 1, marginLeft: 10, color: APP_COLORS.BLACK}}>
            info@ntuma.rw
          </Text>
        </View>
        <Pressable onPress={handleCall}>
          <View
            style={[
              viewFlexSpace,
              {
                borderBottomColor: APP_COLORS.BORDER_COLOR,
                borderBottomWidth: 1,
                padding: 10,
              },
            ]}>
            <Icon name="phone" size={20} color={APP_COLORS.BLACK} />
            <Text style={{flex: 1, marginLeft: 10, color: APP_COLORS.BLACK}}>
              0788712248
            </Text>
          </View>
        </Pressable>
        <Pressable onPress={() => openLink('https://ntuma.rw/contact-us.html')}>
          <View
            style={[
              viewFlexSpace,
              {
                borderBottomColor: APP_COLORS.BORDER_COLOR,
                borderBottomWidth: 1,
                padding: 10,
              },
            ]}>
            <Icon name="message" size={20} color={APP_COLORS.BLACK} />
            <Text style={{flex: 1, marginLeft: 10, color: APP_COLORS.BLACK}}>
              {t('contactUsText')}
            </Text>
            <Icon2 name="angle-right" size={20} color={APP_COLORS.BLACK} />
          </View>
        </Pressable>
        <Pressable onPress={() => openLink('https://ntuma.rw/terms.html')}>
          <View
            style={[
              viewFlexSpace,
              {
                borderBottomColor: APP_COLORS.BORDER_COLOR,
                borderBottomWidth: 1,
                padding: 10,
              },
            ]}>
            <Icon
              name="airballoon-outline"
              size={20}
              color={APP_COLORS.BLACK}
            />
            <Text style={{flex: 1, marginLeft: 10, color: APP_COLORS.BLACK}}>
              {t('termsText')}
            </Text>
            <Icon2 name="angle-right" size={20} color={APP_COLORS.BLACK} />
          </View>
        </Pressable>
        <Pressable
          onPress={() => openLink('https://ntuma.rw/privacy-policy.html')}>
          <View
            style={[
              viewFlexSpace,
              {
                borderBottomColor: APP_COLORS.BORDER_COLOR,
                borderBottomWidth: 1,
                padding: 10,
              },
            ]}>
            <Icon
              name="application-cog-outline"
              size={20}
              color={APP_COLORS.BLACK}
            />
            <Text style={{flex: 1, marginLeft: 10, color: APP_COLORS.BLACK}}>
              {t('privacyPolicyText')}
            </Text>
            <Icon2 name="angle-right" size={20} color={APP_COLORS.BLACK} />
          </View>
        </Pressable>
        <Pressable onPress={() => openLink('https://ntuma.rw/faq.html')}>
          <View
            style={[
              viewFlexSpace,
              {
                borderBottomColor: APP_COLORS.BORDER_COLOR,
                borderBottomWidth: 1,
                padding: 10,
              },
            ]}>
            <Icon
              name="approximately-equal-box"
              size={20}
              color={APP_COLORS.BLACK}
            />
            <Text style={{flex: 1, marginLeft: 10, color: APP_COLORS.BLACK}}>
              {t('faqText')}
            </Text>
            <Icon2 name="angle-right" size={20} color={APP_COLORS.BLACK} />
          </View>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default HelpAndSupport;
