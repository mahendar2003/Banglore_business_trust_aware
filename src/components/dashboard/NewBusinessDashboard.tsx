import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select'
import { 
  TrendingUp, 
  Users, 
  MapPin, 
  Star, 
  AlertTriangle, 
  Lightbulb, 
  DollarSign,
  Building,
  Package,
  Clock,
  BarChart3,
  Target,
  Shield,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  Eye,
  TrendingDown,
  Zap,
  Award,
  Globe,
  Heart
} from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/Dialog'

interface NewBusinessDashboardProps {
  user: any
}

interface MarketOpportunity {
  id: string
  category: string
  area: string
  demand: 'High' | 'Medium' | 'Low'
  competition: 'Low' | 'Medium' | 'High'
  expectedTrust: number
  expectedRevenue: number
  investmentRequired: number
  timeToProfit: number
  riskLevel: 'Low' | 'Medium' | 'High'
  description: string
  keyFactors: string[]
  marketSize: number
  growthRate: number
}

interface AreaAnalysis {
  area: string
  totalBusinesses: number
  avgTrustScore: number
  avgRevenue: number
  topCategories: string[]
  opportunities: number
  challenges: string[]
}

const BANGALORE_AREAS = [
  'Whitefield',
  'Indiranagar', 
  'Yelahanka',
  'Electronic City',
  'BTM Layout',
  'KR Puram',
  'Marathahalli',
  'HSR Layout'
]

const BUSINESS_CATEGORIES = [
  'Restaurant',
  'Cafe',
  'Retail',
  'Services',
  'Technology',
  'Healthcare',
  'Education',
  'Entertainment',
  'Fitness',
  'Beauty & Wellness'
]

export function NewBusinessDashboard({ user }: NewBusinessDashboardProps) {
  const [selectedArea, setSelectedArea] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [marketOpportunities, setMarketOpportunities] = useState<MarketOpportunity[]>([])
  const [areaAnalysis, setAreaAnalysis] = useState<AreaAnalysis[]>([])
  const [selectedOpportunity, setSelectedOpportunity] = useState<MarketOpportunity | null>(null)

  useEffect(() => {
    // Generate market opportunities
    const opportunities: MarketOpportunity[] = []
    
    BANGALORE_AREAS.forEach(area => {
      BUSINESS_CATEGORIES.forEach(category => {
        const demand = ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)] as 'High' | 'Medium' | 'Low'
        const competition = ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)] as 'Low' | 'Medium' | 'High'
        const expectedTrust = Math.floor(Math.random() * 30) + 60
        const expectedRevenue = Math.floor(Math.random() * 1000000) + 200000
        const investmentRequired = Math.floor(Math.random() * 500000) + 100000
        const timeToProfit = Math.floor(Math.random() * 12) + 6
        const riskLevel = expectedTrust > 80 ? 'Low' : expectedTrust > 65 ? 'Medium' : 'High'
        
        opportunities.push({
          id: `${area}-${category}`,
          category,
          area,
          demand,
          competition,
          expectedTrust,
          expectedRevenue,
          investmentRequired,
          timeToProfit,
          riskLevel,
          description: `Promising ${category.toLowerCase()} opportunity in ${area} with strong market potential`,
          keyFactors: [
            'Growing population',
            'High disposable income',
            'Limited competition',
            'Favorable demographics'
          ].slice(0, Math.floor(Math.random() * 3) + 2),
          marketSize: Math.floor(Math.random() * 50000) + 10000,
          growthRate: Math.floor(Math.random() * 20) + 5
        })
      })
    })
    
    setMarketOpportunities(opportunities)

    // Generate area analysis
    const analysis: AreaAnalysis[] = BANGALORE_AREAS.map(area => ({
      area,
      totalBusinesses: Math.floor(Math.random() * 500) + 100,
      avgTrustScore: Math.floor(Math.random() * 20) + 70,
      avgRevenue: Math.floor(Math.random() * 500000) + 100000,
      topCategories: BUSINESS_CATEGORIES.slice(0, Math.floor(Math.random() * 4) + 2),
      opportunities: Math.floor(Math.random() * 20) + 5,
      challenges: [
        'High rental costs',
        'Talent shortage',
        'Regulatory hurdles',
        'Infrastructure issues'
      ].slice(0, Math.floor(Math.random() * 2) + 1)
    }))
    
    setAreaAnalysis(analysis)
  }, [])

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'High': return 'bg-green-100 text-green-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-red-100 text-red-800'
    }
  }

  const getCompetitionColor = (competition: string) => {
    switch (competition) {
      case 'Low': return 'bg-green-100 text-green-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-red-100 text-red-800'
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-100 text-green-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-red-100 text-red-800'
    }
  }

  const filteredOpportunities = marketOpportunities.filter(opp => {
    if (selectedArea && opp.area !== selectedArea) return false
    if (selectedCategory && opp.category !== selectedCategory) return false
    return true
  }).sort((a, b) => {
    // Sort by opportunity score (demand + low competition + high trust)
    const scoreA = (a.demand === 'High' ? 3 : a.demand === 'Medium' ? 2 : 1) + 
                   (a.competition === 'Low' ? 3 : a.competition === 'Medium' ? 2 : 1) + 
                   (a.expectedTrust / 20)
    const scoreB = (b.demand === 'High' ? 3 : b.demand === 'Medium' ? 2 : 1) + 
                   (b.competition === 'Low' ? 3 : b.competition === 'Medium' ? 2 : 1) + 
                   (b.expectedTrust / 20)
    return scoreB - scoreA
  })

  const topOpportunities = filteredOpportunities.slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Business Opportunity Dashboard</h1>
        <p className="text-blue-100">
          Discover profitable business opportunities across Bangalore with AI-powered market analysis
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Market Filters
          </CardTitle>
          <CardDescription>Filter opportunities by area and business category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Select Area</label>
              <Select value={selectedArea} onValueChange={setSelectedArea}>
                <SelectTrigger>
                  <SelectValue placeholder="All Areas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Areas</SelectItem>
                  {BANGALORE_AREAS.map(area => (
                    <SelectItem key={area} value={area}>{area}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Select Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {BUSINESS_CATEGORIES.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Top Business Opportunities
          </CardTitle>
          <CardDescription>Best opportunities based on market analysis and trust predictions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topOpportunities.map((opportunity, index) => (
              <div
                key={opportunity.id}
                onClick={() => setSelectedOpportunity(opportunity)}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-semibold">{opportunity.category}</div>
                    <div className="text-sm text-gray-600 flex items-center gap-2">
                      <MapPin className="w-3 h-3" />
                      {opportunity.area}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <Badge className={getDemandColor(opportunity.demand)}>
                      {opportunity.demand} Demand
                    </Badge>
                    <Badge className={getCompetitionColor(opportunity.competition)}>
                      {opportunity.competition} Competition
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">₹{(opportunity.expectedRevenue / 100000).toFixed(1)}L</div>
                    <div className="text-xs text-gray-600">Expected Revenue</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Area Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Area Market Analysis
            </CardTitle>
            <CardDescription>Business landscape across Bangalore areas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {areaAnalysis.map((area) => (
                <div key={area.area} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{area.area}</h4>
                    <Badge className="bg-blue-100 text-blue-800">
                      {area.opportunities} Opportunities
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Businesses:</span>
                      <span className="font-medium ml-2">{area.totalBusinesses}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Avg Trust:</span>
                      <span className="font-medium ml-2">{area.avgTrustScore}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Avg Revenue:</span>
                      <span className="font-medium ml-2">₹{(area.avgRevenue / 100000).toFixed(1)}L</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Top Categories:</span>
                      <span className="font-medium ml-2">{area.topCategories.slice(0, 2).join(', ')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Market Insights
            </CardTitle>
            <CardDescription>Key trends and recommendations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-1">High Growth Sectors</h4>
              <p className="text-sm text-green-700">
                Technology services and healthcare showing 25%+ growth in Whitefield and Electronic City
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-1">Low Competition Areas</h4>
              <p className="text-sm text-blue-700">
                Yelahanka and KR Puram have untapped potential in fitness and wellness categories
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-1">Investment Sweet Spot</h4>
              <p className="text-sm text-purple-700">
                Cafes in HSR Layout and BTM showing highest ROI with moderate investment
              </p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <h4 className="font-semibold text-orange-900 mb-1">Trust Advantage</h4>
              <p className="text-sm text-orange-700">
                Businesses in Indiranagar achieve trust scores 15% above city average
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Opportunity Detail Modal */}
      <Dialog open={!!selectedOpportunity} onOpenChange={() => setSelectedOpportunity(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Business Opportunity Details
            </DialogTitle>
          </DialogHeader>
          
          {selectedOpportunity && (
            <div className="space-y-6">
              {/* Opportunity Header */}
              <div className="flex items-center gap-4 pb-4 border-b">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                  <Building className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{selectedOpportunity.category}</h3>
                  <p className="text-gray-600 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {selectedOpportunity.area}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className={getDemandColor(selectedOpportunity.demand)}>
                      {selectedOpportunity.demand} Demand
                    </Badge>
                    <Badge className={getCompetitionColor(selectedOpportunity.competition)}>
                      {selectedOpportunity.competition} Competition
                    </Badge>
                    <Badge className={getRiskColor(selectedOpportunity.riskLevel)}>
                      {selectedOpportunity.riskLevel} Risk
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <div>
                        <div className="text-xs text-gray-600">Expected Revenue</div>
                        <div className="font-semibold">₹{(selectedOpportunity.expectedRevenue / 100000).toFixed(1)}L/year</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-blue-600" />
                      <div>
                        <div className="text-xs text-gray-600">Investment Required</div>
                        <div className="font-semibold">₹{(selectedOpportunity.investmentRequired / 100000).toFixed(1)}L</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-purple-600" />
                      <div>
                        <div className="text-xs text-gray-600">Time to Profit</div>
                        <div className="font-semibold">{selectedOpportunity.timeToProfit} months</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-orange-600" />
                      <div>
                        <div className="text-xs text-gray-600">Expected Trust Score</div>
                        <div className="font-semibold">{selectedOpportunity.expectedTrust}/100</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Market Analysis</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Market Size</span>
                      <span className="font-medium">{selectedOpportunity.marketSize.toLocaleString()} customers</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Growth Rate</span>
                      <span className="font-medium">{selectedOpportunity.growthRate}% annually</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">ROI Potential</span>
                      <span className="font-medium">{Math.floor((selectedOpportunity.expectedRevenue / selectedOpportunity.investmentRequired) * 100)}%</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Break-even Point</span>
                      <span className="font-medium">{Math.floor(selectedOpportunity.investmentRequired / (selectedOpportunity.expectedRevenue / 12))} months</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Success Factors</h4>
                  <div className="space-y-2">
                    {selectedOpportunity.keyFactors.map((factor, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm">{factor}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* AI Recommendations */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  AI Recommendations
                </h4>
                <div className="space-y-2 text-sm text-blue-800">
                  <p>• Start with a pilot operation to test market response before full investment</p>
                  <p>• Focus on building trust from day one to achieve above-average customer retention</p>
                  <p>• Leverage digital marketing to reach the {selectedOpportunity.marketSize.toLocaleString()} potential customers</p>
                  <p>• Consider partnerships with existing businesses to reduce initial costs</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <Button className="flex-1">
                  <Eye className="w-4 h-4 mr-2" />
                  View Detailed Report
                </Button>
                <Button variant="outline" className="flex-1">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Compare Opportunities
                </Button>
                <Button variant="outline" className="flex-1">
                  <Target className="w-4 h-4 mr-2" />
                  Create Business Plan
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Total Opportunities</CardTitle>
            <Target className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{filteredOpportunities.length}</div>
            <p className="text-xs text-green-600">Across all areas</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">High Demand</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">
              {filteredOpportunities.filter(o => o.demand === 'High').length}
            </div>
            <p className="text-xs text-blue-600">Opportunities</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">Low Competition</CardTitle>
            <Award className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">
              {filteredOpportunities.filter(o => o.competition === 'Low').length}
            </div>
            <p className="text-xs text-purple-600">Market gaps</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">Avg. Trust Score</CardTitle>
            <Shield className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">
              {filteredOpportunities.length > 0 
                ? Math.floor(filteredOpportunities.reduce((acc, o) => acc + o.expectedTrust, 0) / filteredOpportunities.length)
                : 0}
            </div>
            <p className="text-xs text-orange-600">Expected score</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Add CheckCircle import
import { CheckCircle } from 'lucide-react'