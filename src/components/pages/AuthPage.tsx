import { useState } from 'react'
import { LoginForm } from '../auth/LoginForm'
import { SignupForm } from '../auth/SignupForm'

interface AuthPageProps {
  onAuth: (user: any) => void
  user: any
}

export function AuthPage({ onAuth, user }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true)

  const handleLogin = (userData: any) => {
    onAuth(userData)
  }

  const handleSignup = (userData: any) => {
    // Store user data temporarily until verification
    onAuth(userData)
  }

  const handleVerification = () => {
    // User is verified, they'll be redirected to dashboard
  }

  return (
    <>
      {isLogin ? (
        <LoginForm 
          onLogin={handleLogin} 
          onSwitchToSignup={() => setIsLogin(false)}
        />
      ) : (
        <SignupForm 
          onSignup={handleSignup}
          onVerification={handleVerification}
          user={user}
          onSwitchToLogin={() => setIsLogin(true)}
        />
      )}
    </>
  )
}