import Footer from "../footer";
import Navbar from "../navbar";
import styles from "./Layout.module.css";

export default function Layout({ children }) {
  return (
    <div className={styles.layoutContainer}>
      <div className="container">{children}</div>
      <Footer />
    </div>
  );
}
