import { Helmet } from 'react-helmet-async'
import { productImageUrl } from '@/api/odooClient'
import type { Product } from '@/types'

const APP_URL = import.meta.env.VITE_APP_URL || 'https://shop.votre-domaine.com'

interface ProductSchemaProps {
  product: Product | null | undefined
}

export default function ProductSchema({ product }: ProductSchemaProps) {
  if (!product) return null

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description_sale || product.name,
    image: productImageUrl(product.id, '512'),
    brand: {
      '@type': 'Brand',
      name: 'PRIMUS Electronics',
    },
    offers: {
      '@type': 'Offer',
      price: product.list_price,
      priceCurrency: 'EUR',
      availability: product.qty_available > 0
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `${APP_URL}/produits/${product.id}`,
      seller: {
        '@type': 'Organization',
        name: 'PRIMUS Electronics',
      },
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    },
    ...(product.rating_avg && product.rating_avg > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating_avg,
        reviewCount: product.rating_count || 1,
        bestRating: 5,
        worstRating: 1,
      },
    }),
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}
