import React, { useState } from 'react'
import { Wrench, Plus, Clock, CheckCircle, AlertTriangle, User } from 'lucide-react'
import { Card } from './Card'
import { Button } from './Button'
import { Input } from './Input'
import { format } from 'date-fns'

export function MaintenanceManager({ user }) {
  const [requests, setRequests] = useState([
    {
      requestId: '1',
      propertyId: '1',
      property: '123 Oak Street',
      tenantId: '1',
      tenantName: 'John Smith',
      description: 'Kitchen faucet is leaking and needs repair',
      category: 'plumbing',
      status: 'open',
      priority: 'medium',
      assignedProvider: null,
      createdAt: '2024-01-01T10:00:00Z',
      updatedAt: '2024-01-01T10:00:00Z'
    },
    {
      requestId: '2',
      propertyId: '2',
      property: '456 Pine Avenue',
      tenantId: '2',
      tenantName: 'Sarah Johnson',
      description: 'Heating system not working properly, apartment is cold',
      category: 'hvac',
      status: 'in-progress',
      priority: 'high',
      assignedProvider: 'ABC HVAC Services',
      createdAt: '2023-12-30T14:30:00Z',
      updatedAt: '2024-01-01T09:00:00Z'
    },
    {
      requestId: '3',
      propertyId: '1',
      property: '123 Oak Street',
      tenantId: '1',
      tenantName: 'John Smith',
      description: 'Light bulb replacement in hallway',
      category: 'electrical',
      status: 'completed',
      priority: 'low',
      assignedProvider: 'QuickFix Maintenance',
      createdAt: '2023-12-28T16:00:00Z',
      updatedAt: '2023-12-29T10:00:00Z'
    }
  ])

  const [showAddRequest, setShowAddRequest] = useState(false)
  const [showAICategorizaton, setShowAICategorizaton] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [newRequest, setNewRequest] = useState({
    property: '',
    tenantName: '',
    description: '',
    priority: 'medium'
  })

  const handleAddRequest = () => {
    const request = {
      requestId: Date.now().toString(),
      propertyId: Date.now().toString(),
      ...newRequest,
      tenantId: Date.now().toString(),
      category: 'uncategorized',
      status: 'open',
      assignedProvider: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    setRequests([...requests, request])
    setNewRequest({
      property: '',
      tenantName: '',
      description: '',
      priority: 'medium'
    })
    setShowAddRequest(false)
  }

  const runAICategorization = (request) => {
    setSelectedRequest(request)
    setShowAICategorizaton(true)
  }

  const applyAICategorization = () => {
    // Simulate AI categorization
    const keywords = selectedRequest.description.toLowerCase()
    let category = 'general'
    let suggestedProvider = 'General Maintenance Co.'
    
    if (keywords.includes('leak') || keywords.includes('faucet') || keywords.includes('pipe')) {
      category = 'plumbing'
      suggestedProvider = 'Pro Plumbing Services'
    } else if (keywords.includes('heat') || keywords.includes('ac') || keywords.includes('hvac')) {
      category = 'hvac'
      suggestedProvider = 'ABC HVAC Services'
    } else if (keywords.includes('light') || keywords.includes('electrical') || keywords.includes('outlet')) {
      category = 'electrical'
      suggestedProvider = 'ElectricPro Solutions'
    }
    
    setRequests(requests.map(r => 
      r.requestId === selectedRequest.requestId 
        ? { ...r, category, assignedProvider: suggestedProvider, status: 'in-progress' }
        : r
    ))
    
    setShowAICategorizaton(false)
    setSelectedRequest(null)
  }

  const updateStatus = (requestId, newStatus) => {
    setRequests(requests.map(r => 
      r.requestId === requestId 
        ? { ...r, status: newStatus, updatedAt: new Date().toISOString() }
        : r
    ))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-orange-100 text-orange-800'
      case 'in-progress': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'open': return Clock
      case 'in-progress': return AlertTriangle
      case 'completed': return CheckCircle
      default: return Clock
    }
  }

  const stats = {
    open: requests.filter(r => r.status === 'open').length,
    inProgress: requests.filter(r => r.status === 'in-progress').length,
    completed: requests.filter(r => r.status === 'completed').length,
    highPriority: requests.filter(r => r.priority === 'high' && r.status !== 'completed').length
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-primary">Maintenance Manager</h1>
          <p className="text-lg text-text-secondary mt-1">
            AI-powered maintenance request management and tracking
          </p>
        </div>
        <Button 
          onClick={() => setShowAddRequest(true)}
          className="flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Request</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <Card className="p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">Open Requests</p>
              <p className="text-2xl lg:text-3xl font-bold text-orange-600">{stats.open}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">In Progress</p>
              <p className="text-2xl lg:text-3xl font-bold text-blue-600">{stats.inProgress}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">Completed</p>
              <p className="text-2xl lg:text-3xl font-bold text-green-600">{stats.completed}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">High Priority</p>
              <p className="text-2xl lg:text-3xl font-bold text-red-600">{stats.highPriority}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Requests Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {requests.map((request) => {
          const StatusIcon = getStatusIcon(request.status)
          return (
            <Card key={request.requestId} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-primary text-lg">{request.property}</h3>
                  <p className="text-text-secondary text-sm flex items-center space-x-1">
                    <User className="h-3 w-3" />
                    <span>{request.tenantName}</span>
                  </p>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                    {request.status.replace('-', ' ')}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                    {request.priority}
                  </span>
                </div>
              </div>

              <p className="text-sm text-text-secondary mb-4 line-clamp-3">
                {request.description}
              </p>

              <div className="space-y-2 mb-4 text-xs">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Category:</span>
                  <span className="font-medium capitalize">{request.category}</span>
                </div>
                {request.assignedProvider && (
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Provider:</span>
                    <span className="font-medium">{request.assignedProvider}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-text-secondary">Created:</span>
                  <span className="font-medium">{format(new Date(request.createdAt), 'MMM dd, yyyy')}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                {request.category === 'uncategorized' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => runAICategorization(request)}
                    className="flex items-center space-x-1 flex-1"
                  >
                    <Wrench className="h-3 w-3" />
                    <span>AI Categorize</span>
                  </Button>
                )}
                {request.status === 'open' && request.category !== 'uncategorized' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateStatus(request.requestId, 'in-progress')}
                    className="flex-1"
                  >
                    Start Work
                  </Button>
                )}
                {request.status === 'in-progress' && (
                  <Button
                    size="sm"
                    onClick={() => updateStatus(request.requestId, 'completed')}
                    className="flex-1"
                  >
                    Complete
                  </Button>
                )}
              </div>
            </Card>
          )
        })}
      </div>

      {/* Add Request Modal */}
      {showAddRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md p-6">
            <h2 className="text-2xl font-semibold text-primary mb-4">Add Maintenance Request</h2>
            <div className="space-y-4">
              <Input
                label="Property"
                value={newRequest.property}
                onChange={(e) => setNewRequest({...newRequest, property: e.target.value})}
                placeholder="123 Main Street"
              />
              <Input
                label="Tenant Name"
                value={newRequest.tenantName}
                onChange={(e) => setNewRequest({...newRequest, tenantName: e.target.value})}
                placeholder="John Doe"
              />
              <Input
                label="Description"
                as="textarea"
                value={newRequest.description}
                onChange={(e) => setNewRequest({...newRequest, description: e.target.value})}
                placeholder="Describe the maintenance issue..."
                rows={4}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  value={newRequest.priority}
                  onChange={(e) => setNewRequest({...newRequest, priority: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <Button onClick={handleAddRequest} className="flex-1">
                Add Request
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowAddRequest(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* AI Categorization Modal */}
      {showAICategorizaton && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Wrench className="h-6 w-6 text-purple-600" />
              <h2 className="text-2xl font-semibold text-primary">AI Maintenance Categorization</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-primary mb-2">Request Details</h3>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm"><strong>Property:</strong> {selectedRequest.property}</p>
                  <p className="text-sm"><strong>Tenant:</strong> {selectedRequest.tenantName}</p>
                  <p className="text-sm"><strong>Description:</strong> {selectedRequest.description}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-primary mb-2">AI Analysis Results</h3>
                <div className="bg-purple-50 p-4 rounded-md border border-purple-200">
                  <div className="space-y-2">
                    <p className="text-sm"><strong>Detected Category:</strong> 
                      <span className="ml-2 capitalize">
                        {selectedRequest.description.toLowerCase().includes('leak') || selectedRequest.description.toLowerCase().includes('faucet') ? 'Plumbing' :
                         selectedRequest.description.toLowerCase().includes('heat') || selectedRequest.description.toLowerCase().includes('hvac') ? 'HVAC' :
                         selectedRequest.description.toLowerCase().includes('light') || selectedRequest.description.toLowerCase().includes('electrical') ? 'Electrical' : 'General Maintenance'}
                      </span>
                    </p>
                    <p className="text-sm"><strong>Suggested Provider:</strong> 
                      <span className="ml-2">
                        {selectedRequest.description.toLowerCase().includes('leak') || selectedRequest.description.toLowerCase().includes('faucet') ? 'Pro Plumbing Services' :
                         selectedRequest.description.toLowerCase().includes('heat') || selectedRequest.description.toLowerCase().includes('hvac') ? 'ABC HVAC Services' :
                         selectedRequest.description.toLowerCase().includes('light') || selectedRequest.description.toLowerCase().includes('electrical') ? 'ElectricPro Solutions' : 'General Maintenance Co.'}
                      </span>
                    </p>
                    <p className="text-sm"><strong>Estimated Cost:</strong> 
                      <span className="ml-2">$150 - $400</span>
                    </p>
                    <p className="text-sm"><strong>Urgency Level:</strong> 
                      <span className="ml-2">{selectedRequest.priority}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <Button onClick={applyAICategorization} className="flex-1">
                Apply AI Suggestions
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowAICategorizaton(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}