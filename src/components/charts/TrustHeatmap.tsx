import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'

interface TrustHeatmapProps {
  data?: any[]
}

export function TrustHeatmap({ data }: TrustHeatmapProps) {
  // Default Bangalore area data
  const areaData = [
    { area: 'Whitefield', trust: 85, businesses: 1200, trend: 'up' },
    { area: 'Indiranagar', trust: 78, businesses: 980, trend: 'stable' },
    { area: 'Yelahanka', trust: 72, businesses: 750, trend: 'down' },
    { area: 'Electronic City', trust: 68, businesses: 1100, trend: 'up' },
    { area: 'BTM Layout', trust: 75, businesses: 890, trend: 'stable' },
    { area: 'KR Puram', trust: 70, businesses: 650, trend: 'up' },
    { area: 'Marathahalli', trust: 73, businesses: 920, trend: 'stable' },
    { area: 'HSR Layout', trust: 80, businesses: 780, trend: 'up' }
  ]

  const getTrustColor = (score: number) => {
    if (score >= 80) return 'bg-green-500'
    if (score >= 70) return 'bg-yellow-500'
    if (score >= 60) return 'bg-orange-500'
    return 'bg-red-500'
  }

  const getTrustTextColor = (score: number) => {
    if (score >= 80) return 'text-green-700'
    if (score >= 70) return 'text-yellow-700'
    if (score >= 60) return 'text-orange-700'
    return 'text-red-700'
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗'
      case 'down': return '↘'
      default: return '→'
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {areaData.map((area, index) => (
          <div key={index} className="relative">
            <div className={`p-6 rounded-lg ${getTrustColor(area.trustScore)} bg-opacity-20 border-2 border-opacity-30 ${getTrustTextColor(area.trustScore)}`}>
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">{area.trust}</div>
                <div className="text-sm font-medium mb-2">{area.area}</div>
                <div className="text-xs opacity-75">{area.businesses} businesses</div>
                <div className="text-lg mt-2">{getTrendIcon(area.trend)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex items-center justify-center gap-6 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-sm text-gray-600">High Trust (80+)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span className="text-sm text-gray-600">Good Trust (70-79)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-500 rounded"></div>
          <span className="text-sm text-gray-600">Moderate Trust (60-69)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="text-sm text-gray-600">Low Trust (&lt;60)</span>
        </div>
      </div>
    </div>
  )
}