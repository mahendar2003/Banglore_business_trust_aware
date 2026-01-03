import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { X } from 'lucide-react'

interface VerificationModalProps {
  email: string
  onVerify: () => void
  onClose: () => void
}

export function VerificationModal({ email, onVerify, onClose }: VerificationModalProps) {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  const handleVerify = () => {
    // For demo, accept any 6-digit code
    if (code.length === 6 && /^\d+$/.test(code)) {
      onVerify()
    } else {
      setError('Please enter a valid 6-digit code')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Verify Your Email</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <CardDescription>
            We've sent a verification code to {email}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="code">Verification Code</Label>
            <Input
              id="code"
              type="text"
              placeholder="Enter 6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              maxLength={6}
              className="text-center text-lg tracking-widest"
            />
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          </div>
          
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>📧 Check your console</strong> for the verification code (simulated for demo)
            </p>
          </div>

          <Button onClick={handleVerify} className="w-full">
            Verify Email
          </Button>
          
          <p className="text-xs text-gray-500 text-center">
            Didn't receive the code? Check your spam folder or try again
          </p>
        </CardContent>
      </Card>
    </div>
  )
}