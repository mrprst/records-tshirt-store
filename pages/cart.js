import Image from "next/image";
import Link from "next/link";
import { useCart } from "react-use-cart";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import classes from "./Cart.module.css";
import Button from "@mui/material/Button";

function Cart() {
  const [loading, setLoading] = useState(false);
  const {
    items,
    emptyCart,
    updateItemQuantity,
    cartTotal,
    totalItems,
    removeItem,
  } = useCart();

  const onQuantityMinus = (item) => {
    updateItemQuantity(item.id, item.quantity - 1);
  };

  const onQuantityPlus = (item) => {
    updateItemQuantity(item.id, item.quantity + 1);
  };

  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(publishableKey);

  const createCheckOutSession = async () => {
    setLoading(true);

    const tshirt = {
      title: "Your Order",
      price: parseInt(cartTotal / totalItems),
      quantity: totalItems,
      imageUrl:
        "https://www.beige-habilleur.com/8281-large_default/camber-t-shirt-poche-noir.jpg",
    };

    const stripe = await stripePromise;
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
    <div>
      {items && (
        <div>
          <div className={classes.cart}>
            <pre>{JSON.stringify(items)}</pre>
            {items.map((item) => (
              <div key={item.id} className={classes.item}>
                <Image
                  alt={item.title}
                  src={item.imageUrl}
                  width={100}
                  height={100}
                  className={classes.tshirtImage}
                />
                <div>
                  <Link href={`/tshirt/${item.id}`}>
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div>{item.price}€</div>
                <div className="border rounded">
                  <div className={classes.quantity}>
                    <Fab
                      onClick={() => {
                        onQuantityMinus(item);
                      }}
                      size="small"
                      color="primary"
                      aria-label="add"
                    >
                      <RemoveIcon />
                    </Fab>
                    <h4 className={classes.h4}>&nbsp;{item.quantity}&nbsp;</h4>
                    <Fab
                      onClick={() => onQuantityPlus(item)}
                      size="small"
                      color="primary"
                      aria-label="add"
                    >
                      <AddIcon />
                    </Fab>

                    <Fab
                      onClick={() => removeItem(item.id)}
                      size="small"
                      color="error"
                      aria-label="add"
                      sx={{ marginLeft: 1 }}
                    >
                      <DeleteOutlineIcon />
                    </Fab>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={classes.checkout}>
            <Button
              variant="contained"
              color="primary"
              onClick={createCheckOutSession}
              sx={{ marginRight: 3 }}
            >
              Payer
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={emptyCart}
              sx={{ marginRight: 3 }}
            >
              Vider
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
