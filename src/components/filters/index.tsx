import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, X, ChevronDown, Grid3X3, LayoutList } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { useCategories } from '@/hooks/useOdoo'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'

// ═══════════════════════════════════════════════════════════════
// FilterSidebar
// ═══════════════════════════════════════════════════════════════

interface FilterSidebarProps {
  isOpen: boolean
  onClose: () => void
  selectedCategory: number | null
  onCategoryChange: (categoryId: number | null) => void
  priceRange: [number, number]
  onPriceRangeChange: (range: [number, number]) => void
}

export function FilterSidebar({
  isOpen,
  onClose,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
}: FilterSidebarProps) {
  const { data: categories } = useCategories()
  const [searchParams, setSearchParams] = useSearchParams()

  const handleCategoryClick = (categoryId: number | null) => {
    onCategoryChange(categoryId)
    if (categoryId) {
      searchParams.set('category', categoryId.toString())
    } else {
      searchParams.delete('category')
    }
    setSearchParams(searchParams)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop (mobile) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink-950/80 z-40 lg:hidden"
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={cn(
              'fixed lg:static inset-y-0 left-0 z-50 lg:z-auto',
              'w-72 bg-ink-900 border-r border-ink-700',
              'p-6 overflow-y-auto'
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-lg font-medium text-ink-50">
                Filtres
              </h2>
              <button
                onClick={onClose}
                className="lg:hidden p-2 rounded-lg hover:bg-ink-800 transition-colors"
              >
                <X className="h-5 w-5 text-ink-400" />
              </button>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-ink-300 mb-3">
                Catégories
              </h3>
              <div className="space-y-1">
                <button
                  onClick={() => handleCategoryClick(null)}
                  className={cn(
                    'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                    selectedCategory === null
                      ? 'bg-volt-400 text-ink-950 font-medium'
                      : 'text-ink-100 hover:bg-ink-800'
                  )}
                >
                  Tous les produits
                </button>
                {categories?.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    className={cn(
                      'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2',
                      selectedCategory === category.id
                        ? 'bg-volt-400 text-ink-950 font-medium'
                        : 'text-ink-100 hover:bg-ink-800'
                    )}
                  >
                    <span>{category.emoji}</span>
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-ink-300 mb-3">
                Prix
              </h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange[0] || ''}
                    onChange={(e) => onPriceRangeChange([Number(e.target.value), priceRange[1]])}
                    className="w-full px-3 py-2 bg-ink-800 border border-ink-700 rounded-lg text-sm text-ink-50 placeholder:text-ink-400"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange[1] || ''}
                    onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value)])}
                    className="w-full px-3 py-2 bg-ink-800 border border-ink-700 rounded-lg text-sm text-ink-50 placeholder:text-ink-400"
                  />
                </div>
              </div>
            </div>

            {/* Clear filters */}
            <Button
              variant="secondary"
              onClick={() => {
                onCategoryChange(null)
                onPriceRangeChange([0, 0])
                setSearchParams({})
              }}
              className="w-full"
            >
              Réinitialiser les filtres
            </Button>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

// ═══════════════════════════════════════════════════════════════
// CatalogToolbar
// ═══════════════════════════════════════════════════════════════

interface CatalogToolbarProps {
  totalProducts: number
  sortBy: string
  onSortChange: (sort: string) => void
  viewMode: 'grid' | 'list'
  onViewModeChange: (mode: 'grid' | 'list') => void
  onOpenFilters: () => void
}

export function CatalogToolbar({
  totalProducts,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  onOpenFilters,
}: CatalogToolbarProps) {
  const [isSortOpen, setIsSortOpen] = useState(false)

  const sortOptions = [
    { value: 'name-asc', label: 'Nom (A-Z)' },
    { value: 'name-desc', label: 'Nom (Z-A)' },
    { value: 'price-asc', label: 'Prix croissant' },
    { value: 'price-desc', label: 'Prix décroissant' },
    { value: 'date-desc', label: 'Nouveautés' },
  ]

  const currentSort = sortOptions.find((o) => o.value === sortBy) || sortOptions[0]

  return (
    <div className="flex items-center justify-between gap-4 mb-6 pb-6 border-b border-ink-700">
      {/* Results count */}
      <p className="text-sm text-ink-400">
        <span className="text-ink-100 font-medium">{totalProducts}</span> produits
      </p>

      <div className="flex items-center gap-3">
        {/* Filter button (mobile) */}
        <button
          onClick={onOpenFilters}
          className="lg:hidden flex items-center gap-2 px-3 py-2 bg-ink-800 rounded-lg text-sm text-ink-100 hover:bg-ink-700 transition-colors"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filtres
        </button>

        {/* Sort dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center gap-2 px-3 py-2 bg-ink-800 rounded-lg text-sm text-ink-100 hover:bg-ink-700 transition-colors"
          >
            <span>{currentSort.label}</span>
            <ChevronDown className={cn('h-4 w-4 transition-transform', isSortOpen && 'rotate-180')} />
          </button>

          <AnimatePresence>
            {isSortOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-ink-800 border border-ink-700 rounded-lg shadow-deep overflow-hidden z-20"
              >
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      onSortChange(option.value)
                      setIsSortOpen(false)
                    }}
                    className={cn(
                      'w-full text-left px-4 py-2 text-sm transition-colors',
                      sortBy === option.value
                        ? 'bg-volt-400 text-ink-950'
                        : 'text-ink-100 hover:bg-ink-700'
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* View mode */}
        <div className="hidden sm:flex items-center bg-ink-800 rounded-lg p-1">
          <button
            onClick={() => onViewModeChange('grid')}
            className={cn(
              'p-2 rounded transition-colors',
              viewMode === 'grid' ? 'bg-ink-700 text-volt-400' : 'text-ink-400 hover:text-ink-100'
            )}
          >
            <Grid3X3 className="h-4 w-4" />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={cn(
              'p-2 rounded transition-colors',
              viewMode === 'list' ? 'bg-ink-700 text-volt-400' : 'text-ink-400 hover:text-ink-100'
            )}
          >
            <LayoutList className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
