import { describe, it, expect } from 'vitest'
import { render, waitFor } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import SeoHead from '@/seo/SeoHead'

const renderWithHelmet = (ui: React.ReactElement) => {
  return render(<HelmetProvider>{ui}</HelmetProvider>)
}

describe('SeoHead', () => {
  it('renders default title', async () => {
    renderWithHelmet(<SeoHead />)

    await waitFor(() => {
      expect(document.title).toContain('NEXUS Electronics')
    })
  })

  it('renders custom title', async () => {
    renderWithHelmet(<SeoHead title="MacBook Pro" />)

    await waitFor(() => {
      expect(document.title).toContain('MacBook Pro')
      expect(document.title).toContain('NEXUS Electronics')
    })
  })

  it('renders meta description', async () => {
    const description = 'Test description for SEO'
    renderWithHelmet(<SeoHead description={description} />)

    await waitFor(() => {
      const meta = document.querySelector('meta[name="description"]')
      expect(meta?.getAttribute('content')).toBe(description)
    })
  })

  it('renders canonical link', async () => {
    const canonical = 'https://example.com/page'
    renderWithHelmet(<SeoHead canonical={canonical} />)

    await waitFor(() => {
      const link = document.querySelector('link[rel="canonical"]')
      expect(link?.getAttribute('href')).toBe(canonical)
    })
  })

  it('renders noindex when specified', async () => {
    renderWithHelmet(<SeoHead noIndex />)

    await waitFor(() => {
      const meta = document.querySelector('meta[name="robots"]')
      expect(meta?.getAttribute('content')).toBe('noindex,nofollow')
    })
  })

  it('renders index,follow by default', async () => {
    renderWithHelmet(<SeoHead />)

    await waitFor(() => {
      const meta = document.querySelector('meta[name="robots"]')
      expect(meta?.getAttribute('content')).toBe('index,follow')
    })
  })

  it('renders Open Graph tags', async () => {
    renderWithHelmet(
      <SeoHead
        title="Test Product"
        description="Test description"
        ogType="product"
      />
    )

    await waitFor(() => {
      const ogTitle = document.querySelector('meta[property="og:title"]')
      const ogType = document.querySelector('meta[property="og:type"]')

      expect(ogTitle?.getAttribute('content')).toContain('Test Product')
      expect(ogType?.getAttribute('content')).toBe('product')
    })
  })

  it('renders Twitter Card tags', async () => {
    renderWithHelmet(<SeoHead title="Test" />)

    await waitFor(() => {
      const twitterCard = document.querySelector('meta[name="twitter:card"]')
      expect(twitterCard?.getAttribute('content')).toBe('summary_large_image')
    })
  })
})
