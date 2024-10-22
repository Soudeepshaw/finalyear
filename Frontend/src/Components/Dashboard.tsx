import React from 'react'
import { useAuth } from '../context/AuthContext'
import CustomerProfile from './Profile'
import TailorProfile from './TailorProfile'

const Dashboard: React.FC = () => {
  const { user } = useAuth()

  if (!user) return <div>Loading...</div>

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      {user.role === 'customer' ? <CustomerProfile /> : <TailorProfile />}
    </div>
  )
}

export default Dashboard
