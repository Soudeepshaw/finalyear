import React, { useState } from 'react'
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { Badge } from "@/Components/ui/badge"
import { ScrollArea } from "@/Components/ui/scroll-area"
import { Separator } from "@/Components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu"
import { Progress } from "@/Components/ui/progress"
import { Textarea } from "@/Components/ui/textarea"
import { Calendar } from "@/Components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover"
import { Label } from "@/Components/ui/label"
import { Switch } from "@/Components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Bell, MessageSquare, Scissors, Home, Package, CheckCircle, Settings, Menu, Search, ChevronRight, Clock, AlertTriangle, X, Calendar as CalendarIcon, BarChart, Star, Paperclip } from 'lucide-react'

interface Order {
    id: string;
    customerName: string;
    customerContact?: string;
    fabric?: {
      name: string;
      color: string;
      price: number;
      image: string;
    };
    design: {
      name: string;
      customizations?: string[];
      image: string;
    };
    customDesign?: {
      sketch: string;
      notes: string;
    };
    measurements: Record<string, number>;
    deadline: string;
    status: string;
    isUrgent: boolean;
    progress?: number;
    completionDate?: string;
    rating?: number;
  }

export default function ImprovedTailorDashboardWithWorkingButtons() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [activeTab, setActiveTab] = useState('new-orders')
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
    const [darkMode, setDarkMode] = useState(false)
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [searchQuery, setSearchQuery] = useState('')
  
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
    const toggleDarkMode = () => setDarkMode(!darkMode)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Searching for:', searchQuery)
    // Implement search logic here
  }

  const handleCreateNewOrder = () => {
    console.log('Creating new order')
    // Implement new order creation logic here
  }

  const handleManageInventory = () => {
    console.log('Managing inventory')
    // Implement inventory management logic here
  }

  const handleViewOrderDetails = (order:any) => {
    setSelectedOrder(order)
  }

  const handleCloseOrderDetails = () => {
    setSelectedOrder(null)
  }

  const handleAcceptOrder = (order:Order) => {
    console.log('Accepting order:', order.id)
    // Implement order acceptance logic here
    setSelectedOrder(null)
  }

  const handleRejectOrder = (order:Order) => {
    console.log('Rejecting order:', order.id)
    // Implement order rejection logic here
    setSelectedOrder(null)
  }

  const handleRequestChanges = (order:Order) => {
    console.log('Requesting changes for order:', order.id)
    // Implement change request logic here
  }

  const handleSendMessage = (message:string) => {
    console.log('Sending message:', message)
    // Implement message sending logic here
  }

  const handleUpdateProgress = (order:Order) => {

    console.log('Updating progress for order:', order.id)
    // Implement progress update logic here
  }

  const navigateTo = (path:string) => {
    console.log('Navigating to:', path)
    // Implement navigation logic here (e.g., update state to show different content)
  }

  const newOrders:Order[] = [
    {
      id: 'ORD001',
      customerName: 'Alice Johnson',
      customerContact: '+1 234-567-8901',
      fabric: {
        name: 'Cotton Twill',
        color: 'Navy Blue',
        price: 15.99,
        image: '/placeholder.svg'
      },
      design: {
        name: 'Classic Suit',
        customizations: ['Slim Fit', 'Notch Lapel'],
        image: '/placeholder.svg'
      },
      customDesign: {
        sketch: '/placeholder.svg',
        notes: 'Please add a pocket square holder'
      },
      measurements: {
        height: 180,
        chest: 40,
        waist: 34,
        hips: 38,
        inseam: 32
      },
      deadline: '2023-07-15',
      status: 'New',
      isUrgent: true
    },
    {
      id: 'ORD002',
      customerName: 'Bob Smith',
      customerContact: '+1 987-654-3210',
      fabric: {
        name: 'Wool Blend',
        color: 'Charcoal Gray',
        price: 24.99,
        image: '/placeholder.svg'
      },
      design: {
        name: 'Modern Blazer',
        customizations: ['Double Vent', 'Peak Lapel'],
        image: '/placeholder.svg'
      },
      measurements: {
        height: 175,
        chest: 42,
        waist: 36,
        hips: 40,
        inseam: 30
      },
      deadline: '2023-07-20',
      status: 'New',
      isUrgent: false
    },
    {
      id: 'ORD003',
      customerName: 'Carol Davis',
      customerContact: '+1 555-123-4567',
      fabric: {
        name: 'Silk',
        color: 'Emerald Green',
        price: 35.99,
        image: '/placeholder.svg'
      },
      design: {
        name: 'Evening Gown',
        customizations: ['Halter Neck', 'Mermaid Silhouette'],
        image: '/placeholder.svg'
      },
      customDesign: {
        sketch: '/placeholder.svg',
        notes: 'Add beading details on the bodice'
      },
      measurements: {
        height: 165,
        bust: 36,
        waist: 28,
        hips: 38,
        length: 60
      },
      deadline: '2023-07-25',
      status: 'New',
      isUrgent: true
    }
  ]

  const ongoingOrders:Order[] = [
    {
        id: 'ORD004',
        customerName: 'David Wilson',
        design: {
          name: 'Business Shirt',
          image: '/placeholder.svg'
        },
        progress: 60,
        deadline: '2023-07-10',
        status: 'In Progress',
        isUrgent: false,
        measurements: {}
      },
      {
        id: 'ORD004',
        customerName: 'David Wilson',
        design: {
          name: 'Business Shirt',
          image: '/placeholder.svg'
        },
        progress: 60,
        deadline: '2023-07-10',
        status: 'In Progress',
        isUrgent: false,
        measurements: {}
      },
  ]

  const completedOrders:Order[] = [
    {
        id: 'ORD006',
        customerName: 'Frank Miller',
        design: {
          name: 'Tuxedo',
          image: '/placeholder.svg'
        },
        completionDate: '2023-06-30',
        rating: 5,
        status: 'Completed',
        isUrgent: false,
        deadline: '2023-06-29',
        measurements: {}
      },
      {
        id: 'ORD006',
        customerName: 'Frank Miller',
        design: {
          name: 'Tuxedo',
          image: '/placeholder.svg'
        },
        completionDate: '2023-06-30',
        rating: 5,
        status: 'Completed',
        isUrgent: false,
        deadline: '2023-06-29',
        measurements: {}
      },
  ]

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark' : ''}`}>
      {/* Top Navigation Bar */}
     

      <div className="flex flex-1">
        {/* Left Sidebar */}
        <aside className={`bg-gray-100 dark:bg-gray-800 w-64 p-4 space-y-4 transition-all duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static h-full z-10 overflow-y-auto`}>
          <nav className="space-y-2">
            <Button variant="ghost" className="w-full justify-start" onClick={() => navigateTo('/')}>
              <Home className="mr-2 h-4 w-4" /> Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => navigateTo('/new-orders')}>
              <Package className="mr-2 h-4 w-4" /> New Orders
              <Badge variant="destructive" className="ml-auto">3</Badge>
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => navigateTo('/ongoing-orders')}>
              <Scissors className="mr-2 h-4 w-4" /> Ongoing Orders
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => navigateTo('/completed-orders')}>
              <CheckCircle className="mr-2 h-4 w-4" /> Completed Orders
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => navigateTo('/calendar')}>
              <CalendarIcon className="mr-2 h-4 w-4" /> Calendar
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => navigateTo('/analytics')}>
              <BarChart className="mr-2 h-4 w-4" /> Analytics
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => navigateTo('/messages')}>
              <MessageSquare className="mr-2 h-4 w-4" /> Messages
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => navigateTo('/settings')}>
              <Settings className="mr-2 h-4 w-4" /> Settings
            </Button>
          </nav>
          <Separator />
          <div>
            <h3 className="mb-2 text-sm font-medium">Quick Actions</h3>
            <Button variant="outline" className="w-full mb-2" onClick={handleCreateNewOrder}>Create New Order</Button>
            <Button variant="outline" className="w-full" onClick={handleManageInventory}>Manage Inventory</Button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 lg:p-8 bg-gray-50 dark:bg-gray-900 overflow-y-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Welcome, Master Tailor</h1>
            <p className="text-gray-600 dark:text-gray-300">Here's an overview of your workshop for today.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28</div>
                <p className="text-xs text-muted-foreground">+2.5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$5,231.89</div>
                <p className="text-xs text-muted-foreground">+10.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.9</div>
                <p className="text-xs text-muted-foreground">+0.2 from last month</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="new-orders" className="space-y-4">
            <TabsList>
              <TabsTrigger value="new-orders" onClick={() => setActiveTab('new-orders')}>New Orders</TabsTrigger>
              <TabsTrigger value="ongoing-orders" onClick={() => setActiveTab('ongoing-orders')}>Ongoing Orders</TabsTrigger>
              <TabsTrigger value="completed-orders" onClick={() => setActiveTab('completed-orders')}>Completed Orders</TabsTrigger>
            </TabsList>
            <TabsContent value="new-orders" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">New Orders</h2>
                <form onSubmit={handleSearch} className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Search orders..."
                    className="w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button type="submit">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </form>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newOrders.map((order) => (
                  <Card key={order.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleViewOrderDetails(order)}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{order.id}</CardTitle>
                          <CardDescription>{order.customerName}</CardDescription>
                        </div>
                        {order.isUrgent && (
                          <Badge variant="destructive">Urgent</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex space-x-4 mb-4">
                        <div className="flex-shrink-0">
                          <img src={order.fabric?.image} alt={order.fabric?.name} className="w-16 h-16 object-cover rounded" />
                        </div>
                        <div>
                          <p className="font-semibold">{order.fabric?.name}</p>
                          <p className="text-sm text-gray-500">{order.fabric?.color}</p>
                          <p className="text-sm">${order.fabric?.price}/yard</p>
                        </div>
                      </div>
                      <div className="flex space-x-4">
                        <div className="flex-shrink-0">
                          <img src={order.design.image} alt={order.design.name} className="w-16 h-16 object-cover rounded" />
                        </div>
                        <div>
                          <p className="font-semibold">{order.design.name}</p>
                          <p className="text-sm text-gray-500">{order.design.customizations?.join(', ')}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Due: {order.deadline}</span>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleViewOrderDetails(order)}>View Details</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="ongoing-orders" className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Ongoing Orders</h2>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="deadline">Deadline</SelectItem>
                    <SelectItem value="progress">Progress</SelectItem>
                    <SelectItem value="customer">Customer Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-4">
                {ongoingOrders.map((order) => (
                  <Card key={order.id}>
                    <CardHeader>
                      <div className="flex justify-between">
                        <CardTitle>{order.id} - {order.customerName}</CardTitle>
                        <Badge variant="secondary">{order.design.name}</Badge>
                      </div>
                      <CardDescription>Deadline: {order.deadline}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{order.progress}%</span>
                        </div>
                        <Progress value={order.progress} className="w-full" />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => handleUpdateProgress(order)}>Update Progress</Button>
                      <Button onClick={() => handleViewOrderDetails(order)}>View Details</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="completed-orders" className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Completed Orders</h2>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Completion Date</SelectItem>
                    <SelectItem value="rating">Customer Rating</SelectItem>
                    <SelectItem value="customer">Customer Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-4">
                {completedOrders.map((order) => (
                  <Card key={order.id}>
                    <CardHeader>
                      <div className="flex justify-between">
                        <CardTitle>{order.id} - {order.customerName}</CardTitle>
                        <Badge variant="secondary">{order.design.name}</Badge>
                      </div>
                      <CardDescription>Completed on: {order.completionDate}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-2">
                        <span>Customer Rating:</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-5 w-5 ${i < (order.rating ?? 0) ? 'text-yellow-400' : 'text-gray-300'}`} />
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" onClick={() => handleViewOrderDetails(order)}>View Details</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Detailed Order View Dialog */}
      {selectedOrder && (
        <Dialog open={!!selectedOrder} onOpenChange={handleCloseOrderDetails}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center">
                <span>{selectedOrder.id} - {selectedOrder.customerName}</span>
                <Badge variant={selectedOrder.isUrgent ? "destructive" : "secondary"}>
                  {selectedOrder.isUrgent ? "Urgent" : selectedOrder.status}
                </Badge>
              </DialogTitle>
              <DialogDescription>Order Details</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Fabric Details</h3>
                <div className="flex space-x-4 mb-4">
                  <img src={selectedOrder.fabric?.image} alt={selectedOrder.fabric?.name} className="w-24 h-24 object-cover rounded" />
                  <div>
                    <p className="font-semibold">{selectedOrder.fabric?.name}</p>
                    <p>{selectedOrder.fabric?.color}</p>
                    <p>${selectedOrder.fabric?.price}/yard</p>
                  </div>
                </div>
                <h3 className="font-semibold mb-2">Design Details</h3>
                <div className="flex space-x-4 mb-4">
                  <img src={selectedOrder.design.image} alt={selectedOrder.design.name} className="w-24 h-24 object-cover rounded" />
                  <div>
                    <p className="font-semibold">{selectedOrder.design.name}</p>
                    <p>{selectedOrder.design.customizations?.join(', ')}</p>
                  </div>
                </div>
                {selectedOrder.customDesign && (
                  <>
                    <h3 className="font-semibold mb-2">Custom Design</h3>
                    <div className="flex space-x-4 mb-4">
                      <img src={selectedOrder.customDesign.sketch} alt="Custom Design" className="w-24 h-24 object-cover rounded" />
                      <p>{selectedOrder.customDesign.notes}</p>
                    </div>
                  </>
                )}
              </div>
              <div>
                <h3 className="font-semibold mb-2">Measurements</h3>
                <ul className="list-disc list-inside mb-4">
                  {Object.entries(selectedOrder.measurements).map(([key, value]) => (
                    <li key={key}>{key}: {value} {key === 'height' ? 'cm' : 'inches'}</li>
                  ))}
                </ul>
                <h3 className="font-semibold mb-2">Order Timeline</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Order Placed</span>
                    <Badge variant="outline">Completed</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Fabric Sourced</span>
                    <Badge variant="outline">Completed</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Cutting</span>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Sewing</span>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Fitting</span>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Final Touches</span>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Ready for Pickup</span>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                </div>
              </div>
            </div>
            <Separator className="my-4" />
            <div>
              <h3 className="font-semibold mb-2">Customer Communication</h3>
              <Textarea placeholder="Type your message to the customer..." className="mb-2" />
              <div className="flex justify-between">
                <Button variant="outline">
                  <Paperclip className="h-4 w-4 mr-2" />
                  Attach Files
                </Button>
                <Button onClick={() => handleSendMessage("Sample message")}>Send Message</Button>
              </div>
            </div>
            <DialogFooter className="flex justify-between">
              <Button variant="outline" onClick={handleCloseOrderDetails}>Close</Button>
              <div className="space-x-2">
                <Button variant="destructive" onClick={() => handleRejectOrder(selectedOrder)}>Reject Order</Button>
                <Button variant="secondary" onClick={() => handleRequestChanges(selectedOrder)}>Request Changes</Button>
                <Button onClick={() => handleAcceptOrder(selectedOrder)}>Accept Order</Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}