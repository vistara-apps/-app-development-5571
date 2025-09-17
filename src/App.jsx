import React, { useState } from 'react'
import { AppShell } from './components/AppShell'
import { LoginForm } from './components/LoginForm'
import { Dashboard } from './components/Dashboard'
import { PropertyManager } from './components/PropertyManager'
import { TenantScreening } from './components/TenantScreening'
import { PaymentTracker } from './components/PaymentTracker'
import { MaintenanceManager } from './components/MaintenanceManager'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [currentView, setCurrentView] = useState('dashboard')

  const handleLogin = (user) => {
    setCurrentUser(user)
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setCurrentView('dashboard')
  }

  if (!currentUser) {
    return <LoginForm onLogin={handleLogin} />
  }

  const renderContent = () => {
    switch (currentView) {
      case 'properties':
        return <PropertyManager user={currentUser} />
      case 'tenants':
        return <TenantScreening user={currentUser} />
      case 'payments':
        return <PaymentTracker user={currentUser} />
      case 'maintenance':
        return <MaintenanceManager user={currentUser} />
      default:
        return <Dashboard user={currentUser} onNavigate={setCurrentView} />
    }
  }

  return (
    <AppShell 
      user={currentUser} 
      currentView={currentView}
      onNavigate={setCurrentView}
      onLogout={handleLogout}
    >
      {renderContent()}
    </AppShell>
  )
}

export default App