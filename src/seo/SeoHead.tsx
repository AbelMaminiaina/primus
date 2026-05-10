import { Helmet } from 'react-helmet-async'

const APP_URL = import.meta.env.VITE_APP_URL || 'https://shop.votre-domaine.com'
const APP_NAME = import.meta.env.VITE_APP_NAME || 'PRIMUS Electronics'

interface SeoHeadProps {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
  ogType?: string
  noIndex?: boolean
}

export default function SeoHead({
  title,
  description,
  canonical,
  ogImage,
  ogType = 'website',
  noIndex = false,
}: SeoHeadProps) {
  const fullTitle = title ? `${title} | ${APP_NAME}` : `${APP_NAME} — High-Tech Premium`
  const defaultDescription = 'Découvrez notre sélection high-tech premium à Madagascar. Smartphones, laptops, audio, gaming. Livraison rapide à Antananarivo. Garantie 3 ans.'
  const finalDescription = description || defaultDescription
  const finalCanonical = canonical || APP_URL
  const finalOgImage = ogImage || `${APP_URL}/og-default.jpg`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={finalDescription} />
      <link rel="canonical" href={finalCanonical} />
      <meta name="robots" content={noIndex ? 'noindex,nofollow' : 'index,follow'} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content={APP_NAME} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalOgImage} />

      {/* Additional */}
      <meta name="theme-color" content="#030308" />
    </Helmet>
  )
}
