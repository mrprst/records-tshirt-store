import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";
import { Color } from "@prisma/client";
import { Size } from "@prisma/client";
import classes from "./Tshirt.module.css";
import { useCart } from "react-use-cart";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function TshirtPage() {
  const router = useRouter();
  const { id } = router.query;
  const [tshirt, setTshirt] = useState(null);
  const [stock, setStock] = useState(null);
  const [color, setColor] = useState("white");
  const [size, setSize] = useState("S");
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);
  const { addItem } = useCart();

  const getTshirt = async () => {
    try {
      const result = await axios.get(`/api/tshirt/${id}`);
      setTshirt(result.data);
      setStock(result.data.stock);
    } catch (err) {
      console.log("Loading errors.");
    }
  };

  const getColors = () => {
    const dataColors = [];
    Object.keys(Color).map((color) => dataColors.push(color));
    const select = document.getElementById("selectColor");
    for (let i = 0; i < dataColors.length; i++) {
      var opt = dataColors[i].toUpperCase();
      var el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      select.appendChild(el);
    }
  };

  const getSize = () => {
    const dataSize = [];
    Object.keys(Size).map((size) => dataSize.push(size));
    const select = document.getElementById("selectSize");
    for (let i = 0; i < dataSize.length; i++) {
      console.log(select);
      var opt = dataSize[i].toUpperCase();
      var el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      select.appendChild(el);
    }
  };

  useEffect(() => {
    getTshirt();
  }, [id]);

  useEffect(() => {
    getColors();
    getSize();
  }, []);

  const onQuantityPlus = (tshirt) => {
    setQuantity(quantity + 1);
    tshirt.quantity = quantity + 1;
  };

  const onQuantityMinus = (tshirt) => {
    setQuantity(quantity - 1 < 0 ? 0 : quantity - 1);
    tshirt.quantity = quantity - 1;
  };

  const chooseColor = (e) => {
    setColor(e.target.value);
  };

  const chooseSize = (e) => {
    setSize(e.target.value);
  };

  const checkStock = () => {
    if (stock - tshirt?.quantity < 0) {
      setLoading(false);
      return false;
    }
    return true;
  };

  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(publishableKey);

  const createCheckOutSession = async () => {
    setLoading(true);

    if (!checkStock()) return false;

    const stripe = await stripePromise;
    tshirt.color = color;
    tshirt.size = size;
    const checkoutSession = await axios.post("/api/create-stripe-session", {
      tshirt,
    });

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
    setLoading(false);
  };
  console.log(tshirt?.color.toLowerCase());

  return (
    <div className={classes.block}>
      <div className={classes.tshirt}>
        <div className={classes.tshirtMedia}>
          <img
            src={tshirt?.imageUrl}
            alt={tshirt?.title + tshirt?.id}
            width={500}
            height={500}
            className={classes.tshirtImage}
          />
        </div>
        <div className={classes.productContent}>
          <div>
            <h3 className={classes.h3}>{tshirt?.title}</h3>
          </div>
          <div>
            <h4 className={classes.h4}>{tshirt?.price} €</h4>
          </div>
          <div>
            <div className={classes.quantity}>
              <Fab
                onClick={() => onQuantityMinus(tshirt)}
                size="small"
                color="white"
                aria-label="add"
              >
                <RemoveIcon />
              </Fab>
              <h3 className={classes.h3}>&nbsp;{quantity}&nbsp;</h3>
              <Fab
                onClick={() => onQuantityPlus(tshirt)}
                size="small"
                color="white"
                aria-label="add"
              >
                <AddIcon />
              </Fab>
            </div>
          </div>
          <div>
            <h5 className={classes.h5}>
              Total : {tshirt?.price * quantity} euros
            </h5>
            <Fab
              disabled={quantity === 0 || loading}
              onClick={() => addItem(tshirt, quantity)}
              size="large"
              color="white"
              aria-label="add"
            >
              <ShoppingCartIcon />
            </Fab>
            <p>{tshirt?.description}</p>
          </div>
          <option className={classes.h5}>Choose a color</option>
          <select id="selectColor" onChange={chooseColor}></select>
          <option className={classes.h5}>Choose a size</option>
          <select id="selectSize" onChange={chooseSize}></select>
        </div>
      </div>
    </div>
  );
}

export default TshirtPage;
