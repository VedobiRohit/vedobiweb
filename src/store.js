import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducers from './reducers';
const middleware = [thunk];

export const store = createStore(
    reducers,
  composeWithDevTools(applyMiddleware(...middleware))
);

const state = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;
export const persistor = persistStore(store, state);
