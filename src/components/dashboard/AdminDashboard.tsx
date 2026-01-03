import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { calculateCustomerTrust, calculateBusinessTrust, getTrustLevel } from '../../utils/trustCalculator'
import customersData from '../../data/customers.json'
import businessesData from '../../data/businesses.json'
import { Shield, AlertTriangle, TrendingUp, MapPin, Users, Building } from 'lucide-react'

export function AdminDashboard({ user }: any) {
  const [customers, setCustomers] = useState<any[]>([])
  const [businesses, setBusinesses] = useState<any[]>([])
  const [filterLocation, setFilterLocation] = useState<string>('all')
  const [filterTrust, setFilterTrust] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Load and process data
    const processedCustomers = customersData.map(c => ({
      ...c,
      trustScore: calculateCustomerTrust(c)
    }))
    const processedBusinesses = businessesData.map(b => ({
      ...b,
      trustScore: calculateBusinessTrust(b)
    }))
    
    setCustomers(processedCustomers)
    setBusinesses(processedBusinesses)
  }, [])

  const locations = ['all', 'Whitefield', 'Indiranagar', 'BTM Layout', 'Electronic City', 'HSR Layout', 'KR Puram', 'Marathahalli', 'Yelahanka']

  // Calculate location-based trust scores
  const locationTrustData = locations.slice(1).map(location => {
    const locationCustomers = customers.filter(c => c.location === location)
    const locationBusinesses = businesses.filter(b => b.location === location)
    const avgTrust = locationCustomers.length > 0 
      ? (locationCustomers.reduce((acc, c) => acc + c.trustScore, 0) / locationCustomers.length)
      : 0
    return { location, avgTrust: Math.round(avgTrust) }
  })

  // High-risk relationships
  const highRiskRelationships = customers
    .filter(c => c.trustScore < 30)
    .map(customer => {
      const business = businesses[0] // Simulate relationship with first business
      return {
        customer,
        business,
        risk: 'High'
      }
    })

  // Top trusted businesses
  const topBusinesses = [...businesses]
    .sort((a, b) => b.trustScore - a.trustScore)
    .slice(0, 5)

  const getHeatmapColor = (score: number) => {
    if (score >= 80) return 'bg-green-500'
    if (score >= 60) return 'bg-blue-500'
    if (score >= 40) return 'bg-yellow-500'
    if (score >= 20) return 'bg-orange-500'
    return 'bg-red-500'
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Admin Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Platform-wide trust analytics and risk management</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-gray-500" />
              <span className="text-2xl font-bold">{customers.length}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Businesses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Building className="w-5 h-5 text-gray-500" />
              <span className="text-2xl font-bold">{businesses.length}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Platform Trust</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">High Risk Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <span className="text-2xl font-bold text-red-600">{highRiskRelationships.length}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Location Trust Heatmap */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>Trust Score by Location</span>
          </CardTitle>
          <CardDescription>Average trust scores across Bangalore areas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {locationTrustData.map(({ location, avgTrust }) => (
              <div key={location} className="text-center">
                <div className={`w-full h-20 rounded-lg ${getHeatmapColor(avgTrust)} flex items-center justify-center mb-2`}>
                  <span className="text-white font-bold text-xl">{avgTrust}</span>
                </div>
                <p className="text-sm font-medium">{location}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* High Risk Relationships */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <span>High-Risk Relationships</span>
          </CardTitle>
          <CardDescription>Customers with very low trust scores</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {highRiskRelationships.map((rel, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-red-200 bg-red-50 rounded-lg">
                <div>
                  <div className="font-medium">{rel.customer.name}</div>
                  <div className="text-sm text-gray-600">{rel.customer.location}</div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm font-medium text-red-600">Trust: {rel.customer.trustScore}</div>
                    <div className="text-xs text-gray-600">vs Business: {rel.business.trustScore}</div>
                  </div>
                  <Badge variant="destructive">High Risk</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Trusted Businesses */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-green-600" />
            <span>Top Trusted Businesses</span>
          </CardTitle>
          <CardDescription>Highest performing businesses by trust score</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topBusinesses.map((business, index) => {
              const trustLevel = getTrustLevel(business.trustScore)
              return (
                <div key={business.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <div className="font-medium">{business.name}</div>
                      <div className="text-sm text-gray-600">{business.category} • {business.location}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm font-medium">Trust: {business.trustScore}</div>
                      <div className="flex items-center">
                        <span className="text-sm mr-1">Rating:</span>
                        <span className="text-sm">{business.avgRating}</span>
                      </div>
                    </div>
                    <Badge className={trustLevel.color}>{trustLevel.level}</Badge>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Explainable Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span>Explainable Insights</span>
          </CardTitle>
          <CardDescription>AI-driven explanations for trust patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Low Trust in Electronic City</h4>
              <p className="text-sm text-blue-800">
                Linked to delivery delays exceeding 48 hours (73% of complaints). 
                Recommend implementing express delivery options to improve trust scores by an estimated +15 points.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">High Performance in BTM Layout</h4>
              <p className="text-sm text-green-800">
                Businesses show 22% higher trust scores due to quick response times (avg 2.3 hours). 
                This pattern can be replicated in other areas through similar operational improvements.
              </p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-semibold text-yellow-900 mb-2">Customer Segment Analysis</h4>
              <p className="text-sm text-yellow-800">
                "At-risk" customers (35% of base) show declining trust scores over 3 months. 
                Proactive engagement could retain 60% of this segment with targeted trust-building initiatives.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}