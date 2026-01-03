import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Modal } from '../ui/Modal'
import { TrustTrendChart } from '../charts/TrustTrendChart'
import { SatisfactionDelayScatter } from '../charts/SatisfactionDelayScatter'
import { calculateBusinessTrust, getTrustLevel } from '../../utils/trustCalculator'
import { customersData, businessesData } from '../../utils/dataGenerator'
import { 
  TrendingUp, 
  Users, 
  Star, 
  AlertTriangle, 
  Lightbulb,
  Building,
  DollarSign,
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  Target,
  BarChart3,
  Clock,
  CheckCircle,
  Eye,
  Award,
  MapPin,
  Shield,
  Heart,
  ShoppingCart
} from 'lucide-react'

interface BusinessDashboardProps {
  user: any
}

export function BusinessDashboard({ user }: BusinessDashboardProps) {
  const [businessData, setBusinessData] = useState<any>(null)
  const [customers, setCustomers] = useState<any[]>([])
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
  const [showCustomerModal, setShowCustomerModal] = useState(false)

  useEffect(() => {
    // Simulate loading business data
    const mockBusiness = {
      ...businessesData[0],
      ...user,
      trustScore: calculateBusinessTrust(businessesData[0])
    }
    setBusinessData(mockBusiness)

    // Simulate customers for this business
    setCustomers(customersData.slice(0, 15))
  }, [user])

  const handleCustomerClick = (customer: any) => {
    setSelectedCustomer(customer)
    setShowCustomerModal(true)
  }

  if (!businessData) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  const trustLevel = getTrustLevel(businessData.trustScore)
  const avgCustomerRating = customers.reduce((acc, c) => acc + c.avgRating, 0) / customers.length

  const suggestions = [
    {
      icon: <TrendingUp className="w-5 h-5 text-green-600" />,
      title: "Reduce Delivery Delays",
      description: "Cut delays by 15% to increase trust score by +12 points",
      impact: "+12 Trust Score"
    },
    {
      icon: <Users className="w-5 h-5 text-blue-600" />,
      title: "Target Loyal Customers",
      description: "Focus on Whitefield loyal customers for 68% higher retention",
      impact: "+68% Retention"
    },
    {
      icon: <Lightbulb className="w-5 h-5 text-purple-600" />,
      title: "Add Mobile App Booking",
      description: "Implement mobile booking to increase sales in Indiranagar by 20%",
      impact: "+20% Sales"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{businessData.name}</h1>
          <p className="text-gray-600">Your business intelligence dashboard</p>
        </div>

        {/* Business Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Trust Score</p>
                  <p className="text-2xl font-bold text-gray-900">{businessData.trustScore}</p>
                  <Badge className={trustLevel.colorClass}>{trustLevel.label}</Badge>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Customers</p>
                  <p className="text-2xl font-bold text-gray-900">{businessData.totalCustomers.toLocaleString()}</p>
                  <p className="text-xs text-green-600">+12% this month</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">₹{(businessData.revenue / 100000).toFixed(1)}L</p>
                  <p className="text-xs text-green-600">+{businessData.monthlyGrowth}% growth</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                  <p className="text-2xl font-bold text-gray-900">{businessData.avgRating}</p>
                  <p className="text-xs text-gray-500">From {customers.length} reviews</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Trust Score Trend
              </CardTitle>
              <CardDescription>Your trust score over the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <TrustTrendChart />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Satisfaction vs Response Time
              </CardTitle>
              <CardDescription>Customer satisfaction analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <SatisfactionDelayScatter />
            </CardContent>
          </Card>
        </div>

        {/* AI Suggestions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              AI-Powered Insights
            </CardTitle>
            <CardDescription>Personalized recommendations to grow your business</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    {suggestion.icon}
                    <h4 className="font-semibold">{suggestion.title}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{suggestion.description}</p>
                  <Badge variant="secondary" className="text-xs">{suggestion.impact}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Customers Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Your Customers
            </CardTitle>
            <CardDescription>Manage and analyze your customer relationships</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Customer</th>
                    <th className="text-left py-3 px-4">Trust Score</th>
                    <th className="text-left py-3 px-4">Rating</th>
                    <th className="text-left py-3 px-4">Spent</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{customer.name}</div>
                          <div className="text-sm text-gray-600">{customer.email}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-blue-500" />
                          <span className="font-medium">{customer.trustScore}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span>{customer.avgRating}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">₹{customer.totalSpent.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <Badge 
                          className={
                            customer.riskLevel === 'Low' ? 'bg-green-100 text-green-800' :
                            customer.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }
                        >
                          {customer.riskLevel}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleCustomerClick(customer)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Customer Detail Modal */}
        <Modal 
          isOpen={showCustomerModal} 
          onClose={() => setShowCustomerModal(false)}
          title={selectedCustomer?.name}
          size="lg"
        >
          {selectedCustomer && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Customer Info */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Customer Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium">{selectedCustomer.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Location</p>
                        <p className="font-medium">{selectedCustomer.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Last Purchase</p>
                        <p className="font-medium">{selectedCustomer.lastPurchase}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Next Purchase Prediction</p>
                        <p className="font-medium">{selectedCustomer.nextPurchasePrediction}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Customer Metrics */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Customer Metrics</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-blue-500" />
                        <span className="text-sm text-gray-600">Trust Score</span>
                      </div>
                      <span className="font-semibold">{selectedCustomer.trustScore}/100</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-500" />
                        <span className="text-sm text-gray-600">Rating</span>
                      </div>
                      <span className="font-semibold">{selectedCustomer.avgRating}/5.0</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Heart className="w-5 h-5 text-red-500" />
                        <span className="text-sm text-gray-600">Loyalty Status</span>
                      </div>
                      <span className="font-semibold">{selectedCustomer.loyaltyStatus}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-green-500" />
                        <span className="text-sm text-gray-600">Total Spent</span>
                      </div>
                      <span className="font-semibold">₹{selectedCustomer.totalSpent.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preferences */}
              <div className="mt-6">
                <h4 className="font-semibold mb-3">Preferences</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Preferred Categories</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedCustomer.preferredCategories.map((category: string, index: number) => (
                        <Badge key={index} variant="outline">{category}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Communication Preference</p>
                    <Badge>{selectedCustomer.communicationPreference}</Badge>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex gap-3">
                <Button className="flex-1">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact
                </Button>
                <Button variant="outline" className="flex-1">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Offer
                </Button>
                <Button variant="outline" className="flex-1">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Message
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  )
}