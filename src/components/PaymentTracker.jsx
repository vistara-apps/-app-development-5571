import React, { useState } from 'react'
import { DollarSign, TrendingUp, Calendar, Plus, CreditCard } from 'lucide-react'
import { Card } from './Card'
import { Button } from './Button'
import { format } from 'date-fns'

export function PaymentTracker({ user }) {
  const [payments, setPayments] = useState([
    {
      paymentId: '1',
      tenantId: '1',
      tenantName: 'John Smith',
      property: '123 Oak Street',
      amount: 2800,
      paymentDate: '2024-01-01',
      dueDate: '2024-01-01',
      status: 'paid',
      expenseCategory: 'rent'
    },
    {
      paymentId: '2',
      tenantId: '2',
      tenantName: 'Sarah Johnson',
      property: '456 Pine Avenue',
      amount: 2200,
      paymentDate: null,
      dueDate: '2024-01-01',
      status: 'pending',
      expenseCategory: 'rent'
    },
    {
      paymentId: '3',
      tenantId: '1',
      tenantName: 'Maintenance Corp',
      property: '123 Oak Street',
      amount: -350,
      paymentDate: '2023-12-28',
      dueDate: '2023-12-28',
      status: 'paid',
      expenseCategory: 'maintenance'
    }
  ])

  const [showAddPayment, setShowAddPayment] = useState(false)
  const [newPayment, setNewPayment] = useState({
    tenantName: '',
    property: '',
    amount: '',
    dueDate: '',
    expenseCategory: 'rent'
  })

  const handleAddPayment = () => {
    const payment = {
      paymentId: Date.now().toString(),
      tenantId: Date.now().toString(),
      ...newPayment,
      amount: parseFloat(newPayment.amount),
      paymentDate: null,
      status: 'pending'
    }
    setPayments([...payments, payment])
    setNewPayment({
      tenantName: '',
      property: '',
      amount: '',
      dueDate: '',
      expenseCategory: 'rent'
    })
    setShowAddPayment(false)
  }

  const markAsPaid = (paymentId) => {
    setPayments(payments.map(p => 
      p.paymentId === paymentId 
        ? { ...p, status: 'paid', paymentDate: new Date().toISOString().split('T')[0] }
        : p
    ))
  }

  const totalRevenue = payments
    .filter(p => p.amount > 0 && p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0)

  const totalExpenses = payments
    .filter(p => p.amount < 0 && p.status === 'paid')
    .reduce((sum, p) => sum + Math.abs(p.amount), 0)

  const pendingPayments = payments.filter(p => p.status === 'pending' && p.amount > 0)

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'overdue': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-primary">Payment Tracking</h1>
          <p className="text-lg text-text-secondary mt-1">
            Automated rent collection and expense management
          </p>
        </div>
        <Button 
          onClick={() => setShowAddPayment(true)}
          className="flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Transaction</span>
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <Card className="p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">Total Revenue</p>
              <p className="text-2xl lg:text-3xl font-bold text-green-600">${totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-green-600 mt-1">This month</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">Total Expenses</p>
              <p className="text-2xl lg:text-3xl font-bold text-red-600">${totalExpenses.toLocaleString()}</p>
              <p className="text-sm text-red-600 mt-1">This month</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">Net Income</p>
              <p className="text-2xl lg:text-3xl font-bold text-primary">${(totalRevenue - totalExpenses).toLocaleString()}</p>
              <p className="text-sm text-green-600 mt-1">+15% from last month</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">Pending Payments</p>
              <p className="text-2xl lg:text-3xl font-bold text-orange-600">{pendingPayments.length}</p>
              <p className="text-sm text-orange-600 mt-1">${pendingPayments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()} due</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Payments Table */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold text-primary mb-4">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-text-secondary">Tenant/Vendor</th>
                <th className="text-left py-3 px-4 font-medium text-text-secondary">Property</th>
                <th className="text-left py-3 px-4 font-medium text-text-secondary">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-text-secondary">Due Date</th>
                <th className="text-left py-3 px-4 font-medium text-text-secondary">Status</th>
                <th className="text-left py-3 px-4 font-medium text-text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.paymentId} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-primary">{payment.tenantName}</p>
                      <p className="text-xs text-text-secondary capitalize">{payment.expenseCategory}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-text-secondary">{payment.property}</td>
                  <td className="py-4 px-4">
                    <span className={`font-medium ${
                      payment.amount > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {payment.amount > 0 ? '+' : '-'}${Math.abs(payment.amount).toLocaleString()}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-text-secondary">
                    {format(new Date(payment.dueDate), 'MMM dd, yyyy')}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {payment.status === 'pending' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => markAsPaid(payment.paymentId)}
                        className="flex items-center space-x-1"
                      >
                        <CreditCard className="h-3 w-3" />
                        <span>Mark Paid</span>
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Payment Modal */}
      {showAddPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md p-6">
            <h2 className="text-2xl font-semibold text-primary mb-4">Add New Transaction</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tenant/Vendor Name
                </label>
                <input
                  type="text"
                  value={newPayment.tenantName}
                  onChange={(e) => setNewPayment({...newPayment, tenantName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property
                </label>
                <input
                  type="text"
                  value={newPayment.property}
                  onChange={(e) => setNewPayment({...newPayment, property: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="123 Main Street"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  value={newPayment.amount}
                  onChange={(e) => setNewPayment({...newPayment, amount: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="2500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  value={newPayment.dueDate}
                  onChange={(e) => setNewPayment({...newPayment, dueDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={newPayment.expenseCategory}
                  onChange={(e) => setNewPayment({...newPayment, expenseCategory: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="rent">Rent</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="utilities">Utilities</option>
                  <option value="insurance">Insurance</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <Button onClick={handleAddPayment} className="flex-1">
                Add Transaction
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowAddPayment(false)}
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