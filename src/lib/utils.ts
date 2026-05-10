import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { StockStatus } from '@/types'

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatPriceWithDecimals(price: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price)
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function truncateDescription(str: string, maxLength: number = 155): string {
  if (!str) return ''
  if (str.length <= maxLength) return str

  const truncated = str.slice(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')

  return lastSpace > 0 ? `${truncated.slice(0, lastSpace)}...` : `${truncated}...`
}

export function generateProductTitle(productName: string): string {
  return `${productName} — Achetez au meilleur prix`
}

export function generateCanonicalUrl(path: string): string {
  const appUrl = import.meta.env.VITE_APP_URL || 'https://shop.votre-domaine.com'
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${appUrl}${normalizedPath}`
}

export function getStockStatus(quantity: number): StockStatus {
  if (quantity <= 0) return 'out_of_stock'
  if (quantity <= 5) return 'low_stock'
  return 'in_stock'
}

export function getStockLabel(quantity: number): string {
  if (quantity <= 0) return 'Rupture de stock'
  if (quantity <= 5) return `Plus que ${quantity} en stock`
  return 'En stock'
}

export function getStockColor(quantity: number): string {
  if (quantity <= 0) return 'text-red-500'
  if (quantity <= 5) return 'text-amber-500'
  return 'text-volt-400'
}

export function calculateTax(amount: number, rate: number = 0.2): number {
  return amount * rate
}

export function calculateTotal(subtotal: number, taxRate: number = 0.2): number {
  return subtotal * (1 + taxRate)
}

export function debounce<T extends (...args: Parameters<T>) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => func(...args), wait)
  }
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}
