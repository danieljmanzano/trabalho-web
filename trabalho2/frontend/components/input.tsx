import { ReactNode } from "react"

// Shared input className
const inputCls = "w-full px-4 py-3 bg-secondary border border-border rounded text-foreground [color-scheme:dark] focus:border-primary focus:outline-none transition-colors"

// FieldError
export function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <span className="text-sm text-destructive">{message}</span>
}

// FormField — label wrapper
interface FormFieldProps {
  label: ReactNode
  error?: string
  children: ReactNode
  className?: string
}
export function FormField({ label, error, children, className = "" }: FormFieldProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-foreground">{label}</label>
      {children}
      <FieldError message={error} />
    </div>
  )
}

// TextInput
interface TextInputProps {
  label: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  error?: string
  icon?: ReactNode
  className?: string
}
export function TextInput({ label, type = "text", value, onChange, placeholder, error, icon, className = "" }: TextInputProps) {
  return (
    <FormField label={label} error={error}>
      <div className="relative">
        {icon && <div className="absolute left-3 top-3 text-primary">{icon}</div>}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${inputCls} ${icon ? "pl-10" : ""} ${className}`}
        />
      </div>
    </FormField>
  )
}

// DateInput
interface DateInputProps {
  label: ReactNode
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  min?: string
  max?: string
  disabled?: boolean
  error?: string
}
export function DateInput({ label, value, onChange, min, max, disabled, error }: DateInputProps) {
  return (
    <FormField label={label} error={error}>
      <input
        type="date"
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        disabled={disabled}
        className={`${inputCls} disabled:opacity-50`}
      />
    </FormField>
  )
}

// SelectField
interface SelectFieldProps {
  label: ReactNode
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  disabled?: boolean
  error?: string
  children: ReactNode
}
export function SelectField({ label, value, onChange, disabled, error, children }: SelectFieldProps) {
  return (
    <FormField label={label} error={error}>
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`${inputCls} disabled:opacity-50`}
      >
        {children}
      </select>
    </FormField>
  )
}

// TextareaField
interface TextareaFieldProps {
  label: ReactNode
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  rows?: number
  error?: string
}
export function TextareaField({ label, value, onChange, placeholder, rows = 3, error }: TextareaFieldProps) {
  return (
    <FormField label={label} error={error}>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`${inputCls} placeholder:text-muted-foreground resize-none`}
      />
    </FormField>
  )
}
