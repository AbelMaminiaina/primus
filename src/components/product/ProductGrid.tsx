import { useState } from 'react'
import { motion } from 'framer-motion'
import ProductCard from './ProductCard'
import ProductQuickView from './ProductQuickView'
import { ProductCardSkeleton } from '@/components/ui'
import type { Product } from '@/types'

interface ProductGridProps {
  products: Product[]
  isLoading?: boolean
  skeletonCount?: number
}

export default function ProductGrid({
  products,
  isLoading = false,
  skeletonCount = 8,
}: ProductGridProps) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)

  if (isLoading) {
    return (
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        aria-label="Chargement des produits"
      >
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16"
      >
        <span className="text-6xl mb-4 block">🔍</span>
        <h3 className="text-xl font-display font-medium text-ink-100 mb-2">
          Aucun produit trouvé
        </h3>
        <p className="text-ink-400">
          Essayez de modifier vos filtres ou votre recherche.
        </p>
      </motion.div>
    )
  }

  return (
    <>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        role="list"
        aria-label="Liste de produits"
        data-testid="product-grid"
      >
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <ProductCard
              product={product}
              onQuickView={setQuickViewProduct}
            />
          </motion.div>
        ))}
      </div>

      <ProductQuickView
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </>
  )
}
