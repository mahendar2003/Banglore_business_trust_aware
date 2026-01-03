import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Users, BarChart3, MapPin, Shield, TrendingUp, Award } from 'lucide-react'

interface HomepageProps {
  onGetStarted: () => void
}

export function Homepage({ onGetStarted }: HomepageProps) {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Trust-Aware Intelligence for<br />Bangalore Businesses
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Build stronger customer relationships with transparent trust scoring, 
            relationship analytics, and location-based insights tailored for Bangalore's dynamic market.
          </p>
          <Button onClick={onGetStarted} size="lg" className="text-lg px-8 py-3">
            Get Started Free
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          How TrustScore Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle>Trust Score</CardTitle>
              <CardDescription>
                How reliable is a customer or business? Calculated from reviews, 
                delays, and interactions using transparent algorithms.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600">
                Score: 0-100<br />
                Factors: Rating, Visits, Complaints, Response Time
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle>Relationship Score</CardTitle>
              <CardDescription>
                How strong is the bond between you and your customers? 
                Based on repeat visits, ratings, and trust alignment.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600">
                Formula: 40% Customer Trust + 60% Business Trust<br />
                Updates: Real-time with each interaction
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle>Bangalore Focused</CardTitle>
              <CardDescription>
                Data powered by real patterns from Whitefield, BTM, Indiranagar, 
                and 5+ major Bangalore areas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600">
                Coverage: 8 Major Areas<br />
                Insights: Location-specific trends and opportunities
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose TrustScore?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Increase Retention</h3>
              <p className="text-sm text-gray-600">
                Identify at-risk customers and improve relationships proactively
              </p>
            </div>
            <div className="text-center">
              <Award className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Build Reputation</h3>
              <p className="text-sm text-gray-600">
                Showcase your trust scores to attract quality customers
              </p>
            </div>
            <div className="text-center">
              <BarChart3 className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Data-Driven</h3>
              <p className="text-sm text-gray-600">
                Make decisions based on real interaction patterns and trends
              </p>
            </div>
            <div className="text-center">
              <Shield className="w-8 h-8 text-orange-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Reduce Risk</h3>
              <p className="text-sm text-gray-600">
                Flag high-risk relationships before they impact your business
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Build Trust in Bangalore?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of businesses and customers creating transparent relationships
          </p>
          <Button onClick={onGetStarted} size="lg" variant="secondary" className="text-lg px-8 py-3">
            Start Your Journey
          </Button>
        </div>
      </div>
    </div>
  )
}