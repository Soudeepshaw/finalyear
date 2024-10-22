import React, { useState } from 'react'
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Textarea } from "@/Components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import {Camera, Shirt, Scissors } from 'lucide-react'

// Mock data for fabric options
const fabricOptions = [
  { id: 1, name: "Cotton", type: "Natural", pattern: "Plain", price: 20 },
  { id: 2, name: "Linen", type: "Natural", pattern: "Textured", price: 25 },
  { id: 3, name: "Silk", type: "Natural", pattern: "Smooth", price: 40 },
  { id: 4, name: "Polyester", type: "Synthetic", pattern: "Plain", price: 15 },
  { id: 5, name: "Wool", type: "Natural", pattern: "Tweed", price: 35 },
  { id: 6, name: "Denim", type: "Natural", pattern: "Twill", price: 22 },
]

export default function AIMeasurementBookingPage() {
  const [frontImage, setFrontImage] = useState<string | null>(null)
  const [sideImage, setSideImage] = useState<string | null>(null)
  const [selectedFabric, setSelectedFabric] = useState<number | null>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, setImage: React.Dispatch<React.SetStateAction<string | null>>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-blue-600">TailorMatch</span>
              </div>
            </div>
            <div className="flex items-center">
              <Button variant="ghost">Home</Button>
              <Button variant="ghost">Find Tailors</Button>
              <Button variant="outline" className="ml-4">Sign In</Button>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">AI-Powered Measurements & Booking</h1>

        <Tabs defaultValue="measurements" className="mb-8">
          <TabsList>
            <TabsTrigger value="measurements">Measurements</TabsTrigger>
            <TabsTrigger value="fabric">Fabric Selection</TabsTrigger>
            <TabsTrigger value="customization">Customization</TabsTrigger>
          </TabsList>

          <TabsContent value="measurements">
            <Card>
              <CardHeader>
                <CardTitle>Upload Photos for AI Measurements</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-gray-600">
                  Please upload clear, full-body photos against a plain background. Wear form-fitting clothes for accurate measurements.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="front-photo">Front View</Label>
                    <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      {frontImage ? (
                        <img src={frontImage} alt="Front view" className="max-h-64 object-contain" />
                      ) : (
                        <div className="space-y-1 text-center">
                          <Camera className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label htmlFor="front-photo" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                              <span>Upload a file</span>
                              <Input id="front-photo" name="front-photo" type="file" className="sr-only" onChange={(e) => handleImageUpload(e, setFrontImage)} />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="side-photo">Side View</Label>
                    <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      {sideImage ? (
                        <img src={sideImage} alt="Side view" className="max-h-64 object-contain" />
                      ) : (
                        <div className="space-y-1 text-center">
                          <Camera className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label htmlFor="side-photo" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                              <span>Upload a file</span>
                              <Input id="side-photo" name="side-photo" type="file" className="sr-only" onChange={(e) => handleImageUpload(e, setSideImage)} />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <Button className="mt-6 w-full">
                  <Scissors className="mr-2 h-4 w-4" />
                  Get AI Measurements
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fabric">
            <Card>
              <CardHeader>
                <CardTitle>Select Your Fabric</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {fabricOptions.map((fabric) => (
                    <div
                      key={fabric.id}
                      className={`border rounded-lg p-4 cursor-pointer ${
                        selectedFabric === fabric.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                      onClick={() => setSelectedFabric(fabric.id)}
                    >
                      <Shirt className="h-12 w-12 text-gray-400 mb-2" />
                      <h3 className="font-semibold">{fabric.name}</h3>
                      <p className="text-sm text-gray-600">Type: {fabric.type}</p>
                      <p className="text-sm text-gray-600">Pattern: {fabric.pattern}</p>
                      <p className="text-sm font-medium mt-2">${fabric.price}/yard</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customization">
            <Card>
              <CardHeader>
                <CardTitle>Customize Your Order</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="garment-type">Garment Type</Label>
                    <Select>
                      <SelectTrigger id="garment-type">
                        <SelectValue placeholder="Select garment type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="shirt">Shirt</SelectItem>
                        <SelectItem value="pants">Pants</SelectItem>
                        <SelectItem value="dress">Dress</SelectItem>
                        <SelectItem value="suit">Suit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="fit">Fit Preference</Label>
                    <RadioGroup defaultValue="regular">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="slim" id="fit-slim" />
                        <Label htmlFor="fit-slim">Slim</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="regular" id="fit-regular" />
                        <Label htmlFor="fit-regular">Regular</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="loose" id="fit-loose" />
                        <Label htmlFor="fit-loose">Loose</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div>
                    <Label htmlFor="special-instructions">Special Instructions</Label>
                    <Textarea
                      id="special-instructions"
                      placeholder="Any additional details or customization requests?"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end">
          <Button size="lg">
            Proceed to Checkout
          </Button>
        </div>
      </main>
    </div>
  )
}