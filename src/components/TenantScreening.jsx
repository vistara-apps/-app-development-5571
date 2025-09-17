import React, { useState } from 'react'
import { Users, Plus, CheckCircle, AlertTriangle, Clock, Shield } from 'lucide-react'
import { Card } from './Card'
import { Button } from './Button'
import { Input } from './Input'

export function TenantScreening({ user }) {
  const [tenants, setTenants] = useState([
    {
      tenantId: '1',
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '(555) 123-4567',
      propertyId: '1',
      applicationData: {
        income: 75000,
        employment: 'Software Engineer',
        creditScore: 750
      },
      screeningStatus: 'approved',
      riskScore: 85,
      leaseStartDate: '2024-01-01',
      leaseEndDate: '2024-12-31'
    },
    {
      tenantId: '2',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '(555) 987-6543',
      propertyId: '2',
      applicationData: {
        income: 52000,
        employment: 'Teacher',
        creditScore: 680
      },
      screeningStatus: 'pending',
      riskScore: 72,
      leaseStartDate: null,
      leaseEndDate: null
    }
  ])

  const [showAddTenant, setShowAddTenant] = useState(false)
  const [showScreeningDetails, setShowScreeningDetails] = useState(false)
  const [selectedTenant, setSelectedTenant] = useState(null)
  const [newTenant, setNewTenant] = useState({
    name: '',
    email: '',
    phone: '',
    income: '',
    employment: '',
    propertyId: ''
  })

  const handleAddTenant = () => {
    const tenant = {
      tenantId: Date.now().toString(),
      ...newTenant,
      applicationData: {
        income: parseFloat(newTenant.income),
        employment: newTenant.employment,
        creditScore: Math.floor(Math.random() * (800 - 600) + 600) // Simulate credit score
      },
      screeningStatus: 'pending',
      riskScore: Math.floor(Math.random() * (90 - 60) + 60), // Simulate risk score
      leaseStartDate: null,
      leaseEndDate: null
    }
    setTenants([...tenants, tenant])
    setNewTenant({
      name: '',
      email: '',
      phone: '',
      income: '',
      employment: '',
      propertyId: ''
    })
    setShowAddTenant(false)
  }

  const runAIScreening = (tenant) => {
    // Simulate AI screening process
    const updatedTenant = {
      ...tenant,
      screeningStatus: 'completed',
      riskScore: Math.floor(Math.random() * (95 - 65) + 65)
    }
    
    setTenants(tenants.map(t => 
      t.tenantId === tenant.tenantId ? updatedTenant : t
    ))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return CheckCircle
      case 'pending': return Clock
      case 'completed': return Shield
      case 'rejected': return AlertTriangle
      default: return Clock
    }
  }

  const getRiskColor = (score) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-primary">Tenant Screening</h1>
          <p className="text-lg text-text-secondary mt-1">
            AI-powered tenant screening and risk assessment
          </p>
        </div>
        <Button 
          onClick={() => setShowAddTenant(true)}
          className="flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Tenant</span>
        </Button>
      </div>

      {/* Tenants Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {tenants.map((tenant) => {
          const StatusIcon = getStatusIcon(tenant.screeningStatus)
          return (
            <Card key={tenant.tenantId} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-primary text-lg">{tenant.name}</h3>
                  <p className="text-text-secondary text-sm">{tenant.email}</p>
                  <p className="text-text-secondary text-sm">{tenant.phone}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tenant.screeningStatus)}`}>
                  {tenant.screeningStatus}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">Income:</span>
                  <span className="text-sm font-medium">${tenant.applicationData.income.toLocaleString()}/year</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">Employment:</span>
                  <span className="text-sm font-medium">{tenant.applicationData.employment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">Credit Score:</span>
                  <span className="text-sm font-medium">{tenant.applicationData.creditScore}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">Risk Score:</span>
                  <span className={`text-sm font-medium ${getRiskColor(tenant.riskScore)}`}>
                    {tenant.riskScore}/100
                  </span>
                </div>
              </div>

              <div className="flex space-x-2">
                {tenant.screeningStatus === 'pending' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => runAIScreening(tenant)}
                    className="flex items-center space-x-1 flex-1"
                  >
                    <Shield className="h-4 w-4" />
                    <span>Run AI Screening</span>
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setSelectedTenant(tenant)
                    setShowScreeningDetails(true)
                  }}
                >
                  Details
                </Button>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Add Tenant Modal */}
      {showAddTenant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md p-6">
            <h2 className="text-2xl font-semibold text-primary mb-4">Add New Tenant Application</h2>
            <div className="space-y-4">
              <Input
                label="Full Name"
                value={newTenant.name}
                onChange={(e) => setNewTenant({...newTenant, name: e.target.value})}
                placeholder="John Doe"
              />
              <Input
                label="Email"
                type="email"
                value={newTenant.email}
                onChange={(e) => setNewTenant({...newTenant, email: e.target.value})}
                placeholder="john@email.com"
              />
              <Input
                label="Phone"
                value={newTenant.phone}
                onChange={(e) => setNewTenant({...newTenant, phone: e.target.value})}
                placeholder="(555) 123-4567"
              />
              <Input
                label="Annual Income"
                type="number"
                value={newTenant.income}
                onChange={(e) => setNewTenant({...newTenant, income: e.target.value})}
                placeholder="75000"
              />
              <Input
                label="Employment"
                value={newTenant.employment}
                onChange={(e) => setNewTenant({...newTenant, employment: e.target.value})}
                placeholder="Software Engineer"
              />
              <Input
                label="Property ID"
                value={newTenant.propertyId}
                onChange={(e) => setNewTenant({...newTenant, propertyId: e.target.value})}
                placeholder="Property ID"
              />
            </div>
            <div className="flex space-x-3 mt-6">
              <Button onClick={handleAddTenant} className="flex-1">
                Add Tenant
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowAddTenant(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Screening Details Modal */}
      {showScreeningDetails && selectedTenant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-6 w-6 text-purple-600" />
              <h2 className="text-2xl font-semibold text-primary">AI Screening Report</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-primary mb-2">Tenant Information</h3>
                <div className="bg-gray-50 p-4 rounded-md space-y-2">
                  <p><strong>Name:</strong> {selectedTenant.name}</p>
                  <p><strong>Email:</strong> {selectedTenant.email}</p>
                  <p><strong>Phone:</strong> {selectedTenant.phone}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-primary mb-2">Financial Assessment</h3>
                <div className="bg-gray-50 p-4 rounded-md space-y-2">
                  <p><strong>Annual Income:</strong> ${selectedTenant.applicationData.income.toLocaleString()}</p>
                  <p><strong>Credit Score:</strong> {selectedTenant.applicationData.creditScore}</p>
                  <p><strong>Employment:</strong> {selectedTenant.applicationData.employment}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-primary mb-2">AI Risk Analysis</h3>
                <div className="bg-purple-50 p-4 rounded-md border border-purple-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Overall Risk Score</span>
                    <span className={`text-lg font-bold ${getRiskColor(selectedTenant.riskScore)}`}>
                      {selectedTenant.riskScore}/100
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p>✓ Income verification passed</p>
                    <p>✓ Credit history review completed</p>
                    <p>✓ Employment verification successful</p>
                    <p>✓ Background check clear</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-primary mb-2">Recommendation</h3>
                <div className={`p-4 rounded-md ${
                  selectedTenant.riskScore >= 80 ? 'bg-green-50 border border-green-200' :
                  selectedTenant.riskScore >= 60 ? 'bg-yellow-50 border border-yellow-200' :
                  'bg-red-50 border border-red-200'
                }`}>
                  <p className={`font-medium ${
                    selectedTenant.riskScore >= 80 ? 'text-green-800' :
                    selectedTenant.riskScore >= 60 ? 'text-yellow-800' :
                    'text-red-800'
                  }`}>
                    {selectedTenant.riskScore >= 80 ? 'APPROVE - Low Risk Tenant' :
                     selectedTenant.riskScore >= 60 ? 'REVIEW - Moderate Risk' :
                     'DECLINE - High Risk'}
                  </p>
                  <p className="text-sm mt-1 text-gray-600">
                    Based on comprehensive AI analysis of financial stability, credit history, and background verification.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <Button 
                onClick={() => setShowScreeningDetails(false)}
                className="flex-1"
              >
                Close
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}