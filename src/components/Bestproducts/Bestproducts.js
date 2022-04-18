import React from "react";

import { Title } from "../Title/Title";
import { Product } from "../Product/Product";

export const BestProducts = ({ bestProducts }) => {

  if (!bestProducts || bestProducts.length === 0) {
    return (
        <p>best product not found</p>
    )
  }

  return (
    <>
      <section className="py-2 my-2 bg-white overflow-hidden">
        <div className="container">
          <Title title="BEST SELLING" />
          <div className="product-grid">
            <div className="container">
              <div className="row">
                {bestProducts.slice(0, 8).map((product, key) => {
                  return (
                    <div key={key} className="col-md-4 col-lg-3 col-sm-6 col-6">
                      <Product product={product} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};


// import React from 'react'

// export const BestProducts = () => {
//     return(
//         <p>bestProducts</p>
//     )
// }
