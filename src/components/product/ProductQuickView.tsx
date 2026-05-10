import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { X, ShoppingCart, Heart, Minus, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { productImageUrl } from '@/api/odooClient'
import { useWishlistStore } from '@/store'
import { useAddToCart } from '@/hooks/useOdoo'
import { Button, Badge, PriceDisplay } from '@/components/ui'
import ImageWithFallback from '@/components/seo/ImageWithFallback'
import ProductSchema from '@/seo/ProductSchema'
import BreadcrumbSchema from '@/seo/BreadcrumbSchema'
import { cn, getStockLabel, getStockColor } from '@/lib/utils'
import type { Product } from '@/types'

interface ProductQuickViewProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export default function ProductQuickView({ product, isOpen, onClose }: ProductQuickViewProps) {
  const [quantity, setQuantity] = useState(1)
  const addToCartMutation = useAddToCart()
  const { isInWishlist, toggleItem } = useWishlistStore()

  if (!product) return null

  const inWishlist = isInWishlist(product.id)
  const isOutOfStock = product.qty_available <= 0

  const handleAddToCart = async () => {
    try {
      await addToCartMutation.mutateAsync({ product, quantity })
      toast.success(`${product.name} ajouté au panier`)
      onClose()
    } catch {
      toast.error('Erreur lors de l\'ajout au panier')
    }
  }

  const breadcrumbs = [
    { name: 'Accueil', url: '/' },
    { name: product.categ_id[1], url: `/produits?category=${product.categ_id[0]}` },
    { name: product.name, url: `/produits/${product.id}` },
  ]

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-ink-950/80 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl bg-ink-900 rounded-2xl border border-ink-700 overflow-hidden shadow-deep">
                <ProductSchema product={product} />
                <BreadcrumbSchema items={breadcrumbs} />

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full bg-ink-800 text-ink-100 hover:bg-ink-700 transition-colors z-10"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="grid md:grid-cols-2 gap-6 p-6">
                  {/* Image */}
                  <div className="relative">
                    {product.badge && (
                      <div className="absolute top-2 left-2 z-10">
                        <Badge type={product.badge} />
                      </div>
                    )}
                    <ImageWithFallback
                      src={productImageUrl(product.id, '512')}
                      alt={`${product.name} — ${product.categ_id[1]} | PRIMUS`}
                      fallbackEmoji={product.emoji || '📦'}
                      className="w-full rounded-xl"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col">
                    <p className="text-sm text-ink-400 mb-1">{product.categ_id[1]}</p>

                    <Dialog.Title className="font-display text-2xl font-bold text-ink-50 mb-2">
                      {product.name}
                    </Dialog.Title>

                    {/* Rating */}
                    {product.rating_avg && product.rating_avg > 0 && (
                      <div className="flex items-center gap-1 mb-3">
                        <span className="text-amber-400">★</span>
                        <span className="text-ink-100">{product.rating_avg.toFixed(1)}</span>
                        <span className="text-ink-400">({product.rating_count} avis)</span>
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-ink-300 mb-4 line-clamp-3">
                      {product.description_sale || 'Description non disponible.'}
                    </p>

                    {/* Stock */}
                    <p className={cn('text-sm mb-4', getStockColor(product.qty_available))}>
                      {getStockLabel(product.qty_available)}
                    </p>

                    {/* Price */}
                    <div className="mb-6">
                      <PriceDisplay price={product.list_price} size="xl" />
                      <p className="text-sm text-ink-400 mt-1">TTC • Livraison 48h offerte</p>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-sm text-ink-300">Quantité:</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="p-2 rounded-lg bg-ink-800 text-ink-100 hover:bg-ink-700 transition-colors"
                          disabled={quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-12 text-center font-mono text-ink-50">{quantity}</span>
                        <button
                          onClick={() => setQuantity(Math.min(product.qty_available, quantity + 1))}
                          className="p-2 rounded-lg bg-ink-800 text-ink-100 hover:bg-ink-700 transition-colors"
                          disabled={quantity >= product.qty_available}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 mt-auto">
                      <Button
                        onClick={handleAddToCart}
                        disabled={isOutOfStock || addToCartMutation.isPending}
                        isLoading={addToCartMutation.isPending}
                        className="flex-1"
                        size="lg"
                      >
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        {isOutOfStock ? 'Rupture de stock' : 'Ajouter au panier'}
                      </Button>

                      <button
                        onClick={() => toggleItem(product)}
                        className={cn(
                          'p-3 rounded-lg transition-colors',
                          inWishlist
                            ? 'bg-plasma-400 text-ink-950'
                            : 'bg-ink-800 text-ink-100 hover:bg-ink-700'
                        )}
                      >
                        <Heart className={cn('h-5 w-5', inWishlist && 'fill-current')} />
                      </button>
                    </div>

                    {/* View full page */}
                    <Link
                      to={`/produits/${product.id}`}
                      onClick={onClose}
                      className="text-center text-sm text-volt-400 hover:text-volt-500 mt-4 transition-colors"
                    >
                      Voir tous les détails →
                    </Link>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
