import {View, Text, Image, Dimensions, Pressable} from 'react-native';
import React from 'react';
import {app} from '../../../../constants/app';
import Icon from 'react-native-vector-icons/AntDesign';
import {currencyFormatter} from '../../../../helpers';
import {IProduct} from '../../../../../interfaces';
import {viewFlexCenter, viewFlexSpace} from '../../../../constants/styles';
import {APP_COLORS} from '../../../../constants/colors';

const {width} = Dimensions.get('window');

interface IProductItemProps {
  index: number;
  item: IProduct;
  setSelectedProduct: any;
  setShowModal: any;
}

const imageHeight = width / 2 - 90;

const ProductItem = ({
  index,
  item,
  setSelectedProduct,
  setShowModal,
}: IProductItemProps) => {
  return (
    <View
      key={index}
      style={[
        viewFlexSpace,
        {
          borderBottomColor: APP_COLORS.PRODUCT_CARD_BORDER,
          borderBottomWidth: 1,
          marginBottom: 10,
        },
      ]}>
      <View style={{position: 'relative'}}>
        <Image
          source={{uri: app.FILE_URL + item.image}}
          resizeMode="contain"
          style={{
            width: width / 2 - 50,
            height: imageHeight,
          }}
        />

        <View
          style={[
            viewFlexCenter,
            {
              position: 'absolute',
              top: 0,
              right: 0,
              padding: 10,
              borderRadius: 100,
              backgroundColor: APP_COLORS.DARK_GRAY,
              marginRight: 5,
              marginTop: 5,
            },
          ]}>
          <Icon name="hearto" size={25} color={APP_COLORS.BLACK} />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          paddingLeft: 10,
          height: '100%',
          position: 'relative',
        }}>
        <Text
          style={{
            color: APP_COLORS.BLACK,
            fontWeight: '600',
            textTransform: 'capitalize',
          }}>
          {item.name}
        </Text>
        <Text style={{color: APP_COLORS.TEXT_GRAY}}>{item.description}</Text>
        {item.priceType === 'single' && (
          <Text style={{color: APP_COLORS.TEXT_GRAY}}>
            <Text
              style={{
                color: APP_COLORS.BLACK,
                fontWeight: 'bold',
              }}>
              Price:
            </Text>{' '}
            {currencyFormatter(item.singlePrice)} RWF
          </Text>
        )}
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
          }}>
          <Pressable
            onPress={() => {
              setSelectedProduct(item);
              setShowModal(true);
            }}>
            <View
              style={{
                backgroundColor: APP_COLORS.MAROON,
                paddingHorizontal: 20,
                paddingVertical: 5,
              }}>
              <Text style={{color: APP_COLORS.WHITE, fontSize: 20}}>+</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ProductItem;
