export interface CustomerTrustData {
  avgRating: number
  repeatVisits: number
  noComplaints: boolean
  responseTimeScore: number
}

export interface BusinessTrustData {
  avgCustomerTrust: number
  avgRating: number
  responseRate: number
}

export const calculateCustomerTrust = (data: CustomerTrustData): number => {
  const ratingScore = (data.avgRating / 5) * 40
  const visitScore = Math.min(data.repeatVisits * 3, 30)
  const complaintScore = data.noComplaints ? 20 : 0
  const responseScore = (data.responseTimeScore / 5) * 10
  
  return Math.round(ratingScore + visitScore + complaintScore + responseScore)
}

export const calculateBusinessTrust = (data: BusinessTrustData): number => {
  const customerTrustScore = (data.avgCustomerTrust / 100) * 50
  const ratingScore = (data.avgRating / 5) * 30
  const responseScore = (data.responseRate / 100) * 20
  
  return Math.round(customerTrustScore + ratingScore + responseScore)
}

export const calculateRelationshipScore = (customerTrust: number, businessTrust: number): number => {
  return Math.round(customerTrust * 0.4 + businessTrust * 0.6)
}

export const getTrustLevel = (score: number): { level: string; color: string } => {
  if (score >= 80) return { level: 'Excellent', color: 'text-green-600' }
  if (score >= 60) return { level: 'Good', color: 'text-blue-600' }
  if (score >= 40) return { level: 'Average', color: 'text-yellow-600' }
  if (score >= 20) return { level: 'Poor', color: 'text-orange-600' }
  return { level: 'Very Poor', color: 'text-red-600' }
}