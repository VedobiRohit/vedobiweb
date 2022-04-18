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
  SEARCH_PRODUCT_LIST_SUCCESS,
  SEARCH_PRODUCT_LIST_FAIL,
  RECENTVIEW_PRODUCT,
  CATEGORY_PRODUCT_LIST_SUCCESS,
  CATEGORY_PRODUCT_LIST_FAIL,
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
  ADD_ATTRIBUTES_TO_PRODUCT_LIST,
  ADD_USER_BASIC_DETAILS,
  ACTIVE_UPSELL_PRODUCT,
  SET_SINGLE_PRODUCT_DETAILS,
  SET_HOME_BANNER,
  BLOG_POST_LIST,
  BLOG_POST_VIEWS,
  SETSINGLE_BLOG_DETAILS,
  CURRENT_BLOG,
  CURRENT_LOCATION,
  UPDATE_CURRENT_LOCATION,
  UPDATE_LOCATION_HISTORY,
  BRANDLOGO,
  USER_REVIEWS,
  FETCH_PRODUCTS_BESTSELLERS,
  FETCH_PRODUCTS_FEATURED,
  FETCH_PRODUCTS_ARRIVALS,
  FETCH_PRODUCTS_TOPDISCOUNT,
  FETCH_PRODUCTS_TOPRECOMMENDS,
  BLOG_TOP_TEN
} from "./products_types";

const initialState = {
  loading: true,
  products: [],
  Searchproducts: [],
  Categoryproducts: [],
  SubCategoryproducts: [],
  SubCategory: [],
  caterror: "",
  subcaterror: "",
  cart: [],
  categoryFilter: [],
  singleProduct: "",
  loggedin: false,
  searcherror: "",
  user: {},
  addedItems: [],
  total: 0,
  allCategories: [],
  cart_id: "",
  shippingAddress: "",
  paymentTypes: [],
  cartDetails: "",
  openUpsellModal: false,
  upsellProducts: [],
  activeUpsellProduct: "",
  attrList: [],
  parentUpsellId: "",
  openAdModal: false,
  userBasicDetails: "",
  homeBanners: [],
  BlogList: [],
  BlogSingleData: [],
  BlogCurreentData: [],
  currentLocation: "",
  currentLocationHistory: [],
  BrandLogoData: [],
  UserReviews: [],
  BestSellerproducts: [],
  Featuredproducts: [],
  Arrivalsproducts: [],
  Topdiscountproducts: [],
  TopRecommendsproducts: [],
  BlogPostViewCount: [],
  TopTenBlog: [],
  sideCartOpen: false,
  sidebarOpen: false,
};

const productsReducer = (state = initialState, action) => {
  //console.log(action.type)

  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case BLOG_POST_LIST:
      return {
        ...state,
        BlogList: action.payload,
      };

    case BLOG_POST_VIEWS:
      return {
        ...state,
        BlogPostViewCount: action.payload,
      };

    case BLOG_TOP_TEN:
      return {
        ...state,
        TopTenBlog: action.payload,
      };

    case USER_REVIEWS:
      return {
        ...state,
        UserReviews: action.payload,
      };
    case CURRENT_BLOG:
      return {
        ...state,
        BlogCurreentData: action.payload,
      };
    case SETSINGLE_BLOG_DETAILS:
      return {
        ...state,
        BlogSingleData: action.payload,
      };

    case SEARCH_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        Searchproducts: action.payload,
      };

    case SEARCH_PRODUCT_LIST_FAIL:
      return {
        ...state,
        loading: false,
        searcherror: action.payload,
      };

    case CATEGORY_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        Categoryproducts: action.payload,
      };

    case CATEGORY_PRODUCT_LIST_FAIL:
      return {
        ...state,
        loading: false,
        caterror: action.payload,
      };

    case BRANDLOGO:
      return {
        ...state,
        BrandLogoData: action.payload,
      };

    case SUBCATEGORY_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        SubCategoryproducts: action.payload,
      };

    case SUBCATEGORY_PRODUCT_LIST_FAIL:
      return {
        ...state,
        loading: false,
        subcaterror: action.payload,
      };

    case FETCH_CATEGORY:
      return {
        ...state,
        loading: false,
        categoryFilter: action.payload,
      };
    case FETCH_ALL_CATEGORY:
      return {
        ...state,
        loading: false,
        allCategories: action.payload,
      };

    case SUBCATEGORY_FOOTER:
      return {
        ...state,
        loading: false,
        SubCategory: action.payload,
      };

    case SET_PRODUCTS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };

    case RECENTVIEW_PRODUCT:
      let addedItem = state.products.find(
        (item) => item.pid === action.payload
      );
      //check if the action id exists in the addedItems
      let existed_item = state.addedItems.find(
        (item) => action.payload === item.pid
      );
      if (existed_item) {
        return {
          ...state,
          total: 0,
        };
      }
      //
      else {
        return {
          ...state,
          addedItems: [...state.addedItems, addedItem],
          total: 0,
        };
      }

    case ADD_TO_CART:
      // Great Item data from products array
      const itemO = state.products.find(
        (product) => product?.pid === action.payload
      );

      if (itemO) {
        const item = Object.assign({}, itemO);
        item.isUpsellProduct = action.isUpsellProduct;
        if (action.isUpsellProduct) {
          item.parentItem = action.parentUpsellId;
        }
        if (action.attributePrice) {
          item.p_price = action.attributePrice.p_price;
        }

        // Check if Item is in cart already
        const inCart = state.cart.find((item) =>
          item.pid === action.payload ? true : false
        );

        let qtyToAdd = 0;
        if (inCart) {
          qtyToAdd = inCart.qty;
          const stockQty = inCart.stock_qty;
          if (stockQty) {
            const stockQtyParsed = parseInt(stockQty);
            if (inCart.qty < stockQtyParsed) {
              qtyToAdd = qtyToAdd + 1;
            }
          }
        }

        return {
          ...state,
          cart: inCart
            ? state.cart.map((item) =>
                item.pid === action.payload ? { ...item, qty: qtyToAdd } : item
              )
            : [...state.cart, { ...item, qty: 1 }],
          activeUpsellProduct: action.isUpsellProduct ? item : "",
        };
      }
      break;
    case ADD_GIFT_TO_PRODUCT_LIST:
      let newArr = [...state.products];
      newArr.push(action.payload);
      return {
        ...state,
        products: newArr,
      };
    case ADD_UPSELL_TO_PRODUCT_LIST:
      let newArrAttr = [...state.products];

      for (let i = 0; i < action.payload.length; i++) {
        const item = newArrAttr.find((n) => n?.pid === action.payload[i].pid);

        if (!item) {
          action.payload[i].isUpsellProduct = true;
          action.payload[i].parentItem = action.parentId;
          newArrAttr.push(action.payload[i]);
        }
      }

      return {
        ...state,
        products: newArrAttr,
      };

    case ADD_ATTRIBUTES_TO_PRODUCT_LIST:
      let newArrN = [...state.products];

      for (let i = 0; i < action.payload.length; i++) {
        const item = newArrN.find((n) => n?.pid === action.payload[i].pid);

        if (!item) {
          newArrN.push(action.payload[i]);
        }
      }

      return {
        ...state,
        products: newArrN,
        attrList: action.payload,
      };

    case DECREASE_ITEM:
      let cart = state.cart.map((item) => {
        if (item.gift_type === "Yes") {
          if (item.qty > 1) {
            item = { ...item, qty: item.qty - 1 };
          }
        }

        if (item.pid === action.payload) {
          item = {
            ...item,
            qty: item.qty === 1 ? (item.qty = 1) : item.qty - 1,
          };
        }
        return item;
      });

      return {
        ...state,
        cart: cart,
      };

    case INCREASE_ITEM:
      let incResults = state.cart.map((item) => {
        if (+item.pid === +action.payload) {
          item = { ...item, qty: item.qty + 1 };
        }
        return item;
      });

      let findArrr = state.cart.filter(
        (x) => x.gift_pack && x.pid === action.payload
      );
      if (findArrr.length > 0) {
        let id = +findArrr[0].gift_pack;
        incResults = incResults.map((x) =>
          x.pid === id ? { ...x, qty: x.qty + 1 } : x
        );
      }

      return { ...state, cart: incResults };

    case REMOVE_FROM_CART:
      let pid = action.payload.pid;
      let qty = 0;
      let gpid = 0;
      let cartArr = state.cart;

      if (
        state.cart.some(
          (x) =>
            x.pid === pid &&
            x.hasOwnProperty("gift_pack") &&
            (x.gift_pack !== null || x.gift_pack !== "")
        )
      ) {
        qty = state.cart.find((x) => x.pid === pid && x.gift_pack)?.qty;
        gpid = state.cart.find((x) => x.pid === pid && x.gift_pack)?.gift_pack;
        cartArr = state.cart.map((x) =>
          x.pid === +gpid ? { ...x, qty: x.qty - qty } : x
        );
        cartArr = cartArr.filter((x) => x.qty > 0);
      }
      // Remove upsell
      if (state.cart.some((x) => x.pid === pid && x.upsell === "Yes")) {
        cartArr = cartArr.filter((x) => x.parentItem !== pid);
      }

      cartArr = cartArr.filter((x) => x.pid !== pid);

      return {
        ...state,
        cart: cartArr,
      };

    case DELETE_ALL_FROM_CART:
      return { ...state, cart: [] };
    case "login":
      return { ...state, loggedin: true, user: action.payload };
    case "shippingAddress":
      return { ...state, shippingAddressSave: action.payload };
    case "logout":
      return { ...state, loggedin: false, user: {}, shippingAddressSave: {} };
    case FETCH_PAYMENT_TYPES:
      return { ...state, paymentTypes: action.payload };
    case SET_CART_DETAILS:
      return { ...state, cartDetails: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_CART_ID:
      return { ...state, cart_id: action.payload };
    case OPEN_UPSELL_MODAL:
      return {
        ...state,
        openUpsellModal: action.modalState,
        upsellProducts: action.products
          ? action.products
          : state.upsellProducts,
        parentUpsellId: action.parentId
          ? action.parentId
          : state.parentUpsellId,
      };
    case ACTIVE_UPSELL_PRODUCT:
      return {
        ...state,
        activeUpsellProduct: action.payload,
      };
    case SET_AD_MODAL:
      return {
        ...state,
        openAdModal: action.modalState,
      };
    case ADD_USER_BASIC_DETAILS:
      return {
        ...state,
        userBasicDetails: action.payload,
      };
    case SET_SINGLE_PRODUCT_DETAILS:
      return {
        ...state,
        singleProduct: action.payload,
      };
    case SET_HOME_BANNER:
      return {
        ...state,
        homeBanners: action.payload,
      };
    case CURRENT_LOCATION:
      return {
        ...state,
        currentLocation: action.payload,
        currentLocationHistory: [{ ...action.payload }],
      };
    case UPDATE_CURRENT_LOCATION:
      return {
        ...state,
        currentLocationHistory: [
          ...state.currentLocationHistory,
          {
            ...action.payload,
          },
        ],
      };
    case UPDATE_LOCATION_HISTORY:
      const cLocation = [...state.currentLocationHistory];
      const pLoc = cLocation.find((h) => h.path === action.payload);
      pLoc.sync = true;

      return {
        ...state,
        currentLocationHistory: cLocation,
      };

    case FETCH_PRODUCTS_BESTSELLERS:
      return {
        ...state,
        loading: false,
        BestSellerproducts: action.payload,
      };

    case FETCH_PRODUCTS_FEATURED:
      return {
        ...state,
        loading: false,
        Featuredproducts: action.payload,
      };

    case FETCH_PRODUCTS_ARRIVALS:
      return {
        ...state,
        loading: false,
        Arrivalsproducts: action.payload,
      };

    case FETCH_PRODUCTS_TOPDISCOUNT:
      return {
        ...state,
        loading: false,
        Topdiscountproducts: action.payload,
      };
    case FETCH_PRODUCTS_TOPRECOMMENDS:
      return {
        ...state,
        loading: false,
        TopRecommendsproducts: action.payload,
      };

    default:
      return state;
  }
};

export default productsReducer;
