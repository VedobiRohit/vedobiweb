import React from "react";
import Swiper from "react-id-swiper";


function BrandLogo() {

  const Brand_settings = {
    loop: true,
    autoplay: false,
    grabCursor: true,
    breakpoints: {
      1024: {
        slidesPerView: 6,
      },
      768: {
        slidesPerView: 4,
      },
      640: {
        slidesPerView: 3,
      },
      320: {
        slidesPerView: 2,
      },
    },
  };


  return (
    <section className="brand-logo-area py-2 my-2 bg-white" >
      <div className="container" >
        <div className="brand-logo-active" >
          <Swiper {...Brand_settings} >
          

            <div className="single-brand-logo text-center swiper-slide">
              <img src="../../assets/images/brand-logo/brand-logo-1.webp" className="img-fluid" alt="Brand Logo" height="100" width="100" />
            </div>
            <div className="single-brand-logo text-center swiper-slide">
              <img src="../../assets/images/brand-logo/brand-logo-2.webp" className="img-fluid" alt="Brand Logo" height="100" width="100" />
            </div>
            <div className="single-brand-logo text-center swiper-slide">
              <img src="../../assets/images/brand-logo/brand-logo-3.webp" className="img-fluid" alt="Brand Logo" height="100" width="100" />
            </div>
            <div className="single-brand-logo text-center swiper-slide">
              <img src="../../assets/images/brand-logo/brand-logo-4.webp" className="img-fluid" alt="Brand Logo" height="100" width="100" />
            </div>
            <div className="single-brand-logo text-center swiper-slide">
              <img src="../../assets/images/brand-logo/brand-logo-5.webp" className="img-fluid" alt="Brand Logo" height="100" width="100" />
            </div>
            <div className="single-brand-logo text-center swiper-slide">
              <img src="../../assets/images/brand-logo/brand-logo-6.webp" className="img-fluid" alt="Brand Logo" height="100" width="100" />
            </div>
            <div className="single-brand-logo text-center swiper-slide">
              <img src="../../assets/images/brand-logo/brand-logo-7.webp" className="img-fluid" alt="Brand Logo" height="100" width="100" />
            </div>
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default BrandLogo
