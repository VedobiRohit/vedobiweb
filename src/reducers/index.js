import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import productsReducer from '../redux/products/products_reducers';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['sidebar'],
};

const rootReducer = combineReducers({
  products: productsReducer
});

export default persistReducer(persistConfig, rootReducer);
