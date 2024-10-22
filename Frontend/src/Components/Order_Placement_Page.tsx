//import React from 'react'
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group"
import { Label } from "@/Components/ui/label"
import { Textarea } from "@/Components/ui/textarea"
import { Upload, Scissors } from 'lucide-react'
import { ScrollArea } from "@/Components/ui/scroll-area"

export default function OrderPlacement() {
  const fabricTypes = [
    { name: 'Cotton', image: 'https://sourceitright.com/cdn/shop/products/9438X_4_360x.jpg?v=1682344323' },
    { name: 'Linen', image: 'https://sourceitright.com/cdn/shop/products/4198AU_2_360x.jpg?v=1626258165' },
    { name: 'Silk', image: 'https://sourceitright.com/cdn/shop/files/9707EX4_4_360x.jpg?v=1694423185' },
    { name: 'Wool', image: 'https://sourceitright.com/cdn/shop/files/4147BG_2_Old_360x.jpg?v=1715170016' },
    { name: 'Polyester', image: 'https://sourceitright.com/cdn/shop/products/4198M_2_360x.jpg?v=1626246224' },
    { name: 'Denim', image: 'https://sourceitright.com/cdn/shop/files/2151RC1_4_360x.jpg?v=1683026080' },
    { name: 'Velvet', image: 'https://cdn.shopify.com/s/files/1/0285/2667/4059/products/4198O_2_360x.jpg?v=1626245321' },
    { name: 'Chiffon', image: 'https://cdn.shopify.com/s/files/1/0285/2667/4059/files/9473CJ_4_360x.jpg?v=1688378368' },
    { name: 'Satin', image: 'https://cdn.shopify.com/s/files/1/0285/2667/4059/files/2151QN4_4_360x.jpg?v=1682943326' },
    { name: 'Tweed', image: 'https://sourceitright.com/cdn/shop/files/4147BG_2_Old_360x.jpg?v=1715170016' },
    { name: 'Corduroy', image: 'https://sourceitright.com/cdn/shop/products/9438X_4_360x.jpg?v=1682344323' },
    { name: 'Cashmere', image: 'https://sourceitright.com/cdn/shop/products/4198AU_2_360x.jpg?v=1626258165' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-blue-600">CustomFit</span>
              </div>
            </div>
            <div className="flex items-center">
              <Button variant="ghost">Back to Profile</Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Place Your Order</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Tabs defaultValue="fabric" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="fabric">Fabric</TabsTrigger>
                <TabsTrigger value="design">Design</TabsTrigger>
                <TabsTrigger value="measurements">Measurements</TabsTrigger>
              </TabsList>
              <TabsContent value="fabric">
                <Card>
                  <CardHeader>
                    <CardTitle>Select Fabric</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px] pr-4">
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {fabricTypes.map((fabric) => (
                          <div key={fabric.name} className="relative">
                            <input
                              type="radio"
                              id={fabric.name.toLowerCase()}
                              name="fabric"
                              value={fabric.name.toLowerCase()}
                              className="peer sr-only"
                            />
                            <label
                              htmlFor={fabric.name.toLowerCase()}
                              className="flex flex-col items-center p-2 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 peer-checked:border-blue-500 peer-checked:bg-blue-50"
                            >
                              <img
                                src={fabric.image}
                                alt={fabric.name}
                                className="w-full h-32 object-cover rounded-md mb-2"
                              />
                              <span className="text-sm font-medium">{fabric.name}</span>
                            </label>
                            <div className="absolute hidden w-5 h-5 peer-checked:block top-2 right-2 bg-blue-500 rounded-full">
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                              </svg>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="design">
                <Card>
                  <CardHeader>
                    <CardTitle>Choose Design</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="clothing-type">Clothing Type</Label>
                        <RadioGroup defaultValue="shirt" className="mt-2">
                          {['Shirt', 'Pants', 'Suit', 'Dress'].map((type) => (
                            <div key={type} className="flex items-center space-x-2">
                              <RadioGroupItem value={type.toLowerCase()} id={type.toLowerCase()} />
                              <Label htmlFor={type.toLowerCase()}>{type}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                      <div>
                        <Label htmlFor="fit">Fit</Label>
                        <RadioGroup defaultValue="regular" className="mt-2">
                          {['Slim', 'Regular', 'Relaxed'].map((fit) => (
                            <div key={fit} className="flex items-center space-x-2">
                              <RadioGroupItem value={fit.toLowerCase()} id={fit.toLowerCase()} />
                              <Label htmlFor={fit.toLowerCase()}>{fit}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                      <div>
                        <Label htmlFor="additional-notes">Additional Notes</Label>
                        <Textarea
                          id="additional-notes"
                          placeholder="Any specific design requests or preferences?"
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="measurements">
                <Card>
                  <CardHeader>
                    <CardTitle>AI-Powered Measurements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">Upload full-body photos for automated measurements:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-1 text-sm text-gray-600">Front View</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Upload Photo
                        </Button>
                      </div>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-1 text-sm text-gray-600">Side View</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Upload Photo
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Please ensure you're wearing form-fitting clothes and stand against a plain background for accurate measurements.
                    </p>
                    <Button className="w-full">
                      <Scissors className="mr-2 h-4 w-4" />
                      Get AI Measurements
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="font-medium">Fabric:</dt>
                    <dd>Cotton</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Design:</dt>
                    <dd>Shirt (Slim Fit)</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Measurements:</dt>
                    <dd>AI-Generated</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Estimated Delivery:</dt>
                    <dd>2-3 weeks</dd>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex justify-between font-bold">
                      <dt>Total:</dt>
                      <dd>$149.99</dd>
                    </div>
                  </div>
                </dl>
                <Button className="w-full mt-6">Place Order</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}