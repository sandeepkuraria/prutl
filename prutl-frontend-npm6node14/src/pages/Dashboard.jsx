import React from 'react'
import UserDashboard from '../components/Dashboard/UserDashboard'

const Dashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Scoreboard</h1>
      <UserDashboard />
    </div>
  )
}

export default Dashboard
