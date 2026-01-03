import customersData from '../data/customers.json'
import businessesData from '../data/businesses.json'

export const loadCustomers = () => {
  return customersData
}

export const loadBusinesses = () => {
  return businessesData
}

export const getCustomersByLocation = (location: string) => {
  return customersData.filter(customer => customer.location === location)
}

export const getBusinessesByLocation = (location: string) => {
  return businessesData.filter(business => business.location === location)
}

export const getHighRiskCustomers = (threshold: number = 30) => {
  return customersData.filter(customer => (customer.trustScore || 0) < threshold)
}

export const getTopBusinesses = (limit: number = 10) => {
  return businessesData
    .sort((a, b) => (b.trustScore || 0) - (a.trustScore || 0))
    .slice(0, limit)
}