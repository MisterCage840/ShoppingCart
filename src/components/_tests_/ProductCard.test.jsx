import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi, beforeEach } from "vitest"
import React from "react"

vi.mock("../../context/CartContext.jsx", () => ({
  useCart: vi.fn(),
}))

import { useCart } from "../../context/CartContext.jsx"
import ProductCard from "../ProductCard.jsx"

describe("ProductCard", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("renders empty state initially (no products yet)", async () => {
    useCart.mockReturnValue({ addToCart: vi.fn() })
    global.fetch = vi.fn(() =>
      Promise.resolve({ json: () => Promise.resolve([]) })
    )

    render(<ProductCard />)

    await waitFor(() => expect(global.fetch).toHaveBeenCalled())
    expect(screen.queryAllByRole("img")).toHaveLength(0)
    expect(
      screen.queryByRole("button", { name: /add to cart/i })
    ).not.toBeInTheDocument()
  })

  it("fetches and displays products", async () => {
    const mockProducts = [
      {
        id: 1,
        title: "Product A",
        category: "Category X",
        price: 10,
        image: "img1.jpg",
      },
      {
        id: 2,
        title: "Product B",
        category: "Category Y",
        price: 20,
        image: "img2.jpg",
      },
    ]
    global.fetch = vi.fn(() =>
      Promise.resolve({ json: () => Promise.resolve(mockProducts) })
    )

    useCart.mockReturnValue({ addToCart: vi.fn() })
    render(<ProductCard />)

    // wait for products to appear
    await waitFor(() => {
      expect(screen.getByText("Product A")).toBeInTheDocument()
      expect(screen.getByText("Product B")).toBeInTheDocument()
    })
  })

  it("calls addToCart when button clicked", async () => {
    const addToCart = vi.fn()
    const mockProducts = [
      {
        id: 1,
        title: "Product A",
        category: "Category X",
        price: 10,
        image: "img1.jpg",
      },
    ]
    global.fetch = vi.fn(() =>
      Promise.resolve({ json: () => Promise.resolve(mockProducts) })
    )

    useCart.mockReturnValue({ addToCart })
    render(<ProductCard />)

    const button = await screen.findByRole("button", { name: /add to cart/i })
    await userEvent.click(button)

    expect(addToCart).toHaveBeenCalledTimes(1)
    expect(addToCart).toHaveBeenCalledWith(mockProducts[0])
  })

  it("handles fetch error gracefully", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {})
    global.fetch = vi.fn(() => Promise.reject(new Error("Network error")))

    useCart.mockReturnValue({ addToCart: vi.fn() })
    render(<ProductCard />)

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error fetching products:",
        expect.any(Error)
      )
    })
    consoleSpy.mockRestore()
  })
})
