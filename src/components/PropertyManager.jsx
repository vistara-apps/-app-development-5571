import React, { useState } from 'react'
import { Plus, MapPin, DollarSign, Calendar, Edit, Trash2, Sparkles } from 'lucide-react'
import { Card } from './Card'
import { Button } from './Button'
import { Input } from './Input'

export function PropertyManager({ user }) {
  const [properties, setProperties] = useState([
    {
      propertyId: '1',
      address: '123 Oak Street',
      city: 'San Francisco',
      state: 'CA',
      zip: '94102',
      listingDescription: 'Beautiful 2-bedroom apartment with modern amenities and city views.',
      askingRent: 2800,
      currentTenantId: 'tenant1',
      status: 'occupied'
    },
    {
      propertyId: '2',
      address: '456 Pine Avenue',
      city: 'San Francisco',
      state: 'CA',
      zip: '94103',
      listingDescription: 'Spacious 1-bedroom condo in the heart of downtown.',
      askingRent: 2200,
      currentTenantId: null,
      status: 'vacant'
    }
  ])

  const [showAddProperty, setShowAddProperty] = useState(false)
  const [showAIOptimizer, setShowAIOptimizer] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [newProperty, setNewProperty] = useState({
    address: '',
    city: '',
    state: '',
    zip: '',
    listingDescription: '',
    askingRent: ''
  })

  const handleAddProperty = () => {
    const property = {
      propertyId: Date.now().toString(),
      ...newProperty,
      askingRent: parseFloat(newProperty.askingRent),
      currentTenantId: null,
      status: 'vacant'
    }
    setProperties([...properties, property])
    setNewProperty({
      address: '',
      city: '',
      state: '',
      zip: '',
      listingDescription: '',
      askingRent: ''
    })
    setShowAddProperty(false)
  }

  const optimizeWithAI = (property) => {
    setSelectedProperty(property)
    setShowAIOptimizer(true)
  }

  const applyAIOptimization = () => {
    // Simulate AI optimization
    const optimizedDescription = `Stunning ${selectedProperty.address.includes('Oak') ? '2-bedroom' : '1-bedroom'} property featuring premium finishes, abundant natural light, and prime location. Recently updated with modern appliances and designer touches. Perfect for professionals seeking luxury living with easy access to transportation and dining.`
    
    const optimizedRent = Math.round(selectedProperty.askingRent * 1.1) // 10% increase
    
    setProperties(properties.map(p => 
      p.propertyId === selectedProperty.propertyId 
        ? { ...p, listingDescription: optimizedDescription, askingRent: optimizedRent }
        : p
    ))
    
    setShowAIOptimizer(false)
    setSelectedProperty(null)
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-primary">Properties</h1>
          <p className="text-lg text-text-secondary mt-1">
            Manage your rental properties with AI-powered optimization
          </p>
        </div>
        <Button 
          onClick={() => setShowAddProperty(true)}
          className="flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Property</span>
        </Button>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {properties.map((property) => (
          <Card key={property.propertyId} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-primary text-lg">{property.address}</h3>
                <p className="text-text-secondary flex items-center space-x-1 mt-1">
                  <MapPin className="h-4 w-4" />
                  <span>{property.city}, {property.state} {property.zip}</span>
                </p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                property.status === 'occupied' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-orange-100 text-orange-800'
              }`}>
                {property.status === 'occupied' ? 'Occupied' : 'Vacant'}
              </span>
            </div>

            <p className="text-sm text-text-secondary mb-4 line-clamp-3">
              {property.listingDescription}
            </p>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-1 text-green-600">
                <DollarSign className="h-5 w-5" />
                <span className="font-semibold text-lg">${property.askingRent}/mo</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => optimizeWithAI(property)}
                className="flex items-center space-x-1 flex-1"
              >
                <Sparkles className="h-4 w-4" />
                <span>AI Optimize</span>
              </Button>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Property Modal */}
      {showAddProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md p-6">
            <h2 className="text-2xl font-semibold text-primary mb-4">Add New Property</h2>
            <div className="space-y-4">
              <Input
                label="Address"
                value={newProperty.address}
                onChange={(e) => setNewProperty({...newProperty, address: e.target.value})}
                placeholder="123 Main Street"
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="City"
                  value={newProperty.city}
                  onChange={(e) => setNewProperty({...newProperty, city: e.target.value})}
                  placeholder="San Francisco"
                />
                <Input
                  label="State"
                  value={newProperty.state}
                  onChange={(e) => setNewProperty({...newProperty, state: e.target.value})}
                  placeholder="CA"
                />
              </div>
              <Input
                label="ZIP Code"
                value={newProperty.zip}
                onChange={(e) => setNewProperty({...newProperty, zip: e.target.value})}
                placeholder="94102"
              />
              <Input
                label="Monthly Rent"
                type="number"
                value={newProperty.askingRent}
                onChange={(e) => setNewProperty({...newProperty, askingRent: e.target.value})}
                placeholder="2500"
              />
              <Input
                label="Description"
                as="textarea"
                value={newProperty.listingDescription}
                onChange={(e) => setNewProperty({...newProperty, listingDescription: e.target.value})}
                placeholder="Describe the property..."
                rows={3}
              />
            </div>
            <div className="flex space-x-3 mt-6">
              <Button onClick={handleAddProperty} className="flex-1">
                Add Property
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowAddProperty(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* AI Optimizer Modal */}
      {showAIOptimizer && selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="h-6 w-6 text-purple-600" />
              <h2 className="text-2xl font-semibold text-primary">AI Listing Optimization</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-primary mb-2">Property</h3>
                <p className="text-text-secondary">{selectedProperty.address}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-primary mb-2">Current Description</h3>
                <p className="text-sm text-text-secondary bg-gray-50 p-3 rounded-md">
                  {selectedProperty.listingDescription}
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-primary mb-2">AI-Optimized Description</h3>
                <p className="text-sm text-text-secondary bg-purple-50 p-3 rounded-md border border-purple-200">
                  Stunning {selectedProperty.address.includes('Oak') ? '2-bedroom' : '1-bedroom'} property featuring premium finishes, abundant natural light, and prime location. Recently updated with modern appliances and designer touches. Perfect for professionals seeking luxury living with easy access to transportation and dining.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-primary mb-2">Current Rent</h3>
                  <p className="text-lg font-semibold text-gray-600">${selectedProperty.askingRent}/mo</p>
                </div>
                <div>
                  <h3 className="font-medium text-primary mb-2">Suggested Rent</h3>
                  <p className="text-lg font-semibold text-green-600">${Math.round(selectedProperty.askingRent * 1.1)}/mo</p>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <Button onClick={applyAIOptimization} className="flex-1">
                Apply Optimization
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowAIOptimizer(false)}
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