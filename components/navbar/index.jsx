import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import classes from "./NavBar.module.css";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand navbar-light">
      <div className={classes.menu}>
        <div className="d-flex mx-4 px-4">
          <Link href="/" exact>
            <a className="nav-item nav-link link-dark px-3 fw-bold fs-4">
              Tshirt Store
            </a>
          </Link>
          <Link href="/cart">
            <a>Cart</a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
