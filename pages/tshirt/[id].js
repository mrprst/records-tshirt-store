import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";
import { Color } from "@prisma/client";
import { Size } from "@prisma/client";
import classes from "../../styles/Home.module.css";
import Red from '../../assets/red.jpeg';

function TshirtPage() {
  const router = useRouter();
  const { id } = router.query;
  const [tshirt, setTshirt] = useState(null);
  const [stock, setStock] = useState(null);
  const [color, setColor] = useState("white");
  const [size, setSize] = useState("S");
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);

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

  const onQuantityPlus = () => {
    setQuantity(quantity + 1);
    tshirt.quantity = quantity + 1;
  };

  const onQuantityMinus = () => {
    setQuantity(quantity - 1 < 0 ? 0 : quantity - 1);
    tshirt.quantity = quantity - 1;
  };

  const chooseColor = (e) => {
    setColor(e.target.value);
  };

  const chooseSize = (e) => {
    setSize(e.target.value);
  };

  console.log(color);
  console.log(size);

  const checkStock = () => {
    if (stock - tshirt.quantity < 0) {
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

  return (
    <div className="my-3 row">
      <div className={classes.product}>
        <div className={classes.tshirtMedia}>
          <div
            className={classes.tshirtImg}
            style={{ backgroundImage: `url(${Red})` }}
          />
        </div>

        <div className={classes.productContent}>
          <div className="row my-2">
            <h3>{tshirt?.title}!</h3>
            <div className="col-2 text-end">
              <span className="fs-4 fw-bold">{tshirt?.price} €</span>
            </div>
          </div>
          <div className="mb-2">
            <p>
              Situé à{" "}
              <span className={classes.tshirtLoc}>{tshirt?.location}</span>
            </p>
          </div>
          <div>
            <div className="border rounded">
              <button
                onClick={onQuantityMinus}
                className="bg-blue-500 py-2 px-4 text-white rounded hover:bg-blue-600"
              >
                -
              </button>
              <p>{quantity}</p>
              <button
                onClick={onQuantityPlus}
                className="bg-blue-500 py-2 px-4 text-white rounded hover:bg-blue-600"
              >
                +
              </button>
            </div>
          </div>
          <div>
            <p>Total</p>
            <p>{tshirt?.price * quantity} euros</p>
            <button
              disabled={quantity === 0 || loading}
              onClick={createCheckOutSession}
            >
              Ajouter au panier
            </button>
            <p>{tshirt?.description}</p>
          </div>
          <option>Choose a color</option>
          <select id="selectColor" onChange={chooseColor}></select>
          <option>Choose a size</option>
          <select id="selectSize" onChange={chooseSize}></select>
        </div>
      </div>
    </div>
  );
}

export default TshirtPage;
