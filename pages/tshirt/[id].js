import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";
import { Color } from "@prisma/client";
import { Size } from "@prisma/client";
import classes from "./Tshirt.module.css";
import { useCart, totalItems } from "react-use-cart";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Image from "next/image";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import black from "../../public/black.jpeg";
import green from "../../public/green.jpeg";
import purple from "../../public/purple.jpeg";
import red from "../../public/red.jpeg";
import white from "../../public/white.jpeg";
import yellow from "../../public/yellow.jpeg";

function TshirtPage() {
  const router = useRouter();
  const { id } = router.query;
  const [tshirt, setTshirt] = useState(null);
  const [stock, setStock] = useState(null);
  const [color, setColor] = useState(tshirt?.color.toLowerCase());
  const [size, setSize] = useState("S");
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);
  const { addItem } = useCart();
  const [noerror, setNoerror] = useState(true);
  const tshirtImage = `${tshirt?.title.split(' ')[1].toLowerCase()}-${tshirt?.color}.jpeg`

  const getTshirt = async () => {
    try {
      const result = await axios.get(`/api/tshirt/${id}`);
      setTshirt(result.data);
      setStock(result.data.stock);
    } catch (err) {}
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

  const {
    totalItems,
  } = useCart();


  const getSize = () => {
    const dataSize = [];
    Object.keys(Size).map((size) => dataSize.push(size));
    const select = document.getElementById("selectSize");
    for (let i = 0; i < dataSize.length; i++) {
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

  const onQuantityPlus = () => {
    setQuantity(quantity + 1);
  };

  const onQuantityMinus = () => {
    setQuantity(quantity - 1 < 0 ? 0 : quantity - 1);
  };

  const chooseColor = (e) => {
    setColor(e.target.value.toLowerCase());
  };

  const chooseSize = (e) => {
    setSize(e.target.value);
  };

  const checkStock = () => {
    if (stock - quantity - totalItems < 0) {
      setLoading(false);
      setNoerror(false);
      return false;
    } else {
      addItem(tshirt, quantity);
      setQuantity(0);
    }
  };


  return (
    <div className={classes.block}>
      <div className={classes.tshirt}>
        <div className={classes.tshirtMedia}>
          <Image
            alt={tshirt?.title}
            src={"/" + tshirtImage}
            width={400}
            height={500}
            className={classes.tshirtImage}
          />
        </div>
        <div className={classes.tshirtInfo}>
          <div>
            <h3 className={classes.h3}>{tshirt?.title}</h3>
          </div>
          <div>
            <h4 className={classes.h4}>{tshirt?.price} €</h4>
            <p>
              <i>{tshirt?.description}</i>
            </p>
          </div>
          <div>
            <div className={classes.quantity}>
              <Fab
                onClick={() => {
                  onQuantityMinus(tshirt);
                }}
                size="small"
                color={quantity > 0 ? "primary" : "default"}
                aria-label="add"
              >
                <RemoveIcon />
              </Fab>
              <h4 className={classes.h4}>&nbsp;{quantity}&nbsp;</h4>
              <Fab
                onClick={() => onQuantityPlus(tshirt)}
                size="small"
                color="primary"
                aria-label="add"
              >
                <AddIcon />
              </Fab>
            </div>
          </div>
          <option className={classes.h5}>Choose a color</option>
          <select value={tshirt?.color} id="selectColor" onChange={chooseColor}></select>
          <option className={classes.h5}>Choose a size</option>
          <select id="selectSize" onChange={chooseSize}></select>
          <div>
            <h5 className={classes.h5}>
              Total : {tshirt?.price * quantity} euros
            </h5>
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
                      Il ne reste que {stock} tshirts disponibles. Veuillez
                      ajuster votre commande et/ou votre panier.
                    </Alert>
                </Box>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TshirtPage;
