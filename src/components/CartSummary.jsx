import { useMemo } from "react"
import { useCart } from "../context/CartContext"
import styles from "./CartSummary.module.css"

export default function CartSummary() {
  const { cart, removeFromCart } = useCart()

  const grouped = useMemo(() => {
    const map = new Map()
    for (const item of cart) {
      const key = item.title
      if (!map.has(key)) {
        map.set(key, { ...item, qty: 1 })
      } else {
        const existing = map.get(key)
        map.set(key, { ...existing, qty: existing.qty + 1 })
      }
    }
    return Array.from(map.values())
  }, [cart])

  const subtotal = useMemo(
    () => grouped.reduce((sum, item) => sum + item.price * item.qty, 0),
    [grouped]
  )

  if (grouped.length === 0) {
    return (
      <div className={styles.empty}>
        <p>Your cart is empty.</p>
      </div>
    )
  }

  return (
    <div className={styles.cartContainer}>
      <div className={styles.items}>
        {grouped.map((item) => (
          <div key={item.title} className={styles.row}>
            <div className={styles.info}>
              <div className={styles.title}>{item.title}</div>
              <div className={styles.meta}>
                <span className={styles.price}>${item.price.toFixed(2)}</span>
                <span className={styles.qty}>× {item.qty}</span>
                <span className={styles.lineTotal}>
                  = ${(item.price * item.qty).toFixed(2)}
                </span>
              </div>
            </div>

            <button
              className={styles.remove}
              onClick={() => removeFromCart(item.title)}
              aria-label={`Remove ${item.title} from cart`}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className={styles.summary}>
        <div className={styles.rowSummary}>
          <span>Subtotal</span>
          <strong>${subtotal.toFixed(2)}</strong>
        </div>
        <button className={styles.checkout}>Checkout</button>
      </div>
    </div>
  )
}
