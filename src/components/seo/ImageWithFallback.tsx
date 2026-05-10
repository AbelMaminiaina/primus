import { useState, ImgHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  fallbackEmoji?: string
  aspectRatio?: 'square' | 'video' | 'auto'
}

export default function ImageWithFallback({
  src,
  alt,
  fallbackEmoji = '📦',
  aspectRatio = 'square',
  className,
  ...props
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    auto: '',
  }

  if (hasError) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-ink-800 rounded-lg',
          aspectClasses[aspectRatio],
          className
        )}
        role="img"
        aria-label={alt}
      >
        <span className="text-6xl">{fallbackEmoji}</span>
      </div>
    )
  }

  return (
    <div className={cn('relative overflow-hidden rounded-lg', aspectClasses[aspectRatio], className)}>
      {isLoading && (
        <div className="absolute inset-0 bg-ink-800 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onError={() => setHasError(true)}
        onLoad={() => setIsLoading(false)}
        className={cn(
          'w-full h-full object-cover transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
        {...props}
      />
    </div>
  )
}
