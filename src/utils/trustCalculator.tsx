export const calculateCustomerTrust = (customer: any) => {
  const avgRating = customer.avgRating || 4.0
  const repeatVisits = customer.repeatVisits || 5
  const noComplaints = customer.noComplaints ? 1 : 0
  const responseTimeScore = customer.responseTimeScore || 3

  const trustScore = Math.round(
    (avgRating * 0.4 * 20) + 
    (repeatVisits * 0.3 * 5) + 
    (noComplaints * 0.2 * 100) + 
    (responseTimeScore * 0.1 * 20)
  )

  return Math.min(100, Math.max(0, trustScore))
}

export const calculateBusinessTrust = (business: any) => {
  const avgCustomerTrust = business.avgCustomerTrust || 75
  const avgRating = business.avgRating || 4.0
  const responseRate = business.responseRate || 0.9

  const trustScore = Math.round(
    (avgCustomerTrust * 0.5) + 
    (avgRating * 0.3 * 20) + 
    (responseRate * 0.3 * 100)
  )

  return Math.min(100, Math.max(0, trustScore))
}

export const getTrustLevel = (score: number) => {
  if (score >= 80) return 'Excellent'
  if (score >= 60) return 'Good'
  if (score >= 40) return 'Fair'
  return 'Poor'
}

export const getTrustColor = (score: number) => {
  if (score >= 80) return 'text-green-600'
  if (score >= 60) return 'text-yellow-600'
  if (score >= 40) return 'text-orange-600'
  return 'text-red-600'
}