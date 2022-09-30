import React, { useState, useEffect } from "react";
import classes from "./CheckoutButton.module.css";
import { useCart, totalItems } from "react-use-cart";
import Fab from "@mui/material/Fab";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const CheckoutButton = ({ tshirt, quantity, handleOrder }) => {
  const [noerror, setNoerror] = useState(true);
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
      handleOrder()
    }
  };

  useEffect(() => {
    setStock(tshirt[0]?.stock);
    setPrice(tshirt[0]?.price);
  }, [tshirt]);


  return (
    <div className={classes.container}>
      <h5>{quantity * price}€</h5>
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
        <div className={noerror ? classes.noerror : classes.showerror}>
          <Box sx={{ width: "100%" }}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setNoerror(true);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
              severity="error"
            >
              Il ne reste que {stock} tshirts disponibles. Veuillez ajuster
              votre commande et/ou votre panier.
            </Alert>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default CheckoutButton;
