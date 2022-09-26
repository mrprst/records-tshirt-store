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
import prisma from "../../lib/prisma.ts";

const TshirtPage = ({tshirt}) => {
  const [quantity, setQuantity] = useState(0);
  const [chosenTshirt, setChosenTshirt] = useState("")
  const [stock, setStock] = useState(null);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [image, setImage] = useState("/");
  const { addItem, totalItems } = useCart();

  useEffect(() => {
    setColor(tshirt?.color)
    setSize(tshirt?.size)
  }, []);

  useEffect(() => {
    setImage(
      `/${tshirt?.title
        .split(" ")[1]
        .toLowerCase()}-${color?.toLowerCase()}.jpeg`
    );
    setChosenTshirt({
      ...tshirt,
      color,
      size,
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
    addItem(chosenTshirt, quantity);
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

export async function getServerSideProps(context) {
  const { id } = context.params;
  const tshirt = await prisma.tshirt.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  return {
    props: {
      tshirt: tshirt,
    },
  };
}
