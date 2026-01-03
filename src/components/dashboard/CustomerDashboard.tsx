import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Modal } from '../ui/Modal'
import { TrustTrendChart } from '../charts/TrustTrendChart'
import { SatisfactionDelayScatter } from '../charts/SatisfactionDelayScatter'
import { SegmentPieChart } from '../charts/SegmentPieChart'
import { calculateCustomerTrust, calculateRelationshipScore, getTrustLevel } from '../../utils/trustCalculator'
import { customersData, businessesData } from '../../utils/dataGenerator'
import { 
  MapPin, 
  Star, 
  Phone, 
  Mail, 
  Calendar, 
  TrendingUp, 
  Users, 
  Heart,
  Clock,
  DollarSign,
  Award,
  Target,
  BarChart3,
  MessageSquare,
  CheckCircle,
  AlertTriangle,
  Building,
  Eye,
  ShoppingCart,
  Shield
} from 'lucide-react'

interface CustomerDashboardProps {
  user: any
}

export function CustomerDashboard({ user }: CustomerDashboardProps) {
  const [customerData, setCustomerData] = useState<any>(null)
  const [nearbyBusinesses, setNearbyBusinesses] = useState<any[]>([])
  const [selectedBusiness, setSelectedBusiness] = useState<any>(null)
  const [showBusinessModal, setShowBusinessModal] = useState(false)

  useEffect(() => {
    // Simulate loading customer data
    const mockCustomer = {
      ...customersData[0],
      ...user,
      trustScore: calculateCustomerTrust(customersData[0])
    }
    setCustomerData(mockCustomer)

    // Filter businesses by customer location
    const filtered = businessesData
      .filter(business => business.location === user.location)
      .slice(0, 12)
    setNearbyBusinesses(filtered)
  }, [user])

  const handleBusinessClick = (business: any) => {
    setSelectedBusiness(business)
    setShowBusinessModal(true)
  }

  if (!customerData) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  const trustLevel = getTrustLevel(customerData.trustScore)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {customerData.name}!</h1>
          <p className="text-gray-600">Your trust intelligence dashboard</p>
        </div>

        {/* Customer Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Trust Score</p>
                  <p className="text-2xl font-bold text-gray-900">{customerData.trustScore}</p>
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
                  <p className="text-sm font-medium text-gray-600">Loyalty Status</p>
                  <p className="text-2xl font-bold text-gray-900">{customerData.loyaltyStatus}</p>
                  <p className="text-xs text-gray-500">{customerData.repeatVisits} visits</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-900">₹{customerData.totalSpent.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">Lifetime value</p>
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
                  <p className="text-sm font-medium text-gray-600">Risk Level</p>
                  <p className="text-2xl font-bold text-gray-900">{customerData.riskLevel}</p>
                  <p className="text-xs text-gray-500">Churn probability</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
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
                <Target className="w-5 h-5" />
                Customer Segment
              </CardTitle>
              <CardDescription>Your current segment classification</CardDescription>
            </CardHeader>
            <CardContent>
              <SegmentPieChart />
            </CardContent>
          </Card>
        </div>

        {/* Satisfaction vs Delay Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Satisfaction vs Response Time
            </CardTitle>
            <CardDescription>Analysis of your satisfaction scores relative to response times</CardDescription>
          </CardHeader>
          <CardContent>
            <SatisfactionDelayScatter />
          </CardContent>
        </Card>

        {/* Nearby Businesses */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Businesses in {customerData.location}
            </CardTitle>
            <CardDescription>Discover and connect with trusted businesses in your area</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {nearbyBusinesses.map((business) => (
                <Card key={business.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleBusinessClick(business)}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{business.name}</h3>
                        <p className="text-sm text-gray-600">{business.category}</p>
                      </div>
                      <Badge variant="outline">{business.location}</Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{business.avgRating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{business.totalCustomers}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Shield className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium text-blue-600">{business.trustScore}</span>
                      </div>
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Business Detail Modal */}
        <Modal 
          isOpen={showBusinessModal} 
          onClose={() => setShowBusinessModal(false)}
          title={selectedBusiness?.name}
          size="lg"
        >
          {selectedBusiness && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Business Info */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Business Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Building className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Category</p>
                        <p className="font-medium">{selectedBusiness.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Location</p>
                        <p className="font-medium">{selectedBusiness.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Total Customers</p>
                        <p className="font-medium">{selectedBusiness.totalCustomers.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Average Order Value</p>
                        <p className="font-medium">₹{selectedBusiness.avgOrderValue.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trust & Performance */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Trust & Performance</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-500" />
                        <span className="text-sm text-gray-600">Rating</span>
                      </div>
                      <span className="font-semibold">{selectedBusiness.avgRating}/5.0</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-blue-500" />
                        <span className="text-sm text-gray-600">Trust Score</span>
                      </div>
                      <span className="font-semibold">{selectedBusiness.trustScore}/100</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-green-500" />
                        <span className="text-sm text-gray-600">Response Rate</span>
                      </div>
                      <span className="font-semibold">{(selectedBusiness.responseRate * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-purple-500" />
                        <span className="text-sm text-gray-600">Monthly Growth</span>
                      </div>
                      <span className="font-semibold">{selectedBusiness.monthlyGrowth > 0 ? '+' : ''}{selectedBusiness.monthlyGrowth}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Relationship Score */}
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <h4 className="font-semibold mb-2">Your Relationship Score</h4>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-blue-600">
                    {calculateRelationshipScore(customerData.trustScore, selectedBusiness.trustScore)}
                  </span>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Based on your trust score and business reputation</p>
                  </div>
                </div>
              </div>

              {/* Sample Reviews */}
              <div className="mt-6">
                <h4 className="font-semibold mb-3">Recent Reviews</h4>
                <div className="space-y-3">
                  {[
                    { name: "Amit Kumar", rating: 5, comment: "Excellent service and quality!" },
                    { name: "Sneha Reddy", rating: 4, comment: "Good experience, will visit again." },
                    { name: "Rohit Sharma", rating: 5, comment: "Professional and trustworthy." }
                  ].map((review, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{review.name}</span>
                        <div className="flex">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-yellow-500 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex gap-3">
                <Button className="flex-1">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact
                </Button>
                <Button variant="outline" className="flex-1">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Purchase
                </Button>
                <Button variant="outline" className="flex-1">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Review
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  )
}