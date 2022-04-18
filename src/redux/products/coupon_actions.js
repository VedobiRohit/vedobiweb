import axios from "axios";
import { baseUrl } from "../../utils/global";
import {
  COUPON_APPLIED,
  COUPON_REMOVE,
  STATE_LIST,
} from "./products_types";

const Api = "api/CouponDiscount";
const urlCounpon = baseUrl + Api;
export const applyPromoCode = (promoCode, totalPrice, addToast) => {
  return async (dispatch) => {
    try {
        await axios
        .post(urlCounpon, {
          couponcode: promoCode,
          totalcartamount: totalPrice,
        })
        .then((response) => {
          if (response.data.status === true) {
            let coupan_type = response.data.data.coupan_type;
            let coupan_discount = response.data.data.coupan_discount;
            let couponcode = response.data.data.couponcode;
            let remark = response.data.data.remark;
            let max_discount = response.data.data.maximum_discount_amount
            let DiscountValue = "";

            if (coupan_type === "%") {
              const setDiscountAmount = (totalPrice * coupan_discount) / 100;
              if (max_discount> 0) {
                if (setDiscountAmount >= max_discount) {
                  DiscountValue = max_discount;
                } else {
                  DiscountValue = setDiscountAmount;
                }
              }
              else {
                DiscountValue = setDiscountAmount;
              }
              
              dispatch({
                type: COUPON_APPLIED,
                payload: {
                  discountamount: DiscountValue,
                  coupan_type: coupan_type,
                  coupan_discount: coupan_discount,
                  couponcode: couponcode,
                  remark: remark,
                  message: response.data.message,
                },
              });
            }
            if (coupan_type === "Rs.") {
              DiscountValue = response.data.data.coupan_discount;
              dispatch({
                type: COUPON_APPLIED,
                payload: {
                  discountamount: DiscountValue,
                  coupan_type: coupan_type,
                  coupan_discount: coupan_discount,
                  couponcode: couponcode,
                  remark: remark,
                  message: response.data.message,
                },
              });
            }
            addToast(response.data.message, {
              appearance: "success",
              autoDismiss: true,
            });
          }

          if (response.data.status === false) {
            if (response.data.codenot === false) {
              addToast(response.data.message, {
                appearance: "error",
                autoDismiss: true,
              });
            } else {
              if (response.data.message==='Coupon code expired!') {
                addToast(response.data.message, {
                  appearance: "error",
                  autoDismiss: true,
                });
              } else {
                console.log(response.data.message)
              }
              
              //dispatch({ type: COUPON_APPLIED_ERROR, payload: { discountamount: '',coupan_type: '' ,coupan_discount: '' ,couponcode: '',remark:'' ,message:response.data.message} })
            }
          }
        });
    } catch (error) {
      // console.log(error);
    }
  };
};

export const RemovePromoCode = (promoCode = "", addToast = null) => {
  if (addToast) {
    addToast("Coupon Code Removed", { appearance: "error", autoDismiss: true, });
  }
  return async (dispatch) => { dispatch({ type: COUPON_REMOVE, payload: { discountamount: '', coupan_type: '', coupan_discount: '', couponcode: '', remark: '', message: '' } }) };
}

const URLState = baseUrl + "api/StateAllList";
export const fetchStateList = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(URLState);
      dispatch({ type: STATE_LIST, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
};