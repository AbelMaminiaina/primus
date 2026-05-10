import { Helmet } from 'react-helmet-async'

const APP_URL = import.meta.env.VITE_APP_URL || 'https://shop.votre-domaine.com'

export default function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'NEXUS Electronics',
    url: APP_URL,
    logo: `${APP_URL}/logo.svg`,
    description: 'E-commerce high-tech premium à Madagascar. Smartphones, laptops, audio, gaming. Livraison rapide à Antananarivo.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+261-34-00-000-00',
      contactType: 'customer service',
      email: 'contact@nexus-electronics.com',
      areaServed: 'MG',
      availableLanguage: ['French', 'Malagasy'],
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Lot II J 123 Analakely',
      addressLocality: 'Antananarivo',
      postalCode: '101',
      addressCountry: 'MG',
    },
    sameAs: [
      'https://twitter.com/nexuselectronics',
      'https://facebook.com/nexuselectronics',
      'https://instagram.com/nexuselectronics',
      'https://linkedin.com/company/nexuselectronics',
    ],
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}
