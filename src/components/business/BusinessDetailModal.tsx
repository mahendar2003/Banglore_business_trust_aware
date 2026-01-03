import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { X, Star, MessageSquare, Shield, Heart } from 'lucide-react'
import { calculateBusinessTrust, calculateRelationshipScore, getTrustLevel } from '../../utils/trustCalculator'

interface BusinessDetailModalProps {
  business: any
  customerTrust: number
  onClose: () => void
}

export function BusinessDetailModal({ business, customerTrust, onClose }: BusinessDetailModalProps) {
  const businessTrust = calculateBusinessTrust(business)
  const relationshipScore = calculateRelationshipScore(customerTrust, businessTrust)
  const trustLevel = getTrustLevel(businessTrust)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{business.name}</CardTitle>
              <CardDescription className="flex items-center mt-2">
                <Badge variant="secondary" className="mr-2">{business.category}</Badge>
                <span>{business.location}</span>
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Business Info */}
          <div>
            <h3 className="font-semibold mb-2">About</h3>
            <p className="text-gray-600">{business.description}</p>
          </div>

          {/* Trust Scores */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <Shield className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{businessTrust}</div>
                  <Badge className={`text-xs ${trustLevel.color}`}>{trustLevel.level}</Badge>
                  <p className="text-xs text-gray-600 mt-1">Business Trust</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <Heart className="w-6 h-6 text-red-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{relationshipScore}</div>
                  <p className="text-xs text-gray-600 mt-1">Relationship Score</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{business.avgRating}</div>
                  <p className="text-xs text-gray-600 mt-1">Avg Rating</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reviews */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              Recent Reviews
            </h3>
            <div className="space-y-3">
              {business.reviews.map((review: any, index: number) => (
                <Card key={index}>
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium">{review.customer}</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="ml-1">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4 border-t">
            <Button className="flex-1">Contact Business</Button>
            <Button variant="outline" className="flex-1">Make Purchase</Button>
            <Button variant="outline" className="flex-1">Rate & Review</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}