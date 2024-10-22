import { Button } from "@/Components/ui/button"
import Input  from "@/Components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/Components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Star, MapPin, Search, List, Map, Clock, Scissors, Crosshair } from 'lucide-react'
import { useState, useEffect } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { jwtDecode } from 'jwt-decode'

export default function CustomerHomepage() {
  const [location, setLocation] = useState('')
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 })
  const [searchName, setSearchName] = useState('')
  const [userRole, setUserRole] = useState<string | null>(null)

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setLocation(`${latitude}, ${longitude}`)
          setMapCenter({ lat: latitude, lng: longitude })
        },
        (error) => {
          console.error("Error getting location:", error)
        }
      )
    } else {
      console.error("Geolocation is not supported by this browser.")
    }
  }

  useEffect(() => {
    getCurrentLocation()
  }, [])



  const tailorNames = [
    "Stitch & Style",
    "Perfect Fit Tailors",
    "Elegant Threads",
    "Bespoke Creations",
    "Sew Chic",
    "Tailored Elegance",
    "Needle & Thread Masters",
    "Dapper Designs",
    "Seam Supreme",
    "Tailor's Touch"
  ]

  function getTailorName(index:number) {
    return tailorNames[index - 1] || `Custom Tailor ${index}`
  }

  const mapContainerStyle = {
    width: '100%',
    height: '500px'
  }



  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <main className="max-w-full mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <Card className="mb-16 p-10 bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-2xl shadow-2xl">
          <CardContent className="text-center">
            <h1 className="text-7xl font-extrabold mb-6 animate-fade-in">Find Your Perfect Tailor</h1>
            <p className="text-3xl font-light">Discover skilled tailors near you for custom-made clothing</p>
          </CardContent>
        </Card>

        <Card className="mb-16 shadow-2xl rounded-xl overflow-hidden">
          <CardContent className="p-10 bg-white">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-grow flex">
                <Input 
                  className="flex-grow rounded-r-none text-xl" 
                  placeholder="Enter your location" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <Button 
                  className="rounded-l-none bg-blue-600 hover:bg-blue-700 text-white" 
                  onClick={getCurrentLocation}
                >
                  <Crosshair className="h-6 w-6" />
                </Button>
              </div>
              <Input
                className="w-full md:w-[300px] text-xl"
                placeholder="Search by tailor name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
              <Select>
                <SelectTrigger className="w-full md:w-[300px] text-xl">
                  <SelectValue placeholder="Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4+ Stars</SelectItem>
                  <SelectItem value="3">3+ Stars</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full md:w-[300px] text-xl">
                  <SelectValue placeholder="Specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mens">Men's Wear</SelectItem>
                  <SelectItem value="womens">Women's Wear</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                </SelectContent>
              </Select>
              <Button className="w-full md:w-auto text-xl px-12 py-6 bg-purple-600 hover:bg-purple-700 text-white">
                <Search className="h-6 w-6 mr-3" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="list" className="mb-16">
          <TabsList className="mb-8 justify-center">
            <TabsTrigger value="list" className="text-xl px-10 py-4"><List className="h-6 w-6 mr-3" />List View</TabsTrigger>
            <TabsTrigger value="map" className="text-xl px-10 py-4"><Map className="h-6 w-6 mr-3" />Map View</TabsTrigger>
          </TabsList>
          <TabsContent value="list">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((tailor) => (
                <Card key={tailor} className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 rounded-xl">
                  <img
                    src={tailor <= 10 ? [
                      "https://ideogram.ai/api/images/direct/79oDcN5fTimZ5GBPtqfreg.jpg",
                      "https://ideogram.ai/api/images/direct/H6TT9xVUTiKLXJcyR84T4Q.jpg",
                      "https://ideogram.ai/api/images/direct/R1QtwtNvQC-HQqsmaAtlLw.jpg",
                      "https://ideogram.ai/api/images/direct/b57559I5RDOxY4KmygNojQ.jpg",
                      "https://ideogram.ai/api/images/direct/ONGwsNN6QqO9jUS1Zw8Tgg.jpg",
                      "https://ideogram.ai/api/images/direct/ToWwRov4SYKQRwwVgPkqgg.jpg",
                      "https://ideogram.ai/api/images/direct/U3eO8d28TP6lnAO6CD14JQ.jpg",
                      "https://ideogram.ai/api/images/direct/EEkczur2R4iRlKQsFznIig.jpg",
                      "https://ideogram.ai/api/images/direct/4oha2yoGT96E_9EitmEXDQ.jpg",
                      "https://ideogram.ai/api/images/direct/4oha2yoGT96E_9EitmEXDQ.jpg"
                    ][tailor - 1] : `https://source.unsplash.com/400x200/?tailor,sewing?sig=${tailor}`}
                    alt={`Tailor ${tailor}`}

                    className="w-full h-56 object-cover"
                  />
                  <CardHeader>

                    <h3 className="text-2xl font-bold">{getTailorName(tailor)}</h3>
                  </CardHeader>




                  <CardContent className="p-6">
                    <div className="flex items-center mb-3">
                      <Star className="h-6 w-6 text-yellow-400 mr-2" />
                      <span className="text-xl text-gray-800">4.{tailor % 5 + 1} (120 reviews)</span>
                    </div>



                    <div className="flex items-center mb-3">
                      <MapPin className="h-6 w-6 text-gray-600 mr-2" />
                      <span className="text-xl text-gray-800">2.{tailor % 5 + 1} miles away</span>
                    </div>



                    <div className="flex items-center mb-3">
                      <Clock className="h-6 w-6 text-gray-600 mr-2" />
                      <span className="text-xl text-gray-800">Open: 9AM - 6PM</span>
                    </div>
                    <div className="flex items-center">


                      <Scissors className="h-6 w-6 text-gray-600 mr-2" />
                      <span className="text-xl text-gray-800">Specialties: Men's Wear, Formal, Casual</span>
                    </div>
                  </CardContent>


                  <CardFooter className="bg-gray-50 p-6">
                    <Button className="w-full text-xl py-4 bg-blue-600 hover:bg-blue-700 text-white">View Profile</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="map">
            <Card className="shadow-2xl rounded-xl overflow-hidden">
              <CardContent className="p-0">
                <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={mapCenter}
                    zoom={14}
                  >
                    <Marker position={mapCenter} />
                  </GoogleMap>
                </LoadScript>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}