import { useState, useEffect } from 'react'
import { HomePage } from './components/pages/HomePage'
import { SignupForm } from './components/auth/SignupForm'
import { LoginForm } from './components/auth/LoginForm'
import { CustomerDashboard } from './components/dashboard/CustomerDashboard'
import { BusinessDashboard } from './components/dashboard/BusinessDashboard'
import { NewBusinessDashboard } from './components/dashboard/NewBusinessDashboard'
import { AdminDashboard } from './components/dashboard/AdminDashboard'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      if (parsedUser.verified || parsedUser.isDemo) {
        setUser(parsedUser)
        // Redirect to appropriate dashboard based on user role
        if (parsedUser.role === 'customer') {
          setCurrentPage('customer-dashboard')
        } else if (parsedUser.role === 'business') {
          setCurrentPage('business-dashboard')
        } else if (parsedUser.role === 'new-business') {
          setCurrentPage('new-business-dashboard')
        } else if (parsedUser.role === 'admin') {
          setCurrentPage('admin-dashboard')
        }
      }
    }

    // Handle hash-based navigation for demo
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash && ['customer-dashboard', 'business-dashboard', 'new-business-dashboard', 'admin-dashboard'].includes(hash)) {
        setCurrentPage(hash)
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    handleHashChange() // Check initial hash

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  const handleSignup = (userData: any) => {
    // Determine user role based on form data
    let role = userData.role || 'customer'
    if (userData.isBusinessOwner) {
      role = userData.businessExists ? 'business' : 'new-business'
    }
    
    const userWithRole = { ...userData, role, verified: true }
    setUser(userWithRole)
    localStorage.setItem('user', JSON.stringify(userWithRole))
    
    // Redirect to appropriate dashboard
    if (role === 'customer') {
      setCurrentPage('customer-dashboard')
    } else if (role === 'business') {
      setCurrentPage('business-dashboard')
    } else if (role === 'new-business') {
      setCurrentPage('new-business-dashboard')
    }
  }

  const handleLogin = (userData: any) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    
    // Redirect to appropriate dashboard
    if (userData.role === 'customer') {
      setCurrentPage('customer-dashboard')
    } else if (userData.role === 'business') {
      setCurrentPage('business-dashboard')
    } else if (userData.role === 'new-business') {
      setCurrentPage('new-business-dashboard')
    } else if (userData.role === 'admin') {
      setCurrentPage('admin-dashboard')
    }
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
    setCurrentPage('home')
    window.location.hash = ''
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />
      case 'signup':
        return <SignupForm onSignup={handleSignup} />
      case 'login':
        return <LoginForm onLogin={handleLogin} />
      case 'customer-dashboard':
        return user ? <CustomerDashboard user={user} /> : <HomePage onNavigate={setCurrentPage} />
      case 'business-dashboard':
        return user ? <BusinessDashboard user={user} /> : <HomePage onNavigate={setCurrentPage} />
      case 'new-business-dashboard':
        return user ? <NewBusinessDashboard user={user} /> : <HomePage onNavigate={setCurrentPage} />
      case 'admin-dashboard':
        return user ? <AdminDashboard user={user} /> : <HomePage onNavigate={setCurrentPage} />
      default:
        return <HomePage onNavigate={setCurrentPage} />
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header 
        user={user} 
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onLogout={handleLogout}
      />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />
    </div>
  )
}

export default App