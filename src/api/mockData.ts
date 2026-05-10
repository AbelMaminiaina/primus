import type { Product, Category, HeroSlide, FetchProductsOptions, ProductsResponse } from '@/types'

export const CATEGORIES: Category[] = [
  { id: 1, name: 'Laptops / PC', emoji: '💻' },
  { id: 2, name: 'Smartphones', emoji: '📱' },
  { id: 3, name: 'Audio', emoji: '🎧' },
  { id: 4, name: 'Gaming', emoji: '🎮' },
  { id: 5, name: 'Photo & Vidéo', emoji: '📷' },
  { id: 6, name: 'Maison connectée', emoji: '🏠' },
  { id: 7, name: 'Composants PC', emoji: '🔧' },
]

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'MacBook Pro M3 Max 16"',
    list_price: 3999,
    description_sale: 'Le MacBook Pro le plus puissant jamais conçu. Puce M3 Max, écran Liquid Retina XDR, autonomie de 22 heures.',
    categ_id: [1, 'Laptops / PC'],
    qty_available: 14,
    rating_avg: 4.9,
    rating_count: 127,
    badge: 'NEW',
    emoji: '💻',
  },
  {
    id: 2,
    name: 'iPhone 16 Pro Max 512GB',
    list_price: 1499,
    description_sale: 'iPhone 16 Pro Max avec puce A18 Pro, système photo avancé et écran Super Retina XDR 6.9 pouces.',
    categ_id: [2, 'Smartphones'],
    qty_available: 28,
    rating_avg: 4.8,
    rating_count: 342,
    badge: 'HOT',
    emoji: '📱',
  },
  {
    id: 3,
    name: 'Sony WH-1000XM5',
    list_price: 349,
    description_sale: 'Casque sans fil premium avec réduction de bruit leader du marché. 30 heures d\'autonomie.',
    categ_id: [3, 'Audio'],
    qty_available: 55,
    rating_avg: 4.7,
    rating_count: 891,
    badge: 'BEST',
    emoji: '🎧',
  },
  {
    id: 4,
    name: 'ASUS ROG Zephyrus G16',
    list_price: 2299,
    description_sale: 'PC gaming ultra-portable. RTX 4070, Intel Core i9, écran 240Hz OLED.',
    categ_id: [4, 'Gaming'],
    qty_available: 9,
    rating_avg: 4.6,
    rating_count: 156,
    badge: null,
    emoji: '🎮',
  },
  {
    id: 5,
    name: 'Sony A7R V',
    list_price: 3799,
    description_sale: 'Appareil photo hybride 61MP avec autofocus IA avancé et stabilisation 8 stops.',
    categ_id: [5, 'Photo & Vidéo'],
    qty_available: 7,
    rating_avg: 4.9,
    rating_count: 89,
    badge: null,
    emoji: '📷',
  },
  {
    id: 6,
    name: 'Samsung Galaxy S24 Ultra',
    list_price: 1299,
    description_sale: 'Smartphone flagship avec S Pen intégré, caméra 200MP et Galaxy AI.',
    categ_id: [2, 'Smartphones'],
    qty_available: 32,
    rating_avg: 4.7,
    rating_count: 567,
    badge: 'HOT',
    emoji: '📱',
  },
  {
    id: 7,
    name: 'AirPods Pro 3',
    list_price: 299,
    description_sale: 'Écouteurs sans fil avec réduction de bruit adaptative et audio spatial personnalisé.',
    categ_id: [3, 'Audio'],
    qty_available: 70,
    rating_avg: 4.6,
    rating_count: 1203,
    badge: 'NEW',
    emoji: '🎧',
  },
  {
    id: 8,
    name: 'RTX 4090 Founders Edition',
    list_price: 1799,
    description_sale: 'La carte graphique la plus puissante au monde. 24GB GDDR6X, ray tracing ultime.',
    categ_id: [7, 'Composants PC'],
    qty_available: 5,
    rating_avg: 4.9,
    rating_count: 234,
    badge: 'RARE',
    emoji: '🔧',
  },
  {
    id: 9,
    name: 'iPad Pro M4 13"',
    list_price: 1399,
    description_sale: 'L\'iPad le plus avancé avec puce M4, écran Ultra Retina XDR tandem OLED.',
    categ_id: [1, 'Laptops / PC'],
    qty_available: 19,
    rating_avg: 4.8,
    rating_count: 178,
    badge: 'NEW',
    emoji: '💻',
  },
  {
    id: 10,
    name: 'DJI Osmo Action 5 Pro',
    list_price: 399,
    description_sale: 'Caméra d\'action 4K/120fps avec stabilisation RockSteady 3.0 et étanchéité 20m.',
    categ_id: [5, 'Photo & Vidéo'],
    qty_available: 22,
    rating_avg: 4.5,
    rating_count: 145,
    badge: null,
    emoji: '📷',
  },
  {
    id: 11,
    name: 'Philips Hue Starter Kit',
    list_price: 229,
    description_sale: 'Kit démarrage maison connectée avec 3 ampoules E27 et pont Hue Bridge.',
    categ_id: [6, 'Maison connectée'],
    qty_available: 40,
    rating_avg: 4.4,
    rating_count: 567,
    badge: null,
    emoji: '🏠',
  },
  {
    id: 12,
    name: 'Dell XPS 15 OLED',
    list_price: 1999,
    description_sale: 'Ultrabook premium avec écran OLED 3.5K, Intel Core Ultra 7, design borderless.',
    categ_id: [1, 'Laptops / PC'],
    qty_available: 11,
    rating_avg: 4.6,
    rating_count: 234,
    badge: null,
    emoji: '💻',
  },
  {
    id: 13,
    name: 'Samsung 65" OLED S95D',
    list_price: 2499,
    description_sale: 'TV OLED 4K avec processeur NQ4 AI Gen2, anti-reflet et Gaming Hub.',
    categ_id: [6, 'Maison connectée'],
    qty_available: 8,
    rating_avg: 4.8,
    rating_count: 89,
    badge: 'BEST',
    emoji: '🏠',
  },
  {
    id: 14,
    name: 'Bose QuietComfort Ultra',
    list_price: 449,
    description_sale: 'Casque sans fil avec immersion spatiale et réduction de bruit de nouvelle génération.',
    categ_id: [3, 'Audio'],
    qty_available: 30,
    rating_avg: 4.7,
    rating_count: 456,
    badge: null,
    emoji: '🎧',
  },
  {
    id: 15,
    name: 'Steam Deck OLED',
    list_price: 649,
    description_sale: 'Console PC portable avec écran OLED HDR, 90Hz et autonomie améliorée.',
    categ_id: [4, 'Gaming'],
    qty_available: 25,
    rating_avg: 4.8,
    rating_count: 789,
    badge: 'HOT',
    emoji: '🎮',
  },
  {
    id: 16,
    name: 'Canon EOS R5 Mark II',
    list_price: 4299,
    description_sale: 'Hybride professionnel 45MP avec vidéo 8K RAW et autofocus Eye Control.',
    categ_id: [5, 'Photo & Vidéo'],
    qty_available: 6,
    rating_avg: 4.9,
    rating_count: 67,
    badge: 'NEW',
    emoji: '📷',
  },
]

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    title: 'MacBook Pro M3 Max',
    subtitle: 'Puissance. Démesurée.',
    description: 'Le laptop pro le plus puissant jamais créé par Apple.',
    accent: '#c8ff00',
    productId: 1,
    emoji: '💻',
  },
  {
    id: 2,
    title: 'iPhone 16 Pro Max',
    subtitle: 'Titanium. Titanic.',
    description: 'Le plus grand iPhone jamais conçu.',
    accent: '#00d4ff',
    productId: 2,
    emoji: '📱',
  },
  {
    id: 3,
    title: 'RTX 4090',
    subtitle: 'Beyond Fast.',
    description: 'La carte graphique ultime pour les passionnés.',
    accent: '#ff4dff',
    productId: 8,
    emoji: '🔧',
  },
]

export function getProductEmoji(categoryName: string): string {
  const category = CATEGORIES.find(c => c.name === categoryName)
  return category?.emoji || '📦'
}

export function getMockProduct(id: number | string): Product | undefined {
  return PRODUCTS.find(p => p.id === Number(id))
}

export function getMockProducts(options: FetchProductsOptions = {}): ProductsResponse {
  const { categoryId, search, limit = 20, offset = 0 } = options

  let filtered = [...PRODUCTS]

  if (categoryId) {
    filtered = filtered.filter(p => p.categ_id[0] === categoryId)
  }

  if (search) {
    const searchLower = search.toLowerCase()
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(searchLower) ||
      p.description_sale?.toLowerCase().includes(searchLower)
    )
  }

  const total = filtered.length
  const products = filtered.slice(offset, offset + limit)

  return { products, total }
}
