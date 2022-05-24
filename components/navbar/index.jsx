import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import classes from "./NavBar.module.css";
import { useCart } from "react-use-cart";

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="navbar navbar-expand navbar-light">
      <div className={classes.menu}>
        <Link href="/" exact>
          <a className="nav-item nav-link link-dark px-3 fw-bold fs-4">
            Panopli Dev Store
          </a>
        </Link>
        <Link href="/cart">
          <a>Cart ({totalItems} items)</a>
        </Link>
      </div>
    </nav>
  );
}
