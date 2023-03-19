import {View, Text, Image, Dimensions, Pressable, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {app} from '../../../../constants/app';
import Icon from 'react-native-vector-icons/AntDesign';
import {currencyFormatter} from '../../../../helpers';
import {IProduct} from '../../../../../interfaces';
import {viewFlexCenter, viewFlexSpace} from '../../../../constants/styles';
import {APP_COLORS} from '../../../../constants/colors';
import {
  addFavouriteItem,
  removeFavouriteItem,
} from '../../../../actions/favourites';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../../reducers';
import ImageLoader from '../../../../components/image-loader';

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
  const dispatch = useDispatch();
  const {favourites} = useSelector((state: RootState) => state.favourites);
  const [productExistsInFavList, setProductExistsInFavList] = useState(false);
  useEffect(() => {
    const exists = favourites.find(i => i.pId === item.pId);
    if (exists) {
      setProductExistsInFavList(true);
    } else {
      setProductExistsInFavList(false);
    }
  }, [item]);

  const addToFavList = () => {
    dispatch(addFavouriteItem(item));
    setProductExistsInFavList(true);
  };

  const removeFromFavList = () => {
    Alert.alert(
      'Confirmation',
      'Do you want to remove this product from favourite list?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'confirm',
          onPress: () => {
            dispatch(removeFavouriteItem(item));
            setProductExistsInFavList(false);
          },
        },
      ],
      {cancelable: true},
    );
  };

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
        <Pressable
          onPress={() => {
            setSelectedProduct(item);
            setShowModal(true);
          }}>
          <ImageLoader
            url={app.FILE_URL + item.image}
            width={width / 2 - 50}
            height={imageHeight}
          />
        </Pressable>

        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
          }}>
          {productExistsInFavList ? (
            <Pressable onPress={() => removeFromFavList()}>
              <View
                style={[
                  viewFlexCenter,
                  {
                    padding: 10,
                    borderRadius: 100,
                    backgroundColor: APP_COLORS.MAROON,
                    marginRight: 5,
                    marginTop: 5,
                  },
                ]}>
                <Icon name="hearto" size={25} color={APP_COLORS.WHITE} />
              </View>
            </Pressable>
          ) : (
            <Pressable onPress={() => addToFavList()}>
              <View
                style={[
                  viewFlexCenter,
                  {
                    padding: 10,
                    borderRadius: 100,
                    backgroundColor: APP_COLORS.DARK_GRAY,
                    marginRight: 5,
                    marginTop: 5,
                  },
                ]}>
                <Icon name="hearto" size={25} color={APP_COLORS.BLACK} />
              </View>
            </Pressable>
          )}
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
