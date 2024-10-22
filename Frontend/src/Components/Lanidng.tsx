import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardFooter, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import { Scissors, Ruler, Shirt, CheckCircle, Search, Calendar, Star } from 'lucide-react'
import { Badge } from "@/Components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"

export default function LandingPage() {
  return (


    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <main>
        {/* Hero Section */}

        <section className="text-center py-24 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
          <h1 className="text-6xl font-bold mb-6 animate-fade-in">Custom Tailoring, Simplified</h1>
          <p className="text-2xl mb-10 animate-fade-in-delay">Get perfectly fitted clothes from the comfort of your home</p>
          <div className="flex justify-center space-x-6">
            <Button size="lg" className="bg-white text-indigo-600 hover:bg-indigo-100 transition-colors duration-300">Book a Tailor</Button>
            <Button size="lg" variant="outline" className="border-white text-black hover:bg-indigo-100 hover:text-indigo-600 transition-colors duration-300">Learn More</Button>
          </div>
        </section>

        {/* Features Section */}

        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


            <div className="text-center mb-20">
              <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
                Tailoring Excellence at Your Fingertips
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experience the future of custom tailoring with our innovative platform
              </p>
            </div>


            <div className="mt-16">
              <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { icon: Search, title: "Find Nearby Tailors", description: "Discover skilled tailors in your area with just a few clicks." },
                  { icon: Ruler, title: "AI-Driven Measurement", description: "Get accurate measurements using our cutting-edge AI technology." },
                  { icon: Shirt, title: "Custom Clothing Options", description: "Choose from a wide range of styles and fabrics for your perfect fit." },
                  { icon: CheckCircle, title: "Verified Tailors", description: "All our tailors are vetted and verified for quality assurance." },
                ].map((feature, index) => (



                  <div key={index} className="text-center group">
                    <div className="flex items-center justify-center h-20 w-20 rounded-full bg-indigo-100 text-indigo-600 mx-auto mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                      <feature.icon className="h-10 w-10" />
                    </div>


                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-lg text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}












        <section className="py-32 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              {[
                { step: 1, title: "Book a Tailor", description: "Choose from our network of expert tailors" },
                { step: 2, title: "AI Measurements", description: "Get measured using our AI-powered app" },
                { step: 3, title: "Design & Customize", description: "Create your perfect garment" },
                { step: 4, title: "Receive & Enjoy", description: "Get your custom-fitted clothes delivered" }
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-20 h-20 bg-indigo-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                  <p className="text-lg text-gray-600">{item.description}</p>
                </div>




              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}

        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


            <div className="text-center mb-20">
              <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
                Why Choose Us
              </h2>

              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experience the perfect fit with our unique advantages.
              </p>
            </div>
            <div className="mt-20">

              <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
                {[
                  { icon: Ruler, title: "Accurate Measurements", description: "Our AI-powered tool ensures precise measurements for the perfect fit." },
                  { icon: Calendar, title: "Convenience", description: "Book appointments at your preferred time and location." },
                  { icon: Scissors, title: "Experienced Tailors", description: "Work with skilled professionals vetted for quality and expertise." },
                ].map((feature, index) => (



                  <Card key={index} className="hover:shadow-xl transition-shadow duration-300 border-none">
                    <CardContent className="p-10 text-center">
                      <feature.icon className="h-20 w-20 text-indigo-600 mx-auto mb-8" />
                      <h3 className="text-2xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                      <p className="text-lg text-gray-600">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>































        {/* Featured Tailors Section */}
        <section className="py-32 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-16">Featured Tailors</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { name: "Alex Johnson", specialty: "Suits & Formal Wear", rating: 4.9, image: "/placeholder.svg" },
                { name: "Maria Garcia", specialty: "Dresses & Gowns", rating: 4.8, image: "/placeholder.svg" },
                { name: "Sam Lee", specialty: "Casual & Streetwear", rating: 4.7, image: "/placeholder.svg" }
              ].map((tailor) => (
                <Card key={tailor.name} className="hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-8">
                    <Avatar className="w-24 h-24 mx-auto mb-6 border-4 border-white">
                      <AvatarImage src={tailor.image} alt={tailor.name} />
                      <AvatarFallback>{tailor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-2xl text-center">{tailor.name}</CardTitle>
                    <CardDescription className="text-lg text-center text-indigo-100">{tailor.specialty}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center p-6">
                    <Badge variant="secondary" className="mb-4 text-lg px-4 py-2">
                      <Star className="w-5 h-5 mr-2 inline" />
                      {tailor.rating}
                    </Badge>
                    <p className="text-lg text-gray-600">20+ successful projects</p>
                  </CardContent>
                  <CardFooter className="justify-center p-6">
                    <Button className="w-full text-lg">Book Now</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}

        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


            <div className="text-center mb-20">
              <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
                What Our Customers Say
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Hear from our satisfied customers about their tailoring experience
              </p>
            </div>
            <div className="mt-20">

              <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                {[
                  { name: "Alex Johnson", tailor: "Emma's Tailoring", rating: 5 },
                  { name: "Sarah Lee", tailor: "Stitch Perfect", rating: 4 },
                  { name: "Michael Chen", tailor: "Bespoke Creations", rating: 5 },
                  { name: "Emily Rodriguez", tailor: "Tailored Elegance", rating: 5 },
                  { name: "David Kim", tailor: "Precision Fits", rating: 4 },
                  { name: "Olivia Thompson", tailor: "Couture Creations", rating: 5 },
                ].map((testimonial, index) => (

                  <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-8">

                      <div className="flex items-center mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}

                            className={`h-8 w-8 ${
                              i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                            fill="currentColor"
                          />
                        ))}
                      </div>

                      <p className="text-lg text-gray-600 mb-8">
                        "Exceptional service! The fit was perfect, and the tailor was very professional."
                      </p>


                      <p className="font-semibold text-2xl text-gray-900 mb-2">{testimonial.name}</p>
                      <p className="text-lg text-indigo-600">{testimonial.tailor}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white">


        <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-16">
            <div>


              <h3 className="text-xl font-semibold uppercase tracking-wider mb-6">Company</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>


              <h3 className="text-xl font-semibold uppercase tracking-wider mb-6">Services</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Find a Tailor</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Measurement Guide</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Custom Designs</a></li>
              </ul>
            </div>
            <div>


              <h3 className="text-xl font-semibold uppercase tracking-wider mb-6">Legal</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            <div>


              <h3 className="text-xl font-semibold uppercase tracking-wider mb-6">Connect</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>


          <div className="mt-16 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-lg text-gray-400">
              © 2023 TailorMatch. All rights reserved.
            </p>

            <p className="text-lg text-gray-400 mt-4 md:mt-0">
              Customer Support: support@tailormatch.com
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}