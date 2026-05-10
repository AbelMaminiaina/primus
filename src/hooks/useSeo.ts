import { useMemo } from 'react'
import { useSeoMeta } from '@/seo/useSeoMeta'
import type { Product, Category, SeoMeta } from '@/types'

const APP_URL = import.meta.env.VITE_APP_URL || 'https://shop.votre-domaine.com'

interface CatalogData {
  category?: Category | null
  search?: string
  count?: number
}

type PageType = 'home' | 'catalog' | 'product' | 'cart' | 'checkout'

export function usePageSeo(type: PageType, data?: Product | CatalogData | null): SeoMeta & { schema?: string } {
  const productMeta = useSeoMeta(type === 'product' ? (data as Product) : null)

  return useMemo(() => {
    switch (type) {
      case 'home':
        return {
          title: '',
          description: 'Découvrez notre sélection high-tech premium. Smartphones, laptops, audio, gaming. Livraison 48h. Garantie 3 ans.',
          canonical: APP_URL,
          schema: 'organization',
        }

      case 'catalog': {
        const catalogData = data as CatalogData | undefined
        const category = catalogData?.category
        const search = catalogData?.search
        const count = catalogData?.count || 0

        let title = 'Tous nos produits'
        let description = `Découvrez notre catalogue de ${count} produits high-tech. Les meilleures marques au meilleur prix.`

        if (category) {
          title = category.name
          description = `${count} produits dans la catégorie ${category.name}. Livraison 48h.`
        }

        if (search) {
          title = `Résultats pour "${search}"`
          description = `${count} résultats pour "${search}". Trouvez les meilleurs produits high-tech.`
        }

        return {
          title,
          description,
          canonical: category
            ? `${APP_URL}/produits?category=${category.id}`
            : `${APP_URL}/produits`,
          schema: 'catalog',
        }
      }

      case 'product':
        return {
          ...productMeta,
          schema: 'product',
        }

      case 'cart':
        return {
          title: 'Votre panier',
          description: 'Finalisez votre commande sur NEXUS Electronics.',
          canonical: `${APP_URL}/panier`,
          noIndex: true,
        }

      case 'checkout':
        return {
          title: 'Paiement sécurisé',
          description: 'Paiement sécurisé par Stripe et PayPal.',
          canonical: `${APP_URL}/checkout`,
          noIndex: true,
        }

      default:
        return {
          title: 'NEXUS Electronics',
          description: 'High-Tech Premium',
          canonical: APP_URL,
        }
    }
  }, [type, data, productMeta])
}
