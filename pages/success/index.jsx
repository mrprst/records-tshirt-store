import React from 'react';
import classes from "./Success.module.css";
import { useCart } from "react-use-cart";

const Success = () => {

  const {
    emptyCart,
  } = useCart();


  emptyCart()

  return (
    <div className={classes.success}>
      <h1>Votre commande a été validée !</h1>
    </div>
  );
}

export default Success;
