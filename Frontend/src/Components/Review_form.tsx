import React from 'react'
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Label } from "@/Components/ui/label"
import { Textarea } from "@/Components/ui/textarea"
import { Star, Upload } from 'lucide-react'

export default function RatingReview() {
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
              <Button variant="ghost">My Orders</Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Rate Your Experience</h1>

        <Card>
          <CardHeader>
            <CardTitle>Order #12345 - Custom Shirt from Tailor Studio 1</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="space-y-6">
                <div>
                  <Label className="text-base">Overall Satisfaction</Label>
                  <div className="flex items-center mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-8 w-8 text-yellow-400 cursor-pointer"
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base">Quality</Label>
                  <div className="flex items-center mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-8 w-8 text-yellow-400 cursor-pointer"
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base">Communication</Label>
                  <div className="flex items-center mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-8 w-8 text-yellow-400 cursor-pointer"
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base">Timeliness</Label>
                  <div className="flex items-center mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-8 w-8 text-yellow-400 cursor-pointer"
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="review" className="text-base">Your Review</Label>
                  <Textarea
                    id="review"
                    placeholder="Tell us about your experience..."
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label className="text-base">Upload Photos</Label>
                  <div className="mt-2 flex items-center">
                    <Button variant="outline" className="mr-4">
                      <Upload className="mr-2 h-4 w-4" />
                      Choose Files
                    </Button>
                    <span className="text-sm text-gray-500">No file chosen</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    You can upload up to 3 photos of your custom clothing.
                  </p>
                </div>

                <Button className="w-full">Submit Review</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}