import { createContext, useContext, useState } from "react"

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    const item = { title: product.title, price: product.price }
    setCart((prev) => [...prev, item])
  }

  const removeFromCart = (title) => {
    setCart((prev) => prev.filter((item) => item.title !== title))
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
