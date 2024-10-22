import React, { useState, useRef } from 'react'
import { Button } from "@/Components/ui/button"
import  Input from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Textarea } from "@/Components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { Badge } from "@/Components/ui/badge"
import { ScrollArea } from "@/Components/ui/scroll-area"
import { Separator } from "@/Components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu"
import { Progress } from "@/Components/ui/progress"
import { Bell, MessageSquare, Scissors, Home, Package, CheckCircle, Settings, Menu, Search, ChevronRight, Clock, AlertTriangle, X, Calendar as CalendarIcon, BarChart, Star, Paperclip, Send, PlusCircle, Image as ImageIcon } from 'lucide-react'
import TailorProfile from './TailorProfile'
// Interfaces
interface Message {
  id: string;
  sender: 'customer' | 'tailor';
  content: string;
  timestamp: string;
  image?: string;
}

interface FabricDetails {
  name: string;
  color: string;
  price: string;
  image: string;
}

interface DesignDetails {
  name: string;
  image: string;
  customizations: string[];
}

interface CustomDesign {
  sketch: string;
  notes: string;
}

interface Measurements {
  height: string;
  chest: string;
  waist: string;
  hips: string;
  inseam: string;
}

interface OrderTimeline {
  orderPlaced: 'Completed' | 'Pending';
  fabricSourced: 'Completed' | 'Pending';
  cutting: 'Completed' | 'Pending';
  sewing: 'Completed' | 'Pending';
  fitting: 'Completed' | 'Pending';
  finalTouches: 'Completed' | 'Pending';
  readyForPickup: 'Completed' | 'Pending';
}

interface Order {
  id: string;
  customerName: string;
  design: DesignDetails;
  fabric?: FabricDetails;
  customDesign?: CustomDesign;
  deadline: string;
  status: 'New' | 'In Progress' | 'Completed';
  isUrgent: boolean;
  progress?: number;
  messages: Message[];
  measurements: Measurements;
  orderTimeline: OrderTimeline;
}

interface Appointment {
  id: string;
  customerName: string;
  date: string;
  time: string;
  type: string;
  notes?: string;
}

export default function TailorDashboard() {
  // State variables
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [currentView, setCurrentView] = useState('dashboard')
  const [darkMode, setDarkMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [newMessage, setNewMessage] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Sample data
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD001',
      customerName: 'Alice Johnson',
      design: {
        name: 'Classic Suit',
        image: '/placeholder.svg',
        customizations: ['Slim fit', 'Notch lapel']
      },
      fabric: {
        name: 'Wool Blend',
        color: 'Navy Blue',
        price: '50.00',
        image: '/placeholder.svg'
      },
      deadline: '2023-07-15',
      status: 'New',
      isUrgent: true,
      messages: [
        { id: 'MSG001', sender: 'customer', content: 'Hi, I need this suit by next week. Is it possible?', timestamp: '2023-07-01T10:00:00Z' },
        { id: 'MSG002', sender: 'tailor', content: "Hello Alice, I'll do my best to accommodate your request. Can you provide more details about the suit?", timestamp: '2023-07-01T10:15:00Z' },
      ],
      measurements: {
        height: '180',
        chest: '40',
        waist: '32',
        hips: '38',
        inseam: '32'
      },
      orderTimeline: {
        orderPlaced: 'Completed',
        fabricSourced: 'Completed',
        cutting: 'Pending',
        sewing: 'Pending',
        fitting: 'Pending',
        finalTouches: 'Pending',
        readyForPickup: 'Pending'
      }
    },
    {
      id: 'ORD002',
      customerName: 'Bob Smith',
      design: {
        name: 'Wedding Dress',
        image: '/placeholder.svg',
        customizations: ['Lace sleeves', 'Mermaid style']
      },
      fabric: {
        name: 'Silk Satin',
        color: 'Ivory',
        price: '80.00',
        image: '/placeholder.svg'
      },
      deadline: '2023-07-20',
      status: 'In Progress',
      isUrgent: false,
      progress: 60,
      messages: [
        { id: 'MSG003', sender: 'customer', content: "How's the progress on my wedding dress?", timestamp: '2023-07-05T14:00:00Z' },
        { id: 'MSG004', sender: 'tailor', content: "It's coming along nicely, Bob. We're about 60% done. Would you like to schedule a fitting?", timestamp: '2023-07-05T14:30:00Z '}
      ],
      measurements: {
        height: '165',
        chest: '36',
        waist: '28',
        hips: '38',
        inseam: '30'
      },
      orderTimeline: {
        orderPlaced: 'Completed',
        fabricSourced: 'Completed',
        cutting: 'Completed',
        sewing: 'In Progress',
        fitting: 'Pending',
        finalTouches: 'Pending',
        readyForPickup: 'Pending'
      }
    },
    {
      id: 'ORD003',
      customerName: 'Carol Davis',
      design: {
        name: 'Evening Gown',
        image: '/placeholder.svg',
        customizations: ['Off-shoulder', 'High slit']
      },
      fabric: {
        name: 'Velvet',
        color: 'Emerald Green',
        price: '60.00',
        image: '/placeholder.svg'
      },
      deadline: '2023-06-25',
      status: 'Completed',
      isUrgent: false,
      progress: 100,
      messages: [
        { id: 'MSG005', sender: 'tailor', content: 'Your evening gown is ready for pickup, Carol. How would you like to arrange collection?', timestamp: '2023-06-23T16:00:00Z' },
        { id: 'MSG006', sender: 'customer', content: "Great news! I'll come by tomorrow afternoon. Thank you!", timestamp: '2023-06-23T16:15:00Z' },
      ],
      measurements: {
        height: '170',
        chest: '34',
        waist: '26',
        hips: '36',
        inseam: '32'
      },
      orderTimeline: {
        orderPlaced: 'Completed',
        fabricSourced: 'Completed',
        cutting: 'Completed',
        sewing: 'Completed',
        fitting: 'Completed',
        finalTouches: 'Completed',
        readyForPickup: 'Completed'
      }
    },
  ])

  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: 'APT001', customerName: 'David Wilson', date: '2023-07-10', time: '10:00 AM', type: 'Fitting', notes: 'Second fitting for wedding suit' },
    { id: 'APT002', customerName: 'Emma Brown', date: '2023-07-11', time: '2:00 PM', type: 'Consultation', notes: 'Initial consultation for prom dress' }
  ])

  // Functions
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
  const toggleDarkMode = () => setDarkMode(!darkMode)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Searching for:', searchQuery)
    // Implement search logic here
  }

  const handleSendMessage = (orderId: string) => {
    if (newMessage.trim() === '') return
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          messages: [
            ...order.messages,
            {
              id: `MSG${order.messages.length + 1}`,
              sender: 'tailor',
              content: newMessage,
              timestamp: new Date().toISOString()
            }
          ]
        }
      }
      return order
    })
    setOrders(updatedOrders)
    setNewMessage('')
  }

  const handleSendImage = (orderId: string, file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const imageDataUrl = e.target?.result as string
      const updatedOrders = orders.map(order => {
        if (order.id === orderId) {
          return {
            ...order,
            messages: [
              ...order.messages,
              {
                id: `MSG${order.messages.length + 1}`,
                sender: 'tailor',
                content: 'Image sent',
                timestamp: new Date().toISOString(),
                image: imageDataUrl
              }
            ]
          }
        }
        return order
      })
      setOrders(updatedOrders)
    }
    reader.readAsDataURL(file)
  }

  const handleViewOrderDetails = (order: Order) => {
    setSelectedOrder(order)
  }

  const handleCloseOrderDetails = () => {
    setSelectedOrder(null)
  }

  const handleAcceptOrder = (order: Order) => {
    const updatedOrders = orders.map(o => 
      o.id === order.id ? { ...o, status: 'In Progress' as const, progress: 0 } : o
    )
    setOrders(updatedOrders)
    setSelectedOrder(null)
  }

  const handleRejectOrder = (order: Order) => {
    const updatedOrders = orders.filter(o => o.id !== order.id)
    setOrders(updatedOrders)
    setSelectedOrder(null)
  }

  const handleRequestChanges = (order: Order) => {
    // Implement request changes logic here
    console.log('Requesting changes for order:', order.id)
  }

  const handleUpdateProgress = (order: Order, newProgress: number) => {
    const updatedOrders = orders.map(o => 
      o.id === order.id ? { ...o, progress: newProgress, status: newProgress === 100 ? 'Completed' as const : o.status } : o
    )
    setOrders(updatedOrders)
  }

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark' : ''}`}>
      {/* Top Navigation Bar */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-4">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </div>
      </header>
      <div className="flex flex-1">
        {/* Left Sidebar */}
        <aside className={`bg-muted/40 w-64 p-4 space-y-4 transition-all duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed h-full z-10 overflow-y-auto`}>
          <nav className="space-y-2">
            <Button variant="ghost" className="w-full justify-start" onClick={() => setCurrentView('dashboard')}>
              <Home className="mr-2 h-4 w-4" /> Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => setCurrentView('new-orders')}>
              <Package className="mr-2 h-4 w-4" /> New Orders
              <Badge variant="secondary" className="ml-auto">{orders.filter(o => o.status === 'New').length}</Badge>
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => setCurrentView('ongoing-orders')}>
              <Scissors className="mr-2 h-4 w-4" /> Ongoing Orders
              <Badge variant="secondary" className="ml-auto">{orders.filter(o => o.status === 'In Progress').length}</Badge>
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => setCurrentView('completed-orders')}>
              <CheckCircle className="mr-2 h-4 w-4" /> Completed Orders
              <Badge variant="secondary" className="ml-auto">{orders.filter(o => o.status === 'Completed').length}</Badge>
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => setCurrentView('appointments')}>
              <CalendarIcon className="mr-2 h-4 w-4" /> Appointments
              <Badge variant="secondary" className="ml-auto">{appointments.length}</Badge>
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => setCurrentView('messages')}>
              <MessageSquare className="mr-2 h-4 w-4" /> Messages
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => setCurrentView('profile')}>
              <Settings className="mr-2 h-4 w-4" /> Profile
            </Button>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className={`flex-1 p-6 lg:p-8 bg-background overflow-y-auto ${isSidebarOpen ? 'ml-64' : ''}`}>
          {currentView === 'dashboard' && (
            <>
              <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{orders.length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{appointments.length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Urgent Orders</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{orders.filter(order => order.isUrgent).length}</div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[300px]">
                      {orders.slice(0, 5).map(order => (
                        <div key={order.id} className="flex items-center justify-between py-2">
                          <div>
                            <p className="font-medium">{order.customerName}</p>
                            <p className="text-sm text-muted-foreground">{order.design.name}</p>
                          </div>
                          <Badge variant={order.isUrgent ? "destructive" : "secondary"}>{order.status}</Badge>
                        </div>
                      ))}
                    </ScrollArea>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Appointments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[300px]">
                      {appointments.map(appointment => (
                        <div key={appointment.id} className="flex items-center justify-between py-2">
                          <div>
                            <p className="font-medium">{appointment.customerName}</p>
                            <p className="text-sm text-muted-foreground">{appointment.type} - {appointment.date} {appointment.time}</p>
                          </div>
                          <Badge>{appointment.type}</Badge>
                        </div>
                      ))}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {currentView === 'new-orders' && (
            <>
              <h1 className="text-3xl font-bold mb-6">New Orders</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.filter(order => order.status === 'New').map(order => (
                  <Card key={order.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        <span>{order.id}</span>
                        {order.isUrgent && <Badge variant="destructive">Urgent</Badge>}
                      </CardTitle>
                      <CardDescription>{order.customerName}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-4 mb-4">
                        <img src={order.design.image} alt={order.design.name} className="w-16 h-16 object-cover rounded" />
                        <div>
                          <p className="font-semibold">{order.design.name}</p>
                          <p className="text-sm text-muted-foreground">Due: {order.deadline}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => handleViewOrderDetails(order)}>View Details</Button>
                      <Button onClick={() => handleAcceptOrder(order)}>Accept</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </>
          )}

          {currentView === 'ongoing-orders' && (
            <>
              <h1 className="text-3xl font-bold mb-6">Ongoing Orders</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.filter(order => order.status === 'In Progress').map(order => (
                  <Card key={order.id}>
                    <CardHeader>
                      <CardTitle>{order.id}</CardTitle>
                      <CardDescription>{order.customerName}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-4 mb-4">
                        <img src={order.design.image} alt={order.design.name} className="w-16 h-16 object-cover rounded" />
                        <div>
                          <p className="font-semibold">{order.design.name}</p>
                          <p className="text-sm text-muted-foreground">Due: {order.deadline}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{order.progress}%</span>
                        </div>
                        <Progress value={order.progress} className="w-full" />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => handleViewOrderDetails(order)}>View Details</Button>
                      <Button onClick={() => handleUpdateProgress(order, (order.progress || 0) + 10)}>Update Progress</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </>
          )}

          {currentView === 'completed-orders' && (
            <>
              <h1 className="text-3xl font-bold mb-6">Completed Orders</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.filter(order => order.status === 'Completed').map(order => (
                  <Card key={order.id}>
                    <CardHeader>
                      <CardTitle>{order.id}</CardTitle>
                      <CardDescription>{order.customerName}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-4 mb-4">
                        <img src={order.design.image} alt={order.design.name} className="w-16 h-16 object-cover rounded" />
                        <div>
                          <p className="font-semibold">{order.design.name}</p>
                          <p className="text-sm text-muted-foreground">Completed: {order.deadline}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button variant="outline" onClick={() => handleViewOrderDetails(order)}>View Details</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </>
          )}

          {currentView === 'appointments' && (
            <>
              <h1 className="text-3xl font-bold mb-6">Appointments</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {appointments.map(appointment => (
                  <Card key={appointment.id}>
                    <CardHeader>
                      <CardTitle>{appointment.customerName}</CardTitle>
                      <CardDescription>{appointment.type}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-2">
                        <CalendarIcon className="h-4 w-4" />
                        <span>{appointment.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <Clock className="h-4 w-4" />
                        <span>{appointment.time}</span>
                      </div>
                      {appointment.notes && (
                        <div className="mt-2">
                          <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button variant="outline">Reschedule</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <div className="mt-6">
                <Button onClick={() => {
                  // Open a dialog to add a new appointment
                  // This is a placeholder for the actual implementation
                  console.log('Open add appointment dialog')
                }}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New Appointment
                </Button>
              </div>
            </>
          )}
          {currentView === 'profile' && <TailorProfile />}

        </main>
      </div>

      {/* Order Details Dialog */}
      {selectedOrder && (
        <Dialog open={!!selectedOrder} onOpenChange={handleCloseOrderDetails}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center text-lg">
                <span>{selectedOrder.id} - {selectedOrder.customerName}</span>
                <Badge variant={selectedOrder.isUrgent ? "destructive" : "secondary"}>
                  {selectedOrder.isUrgent ? "Urgent" : selectedOrder.status}
                </Badge>
              </DialogTitle>
              <DialogDescription>Order Details</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-1 text-sm">Fabric Details</h3>
                <div className="flex space-x-2 mb-2">
                  <img src={selectedOrder.fabric.image} alt={selectedOrder.fabric.name} className="w-16 h-16 object-cover rounded" />
                  <div className="text-sm">
                    <p className="font-semibold">{selectedOrder.fabric.name}</p>
                    <p>{selectedOrder.fabric.color}</p>
                    <p>${selectedOrder.fabric.price}/yard</p>
                  </div>
                </div>
                <h3 className="font-semibold mb-1 text-sm">Design Details</h3>
                <div className="flex space-x-2 mb-2">
                  <img src={selectedOrder.design.image} alt={selectedOrder.design.name} className="w-16 h-16 object-cover rounded" />
                  <div className="text-sm">
                    <p className="font-semibold">{selectedOrder.design.name}</p>
                    <p>{selectedOrder.design.customizations.join(', ')}</p>
                  </div>
                </div>
                {selectedOrder.customDesign && (
                  <>
                    <h3 className="font-semibold mb-1 text-sm">Custom Design</h3>
                    <div className="flex space-x-2 mb-2">
                      <img src={selectedOrder.customDesign.sketch} alt="Custom Design" className="w-16 h-16 object-cover rounded" />
                      <p className="text-sm">{selectedOrder.customDesign.notes}</p>
                    </div>
                  </>
                )}
                <h3 className="font-semibold mb-1 text-sm">Reference Image</h3>
                <div className="flex space-x-2 mb-2">
                  <img src={selectedOrder.referenceImage} alt="Reference Image" className="w-16 h-16 object-cover rounded" />
                </div>
                <h3 className="font-semibold mb-1 text-sm">Specific Instructions</h3>
                <p className="text-sm mb-2">{selectedOrder.specificInstructions}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-sm">Measurements</h3>
                <ul className="list-disc list-inside mb-2 text-sm">
                  {Object.entries(selectedOrder.measurements).map(([key, value]) => (
                    <li key={key}>{key}: {value} {key === 'height' ? 'cm' : 'inches'}</li>
                  ))}
                </ul>
                <h3 className="font-semibold mb-1 text-sm">Order Timeline</h3>
                <div className="space-y-1 text-sm">
                  {Object.entries(selectedOrder.orderTimeline).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                      <Badge variant="outline">{value}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Separator className="my-2" />
            <div>
              <h3 className="font-semibold mb-1 text-sm">Customer Communication</h3>
              <ScrollArea className="h-[150px] w-full rounded-md border p-2 mb-2">
                {selectedOrder.messages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === 'tailor' ? 'justify-end' : 'justify-start'} mb-1`}>
                    <div className={`max-w-[70%] rounded-lg px-2 py-1 ${message.sender === 'tailor' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                      {message.image ? (
                        <img src={message.image} alt="Sent by tailor" className="max-w-full h-auto rounded" />
                      ) : (
                        <p className="text-xs">{message.content}</p>
                      )}
                      <span className="text-[10px] text-gray-500">{new Date(message.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </ScrollArea>
              <div className="flex items-center mt-1">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-grow mr-1 text-sm"
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file && selectedOrder) {
                      handleSendImage(selectedOrder.id, file)
                    }
                  }}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="mr-1"
                >
                  <ImageIcon className="h-3 w-3" />
                </Button>
                <Button size="sm" onClick={() => handleSendMessage(selectedOrder.id)}>Send</Button>
              </div>
            </div>
            <DialogFooter className="flex justify-between mt-2">
              <Button variant="outline" size="sm" onClick={handleCloseOrderDetails}>Close</Button>
              <div className="space-x-1">
                {selectedOrder.status === 'New' && (
                  <>
                    <Button variant="destructive" size="sm" onClick={() => handleRejectOrder(selectedOrder)}>Reject</Button>
                    <Button variant="secondary" size="sm" onClick={() => handleRequestChanges(selectedOrder)}>Request Changes</Button>
                    <Button size="sm" onClick={() => handleAcceptOrder(selectedOrder)}>Accept</Button>
                  </>
                )}
                {selectedOrder.status === 'In Progress' && (
                  <Button size="sm" onClick={() => handleUpdateProgress(selectedOrder, (selectedOrder.progress || 0) + 10)}>
                    Update Progress
                  </Button>
                )}
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )}