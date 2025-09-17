import React from 'react'

export function Input({ 
  label, 
  className = '', 
  as = 'input',
  ...props 
}) {
  const Component = as
  
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <Component
        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${className}`}
        {...props}
      />
    </div>
  )
}