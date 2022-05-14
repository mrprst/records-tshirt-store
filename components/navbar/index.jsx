import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './NavBar.module.css';

export default function Navbar() {
  const { user } = useUserContext();

  return (
    <nav className="navbar navbar-expand navbar-light">
      <div className="d-flex justify-content-between container px-4">
        <div className="d-flex mx-4 px-4">
          <Image src={shedLogo} width="44" height="44" />
          <Link href="/" exact>
            <a className="nav-item nav-link link-dark px-3 fw-bold fs-4">
              Tshirt Store
            </a>
          </Link>
        </div>
        <div className="d-flex mx-4 px-4">
          <Link href="/" exact>
            <a className="nav-item nav-link link-dark fw-bold px-2">Home</a>
          </Link>
          <Link href="/shacks" exact>
            <a className="nav-item nav-link link-dark fw-bold px-2">
              Our Tshirts
            </a>
          </Link>
          {!user ? (
            <>
              <Link href="/signup" exact>
                <a className="nav-item nav-link link-dark fw-bold px-2">
                  Signup
                </a>
              </Link>
              <Link href="/signin" exact>
                <a className="nav-item nav-link link-dark fw-bold px-2">
                  Signin
                </a>
              </Link>
            </>
          ) : null}
          {user ? (
            <>
              <Link href="/profile" exact>
                <a className="nav-item nav-link link-dark fw-bold px-2">
                  Profile
                </a>
              </Link>
              <Link href="/signout" exact>
                <a className="nav-item nav-link link-dark fw-bold px-2">
                  Logout
                </a>
              </Link>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
