import { callModel, productImageUrl } from './odooClient'
import type { Product, Category, FetchProductsOptions, ProductsResponse } from '@/types'

const PRODUCT_FIELDS = [
  'id',
  'name',
  'list_price',
  'description_sale',
  'categ_id',
  'image_256',
  'qty_available',
  'rating_avg',
  'rating_count',
  'default_code',
  'write_date',
]

export async function fetchProducts(options: FetchProductsOptions = {}): Promise<ProductsResponse> {
  const {
    categoryId = null,
    search = '',
    limit = 20,
    offset = 0,
    sortBy = 'name',
    sortOrder = 'asc',
  } = options

  const domain: unknown[][] = [['sale_ok', '=', true], ['active', '=', true]]

  if (categoryId) {
    domain.push(['categ_id', '=', categoryId])
  }

  if (search) {
    domain.push(['name', 'ilike', search])
  }

  const order = `${sortBy} ${sortOrder}`

  const products = await callModel<Product[]>('product.template', 'search_read', [], {
    domain,
    fields: PRODUCT_FIELDS,
    limit,
    offset,
    order,
  })

  const total = await callModel<number>('product.template', 'search_count', [domain])

  return { products, total }
}

export async function fetchProductDetail(productId: number): Promise<Product | null> {
  const products = await callModel<Product[]>('product.template', 'search_read', [], {
    domain: [['id', '=', productId]],
    fields: [...PRODUCT_FIELDS, 'description', 'attribute_line_ids'],
    limit: 1,
  })

  return products[0] || null
}

export async function fetchFeaturedProducts(limit: number = 8): Promise<Product[]> {
  const products = await callModel<Product[]>('product.template', 'search_read', [], {
    domain: [['sale_ok', '=', true], ['active', '=', true]],
    fields: PRODUCT_FIELDS,
    limit,
    order: 'write_date desc',
  })

  return products
}

export async function fetchNewArrivals(limit: number = 8): Promise<Product[]> {
  const products = await callModel<Product[]>('product.template', 'search_read', [], {
    domain: [['sale_ok', '=', true], ['active', '=', true]],
    fields: PRODUCT_FIELDS,
    limit,
    order: 'create_date desc',
  })

  return products
}

export async function fetchCategories(): Promise<Category[]> {
  const categories = await callModel<Category[]>('product.category', 'search_read', [], {
    domain: [],
    fields: ['id', 'name', 'parent_id', 'child_id'],
    order: 'name asc',
  })

  return categories
}

export async function fetchSitemapProducts(): Promise<Product[]> {
  const products = await callModel<Product[]>('product.template', 'search_read', [], {
    domain: [['sale_ok', '=', true], ['active', '=', true]],
    fields: ['id', 'name', 'categ_id', 'write_date'],
    limit: 1000,
    order: 'write_date desc',
  })

  return products
}

export async function checkStock(productId: number): Promise<number> {
  const products = await callModel<Product[]>('product.template', 'search_read', [], {
    domain: [['id', '=', productId]],
    fields: ['qty_available'],
    limit: 1,
  })

  return products[0]?.qty_available || 0
}

export async function findOrCreatePartner(
  email: string,
  name: string,
  phone: string = ''
): Promise<number> {
  const existing = await callModel<{ id: number }[]>('res.partner', 'search_read', [], {
    domain: [['email', '=', email]],
    fields: ['id'],
    limit: 1,
  })

  if (existing.length > 0) {
    return existing[0].id
  }

  const partnerId = await callModel<number>('res.partner', 'create', [{
    name,
    email,
    phone,
  }])

  return partnerId
}

export async function createSaleOrder(
  partnerId: number,
  lines: { productId: number; quantity: number; price: number }[]
): Promise<number> {
  const orderLines = lines.map((line) => [0, 0, {
    product_id: line.productId,
    product_uom_qty: line.quantity,
    price_unit: line.price,
  }])

  const orderId = await callModel<number>('sale.order', 'create', [{
    partner_id: partnerId,
    order_line: orderLines,
  }])

  return orderId
}

export async function getSaleOrder(orderId: number): Promise<unknown> {
  const orders = await callModel<unknown[]>('sale.order', 'search_read', [], {
    domain: [['id', '=', orderId]],
    fields: ['id', 'name', 'state', 'amount_total', 'order_line'],
    limit: 1,
  })

  return orders[0] || null
}

export async function confirmOrder(orderId: number): Promise<boolean> {
  await callModel<boolean>('sale.order', 'action_confirm', [[orderId]])
  return true
}

export async function addOrderLine(
  orderId: number,
  productId: number,
  quantity: number,
  price: number
): Promise<number> {
  const lineId = await callModel<number>('sale.order.line', 'create', [{
    order_id: orderId,
    product_id: productId,
    product_uom_qty: quantity,
    price_unit: price,
  }])

  return lineId
}

export async function updateOrderLine(lineId: number, quantity: number): Promise<boolean> {
  await callModel<boolean>('sale.order.line', 'write', [[lineId], {
    product_uom_qty: quantity,
  }])

  return true
}

export async function removeOrderLine(lineId: number): Promise<boolean> {
  await callModel<boolean>('sale.order.line', 'unlink', [[lineId]])
  return true
}

export { productImageUrl }
