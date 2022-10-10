import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import classes from "./NavBar.module.css";
import { useCart } from "react-use-cart";

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav>
      <div className={classes.menu}>
        <Link href="/" exact>
          <a className={classes.logo}>
            .:RTS:.
          </a>
        </Link>
        <Link href="/cart">
          <a className={classes.cart}>Cart ({totalItems} items)</a>
        </Link>
      </div>
    </nav>
  );
}
