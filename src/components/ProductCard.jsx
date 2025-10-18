import { useEffect, useState } from "react"
import { useCart } from "../context/CartContext"
import styles from "./ProductCard.module.css"

export default function ProductCard() {
  const [products, setProducts] = useState([])
  const { addToCart } = useCart()

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err))
  }, [])

  return (
    <div className={styles.container}>
      {products.map((product) => (
        <div key={product.id} className={styles.card}>
          <img src={product.image} alt={product.title} />
          <h3>{product.title}</h3>
          <p>{product.category}</p>
          <p className={styles.price}>${product.price}</p>
          <button onClick={() => addToCart(product)}>Add to cart</button>
        </div>
      ))}
    </div>
  )
}
