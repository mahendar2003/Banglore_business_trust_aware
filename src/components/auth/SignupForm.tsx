import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/Label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select'
import { Checkbox } from '../ui/Checkbox'
import { AlertCircle, CheckCircle, Building, User, Mail, Lock, MapPin, Users } from 'lucide-react'

interface SignupFormProps {
  onSignup: (userData: any) => void
}

export function SignupForm({ onSignup }: SignupFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    location: '',
    role: 'customer', // Default to customer
    isBusinessOwner: false,
    businessExists: false, // Made optional - defaults to false
    businessName: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showVerification, setShowVerification] = useState(false)

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

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (!formData.location) {
      newErrors.location = 'Location is required'
    }

    if (!formData.role) {
      newErrors.role = 'Please select your role'
    }

    // Only require business name if user is a business owner
    if (formData.role === 'business' && !formData.businessName.trim()) {
      newErrors.businessName = 'Business name is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // Simulate sending verification code
      const verificationCode = Math.floor(100000 + Math.random() * 900000)
      console.log(`Verification code: ${verificationCode} sent to ${formData.email}`)
      
      setShowVerification(true)
      setIsSubmitting(false)
    }, 1500)
  }

  const handleVerification = () => {
    // Simulate verification
    const userData = {
      ...formData,
      isBusinessOwner: formData.role === 'business',
      businessExists: formData.role === 'business' && formData.businessExists
    }
    onSignup(userData)
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleRoleChange = (role: string) => {
    setFormData(prev => ({
      ...prev,
      role,
      isBusinessOwner: role === 'business',
      // Reset businessExists when role changes
      businessExists: false,
      businessName: role === 'business' ? prev.businessName : ''
    }))
  }

  if (showVerification) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Check Your Email</CardTitle>
            <CardDescription>
              We've sent a verification code to {formData.email}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-blue-800">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Verification Code</span>
              </div>
              <p className="text-2xl font-mono font-bold text-blue-900 mt-2">789456</p>
              <p className="text-xs text-blue-700 mt-1">
                (Check console for actual code in real implementation)
              </p>
            </div>
            <Button 
              onClick={handleVerification}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Verify Email
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowVerification(false)}
              className="w-full"
            >
              Back to Signup
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription>
            Join TrustIntel to build trusted relationships in Bangalore
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selection */}
            <div>
              <Label>I am a...</Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => handleRoleChange('customer')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    formData.role === 'customer'
                      ? 'border-blue-600 bg-blue-50 text-blue-600'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Users className="w-6 h-6 mx-auto mb-1" />
                  <div className="text-sm font-medium">Customer</div>
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleChange('business')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    formData.role === 'business'
                      ? 'border-blue-600 bg-blue-50 text-blue-600'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Building className="w-6 h-6 mx-auto mb-1" />
                  <div className="text-sm font-medium">Business Owner</div>
                </button>
              </div>
              {errors.role && (
                <p className="text-sm text-red-600 mt-1">{errors.role}</p>
              )}
            </div>

            <div>
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="pl-10"
                />
              </div>
              {errors.name && (
                <p className="text-sm text-red-600 mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="pl-10"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="pl-10"
                />
              </div>
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400 z-10" />
                <Select value={formData.location} onValueChange={(value) => handleInputChange('location', value)}>
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Select your area in Bangalore" />
                  </SelectTrigger>
                  <SelectContent>
                    {BANGALORE_AREAS.map(area => (
                      <SelectItem key={area} value={area}>{area}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {errors.location && (
                <p className="text-sm text-red-600 mt-1">{errors.location}</p>
              )}
            </div>

            {/* Business-specific fields */}
            {formData.role === 'business' && (
              <div className="space-y-3 pl-4 border-l-4 border-blue-200 bg-blue-50 p-4 rounded">
                <div>
                  <Label htmlFor="businessName">Business Name</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="businessName"
                      type="text"
                      placeholder="Enter your business name"
                      value={formData.businessName}
                      onChange={(e) => handleInputChange('businessName', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  {errors.businessName && (
                    <p className="text-sm text-red-600 mt-1">{errors.businessName}</p>
                  )}
                </div>

                {/* Optional checkbox for existing businesses */}
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox
                    id="businessExists"
                    checked={formData.businessExists}
                    onCheckedChange={(checked) => handleInputChange('businessExists', checked)}
                  />
                  <Label htmlFor="businessExists" className="text-sm">
                    My business already exists (optional)
                  </Label>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  Check this if your business is already registered and you want to link to it
                </p>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button 
                  type="button"
                  onClick={() => window.location.hash = 'login'}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Sign in
                </button>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}