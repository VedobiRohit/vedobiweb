import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import productsReducer from './products/products_reducers';
import sidebarReducer from './sidebar/sidebar_reducers';
import couponReducer from './products/coupon_reducers';
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['sidebar'],
};

const rootReducer = combineReducers({
  products: productsReducer,
  sidebar: sidebarReducer,
  coupons: couponReducer,
});

export default persistReducer(persistConfig, rootReducer);
