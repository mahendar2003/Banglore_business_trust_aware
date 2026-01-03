// This script generates 10,000 customers
const fs = require('fs')

const firstNames = ['Priya', 'Rahul', 'Anjali', 'Vikram', 'Meera', 'Arjun', 'Kavya', 'Rohit', 'Sneha', 'Amit', 'Neha', 'Karan', 'Pooja', 'Raj', 'Divya', 'Aditya', 'Swati', 'Manish', 'Rashmi', 'Vivek']
const lastNames = ['Sharma', 'Kumar', 'Nair', 'Singh', 'Patel', 'Gupta', 'Reddy', 'Jain', 'Agarwal', 'Mishra', 'Verma', 'Chopra', 'Kapoor', 'Malhotra', 'Bhatia', 'Chauhan', 'Dixit', 'Khanna', 'Bansal', 'Tandon']
const locations = ['Whitefield', 'Indiranagar', 'Yelahanka', 'Electronic City', 'BTM Layout', 'KR Puram', 'Marathahalli', 'HSR Layout']
const segments = ['loyal', 'new', 'at-risk', 'inactive']

function generateCustomer(id) {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
  const location = locations[Math.floor(Math.random() * locations.length)]
  
  return {
    id: `cust_${String(id).padStart(5, '0')}`,
    name: `${firstName} ${lastName}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
    location,
    avgRating: Math.round((Math.random() * 3 + 2) * 10) / 10, // 2.0 to 5.0
    repeatVisits: Math.floor(Math.random() * 20),
    noComplaints: Math.random() > 0.3,
    responseTimeScore: Math.floor(Math.random() * 5) + 1, // 1 to 5
    totalSpent: Math.floor(Math.random() * 100000) + 5000,
    joinDate: `202${Math.floor(Math.random() * 2) + 2}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
    segment: segments[Math.floor(Math.random() * segments.length)]
  }
}

const customers = Array.from({ length: 10000 }, (_, i) => generateCustomer(i + 1))
fs.writeFileSync('./src/data/customers.json', JSON.stringify(customers, null, 2))
console.log('Generated 10,000 customers')