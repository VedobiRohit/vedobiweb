

import {
  COUPON_APPLIED,
  COUPON_REMOVE,
STATE_LIST,
} from "./products_types";

const initialState = {
  loading: true,
  datacoupon: [],
  statesList: [],

};

const couponReducer = (state = initialState, action) => {
  //console.log("Action=============>",action)
  switch (action.type) {
    case COUPON_APPLIED:
      return {
        ...state,
        loading: false,
        datacoupon: action.payload,
      };
    case COUPON_REMOVE:
      return {
        ...state,
        loading: false,
        datacoupon: action.payload,
      };
    case STATE_LIST:
      return {
        ...state,
        loading: false,
        statesList: action.payload, 
      };

    default:
      return state;
  }
};

export default couponReducer;
