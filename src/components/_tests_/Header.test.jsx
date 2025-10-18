import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"
import React from "react"

vi.mock("../../context/CartContext.jsx", () => ({
  useCart: vi.fn(),
}))

import Header from "../Header.jsx"
import { useCart } from "../../context/CartContext.jsx"

function renderHeaderWithCart(cartItems = []) {
  useCart.mockReturnValue({ cart: cartItems })
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <Header />
    </MemoryRouter>
  )
}

describe("Header", () => {
  it("renders brand and nav links", () => {
    renderHeaderWithCart([])

    expect(
      screen.getByRole("heading", { name: /mb shopping/i })
    ).toBeInTheDocument()

    const homeLink = screen.getByRole("link", { name: /home/i })
    const shopLink = screen.getByRole("link", { name: /shop/i })
    const cartLink = screen.getByRole("link", { name: /cart/i })

    expect(homeLink).toHaveAttribute("href", "/")
    expect(shopLink).toHaveAttribute("href", "/Shop")
    expect(cartLink).toHaveAttribute("href", "/Cart")
  })

  it("hides cart qty when empty", () => {
    renderHeaderWithCart([])
    expect(screen.queryByText(/^\d+$/)).not.toBeInTheDocument()
  })

  it("shows summed qty when items exist", () => {
    const cart = [
      { id: 1, name: "A" }, // 1
      { id: 2, name: "B", qty: 2 }, // 2
      { id: 3, name: "C", qty: 5 }, // 5
    ]
    renderHeaderWithCart(cart)
    expect(screen.getByText("8")).toBeInTheDocument() // 1+2+5
  })

  it("links are clickable (smoke)", async () => {
    const user = userEvent.setup()
    renderHeaderWithCart([])
    await user.click(screen.getByRole("link", { name: /shop/i }))
    expect(screen.getByRole("link", { name: /shop/i })).toBeInTheDocument()
  })
})
