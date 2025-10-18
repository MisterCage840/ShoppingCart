import { Link } from "react-router"
import styles from "./mainPageBody.module.css"

export default function MainpageBody() {
  return (
    <main className={styles.home}>
      <section className={styles.intro}>
        <h1>Welcome to MB Shopping</h1>
        <p>
          Discover timeless essentials and everyday pieces designed for comfort,
          quality, and confidence. From streetwear to smart casual — we bring
          style that fits your life.
        </p>
        <Link to="/Shop"></Link>
      </section>
    </main>
  )
}
