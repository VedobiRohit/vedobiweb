import axios from "axios";
import { baseUrl, token } from "../../utils/global";
import {
  FETCH_PRODUCTS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  DECREASE_ITEM,
  INCREASE_ITEM,
  ADD_GIFT_TO_PRODUCT_LIST,
  SET_PRODUCTS,
  FETCH_CATEGORY,
  DELETE_ALL_FROM_CART,
  SEARCH_PRODUCT_LIST_REQUEST,
  SEARCH_PRODUCT_LIST_SUCCESS,
  SEARCH_PRODUCT_LIST_FAIL,
  RECENTVIEW_PRODUCT,
  CATEGORY_PRODUCT_LIST_SUCCESS,
  CATEGORY_PRODUCT_LIST_FAIL,
  CATEGORY_PRODUCT_LIST_REQUEST,
  SUBCATEGORY_PRODUCT_LIST_REQUEST,
  SUBCATEGORY_PRODUCT_LIST_SUCCESS,
  SUBCATEGORY_PRODUCT_LIST_FAIL,
  SUBCATEGORY_FOOTER,
  FETCH_ALL_CATEGORY,
  SET_CART_ID,
  FETCH_PAYMENT_TYPES,
  SET_CART_DETAILS,
  SET_LOADING,
  OPEN_UPSELL_MODAL,
  SET_AD_MODAL,
  ADD_UPSELL_TO_PRODUCT_LIST,
  SET_SINGLE_PRODUCT_DETAILS,
  SET_HOME_BANNER,
  BLOG_POST_LIST,
  BLOG_POST_VIEWS,
  BLOG_TOP_TEN,
  SETSINGLE_BLOG_DETAILS,
  CURRENT_BLOG,
  CURRENT_LOCATION,
  UPDATE_CURRENT_LOCATION,
  UPDATE_CURRENT_LOCATION_USER,
  UPDATE_LOCATION_HISTORY,
  BRANDLOGO,
  USER_REVIEWS,
  FETCH_PRODUCTS_BESTSELLERS,
  FETCH_PRODUCTS_FEATURED,
  FETCH_PRODUCTS_ARRIVALS,
  FETCH_PRODUCTS_TOPDISCOUNT,
  FETCH_PRODUCTS_TOPRECOMMENDS,
} from "./products_types";

const URL = baseUrl + "api/productAllList";
export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.post(URL, { token: token });
      dispatch({ type: FETCH_PRODUCTS, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
};

const URLBlog = baseUrl + "api/BlogList";
export const fetchBlogList = (name, history) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(URLBlog, { token: token, name: name });
      dispatch({ type: BLOG_POST_LIST, payload: response.data.Blogdata });
      history.push(`/blogs/ayurveda-book`);
    } catch (error) {
      console.log(error);
    }
  };
};

const URLBlogTopTen = baseUrl + "api/BlogListTopTenPost";
export const fetchBlogTopTen = () => {
  return async (dispatch) => {
    try {
      const response = await axios.post(URLBlogTopTen, { token: token });
      // console.log("==============>",response)
      dispatch({ type: BLOG_TOP_TEN, payload: response.data.CountPostData });
    } catch (error) {
      console.log(error);
    }
  };
};

const URLogo = baseUrl + "api/BrandLogo";
export const fetchBrandLogo = () => {
  return async (dispatch) => {
    try {
      const response = await axios.post(URLogo, { token: token });
      dispatch({ type: BRANDLOGO, payload: response.data.Logodata });
    } catch (error) {
      console.log(error);
    }
  };
};

const URLBlogCurrent = baseUrl + "api/BlogListCurrentPost";
export const fetchBlogCurrentList = () => {
  return async (dispatch) => {
    try {
      const response = await axios.post(URLBlogCurrent, { token: token });
      dispatch({ type: CURRENT_BLOG, payload: response.data.CurrentPostData });
    } catch (error) {
      console.log(error);
    }
  };
};

const URLBlogDetails = baseUrl + "api/BlogDetails";
export const BlogDetailsFecth = (Postname) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URLBlogDetails}/${Postname}`);
      dispatch({
        type: SETSINGLE_BLOG_DETAILS,
        payload: response.data.BlogDetails,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const URLAllCat = baseUrl + "api/menu-category";

export const fetchAllCategories = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(URLAllCat);
      dispatch({ type: FETCH_ALL_CATEGORY, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
};
//
const URLCat = baseUrl + "api/CategoryAllList";

export const fetchCategory = () => {
  return async (dispatch) => {
    try {
      const response = await axios.post(URLCat, { token: token });
      dispatch({ type: FETCH_CATEGORY, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
};

const URLSubCat = baseUrl + "api/SubCategoryAllList";

export const fetchSubCategory = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(URLSubCat);
      dispatch({ type: SUBCATEGORY_FOOTER, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
};

const URLSearch = baseUrl + "api/productsearch";
export const searchProducts = (name, history) => async (dispatch) => {
  try {
    dispatch({
      type: SEARCH_PRODUCT_LIST_REQUEST,
    });

    await axios.post(URLSearch, { name: name }).then((response) => {
      dispatch({ type: SEARCH_PRODUCT_LIST_SUCCESS, payload: response.data });
      history.push(`/search/`);
    });
  } catch (error) {
    dispatch({
      type: SEARCH_PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.response,
    });
  }
};

const URLCatProduct = baseUrl + "api/CategoryProductAll";
export const FetchCategoryProducts = (cat_id) => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORY_PRODUCT_LIST_REQUEST,
    });

    await axios.get(`${URLCatProduct}/${cat_id}`).then((response) => {
      dispatch({
        type: CATEGORY_PRODUCT_LIST_SUCCESS,
        payload: response.data,
      });
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.response,
    });
  }
};

const URLSubCatProduct = baseUrl + "api/SubCategoryProductAll";
export const FetchSubCategoryProducts = (sub_id) => async (dispatch) => {
  try {
    dispatch({
      type: SUBCATEGORY_PRODUCT_LIST_REQUEST,
    });
    dispatch(setLoading(true));

    await axios.get(`${URLSubCatProduct}/${sub_id}`).then((response) => {
      dispatch({
        type: SUBCATEGORY_PRODUCT_LIST_SUCCESS,
        payload: response.data,
      });
    });
  } catch (error) {
    dispatch({
      type: SUBCATEGORY_PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.response,
    });
  }
};

export const RecentVeiwProduct = (itemID) => {
  return {
    type: RECENTVIEW_PRODUCT,
    payload: itemID,
  };
};

export const addToCart = (
  itemID,
  addToast,
  attributePrice = "",
  isUpsellProduct = false,
  parentUpsellId
) => {
  if (addToast) {
    addToast("Added To Cart", { appearance: "success", autoDismiss: true });
  }

  return {
    type: ADD_TO_CART,
    payload: itemID,
    isUpsellProduct,
    parentUpsellId,
    attributePrice,
  };
};

export const removeFromCart = (itemID, addToast) => {
  if (addToast) {
    addToast("Removed From Cart", { appearance: "error", autoDismiss: true });
  }
  //console.log("remove");
  return {
    type: REMOVE_FROM_CART,
    payload: {
      pid: itemID,
    },
  };
};

export const decreaseItem = (itemID, addToast) => {
  if (addToast) {
    addToast("Item Decremented From Cart", {
      appearance: "warning",
      autoDismiss: true,
    });
  }
  return {
    type: DECREASE_ITEM,
    payload: itemID,
  };
};

export const increaseItem = (itemID, addToast) => {
  if (addToast) {
    addToast("Item increased From Cart", {
      appearance: "success",
      autoDismiss: true,
    });
  }
  //console.log(`increase :${itemID}`);
  return {
    type: INCREASE_ITEM,
    payload: itemID,
  };
};

export const cartItemStock = (item) => {
  if (item?.stock_qty) {
    return item.stock_qty;
  } else {
    return item;
  }
};

//http://vedobishop.com/mystore/api/productGift/60

const fetchGiftUrl = baseUrl + "api/productGift";
export const fetchGift = (id) => {
  return (dispatch) => {
    return new Promise(async (resolve) => {
      const response = await axios.get(`${fetchGiftUrl}/${id}`);
      //console.log("gift", response.data);
      if (response.data.status) {
        dispatch({
          type: ADD_GIFT_TO_PRODUCT_LIST,
          payload: response.data.Gift[0],
        });
        resolve({ status: true, giftPid: response?.data?.Gift[0]?.pid });
      } else {
        console.log("Something went wrong in gift fetching!");
        resolve({ status: false });
      }
    });
  };
};

const fetchUpsellUrl = baseUrl + "api/productUpsell";
export const fetchUpsell = (id) => {
  return (dispatch) => {
    return new Promise(async (resolve) => {
      const response = await axios.get(`${fetchUpsellUrl}/${id}`);
      if (response.data.status) {
        dispatch({
          type: ADD_UPSELL_TO_PRODUCT_LIST,
          payload: response.data.UpsellData,
          parentId: id,
        });

        dispatch({
          type: OPEN_UPSELL_MODAL,
          modalState: true,
          products: response.data.UpsellData,
          parentId: id,
        });
        resolve({ status: true, upsellProducts: response.data.UpsellData });
      } else {
        console.log("Something went wrong in upsell fetching!");
        resolve({ status: false });
      }
    });
  };
};

const tractActionUrl = baseUrl + "api/UserLogvisiter";
export const trackEvent = (event, pathname) => {
  return (dispatch, getState) => {
    const { user } = getState().products;
    // const loc = currentLocationHistory[0];

    const uDetails = {
      email: user ? user.email : "",
      phone: user ? user.v_m_number : "",
      username: user ? user.name : "",
      user_id: user ? user?.id : "",
      path: pathname,
      // latitude: currentLocationHistory[0].latitude,
      // IPv4: currentLocationHistory[0].IPv4,
      // country_name: currentLocationHistory[0].country_name,
      // longitude: currentLocationHistory[0].longitude,
      ...event,
    };
    return new Promise(async (resolve) => {
      const response = await axios.post(tractActionUrl, uDetails);

      if (response.data.status) {
        resolve({ status: true });
      } else {
        console.log("Something went wrong in upsell fetching!");
        resolve({ status: false });
      }
    });
  };
};

function stringCompare(a, b) {
  if (a < b) return -1;
  if (b < a) return 1;
  return 0;
}

export const getSortedProducts = (
  products,
  sortType,
  sortValue,
  categoryValues = []
) => {
  if (products && sortType && sortValue) {
    if (sortType === "category") {
      if (categoryValues.length > 0) {
        return products?.filter((product) =>
          categoryValues.includes(product?.category_name)
        );
      } else return products;
    }
    if (sortType === "price") {
      let sortProducts = [...products];
      const { min, max } = sortValue;
      return sortProducts.filter((each) => {
        return parseInt(each.p_price) >= min && max >= parseInt(each.p_price);
      });
    }

    if (sortType === "rating") {
      let sortProducts = [...products];
      const { min, max } = sortValue;

      return sortProducts.filter((each) => {
        return each.star > min && max >= each.star;
      });
    }

    if (sortType === "filterSort") {
      let sortProducts = [...products];
      if (sortValue === "default") {
        return sortProducts;
      }
      if (sortValue === "highLow") {
        return sortProducts.sort((a, b) => {
          return b.p_price - a.p_price;
        });
      }
      if (sortValue === "lowHigh") {
        return sortProducts.sort((a, b) => {
          return a.p_price - b.p_price;
        });
      }
      if (sortValue === "az") {
        return sortProducts.sort((a, b) => {
          return stringCompare(a.p_name, b.p_name);
        });
      }
      if (sortValue === "za") {
        return sortProducts.sort((a, b) => {
          return stringCompare(b.p_name, a.p_name);
        });
      }
    }
  }
  return products;
};

export const setProducts = (products) => ({
  type: SET_PRODUCTS,
  payload: products,
});

export const setLoading = (state) => ({
  type: SET_LOADING,
  payload: state,
});

export const setPaymentDetails = (details) => ({
  type: SET_CART_DETAILS,
  payload: details,
});

export const setCartId = (id) => ({
  type: SET_CART_ID,
  payload: id,
});

export const setSingleProduct = (product) => ({
  type: SET_SINGLE_PRODUCT_DETAILS,
  payload: product,
});

const urlBanner = baseUrl + "api/banner";
export const setHomeBanner = () => {
  return async (dispatch) => {
    try {
      const response = await axios.post(urlBanner, { token: token });
      dispatch({ type: SET_HOME_BANNER, payload: response.data });
    } catch (error) {
      console.log("banner error ", error);
    }
  };
};
 
export const setActiveSort = (e) => {
  const filterButtons = document.querySelectorAll(
    ".sidebar-widget-list-left button, .sidebar-widget-tag button, .product-filter button"
  );
  filterButtons.forEach((item) => {
    item.classList.remove("active");
  });
  e.currentTarget.classList.add("active");
};

export const deleteAllFromCart = (addToast) => {
  if (addToast) {
    addToast("Removed From Cart", { appearance: "error", autoDismiss: true });
  }
  //console.log("remove");
  return {
    type: DELETE_ALL_FROM_CART,
    payload: {
      cart: [],
    },
  };
};

//Fetch payment types
const fetchPayUrl = baseUrl + "api/paymentGatway";
export const fetchPaymentTypes = (id) => {
  return (dispatch) => {
    return new Promise(async (resolve) => {
      const response = await axios.post(`${fetchPayUrl}`, {
        token: token,
      });
      //console.log("gift resppp", response.data);
      if (response.data.status) {
        dispatch({
          type: FETCH_PAYMENT_TYPES,
          payload: response.data.data,
        });
        resolve({ status: true, payments: response.data.data });
      } else {
        console.log("Something went wrong in gift fetching!");
        resolve({ status: false });
      }
    });
  };
};

export const setOpenUpsellModal = (state, products, parentId) => ({
  type: OPEN_UPSELL_MODAL,
  state,
  products,
  parentId,
});

export const setOpenAdModal = (modalState) => ({
  type: SET_AD_MODAL,
  modalState,
});

export const updateCurrentLocation = (location) => ({
  type: UPDATE_CURRENT_LOCATION,
  payload: location,
});
export const updateCurrentLocationUserDetails = (user) => ({
  type: UPDATE_CURRENT_LOCATION_USER,
  payload: user,
});
export const updateLocationHistory = (location) => ({
  type: UPDATE_LOCATION_HISTORY,
  payload: location,
});

//Fetch payment types
const locUrl = "https://geolocation-db.com/json/";
export const setCurrentLocation = (pathname) => {
  return (dispatch, getState) => {
    const { user } = getState().products;

    return new Promise(async (resolve) => {
      const response = await axios.get(`${locUrl}`);
      if (response.data) {
        const { IPv4, country_name, latitude, longitude } = response.data || {};
        dispatch({
          type: CURRENT_LOCATION,
          payload: {
            IPv4,
            country_name,
            latitude,
            longitude,
            email: user ? user.email : "",
            phone: user ? user.v_m_number : "",
            username: user ? user.name : "",
            user_id: user ? user?.id : "",
            path: pathname,
          },
        });
        resolve({ status: true });
      } else {
        console.log("Something went wrong in gift fetching!");
        resolve({ status: false });
      }
    });
  };
};

const ReviewUrl = baseUrl + "api/ReviewRate";
export const fetchReviews = (id) => {
  return (dispatch, getState) => {
    const { user } = getState().products;
    return new Promise(async (resolve) => {
      const response = await axios.post(`${ReviewUrl}`, {
        token: token,
        user_id: user.id,
      });
      console.log("gift resppp", response.data);
      if (response.data.status) {
        dispatch({
          type: USER_REVIEWS,
          payload: response.data.UserReview,
        });
        resolve({ status: true, UserReviews: response.data.UserReview });
      } else {
        console.log("Something went wrong  fetching!");
        resolve({ status: false });
      }
    });
  };
};

const URLBestSeller = baseUrl + "api/productBestSellersList";
export const fetchBestSellerProducts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.post(URLBestSeller, { token: token });
      dispatch({
        type: FETCH_PRODUCTS_BESTSELLERS,
        payload: response.data.BestSeller,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const URLFeatured = baseUrl + "api/productFeaturedList";
export const fetchFeaturedProducts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.post(URLFeatured, { token: token });
      // console.log("response",response)
      dispatch({
        type: FETCH_PRODUCTS_FEATURED,
        payload: response.data.Featured,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const URLArrivals = baseUrl + "api/productArrivalsNewList";
export const fetchArrivalsProducts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.post(URLArrivals, { token: token });
      dispatch({
        type: FETCH_PRODUCTS_ARRIVALS,
        payload: response.data.Arrivals,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const URLTopdiscount = baseUrl + "api/productTopDiscountsList";
export const fetchTopdiscountProducts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.post(URLTopdiscount, { token: token });
      dispatch({
        type: FETCH_PRODUCTS_TOPDISCOUNT,
        payload: response.data.topdiscounted,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const URLTopRecommends = baseUrl + "api/productTopRecommendsList";
export const fetchTopRecommendProducts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.post(URLTopRecommends, { token: token });
      dispatch({
        type: FETCH_PRODUCTS_TOPRECOMMENDS,
        payload: response.data.TopRecommends,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const BlogviewCountUrl = baseUrl + "api/BlogCountView";
export const fetchBlogViewCount = (id) => {
  return (dispatch) => {
    return new Promise(async (resolve) => {
      const response = await axios.post(`${BlogviewCountUrl}`, {
        token: token,
        id: id,
      });
      console.log("blog count==============>", response);
      if (response.data.status) {
        dispatch({
          type: BLOG_POST_VIEWS,
          payload: response.data.BlogPostViewCount,
        });
        resolve({
          status: true,
          BlogPostViewCount: response.data.BlogPostViewCount,
        });
      } else {
        console.log("Something went wrong  fetching!");
        resolve({ status: false });
      }
    });
  };
};

export const toggleSidebar = (act) => {
  return { type: TOGGLE_SIDE_BAR ,payload:act };
};



