import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from 'react-use-cart';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import Add from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import classes from './Cart.module.css';

function Cart() {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(publishableKey);

  const {
    items,
    emptyCart,
    updateItemQuantity,
    removeItem,
  } = useCart();

  const onQuantityMinus = (item) => {
    updateItemQuantity(item.id, item.quantity - 1);
  };

  const onQuantityPlus = (item) => {
    updateItemQuantity(item.id, item.quantity + 1);
  };

  const createCheckOutSession = async () => {
    setLoading(true);
    const stripe = await stripePromise;
    const checkoutSession = await axios.post('/api/create-stripe-session', {
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
<<<<<<< HEAD:pages/cart.jsx
=======

  useEffect(() => {
    items.length > 0 ? setIsEmpty(false) : setIsEmpty(true)
    }, [items]);

    console.log(isEmpty)
>>>>>>> development:pages/cart.js

  return (
    <div className={classes.container}>
      {!isEmpty && (
        <div>
          <div className={classes.cart}>
            <div className={classes.arrayInfo}>
              <div>Visuel</div>
              <div>Modèle</div>
              <div>Prix/u</div>
              <div>Modifier</div>
              <div>Prix total</div>
            </div>
            {items.map((item) => (
              <div key={item.id} className={classes.item}>
<<<<<<< HEAD:pages/cart.jsx
                <Image
                  alt={item.title}
                  src={`/${item?.title
                    .split(' ')[1]
                    .toLowerCase()}-${item.color.toLowerCase()}.jpeg`}
                  width={100}
                  height={100}
                  className={classes.tshirtImage}
                />
                <div>
=======
                <div className={classes.imageContainer}>
                  <Image
                    alt={item.title}
                    src={`/${item?.title
                      .split(" ")[1]
                      .toLowerCase()}-${item.color.toLowerCase()}.jpeg`}
                    width={90}
                    height={100}
                    className={classes.tshirtImage}
                  />
                </div>
                <div className={classes.info}>
>>>>>>> development:pages/cart.js
                  <Link href={`/tshirt/${item.id}`}>
                    <a>{item.title}</a>
                  </Link>
                  <p className={classes.options}>
                    {item.color.toLowerCase()} - Taille {item.size}
                  </p>
                </div>
                <div>{item.price}€</div>
                <div className='border rounded'>
                  <div className={classes.quantity}>
                    <Fab
                      onClick={() => {
                        onQuantityMinus(item);
                      }}
<<<<<<< HEAD:pages/cart.jsx
                      size='small'
                      color='primary'
                      aria-label='add'
=======
                      size="small"
                      color="primary"
                      aria-label="add"
                      className={classes.button}
>>>>>>> development:pages/cart.js
                    >
                      <RemoveIcon />
                    </Fab>
                    <p>&nbsp;{item.quantity}&nbsp;</p>
                    <Fab
                      onClick={() => onQuantityPlus(item)}
<<<<<<< HEAD:pages/cart.jsx
                      size='small'
                      color='primary'
                      aria-label='add'
=======
                      size="small"
                      color="primary"
                      aria-label="add"
                      className={classes.button}
>>>>>>> development:pages/cart.js
                    >
                      <Add />
                    </Fab>

                    <Fab
                      onClick={() => removeItem(item.id)}
                      size='small'
                      color='error'
                      aria-label='add'
                      sx={{ marginLeft: 1 }}
                      className={classes.button}
                    >
                      <DeleteOutlineIcon />
                    </Fab>
                  </div>
                </div>
                <div>{item.quantity * item.price}€</div>
              </div>
            ))}
          </div>
          <div className={classes.checkout}>
            <Fab
              variant='extended'
              color='primary'
              onClick={createCheckOutSession}
            >
              Payer
            </Fab>
            <Fab variant='extended' color='error' onClick={emptyCart}>
              Vider
            </Fab>
          </div>
        </div>
      )}
      {isEmpty && (
        <div>
          <h5 style={{textAlign: 'center', fontWeight: 'bold'}}>Votre panier est vide, cliquez <a href="/">ici</a> pour commencer vos achats</h5>
        </div>
      )}
    </div>
  );
}

export default Cart;
