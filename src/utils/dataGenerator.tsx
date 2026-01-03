export function getLargeCustomerDataset() {
  const firstNames = ['Rahul', 'Priya', 'Amit', 'Sneha', 'Vikram', 'Anjali', 'Rohit', 'Kavita', 'Arjun', 'Meera', 'Karan', 'Neha', 'Aditya', 'Pooja', 'Raj', 'Swati', 'Vivek', 'Divya', 'Manish', 'Rashmi']
  const lastNames = ['Sharma', 'Kumar', 'Singh', 'Patel', 'Reddy', 'Gupta', 'Jain', 'Agarwal', 'Mishra', 'Verma']
  const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com']
  const locations = ['Whitefield', 'Indiranagar', 'Electronic City', 'BTM Layout', 'HSR Layout', 'Yelahanka', 'KR Puram', 'Marathahalli']

  return Array.from({ length: 100 }, (_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const domain = domains[Math.floor(Math.random() * domains.length)]
    const location = locations[Math.floor(Math.random() * locations.length)]
    
    return {
      id: `customer_${i + 1}`,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@${domain}`,
      location,
      avgRating: Math.round((Math.random() * 2 + 3) * 10) / 10,
      repeatVisits: Math.floor(Math.random() * 20),
      noComplaints: Math.random() > 0.3,
      responseTimeScore: Math.floor(Math.random() * 5) + 1,
      trustScore: Math.floor(Math.random() * 40) + 60
    }
  })
}

export function getLargeBusinessDataset() {
  const businessNames = [
    'Tech Solutions Pvt Ltd', 'Digital Marketing Agency', 'Cloud Services Inc',
    'Software Development Co', 'IT Consulting Firm', 'Web Design Studio',
    'Mobile App Developers', 'Data Analytics Company', 'Cybersecurity Experts',
    'AI Solutions Provider'
  ]
  const categories = ['Technology', 'Marketing', 'Consulting', 'Design', 'Development']
  const locations = ['Whitefield', 'Indiranagar', 'Electronic City', 'BTM Layout', 'HSR Layout', 'Yelahanka', 'KR Puram', 'Marathahalli']

  return Array.from({ length: 50 }, (_, i) => {
    const businessName = businessNames[Math.floor(Math.random() * businessNames.length)]
    const category = categories[Math.floor(Math.random() * categories.length)]
    const location = locations[Math.floor(Math.random() * locations.length)]
    
    return {
      id: `business_${i + 1}`,
      businessName,
      category,
      location,
      avgCustomerTrust: Math.floor(Math.random() * 30) + 70,
      avgRating: Math.round((Math.random() * 2 + 3) * 10) / 10,
      responseRate: Math.floor(Math.random() * 30) + 70,
      customerCount: Math.floor(Math.random() * 500) + 100,
      totalReviews: Math.floor(Math.random() * 200) + 50
    }
  })
}