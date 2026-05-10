# ╔══════════════════════════════════════════════════════════════════════╗
# ║  PROMPT MAÎTRE v2 — SPA E-COMMERCE ÉLECTRONIQUE                     ║
# ║  React 18 · Tailwind CSS · Zustand · React Query · Framer Motion    ║
# ║  Swiper · Odoo JSON-RPC 2.0 · SEO · Contabo VPS · CI/CD Git Actions ║
# ╚══════════════════════════════════════════════════════════════════════╝
#
# Usage    : Coller ce prompt dans Claude / GPT-4o / Gemini Ultra
# Résultat : 35+ fichiers, architecture SPA complète production-ready
# Cible    : VPS Contabo Ubuntu 22.04 + Odoo 17 + GitHub Actions CI/CD
# ──────────────────────────────────────────────────────────────────────


Tu es un expert senior en développement d'applications e-commerce modernes,
référencement naturel (SEO technique), DevOps et intégration continue.
Tu maîtrises React 18, Tailwind CSS v3, Zustand, React Query (TanStack v5),
Framer Motion, Swiper 11, Axios, Vite 5, l'API Odoo JSON-RPC 2.0,
le SEO technique (meta, Schema.org, Core Web Vitals, sitemap, robots),
le déploiement sur VPS Linux (Nginx, Certbot, systemd),
et les pipelines CI/CD (GitHub Actions, SSH deploy, secrets).

Tu vas générer une SPA e-commerce électronique premium complète, modulaire,
production-ready, connectée à Odoo via JSON-RPC, optimisée SEO,
déployée automatiquement sur Contabo via GitHub Actions.


═══════════════════════════════════════════════════════════════════════
SECTION 1 — CONTEXTE MÉTIER
═══════════════════════════════════════════════════════════════════════

Nom du projet    : NEXUS Electronics
Type             : E-commerce électronique grand public (B2C)
Secteur          : High-tech — smartphones, laptops, audio, gaming, photo, composants
Marché cible     : Madagascar (prix en €/MGA, TVA 20%, livraison rapide Antananarivo)
Backend ERP      : Odoo 17 via API JSON-RPC 2.0
Langue UI        : Français
Devise           : Euro (€), format fr-FR
Hébergeur        : Contabo VPS (Ubuntu 22.04 LTS)
Dépôt Git        : GitHub (branches main=prod, develop=staging)
CI/CD            : GitHub Actions

Catégories de produits :
  - Laptops / PC
  - Smartphones
  - Audio (casques, enceintes)
  - Gaming (consoles, PC gaming, périphériques)
  - Photo & Vidéo
  - Maison connectée
  - Composants PC (GPU, RAM, SSD…)


═══════════════════════════════════════════════════════════════════════
SECTION 2 — STACK TECHNOLOGIQUE OBLIGATOIRE
═══════════════════════════════════════════════════════════════════════

Framework UI       : React 18 (hooks, Suspense, concurrent features)
Styles             : Tailwind CSS v3 avec configuration custom étendue
                     (tokens couleurs, animations, shadows custom)
State management   : Zustand v4 avec middleware persist + devtools
                     → 3 stores : CartStore, WishlistStore, UIStore
Data fetching      : TanStack React Query v5
                     → cache 60s, pagination server-side, placeholderData
Animations         : Framer Motion v11
                     → cart drawer spring, card hover, modal scale, transitions
Carousel           : Swiper 11 (effet fade, autoplay, pagination clickable)
Notifications      : react-hot-toast
Intersection       : react-intersection-observer (lazy load produits)
HTTP client        : Axios avec timeout 15s et credentials Odoo
Utilitaires        : clsx + tailwind-merge (cn() helper)
Headless UI        : @headlessui/react (menus, dialogs accessibles)
Icons              : lucide-react
SEO                : react-helmet-async (meta dynamiques par page/produit)
Sitemap            : vite-plugin-sitemap (génération auto au build)
Build tool         : Vite 5 + vite-plugin-compression (gzip + brotli)
                     + @vitejs/plugin-react + rollup-plugin-visualizer
Déploiement        : Nginx reverse proxy sur Contabo VPS
CI/CD              : GitHub Actions (build → test → SSH deploy → notify)

Polices :
  - Display (titres) : Clash Display (fontshare.com) — weights 400/500/700
  - Body (texte)     : Cabinet Grotesk (fontshare.com) — weights 300/400/500
  - Mono (code/prix) : JetBrains Mono (Google Fonts) — weights 400/500

Palette (design system dark theme) :
  - ink-950 #030308   → background principal
  - ink-900 #07070e   → cards
  - ink-800 #0e0e1c   → surfaces élevées
  - ink-700 #18182a   → borders
  - ink-400 #606080   → text muted
  - ink-100 #d8d8e8   → text secondary
  - ink-50  #f0f0f5   → text primary
  - volt-400 #c8ff00  → accent principal (CTA, prix, highlights)
  - plasma-400 #ff4dff → accent secondaire (wishlist, badges)
  - ice-400 #00d4ff   → accent tertiaire (info, quick view)


═══════════════════════════════════════════════════════════════════════
SECTION 3 — ARCHITECTURE FICHIERS À GÉNÉRER (35 fichiers)
═══════════════════════════════════════════════════════════════════════

Génère EXACTEMENT cette arborescence, dans cet ordre :

── Racine ──────────────────────────────────────────────────────────────

📄 package.json
  → Scripts : dev, build, preview, lint, test
  → Dependencies exactes :
    react@18.3, react-dom@18.3,
    @tanstack/react-query@5, @tanstack/react-query-devtools@5,
    zustand@4, framer-motion@11, swiper@11,
    react-hot-toast@2, react-intersection-observer@9,
    react-helmet-async@2,
    clsx@2, tailwind-merge@2, @headlessui/react@2,
    lucide-react, axios@1
  → devDependencies :
    vite@5, @vitejs/plugin-react@4,
    vite-plugin-compression@0.5, vite-plugin-sitemap,
    rollup-plugin-visualizer,
    tailwindcss@3, postcss, autoprefixer,
    eslint, @eslint/js, eslint-plugin-react-hooks,
    vitest@1, @testing-library/react@14, @testing-library/jest-dom

📄 tailwind.config.js
  → Extend theme complet :
    fontFamily (display/body/mono),
    colors (ink 50→950, volt 400/500/600, plasma 400/500, ice 400/500),
    backgroundImage (grid-ink, glow-volt, glow-plasma),
    animation (float, pulse-slow, shimmer, scan, fade-in),
    keyframes correspondants,
    boxShadow (volt, plasma, ice, card, deep)

📄 vite.config.js
  → plugin react
  → alias @ → src/
  → vite-plugin-compression : gzip + brotli des assets
  → vite-plugin-sitemap : génère /sitemap.xml au build
    routes : ['/', '/produits', '/produits/:id', '/panier', '/contact']
  → rollup-plugin-visualizer en mode 'stat' (analyse bundle)
  → build.rollupOptions.output.manualChunks :
    vendor: [react, react-dom],
    query:  [@tanstack/react-query],
    motion: [framer-motion],
    ui:     [swiper, @headlessui/react, lucide-react]
  → server.proxy['/api/odoo'] → VITE_ODOO_URL (résout CORS dev)
  → define : __APP_VERSION__: package.json version

📄 postcss.config.js → tailwindcss + autoprefixer

📄 index.html
  → lang="fr", dark class sur <html>
  → Balises SEO de base dans <head> :
    <meta charset>, viewport, theme-color #030308,
    <title>NEXUS Electronics — High-Tech Premium</title>
    <meta name="description"> générale du site,
    <link rel="canonical">, Open Graph de base,
    <link rel="preconnect"> fontshare + google fonts,
    Preload Clash Display woff2,
    Swiper CDN CSS, div#root, script module main.jsx
  → Schema.org Organization JSON-LD dans <head>

📄 .env.example
  → Toutes les variables avec commentaires :
    # Odoo
    VITE_ODOO_URL=https://erp.votre-domaine.com
    VITE_ODOO_DB=nexus_production
    VITE_ODOO_USER=api_ecommerce
    VITE_ODOO_PASS=changeme_strong_password
    # App
    VITE_APP_URL=https://shop.votre-domaine.com
    VITE_APP_NAME=NEXUS Electronics
    VITE_GTM_ID=GTM-XXXXXXX
    # Déploiement (pour CI/CD — NE PAS committer les valeurs réelles)
    # CONTABO_HOST=185.xxx.xxx.xxx
    # CONTABO_USER=nexus-deploy
    # CONTABO_PATH=/var/www/nexus

📄 .gitignore
  → node_modules, dist, .env.local, .env.production,
    *.log, .DS_Store, dist-ssr, coverage,
    stats.html (rollup visualizer)

📄 nginx/nexus-shop.conf
  → Config Nginx prod complète pour Contabo :
    server block port 80 → redirect HTTPS,
    server block port 443 ssl http2 :
      ssl_certificate /etc/letsencrypt/live/shop.DOMAINE.com/fullchain.pem
      ssl_certificate_key /etc/letsencrypt/live/shop.DOMAINE.com/privkey.pem
      ssl_protocols TLSv1.2 TLSv1.3
      ssl_session_cache shared:SSL:10m
      Security headers :
        Strict-Transport-Security max-age=31536000 includeSubDomains
        X-Frame-Options SAMEORIGIN
        X-Content-Type-Options nosniff
        Referrer-Policy strict-origin-when-cross-origin
        Permissions-Policy geolocation=(), microphone=()
        Content-Security-Policy : default-src 'self', script-src 'self' 'unsafe-inline'
          https://api.fontshare.com https://fonts.googleapis.com,
          style-src 'self' 'unsafe-inline' https://api.fontshare.com,
          img-src 'self' data: https://erp.DOMAINE.com,
          connect-src 'self' https://erp.DOMAINE.com
      root /var/www/nexus/current/dist
      index index.html
      SPA fallback : location / { try_files $uri $uri/ /index.html; }
      Cache assets hashés Vite 1 an immutable :
        location ~* \.(js|css|woff2|ico|png|webp|svg)$ { expires 1y; add_header Cache-Control "public, immutable"; }
      Cache sitemap.xml 1h :
        location = /sitemap.xml { expires 1h; }
      Proxy Odoo API (résout CORS en production) :
        location /api/odoo/ {
          proxy_pass https://erp.DOMAINE.com/;
          proxy_set_header Host erp.DOMAINE.com;
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_set_header X-Forwarded-Proto https;
          proxy_pass_header Set-Cookie;
          proxy_read_timeout 60s;
          proxy_connect_timeout 10s;
          proxy_buffering off;
        }
      Proxy images Odoo avec cache 7j :
        location /web/image/ {
          proxy_pass https://erp.DOMAINE.com/web/image/;
          expires 7d; add_header Cache-Control "public";
        }
      Gzip :
        gzip on; gzip_vary on; gzip_min_length 1024;
        gzip_types text/plain text/css application/json
          application/javascript image/svg+xml text/xml;
      Brotli (si module ngx_brotli installé) :
        brotli on; brotli_comp_level 6;
        brotli_types text/plain text/css application/json application/javascript;

📄 nginx/odoo-erp.conf
  → Config Nginx pour Odoo sur le même VPS :
    server block port 80 → redirect HTTPS,
    server block port 443 ssl http2 :
      ssl Let's Encrypt erp.DOMAINE.com
      Security headers identiques
      location / {
        proxy_pass http://127.0.0.1:8069;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
        proxy_read_timeout 720s;
        proxy_connect_timeout 720s;
        proxy_send_timeout 720s;
        client_max_body_size 200m;
      }
      location /longpolling/ {
        proxy_pass http://127.0.0.1:8072;
      }
      location ~* /web/static/ {
        proxy_cache_valid 200 90d;
        proxy_buffering on;
        proxy_pass http://127.0.0.1:8069;
      }

📄 scripts/setup-contabo.sh
  → Script bash complet exécutable en root sur Ubuntu 22.04 Contabo :
    Mise à jour système (apt update + upgrade)
    Firewall UFW : allow 22, 80, 443 / deny le reste
    Fail2ban : config jail SSH + Nginx brute force
    Swap 2Go (fallocate /swapfile, vm.swappiness=10)
    Node.js 20 LTS via NodeSource
    Nginx (apt install nginx, systemctl enable)
    Certbot via snap (snap install --classic certbot)
    PostgreSQL 15 (pour Odoo)
    Dépendances système Odoo 17 :
      python3-dev, libxml2-dev, libxslt1-dev, libldap2-dev,
      libsasl2-dev, libtiff5-dev, libjpeg8-dev, libopenjp2-7-dev,
      zlib1g-dev, libfreetype6-dev, liblcms2-dev, libwebp-dev,
      libharfbuzz-dev, libfribidi-dev, libxcb1-dev, libpq-dev,
      wkhtmltopdf (version 0.12.6.1 pour PDF Odoo)
    Création utilisateur système 'odoo' non-root
    Création utilisateur PostgreSQL 'odoo'
    Création utilisateur deploy 'nexus-deploy' non-root
      → home /home/nexus-deploy
      → sudo NOPASSWD pour rsync vers /var/www/nexus et systemctl reload nginx
    Création dossier /var/www/nexus avec sous-dossiers :
      /var/www/nexus/current/     (symlink vers release active)
      /var/www/nexus/releases/    (historique 5 dernières releases)
      /var/www/nexus/shared/      (fichiers partagés entre releases)
    Affiche les étapes suivantes (clé SSH à configurer, etc.)

📄 scripts/deploy.sh
  → Script de déploiement appelé par le CI/CD sur le serveur :
    Paramètres : RELEASE_DIR, BUILD_PATH
    Crée /var/www/nexus/releases/$(date +%Y%m%d_%H%M%S)/
    Copie le dist/ dans le dossier release
    Bascule le symlink /var/www/nexus/current → nouveau release
    Recharge Nginx (nginx -t && systemctl reload nginx)
    Nettoie les releases > 5 (ls -t | tail -n +6 | xargs rm -rf)
    Log la date/heure du déploiement dans /var/log/nexus-deploy.log

📄 .github/workflows/ci-cd.yml
  → Pipeline GitHub Actions COMPLET :

  name: NEXUS — CI/CD Pipeline

  on:
    push:
      branches: [main, develop]
    pull_request:
      branches: [main, develop]

  env:
    NODE_VERSION: '20'
    DEPLOY_PATH: /var/www/nexus

  jobs:

    ── job 1 : lint ──────────────────────────────────────────
    lint:
      runs-on: ubuntu-latest
      steps:
        - checkout
        - setup-node@v4 avec cache npm
        - npm ci
        - npm run lint (ESLint)

    ── job 2 : test ──────────────────────────────────────────
    test:
      runs-on: ubuntu-latest
      needs: [lint]
      steps:
        - checkout
        - setup-node@v4 avec cache npm
        - npm ci
        - npm run test (vitest --run)
        - Upload coverage artifact

    ── job 3 : build ─────────────────────────────────────────
    build:
      runs-on: ubuntu-latest
      needs: [test]
      steps:
        - checkout
        - setup-node@v4 avec cache npm
        - npm ci
        - Créer .env.production depuis secrets GitHub :
            VITE_ODOO_URL=${{ secrets.VITE_ODOO_URL }}
            VITE_ODOO_DB=${{ secrets.VITE_ODOO_DB }}
            VITE_ODOO_USER=${{ secrets.VITE_ODOO_USER }}
            VITE_ODOO_PASS=${{ secrets.VITE_ODOO_PASS }}
            VITE_APP_URL=${{ secrets.VITE_APP_URL }}
            VITE_APP_NAME=NEXUS Electronics
            VITE_GTM_ID=${{ secrets.VITE_GTM_ID }}
        - npm run build
        - Upload artifact 'dist' (retention 1 jour)
        - Upload stats.html artifact (rollup visualizer)

    ── job 4 : deploy-staging ────────────────────────────────
    deploy-staging:
      runs-on: ubuntu-latest
      needs: [build]
      if: github.ref == 'refs/heads/develop'
      environment: staging
      steps:
        - Download artifact 'dist'
        - Setup SSH key depuis secret CONTABO_SSH_KEY
        - Ajouter known_hosts (ssh-keyscan du host)
        - rsync -avz --delete dist/ vers
          nexus-deploy@${{ secrets.CONTABO_HOST }}:${{ env.DEPLOY_PATH }}/staging/
        - SSH : nginx -t && systemctl reload nginx
        - Echo "✅ Déployé sur staging"

    ── job 5 : deploy-production ─────────────────────────────
    deploy-production:
      runs-on: ubuntu-latest
      needs: [build]
      if: github.ref == 'refs/heads/main'
      environment: production
      steps:
        - Download artifact 'dist'
        - Setup SSH key depuis secret CONTABO_SSH_KEY
        - Ajouter known_hosts
        - Générer RELEASE_NAME=$(date +%Y%m%d_%H%M%S)
        - rsync -avz dist/ vers
          nexus-deploy@${{ secrets.CONTABO_HOST }}:${{ env.DEPLOY_PATH }}/releases/$RELEASE_NAME/
        - SSH : exécuter scripts/deploy.sh avec RELEASE_NAME
        - SSH : nginx -t && systemctl reload nginx
        - Echo "🚀 Déployé en production — release $RELEASE_NAME"

    ── job 6 : notify ────────────────────────────────────────
    notify:
      runs-on: ubuntu-latest
      needs: [deploy-production]
      if: always()
      steps:
        - Curl webhook Slack/Discord (secret NOTIFY_WEBHOOK) :
          payload JSON avec status (success/failure), branche,
          commit SHA, lien vers le run GitHub Actions

  Secrets GitHub Actions à configurer (lister dans commentaire du yml) :
    CONTABO_HOST        → IP publique du VPS Contabo
    CONTABO_USER        → nexus-deploy
    CONTABO_SSH_KEY     → clé privée SSH (ed25519) du deployer
    VITE_ODOO_URL       → https://erp.votre-domaine.com
    VITE_ODOO_DB        → nexus_production
    VITE_ODOO_USER      → api_ecommerce
    VITE_ODOO_PASS      → mot de passe fort
    VITE_APP_URL        → https://shop.votre-domaine.com
    VITE_GTM_ID         → GTM-XXXXXXX (optionnel)
    NOTIFY_WEBHOOK      → URL webhook Slack ou Discord

📄 .github/workflows/lighthouse.yml
  → Workflow séparé audit Lighthouse :
    on: push to main (schedule weekly)
    steps :
      - checkout
      - treosh/lighthouse-ci-action@v11
        urls: ['https://shop.votre-domaine.com']
        uploadArtifacts: true
        temporaryPublicStorage: true
    → Cible : Performance ≥ 90, SEO ≥ 95, Accessibility ≥ 90

── src/ ─────────────────────────────────────────────────────────────

📄 src/main.jsx
  → ReactDOM.createRoot, HelmetProvider (react-helmet-async),
    QueryClient (retry:1, staleTime:60000, refetchOnWindowFocus:false),
    QueryClientProvider, ReactQueryDevtools (dev only),
    App, import index.css

📄 src/App.jsx
  → useOdooConnection() au mount
  → React Router v6 si installé, sinon hash routing simple
  → Navbar + CartDrawer + Routes + Toaster
  → Toaster stylé dark theme (bg ink-900, border volt)

📄 src/index.css
  → @tailwind base/components/utilities
  → @import fonts fontshare
  → Base : scroll-behavior smooth, ::selection volt, scrollbar custom
  → Swiper pagination custom (bullets pill volt)
  → @layer utilities : .font-display, .font-body, .text-balance

── src/seo/ ────────────────────────────────────────────────────────

📄 src/seo/SeoHead.jsx
  → Composant avec react-helmet-async
  → Props : title, description, canonical, ogImage, ogType, noIndex
  → Construit balises complètes :
    <title>{title} | NEXUS Electronics</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />
    <meta name="robots" content={noIndex ? 'noindex,nofollow' : 'index,follow'} />
    Open Graph : og:title, og:description, og:type, og:url, og:image,
      og:locale fr_FR, og:site_name
    Twitter Card : summary_large_image
    <meta name="viewport">, theme-color
  → Valeurs par défaut :
    title: 'NEXUS Electronics — High-Tech Premium'
    description: 'Découvrez notre sélection high-tech premium.
      Smartphones, laptops, audio, gaming. Livraison 48h. Garantie 3 ans.'
    ogImage: `${VITE_APP_URL}/og-default.jpg`

📄 src/seo/ProductSchema.jsx
  → Schema.org Product JSON-LD via react-helmet-async
  → Props : product (objet Odoo/mock)
  → Génère :
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description_sale,
    "image": productImageUrl(product.id),
    "brand": { "@type": "Brand", "name": "NEXUS Electronics" },
    "offers": {
      "@type": "Offer",
      "price": product.list_price,
      "priceCurrency": "EUR",
      "availability": qty > 0 ? "InStock" : "OutOfStock",
      "url": `${APP_URL}/produits/${product.id}`,
      "seller": { "@type": "Organization", "name": "NEXUS Electronics" }
    },
    "aggregateRating" si rating_avg > 0 :
      { "@type": "AggregateRating", "ratingValue": product.rating_avg,
        "reviewCount": product.rating_count }

📄 src/seo/BreadcrumbSchema.jsx
  → Schema.org BreadcrumbList JSON-LD
  → Props : items [ { name, url } ]
  → Ex : Accueil → Laptops → MacBook Pro M3

📄 src/seo/OrganizationSchema.jsx
  → Schema.org Organization JSON-LD statique :
    name, url, logo, contactPoint (telephone, email, areaServed FR)
    sameAs : réseaux sociaux

📄 src/seo/useSeoMeta.js
  → Hook qui retourne les meta SEO optimisées d'un produit :
    title: `${product.name} — Achetez au meilleur prix | NEXUS`
    description: Génère automatiquement depuis description_sale,
      tronqué à 155 caractères, avec fallback :
      `Achetez ${product.name} au meilleur prix.
       ${formatPrice(product.list_price)} TTC. Livraison 48h. Garantie 3 ans.`
    canonical: `${APP_URL}/produits/${product.id}`
    keywords: [product.name, product.categ_id[1], 'acheter', 'prix', 'france'].join(', ')

── src/api/ ────────────────────────────────────────────────────────

📄 src/api/odooClient.js
  → Objet ODOO config depuis import.meta.env :
    baseUrl: import.meta.env.VITE_ODOO_URL ?? 'http://localhost:8069'
    db, login, password depuis VITE_ODOO_*
  → En production, appels via proxy Nginx /api/odoo/ (évite CORS)
  → En dev, proxy Vite /api/odoo/ → VITE_ODOO_URL
  → Instance axios :
    baseURL: import.meta.env.PROD ? '/api/odoo' : VITE_ODOO_URL,
    withCredentials: true,
    timeout: 15000,
    headers: Content-Type application/json
  → Interceptor request : log en dev uniquement
  → Interceptor response : log erreurs, throw Error formatée
  → _uid state + _authPromise singleton
  → export authenticate() → /web/session/authenticate
  → export callModel(model, method, args, kwargs)
  → export productImageUrl(id, size) → /web/image/product.template/${id}/image_${size}
    Attention : en prod, images servent via Nginx proxy /web/image/

📄 src/api/odooApi.js
  → Identique à v1 avec ajout :
  - fetchSitemapProducts() → search_read tous produits actifs
    fields: id, name, categ_id, write_date (pour lastmod sitemap)
    limit: 1000 (pour sitemap complet)
  - fetchProductBySlug(slug) si Odoo gère les slugs URL
  - Toutes fonctions existantes : fetchProducts, fetchProductDetail,
    fetchFeaturedProducts, fetchNewArrivals, fetchCategories,
    createSaleOrder, getSaleOrder, addOrderLine, updateOrderLine,
    removeOrderLine, confirmOrder, findOrCreatePartner, fetchProductRatings

📄 src/api/mockData.js
  → Identique à v1 (16 produits + 3 slides hero + EMOJIS + productEmoji)
  → Ajout : mockSeoData par produit (description longue, keywords)

── src/store/ ──────────────────────────────────────────────────────

📄 src/store/index.js
  → Identique à v1 (useCartStore, useWishlistStore, useUIStore)
  → Ajout dans UIStore : seoTitle, setSeoTitle (pour pages dynamiques)

── src/hooks/ ──────────────────────────────────────────────────────

📄 src/hooks/useOdoo.js
  → Identique à v1 (useOdooConnection, useProducts, useCategories,
    useFeaturedProducts, useNewArrivals, useProductDetail, useHeroSlides,
    useAddToCart, useConfirmOrder)

📄 src/hooks/useSeo.js
  → Hook pour générer dynamiquement les meta SEO :
    usePageSeo(type, data) où type = 'home'|'catalog'|'product'|'cart'
    Retourne { title, description, canonical, schema } selon le type
    Pour 'product' : utilise useSeoMeta(product)
    Pour 'catalog' : titre avec catégorie et nombre de résultats
    Pour 'home' : meta générales + schema Organization

📄 src/hooks/usePerformance.js
  → Hook pour mesurer et reporter les Core Web Vitals :
    useEffect → import('web-vitals').then(({ onCLS, onINP, onLCP }) => ...)
    Reporter les métriques vers Google Analytics / GTM si VITE_GTM_ID défini
    LCP target < 2.5s, INP < 200ms, CLS < 0.1

── src/lib/ ────────────────────────────────────────────────────────

📄 src/lib/utils.js
  → Identique à v1 + ajouts SEO :
  - slugify(str) → kebab-case sans accents (pour URLs produits)
    ex: "MacBook Pro M3 Max" → "macbook-pro-m3-max"
  - truncateDescription(str, len=155) → pour meta descriptions SEO
  - generateProductTitle(product) → format SEO optimisé
  - generateCanonicalUrl(path) → APP_URL + path normalisé

── src/components/ ─────────────────────────────────────────────────

📄 src/components/ui/index.jsx
  → Identique à v1 (Button, Badge, Skeleton, ProductCardSkeleton,
    StatChip, Modal, OdooStatus, Input, PriceDisplay)

📄 src/components/hero/HeroCarousel.jsx
  → Identique à v1 + ajout :
    SeoHead sur le slide actif (title + description de la promo)
    OrganizationSchema dans la homepage

📄 src/components/product/ProductCard.jsx
  → Identique à v1 + ajout :
    <a href="/produits/${product.id}"> sur le nom du produit
    (lien crawlable par Google, pas seulement onClick)
    data-testid="product-card" pour les tests
    loading="lazy" sur les images Odoo

📄 src/components/product/ProductQuickView.jsx
  → Identique à v1 + ajout :
    ProductSchema pour le produit affiché
    BreadcrumbSchema : Accueil > Catégorie > Produit

📄 src/components/product/ProductGrid.jsx
  → Identique à v1 + ajout :
    aria-label="Liste de produits" sur la grille
    role="list" + role="listitem" sur les cards
    data-testid="product-grid"

📄 src/components/filters/index.jsx
  → Identique à v1 (FilterSidebar + CatalogToolbar)
  → Ajout : mise à jour URL params au changement de filtre
    (URLSearchParams pour que les filtres soient indexables)

📄 src/components/cart/CartDrawer.jsx
  → Identique à v1

📄 src/components/layout/Navbar.jsx
  → Identique à v1 + ajout :
    <nav aria-label="Navigation principale">
    Lien "Accueil" crawlable, liens catégories principales

📄 src/components/layout/Footer.jsx
  → Footer SEO complet :
    Logo + tagline
    Navigation interne : Accueil, Catalogue, À propos, Contact, CGV, Mentions légales
    Catégories (liens crawlables vers /?category=ID)
    Contact : adresse physique (si disponible), email, téléphone
    Réseaux sociaux
    © 2025 NEXUS Electronics — Tous droits réservés
    Schema.org LocalBusiness ou Organization (via OrganizationSchema)
    Liens : plan du site, politique confidentialité, cookies

📄 src/components/seo/ImageWithFallback.jsx
  → Composant image SEO-friendly :
    <img> avec src (URL Odoo), alt optimisé SEO (product.name + catégorie),
    loading="lazy", decoding="async", width/height pour éviter CLS,
    onError → fallback emoji (pas d'image cassée)
    Génère alt automatique : "${product.name} — ${catégorie} | NEXUS"

── src/pages/ ──────────────────────────────────────────────────────

📄 src/pages/CatalogPage.jsx
  → Identique à v1 + ajout :
    SeoHead dynamique selon catégorie/recherche active :
      title: "Laptops & PC — NEXUS Electronics" (si catégorie)
      title: "Résultats pour 'iPhone' — NEXUS Electronics" (si search)
      description générée selon contexte
      canonical: APP_URL + '/' + (category slug ou '')
    BreadcrumbSchema : Accueil > (Catégorie si sélectionnée)

📄 src/pages/NotFoundPage.jsx
  → Page 404 stylée dark theme
  → SeoHead noIndex=true, title="Page introuvable — NEXUS"
  → Suggestions de catégories + lien retour accueil

── Tests ───────────────────────────────────────────────────────────

📄 src/__tests__/utils.test.js
  → Tests Vitest pour lib/utils.js :
    formatPrice, slugify, truncateDescription,
    stockStatus, generateProductTitle

📄 src/__tests__/ProductCard.test.jsx
  → Tests @testing-library/react :
    Render ProductCard avec mock product
    Vérifie : nom, prix, badge, bouton Ajouter
    Vérifie : bouton désactivé si qty_available = 0
    Vérifie : attribut alt de l'image contient le nom du produit

📄 src/__tests__/SeoHead.test.jsx
  → Tests : meta title, description, canonical générés correctement
    Pour page home, catalog, product (avec mock Odoo product)

📄 vitest.config.js
  → environment: 'jsdom'
  → setupFiles: ['@testing-library/jest-dom']
  → coverage: { provider: 'v8', reporter: ['text','html'] }

📄 eslint.config.js
  → @eslint/js recommended
  → react-hooks plugin
  → règles : no-unused-vars warn, no-console warn


═══════════════════════════════════════════════════════════════════════
SECTION 4 — SEO TECHNIQUE OBLIGATOIRE
═══════════════════════════════════════════════════════════════════════

OBJECTIFS SEO :
  Lighthouse SEO score ≥ 95
  Google PageSpeed Insights Performance ≥ 90 mobile
  Core Web Vitals : LCP < 2.5s, INP < 200ms, CLS < 0.1

META TAGS OBLIGATOIRES :
✅ <title> unique par page (60 car max), format : "Produit — Catégorie | NEXUS"
✅ <meta name="description"> unique 120-155 caractères, inclut mot-clé + CTA
✅ <link rel="canonical"> sur toutes les pages (évite contenu dupliqué)
✅ Open Graph : og:title, og:description, og:image (1200x630px), og:type, og:url
✅ Twitter Card : twitter:card summary_large_image
✅ <meta name="robots" content="index,follow"> (sauf panier et checkout)
✅ <html lang="fr"> sur toutes les pages
✅ <meta name="viewport" content="width=device-width,initial-scale=1">
✅ <meta name="theme-color" content="#030308">

STRUCTURED DATA (Schema.org JSON-LD) :
✅ Organization sur la homepage (nom, logo, contact, réseaux)
✅ Product sur chaque fiche produit (nom, prix, dispo, image, rating)
✅ BreadcrumbList sur catalog et fiche produit
✅ WebSite avec SearchAction (indique le moteur de recherche interne)
✅ Offre AggregateOffer sur la page catalogue

SITEMAP :
✅ /sitemap.xml auto-généré par vite-plugin-sitemap au build
✅ Inclut : /, /produits, /produits/{id} pour chaque produit Odoo
✅ lastmod depuis write_date Odoo
✅ changefreq : weekly pour produits, daily pour homepage
✅ priority : 1.0 homepage, 0.8 catalogue, 0.6 fiches produit

ROBOTS.TXT :
✅ Fichier public/robots.txt :
    User-agent: *
    Allow: /
    Disallow: /panier
    Disallow: /checkout
    Disallow: /api/
    Sitemap: https://shop.votre-domaine.com/sitemap.xml

PERFORMANCE SEO (Core Web Vitals) :
✅ Preload des fonts critiques (Clash Display) dans <head>
✅ font-display: swap sur toutes les fonts
✅ Images Odoo : loading="lazy" + width/height explicites (évite CLS)
✅ Images hero : loading="eager" fetchpriority="high" (LCP critique)
✅ Code splitting Vite : vendor / query / motion / ui (chunks séparés)
✅ Compression gzip + brotli via vite-plugin-compression
✅ Cache Nginx 1 an sur assets hashés Vite
✅ Preconnect vers fontshare.com et fonts.googleapis.com

ACCESSIBILITÉ (impact SEO) :
✅ Tous les <img> ont un alt descriptif (jamais vide sauf décoratif)
✅ Structure heading cohérente : h1 unique par page, h2/h3 hiérarchisés
✅ Labels ARIA sur les formulaires et contrôles interactifs
✅ Focus visible sur tous les éléments interactifs
✅ Ratio de contraste WCAG AA minimum

URLs SEO-FRIENDLY :
✅ Paramètres de filtres dans l'URL (?category=laptops&sort=price)
✅ URLs produits lisibles : /produits/macbook-pro-m3-max-16
  (slugify du nom produit)
✅ Pas de paramètres session ou tracking dans les URLs canoniques

INTERNATIONALISATION (base) :
✅ <html lang="fr">
✅ hreflang="fr" si une seule langue (self-reference)
✅ Prices en format fr-FR (1 499 €, pas $1499)
✅ Dates en format français


═══════════════════════════════════════════════════════════════════════
SECTION 5 — DÉPLOIEMENT CONTABO + ODOO
═══════════════════════════════════════════════════════════════════════

ARCHITECTURE VPS CONTABO :

  Internet
      │
  [IP Contabo : 185.xxx.xxx.xxx]
      │
  Nginx (ports 80/443)
      ├── shop.mondomaine.com  → /var/www/nexus/current/dist/ (React SPA)
      └── erp.mondomaine.com   → 127.0.0.1:8069               (Odoo 17)

DOMAINES À CONFIGURER :
  shop.mondomaine.com → A → IP_CONTABO
  erp.mondomaine.com  → A → IP_CONTABO
  (les deux pointent vers le même VPS, Nginx distingue par Server Name)

STRUCTURE DE DÉPLOIEMENT (blue-green simplifié) :
  /var/www/nexus/
  ├── current/      → symlink vers la release active
  ├── releases/
  │   ├── 20250510_143022/   (release active)
  │   ├── 20250509_091500/   (avant-dernière)
  │   └── 20250508_...       (5 releases conservées max)
  └── shared/       (fichiers partagés : logs, uploads)

UTILISATEUR DÉPLOIEMENT :
  Nom          : nexus-deploy
  Accès SSH    : clé ed25519 uniquement (pas de mot de passe)
  Sudo limité  : NOPASSWD pour rsync /var/www/nexus et nginx reload

VARIABLES D'ENVIRONNEMENT :
  Injectées au build par GitHub Actions depuis les secrets :
  VITE_ODOO_URL    → https://erp.mondomaine.com
  VITE_ODOO_DB     → nexus_production
  VITE_ODOO_USER   → api_ecommerce  (utilisateur Odoo dédié, droits limités)
  VITE_ODOO_PASS   → mot de passe fort (32 caractères minimum)
  VITE_APP_URL     → https://shop.mondomaine.com

ODOO API — UTILISATEUR DÉDIÉ (sécurité) :
  Créer dans Odoo un utilisateur "API E-Commerce" avec :
  - Accès : Sales (lecture produits, création commandes)
  - Pas d'accès : Comptabilité, RH, Configuration
  - Désactiver l'accès interface web (Portal ou Internal minimal)
  - Activer 2FA si Odoo le permet pour l'API

CONNEXION REACT → ODOO :
  En développement :
    Proxy Vite /api/odoo/* → VITE_ODOO_URL/*
    Le navigateur ne voit que localhost:5173 → zéro CORS

  En production sur Contabo :
    React appelle /api/odoo/* (chemin relatif)
    Nginx reçoit /api/odoo/* et proxifie vers https://erp.mondomaine.com/*
    Le navigateur ne voit que shop.mondomaine.com → zéro CORS
    Les credentials Odoo ne sont JAMAIS dans le JS livré au client
    (injectés au build comme variables d'env Vite)

COMMANDES DE MISE EN PLACE (résumé pour le README) :
  Sur le VPS en root :
    bash scripts/setup-contabo.sh
    certbot --nginx -d shop.mondomaine.com -d erp.mondomaine.com
    cp nginx/nexus-shop.conf /etc/nginx/sites-available/nexus-shop
    cp nginx/odoo-erp.conf   /etc/nginx/sites-available/odoo-erp
    ln -s /etc/nginx/sites-available/nexus-shop /etc/nginx/sites-enabled/
    ln -s /etc/nginx/sites-available/odoo-erp   /etc/nginx/sites-enabled/
    nginx -t && systemctl reload nginx

  Sur GitHub :
    Configurer tous les secrets dans Settings > Secrets > Actions
    Ajouter la clé publique SSH de nexus-deploy dans ~/.ssh/authorized_keys
    Push sur develop → deploy staging automatique
    Push sur main (ou merge PR) → deploy production automatique


═══════════════════════════════════════════════════════════════════════
SECTION 6 — CI/CD GITHUB ACTIONS DÉTAILLÉ
═══════════════════════════════════════════════════════════════════════

FLUX DE TRAVAIL GIT :

  feature/xxx ──┐
                ├──→ develop ──→ [CI/CD → staging] ──→ main ──→ [CI/CD → prod]
  fix/xxx ──────┘

  Branches :
    main      → production (shop.mondomaine.com)
    develop   → staging    (staging.mondomaine.com)
    feature/* → développement local, PR vers develop
    hotfix/*  → correction urgente, PR vers main directement

PIPELINE COMPLET (5 étapes) :

  1. LINT (2 min)
     → ESLint sur tout src/
     → Bloque si erreurs (warnings autorisés)

  2. TEST (3 min)
     → Vitest sur src/__tests__/
     → Coverage minimum 60% (configurable)
     → Upload rapport de coverage

  3. BUILD (4 min)
     → npm ci (installation propre depuis package-lock.json)
     → Injection secrets → .env.production
     → npm run build (Vite → dist/)
     → Vérification taille bundle (warn si > 500Ko gzippé)
     → Upload artifact dist/

  4. DEPLOY (2 min)
     → Download artifact dist/
     → SSH avec clé privée (secret CONTABO_SSH_KEY)
     → rsync vers /var/www/nexus/releases/TIMESTAMP/
     → SSH remote : symlink current → nouveau release
     → SSH remote : nginx -t && systemctl reload nginx
     → SSH remote : nettoyage releases > 5

  5. NOTIFY (30s)
     → Webhook Slack/Discord avec statut (✅ succès / ❌ échec)
     → Inclut : branche, commit, auteur, lien vers le run

SECRETS GITHUB À CONFIGURER :
  Repository → Settings → Secrets and variables → Actions → New repository secret

  Secret Name         Exemple de valeur
  ─────────────────── ──────────────────────────────────────
  CONTABO_HOST        185.xxx.xxx.xxx
  CONTABO_USER        nexus-deploy
  CONTABO_SSH_KEY     -----BEGIN OPENSSH PRIVATE KEY-----...
  VITE_ODOO_URL       https://erp.mondomaine.com
  VITE_ODOO_DB        nexus_production
  VITE_ODOO_USER      api_ecommerce
  VITE_ODOO_PASS      Str0ng_P@ssw0rd_32chars
  VITE_APP_URL        https://shop.mondomaine.com
  VITE_GTM_ID         GTM-XXXXXXX
  NOTIFY_WEBHOOK      https://hooks.slack.com/services/...

GÉNÉRATION CLÉ SSH POUR CI/CD :
  # Sur ta machine locale (ou le VPS)
  ssh-keygen -t ed25519 -C "github-actions-nexus-deploy" -f ~/.ssh/nexus_deploy
  # Copier la clé publique sur le VPS :
  ssh-copy-id -i ~/.ssh/nexus_deploy.pub nexus-deploy@IP_CONTABO
  # Mettre la clé PRIVÉE (~/.ssh/nexus_deploy) dans le secret CONTABO_SSH_KEY

ROLLBACK RAPIDE :
  Sur le VPS si un déploiement est cassé :
  ssh nexus-deploy@IP_CONTABO
  ls /var/www/nexus/releases/               # voir les releases disponibles
  ln -sfn /var/www/nexus/releases/ANCIEN_TIMESTAMP /var/www/nexus/current
  sudo systemctl reload nginx
  # ← en moins de 30 secondes


═══════════════════════════════════════════════════════════════════════
SECTION 6.5 — UI/UX EXPERT & ANIMATIONS PROFESSIONNELLES
═══════════════════════════════════════════════════════════════════════

PHILOSOPHIE UI/UX :
- Design épuré, minimaliste et premium
- Hiérarchie visuelle claire (typographie, espacement, contraste)
- Expérience utilisateur fluide et intuitive
- Mobile-first avec adaptation desktop soignée

ANIMATIONS — SIMPLES & PROFESSIONNELLES :
✅ Transitions subtiles et rapides (200-300ms max)
✅ Easing naturel : ease-out pour entrées, ease-in pour sorties
✅ Pas de bounce ou effets exagérés — rester sobre
✅ Animations au scroll : fade-in discret (opacity + léger translateY)
✅ Hover cards : scale(1.02) + légère élévation shadow — pas plus
✅ Boutons : transition color/background 150ms ease
✅ Modals : fade + scale(0.95 → 1) rapide
✅ Drawer panier : slide-in depuis la droite (300ms)
✅ Skeleton loaders : shimmer subtil (pas de clignotement agressif)
✅ Toast notifications : slide-in + fade discret

MICRO-INTERACTIONS :
- Focus states visibles mais élégants (ring volt subtle)
- États hover cohérents sur toute l'app
- Feedback immédiat sur les actions (ajout panier, wishlist)
- Icônes avec transitions douces (rotation, scale)
- Curseur pointer sur tous les éléments cliquables

PRINCIPES FRAMER MOTION :
- Utiliser des spring légers : { stiffness: 300, damping: 30 }
- Éviter les animations longues qui ralentissent l'UX
- AnimatePresence pour les transitions de pages/modals
- Variants réutilisables pour cohérence
- Respecter prefers-reduced-motion pour l'accessibilité

DESIGN TOKENS :
- Spacing : 4px base (4, 8, 12, 16, 24, 32, 48, 64)
- Border-radius : 8px cards, 12px modals, 9999px pills
- Shadows : subtiles, pas de drop-shadow lourdes
- Typography scale cohérente (12, 14, 16, 18, 24, 32, 48px)


═══════════════════════════════════════════════════════════════════════
SECTION 7 — RÈGLES DE GÉNÉRATION OBLIGATOIRES
═══════════════════════════════════════════════════════════════════════

ARCHITECTURE :
✅ Imports avec alias @ (ex: import { cn } from '@/lib/utils')
✅ Séparation stricte API / Store / Hooks / SEO / Components / Pages
✅ Aucun appel Odoo direct dans les composants (passe par hooks)
✅ Aucune credential dans le code source (uniquement import.meta.env)
✅ Tous les composants export default function NomComposant()

ODOO JSON-RPC :
✅ Une seule authenticate() via singleton promise
✅ Session cookie via axios withCredentials:true
✅ Fallback automatique mockData si Odoo inaccessible
✅ En prod : baseURL = '/api/odoo' (proxy Nginx) — pas l'URL Odoo directe
✅ En dev  : baseURL = VITE_ODOO_URL (proxy Vite)
✅ Détection via import.meta.env.PROD

SEO :
✅ SeoHead sur chaque page avec title + description + canonical uniques
✅ Jamais deux <h1> sur la même page
✅ Tous les <img> ont un alt descriptif non vide
✅ Les liens de navigation sont de vrais <a href> (crawlables Google)
✅ Schema.org JSON-LD sur homepage (Organization) et fiches produit (Product)
✅ robots.txt dans public/ avec Disallow sur /panier et /api/
✅ sitemap.xml généré au build

CI/CD :
✅ Aucun secret dans le code source ou dans le yml (toujours ${{ secrets.NOM }})
✅ npm ci (jamais npm install) dans le pipeline (installation reproductible)
✅ Artifact dist/ uploadé entre jobs (pas rebuild à chaque étape)
✅ SSH via clé ed25519 (jamais mot de passe)
✅ Déploiement par symlink (rollback instantané possible)
✅ nginx -t avant reload (vérifie la config avant d'appliquer)

TAILWIND :
✅ Classes utilitaires uniquement
✅ cn() pour classes conditionnelles
✅ Dark theme uniquement
✅ Mobile first, breakpoints lg: pour sidebar

PERFORMANCE :
✅ Code splitting Vite : vendor / query / motion / ui
✅ Compression gzip + brotli
✅ Lazy loading images (sauf hero LCP)
✅ Skeleton loaders (pas de spinner plein écran)
✅ useCallback sur handlers fréquents


═══════════════════════════════════════════════════════════════════════
SECTION 8 — COMPORTEMENTS MÉTIER PRÉCIS
═══════════════════════════════════════════════════════════════════════

PANIER :
- Ajout → incrémente si produit existant
- Persisté localStorage (Zustand persist)
- Sync Odoo en arrière-plan (createSaleOrder + addOrderLine)
- Calcul : subtotal HT + TVA 20% = total TTC
- Livraison gratuite (afficher "Offerte")
- Confirmation → action_confirm Odoo → clear cart local
- Page panier exclue du SEO (noindex)

AUTHENTIFICATION ODOO :
- Tentative au démarrage (useOdooConnection)
- Réussite → odooConnected = true → queries Odoo réelles
- Échec → odooConnected = false → mockData
- Statut visible Navbar (dot LIVE / Demo)

STOCK :
- qty = 0     → "Rupture" (rouge), Ajouter désactivé
- qty 1–5     → "Plus que N" (amber)
- qty > 5     → "En stock" (volt)
- Vérification stock Odoo en temps réel avant validation commande
- Commande autorisée uniquement si stock disponible dans Odoo
- Réservation stock Odoo à la confirmation de commande

PRIX :
- Intl.NumberFormat fr-FR EUR 0 décimales
- Panier : HT + TVA 20% + Total TTC
- Schema.org Product : price sans TVA (HT)

PAIEMENT :
- Intégration Stripe liée à Odoo (module payment_stripe)
  → Paiement CB sécurisé (Visa, Mastercard, AMEX)
  → Webhook Stripe → Odoo pour confirmer le paiement
  → 3D Secure supporté
- Intégration PayPal liée à Odoo (module payment_paypal)
  → Paiement via compte PayPal ou CB
  → Webhook PayPal → Odoo pour synchronisation statut
  → Retour automatique après paiement
- Checkout sécurisé redirigeant vers Stripe/PayPal
- Confirmation commande Odoo déclenchée après paiement validé
- Page checkout exclue du SEO (noindex)


═══════════════════════════════════════════════════════════════════════
SECTION 9 — DONNÉES MOCK (mode démo sans Odoo)
═══════════════════════════════════════════════════════════════════════

16 produits mock réalistes 2025 :
  MacBook Pro M3 Max 16"       3999€  Laptops       NEW   stock:14
  iPhone 16 Pro Max 512GB      1499€  Smartphones   HOT   stock:28
  Sony WH-1000XM5               349€  Audio         BEST  stock:55
  ASUS ROG Zephyrus G16        2299€  Gaming              stock:9
  Sony A7R V                   3799€  Photo               stock:7
  Samsung Galaxy S24 Ultra     1299€  Smartphones   HOT   stock:32
  AirPods Pro 3                 299€  Audio         NEW   stock:70
  RTX 4090 Founders Edition    1799€  Composants    RARE  stock:5
  iPad Pro M4 13"              1399€  Laptops       NEW   stock:19
  DJI Osmo Action 5 Pro         399€  Photo               stock:22
  Philips Hue Starter Kit       229€  Maison              stock:40
  Dell XPS 15 OLED             1999€  Laptops             stock:11
  Samsung 65" OLED S95D        2499€  Maison        BEST  stock:8
  Bose QuietComfort Ultra       449€  Audio               stock:30
  Steam Deck OLED               649€  Gaming        HOT   stock:25
  Canon EOS R5 Mark II         4299€  Photo         NEW   stock:6

3 slides hero :
  Slide 1 : MacBook Pro M3 Max | accent #c8ff00 | productId:1
  Slide 2 : iPhone 16 Pro Max  | accent #00d4ff | productId:2
  Slide 3 : RTX 4090           | accent #ff4dff | productId:8


═══════════════════════════════════════════════════════════════════════
SECTION 10 — FORMAT DE SORTIE ET ORDRE DE GÉNÉRATION
═══════════════════════════════════════════════════════════════════════

RÈGLES ABSOLUES :
1. Génère TOUS les fichiers listés en Section 3, dans l'ordre exact
2. Chaque fichier commence par // === CHEMIN/FICHIER.EXT ===
3. Code 100% complet et fonctionnel (zéro "// TODO" ou "// ...")
4. Aucune dépendance hors Section 2
5. Aucun secret/credential hardcodé (toujours import.meta.env ou ${{ secrets }})
6. Imports avec alias @ dans le code React
7. Tailwind uniquement pour les styles
8. YAML strict dans les GitHub Actions (indentation 2 espaces)

FORMAT :
- Un bloc de code markdown par fichier (```js, ```yaml, ```bash, ```nginx)
- Commentaire === NOM === en tête de chaque bloc
- Aucun texte entre les blocs (code only)

ORDRE DE GÉNÉRATION :
package.json
tailwind.config.js
vite.config.js
postcss.config.js
vitest.config.js
eslint.config.js
index.html
.env.example
.gitignore
public/robots.txt
nginx/nexus-shop.conf
nginx/odoo-erp.conf
scripts/setup-contabo.sh
scripts/deploy.sh
.github/workflows/ci-cd.yml
.github/workflows/lighthouse.yml
src/main.jsx
src/App.jsx
src/index.css
src/seo/SeoHead.jsx
src/seo/ProductSchema.jsx
src/seo/BreadcrumbSchema.jsx
src/seo/OrganizationSchema.jsx
src/seo/useSeoMeta.js
src/api/odooClient.js
src/api/odooApi.js
src/api/mockData.js
src/store/index.js
src/hooks/useOdoo.js
src/hooks/useSeo.js
src/hooks/usePerformance.js
src/lib/utils.js
src/components/ui/index.jsx
src/components/seo/ImageWithFallback.jsx
src/components/hero/HeroCarousel.jsx
src/components/product/ProductCard.jsx
src/components/product/ProductQuickView.jsx
src/components/product/ProductGrid.jsx
src/components/filters/index.jsx
src/components/cart/CartDrawer.jsx
src/components/layout/Navbar.jsx
src/components/layout/Footer.jsx
src/pages/CatalogPage.jsx
src/pages/NotFoundPage.jsx
src/__tests__/utils.test.js
src/__tests__/ProductCard.test.jsx
src/__tests__/SeoHead.test.jsx
README.md

═══════════════════════════════════════════════════════════════════════
FIN DU PROMPT v2 — COMMENCER LA GÉNÉRATION MAINTENANT
═══════════════════════════════════════════════════════════════════════
