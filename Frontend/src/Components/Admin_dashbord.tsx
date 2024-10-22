import { Button } from "@/Components/ui/button"
import  Input from "@/Components/ui/input"
import { Select } from "@/Components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts"
import { DollarSignIcon, UsersIcon, ShirtIcon, MessageCircleIcon } from "lucide-react"
import { useState } from "react"

const monthlyData = [
  { name: "Jan", orders: 400, revenue: 24000 },
  { name: "Feb", orders: 300, revenue: 13980 },
  { name: "Mar", orders: 200, revenue: 98000 },
  { name: "Apr", orders: 278, revenue: 39080 },
  { name: "May", orders: 189, revenue: 48000 },
  { name: "Jun", orders: 239, revenue: 38000 },
  { name: "Jul", orders: 349, revenue: 42000 },
  { name: "Aug", orders: 410, revenue: 52000 },
  { name: "Sep", orders: 310, revenue: 36000 },
  { name: "Oct", orders: 283, revenue: 41000 },
  { name: "Nov", orders: 297, revenue: 45000 },
  { name: "Dec", orders: 359, revenue: 51000 },
]

const yearlyData = [
  { name: "2019", orders: 3200, revenue: 480000 },
  { name: "2020", orders: 2800, revenue: 420000 },
  { name: "2021", orders: 3500, revenue: 525000 },
  { name: "2022", orders: 3800, revenue: 570000 },
  { name: "2023", orders: 4200, revenue: 630000 },
]

export default function AdminDashboard() {
  const [timeInterval, setTimeInterval] = useState("monthly")
  const [chartData, setChartData] = useState(monthlyData)

  const handleTimeIntervalChange = (interval:any) => {
    setTimeInterval(interval)
    setChartData(interval === "monthly" ? monthlyData : yearlyData)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSignIcon className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs opacity-80">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500 to-teal-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
            <UsersIcon className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs opacity-80">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-500 to-orange-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShirtIcon className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs opacity-80">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-pink-500 to-red-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tailors</CardTitle>
            <UsersIcon className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs opacity-80">
              +201 since last week
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Overview</CardTitle>
            <Select
              value={timeInterval}
              onChange={(e:any) => handleTimeIntervalChange(e.target.value)}
              className="w-40"
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </Select>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="orders" fill="#8884d8" name="Orders" />
                <Bar yAxisId="right" dataKey="revenue" fill="#82ca9d" name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Daily Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="orders" stroke="#8884d8" name="Orders" />
                <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#82ca9d" name="Revenue" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Tailors</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tailor</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[1, 2, 3, 4, 5].map((tailor) => (
                  <TableRow key={tailor}>
                    <TableCell className="font-medium">Tailor {tailor}</TableCell>
                    <TableCell>{100 - tailor * 10}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`h-5 w-5 ${star <= 5 - tailor * 0.5 ? "text-yellow-400" : "text-gray-300"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>${(10000 - tailor * 1000).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Support Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Issue</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[1, 2, 3, 4, 5].map((ticket) => (
                  <TableRow key={ticket}>
                    <TableCell>#{ticket}2345</TableCell>
                    <TableCell>Customer {ticket}</TableCell>
                    <TableCell>{ticket % 2 === 0 ? "Order Delay" : "Refund Request"}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          ticket % 3 === 0
                            ? "bg-green-100 text-green-800"
                            : ticket % 3 === 1
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {ticket % 3 === 0 ? "Resolved" : ticket % 3 === 1 ? "In Progress" : "Open"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Input type="text" placeholder="Search users..." className="max-w-sm" />
            <Select className="w-40">
              <option value="">Filter by role</option>
              <option value="customer">Customer</option>
              <option value="tailor">Tailor</option>
              <option value="admin">Admin</option>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3, 4, 5].map((user) => (
                <TableRow key={user}>
                  <TableCell>#{user}0123</TableCell>
                  <TableCell className="font-medium">User {user}</TableCell>
                  <TableCell>user{user}@example.com</TableCell>
                  <TableCell>{user % 3 === 0 ? "Admin" : user % 2 === 0 ? "Tailor" : "Customer"}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        user % 2 === 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user % 2 === 0 ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      {user % 2 === 0 ? "Deactivate" : "Activate"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}