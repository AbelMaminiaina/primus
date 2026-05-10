import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import type { Product, CartItem } from '@/types'

// ═══════════════════════════════════════════════════════════════
// Cart Store
// ═══════════════════════════════════════════════════════════════

interface CartState {
  items: CartItem[]
  odooOrderId: number | null
  addItem: (product: Product, quantity?: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  removeItem: (productId: number) => void
  clearCart: () => void
  setOdooOrderId: (orderId: number | null) => void
  getItemCount: () => number
  getSubtotal: () => number
  getTax: () => number
  getTotal: () => number
}

export const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set, get) => ({
        items: [],
        odooOrderId: null,

        addItem: (product: Product, quantity: number = 1) => {
          set((state) => {
            const existingItem = state.items.find((item) => item.id === product.id)

            if (existingItem) {
              return {
                items: state.items.map((item) =>
                  item.id === product.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
                ),
              }
            }

            return {
              items: [...state.items, { ...product, quantity }],
            }
          })
        },

        updateQuantity: (productId: number, quantity: number) => {
          if (quantity <= 0) {
            get().removeItem(productId)
            return
          }

          set((state) => ({
            items: state.items.map((item) =>
              item.id === productId ? { ...item, quantity } : item
            ),
          }))
        },

        removeItem: (productId: number) => {
          set((state) => ({
            items: state.items.filter((item) => item.id !== productId),
          }))
        },

        clearCart: () => {
          set({ items: [], odooOrderId: null })
        },

        setOdooOrderId: (orderId: number | null) => {
          set({ odooOrderId: orderId })
        },

        getItemCount: () => {
          return get().items.reduce((total, item) => total + item.quantity, 0)
        },

        getSubtotal: () => {
          return get().items.reduce(
            (total, item) => total + item.list_price * item.quantity,
            0
          )
        },

        getTax: () => {
          return get().getSubtotal() * 0.2
        },

        getTotal: () => {
          return get().getSubtotal() + get().getTax()
        },
      }),
      {
        name: 'nexus-cart',
        partialize: (state) => ({
          items: state.items,
          odooOrderId: state.odooOrderId,
        }),
      }
    ),
    { name: 'CartStore' }
  )
)

// ═══════════════════════════════════════════════════════════════
// Wishlist Store
// ═══════════════════════════════════════════════════════════════

interface WishlistState {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (productId: number) => void
  toggleItem: (product: Product) => void
  isInWishlist: (productId: number) => boolean
  clearWishlist: () => void
}

export const useWishlistStore = create<WishlistState>()(
  devtools(
    persist(
      (set, get) => ({
        items: [],

        addItem: (product: Product) => {
          set((state) => {
            if (state.items.find((item) => item.id === product.id)) {
              return state
            }
            return { items: [...state.items, product] }
          })
        },

        removeItem: (productId: number) => {
          set((state) => ({
            items: state.items.filter((item) => item.id !== productId),
          }))
        },

        toggleItem: (product: Product) => {
          const exists = get().items.find((item) => item.id === product.id)
          if (exists) {
            get().removeItem(product.id)
          } else {
            get().addItem(product)
          }
        },

        isInWishlist: (productId: number) => {
          return get().items.some((item) => item.id === productId)
        },

        clearWishlist: () => {
          set({ items: [] })
        },
      }),
      {
        name: 'nexus-wishlist',
      }
    ),
    { name: 'WishlistStore' }
  )
)

// ═══════════════════════════════════════════════════════════════
// UI Store
// ═══════════════════════════════════════════════════════════════

interface UIState {
  isCartOpen: boolean
  isSearchOpen: boolean
  isMobileMenuOpen: boolean
  odooConnected: boolean
  seoTitle: string
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  openSearch: () => void
  closeSearch: () => void
  openMobileMenu: () => void
  closeMobileMenu: () => void
  setOdooConnected: (connected: boolean) => void
  setSeoTitle: (title: string) => void
}

export const useUIStore = create<UIState>()(
  devtools(
    (set) => ({
      isCartOpen: false,
      isSearchOpen: false,
      isMobileMenuOpen: false,
      odooConnected: false,
      seoTitle: '',

      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

      openSearch: () => set({ isSearchOpen: true }),
      closeSearch: () => set({ isSearchOpen: false }),

      openMobileMenu: () => set({ isMobileMenuOpen: true }),
      closeMobileMenu: () => set({ isMobileMenuOpen: false }),

      setOdooConnected: (connected: boolean) => set({ odooConnected: connected }),

      setSeoTitle: (title: string) => set({ seoTitle: title }),
    }),
    { name: 'UIStore' }
  )
)
