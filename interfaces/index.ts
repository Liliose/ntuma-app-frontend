import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export interface IUser {
  token: string;
  names: string;
  phone: string;
  walletAmounts: number;
  email: string;
  image: string;
  role: string;
  userId: number;
}

export interface IRecentSearchesReducer {
  searches: string[];
}

export interface IClient {
  agentId: number;
  names: string;
  email: string;
  phone: string;
  image: string;
}

export interface IclientsReducer {
  clients: IClient[];
  isLoading: boolean;
  loadingError: string;
}

export interface IWalletTransaction {
  id: number;
  userId: number;
  transactionType: string;
  amount: number;
  transactionId: string;
  paymentPhoneNumber: string;
  paymentStatus: string;
  createdAt: string;
}

export interface IAction {
  type: string;
  payload: any;
}

export interface IAppConfig {
  BACKEND_URL: string;
  FILE_URL: string;
}

export interface INavigationProp {
  navigation: StackNavigationProp<any>;
  route?: RouteProp<any>;
}

export interface INavigationPropWithRouteRequired {
  navigation: StackNavigationProp<any>;
  route: RouteProp<any>;
}

export interface IMarket {
  mId: number;
  name: string;
  address: string;
  lat: string;
  long: string;
  image: string;
  isActive: boolean;
  createdAt: string;
}

export enum TOAST_MESSAGE_TYPES {
  ERROR = 'error',
  INFO = 'info',
  SUCCESS = 'success',
}
export interface ICartReducer {
  cart: ICartItem[];
}
export interface IMarketsReducer {
  markets: IMarket[];
  isLoading: boolean;
  selectedMarket: IMarket | undefined;
  hardReloading: boolean;
  loadingError: string;
  marketSearchResults: IMarket[];
}
export interface IDeliveryFeesReducer {
  fees: IDeliveryFee[];
  isLoading: boolean;
}
export interface ICategoriesReducer {
  categories: ICategory[];
  isLoading: boolean;
  selectedCategory: ICategory | undefined;
  hardReloading: boolean;
  loadingError: string;
}
export interface IDishesReducer {
  dishes: IDish[];
  isLoading: boolean;
  hardReloading: boolean;
  loadingError: string;
}
export interface ICategory {
  id: number;
  name: string;
  image: string;
  createdAt: string;
}

export interface IDishProduct {
  dpId: number;
  marketId: number;
  dishId: number;
  productId: number;
  createdAt: string;
  updatedAt: string;
}

export interface IDish {
  id: number;
  marketId: number;
  name: string;
  utubeLink: string;
  image: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  products: IDishProduct[];
}

export interface IOrdersReducer {
  orders: IOrder[];
  isLoading: boolean;
}

export interface IProduct {
  pId: number;
  marketId: number;
  categoryId: number;
  name: string;
  description: string;
  priceType: string;
  supportsDynamicPrice: boolean;
  singlePrice: number;
  image: string;
  isActive: boolean;
}

export interface IProductPrice {
  ppId: number;
  productId: number;
  name: string;
  amount: number;
}

export interface IProductsReducer {
  products: IProduct[];
  productsSearchResults: IProduct[];
  isLoading: boolean;
  hardReloading: boolean;
  loadingError: string;
  searchKeyword: string;
}

export interface IWalletTransactionsReducer {
  transactions: IWalletTransaction[];
  isLoading: boolean;
}

export interface IFavouritesReducer {
  favourites: IProduct[];
}

export interface ILocationsReducer {
  locations: ILocation[];
}

export interface IProductPricesReducer {
  prices: IProductPrice[];
  isLoading: boolean;
}

export enum PRICE_TYPE_ENUM {
  SINGLE = 'single',
  MANY = 'many',
}

export interface ICartItem {
  price: number;
  ppId: number;
  productId: number;
  priceType: string;
  customPrice: boolean;
  quantity: number;
}

export interface IDeliveryFee {
  id: number;
  vehicleType: string;
  amountPerKilometer: number;
  defaultAmount: number;
}

export interface ILocation {
  name: string;
  data: any;
  details: any;
  description: string;
  houseNumber: string;
}

export enum VEHICLES_ENUM {
  BIKE = 'BIKE',
  CAR = 'CAR',
  MOTORCYCLE = 'MOTORCYCLE',
}

export enum PAYMENT_STATUS_ENUM {
  PENDING = 'PENDING',
  FAILED = 'FAILED',
  SUCCESS = 'SUCCESS',
}

export interface IOrder {
  id: number;
  marketId: number;
  userId: number;
  cartItems: ICartItem[];
  cartTotalAmount: number;
  distance: number;
  paymentMethod: string;
  paymentPhoneNumber: number;
  deliveryAddress: ILocation;
  deliveryVehicle: IDeliveryFee;
  deliveryFees: number;
  deliveryStatus: string;
  transactionId: string;
  paymentStatus: PAYMENT_STATUS_ENUM;
  failureReason: string;
  agentId: number | null;
  riderId: number | null;
  confirmationRiderId: number | null;
  isRiderConfirmed: boolean;
  areAllSuppliersPaid: boolean;
  acceptedAt: string;
  sentAt: string;
  deliveredAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface INotificaton {
  id: number;
  userId: number;
  userType: string;
  title: string;
  message: string;
  isViewed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface INotificationsReducer {
  notifications: INotificaton[];
  isLoading: boolean;
  showConfirmation: boolean;
  hardReloading: boolean;
  loadingError: string;
}

export enum MESSAGE_TYPES_ENUM {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
}

export enum MESSAGE_STATUS_ENUM {
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
  READ = 'READ',
}

export enum SENDER_TYPE_ENUM {
  'AGENT' = 'agent',
  'CLIENT' = 'client',
}

export interface IMessage {
  id: number;
  agentId: number;
  userId: number;
  senderId: number;
  senderType: SENDER_TYPE_ENUM;
  messageType: MESSAGE_TYPES_ENUM;
  textMessage: string;
  file: string;
  status: MESSAGE_STATUS_ENUM;
  createdAt: string;
  updatedAt: string;
}

export interface IMessagesReducer {
  messages: IMessage[];
  isLoading: boolean;
  hardReloading: boolean;
  loadingError: string;
}
