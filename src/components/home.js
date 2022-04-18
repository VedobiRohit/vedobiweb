import React, { useEffect } from "react";
import { fetchProducts } from "../redux/products/products_actions";
import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";

import { Slider } from "./slider/Slider";
import { FreeHomeShipping } from "./FreeHomeShipping/FreeHomeShipping";
import { BestProducts } from "./Bestproducts/Bestproducts";
import FeaturedProducts from "./FeaturedProducts/FeaturedProducts";
import NewArrivalsProducts from "./NewArrivals/NewArrivalProducts";
import Testimonial from "./testimonial/Testimonial";
import BrandLogo from "./brandlogo/BrandLogo";
import FooterOne from "./Footer/Footer";
import TopDiscountProductsSlider from "./TopDiscountProductSlider/TopDiscountProductSlider";
import TopRecommendProducts from "./TopRecommendProducts/TopRecommendProducts";


export const Home = () => {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const bestProducts =
    products &&
    products?.filter((product) => product.best_sellers === "best_sellers");

    const featuredProducts =
    products && products?.filter((product) => product.featured === "featured");

    const arrivalsProducts =
    products && products?.filter((product) => product.arrivals === "arrivals");

 
  return (
    <div>
        <Slider />
        <FreeHomeShipping />
        <BestProducts bestProducts={bestProducts} />     
        <FeaturedProducts featuredProducts={featuredProducts}/>
        <NewArrivalsProducts arrivalsProducts={arrivalsProducts} />
        <Testimonial />
        <TopDiscountProductsSlider />
        <TopRecommendProducts />
        <BrandLogo /> 
        <FooterOne />
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    products: state.products,
    ...props,
  };
};

const loadData = (store) => {
  // For the connect tag we need Provider component but on the server at this moment app is not rendered yet
  // So we need to use store itself to load data
  return store.dispatch(fetchProducts()); // Manually dispatch a network request
};

export default {
  component: connect(mapStateToProps, { fetchProducts })(Home),
  loadData,
};
