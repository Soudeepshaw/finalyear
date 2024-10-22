import React, { useState } from 'react'
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import  Input  from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Textarea } from "@/Components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { Badge } from "@/Components/ui/badge"
import { Separator } from "@/Components/ui/separator"
import { ScrollArea } from "@/Components/ui/scroll-area"
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover"
import { Calendar } from "@/Components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar as CalendarIcon, ChevronRight, HelpCircle, Info, MapPin, Phone, Star, Upload } from 'lucide-react'

export default function OrderBookingPage() {
const [step, setStep] = useState(1)
const [selectedSize, setSelectedSize] = useState('')
const [selectedFabric, setSelectedFabric] = useState('')
const [customInstructions, setCustomInstructions] = useState('')
const [measurementPhotos, setMeasurementPhotos] = useState({ front: null, side: null })

const [date, setDate] = useState<Date | undefined>(undefined)

const tailor = {
  name: "John Doe",
  avatar: "/placeholder.svg?height=100&width=100",
  rating: 4.8,
  reviews: 156,
  specialties: ["Suits", "Dresses", "Alterations"],
  experience: "15+ years",
  location: "New York, NY",
  phone: "+1 (555) 123-4567"
}

const catalogItem = {
  name: "Classic Tailored Suit",
  image: "/placeholder.svg?height=300&width=300",
  description: "A timeless, elegant suit perfect for any formal occasion.",
  price: 599.99,
  sizes: ["S", "M", "L", "XL", "Custom"],
}

const fabrics = [
  { name: "Premium Wool", image: "/placeholder.svg?height=100&width=100", price: 79.99 },
  { name: "Italian Cotton", image: "/placeholder.svg?height=100&width=100", price: 59.99 },
  { name: "Silk Blend", image: "/placeholder.svg?height=100&width=100", price: 89.99 },
  { name: "Linen", image: "/placeholder.svg?height=100&width=100", price: 69.99 },
  { name: "Cashmere Blend", image: "/placeholder.svg?height=100&width=100", price: 99.99 },
  { name: "Polyester Blend", image: "/placeholder.svg?height=100&width=100", price: 49.99 },
]
const [referenceImages, setReferenceImages] = useState<string[]>([]);

const handleFileUpload = (event:React.ChangeEvent<HTMLInputElement>, view:'front' | 'side') => {
  const file = event.target.files?.[0]
  if (file) {
    setMeasurementPhotos(prev => ({ ...prev, [view]: URL.createObjectURL(file) }))
  }
}

const handleReferenceImageUpload = (event:React.ChangeEvent<HTMLInputElement>) => {
  const files = event.target.files
  if (files) {
    const newImages = Array.from(files).map(file => URL.createObjectURL(file))
    setReferenceImages(prev => [...prev, ...newImages])
  }
}

const calculateTotalPrice = () => {
  const basePrice = catalogItem.price
  const fabricPrice = fabrics.find(f => f.name === selectedFabric)?.price || 0
  const customizationFee = 50 // Assuming a flat customization fee
  return basePrice + fabricPrice + customizationFee
}

return (
  <div className="container mx-auto p-4 space-y-8">
    <h1 className="text-3xl font-bold">Order Booking</h1>

    <Card>
      <CardHeader>
        <CardTitle>Selected Tailor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={tailor.avatar} alt={tailor.name} />
            <AvatarFallback>{tailor.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-semibold">{tailor.name}</h2>
            <div className="flex items-center mt-1">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="ml-1">{tailor.rating}</span>
              <span className="text-muted-foreground ml-1">({tailor.reviews} reviews)</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {tailor.specialties.map((specialty, index) => (
                <Badge key={index} variant="secondary">{specialty}</Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <p className="flex items-center"><Info className="w-4 h-4 mr-2" /> Experience: {tailor.experience}</p>
          <p className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> {tailor.location}</p>
          <p className="flex items-center"><Phone className="w-4 h-4 mr-2" /> {tailor.phone}</p>
        </div>
      </CardContent>
    </Card>

    <Tabs value={`step${step}`} onValueChange={(value) => setStep(parseInt(value.replace('step', '')))}>
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="step1">Item Selection</TabsTrigger>
        <TabsTrigger value="step2">Fabric Selection</TabsTrigger>
        <TabsTrigger value="step3">Measurements</TabsTrigger>
        <TabsTrigger value="step4">Customization</TabsTrigger>
        <TabsTrigger value="step5">Review & Book</TabsTrigger>
      </TabsList>

      <TabsContent value="step1">
        <Card>
          <CardHeader>
            <CardTitle>Select Catalog Item</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <img
                  src={catalogItem.image}
                  alt={catalogItem.name}
                  className="rounded-lg w-full h-auto"
                />
              </div>
              <div className="flex-1 space-y-4">
                <h3 className="text-xl font-semibold">{catalogItem.name}</h3>
                <p>{catalogItem.description}</p>
                <p className="text-2xl font-bold">${catalogItem.price.toFixed(2)}</p>
                <div>
                  <Label htmlFor="size">Size</Label>
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger id="size">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {catalogItem.sizes.map((size) => (
                        <SelectItem key={size} value={size}>{size}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => setStep(2)}>Next: Fabric Selection</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="step2">
        <Card>
          <CardHeader>
            <CardTitle>Select Fabric</CardTitle>
            <CardDescription>Choose from our premium fabric selection</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedFabric} onValueChange={setSelectedFabric} className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {fabrics.map((fabric) => (
                <div key={fabric.name} className="relative">
                  <RadioGroupItem value={fabric.name} id={fabric.name} className="peer sr-only" />
                  <Label
                    htmlFor={fabric.name}
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <img src={fabric.image} alt={fabric.name} className="rounded-md mb-2 w-24 h-24 object-cover" />
                    <span className="text-sm font-medium">{fabric.name}</span>
                    <span className="text-sm text-muted-foreground">${fabric.price.toFixed(2)}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
            <Button onClick={() => setStep(3)}>Next: Measurements</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="step3">
        <Card>
          <CardHeader>
            <CardTitle>Upload Measurements</CardTitle>
            <CardDescription>
              Upload front and side view photos for AI-powered measurements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="front-photo">Front View Photo</Label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    {measurementPhotos.front ? (
                      <img
                        src={measurementPhotos.front}
                        alt="Front view"
                        className="mx-auto rounded-lg w-48 h-48 object-cover"
                      />
                    ) : (
                      <Upload className="mx-auto h-12 w-12 text-gray-300" />
                    )}
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <Label
                        htmlFor="front-photo-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary-dark"
                      >
                        <span>Upload a file</span>
                        <Input
                          id="front-photo-upload"
                          name="front-photo-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, 'front')}
                        />
                      </Label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="side-photo">Side View Photo</Label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    {measurementPhotos.side ? (
                      <img
                        src={measurementPhotos.side}
                        alt="Side view"
                        className="mx-auto rounded-lg w-48 h-48 object-cover"
                      />
                    ) : (
                      <Upload className="mx-auto h-12 w-12 text-gray-300" />
                    )}
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <Label
                        htmlFor="side-photo-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary-dark"
                      >
                        <span>Upload a file</span>
                        <Input
                          id="side-photo-upload"
                          name="side-photo-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, 'side')}
                        />
                      </Label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Tips for Accurate Measurements:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Wear form-fitting clothes</li>
                <li>Stand straight with arms slightly away from your body</li>
                <li>Ensure good lighting and a plain background</li>
                <li>Take photos from head to toe</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
            <Button onClick={() => setStep(4)}>Next: Customization</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="step4">
        <Card>
          <CardHeader>
            <CardTitle>Customization</CardTitle>
            <CardDescription>Provide any specific instructions or preferences for your order</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="custom-instructions">Custom Instructions</Label>
                <Textarea
                  id="custom-instructions"
                  placeholder="Enter any specific tailoring instructions or preferences..."
                  value={customInstructions}
                  onChange={(e) => setCustomInstructions(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="reference-images">Upload Reference Images (Optional)</Label>
                <Input
                  id="reference-images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleReferenceImageUpload}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  You can upload sketches or reference images for custom designs (JPEG, PNG formats accepted)
                </p>
              </div>
              {referenceImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  {referenceImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Reference image ${index + 1}`}
                      className="rounded-md w-24 h-24 object-cover"
                    />
                  ))}
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(3)}>Back</Button>
            <Button onClick={() => setStep(5)}>Next: Review & Book</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="step5">
        <Card>
          <CardHeader>
            <CardTitle>Review & Book</CardTitle>
            <CardDescription>Review your order details before booking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">Tailor:</p>
                    <div className="flex items-center mt-1">
                      <Avatar className="h-10 w-10 mr-2">
                        <AvatarImage src={tailor.avatar} alt={tailor.name} />
                        <AvatarFallback>{tailor.name[0]}</AvatarFallback>
                      </Avatar>
                      <span>{tailor.name}</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">Item:</p>
                    <div className="flex items-center mt-1">
                      <img
                        src={catalogItem.image}
                        alt={catalogItem.name}
                        className="rounded-md mr-2 w-24 h-24 object-cover"
                      />
                      <span>{catalogItem.name}</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">Size:</p>
                    <span>{selectedSize}</span>
                  </div>
                  <div>
                    <p className="font-medium">Fabric:</p>
                    <div className="flex items-center mt-1">
                      <img
                        src={fabrics.find(f => f.name === selectedFabric)?.image || ''}
                        alt={selectedFabric}
                        className="rounded-md mr-2 w-12 h-12 object-cover"
                      />
                      <span>{selectedFabric}</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">Measurements:</p>
                    <div className="flex space-x-2 mt-1">
                      {measurementPhotos.front && (
                        <img
                          src={measurementPhotos.front}
                          alt="Front view"
                          className="rounded-md w-24 h-24 object-cover"
                        />
                      )}
                      {measurementPhotos.side && (
                        <img
                          src={measurementPhotos.side}
                          alt="Side view"
                          className="rounded-md w-24 h-24 object-cover"
                        />
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">Custom Instructions:</p>
                    <p>{customInstructions || 'None'}</p>
                  </div>
                  {referenceImages.length > 0 && (
                    <div>
                      <p className="font-medium">Reference Images:</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {referenceImages.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Reference image ${index + 1}`}
                            className="rounded-md w-12 h-12 object-cover"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-2">Price Breakdown</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Base Price:</span>
                    <span>${catalogItem.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fabric:</span>
                    <span>${fabrics.find(f => f.name === selectedFabric)?.price.toFixed(2) || '0.00'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Customization Fee:</span>
                    <span>$50.00</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>${calculateTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Estimated Delivery Date</h3>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date || undefined}
                    onSelect={(newDate: Date | undefined) => setDate(newDate)}
                    initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(4)}>Back</Button>
            <div className="space-x-2">
              <Button variant="secondary">Add to Cart</Button>
              <Button>Book Now</Button>
            </div>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>

    <div className="flex justify-center">
      <a href="/faq" className="flex items-center text-primary hover:underline">
        <HelpCircle className="w-4 h-4 mr-1" />
        Need help? Check our FAQs
      </a>
    </div>
  </div>
)
}