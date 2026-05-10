import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart, Minus, Plus, ArrowLeft, Share2, Check } from 'lucide-react'
import toast from 'react-hot-toast'
import { useProductDetail, useAddToCart, useFeaturedProducts } from '@/hooks/useOdoo'
import { usePageSeo } from '@/hooks/useSeo'
import { useWishlistStore } from '@/store'
import { productImageUrl } from '@/api/odooClient'
import SeoHead from '@/seo/SeoHead'
import ProductSchema from '@/seo/ProductSchema'
import BreadcrumbSchema from '@/seo/BreadcrumbSchema'
import { Button, Badge, PriceDisplay, Skeleton } from '@/components/ui'
import ImageWithFallback from '@/components/seo/ImageWithFallback'
import ProductGrid from '@/components/product/ProductGrid'
import { cn, getStockLabel, getStockColor } from '@/lib/utils'

export default function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  const { data: product, isLoading } = useProductDetail(id)
  const { data: relatedProducts } = useFeaturedProducts(4)
  const addToCartMutation = useAddToCart()
  const { isInWishlist, toggleItem } = useWishlistStore()

  const seo = usePageSeo('product', product)

  const inWishlist = product ? isInWishlist(product.id) : false
  const isOutOfStock = product ? product.qty_available <= 0 : true

  const handleAddToCart = async () => {
    if (!product) return
    try {
      await addToCartMutation.mutateAsync({ product, quantity })
      toast.success(`${product.name} ajouté au panier`)
    } catch {
      toast.error('Erreur lors de l\'ajout au panier')
    }
  }

  const handleShare = async () => {
    if (navigator.share && product) {
      await navigator.share({
        title: product.name,
        text: product.description_sale || '',
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Lien copié dans le presse-papier')
    }
  }

  const breadcrumbs = product
    ? [
        { name: 'Accueil', url: '/' },
        { name: product.categ_id[1], url: `/produits?category=${product.categ_id[0]}` },
        { name: product.name, url: `/produits/${product.id}` },
      ]
    : []

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 lg:px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <Skeleton className="aspect-square w-full rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-12 w-2/3" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 lg:px-6 py-16 text-center">
        <span className="text-6xl mb-4 block">😕</span>
        <h1 className="text-2xl font-display font-bold text-ink-50 mb-2">
          Produit introuvable
        </h1>
        <p className="text-ink-400 mb-6">
          Ce produit n'existe pas ou n'est plus disponible.
        </p>
        <Link to="/produits">
          <Button>Retour au catalogue</Button>
        </Link>
      </div>
    )
  }

  return (
    <>
      <SeoHead
        title={seo.title}
        description={seo.description}
        canonical={seo.canonical}
        ogType="product"
      />
      <ProductSchema product={product} />
      <BreadcrumbSchema items={breadcrumbs} />

      <div className="container mx-auto px-4 lg:px-6 py-8">
        {/* Back link */}
        <Link
          to="/produits"
          className="inline-flex items-center gap-2 text-ink-400 hover:text-volt-400 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour au catalogue
        </Link>

        {/* Product Details */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="relative bg-ink-900 rounded-2xl border border-ink-700 overflow-hidden">
              {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <Badge type={product.badge} />
                </div>
              )}
              <ImageWithFallback
                src={productImageUrl(product.id, '512')}
                alt={`${product.name} — ${product.categ_id[1]} | PRIMUS`}
                fallbackEmoji={product.emoji || '📦'}
                aspectRatio="square"
                className="w-full"
              />
            </div>

            {/* Thumbnails (placeholder for multiple images) */}
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    'w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors',
                    selectedImage === i ? 'border-volt-400' : 'border-ink-700 hover:border-ink-600'
                  )}
                >
                  <ImageWithFallback
                    src={productImageUrl(product.id, '128')}
                    alt=""
                    fallbackEmoji={product.emoji || '📦'}
                    className="w-full h-full"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Category */}
            <Link
              to={`/produits?category=${product.categ_id[0]}`}
              className="text-sm text-volt-400 hover:text-volt-500 transition-colors"
            >
              {product.categ_id[1]}
            </Link>

            {/* Title */}
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-ink-50">
              {product.name}
            </h1>

            {/* Rating */}
            {product.rating_avg && product.rating_avg > 0 && (
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={star <= product.rating_avg! ? 'text-amber-400' : 'text-ink-600'}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-ink-100">{product.rating_avg.toFixed(1)}</span>
                <span className="text-ink-400">({product.rating_count} avis)</span>
              </div>
            )}

            {/* Price */}
            <div>
              <PriceDisplay price={product.list_price} size="xl" />
              <p className="text-sm text-ink-400 mt-1">
                TTC • Livraison 48h offerte
              </p>
            </div>

            {/* Stock */}
            <div className={cn('flex items-center gap-2', getStockColor(product.qty_available))}>
              {product.qty_available > 0 && <Check className="h-4 w-4" />}
              <span className="font-medium">{getStockLabel(product.qty_available)}</span>
            </div>

            {/* Description */}
            <p className="text-ink-300 leading-relaxed">
              {product.description_sale || 'Description non disponible.'}
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="text-ink-300">Quantité:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="p-2 rounded-lg bg-ink-800 text-ink-100 hover:bg-ink-700 disabled:opacity-50 transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center font-mono text-ink-50">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.qty_available, quantity + 1))}
                  disabled={quantity >= product.qty_available}
                  className="p-2 rounded-lg bg-ink-800 text-ink-100 hover:bg-ink-700 disabled:opacity-50 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
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

              <button
                onClick={handleShare}
                className="p-3 rounded-lg bg-ink-800 text-ink-100 hover:bg-ink-700 transition-colors"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-ink-700">
              <div className="text-center p-4 bg-ink-800/50 rounded-lg">
                <span className="text-2xl mb-2 block">🚚</span>
                <p className="text-sm text-ink-100">Livraison 48h</p>
                <p className="text-xs text-ink-400">Offerte dès 50€</p>
              </div>
              <div className="text-center p-4 bg-ink-800/50 rounded-lg">
                <span className="text-2xl mb-2 block">🛡️</span>
                <p className="text-sm text-ink-100">Garantie 3 ans</p>
                <p className="text-xs text-ink-400">Satisfait ou remboursé</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts && relatedProducts.length > 0 && (
          <section>
            <h2 className="font-display text-2xl font-bold text-ink-50 mb-6">
              Produits similaires
            </h2>
            <ProductGrid products={relatedProducts.filter((p) => p.id !== product.id).slice(0, 4)} />
          </section>
        )}
      </div>
    </>
  )
}
