import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { CheckCircle, Circle, Scissors, Truck, MessageSquare } from 'lucide-react'

export default function OrderTracking() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <span className="text-3xl font-extrabold text-blue-600">CustomFit</span>
            </div>
            <div className="flex items-center">
              <Button variant="ghost" className="text-lg hover:bg-blue-100">My Orders</Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Track Your Order</h1>

        <Card className="shadow-lg">
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-2xl text-blue-700">Order #12345</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-10">
              <div className="relative">
                <div className="overflow-hidden h-3 mb-6 text-xs flex rounded-full bg-blue-200">
                  <div style={{ width: "75%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500"></div>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="text-center">
                    <CheckCircle className="mx-auto h-8 w-8 text-green-500" />
                    <p className="mt-2 font-semibold">Order Placed</p>
                  </div>
                  <div className="text-center">
                    <CheckCircle className="mx-auto h-8 w-8 text-green-500" />
                    <p className="mt-2 font-semibold">In Progress</p>
                  </div>
                  <div className="text-center">
                    <Scissors className="mx-auto h-8 w-8 text-blue-500 animate-pulse" />
                    <p className="mt-2 font-semibold">Tailoring</p>
                  </div>
                  <div className="text-center">
                    <Circle className="mx-auto h-8 w-8 text-gray-300" />
                    <p className="mt-2 font-semibold text-gray-500">Shipped</p>
                  </div>
                </div>
              </div>
            </div>

            <dl className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Estimated Delivery</dt>
                <dd className="mt-1 text-lg font-semibold text-gray-900">July 15, 2023</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Order Status</dt>
                <dd className="mt-1 text-lg font-semibold text-blue-600">Tailoring</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Tailor</dt>
                <dd className="mt-1 text-lg font-semibold text-gray-900">Tailor Studio 1</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Item</dt>
                <dd className="mt-1 text-lg font-semibold text-gray-900">Custom Shirt (Slim Fit)</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Fabric</dt>
                <dd className="mt-1 text-lg font-semibold text-gray-900">Cotton (Blue Pattern)</dd>
              </div>
            </dl>

            <div className="mt-8 flex justify-between">
              <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                <MessageSquare className="mr-2 h-5 w-5" />
                Contact Tailor
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Truck className="mr-2 h-5 w-5" />
                Track Shipment
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}