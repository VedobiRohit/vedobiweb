import { FETCH_PRODUCTS } from "../actions/types";


const initialState = {
    loading: true,
    products: [],
  };
  

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return {
              ...state,
              loading: false,
              products: action.payload,
            };
            
        default:
            return state;
    }
};