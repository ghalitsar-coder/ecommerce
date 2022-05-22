import React from "react";

import { Herobanner, Product, FooterBanner } from "../components";
import { client } from "../lib/client";

const Home = ({ products, banner }) => {
  return (
    <>
      <Herobanner />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products.map((product) => product.name)}
      </div>

      <FooterBanner />
    </>
  );
};

export const getServerSideProps = async () => {
  const productQuery = '*[_type == "product"]';
  const bannerQuery = '*[_type == "banner"]';

  const products = await client.fetch(productQuery);
  const banner = await client.fetch(bannerQuery);
  return {
    props: { products,  banner },
  };
};

export default Home;
