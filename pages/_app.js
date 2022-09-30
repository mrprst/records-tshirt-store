import "../styles/globals.css";
import Layout from "../components/layout/index.jsx";
import { CartProvider } from "react-use-cart";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Head>
        <title>Records Tshirt Website</title>
        <meta name="description" content="Peps" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:title" content="Buy that damn tshirt!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://buythatdamntshirt.yo" />

        <meta
          property="og:description"
          content="Bienvenue sur RTS, les meilleurs tshirts iconiques"
        />
        <meta property="og:site_name" content="BTDT" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout {...pageProps}>
        <div className="container">
          <Component {...pageProps} />
        </div>
      </Layout>
    </CartProvider>
  );
}

export default MyApp;
