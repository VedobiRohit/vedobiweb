import React, { useState, useEffect } from "react";
import Swiper from "react-id-swiper";
import { useDispatch, useSelector } from "react-redux";
import { setHomeBanner } from "../../redux/products/products_actions";
import { Link } from 'react-router-dom';
// import BannerPlaceholder  from "../../assets/images/demo/banner/banner.webp";


export const Slider = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const homeBanners = useSelector((state) => state.products.homeBanners);

  useEffect(() => {
    dispatch(setHomeBanner());
  }, [dispatch])

  const settings = {
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    effect: "fade",
    autoplay: {
      delay: 7000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    renderPrevButton: () => (
      <button className="swiper-button-prev ht-swiper-button-nav">
        <i className="pe-7s-angle-left" />
      </button>
    ),
    renderNextButton: () => (
      <button className="swiper-button-next ht-swiper-button-nav">
        <i className="pe-7s-angle-right" />
      </button>
    ),
  };



 

  if (loading || !homeBanners || homeBanners.length === 0) {
    return (
      <img src="../../assets/images/demo/banner/banner.webp" alt="Banner img" />
    );
  }


  return (
    <section className="slider-area">
      <div className="slider-active nav-style-1">
        <Swiper {...settings}>
          {homeBanners.map((item, index) => {
            return (
              <div key={index}>
                <Link to={item.urlImage} title="banner" rel="preload">
                    <picture>
                      <source
                        type="image/webp"
                        srcSet={item.mobile_image}
                        media="(max-width: 576px)"
                        height="600"
                        width="100%"
                      />
                      <source
                        type="image/webp"
                        srcSet={item.image}
                        media="(min-width: 576px)"
                        height="600"
                        width="100%"
                      />
                      <img
                        src={item.mobile_image}
                        alt=""
                        className="img-fluid w-100"
                        height="600"
                        width="100%"
                      />
                    </picture>
                </Link>
              </div>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}

