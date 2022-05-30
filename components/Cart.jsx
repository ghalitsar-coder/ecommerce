import Link from "next/link";
import React, { useRef, useState } from "react";
import {
  AiOutlineLeft,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { urlFor } from "../lib/client";
import getStripe from "../lib/getStripe";
import {
  decQuantity,
  incQuantity,
  removeProduct,
  showCartMenu,
} from "../redux/cartSlice";
import axios from "axios";
import toast from "react-hot-toast";

const Cart = () => {
  const cartRef = useRef();
  const dispatch = useDispatch();

  const { quantities, products, totalPrice } = useSelector(
    (state) => state.cart
  );

  const handleCheckOut = async () => {
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(products),
    });
    console.log("second");

    console.log(response);
    console.log(response.status);
    if (response.status === 500) return;

    const data = await response.json();

    toast.loading("Redirecting...");
    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => dispatch(showCartMenu())}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({quantities} items )</span>
        </button>
        {products.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your Shopping bag is empty</h3>
            <Link href={"/"}>
              <button
                type="button"
                className="btn"
                onClick={() => dispatch(showCartMenu())}
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
        <div className="product-container">
          {products.length > 0 &&
            products.map((product) => (
              <div className="product" key={product._id}>
                <img
                  src={urlFor(product?.image[0])}
                  alt=""
                  className="cart-product-image"
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{product.name}</h5>
                    <h4>${product.priceTotal}</h4>
                  </div>
                  <div className="flex bottom">
                    <div className="">
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() => dispatch(decQuantity(product._id))}
                        >
                          {" "}
                          <AiOutlineMinus />{" "}
                        </span>
                        <span className="num"> {product.quantity} </span>
                        <span
                          className="plus"
                          onClick={() => dispatch(incQuantity(product._id))}
                        >
                          {" "}
                          <AiOutlinePlus />{" "}
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => dispatch(removeProduct(product._id))}
                    >
                      <TiDeleteOutline />{" "}
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {products.length > 0 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>SubTotal</h3>
              <h3> ${totalPrice} </h3>
            </div>
            <div className="btn-container">
              <button className="btn" type="button" onClick={handleCheckOut}>
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
