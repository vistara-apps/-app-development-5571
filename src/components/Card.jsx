import React from 'react'

export function Card({ children, className = '', ...props }) {
  return (
    <div 
      className={`bg-surface rounded-lg shadow-card border border-gray-100 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}