import React, { useState, useEffect } from "react";
import classes from "./CheckoutButton.module.css";
import { useCart, totalItems } from "react-use-cart";
import Fab from "@mui/material/Fab";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AlertNotif from "../../AlertNotif";

const CheckoutButton = ({ tshirt, quantity, handleOrder }) => {
  const [notempty, setNotEmpty] = useState(true);
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [loading, setLoading] = useState(false);
  const { totalItems, items } = useCart();

  const checkStock = () => {
    // Rajouter le stock de la card
    if (stock - quantity < 0) {
      setLoading(false);
      setNoerror(false);
      return false;
    } else {
      handleOrder();
    }
  };

  const setNoerror = (alert) => {
    setNotEmpty(alert)
  }

  useEffect(() => {
    setStock(tshirt[0]?.stock);
    setPrice(tshirt[0]?.price);
  }, [tshirt]);

  return (
    <div className={classes.container}>
      <div className={classes.checkoutbutton}>
        <Fab
          disabled={quantity === 0 || loading}
          onClick={() => {
            checkStock();
          }}
          size="large"
          color="white"
          aria-label="add"
        >
          <ShoppingCartIcon />
        </Fab>
      </div>
      {!notempty && <div><AlertNotif stock={stock} setNoerror={setNoerror}/></div>}
    </div>
  );
};

export default CheckoutButton;
