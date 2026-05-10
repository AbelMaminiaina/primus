import { useMemo } from 'react'
import { formatPrice, truncateDescription } from '@/lib/utils'
import type { Product, SeoMeta } from '@/types'

const APP_URL = import.meta.env.VITE_APP_URL || 'https://shop.votre-domaine.com'

export function useSeoMeta(product: Product | null | undefined): SeoMeta {
  return useMemo(() => {
    if (!product) {
      return {
        title: 'Produit introuvable',
        description: 'Ce produit n\'existe pas ou n\'est plus disponible.',
        canonical: APP_URL,
        keywords: '',
      }
    }

    const category = product.categ_id?.[1] || 'High-Tech'
    const price = formatPrice(product.list_price)

    const title = `${product.name} — Achetez au meilleur prix`

    const description = product.description_sale
      ? truncateDescription(product.description_sale, 155)
      : `Achetez ${product.name} au meilleur prix. ${price} TTC. Livraison 48h. Garantie 3 ans.`

    const canonical = `${APP_URL}/produits/${product.id}`

    const keywords = [
      product.name,
      category,
      'acheter',
      'prix',
      'france',
      'livraison rapide',
    ].join(', ')

    return {
      title,
      description,
      canonical,
      keywords,
    }
  }, [product])
}
