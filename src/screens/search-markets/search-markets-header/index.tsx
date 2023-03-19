import {View, TextInput} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {commonInput, viewFlexSpace} from '../../../constants/styles';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../reducers';
import {setMarketsSearchResults} from '../../../actions/markets';

const SearchMarketsHeader = () => {
  const dispatch = useDispatch();
  const {markets} = useSelector((state: RootState) => state.markets);
  const inputRef = useRef<TextInput>(null);

  const [keyword, setKeyword] = useState<string>('');

  useEffect(() => {
    inputRef?.current && inputRef.current.focus();
    dispatch(setMarketsSearchResults(markets));
  }, []);

  useEffect(() => {
    let sub = true;
    if (sub) {
      if (keyword.trim().length > 0) {
        const results = markets.filter(item =>
          item.name.toLowerCase().includes(keyword.toLowerCase()),
        );
        dispatch(setMarketsSearchResults(results));
      } else {
        dispatch(setMarketsSearchResults(markets));
      }
    }
    return () => {
      sub = false;
    };
  }, [keyword]);
  return (
    <View style={[viewFlexSpace, {width: '100%', flex: 1, marginBottom: 10}]}>
      <TextInput
        style={[
          commonInput,
          {
            width: '100%',
            borderRadius: 25,
            paddingVertical: 8,
            paddingHorizontal: 15,
          },
        ]}
        placeholder="Search Market"
        ref={inputRef}
        value={keyword}
        onChangeText={text => setKeyword(text)}
      />
    </View>
  );
};

export default SearchMarketsHeader;
