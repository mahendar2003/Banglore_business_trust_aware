// Custom data generator without external dependencies

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

const CUSTOMER_SEGMENTS = ['New', 'Loyal', 'At Risk', 'VIP', 'Inactive']
const LOYALTY_LEVELS = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond']
const RISK_LEVELS = ['Low', 'Medium', 'High', 'Critical']

// Sample data pools for realistic generation
const FIRST_NAMES = [
  'Priya', 'Rahul', 'Anita', 'Vikram', 'Sneha', 'Rohit', 'Kavita', 'Amit', 'Neha', 'Karan',
  'Divya', 'Arjun', 'Pooja', 'Raj', 'Meera', 'Aditya', 'Swati', 'Manish', 'Rashmi', 'Vivek',
  'Anjali', 'Suresh', 'Kirti', 'Deepak', 'Shweta', 'Ravi', 'Nisha', 'Alok', 'Pallavi', 'Mohan',
  'Rashmi', 'Sanjay', 'Komal', 'Vikas', 'Richa', 'Avinash', 'Sonia', 'Pradeep', 'Ankita', 'Tarun',
  'Madhuri', 'Harish', 'Geeta', 'Vinod', 'Sunita', 'Ramesh', 'Kavita', 'Anand', 'Preeti', 'Suresh'
]

const LAST_NAMES = [
  'Sharma', 'Kumar', 'Reddy', 'Singh', 'Patel', 'Gupta', 'Jain', 'Agarwal', 'Mishra', 'Verma',
  'Kapoor', 'Malhotra', 'Chopra', 'Khanna', 'Bansal', 'Saxena', 'Joshi', 'Nair', 'Menon', 'Iyer',
  'Pillai', 'Narayan', 'Krishnan', 'Mohan', 'Bhat', 'Rao', 'Murthy', 'Gopal', 'Shankar', 'Venkat',
  'Chandra', 'Madhav', 'Anand', 'Prasad', 'Babu', 'Swamy', 'Kumar', 'Das', 'Sen', 'Roy'
]

const BUSINESS_NAMES = [
  'Blue', 'Green', 'Red', 'Golden', 'Silver', 'Royal', 'Grand', 'Premium', 'Elite', 'Super',
  'Metro', 'City', 'Urban', 'Global', 'National', 'International', 'Classic', 'Modern', 'Digital', 'Smart'
]

const BUSINESS_SUFFIXES = [
  'Solutions', 'Technologies', 'Services', 'Enterprises', 'Industries', 'Corporation', 'Limited', 'Private Limited',
  'Hub', 'Center', 'Point', 'Zone', 'Square', 'Plaza', 'Complex', 'Tower', 'Park', 'Garden'
]

// Utility functions
function randomChoice<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomFloat(min: number, max: number, decimals: number = 1): number {
  return Number((Math.random() * (max - min) + min).toFixed(decimals))
}

function randomDate(daysAgo: number): string {
  const date = new Date()
  date.setDate(date.getDate() - randomNumber(0, daysAgo))
  return date.toISOString().split('T')[0]
}

function generateEmail(name: string): string {
  const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'email.com']
  const cleanName = name.toLowerCase().replace(' ', '.')
  return `${cleanName}${randomNumber(1, 999)}@${randomChoice(domains)}`
}

function generateFullName(): string {
  return `${randomChoice(FIRST_NAMES)} ${randomChoice(LAST_NAMES)}`
}

function generateBusinessName(category: string): string {
  const prefix = randomChoice(BUSINESS_NAMES)
  const suffix = randomChoice(BUSINESS_SUFFIXES)
  return `${prefix} ${category} ${suffix}`
}

// Data generation functions
export function generateCustomers(count: number = 50000) {
  const customers = []
  
  for (let i = 0; i < count; i++) {
    const name = generateFullName()
    const location = randomChoice(BANGALORE_AREAS)
    const avgRating = randomFloat(1, 5, 1)
    const repeatVisits = randomNumber(0, 50)
    const noComplaints = Math.random() > 0.3
    const responseTimeScore = randomNumber(1, 5)
    const totalSpent = randomNumber(5000, 200000)
    const lastPurchase = randomDate(90)
    const loyaltyStatus = randomChoice(LOYALTY_LEVELS)
    const riskLevel = randomChoice(RISK_LEVELS)
    const preferredCategories = BUSINESS_CATEGORIES.slice(0, randomNumber(1, 3))
    const communicationPreference = randomChoice(['email', 'sms', 'whatsapp'])
    const nextPurchasePrediction = randomDate(60)
    
    customers.push({
      id: `cust_${String(i + 1).padStart(6, '0')}`,
      name,
      email: generateEmail(name),
      location,
      avgRating,
      repeatVisits,
      noComplaints,
      responseTimeScore,
      totalSpent,
      lastPurchase,
      loyaltyStatus,
      riskLevel,
      preferredCategories,
      communicationPreference,
      nextPurchasePrediction
    })
  }
  
  return customers
}

export function generateBusinesses(count: number = 8500) {
  const businesses = []
  
  for (let i = 0; i < count; i++) {
    const category = randomChoice(BUSINESS_CATEGORIES)
    const location = randomChoice(BANGALORE_AREAS)
    const avgRating = randomFloat(1, 5, 1)
    const totalCustomers = randomNumber(100, 5000)
    const responseRate = randomFloat(0.5, 1, 2)
    const trustScore = randomNumber(60, 100)
    const revenue = randomNumber(500000, 10000000)
    const employeeCount = randomNumber(5, 100)
    const yearsInBusiness = randomNumber(1, 20)
    const customerSatisfaction = randomFloat(3, 5, 1)
    const avgOrderValue = randomNumber(500, 10000)
    const monthlyGrowth = randomFloat(-5, 25, 1)
    
    businesses.push({
      id: `biz_${String(i + 1).padStart(6, '0')}`,
      name: generateBusinessName(category),
      category,
      location,
      avgRating,
      totalCustomers,
      responseRate,
      trustScore,
      revenue,
      employeeCount,
      yearsInBusiness,
      customerSatisfaction,
      avgOrderValue,
      monthlyGrowth
    })
  }
  
  return businesses
}

export function generatePotentialBusinesses(count: number = 5000) {
  const opportunities = []
  
  for (let i = 0; i < count; i++) {
    const category = randomChoice(BUSINESS_CATEGORIES)
    const location = randomChoice(BANGALORE_AREAS)
    const marketDemand = randomChoice(['High', 'Medium', 'Low'])
    const competition = randomChoice(['Low', 'Medium', 'High'])
    const estimatedTrust = randomNumber(65, 95)
    const startupCost = randomNumber(200000, 2000000)
    const expectedRevenue = randomNumber(500000, 5000000)
    const timeToProfit = randomNumber(3, 18)
    const marketSize = randomNumber(5000, 50000)
    const growthRate = randomNumber(5, 25)
    
    opportunities.push({
      id: `pot_${String(i + 1).padStart(6, '0')}`,
      category,
      location,
      marketDemand,
      competition,
      estimatedTrust,
      startupCost,
      expectedRevenue,
      timeToProfit,
      marketSize,
      growthRate
    })
  }
  
  return opportunities
}

// Generate and export the datasets
export const customersData = generateCustomers(50000)
export const businessesData = generateBusinesses(8500)
export const potentialBusinessesData = generatePotentialBusinesses(5000)

// Export sample data for immediate use
export const sampleCustomers = customersData.slice(0, 100)
export const sampleBusinesses = businessesData.slice(0, 50)
export const samplePotentialBusinesses = potentialBusinessesData.slice(0, 30)