import { ShoppingCart, House, Store } from "lucide-react"
import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext" // 👈 import your global cart
import styles from "./Header.module.css"

export default function Header() {
  const { cart } = useCart()

  // ✅ calculate total qty (in case same item added multiple times)
  const totalQty = cart.reduce((sum, item) => sum + (item.qty || 1), 0)

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h3>MB Shopping</h3>
      </div>

      <nav className={styles.nav}>
        <Link to="/">
          <House /> Home
        </Link>
        <Link to="/Shop">
          <Store /> Shop
        </Link>

        <Link to="/Cart" className={styles.cartIcon} aria-label="Cart">
          <ShoppingCart />
          {totalQty > 0 && <span className={styles.cartQty}>{totalQty}</span>}
        </Link>
      </nav>
    </header>
  )
}
