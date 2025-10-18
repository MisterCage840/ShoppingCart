import { Link } from "react-router"
import styles from "./Footer.module.css"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerMain}>
        <h4>
          MB Shopping <span>Always bringing in the Best</span>
        </h4>
      </div>
    </footer>
  )
}
