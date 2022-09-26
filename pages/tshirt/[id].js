import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";
import { useCart, totalItems } from "react-use-cart";
import classes from "./Tshirt.module.css";
import Image from "next/image";
import OptionMenu from "../../components/optionMenu";
import CheckoutButton from "../../components/checkoutbutton";
import Quantity from "../../components/quantity";

function TshirtPage() {
  const [tshirt, setTshirt] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [stock, setStock] = useState(null);
  const [color, setColor] = useState("RED");
  const [size, setSize] = useState("S");
  const [image, setImage] = useState("/");
  const router = useRouter();
  const { id } = router.query;
  const { addItem, totalItems } = useCart();

  const getTshirt = async () => {
    try {
      const result = await axios.get(`/api/tshirt/${id}`);
      setTshirt(result.data);
      setStock(result.data.stock);
      setColor(result.data.color);
      setSize(result.data.size);
      setImage(
        `/${result.data.title
          .split(" ")[1]
          .toLowerCase()}-${result.data.color.toLowerCase()}.jpeg`
      );
    } catch (err) {}
  };

  useEffect(() => {
    getTshirt();
  }, [id]);

  useEffect(() => {
    setImage(
      `/${tshirt?.title
        .split(" ")[1]
        .toLowerCase()}-${color?.toLowerCase()}.jpeg`
    );
    setTshirt({
      ...tshirt, color, size
    });
  }, [color, size]);

  const handleColor = (color) => {
    setColor(color);
  };

  const handleSize = (size) => {
    setSize(size);
  };

  const handleQuantity = (quantity) => {
    setQuantity(quantity);
  };

  const handleOrder = () => {
    addItem(tshirt, quantity);
    setQuantity(0);
  };


  return (
    <div className={classes.block}>
      <div className={classes.tshirt}>
        <div className={classes.tshirtMedia}>
          <Image
            alt={tshirt?.title}
            src={image}
            width={400}
            height={500}
            className={classes.tshirtImage}
          />
        </div>
        <div className={classes.tshirtInfo}>
          <div>
            <h3>{tshirt?.title}</h3>
          </div>
          <div>
            <h4>{tshirt?.price} €</h4>
            <p>
              <i>{tshirt?.description}</i>
            </p>
          </div>
          <Quantity handleQuantity={handleQuantity} quantity={quantity} />
          <OptionMenu
            color={color}
            size={size}
            handleColor={handleColor}
            handleSize={handleSize}
          />
          <CheckoutButton
            tshirt={tshirt}
            quantity={quantity}
            handleOrder={handleOrder}
          />
        </div>
      </div>
    </div>
  );
}

export default TshirtPage;
