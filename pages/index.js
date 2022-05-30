import React from "react";

import { Banner, Product, FooterBanner } from "../components";
import { client } from "../lib/client";

const Home = ({ products, banner }) => {
  return (
    <>
      <Banner heroBanner={banner.length && banner[0]} />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      <FooterBanner footerBanner={banner.length && banner[0]} />
    </>
  );
};

export const getServerSideProps = async () => {
  const productQuery = '*[_type == "product"]';
  const bannerQuery = '*[_type == "banner"]';

  const products = await client.fetch(productQuery);
  const banner = await client.fetch(bannerQuery);
  return {
    props: { products, banner },
  };
};

export default Home;
