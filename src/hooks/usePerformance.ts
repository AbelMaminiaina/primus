import { useEffect } from 'react'

interface WebVitalMetric {
  name: string
  value: number
  id: string
  rating: 'good' | 'needs-improvement' | 'poor'
}

export function usePerformance(): void {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const reportWebVitals = async () => {
      try {
        const { onCLS, onINP, onLCP, onFCP, onTTFB } = await import('web-vitals')

        const sendToAnalytics = (metric: WebVitalMetric) => {
          if (import.meta.env.DEV) {
            console.log(`[Web Vitals] ${metric.name}:`, metric.value.toFixed(2))
          }

          const gtmId = import.meta.env.VITE_GTM_ID
          if (gtmId && window.dataLayer) {
            window.dataLayer.push({
              event: 'web_vitals',
              metric_name: metric.name,
              metric_value: metric.value,
              metric_id: metric.id,
              metric_rating: metric.rating,
            })
          }
        }

        onCLS(sendToAnalytics)
        onINP(sendToAnalytics)
        onLCP(sendToAnalytics)
        onFCP(sendToAnalytics)
        onTTFB(sendToAnalytics)
      } catch {
        // web-vitals not available
      }
    }

    if (document.readyState === 'complete') {
      reportWebVitals()
    } else {
      window.addEventListener('load', reportWebVitals)
      return () => window.removeEventListener('load', reportWebVitals)
    }
  }, [])
}

declare global {
  interface Window {
    dataLayer?: unknown[]
  }
}
