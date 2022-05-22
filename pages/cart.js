import Image from "next/image";
import Link from "next/link";
import { useCart } from "react-use-cart";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import classes from "./Cart.module.css"

function Cart() {
  const [loading, setLoading] = useState(false);
  const { items, emptyCart, updateItemQuantity, cartTotal, totalItems, removeItem } =
    useCart();

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
      title: 'Your Order',
      price: parseInt(cartTotal / totalItems),
      quantity: totalItems,
      imageUrl: 'https://www.beige-habilleur.com/8281-large_default/camber-t-shirt-poche-noir.jpg',
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
    <div className={classes.cart}>
      <pre>{JSON.stringify(items)}</pre>
      {items.map((item) => (
        <div key={item.id}>
          <div></div>
          <div>
            <Link href={`/tshirt/${item.id}`}>
              <a>{item.title}</a>
            </Link>
          </div>
          <div>{item.price}€</div>
          <div>{item.quantity}</div>
          <div className="border rounded">
            <button onClick={() => onQuantityMinus(item)}>-</button>
            <button onClick={() => onQuantityPlus(item)}>+</button>
            <button onClick={() => removeItem(item.id)}>X</button>
          </div>
        </div>
      ))}
      <button onClick={emptyCart}>Vider le panier</button>
      <p>{cartTotal}€ TTC</p>
      <button
        onClick={createCheckOutSession}
      >
        Payer
      </button>
    </div>
  );

}

export default Cart;
