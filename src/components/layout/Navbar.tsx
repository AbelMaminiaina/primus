import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ShoppingCart, Heart, Menu, X } from 'lucide-react'
import { useUIStore, useCartStore, useWishlistStore } from '@/store'
import { OdooStatus } from '@/components/ui'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  const { openCart, odooConnected } = useUIStore()
  const cartItems = useCartStore((state) => state.items)
  const wishlistItems = useWishlistStore((state) => state.items)

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/produits?search=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
    }
  }

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/produits', label: 'Catalogue' },
    { href: '/produits?category=1', label: 'Laptops' },
    { href: '/produits?category=2', label: 'Smartphones' },
    { href: '/produits?category=4', label: 'Gaming' },
  ]

  return (
    <header className="sticky top-0 z-40 bg-ink-950/95 backdrop-blur-md border-b border-ink-800">
      <nav className="container mx-auto px-4 lg:px-6" aria-label="Navigation principale">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="font-display text-xl font-bold text-volt-400">
              PRIMUS
            </span>
            <span className="hidden sm:inline text-ink-400 text-sm">Electronics</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm text-ink-200 hover:text-volt-400 transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un produit..."
                className={cn(
                  'w-full pl-10 pr-4 py-2 bg-ink-900 border border-ink-700 rounded-lg',
                  'text-sm text-ink-50 placeholder:text-ink-400',
                  'focus:outline-none focus:ring-2 focus:ring-volt-400 focus:border-transparent',
                  'transition-all duration-150'
                )}
              />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Odoo Status */}
            <div className="hidden sm:block">
              <OdooStatus connected={odooConnected} />
            </div>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2 text-ink-200 hover:text-plasma-400 transition-colors"
            >
              <Heart className="h-5 w-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-plasma-400 text-ink-950 text-xs font-bold rounded-full flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative p-2 text-ink-200 hover:text-volt-400 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-volt-400 text-ink-950 text-xs font-bold rounded-full flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-ink-200 hover:text-ink-50 transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-ink-800"
            >
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher..."
                    className="w-full pl-10 pr-4 py-2 bg-ink-900 border border-ink-700 rounded-lg text-sm text-ink-50"
                  />
                </div>
              </form>

              {/* Mobile Links */}
              <div className="px-4 pb-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 text-ink-200 hover:text-volt-400 hover:bg-ink-900 rounded-lg transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
