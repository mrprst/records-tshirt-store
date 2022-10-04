import React from "react";
import { Fab } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import classes from './Quantity.module.css'

const Quantity = ({ handleQuantity, quantity }) => {

  return (
    <div className={classes.container}>
      <p className={classes.title}>QUANTITY</p>
      <div className={classes.quantity}>
        <Fab
          onClick={() => {
            handleQuantity(quantity - 1 < 0 ? 0 : quantity - 1);
          }}
          size="small"
          color={quantity > 0 ? "primary" : "default"}
          aria-label="add"
        >
          <RemoveIcon />
        </Fab>
        <h4>&nbsp;{quantity}&nbsp;</h4>
        <Fab
          onClick={() => handleQuantity(quantity + 1)}
          size="small"
          color="primary"
          aria-label="add"
        >
          <AddIcon />
        </Fab>
      </div>
    </div>
  );
};

export default Quantity;
