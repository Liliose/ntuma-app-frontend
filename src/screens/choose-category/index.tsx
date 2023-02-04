import {
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useEffect} from 'react';
import {viewFlexSpace} from '../../constants/styles';
import {APP_COLORS} from '../../constants/colors';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import Loader from './loader';
import {fetchCategories, setSelectedCategory} from '../../actions/categories';
import {app} from '../../constants/app';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ICategory, INavigationProp} from '../../../interfaces';
const {height} = Dimensions.get('window');
const ChooseCategory = ({navigation}: INavigationProp) => {
  const dispatch = useDispatch();
  const {isLoading, categories} = useSelector(
    (state: RootState) => state.categories,
  );
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  const handleSelect = (item: ICategory) => {
    dispatch(setSelectedCategory(item));
    navigation.navigate('HomeTabs');
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
          <ScrollView>
            {categories.map((item, i) => (
              <Pressable key={i} onPress={() => handleSelect(item)}>
                <View
                  style={[
                    viewFlexSpace,
                    {
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      borderBottomColor: APP_COLORS.BORDER_COLOR,
                      borderBottomWidth: 1.5,
                    },
                  ]}>
                  <Image
                    source={{uri: app.FILE_URL + item.image}}
                    style={{width: 60, height: 60, borderRadius: 100}}
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
    </View>
  );
};

export default ChooseCategory;
