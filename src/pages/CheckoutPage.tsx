import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, CreditCard, Check, Lock } from 'lucide-react'
import toast from 'react-hot-toast'
import { useCartStore } from '@/store'
import { useCreateOrder, useConfirmOrder } from '@/hooks/useOdoo'
import { usePageSeo } from '@/hooks/useSeo'
import { productImageUrl } from '@/api/odooClient'
import SeoHead from '@/seo/SeoHead'
import { Button, Input, PriceDisplay } from '@/components/ui'
import ImageWithFallback from '@/components/seo/ImageWithFallback'
import { formatPrice } from '@/lib/utils'

type Step = 'info' | 'payment' | 'confirmation'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>('info')
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  })

  const { items, getSubtotal, getTax, getTotal, clearCart } = useCartStore()
  const createOrderMutation = useCreateOrder()
  const confirmOrderMutation = useConfirmOrder()

  const seo = usePageSeo('checkout')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmitInfo = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email || !formData.name) {
      toast.error('Veuillez remplir tous les champs obligatoires')
      return
    }

    try {
      await createOrderMutation.mutateAsync({
        email: formData.email,
        name: formData.name,
        phone: formData.phone,
      })
      setStep('payment')
    } catch {
      toast.error('Erreur lors de la création de la commande')
    }
  }

  const handlePayment = async (method: 'stripe' | 'paypal') => {
    try {
      // Simulate payment processing
      toast.loading('Traitement du paiement...', { id: 'payment' })

      await new Promise((resolve) => setTimeout(resolve, 2000))

      await confirmOrderMutation.mutateAsync()

      toast.success('Paiement effectué avec succès !', { id: 'payment' })
      setStep('confirmation')
    } catch {
      toast.error('Erreur lors du paiement', { id: 'payment' })
    }
  }

  if (items.length === 0 && step !== 'confirmation') {
    return (
      <>
        <SeoHead title={seo.title} description={seo.description} noIndex />
        <div className="container mx-auto px-4 lg:px-6 py-16 text-center">
          <h1 className="text-2xl font-display font-bold text-ink-50 mb-4">
            Votre panier est vide
          </h1>
          <Link to="/produits">
            <Button>Retour au catalogue</Button>
          </Link>
        </div>
      </>
    )
  }

  return (
    <>
      <SeoHead title={seo.title} description={seo.description} noIndex />

      <div className="container mx-auto px-4 lg:px-6 py-8">
        {/* Back link */}
        {step !== 'confirmation' && (
          <Link
            to="/panier"
            className="inline-flex items-center gap-2 text-ink-400 hover:text-volt-400 transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour au panier
          </Link>
        )}

        {/* Progress */}
        {step !== 'confirmation' && (
          <div className="flex items-center justify-center gap-4 mb-12">
            {['info', 'payment'].map((s, i) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step === s
                      ? 'bg-volt-400 text-ink-950'
                      : i < ['info', 'payment'].indexOf(step)
                      ? 'bg-volt-400/20 text-volt-400'
                      : 'bg-ink-800 text-ink-400'
                  }`}
                >
                  {i < ['info', 'payment'].indexOf(step) ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                <span className={`ml-2 text-sm ${step === s ? 'text-ink-50' : 'text-ink-400'}`}>
                  {s === 'info' ? 'Informations' : 'Paiement'}
                </span>
                {i < 1 && <div className="w-12 h-px bg-ink-700 mx-4" />}
              </div>
            ))}
          </div>
        )}

        {/* Step: Information */}
        {step === 'info' && (
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="font-display text-2xl font-bold text-ink-50 mb-6">
                Vos informations
              </h1>

              <form onSubmit={handleSubmitInfo} className="space-y-4">
                <Input
                  label="Email *"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="Nom complet *"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="Téléphone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                <Input
                  label="Adresse"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Code postal"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                  />
                  <Input
                    label="Ville"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full mt-6"
                  size="lg"
                  isLoading={createOrderMutation.isPending}
                >
                  Continuer vers le paiement
                </Button>
              </form>
            </motion.div>

            {/* Order Summary */}
            <OrderSummary items={items} getSubtotal={getSubtotal} getTax={getTax} getTotal={getTotal} />
          </div>
        )}

        {/* Step: Payment */}
        {step === 'payment' && (
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="font-display text-2xl font-bold text-ink-50 mb-6">
                Paiement sécurisé
              </h1>

              <div className="space-y-4">
                {/* Stripe */}
                <button
                  onClick={() => handlePayment('stripe')}
                  disabled={confirmOrderMutation.isPending}
                  className="w-full p-4 bg-ink-900 border border-ink-700 rounded-xl hover:border-volt-400 transition-colors flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-[#635BFF] rounded-lg flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-ink-50">Carte bancaire</p>
                    <p className="text-sm text-ink-400">Visa, Mastercard, AMEX</p>
                  </div>
                </button>

                {/* PayPal */}
                <button
                  onClick={() => handlePayment('paypal')}
                  disabled={confirmOrderMutation.isPending}
                  className="w-full p-4 bg-ink-900 border border-ink-700 rounded-xl hover:border-volt-400 transition-colors flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-[#003087] rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">PP</span>
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-ink-50">PayPal</p>
                    <p className="text-sm text-ink-400">Paiement rapide et sécurisé</p>
                  </div>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 mt-6 text-ink-400 text-sm">
                <Lock className="h-4 w-4" />
                Paiement 100% sécurisé
              </div>
            </motion.div>

            <OrderSummary items={items} getSubtotal={getSubtotal} getTax={getTax} getTotal={getTotal} />
          </div>
        )}

        {/* Step: Confirmation */}
        {step === 'confirmation' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 bg-volt-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-ink-950" />
            </div>
            <h1 className="font-display text-3xl font-bold text-ink-50 mb-4">
              Commande confirmée !
            </h1>
            <p className="text-ink-400 mb-8 max-w-md mx-auto">
              Merci pour votre commande. Vous recevrez un email de confirmation
              avec les détails de votre commande.
            </p>
            <Link to="/produits">
              <Button size="lg">Continuer mes achats</Button>
            </Link>
          </motion.div>
        )}
      </div>
    </>
  )
}

function OrderSummary({
  items,
  getSubtotal,
  getTax,
  getTotal,
}: {
  items: ReturnType<typeof useCartStore>['items']
  getSubtotal: () => number
  getTax: () => number
  getTotal: () => number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-ink-900 rounded-xl border border-ink-700 p-6 h-fit"
    >
      <h2 className="font-display text-lg font-medium text-ink-50 mb-4">
        Récapitulatif
      </h2>

      <div className="space-y-3 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3">
            <ImageWithFallback
              src={productImageUrl(item.id, '64')}
              alt={item.name}
              fallbackEmoji={item.emoji || '📦'}
              className="w-12 h-12"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-ink-100 truncate">{item.name}</p>
              <p className="text-xs text-ink-400">Qté: {item.quantity}</p>
            </div>
            <p className="text-sm text-ink-100">
              {formatPrice(item.list_price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t border-ink-700 pt-4 space-y-2 text-sm">
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
    </motion.div>
  )
}
