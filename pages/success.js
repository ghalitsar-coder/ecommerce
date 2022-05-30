import Link from "next/link";
import React, { useEffect, useState } from "react";
import { clearCart } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import { runFireWork } from "../lib/utils";
const Success = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.clear();
    dispatch(clearCart());
    runFireWork()
  }, []);
  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for the receipt.</p>
        <p className="description">
          If you have any questions, please email me at{" "}
          <a href="mailto:order@example.com">@example.com</a>
        </p>
        <Link href="/">
          <button type="button" width="300px" className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
