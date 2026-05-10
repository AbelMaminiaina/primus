import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import OrganizationSchema from '@/seo/OrganizationSchema'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const categories = [
    { href: '/produits?category=1', label: 'Laptops / PC' },
    { href: '/produits?category=2', label: 'Smartphones' },
    { href: '/produits?category=3', label: 'Audio' },
    { href: '/produits?category=4', label: 'Gaming' },
    { href: '/produits?category=5', label: 'Photo & Vidéo' },
    { href: '/produits?category=6', label: 'Maison connectée' },
  ]

  const company = [
    { href: '/about', label: 'À propos' },
    { href: '/contact', label: 'Contact' },
    { href: '/careers', label: 'Carrières' },
    { href: '/press', label: 'Presse' },
  ]

  const support = [
    { href: '/faq', label: 'FAQ' },
    { href: '/shipping', label: 'Livraison' },
    { href: '/returns', label: 'Retours' },
    { href: '/warranty', label: 'Garantie' },
  ]

  const legal = [
    { href: '/cgv', label: 'CGV' },
    { href: '/privacy', label: 'Confidentialité' },
    { href: '/cookies', label: 'Cookies' },
    { href: '/mentions', label: 'Mentions légales' },
  ]

  const socials = [
    { href: 'https://facebook.com/primuselectronics', icon: Facebook, label: 'Facebook' },
    { href: 'https://twitter.com/primuselectronics', icon: Twitter, label: 'Twitter' },
    { href: 'https://instagram.com/primuselectronics', icon: Instagram, label: 'Instagram' },
    { href: 'https://linkedin.com/company/primuselectronics', icon: Linkedin, label: 'LinkedIn' },
  ]

  return (
    <footer className="bg-ink-900 border-t border-ink-700">
      <OrganizationSchema />

      <div className="container mx-auto px-4 lg:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <span className="font-display text-2xl font-bold text-volt-400">
                PRIMUS
              </span>
              <span className="text-ink-400 ml-2">Electronics</span>
            </Link>
            <p className="text-ink-400 text-sm mb-6 max-w-xs">
              Votre destination high-tech premium à Madagascar. Les meilleures marques, les meilleurs prix, livraison rapide à Antananarivo.
            </p>

            {/* Contact info */}
            <div className="space-y-2 text-sm">
              <a
                href="mailto:contact@primus-electronics.com"
                className="flex items-center gap-2 text-ink-300 hover:text-volt-400 transition-colors"
              >
                <Mail className="h-4 w-4" />
                contact@primus-electronics.com
              </a>
              <a
                href="tel:+261340000000"
                className="flex items-center gap-2 text-ink-300 hover:text-volt-400 transition-colors"
              >
                <Phone className="h-4 w-4" />
                +261 34 00 000 00
              </a>
              <p className="flex items-center gap-2 text-ink-400">
                <MapPin className="h-4 w-4" />
                Antananarivo, Madagascar
              </p>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-medium text-ink-50 mb-4">Catégories</h3>
            <ul className="space-y-2">
              {categories.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-ink-400 hover:text-volt-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-medium text-ink-50 mb-4">Entreprise</h3>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-ink-400 hover:text-volt-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-medium text-ink-50 mb-4">Support</h3>
            <ul className="space-y-2">
              {support.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-ink-400 hover:text-volt-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-medium text-ink-50 mb-4">Légal</h3>
            <ul className="space-y-2">
              {legal.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-ink-400 hover:text-volt-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-ink-700 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-ink-400">
            © {currentYear} PRIMUS Electronics — Tous droits réservés
          </p>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {socials.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-ink-400 hover:text-volt-400 transition-colors"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          {/* Payment methods */}
          <div className="flex items-center gap-2 text-ink-400 text-sm">
            <span>Paiement sécurisé</span>
            <span className="px-2 py-1 bg-ink-800 rounded text-xs">Stripe</span>
            <span className="px-2 py-1 bg-ink-800 rounded text-xs">PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
