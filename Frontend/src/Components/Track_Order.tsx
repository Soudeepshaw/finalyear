import React from 'react'
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import { Textarea } from "@/Components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { Badge } from "@/Components/ui/badge"
import { Separator } from "@/Components/ui/separator"
import { CheckCircle, Clock, Scissors, Package, Truck } from 'lucide-react'

export default function OrderTrackingPage() {
  const order = {
    id: "ORD-12345",
    status: "In Progress",
    tailor: {
      name: "Alex Johnson",
      image: "/placeholder.svg"
    },
    service: "Custom Suit",
    fabric: "Italian Wool",
    color: "Navy Blue",
    orderDate: "2023-06-01",
    estimatedDelivery: "2023-06-15",
    progress: 50
  }

  const stages = [
    { id: 1, name: "Order Placed", icon: CheckCircle, completed: true },
    { id: 2, name: "Fabric Selected", icon: Scissors, completed: true },
    { id: 3, name: "Tailoring", icon: Scissors, completed: true },
    { id: 4, name: "Quality Check", icon: Package, completed: false },
    { id: 5, name: "Ready for Pickup", icon: Truck, completed: false }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Order Tracking</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Order {order.id}</CardTitle>
                <Badge variant={order.status === "In Progress" ? "secondary" : "success"}>{order.status}</Badge>
              </div>
              <CardDescription>Placed on {order.orderDate}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Order Progress</h3>
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary-foreground bg-primary">
                          {order.progress}%
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block">
                          Estimated Delivery: {order.estimatedDelivery}
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary-foreground">
                      <div style={{ width: `${order.progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"></div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Order Stages</h3>
                  <div className="flex justify-between">
                    {stages.map((stage, index) => (
                      <div key={stage.id} className="flex flex-col items-center">
                        <div className={`rounded-full p-2 ${stage.completed ? 'bg-primary text-primary-foreground' : 'bg-gray-200'}`}>
                          <stage.icon className="h-6 w-6" />
                        </div>
                        <p className="text-sm mt-2 text-center">{stage.name}</p>
                        {index < stages.length - 1 && (
                          <div className={`h-1 w-16 mt-2 ${stage.completed ? 'bg-primary' : 'bg-gray-200'}`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold">Service</p>
                  <p>{order.service}</p>
                </div>
                <div>
                  <p className="font-semibold">Fabric</p>
                  <p>{order.fabric}</p>
                </div>
                <div>
                  <p className="font-semibold">Color</p>
                  <p>{order.color}</p>
                </div>
                <div>
                  <p className="font-semibold">Tailor</p>
                  <p>{order.tailor.name}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Contact Tailor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-4">
                <Avatar className="h-10 w-10 mr-4">
                  <AvatarImage src={order.tailor.image} />
                  <AvatarFallback>{order.tailor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{order.tailor.name}</p>
                  <p className="text-sm text-gray-500">Your Tailor</p>
                </div>
              </div>
              <Textarea placeholder="Type your message here..." className="mb-4" />
              <Button className="w-full">Send Message</Button>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">If you have any questions or concerns about your order, our customer support team is here to help.</p>
              <Button variant="outline" className="w-full">Contact Support</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}