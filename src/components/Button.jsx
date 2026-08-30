const variants = {
  primary: 'bg-blue-700 hover:bg-blue-800 text-white shadow-sm',
  accent: 'bg-amber-500 hover:bg-amber-600 text-white shadow-sm',
  success: 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm',
  secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200',
  danger: 'bg-red-500 hover:bg-red-600 text-white shadow-sm',
  ghost: 'text-slate-600 hover:bg-slate-100',
  outline: 'border border-blue-700 text-blue-700 hover:bg-blue-50',
}

function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  disabled = false,
  type = 'button',
  onClick,
  className = '',
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center
        px-4 py-2 rounded-lg font-medium text-sm transition-all duration-150 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {children}
    </button>
  )
}

export default Button
