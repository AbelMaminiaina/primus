import { forwardRef, ButtonHTMLAttributes, InputHTMLAttributes } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { BadgeType } from '@/types'

// ═══════════════════════════════════════════════════════════════
// Button
// ═══════════════════════════════════════════════════════════════

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const variants = {
      primary: 'bg-volt-400 text-ink-950 hover:bg-volt-500 disabled:bg-volt-400/50',
      secondary: 'bg-ink-800 text-ink-50 hover:bg-ink-700 border border-ink-700',
      ghost: 'bg-transparent text-ink-100 hover:bg-ink-800',
      danger: 'bg-red-500 text-white hover:bg-red-600',
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    }

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium rounded-lg',
          'transition-colors duration-150 ease-out',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-volt-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950',
          'disabled:cursor-not-allowed disabled:opacity-50',
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : null}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

// ═══════════════════════════════════════════════════════════════
// Badge
// ═══════════════════════════════════════════════════════════════

interface BadgeProps {
  type: BadgeType
  className?: string
}

export function Badge({ type, className }: BadgeProps) {
  const styles: Record<BadgeType, string> = {
    NEW: 'bg-volt-400 text-ink-950',
    HOT: 'bg-red-500 text-white',
    BEST: 'bg-ice-400 text-ink-950',
    RARE: 'bg-plasma-400 text-ink-950',
  }

  return (
    <span
      className={cn(
        'px-2 py-0.5 text-xs font-bold uppercase rounded-full',
        styles[type],
        className
      )}
    >
      {type}
    </span>
  )
}

// ═══════════════════════════════════════════════════════════════
// Skeleton
// ═══════════════════════════════════════════════════════════════

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'bg-ink-800 rounded-lg animate-pulse',
        className
      )}
    />
  )
}

// ═══════════════════════════════════════════════════════════════
// ProductCardSkeleton
// ═══════════════════════════════════════════════════════════════

export function ProductCardSkeleton() {
  return (
    <div className="bg-ink-900 rounded-xl p-4 border border-ink-700">
      <Skeleton className="aspect-square w-full rounded-lg mb-4" />
      <Skeleton className="h-4 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2 mb-4" />
      <Skeleton className="h-10 w-full rounded-lg" />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// Input
// ═══════════════════════════════════════════════════════════════

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-ink-100">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            'w-full px-4 py-2 bg-ink-800 border border-ink-700 rounded-lg',
            'text-ink-50 placeholder:text-ink-400',
            'focus:outline-none focus:ring-2 focus:ring-volt-400 focus:border-transparent',
            'transition-colors duration-150',
            error && 'border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

// ═══════════════════════════════════════════════════════════════
// PriceDisplay
// ═══════════════════════════════════════════════════════════════

interface PriceDisplayProps {
  price: number
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export function PriceDisplay({ price, size = 'md', className }: PriceDisplayProps) {
  const formatted = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
  }).format(price)

  const sizes = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl',
    xl: 'text-3xl',
  }

  return (
    <span className={cn('font-mono font-bold text-volt-400', sizes[size], className)}>
      {formatted}
    </span>
  )
}

// ═══════════════════════════════════════════════════════════════
// OdooStatus
// ═══════════════════════════════════════════════════════════════

interface OdooStatusProps {
  connected: boolean
}

export function OdooStatus({ connected }: OdooStatusProps) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <span
        className={cn(
          'w-2 h-2 rounded-full',
          connected ? 'bg-volt-400 animate-pulse' : 'bg-ink-400'
        )}
      />
      <span className={connected ? 'text-volt-400' : 'text-ink-400'}>
        {connected ? 'LIVE' : 'Demo'}
      </span>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// MotionDiv (for typed framer-motion animations)
// ═══════════════════════════════════════════════════════════════

export const MotionDiv = motion.div as React.FC<HTMLMotionProps<'div'>>

// ═══════════════════════════════════════════════════════════════
// StatChip
// ═══════════════════════════════════════════════════════════════

interface StatChipProps {
  icon: React.ReactNode
  label: string
  value: string | number
  className?: string
}

export function StatChip({ icon, label, value, className }: StatChipProps) {
  return (
    <div className={cn('flex items-center gap-2 px-3 py-1.5 bg-ink-800 rounded-full', className)}>
      {icon}
      <span className="text-ink-400 text-sm">{label}</span>
      <span className="font-medium text-ink-50">{value}</span>
    </div>
  )
}
