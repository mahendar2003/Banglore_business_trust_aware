import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Star, MapPin, Users } from 'lucide-react'
import { calculateBusinessTrust, getTrustLevel } from '../../utils/trustCalculator'

interface BusinessCardProps {
  business: any
  onClick: () => void
}

export function BusinessCard({ business, onClick }: BusinessCardProps) {
  const trustScore = calculateBusinessTrust(business)
  const trustLevel = getTrustLevel(trustScore)

  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={onClick}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{business.name}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              {business.location}
            </CardDescription>
          </div>
          <Badge variant="secondary">{business.category}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="font-semibold">{business.avgRating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">{business.customerCount} customers</span>
            </div>
          </div>
          
          <div className="border-t pt-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Trust Score</span>
              <div className="flex items-center space-x-2">
                <span className="font-bold">{trustScore}</span>
                <Badge className={`text-xs ${trustLevel.color}`}>{trustLevel.level}</Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}