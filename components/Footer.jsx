import Link from "next/link";
import React from "react";
import { AiFillInstagram, AiOutlineGithub } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="footer-container">
      <p>2022 JSM Headphones All Rights reserved</p>
      <div className="footer-icons">
        <Link
          href="https://instagram.com/elfaris.__"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="icons">
            <AiFillInstagram />
          </p>
        </Link>
        <Link
          href="https://github.com/ghalitsar-coder"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="icons">
            <AiOutlineGithub />
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
