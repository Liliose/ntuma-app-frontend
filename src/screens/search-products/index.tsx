import {View, Text, Pressable, ScrollView} from 'react-native';
import React from 'react';
import {APP_COLORS} from '../../constants/colors';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import {viewFlexSpace} from '../../constants/styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImageLoader from '../../components/image-loader';
import {app} from '../../constants/app';

const SearchProducts = () => {
  const {searches} = useSelector((state: RootState) => state.recentSearches);
  const {productsSearchResults} = useSelector(
    (state: RootState) => state.products,
  );
  return (
    <View style={{flex: 1, backgroundColor: APP_COLORS.WHITE, padding: 10}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {searches.length > 0 && (
          <>
            <View style={[viewFlexSpace, {marginBottom: 5}]}>
              <Text style={{color: APP_COLORS.BLACK, fontWeight: '600'}}>
                Recently Searched
              </Text>
              <Pressable>
                <Text style={{color: APP_COLORS.MAROON}}>Clear All</Text>
              </Pressable>
            </View>
            {searches.slice(0, 3).map((item, index) => (
              <View style={[viewFlexSpace, {marginBottom: 5}]} key={index}>
                <Icon name="history" size={25} color={APP_COLORS.TEXT_GRAY} />
                <Text
                  style={{color: APP_COLORS.TEXT_GRAY, flex: 1, marginLeft: 5}}>
                  {item}
                </Text>
              </View>
            ))}
          </>
        )}
        <Text
          style={{
            color: APP_COLORS.BLACK,
            marginVertical: 10,
            fontWeight: '600',
          }}>
          Search Results
        </Text>
        {productsSearchResults.map((item, index) => (
          <Pressable style={{marginBottom: 10}} key={index}>
            <View style={[viewFlexSpace]}>
              <ImageLoader
                url={app.FILE_URL + item.image}
                width={50}
                height={50}
                style={{borderRadius: 100}}
              />
              <Text style={{flex: 1, color: APP_COLORS.BLACK, marginLeft: 10}}>
                {item.name}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default SearchProducts;
