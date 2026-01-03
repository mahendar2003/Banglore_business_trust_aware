// Before (causing circular structure)
localStorage.setItem('user', JSON.stringify(user)) // user contains React properties

// After (clean data)
const userData = {
  id: user.id,
  name: user.name,
  email: user.email,
  location: user.location,
  role: user.role,
  verified: user.verified
}
localStorage.setItem('user', JSON.stringify(userData))