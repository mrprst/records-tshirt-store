const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function CreateStripeSession(req, res) {
  const { tshirt } = req.body;
  console.log(req.body)
  const redirectURL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://stripe-checkout-next-js-demo.vercel.app';

  const transformedItem = {
    price_data: {
      currency: 'usd',
      product_data: {
        images: [tshirt.imageUrl],
        name: tshirt.title,
      },
      unit_amount: tshirt.price * 100,
    },
    description: tshirt.description,
    quantity: tshirt.quantity,
  };

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [transformedItem],
    mode: 'payment',
    success_url: `${redirectURL}?status=success`,
    cancel_url: `${redirectURL}?status=cancel`,
    metadata: {
      images: tshirt.imageUrl,

    },
  });

  res.json({ id: session.id });
}

export default CreateStripeSession;
