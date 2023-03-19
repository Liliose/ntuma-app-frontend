import {View, TextInput, Pressable, Text} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {commonInput, viewFlexSpace} from '../../../constants/styles';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../reducers';
import {setMarketsSearchResults} from '../../../actions/markets';
import {APP_COLORS} from '../../../constants/colors';
import {
  setProductsSearchKeyword,
  setProductsSearchResults,
} from '../../../actions/products';
import {addRecentSearchItem} from '../../../actions/recentSearches';

const SearchProductsHeader = () => {
  const dispatch = useDispatch();
  const {products, searchKeyword} = useSelector(
    (state: RootState) => state.products,
  );
  const inputRef = useRef<TextInput>(null);

  const [keyword, setKeyword] = useState<string>('');

  useEffect(() => {
    inputRef?.current && inputRef.current.focus();
    dispatch(setProductsSearchResults(products));
  }, []);

  useEffect(() => {
    let sub = true;
    if (sub) {
      setKeyword(searchKeyword);
      if (searchKeyword.trim().length === 0) {
        dispatch(setProductsSearchResults(products));
      } else {
        const results = products.filter(item =>
          item.name.toLowerCase().includes(searchKeyword.toLowerCase()),
        );
        dispatch(setProductsSearchResults(results));
      }
    }
    return () => {
      sub = false;
    };
  }, [searchKeyword]);

  const handleSearch = () => {
    if (keyword.trim().length > 0) {
      dispatch(setProductsSearchKeyword(keyword));
      dispatch(addRecentSearchItem(keyword));
    } else {
      dispatch(setProductsSearchResults(products));
    }
  };

  return (
    <View style={[viewFlexSpace, {width: '100%', flex: 1, marginBottom: 10}]}>
      <TextInput
        style={[
          commonInput,
          {
            flex: 1,
            borderRadius: 25,
            paddingVertical: 8,
            paddingHorizontal: 15,
            marginRight: 10,
          },
        ]}
        placeholder="Search Products"
        ref={inputRef}
        value={keyword}
        onChangeText={text => setKeyword(text)}
      />
      <Pressable onPress={() => handleSearch()}>
        <Text style={{color: APP_COLORS.WHITE}}>Search</Text>
      </Pressable>
    </View>
  );
};

export default SearchProductsHeader;
