import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useProducts, useCategories } from '@/hooks/useOdoo'
import { usePageSeo } from '@/hooks/useSeo'
import SeoHead from '@/seo/SeoHead'
import OrganizationSchema from '@/seo/OrganizationSchema'
import BreadcrumbSchema from '@/seo/BreadcrumbSchema'
import HeroCarousel from '@/components/hero/HeroCarousel'
import ProductGrid from '@/components/product/ProductGrid'
import { FilterSidebar, CatalogToolbar } from '@/components/filters'

export default function CatalogPage() {
  const [searchParams] = useSearchParams()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0])
  const [sortBy, setSortBy] = useState('name-asc')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const search = searchParams.get('search') || ''
  const categoryParam = searchParams.get('category')

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(parseInt(categoryParam))
    }
  }, [categoryParam])

  const [sortField, sortOrder] = sortBy.split('-') as [string, 'asc' | 'desc']

  const { data, isLoading } = useProducts({
    categoryId: selectedCategory,
    search,
    sortBy: sortField === 'date' ? 'write_date' : sortField === 'price' ? 'list_price' : 'name',
    sortOrder: sortOrder as 'asc' | 'desc',
    limit: 20,
  })

  const { data: categories } = useCategories()
  const currentCategory = categories?.find((c) => c.id === selectedCategory)

  const isHomePage = !search && !selectedCategory

  const seo = usePageSeo('catalog', {
    category: currentCategory,
    search,
    count: data?.total || 0,
  })

  const breadcrumbs = [
    { name: 'Accueil', url: '/' },
    ...(currentCategory
      ? [{ name: currentCategory.name, url: `/produits?category=${currentCategory.id}` }]
      : search
      ? [{ name: `Recherche: ${search}`, url: `/produits?search=${search}` }]
      : [{ name: 'Tous les produits', url: '/produits' }]),
  ]

  return (
    <>
      <SeoHead
        title={seo.title}
        description={seo.description}
        canonical={seo.canonical}
      />
      {isHomePage && <OrganizationSchema />}
      <BreadcrumbSchema items={breadcrumbs} />

      <div className="min-h-screen">
        {/* Hero (only on homepage) */}
        {isHomePage && (
          <section className="container mx-auto px-4 lg:px-6 py-8">
            <HeroCarousel />
          </section>
        )}

        {/* Catalog Section */}
        <section className="container mx-auto px-4 lg:px-6 py-8">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-ink-50 mb-2">
              {currentCategory
                ? currentCategory.name
                : search
                ? `Résultats pour "${search}"`
                : 'Tous nos produits'}
            </h1>
            {!isHomePage && (
              <p className="text-ink-400">
                {data?.total || 0} produit{(data?.total || 0) > 1 ? 's' : ''} trouvé{(data?.total || 0) > 1 ? 's' : ''}
              </p>
            )}
          </div>

          <div className="flex gap-8">
            {/* Sidebar (desktop) */}
            <div className="hidden lg:block w-72 flex-shrink-0">
              <FilterSidebar
                isOpen={true}
                onClose={() => {}}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
              />
            </div>

            {/* Mobile Filter Sidebar */}
            <FilterSidebar
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
            />

            {/* Main Content */}
            <div className="flex-1">
              <CatalogToolbar
                totalProducts={data?.total || 0}
                sortBy={sortBy}
                onSortChange={setSortBy}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                onOpenFilters={() => setIsFilterOpen(true)}
              />

              <ProductGrid
                products={data?.products || []}
                isLoading={isLoading}
              />

              {/* TODO: Pagination */}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
