import Link from "next/link";
import React from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { showCartMenu } from "../redux/cartSlice";
import Cart from "./Cart";

const Navbar = () => {
  const { quantities, showCart } = useSelector((state) => state.cart);
  console.log(showCart);
  const dispatch = useDispatch();

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href={"/"}>JSM Headphones</Link>
      </p>

      <button
        type="submit"
        className="cart-icon"
        onClick={() => dispatch(showCartMenu())}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">{quantities}</span>
      </button>
      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
