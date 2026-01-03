import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Users, BarChart3, MapPin, Star, Shield, TrendingUp, ArrowRight } from 'lucide-react'

interface HomepageProps {
  onGetStarted: () => void
}

export function Homepage({ onGetStarted }: HomepageProps) {
  const features = [
    {
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      title: 'Trust Score',
      description: 'How reliable is a customer or business? Calculated from reviews, delays, and interactions.'
    },
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: 'Relationship Score',
      description: 'How strong is the bond between you and a business? Based on repeat visits and ratings.'
    },
    {
      icon: <MapPin className="w-8 h-8 text-green-500" />,
      title: 'Bangalore Focused',
      description: 'Data powered by real patterns from Whitefield, BTM, Indiranagar, and more.'
    }
  ]

  const stats = [
    { label: 'Active Users', value: '10,000+', icon: Users },
    { label: 'Businesses', value: '1,000+', icon: BarChart3 },
    { label: 'Areas Covered', value: '8', icon: MapPin },
    { label: 'Trust Score', value: '85%', icon: Star }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-800">
            🚀 Now Available in Bangalore
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Trust-Aware Intelligence for<br />
            <span className="text-blue-600">Bangalore Businesses</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Build stronger customer relationships with AI-powered trust scoring. 
            Understand your customers better and grow your business with data-driven insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={onGetStarted} className="text-lg px-8 py-3">
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2">
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose TrustIntel?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform provides comprehensive trust analytics to help you make informed business decisions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Build Trust?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of Bangalore businesses already using TrustIntel to grow their customer relationships.
          </p>
          <Button size="lg" onClick={onGetStarted} variant="secondary" className="text-lg px-8 py-3">
            Start Free Trial
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  )
}