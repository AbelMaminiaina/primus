import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { productImageUrl } from '@/api/odooClient'
import { useWishlistStore } from '@/store'
import { useAddToCart } from '@/hooks/useOdoo'
import { Button, Badge, PriceDisplay } from '@/components/ui'
import ImageWithFallback from '@/components/seo/ImageWithFallback'
import { cn, getStockLabel, getStockColor } from '@/lib/utils'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
  onQuickView?: (product: Product) => void
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const addToCartMutation = useAddToCart()
  const { isInWishlist, toggleItem } = useWishlistStore()
  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = async () => {
    try {
      await addToCartMutation.mutateAsync({ product, quantity: 1 })
      toast.success(`${product.name} ajouté au panier`)
    } catch (error) {
      toast.error('Erreur lors de l\'ajout au panier')
    }
  }

  const handleToggleWishlist = () => {
    toggleItem(product)
    toast.success(
      inWishlist ? 'Retiré des favoris' : 'Ajouté aux favoris'
    )
  }

  const isOutOfStock = product.qty_available <= 0

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'group relative bg-ink-900 rounded-xl border border-ink-700',
        'transition-all duration-200 ease-out',
        'hover:border-ink-600 hover:shadow-card hover:scale-[1.02]'
      )}
      data-testid="product-card"
      role="listitem"
    >
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-3 left-3 z-10">
          <Badge type={product.badge} />
        </div>
      )}

      {/* Quick Actions */}
      <div
        className={cn(
          'absolute top-3 right-3 z-10 flex flex-col gap-2',
          'transition-opacity duration-200',
          isHovered ? 'opacity-100' : 'opacity-0'
        )}
      >
        <button
          onClick={handleToggleWishlist}
          className={cn(
            'p-2 rounded-full backdrop-blur-sm transition-colors duration-150',
            inWishlist
              ? 'bg-plasma-400 text-ink-950'
              : 'bg-ink-800/80 text-ink-100 hover:bg-ink-700'
          )}
          aria-label={inWishlist ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        >
          <Heart className={cn('h-4 w-4', inWishlist && 'fill-current')} />
        </button>
        {onQuickView && (
          <button
            onClick={() => onQuickView(product)}
            className="p-2 rounded-full bg-ink-800/80 text-ink-100 hover:bg-ink-700 backdrop-blur-sm transition-colors duration-150"
            aria-label="Aperçu rapide"
          >
            <Eye className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Image */}
      <Link to={`/produits/${product.id}`} className="block p-4">
        <ImageWithFallback
          src={productImageUrl(product.id, '256')}
          alt={`${product.name} — ${product.categ_id[1]} | PRIMUS`}
          fallbackEmoji={product.emoji || '📦'}
          className="w-full"
        />
      </Link>

      {/* Content */}
      <div className="p-4 pt-0">
        {/* Category */}
        <p className="text-xs text-ink-400 mb-1">{product.categ_id[1]}</p>

        {/* Name */}
        <Link to={`/produits/${product.id}`}>
          <h3 className="font-display font-medium text-ink-50 mb-2 line-clamp-2 hover:text-volt-400 transition-colors duration-150">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {product.rating_avg && product.rating_avg > 0 && (
          <div className="flex items-center gap-1 mb-2">
            <span className="text-amber-400">★</span>
            <span className="text-sm text-ink-100">{product.rating_avg.toFixed(1)}</span>
            <span className="text-sm text-ink-400">({product.rating_count})</span>
          </div>
        )}

        {/* Stock */}
        <p className={cn('text-xs mb-3', getStockColor(product.qty_available))}>
          {getStockLabel(product.qty_available)}
        </p>

        {/* Price & CTA */}
        <div className="flex items-center justify-between gap-2">
          <PriceDisplay price={product.list_price} size="md" />

          <Button
            onClick={handleAddToCart}
            disabled={isOutOfStock || addToCartMutation.isPending}
            isLoading={addToCartMutation.isPending}
            size="sm"
            className="flex-shrink-0"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            {isOutOfStock ? 'Épuisé' : 'Ajouter'}
          </Button>
        </div>
      </div>
    </motion.article>
  )
}
