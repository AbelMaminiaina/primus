import { useCallback } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useUIStore, useCartStore } from '@/store'
import { authenticate, isAuthenticated } from '@/api/odooClient'
import {
  fetchProducts,
  fetchProductDetail,
  fetchFeaturedProducts,
  fetchNewArrivals,
  fetchCategories,
  createSaleOrder,
  confirmOrder,
  findOrCreatePartner,
  checkStock,
} from '@/api/odooApi'
import {
  PRODUCTS,
  CATEGORIES,
  HERO_SLIDES,
  getMockProducts,
  getMockProduct,
} from '@/api/mockData'
import type { Product, FetchProductsOptions, ProductsResponse, Category, HeroSlide } from '@/types'

export function useOdooConnection() {
  const setOdooConnected = useUIStore((state) => state.setOdooConnected)
  const odooConnected = useUIStore((state) => state.odooConnected)

  const connect = useCallback(async (): Promise<boolean> => {
    try {
      await authenticate()
      setOdooConnected(true)
      return true
    } catch {
      setOdooConnected(false)
      return false
    }
  }, [setOdooConnected])

  return {
    connect,
    isConnected: odooConnected,
    isAuthenticated: isAuthenticated(),
  }
}

export function useProducts(options: FetchProductsOptions = {}) {
  const odooConnected = useUIStore((state) => state.odooConnected)

  return useQuery<ProductsResponse>({
    queryKey: ['products', options],
    queryFn: async () => {
      if (odooConnected) {
        return fetchProducts(options)
      }
      return getMockProducts(options)
    },
    placeholderData: (previousData) => previousData,
  })
}

export function useProductDetail(productId: number | string | undefined) {
  const odooConnected = useUIStore((state) => state.odooConnected)

  return useQuery<Product | null | undefined>({
    queryKey: ['product', productId],
    queryFn: async () => {
      if (odooConnected) {
        return fetchProductDetail(Number(productId))
      }
      return getMockProduct(productId!)
    },
    enabled: !!productId,
  })
}

export function useFeaturedProducts(limit: number = 8) {
  const odooConnected = useUIStore((state) => state.odooConnected)

  return useQuery<Product[]>({
    queryKey: ['featured-products', limit],
    queryFn: async () => {
      if (odooConnected) {
        return fetchFeaturedProducts(limit)
      }
      return PRODUCTS.filter((p) => p.badge).slice(0, limit)
    },
  })
}

export function useNewArrivals(limit: number = 8) {
  const odooConnected = useUIStore((state) => state.odooConnected)

  return useQuery<Product[]>({
    queryKey: ['new-arrivals', limit],
    queryFn: async () => {
      if (odooConnected) {
        return fetchNewArrivals(limit)
      }
      return PRODUCTS.filter((p) => p.badge === 'NEW').slice(0, limit)
    },
  })
}

export function useCategories() {
  const odooConnected = useUIStore((state) => state.odooConnected)

  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      if (odooConnected) {
        return fetchCategories()
      }
      return CATEGORIES
    },
  })
}

export function useHeroSlides() {
  return useQuery<HeroSlide[]>({
    queryKey: ['hero-slides'],
    queryFn: async () => HERO_SLIDES,
    staleTime: Infinity,
  })
}

export function useCheckStock() {
  const odooConnected = useUIStore((state) => state.odooConnected)

  return useMutation({
    mutationFn: async (productId: number): Promise<number> => {
      if (odooConnected) {
        return checkStock(productId)
      }
      const product = getMockProduct(productId)
      return product?.qty_available || 0
    },
  })
}

export function useAddToCart() {
  const addItem = useCartStore((state) => state.addItem)
  const checkStockMutation = useCheckStock()

  return useMutation({
    mutationFn: async ({ product, quantity = 1 }: { product: Product; quantity?: number }) => {
      const stock = await checkStockMutation.mutateAsync(product.id)

      if (stock < quantity) {
        throw new Error('Stock insuffisant')
      }

      addItem(product, quantity)
      return { success: true }
    },
  })
}

export function useCreateOrder() {
  const queryClient = useQueryClient()
  const items = useCartStore((state) => state.items)
  const setOdooOrderId = useCartStore((state) => state.setOdooOrderId)
  const odooConnected = useUIStore((state) => state.odooConnected)

  return useMutation({
    mutationFn: async ({ email, name, phone }: { email: string; name: string; phone?: string }) => {
      if (!odooConnected) {
        return { orderId: `DEMO-${Date.now()}`, demo: true }
      }

      const partnerId = await findOrCreatePartner(email, name, phone || '')

      const lines = items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.list_price,
      }))

      const orderId = await createSaleOrder(partnerId, lines)
      setOdooOrderId(orderId)

      return { orderId, demo: false }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

export function useConfirmOrder() {
  const clearCart = useCartStore((state) => state.clearCart)
  const odooOrderId = useCartStore((state) => state.odooOrderId)
  const odooConnected = useUIStore((state) => state.odooConnected)

  return useMutation({
    mutationFn: async () => {
      if (odooConnected && odooOrderId) {
        await confirmOrder(odooOrderId)
      }
      clearCart()
      return { success: true }
    },
  })
}
