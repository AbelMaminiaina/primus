import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Minus, Plus, Trash2, ArrowLeft, ArrowRight, ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/store'
import { productImageUrl } from '@/api/odooClient'
import { usePageSeo } from '@/hooks/useSeo'
import SeoHead from '@/seo/SeoHead'
import { Button, PriceDisplay } from '@/components/ui'
import ImageWithFallback from '@/components/seo/ImageWithFallback'
import { formatPrice } from '@/lib/utils'

export default function CartPage() {
  const { items, updateQuantity, removeItem, getSubtotal, getTax, getTotal } = useCartStore()
  const seo = usePageSeo('cart')

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  if (items.length === 0) {
    return (
      <>
        <SeoHead title={seo.title} description={seo.description} noIndex />

        <div className="container mx-auto px-4 lg:px-6 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-8xl mb-6 block">🛒</span>
            <h1 className="font-display text-3xl font-bold text-ink-50 mb-4">
              Votre panier est vide
            </h1>
            <p className="text-ink-400 mb-8 max-w-md mx-auto">
              Vous n'avez pas encore ajouté de produits à votre panier.
              Découvrez notre sélection high-tech premium.
            </p>
            <Link to="/produits">
              <Button size="lg">
                Découvrir nos produits
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </>
    )
  }

  return (
    <>
      <SeoHead title={seo.title} description={seo.description} noIndex />

      <div className="container mx-auto px-4 lg:px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-ink-50 flex items-center gap-3">
              <ShoppingBag className="h-8 w-8 text-volt-400" />
              Votre panier
            </h1>
            <p className="text-ink-400 mt-1">
              {itemCount} article{itemCount > 1 ? 's' : ''}
            </p>
          </div>

          <Link
            to="/produits"
            className="flex items-center gap-2 text-ink-400 hover:text-volt-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Continuer mes achats
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex gap-4 p-4 bg-ink-900 rounded-xl border border-ink-700"
              >
                {/* Image */}
                <Link to={`/produits/${item.id}`} className="flex-shrink-0">
                  <ImageWithFallback
                    src={productImageUrl(item.id, '128')}
                    alt={item.name}
                    fallbackEmoji={item.emoji || '📦'}
                    className="w-24 h-24 lg:w-32 lg:h-32"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <Link to={`/produits/${item.id}`}>
                    <h3 className="font-medium text-ink-50 hover:text-volt-400 transition-colors truncate">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-ink-400 mt-1">{item.categ_id[1]}</p>

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 rounded-lg bg-ink-800 text-ink-100 hover:bg-ink-700 transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-12 text-center font-mono text-ink-50">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 rounded-lg bg-ink-800 text-ink-100 hover:bg-ink-700 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Price */}
                    <PriceDisplay price={item.list_price * item.quantity} />
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-ink-400 hover:text-red-500 transition-colors self-start"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-ink-900 rounded-xl border border-ink-700 p-6 sticky top-24"
            >
              <h2 className="font-display text-xl font-medium text-ink-50 mb-6">
                Récapitulatif
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-ink-300">
                  <span>Sous-total HT</span>
                  <span>{formatPrice(getSubtotal())}</span>
                </div>
                <div className="flex justify-between text-ink-300">
                  <span>TVA (20%)</span>
                  <span>{formatPrice(getTax())}</span>
                </div>
                <div className="flex justify-between text-ink-300">
                  <span>Livraison</span>
                  <span className="text-volt-400">Offerte</span>
                </div>
              </div>

              <div className="border-t border-ink-700 my-6" />

              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-medium text-ink-50">Total TTC</span>
                <PriceDisplay price={getTotal()} size="xl" />
              </div>

              <Link to="/checkout">
                <Button className="w-full group" size="lg">
                  Passer commande
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>

              <p className="text-xs text-ink-400 text-center mt-4">
                Paiement sécurisé par Stripe & PayPal
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}
