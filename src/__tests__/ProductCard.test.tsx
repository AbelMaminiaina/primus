import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProductCard from '@/components/product/ProductCard'
import type { Product } from '@/types'

const mockProduct: Product = {
  id: 1,
  name: 'MacBook Pro M3 Max',
  list_price: 3999,
  description_sale: 'The most powerful MacBook ever.',
  categ_id: [1, 'Laptops / PC'],
  qty_available: 10,
  rating_avg: 4.9,
  rating_count: 127,
  badge: 'NEW',
  emoji: '💻',
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
})

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{ui}</BrowserRouter>
    </QueryClientProvider>
  )
}

describe('ProductCard', () => {
  it('renders product name', () => {
    renderWithProviders(<ProductCard product={mockProduct} />)
    expect(screen.getByText('MacBook Pro M3 Max')).toBeInTheDocument()
  })

  it('renders product price', () => {
    renderWithProviders(<ProductCard product={mockProduct} />)
    expect(screen.getByText('3 999 €')).toBeInTheDocument()
  })

  it('renders product badge', () => {
    renderWithProviders(<ProductCard product={mockProduct} />)
    expect(screen.getByText('NEW')).toBeInTheDocument()
  })

  it('renders category', () => {
    renderWithProviders(<ProductCard product={mockProduct} />)
    expect(screen.getByText('Laptops / PC')).toBeInTheDocument()
  })

  it('renders rating', () => {
    renderWithProviders(<ProductCard product={mockProduct} />)
    expect(screen.getByText('4.9')).toBeInTheDocument()
    expect(screen.getByText('(127)')).toBeInTheDocument()
  })

  it('renders stock status', () => {
    renderWithProviders(<ProductCard product={mockProduct} />)
    expect(screen.getByText('En stock')).toBeInTheDocument()
  })

  it('disables add to cart button when out of stock', () => {
    const outOfStockProduct = { ...mockProduct, qty_available: 0 }
    renderWithProviders(<ProductCard product={outOfStockProduct} />)
    const button = screen.getByRole('button', { name: /épuisé/i })
    expect(button).toBeDisabled()
  })

  it('shows low stock warning', () => {
    const lowStockProduct = { ...mockProduct, qty_available: 3 }
    renderWithProviders(<ProductCard product={lowStockProduct} />)
    expect(screen.getByText('Plus que 3 en stock')).toBeInTheDocument()
  })

  it('has correct test id', () => {
    renderWithProviders(<ProductCard product={mockProduct} />)
    expect(screen.getByTestId('product-card')).toBeInTheDocument()
  })

  it('has accessible role', () => {
    renderWithProviders(<ProductCard product={mockProduct} />)
    expect(screen.getByRole('listitem')).toBeInTheDocument()
  })
})
