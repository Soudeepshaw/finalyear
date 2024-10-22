import React from 'react'
import {useState, useEffect} from 'react'
import { Button } from "@/Components/ui/button"
import Input from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Link ,useNavigate} from 'react-router-dom'
import { Scissors, Mail, FacebookIcon } from 'lucide-react'
import { register } from '../services/api'
import axios from 'axios'

export default function SignupPage() {
  console.log('Initializing SignupPage component');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    console.log('useEffect hook triggered');
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log('Geolocation obtained:', position.coords);
        setLatitude(position.coords.latitude.toString());
        setLongitude(position.coords.longitude.toString());
      });
    } else {
      console.log("Geolocation is not available");
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('Signup form submitted');
    console.log('Signup data:', { name, email, password, role, longitude, latitude });
    try {
      console.log('Sending request to server...');
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
        role,
        longitude,
        latitude,

      });
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('userRole', response.data.user.role)
      localStorage.setItem('userName', response.data.user.name)
      localStorage.setItem('userEmail', response.data.user.email)
      navigate('/')
      console.log('Navigating to home page');
    } catch (error) {
      setError('Registration failed. Please try again.')
      console.error('Signup failed:', error)
    }
  }

  const handleGmailLogin = () => {
    console.log('Login with Gmail clicked');
  }

  const handleFacebookLogin = () => {
    console.log('Login with Facebook clicked');
  }

  console.log('Rendering SignupPage component');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Scissors className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold text-center text-primary">Create an Account</CardTitle>
          <CardDescription className="text-center text-lg">
            Enter your details to create your User/tailor account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                <Input id="name" placeholder="John Doe" required className="rounded-lg" 
                 value={name}
                 onChange={(e) => {
                   console.log('Name changed:', e.target.value);
                   setName(e.target.value);
                 }}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required className="rounded-lg"
                 value={email}
                 onChange={(e) => {
                   console.log('Email changed:', e.target.value);
                   setEmail(e.target.value);
                 }} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <Input id="password" type="password" required className="rounded-lg"
                 value={password}
                 onChange={(e) => {
                   console.log('Password changed');
                   setPassword(e.target.value);
                 }} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
                <Input id="confirmPassword" type="password" required className="rounded-lg"
                 value={confirmPassword}
                 onChange={(e) => {
                   console.log('Confirm Password changed');
                   setConfirmPassword(e.target.value);
                 }} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm font-medium">Account Type</Label>
                <Select onValueChange={(value) => {
                  console.log('Account Type selected:', value);
                  setRole(value);
                }}>
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tailor">Tailor</SelectItem>
                    <SelectItem value="customer">Customer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit" className="w-full mt-6 rounded-lg bg-primary hover:bg-primary-dark transition-colors">
              Create Account
            </Button>
          </form>
          <div className="mt-6 flex flex-col space-y-3">
            <Button onClick={handleGmailLogin} variant="outline" className="w-full rounded-lg flex items-center justify-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>Sign up with Gmail</span>
            </Button>
            <Button onClick={handleFacebookLogin} variant="outline" className="w-full rounded-lg flex items-center justify-center space-x-2">
              <FacebookIcon className="h-5 w-5" />
              <span>Sign up with Facebook</span>
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <div className="text-sm text-center text-gray-500 w-full">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Log in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}