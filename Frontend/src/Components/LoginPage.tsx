import React from 'react'
import { useState } from 'react'
import { Button } from "@/Components/ui/button"
import Input from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import { Checkbox } from "@/Components/ui/checkbox"
import { Link ,useNavigate} from 'react-router-dom'
import { Scissors, Mail, FacebookIcon } from 'lucide-react'

import { login } from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const auth = useAuth()
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Submitting login form with email:', email); // Debug log
  
    try {
      const response = await login({ email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', response.data.user.role);
      if (auth && auth.fetchUserProfile) {
        await auth.fetchUserProfile();
      }
      navigate('/'); // Redirect to dashboard after successful login
      console.log('Navigating to dashboard'); // Debug log
    } catch (error) {
      setError('Invalid email or password');
      console.error('Login failed:', error);
    }
  };
  

  const handleGmailLogin = () => {
    // Handle Gmail login logic here
    console.log('Gmail login clicked')
  }

  const handleFacebookLogin = () => {
    // Handle Facebook login logic here
    console.log('Facebook login clicked')
  }

  console.log('Rendering LoginPage component') // Debug log

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Scissors className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold text-center text-primary">Login to Your Account</CardTitle>
          <CardDescription className="text-center text-gray-600">
            Access your tailor dashboard with ease
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="m@example.com" 
                  required 
                  className="w-full p-2 border rounded-md" 
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    console.log('Email input changed:', e.target.value) // Debug log
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  className="w-full p-2 border rounded-md" 
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    console.log('Password input changed') // Debug log (not logging actual password for security)
                  }}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm text-gray-600">Remember me</Label>
              </div>
            </div>
            <Button type="submit" className="w-full mt-6 bg-primary text-white hover:bg-primary-dark transition duration-300">
              Sign In
            </Button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <hr className="w-full border-gray-300" />
            <span className="px-2 text-gray-500 text-sm">OR</span>
            <hr className="w-full border-gray-300" />
          </div>
          <div className="mt-6 space-y-4">
            <Button onClick={handleGmailLogin} className="w-full flex items-center justify-center space-x-2 bg-red-500 text-white hover:bg-red-600 transition duration-300">
              <Mail className="h-5 w-5" />
              <span>Login with Gmail</span>
            </Button>
            <Button onClick={handleFacebookLogin} className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white hover:bg-blue-700 transition duration-300">
              <FacebookIcon className="h-5 w-5" />
              <span>Login with Facebook</span>
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button variant="link" className="text-primary hover:underline">
            Forgot password?
          </Button>
          <div className="text-sm text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}