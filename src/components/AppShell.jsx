import React from 'react'
import { Home, Building2, Users, CreditCard, Wrench, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'

export function AppShell({ children, user, currentView, onNavigate, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: 'Dashboard', id: 'dashboard', icon: Home },
    { name: 'Properties', id: 'properties', icon: Building2 },
    { name: 'Tenants', id: 'tenants', icon: Users },
    { name: 'Payments', id: 'payments', icon: CreditCard },
    { name: 'Maintenance', id: 'maintenance', icon: Wrench },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-primary">KeyKeeperAI</h1>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-md"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b shadow-sm">
          <div className="px-4 py-2 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id)
                    setMobileMenuOpen(false)
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-colors ${
                    currentView === item.id
                      ? 'bg-purple-50 text-purple-700 border-r-2 border-purple-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              )
            })}
            <button
              onClick={onLogout}
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          <div className="flex flex-col flex-grow bg-white border-r shadow-sm">
            {/* Logo */}
            <div className="flex items-center space-x-3 px-6 py-6 border-b">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">KeyKeeperAI</h1>
                <p className="text-sm text-text-secondary">Property Management</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-colors ${
                      currentView === item.id
                        ? 'bg-purple-50 text-purple-700 border-r-2 border-purple-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                  </button>
                )
              })}
            </nav>

            {/* User Info */}
            <div className="px-4 py-4 border-t">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-purple-700">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user.subscriptionTier} Plan</p>
                </div>
              </div>
              <button
                onClick={onLogout}
                className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:pl-64 flex-1">
          <main className="px-4 lg:px-8 py-6 max-w-7xl mx-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}