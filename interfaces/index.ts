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
  fbToken: string;
  userId: number;
}

export interface ISystemFeesReducer {
  fees: ISystemFees;
  isLoading: boolean;
}
export interface IPackagingFeesReducer {
  fees: ISystemFees;
  isLoading: boolean;
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
  SOCKET_URL: string;
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
export interface IBannersReducer {
  banners: IBanner[];
  isLoading: boolean;
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
export interface ISystemFees {
  id: number;
  amount: number;
  createdAt: string;
  updatedAt: string;
}

export interface IPackagingFees {
  id: number;
  amount: number;
  createdAt: string;
  updatedAt: string;
}

export interface IBanner {
  id: number;
  urlOrComponentValue: string;
  image: string;
  hasUrl: boolean;
  hasScreenComponent: boolean;
  isActive: boolean;
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
  defaultPrice: number;
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
  deliveryCode: number;
  packagingFees: number;
  systemFees: number;
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

export interface ISocketData {
  type: string;
  data: any;
}

export enum EVENT_NAMES_ENUM {
  NtumaEventNames = 'NtumaEventNames',
  NtumaClientEventNames = 'NtumaClientEventNames',
  //markets
  ADD_MARKET = 'ADD_MARKET',
  UPDATE_MARKET = 'UPDATE_MARKET',
  DELETE_MARKET = 'DELETE_MARKET',

  //categories
  ADD_CATEGORY = 'ADD_CATEGORY',
  UPDATE_CATEGORY = 'UPDATE_CATEGORY',
  DELETE_CATEGORY = 'DELETE_CATEGORY',

  //products
  ADD_PRODUCT = 'ADD_PRODUCT',
  UPDATE_PRODUCT = 'UPDATE_PRODUCT',
  DELETE_PRODUCT = 'DELETE_PRODUCT',

  //product prices
  ADD_PRODUCT_PRICE = 'ADD_PRODUCT_PRICE',
  UPDATE_PRODUCT_PRICE = 'UPDATE_PRODUCT_PRICE',
  DELETE_PRODUCT_PRICE = 'DELETE_PRODUCT_PRICE',

  //delivery fees
  ADD_DELIVERY_FEES = 'ADD_DELIVERY_FEES',
  UPDATE_DELIVERY_FEES = 'UPDATE_DELIVERY_FEES',
  DELETE_DELIVERY_FEES = 'DELETE_DELIVERY_FEES',

  //notifications
  ADD_NOTIFICATON = 'ADD_NOTIFICATON',
  UPDATE_NOTIFICATON = 'UPDATE_NOTIFICATON',
  DELETE_NOTIFICATON = 'DELETE_NOTIFICATON',

  // =================
  //agents
  ADD_AGENT = 'ADD_AGENT',
  UPDATE_AGENT = 'UPDATE_AGENT',
  DELETE_AGENT = 'DELETE_AGENT',

  //agents earning type
  ADD_AGENTS_EARNING_TYPE = 'ADD_AGENTS_EARNING_TYPE',
  UPDATE_AGENTS_EARNING_TYPE = 'UPDATE_AGENTS_EARNING_TYPE',
  DELETE_AGENTS_EARNING_TYPE = 'DELETE_AGENTS_EARNING_TYPE',

  //agents market subscription
  ADD_AGENTS_MARKET_SUBSCRIPTION = 'ADD_AGENTS_MARKET_SUBSCRIPTION',
  UPDATE_AGENTS_MARKET_SUBSCRIPTION = 'UPDATE_AGENTS_MARKET_SUBSCRIPTION',
  DELETE_AGENTS_MARKET_SUBSCRIPTION = 'DELETE_AGENTS_MARKET_SUBSCRIPTION',

  //agents wallet
  ADD_AGENTS_WALLET = 'ADD_AGENTS_WALLET',
  UPDATE_AGENTS_WALLET = 'UPDATE_AGENTS_WALLET',
  DELETE_AGENTS_WALLET = 'DELETE_AGENTS_WALLET',

  //banners
  ADD_BANNERS = 'ADD_BANNERS',
  UPDATE_BANNERS = 'UPDATE_BANNERS',
  DELETE_BANNERS = 'DELETE_BANNERS',

  //dishes
  ADD_DISHES = 'ADD_DISHES',
  UPDATE_DISHES = 'UPDATE_DISHES',
  DELETE_DISHES = 'DELETE_DISHES',

  //dish PRODUCTS
  ADD_DISH_PRODUCTS = 'ADD_DISH_PRODUCTS',
  UPDATE_DISH_PRODUCTS = 'UPDATE_DISH_PRODUCTS',
  DELETE_DISH_PRODUCTS = 'DELETE_DISH_PRODUCTS',

  //messages
  ADD_MESSAGE = 'ADD_MESSAGE',
  UPDATE_MESSAGE = 'UPDATE_MESSAGE',
  DELETE_MESSAGE = 'DELETE_MESSAGE',

  //orders
  ADD_ORDER = 'ADD_ORDER',
  UPDATE_ORDER = 'UPDATE_ORDER',
  DELETE_ORDER = 'DELETE_ORDER',

  //riders
  ADD_RIDER = 'ADD_RIDER',
  UPDATE_RIDER = 'UPDATE_RIDER',
  DELETE_RIDER = 'DELETE_RIDER',

  //riders wallet
  ADD_RIDERS_WALLET = 'ADD_RIDERS_WALLET',
  UPDATE_RIDERS_WALLET = 'UPDATE_RIDERS_WALLET',
  DELETE_RIDERS_WALLET = 'DELETE_RIDERS_WALLET',

  //suppliers payment details
  ADD_SUPPLIERS_PAYMENT_DETAILS = 'ADD_SUPPLIERS_PAYMENT_DETAILS',
  UPDATE_SUPPLIERS_PAYMENT_DETAILS = 'UPDATE_SUPPLIERS_PAYMENT_DETAILS',
  DELETE_SUPPLIERS_PAYMENT_DETAILS = 'DELETE_SUPPLIERS_PAYMENT_DETAILS',

  //transactions
  ADD_TRANSACTION = 'ADD_TRANSACTION',
  UPDATE_TRANSACTION = 'UPDATE_TRANSACTION',
  DELETE_TRANSACTION = 'DELETE_TRANSACTION',

  //transactions
  ADD_USER = 'ADD_USER',
  UPDATE_USER = 'UPDATE_USER',
  DELETE_USER = 'DELETE_USER',

  //user's wallet
  ADD_WALLET = 'ADD_WALLET',
  UPDATE_WALLET = 'UPDATE_WALLET',
  DELETE_WALLET = 'DELETE_WALLET',

  //system fees
  ADD_SYSTEM_FEES = 'ADD_SYSTEM_FEES',
  UPDATE_SYSTEM_FEES = 'UPDATE_SYSTEM_FEES',
  //packaging fees
  ADD_PACKAGING_FEES = 'ADD_PACKAGING_FEES',
  UPDATE_PACKAGING_FEES = 'UPDATE_PACKAGING_FEES',
}

export enum USER_TYPE_ENUM {
  ADMIN = 'ADMIN',
  AGENT = 'AGENT',
  RIDER = 'RIDER',
  CLIENT = 'CLIENT',
}
