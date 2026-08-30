const variants = {
  primary: 'bg-blue-500 hover:bg-blue-600 text-white',
  success: 'bg-green-500 hover:bg-green-600 text-white',
  secondary: 'bg-gray-300 hover:bg-gray-400 text-gray-700',
  danger: 'bg-red-500 hover:bg-red-600 text-white',
  ghost: 'text-gray-600 hover:bg-gray-100',
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
        px-4 py-2 rounded-lg font-medium text-sm transition cursor-pointer
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
