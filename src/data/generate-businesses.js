// This script generates 8,000 businesses (1,000 per location)
const fs = require('fs')

const businessNames = [
  'Blue Moon', 'Green Leaf', 'TechFix', 'FitZone', 'Style Studio', 'Quick Mart', 'Food Palace', 'Health Plus',
  'Smart Solutions', 'Urban Café', 'Digital Hub', 'Fresh Market', 'Wellness Center', 'Creative Space', 'Metro Store',
  'Golden Gate', 'Silver Spoon', 'Crimson Tech', 'Emerald Gardens', 'Royal Services', 'Prime Time', 'Elite Club',
  'Grand Plaza', 'Super Mart', 'Happy Hours', 'Bright Future', 'Next Gen', 'Pro Services', 'Star Quality', 'Top Choice'
]

const categories = [
  'Restaurant', 'Retail', 'Electronics Repair', 'Grocery Store', 'Fitness', 'Salon', 
  'Healthcare', 'Education', 'Professional Services', 'Entertainment'
]

const locations = ['Whitefield', 'Indiranagar', 'Yelahanka', 'Electronic City', 'BTM Layout', 'KR Puram', 'Marathahalli', 'HSR Layout']

function generateBusiness(locationId, businessId) {
  const location = locations[locationId]
  const namePrefix = businessNames[Math.floor(Math.random() * businessNames.length)]
  const category = categories[Math.floor(Math.random() * categories.length)]
  const suffixes = ['Café', 'Store', 'Center', 'Services', 'Solutions', 'Studio', 'Mart', 'Hub', 'Zone', 'Plus']
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)]
  
  return {
    id: `biz_${String(locationId + 1).padStart(2, '0')}${String(businessId).padStart(4, '0')}`,
    name: `${namePrefix} ${suffix}`,
    category,
    location,
    avgRating: Math.round((Math.random() * 2 + 3) * 10) / 10, // 3.0 to 5.0
    customerCount: Math.floor(Math.random() * 900) + 100, // 100 to 1000
    avgCustomerTrust: Math.floor(Math.random() * 40) + 60, // 60 to 100
    responseRate: Math.floor(Math.random() * 30) + 70, // 70 to 100
    description: `Leading ${category.toLowerCase()} in ${location} providing quality services and products to the community.`,
    reviews: generateReviews()
  }
}

function generateReviews() {
  const reviewCount = Math.floor(Math.random() * 5) + 3
  const reviews = []
  const customerNames = ['Priya Sharma', 'Rahul Kumar', 'Anjali Nair', 'Vikram Singh', 'Meera Patel']
  
  for (let i = 0; i < reviewCount; i++) {
    const comments = [
      'Excellent service and quality!',
      'Good value for money',
      'Professional and reliable',
      'Highly recommended',
      'Great experience overall',
      'Could be better in some areas',
      'Satisfied with the service',
      'Will definitely come back'
    ]
    
    reviews.push({
      customer: customerNames[Math.floor(Math.random() * customerNames.length)],
      rating: Math.floor(Math.random() * 2) + 3, // 3 to 5
      comment: comments[Math.floor(Math.random() * comments.length)]
    })
  }
  
  return reviews
}

const businesses = []
for (let locationId = 0; locationId < locations.length; locationId++) {
  for (let businessId = 1; businessId <= 1000; businessId++) {
    businesses.push(generateBusiness(locationId, businessId))
  }
}

fs.writeFileSync('./src/data/businesses.json', JSON.stringify(businesses, null, 2))
console.log('Generated 8,000 businesses (1,000 per location)')