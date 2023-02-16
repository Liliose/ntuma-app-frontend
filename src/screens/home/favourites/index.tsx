import {View, Text, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {APP_COLORS} from '../../../constants/colors';
import {useSelector} from 'react-redux';
import {RootState} from '../../../reducers';
import ProductItem from './product-item';
import ProductPreview from '../products-tabs/preview';
import {INavigationProp, IProduct} from '../../../../interfaces';

const Favourites = ({navigation}: INavigationProp) => {
  const {favourites} = useSelector((state: RootState) => state.favourites);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | undefined>(
    undefined,
  );
  return (
    <View style={{flex: 1, backgroundColor: APP_COLORS.WHITE, padding: 10}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {favourites.map((item, index) => (
          <ProductItem
            key={index}
            index={index}
            item={item}
            setShowModal={setShowModal}
            setSelectedProduct={setSelectedProduct}
          />
        ))}
      </ScrollView>
      <ProductPreview
        setShowModal={setShowModal}
        showModal={showModal}
        product={selectedProduct}
        navigation={navigation}
      />
    </View>
  );
};

export default Favourites;
