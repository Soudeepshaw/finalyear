import { Button } from "@/Components/ui/button"
import { Card, CardContent } from "@/Components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import { Star, MapPin, Phone, Mail } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"

export default function TailorProfile() {
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
              <Button variant="ghost">Back to Search</Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src="https://ideogram.ai/api/images/direct/4oha2yoGT96E_9EitmEXDQ.jpg" alt="Tailor Studio 1" />
                <AvatarFallback>TS1</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Tailor Studio 1</h1>
                <div className="mt-1 flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">4.7 (120 reviews)</span>
                </div>
              </div>
            </div>
            <Button size="lg">Order Now</Button>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <MapPin className="h-5 w-5 mr-1" />
                  Location
                </dt>
                <dd className="mt-1 text-sm text-gray-900">123 Tailor St, Fashion City, FC 12345</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Phone className="h-5 w-5 mr-1" />
                  Phone
                </dt>
                <dd className="mt-1 text-sm text-gray-900">+1 (555) 123-4567</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Mail className="h-5 w-5 mr-1" />
                  Email
                </dt>
                <dd className="mt-1 text-sm text-gray-900">contact@tailorstudio1.com</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Specialties</dt>
                <dd className="mt-1 text-sm text-gray-900">Men's Wear, Formal, Casual, Ethnic</dd>
              </div>
            </dl>
          </div>
        </div>

        <Tabs defaultValue="catalog" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="catalog">Catalog</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="catalog">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                <Card key={item} className="hover:shadow-xl transition-all duration-300 transform hover:scale-105 shadow-md">
                  <img
                    src={[
                      "https://images.pexels.com/photos/291759/pexels-photo-291759.jpeg?auto=compress&cs=tinysrgb&w=600",
                      "https://images.pexels.com/photos/157757/wedding-dresses-fashion-character-bride-157757.jpeg?auto=compress&cs=tinysrgb&w=600",
                      "https://images.pexels.com/photos/27969128/pexels-photo-27969128/free-photo-of-photoshoot-pose-for-manjai.jpeg?auto=compress&cs=tinysrgb&w=600",
                      "https://images.pexels.com/photos/26256161/pexels-photo-26256161/free-photo-of-woman-wearing-black-suit-in-a-studio.jpeg?auto=compress&cs=tinysrgb&w=600",
                      "https://images.pexels.com/photos/3178767/pexels-photo-3178767.jpeg?auto=compress&cs=tinysrgb&w=600",
                      "https://images.pexels.com/photos/13979907/pexels-photo-13979907.jpeg?auto=compress&cs=tinysrgb&w=600"
                    ][item % 6]}
                    alt={`Catalog item ${item}`}
                    className="w-full h-48 object-cover transition-opacity duration-300 hover:opacity-80"
                  />
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-1">Item {item}</h3>
                    <p className="text-sm text-gray-600">Custom {item % 2 === 0 ? 'Formal' : 'Casual'} Wear</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="portfolio">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((project) => (
                <Card key={project} className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <img
                    src={[
                      "https://media.istockphoto.com/id/1720037538/photo/indian-lehnga-or-skirt-in-display-fashion-concept.jpg?s=612x612&w=0&k=20&c=kSe-Vc5_TAOk9IIGCG4TqB7PVJCGcUnbJJmrLoMLMhM=",
                      "https://media.istockphoto.com/id/1187160691/photo/young-indian-lady-wearing-traditional-costume.jpg?s=612x612&w=0&k=20&c=g15YTjz1ZtslnrLsVZ201X-wTsh8mvRoaKvCW5G1flE=",
                      "https://media.istockphoto.com/id/1201989020/photo/indian-groom-wedding-sharwani-dress-and-khussa-shoes.jpg?s=612x612&w=0&k=20&c=aEwS_REWWClr5dCZ7CMfpFzqqrGM9HzaqwrS-T_HDpQ=",
                      "https://media.istockphoto.com/id/1323013929/photo/stock-photo.jpg?s=612x612&w=0&k=20&c=3_k4CtxC1zWXX-dCfdl3f382XAG225dXvMRWJ17fTHI="
                    ][project - 1]}
                    alt={`Portfolio project ${project}`}
                    className="w-full h-64 object-cover transition-opacity duration-300 hover:opacity-90"
                  />
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-3">Custom Project {project}</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {project === 1 && "Exquisite lehenga crafted with intricate embroidery and vibrant colors."}
                      {project === 2 && "Elegant traditional costume showcasing rich cultural heritage and craftsmanship."}
                      {project === 3 && "Sophisticated groom's attire featuring a beautifully tailored sherwani and matching accessories."}
                      {project === 4 && "Contemporary fusion wear blending modern design with traditional elements."}
                    </p>
                    <Button variant="outline" className="mt-2 hover:bg-gray-100 transition-colors duration-300">View Details</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="reviews">
            <div className="space-y-8">
              {[1, 2, 3, 4, 5].map((review) => (
                <Card key={review} className="hover:shadow-lg transition-all duration-300 transform hover:scale-102">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <img
                          src={`https://i.pravatar.cc/40?img=${review}`}
                          alt={`Customer ${review}`}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                          <h4 className="font-semibold">Customer {review}</h4>
                          <p className="text-sm text-gray-500">Verified Purchase</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-5 w-5 ${i < 5 ? 'text-yellow-400' : 'text-gray-300'}`} fill={i < 5 ? 'currentColor' : 'none'} />
                        ))}
                        <span className="ml-2 text-sm font-medium text-gray-600">5.0</span>
                      </div>
                    </div>
                    <p className="text-gray-800 mb-4 italic">
                      "Exceptional craftsmanship! The attention to detail was impressive. I couldn't be happier with my custom-tailored outfit."
                    </p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>{new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString()}</span>
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                        Helpful
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}