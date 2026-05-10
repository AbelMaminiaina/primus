// ═══════════════════════════════════════════════════════════════
// NEXUS Electronics — Type Definitions
// ═══════════════════════════════════════════════════════════════

export interface Product {
  id: number
  name: string
  list_price: number
  description_sale?: string
  description?: string
  categ_id: [number, string]
  qty_available: number
  rating_avg?: number
  rating_count?: number
  default_code?: string
  write_date?: string
  badge?: 'NEW' | 'HOT' | 'BEST' | 'RARE' | null
  emoji?: string
  image_256?: string
  attribute_line_ids?: number[]
}

export interface Category {
  id: number
  name: string
  parent_id?: [number, string] | false
  child_id?: number[]
  emoji?: string
}

export interface CartItem extends Product {
  quantity: number
}

export interface HeroSlide {
  id: number
  title: string
  subtitle: string
  description: string
  accent: string
  productId: number
  emoji: string
}

export interface SeoMeta {
  title: string
  description: string
  canonical: string
  keywords?: string
  ogImage?: string
  ogType?: string
  noIndex?: boolean
}

export interface BreadcrumbItem {
  name: string
  url: string
}

export interface OdooResponse<T> {
  jsonrpc: string
  id: number
  result?: T
  error?: {
    message: string
    code: number
    data: unknown
  }
}

export interface ProductsResponse {
  products: Product[]
  total: number
}

export interface FetchProductsOptions {
  categoryId?: number | null
  search?: string
  limit?: number
  offset?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface OrderLine {
  productId: number
  quantity: number
  price: number
}

export interface CustomerInfo {
  email: string
  name: string
  phone?: string
}

export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock'

export type BadgeType = 'NEW' | 'HOT' | 'BEST' | 'RARE'
