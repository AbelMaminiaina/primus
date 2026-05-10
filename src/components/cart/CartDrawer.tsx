import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useUIStore, useCartStore } from '@/store'
import { productImageUrl } from '@/api/odooClient'
import { Button, PriceDisplay } from '@/components/ui'
import ImageWithFallback from '@/components/seo/ImageWithFallback'
import { cn, formatPrice } from '@/lib/utils'

export default function CartDrawer() {
  const { isCartOpen, closeCart } = useUIStore()
  const { items, updateQuantity, removeItem, getSubtotal, getTax, getTotal } = useCartStore()

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <Transition appear show={isCartOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeCart}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-ink-950/80 backdrop-blur-sm" />
        </Transition.Child>

        {/* Drawer */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in duration-200"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col bg-ink-900 border-l border-ink-700 shadow-deep">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-ink-700">
                      <Dialog.Title className="font-display text-lg font-medium text-ink-50 flex items-center gap-2">
                        <ShoppingBag className="h-5 w-5 text-volt-400" />
                        Panier
                        {itemCount > 0 && (
                          <span className="px-2 py-0.5 bg-volt-400 text-ink-950 text-xs font-bold rounded-full">
                            {itemCount}
                          </span>
                        )}
                      </Dialog.Title>
                      <button
                        onClick={closeCart}
                        className="p-2 rounded-lg hover:bg-ink-800 transition-colors"
                      >
                        <X className="h-5 w-5 text-ink-400" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto py-4">
                      {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center px-6">
                          <span className="text-6xl mb-4">🛒</span>
                          <h3 className="text-lg font-medium text-ink-100 mb-2">
                            Votre panier est vide
                          </h3>
                          <p className="text-ink-400 mb-6">
                            Ajoutez des produits pour commencer vos achats.
                          </p>
                          <Button onClick={closeCart}>
                            Continuer mes achats
                          </Button>
                        </div>
                      ) : (
                        <ul className="space-y-4 px-6">
                          <AnimatePresence>
                            {items.map((item) => (
                              <motion.li
                                key={item.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex gap-4 p-4 bg-ink-800 rounded-xl"
                              >
                                {/* Image */}
                                <ImageWithFallback
                                  src={productImageUrl(item.id, '128')}
                                  alt={item.name}
                                  fallbackEmoji={item.emoji || '📦'}
                                  className="w-20 h-20 flex-shrink-0"
                                />

                                {/* Details */}
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-ink-50 truncate mb-1">
                                    {item.name}
                                  </h4>
                                  <p className="text-sm text-ink-400 mb-2">
                                    {item.categ_id[1]}
                                  </p>

                                  {/* Quantity controls */}
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                      className="p-1 rounded bg-ink-700 text-ink-100 hover:bg-ink-600 transition-colors"
                                    >
                                      <Minus className="h-3 w-3" />
                                    </button>
                                    <span className="w-8 text-center text-sm font-mono text-ink-50">
                                      {item.quantity}
                                    </span>
                                    <button
                                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                      className="p-1 rounded bg-ink-700 text-ink-100 hover:bg-ink-600 transition-colors"
                                    >
                                      <Plus className="h-3 w-3" />
                                    </button>
                                  </div>
                                </div>

                                {/* Price & Remove */}
                                <div className="flex flex-col items-end justify-between">
                                  <button
                                    onClick={() => removeItem(item.id)}
                                    className="p-1 text-ink-400 hover:text-red-500 transition-colors"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                  <PriceDisplay
                                    price={item.list_price * item.quantity}
                                    size="sm"
                                  />
                                </div>
                              </motion.li>
                            ))}
                          </AnimatePresence>
                        </ul>
                      )}
                    </div>

                    {/* Footer */}
                    {items.length > 0 && (
                      <div className="border-t border-ink-700 px-6 py-4 space-y-4">
                        {/* Totals */}
                        <div className="space-y-2 text-sm">
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
                          <div className="flex justify-between text-lg font-medium text-ink-50 pt-2 border-t border-ink-700">
                            <span>Total TTC</span>
                            <PriceDisplay price={getTotal()} size="lg" />
                          </div>
                        </div>

                        {/* CTA */}
                        <div className="space-y-2">
                          <Link to="/checkout" onClick={closeCart}>
                            <Button className="w-full group" size="lg">
                              Commander
                              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Button>
                          </Link>
                          <Link to="/panier" onClick={closeCart}>
                            <Button variant="secondary" className="w-full">
                              Voir le panier
                            </Button>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
