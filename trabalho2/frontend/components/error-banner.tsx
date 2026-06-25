interface ErrorBannerProps {
  message: string
  className?: string
}

export function ErrorBanner({ message, className = "" }: ErrorBannerProps) {
  return (
    <div className={`flex items-center gap-3 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive ${className}`}>
      {message}
    </div>
  )
}
