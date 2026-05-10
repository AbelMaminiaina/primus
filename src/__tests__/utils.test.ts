import { describe, it, expect } from 'vitest'
import {
  formatPrice,
  slugify,
  truncateDescription,
  getStockStatus,
  getStockLabel,
  cn,
} from '@/lib/utils'

describe('formatPrice', () => {
  it('formats price in EUR', () => {
    expect(formatPrice(1499)).toBe('1 499 €')
    expect(formatPrice(99)).toBe('99 €')
    expect(formatPrice(0)).toBe('0 €')
  })

  it('handles large numbers', () => {
    expect(formatPrice(10000)).toBe('10 000 €')
  })
})

describe('slugify', () => {
  it('converts string to kebab-case', () => {
    expect(slugify('MacBook Pro M3 Max')).toBe('macbook-pro-m3-max')
  })

  it('removes accents', () => {
    expect(slugify('Écouteurs Bluetooth')).toBe('ecouteurs-bluetooth')
  })

  it('handles special characters', () => {
    expect(slugify('iPhone 16 Pro (512GB)')).toBe('iphone-16-pro-512gb')
  })

  it('handles multiple spaces', () => {
    expect(slugify('Hello   World')).toBe('hello-world')
  })
})

describe('truncateDescription', () => {
  it('truncates long strings', () => {
    const longText = 'a'.repeat(200)
    const result = truncateDescription(longText, 155)
    expect(result.length).toBeLessThanOrEqual(158) // 155 + '...'
  })

  it('does not truncate short strings', () => {
    expect(truncateDescription('Short text', 155)).toBe('Short text')
  })

  it('handles empty strings', () => {
    expect(truncateDescription('', 155)).toBe('')
  })

  it('truncates at word boundary', () => {
    const text = 'This is a test sentence that needs to be truncated properly'
    const result = truncateDescription(text, 30)
    expect(result).not.toMatch(/\s\.\.\./)
  })
})

describe('getStockStatus', () => {
  it('returns out_of_stock for 0', () => {
    expect(getStockStatus(0)).toBe('out_of_stock')
  })

  it('returns low_stock for 1-5', () => {
    expect(getStockStatus(1)).toBe('low_stock')
    expect(getStockStatus(5)).toBe('low_stock')
  })

  it('returns in_stock for > 5', () => {
    expect(getStockStatus(6)).toBe('in_stock')
    expect(getStockStatus(100)).toBe('in_stock')
  })
})

describe('getStockLabel', () => {
  it('returns correct label for out of stock', () => {
    expect(getStockLabel(0)).toBe('Rupture de stock')
  })

  it('returns correct label for low stock', () => {
    expect(getStockLabel(3)).toBe('Plus que 3 en stock')
  })

  it('returns correct label for in stock', () => {
    expect(getStockLabel(10)).toBe('En stock')
  })
})

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('handles conditional classes', () => {
    expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz')
  })

  it('merges tailwind classes correctly', () => {
    expect(cn('p-4', 'p-2')).toBe('p-2')
  })
})
