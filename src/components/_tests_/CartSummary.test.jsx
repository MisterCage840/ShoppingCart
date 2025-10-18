import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import React from "react"

vi.mock("../../context/CartContext.jsx", () => ({
  useCart: vi.fn(),
}))

import { useCart } from "../../context/CartContext.jsx"
import CartSummary from "../CartSummary.jsx"

describe("CartSummary", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("renders empty message when cart is empty", () => {
    useCart.mockReturnValue({ cart: [], removeFromCart: vi.fn() })
    render(<CartSummary />)

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument()
  })

  it("groups duplicate items and calculates subtotal correctly", () => {
    const mockCart = [
      { title: "T-Shirt", price: 10 },
      { title: "T-Shirt", price: 10 },
      { title: "Jeans", price: 30 },
    ]
    useCart.mockReturnValue({ cart: mockCart, removeFromCart: vi.fn() })

    render(<CartSummary />)

    expect(screen.getByText("T-Shirt")).toBeInTheDocument()
    expect(screen.getByText("× 2")).toBeInTheDocument()
    expect(screen.getByText("Jeans")).toBeInTheDocument()

    expect(screen.getByText("$50.00")).toBeInTheDocument()
  })

  it("calls removeFromCart with correct title", () => {
    const removeFromCart = vi.fn()
    const mockCart = [{ title: "T-Shirt", price: 10 }]
    useCart.mockReturnValue({ cart: mockCart, removeFromCart })

    render(<CartSummary />)

    const removeBtn = screen.getByRole("button", {
      name: /remove t-shirt from cart/i,
    })
    fireEvent.click(removeBtn)

    expect(removeFromCart).toHaveBeenCalledTimes(1)
    expect(removeFromCart).toHaveBeenCalledWith("T-Shirt")
  })

  it("renders subtotal and checkout button", () => {
    const mockCart = [
      { title: "Hat", price: 5 },
      { title: "Hat", price: 5 },
      { title: "Shoes", price: 20 },
    ]
    useCart.mockReturnValue({ cart: mockCart, removeFromCart: vi.fn() })

    render(<CartSummary />)

    expect(screen.getByText("Subtotal")).toBeInTheDocument()
    expect(screen.getByText("$30.00")).toBeInTheDocument()

    expect(
      screen.getByRole("button", { name: /checkout/i })
    ).toBeInTheDocument()
  })
})
