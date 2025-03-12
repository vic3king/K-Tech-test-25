// components/Button.tsx
import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline'
  children: React.ReactNode
  className?: string
}

const Button = ({
  children,
  onClick,
  variant = 'primary',
  className,
}: ButtonProps) => {
  const baseStyles = 'px-4 py-2 rounded-md text-sm font-medium'
  const variants = {
    primary: 'bg-[#0D8112] text-white',
    outline: 'border border-[#0D8112] text-[#0D8112]',
  }

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  )
}

export default Button
