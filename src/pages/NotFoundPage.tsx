import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Search } from 'lucide-react'
import SeoHead from '@/seo/SeoHead'
import { Button } from '@/components/ui'

export default function NotFoundPage() {
  const popularCategories = [
    { href: '/produits?category=1', label: 'Laptops / PC', emoji: '💻' },
    { href: '/produits?category=2', label: 'Smartphones', emoji: '📱' },
    { href: '/produits?category=3', label: 'Audio', emoji: '🎧' },
    { href: '/produits?category=4', label: 'Gaming', emoji: '🎮' },
  ]

  return (
    <>
      <SeoHead
        title="Page introuvable"
        description="La page que vous recherchez n'existe pas ou a été déplacée."
        noIndex
      />

      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-lg"
        >
          {/* 404 */}
          <div className="relative mb-8">
            <span className="text-[150px] lg:text-[200px] font-display font-bold text-ink-800 select-none">
              404
            </span>
            <motion.span
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl"
            >
              🔍
            </motion.span>
          </div>

          {/* Message */}
          <h1 className="font-display text-3xl font-bold text-ink-50 mb-4">
            Page introuvable
          </h1>
          <p className="text-ink-400 mb-8">
            Oops ! La page que vous recherchez n'existe pas ou a été déplacée.
            Pas de panique, nous allons vous aider à retrouver votre chemin.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link to="/">
              <Button size="lg">
                <Home className="h-5 w-5 mr-2" />
                Retour à l'accueil
              </Button>
            </Link>
            <Link to="/produits">
              <Button variant="secondary" size="lg">
                <Search className="h-5 w-5 mr-2" />
                Voir le catalogue
              </Button>
            </Link>
          </div>

          {/* Popular categories */}
          <div>
            <p className="text-ink-400 text-sm mb-4">
              Ou explorez nos catégories populaires :
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {popularCategories.map((category) => (
                <Link
                  key={category.href}
                  to={category.href}
                  className="px-4 py-2 bg-ink-800 rounded-full text-sm text-ink-200 hover:bg-ink-700 hover:text-volt-400 transition-colors flex items-center gap-2"
                >
                  <span>{category.emoji}</span>
                  {category.label}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}
