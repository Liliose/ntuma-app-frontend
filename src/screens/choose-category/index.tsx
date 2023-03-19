import {
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
  Pressable,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {viewFlexCenter, viewFlexSpace} from '../../constants/styles';
import {APP_COLORS} from '../../constants/colors';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import Loader from './loader';
import {
  fetchCategories,
  setIsHardReLoadingCategories,
  setSelectedCategory,
} from '../../actions/categories';
import {app} from '../../constants/app';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ICategory, INavigationProp} from '../../../interfaces';
import ImageLoader from '../../components/image-loader';
import CustomAlert from '../../components/custom-alert';
import FastImage from 'react-native-fast-image';
const {height} = Dimensions.get('window');
const ChooseCategory = ({navigation}: INavigationProp) => {
  const dispatch = useDispatch();
  const {isLoading, categories, hardReloading, loadingError} = useSelector(
    (state: RootState) => state.categories,
  );

  const [refreshing, setRefreshing] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  const handleSelect = (item: ICategory) => {
    dispatch(setSelectedCategory(item));
    navigation.navigate('HomeTabs');
  };

  useEffect(() => {
    let sub = true;
    if (sub) {
      loadingError.trim().length > 0 &&
        categories.length === 0 &&
        setShowAlert(true);
    }
    return () => {
      sub = false;
    };
  }, [loadingError]);

  useEffect(() => {
    let sub = true;
    if (sub) {
      !isLoading && refreshing && setRefreshing(false);
    }
    return () => {
      sub = false;
    };
  }, [isLoading]);

  const alertCallBack = () => {
    setShowAlert(false);
    dispatch(setIsHardReLoadingCategories(true));
    dispatch(fetchCategories());
  };

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(setIsHardReLoadingCategories(true));
    dispatch(fetchCategories());
  };
  return (
    <View
      style={[
        viewFlexSpace,
        {flex: 1, backgroundColor: APP_COLORS.WHITE, alignItems: 'flex-start'},
      ]}>
      <View>
        <Image
          source={require('../../assets/imigongo.png')}
          style={{width: 15, height}}
        />
      </View>
      <View style={{flex: 1}}>
        <Text
          style={{
            color: APP_COLORS.MAROON,
            fontSize: 20,
            marginLeft: 20,
            marginVertical: 20,
          }}>
          Product Categories
        </Text>
        {isLoading && categories.length === 0 ? (
          <Loader />
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}>
            {categories.map((item, i) => (
              <Pressable key={i} onPress={() => handleSelect(item)}>
                <View
                  style={[
                    viewFlexSpace,
                    {
                      paddingVertical: 5,
                      paddingHorizontal: 20,
                      borderBottomColor: APP_COLORS.BORDER_COLOR,
                      borderBottomWidth: 1.5,
                    },
                  ]}>
                  <ImageLoader
                    url={app.FILE_URL + item.image}
                    width={60}
                    height={60}
                    style={{borderRadius: 100}}
                  />
                  <Text
                    style={{
                      color: APP_COLORS.BLACK,
                      fontWeight: 'bold',
                      fontSize: 16,
                      flex: 1,
                      marginHorizontal: 10,
                      textTransform: 'capitalize',
                    }}>
                    {item.name}
                  </Text>
                  <Icon name="angle-right" size={30} color={APP_COLORS.BLACK} />
                </View>
              </Pressable>
            ))}
          </ScrollView>
        )}
      </View>
      <CustomAlert
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        confirmationTitle="Try Again"
        callBack={alertCallBack}>
        <View style={[viewFlexCenter]}>
          <FastImage
            source={require('../../assets/error-black.gif')}
            style={{width: 120, height: 120}}
          />
          <Text
            style={{
              color: APP_COLORS.MAROON,
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            Something Went Wrong
          </Text>
          <Text style={{color: APP_COLORS.TEXT_GRAY}}>{loadingError}</Text>
        </View>
      </CustomAlert>
    </View>
  );
};

export default ChooseCategory;
