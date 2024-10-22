//import React from 'react'
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import { Star, MapPin, Phone, Mail, Scissors } from 'lucide-react'

// Mock data for the tailor
const tailor = {
  id: 1,
  name: "Emma's Tailoring",
  rating: 4.8,
  totalReviews: 120,
  experience: 10,
  specialty: "Women's Formal Wear",
  location: "123 Fashion St, New York, NY 10001",
  phone: "+1 (555) 123-4567",
  email: "emma@emmastailoring.com",
  about: "With over a decade of experience in women's formal wear, Emma's Tailoring brings a perfect blend of classic elegance and modern trends to every piece. Our attention to detail and commitment to quality ensures that each garment is tailored to perfection.",
  services: [
    { name: "Evening Gowns", price: "$300+" },
    { name: "Wedding Dresses", price: "$500+" },
    { name: "Business Suits", price: "$250+" },
    { name: "Alterations", price: "$50+" },
  ],
  portfolio: [
    { id: 1, title: "Elegant Evening Gown", image: "/placeholder.svg?height=300&width=400" },
    { id: 2, title: "Bridal Collection 2023", image: "/placeholder.svg?height=300&width=400" },
    { id: 3, title: "Corporate Chic Suits", image: "/placeholder.svg?height=300&width=400" },
    { id: 4, title: "Vintage-Inspired Dresses", image: "/placeholder.svg?height=300&width=400" },
  ],
  reviews: [
    { id: 1, author: "Sarah L.", rating: 5, comment: "Emma created the most beautiful wedding dress for me. Her attention to detail is impeccable!" },
    { id: 2, author: "Jessica M.", rating: 4, comment: "Great work on my evening gown. Fit like a glove and received many compliments." },
    { id: 3, author: "Rachel K.", rating: 5, comment: "Excellent alterations on my suit. Quick turnaround and professional service." },
  ]
}

export default function TailorProfilePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="mb-4">
          <Button variant="outline" className="hover:bg-blue-50">Back to Search</Button>
        </div>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="px-6 py-8 sm:px-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{tailor.name}</h1>
              <div className="mt-2 flex items-center">
                <Star className="h-6 w-6 text-yellow-400" fill="currentColor" />
                <span className="ml-2 text-lg font-semibold text-gray-700">{tailor.rating}</span>
                <span className="ml-1 text-sm text-gray-500">({tailor.totalReviews} reviews)</span>
              </div>
            </div>
            <Button size="lg" className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white">Book Now</Button>
          </div>

          <div className="border-t border-gray-200 px-6 py-6 sm:px-8">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-blue-500" />
                  Location
                </dt>
                <dd className="mt-1 text-sm text-gray-900">{tailor.location}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-blue-500" />
                  Phone
                </dt>
                <dd className="mt-1 text-sm text-gray-900">{tailor.phone}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-blue-500" />
                  Email
                </dt>
                <dd className="mt-1 text-sm text-gray-900">{tailor.email}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Scissors className="h-5 w-5 mr-2 text-blue-500" />
                  Specialty
                </dt>
                <dd className="mt-1 text-sm text-gray-900">{tailor.specialty}</dd>
              </div>
            </dl>
          </div>
        </div>

        <Card className="mb-8 shadow-lg">
          <CardHeader className="bg-gray-50">
            <CardTitle className="text-2xl">About {tailor.name}</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 leading-relaxed">{tailor.about}</p>
          </CardContent>
        </Card>

        <Tabs defaultValue="services" className="mb-8">
          <TabsList className="bg-gray-100 p-1 rounded-lg">
            <TabsTrigger value="services" className="px-4 py-2 rounded-md">Services</TabsTrigger>
            <TabsTrigger value="portfolio" className="px-4 py-2 rounded-md">Portfolio</TabsTrigger>
            <TabsTrigger value="reviews" className="px-4 py-2 rounded-md">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="services">
            <Card className="shadow-lg">
              <CardHeader className="bg-gray-50">
                <CardTitle className="text-2xl">Services Offered</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="divide-y divide-gray-200">
                  {tailor.services.map((service, index) => (
                    <li key={index} className="py-4 flex justify-between items-center">
                      <span className="text-gray-900 font-medium">{service.name}</span>
                      <span className="text-gray-600 bg-gray-100 px-3 py-1 rounded-full">{service.price}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="portfolio">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {tailor.portfolio.map((item) => (
                <Card key={item.id} className="overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
                  <img src={item.image} alt={item.title} className="w-full h-64 object-cover" />
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg text-gray-800">{item.title}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="reviews">
            <div className="space-y-6">
              {tailor.reviews.map((review) => (
                <Card key={review.id} className="shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                          fill="currentColor"
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-3 italic">"{review.comment}"</p>
                    <p className="text-sm font-medium text-gray-900">- {review.author}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
            Book an Appointment
          </Button>
        </div>
      </main>
    </div>
  )
}