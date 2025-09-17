import React from 'react'
import { Building2, Users, DollarSign, Wrench, TrendingUp, AlertCircle } from 'lucide-react'
import { Card } from './Card'

export function Dashboard({ user, onNavigate }) {
  const stats = [
    {
      title: 'Total Properties',
      value: '12',
      change: '+2 this month',
      icon: Building2,
      color: 'purple',
      trend: 'up'
    },
    {
      title: 'Active Tenants',
      value: '28',
      change: '+5 this month',
      icon: Users,
      color: 'blue',
      trend: 'up'
    },
    {
      title: 'Monthly Revenue',
      value: '$24,800',
      change: '+12% from last month',
      icon: DollarSign,
      color: 'green',
      trend: 'up'
    },
    {
      title: 'Pending Requests',
      value: '4',
      change: '2 urgent',
      icon: Wrench,
      color: 'orange',
      trend: 'neutral'
    }
  ]

  const recentActivity = [
    {
      id: 1,
      type: 'payment',
      message: 'Rent payment received from John Smith',
      time: '2 hours ago',
      amount: '$1,200'
    },
    {
      id: 2,
      type: 'maintenance',
      message: 'New maintenance request - Leaky faucet',
      time: '4 hours ago',
      property: '123 Oak Street'
    },
    {
      id: 3,
      type: 'tenant',
      message: 'New tenant application submitted',
      time: '1 day ago',
      property: '456 Pine Avenue'
    },
    {
      id: 4,
      type: 'listing',
      message: 'Property listing optimized with AI',
      time: '2 days ago',
      property: '789 Elm Drive'
    }
  ]

  const quickActions = [
    {
      title: 'Add New Property',
      description: 'List a new rental property with AI optimization',
      action: () => onNavigate('properties'),
      icon: Building2,
      color: 'purple'
    },
    {
      title: 'Screen New Tenant',
      description: 'Run background checks and risk assessment',
      action: () => onNavigate('tenants'),
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Track Payments',
      description: 'Monitor rent payments and expenses',
      action: () => onNavigate('payments'),
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Manage Maintenance',
      description: 'Handle maintenance requests efficiently',
      action: () => onNavigate('maintenance'),
      icon: Wrench,
      color: 'orange'
    }
  ]

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">
          Welcome back, {user.name}!
        </h1>
        <p className="text-lg text-text-secondary">
          Here's what's happening with your properties today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-secondary">{stat.title}</p>
                  <p className="text-2xl lg:text-3xl font-bold text-primary mt-1">{stat.value}</p>
                  <p className={`text-sm mt-1 flex items-center space-x-1 ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    {stat.trend === 'up' && <TrendingUp className="h-3 w-3" />}
                    <span>{stat.change}</span>
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  stat.color === 'purple' ? 'bg-purple-100' :
                  stat.color === 'blue' ? 'bg-blue-100' :
                  stat.color === 'green' ? 'bg-green-100' : 'bg-orange-100'
                }`}>
                  <Icon className={`h-6 w-6 ${
                    stat.color === 'purple' ? 'text-purple-600' :
                    stat.color === 'blue' ? 'text-blue-600' :
                    stat.color === 'green' ? 'text-green-600' : 'text-orange-600'
                  }`} />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-semibold text-primary mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <Card key={index} className="p-4 lg:p-6 cursor-pointer hover:shadow-lg transition-shadow" onClick={action.action}>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                  action.color === 'purple' ? 'bg-purple-100' :
                  action.color === 'blue' ? 'bg-blue-100' :
                  action.color === 'green' ? 'bg-green-100' : 'bg-orange-100'
                }`}>
                  <Icon className={`h-6 w-6 ${
                    action.color === 'purple' ? 'text-purple-600' :
                    action.color === 'blue' ? 'text-blue-600' :
                    action.color === 'green' ? 'text-green-600' : 'text-orange-600'
                  }`} />
                </div>
                <h3 className="font-semibold text-primary mb-2">{action.title}</h3>
                <p className="text-sm text-text-secondary">{action.description}</p>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-2xl font-semibold text-primary mb-4">Recent Activity</h2>
        <Card className="p-6">
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-md transition-colors">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === 'payment' ? 'bg-green-100' :
                  activity.type === 'maintenance' ? 'bg-orange-100' :
                  activity.type === 'tenant' ? 'bg-blue-100' : 'bg-purple-100'
                }`}>
                  {activity.type === 'payment' && <DollarSign className="h-5 w-5 text-green-600" />}
                  {activity.type === 'maintenance' && <Wrench className="h-5 w-5 text-orange-600" />}
                  {activity.type === 'tenant' && <Users className="h-5 w-5 text-blue-600" />}
                  {activity.type === 'listing' && <Building2 className="h-5 w-5 text-purple-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-primary">{activity.message}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <p className="text-xs text-text-secondary">{activity.time}</p>
                    {activity.amount && (
                      <span className="text-xs font-medium text-green-600">{activity.amount}</span>
                    )}
                    {activity.property && (
                      <span className="text-xs text-text-secondary">{activity.property}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}