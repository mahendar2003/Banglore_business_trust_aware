import { useState } from 'react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { 
  Home, 
  Users, 
  Building, 
  BarChart3, 
  User, 
  LogOut, 
  Menu,
  Shield,
  TrendingUp,
  MapPin,
  Star,
  ChevronDown
} from 'lucide-react'

interface HeaderProps {
  user: any
  currentPage: string
  onNavigate: (page: string) => void
  onLogout: () => void
}

export function Header({ user, currentPage, onNavigate, onLogout }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'signup', label: 'Sign Up', icon: Users },
    { id: 'login', label: 'Login', icon: User }
  ]

  const dashboardItems = [
    { id: 'customer-dashboard', label: 'Customer Dashboard', icon: Users },
    { id: 'business-dashboard', label: 'Business Dashboard', icon: Building },
    { id: 'new-business-dashboard', label: 'New Business', icon: TrendingUp },
    { id: 'admin-dashboard', label: 'Admin Dashboard', icon: BarChart3 }
  ]

  const getDashboardForUser = () => {
    if (!user) return null
    switch (user.role) {
      case 'customer':
        return 'customer-dashboard'
      case 'business':
        return 'business-dashboard'
      case 'new-business':
        return 'new-business-dashboard'
      case 'admin':
        return 'admin-dashboard'
      default:
        return null
    }
  }

  const userDashboard = getDashboardForUser()

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">TrustIntel</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => onNavigate('home')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'home' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Home
            </button>
            
            {!user && (
              <>
                <button
                  onClick={() => onNavigate('signup')}
                  className={`text-sm font-medium transition-colors ${
                    currentPage === 'signup' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Sign Up
                </button>
                <button
                  onClick={() => onNavigate('login')}
                  className={`text-sm font-medium transition-colors ${
                    currentPage === 'login' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Login
                </button>
              </>
            )}

            {user && userDashboard && (
              <button
                onClick={() => onNavigate(userDashboard)}
                className={`text-sm font-medium transition-colors ${
                  currentPage === userDashboard ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Dashboard
              </button>
            )}
          </nav>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {user.name?.charAt(0) || 'U'}
                  </div>
                  <div className="hidden md:block">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    <div className="text-xs text-gray-500 capitalize">{user.role?.replace('-', ' ')}</div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onLogout}
                  className="hidden md:flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => onNavigate('signup')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Get Started
              </Button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              <button
                onClick={() => {
                  onNavigate('home')
                  setIsMenuOpen(false)
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 'home' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Home
              </button>
              
              {!user ? (
                <>
                  <button
                    onClick={() => {
                      onNavigate('signup')
                      setIsMenuOpen(false)
                    }}
                    className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentPage === 'signup' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    Sign Up
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('login')
                      setIsMenuOpen(false)
                    }}
                    className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentPage === 'login' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    Login
                  </button>
                </>
              ) : (
                <>
                  {userDashboard && (
                    <button
                      onClick={() => {
                        onNavigate(userDashboard)
                        setIsMenuOpen(false)
                      }}
                      className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        currentPage === userDashboard ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      Dashboard
                    </button>
                  )}
                  <button
                    onClick={() => {
                      onLogout()
                      setIsMenuOpen(false)
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}