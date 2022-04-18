import React, {useState} from "react";
import { useSelector } from "react-redux";
import { Title } from "../Title/Title";
import { Product } from "../Product/Product";

const FeaturedProducts = ({ featuredProducts }) => {
//   const { loading } = useSelector((state) => state.products);

  const [visible] = useState(8);

  if (!featuredProducts || featuredProducts.length === 0) {
    return (
        <p>featured product not found</p>
    )
  }
  return (
    <>
      <section className="py-2 my-2 bg-white overflow-hidden">
        <div className="container">
          <Title title="OUR FEATURED" />
          <div className="product-grid">
            <div className="container">
              <div className="row">
                {featuredProducts.slice(0, visible).map((product, key) => {
                  return (
                    <div key={key} className="col-lg-3 col-md-4 col-sm-6 col-6">
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

export default FeaturedProducts;
