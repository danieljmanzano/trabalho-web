import { ReactNode } from "react"

interface InputProps {
  label: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  error?: string
  icon?: ReactNode
  className?: string
}

export function TextInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  icon,
  className = "",
}: InputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-3 text-primary">
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full ${icon ? "pl-10" : "pl-4"} pr-4 py-3 bg-card border rounded text-foreground ${className}`}
        />
      </div>
      {error && (
        <span className="text-sm text-destructive">{error}</span>
      )}
    </div>
  )
}