import React, { useState } from 'react'
import { Button } from "@/Components/ui/button"
import Input from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Badge } from "@/Components/ui/badge"
import { ScrollArea } from "@/Components/ui/scroll-area"
import { Checkbox } from "@/Components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import { Search, Filter, Image as ImageIcon } from 'lucide-react'

interface Fabric {
  id: string;
  name: string;
  type: string;
  color: string;
  pattern: string;
  price: number;
  inStock: boolean;
  description: string;
  company: string;
  images: string[];
}

export default function UserFabricSelectionPage() {
  const [fabrics, setFabrics] = useState<Fabric[]>([
    { id: '1', name: 'Premium Cotton', type: 'Cotton', color: 'White', pattern: 'Solid', price: 15.99, inStock: true, description: 'High-quality cotton fabric suitable for shirts and dresses.', company: 'FabricCo', images: ['/placeholder.svg?height=300&width=300', '/placeholder.svg?height=300&width=300'] },
    { id: '2', name: 'Silk Charmeuse', type: 'Silk', color: 'Red', pattern: 'Solid', price: 29.99, inStock: true, description: 'Luxurious silk fabric with a satin finish, perfect for evening wear.', company: 'LuxeFabrics', images: ['/placeholder.svg?height=300&width=300'] },
    { id: '3', name: 'Wool Herringbone', type: 'Wool', color: 'Gray', pattern: 'Herringbone', price: 24.99, inStock: false, description: 'Classic wool fabric with a herringbone pattern, ideal for suits and coats.', company: 'WoolWorks', images: ['/placeholder.svg?height=300&width=300', '/placeholder.svg?height=300&width=300', '/placeholder.svg?height=300&width=300'] },
    { id: '4', name: 'Linen Blend', type: 'Linen', color: 'Beige', pattern: 'Textured', price: 18.99, inStock: true, description: 'Breathable linen blend fabric, perfect for summer clothing.', company: 'NaturalFibers', images: ['/placeholder.svg?height=300&width=300'] },
    { id: '5', name: 'Floral Chiffon', type: 'Chiffon', color: 'Multicolor', pattern: 'Floral', price: 22.99, inStock: true, description: 'Light and airy chiffon fabric with a beautiful floral print.', company: 'PrintMasters', images: ['/placeholder.svg?height=300&width=300', '/placeholder.svg?height=300&width=300'] },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filteredFabrics = fabrics.filter(fabric => 
    fabric.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterType === 'all' || fabric.type === filterType)
  )

  const handleFabricSelection = (fabricId: string) => {
    setSelectedFabrics(prev => 
      prev.includes(fabricId) 
        ? prev.filter(id => id !== fabricId) 
        : [...prev, fabricId]
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Select Fabrics</h1>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search fabrics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-64"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Cotton">Cotton</SelectItem>
              <SelectItem value="Silk">Silk</SelectItem>
              <SelectItem value="Wool">Wool</SelectItem>
              <SelectItem value="Linen">Linen</SelectItem>
              <SelectItem value="Chiffon">Chiffon</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-4">
          <Tabs value={viewMode} onValueChange={(value: 'grid' | 'list') => setViewMode(value)}>
            <TabsList>
              <TabsTrigger value="grid">Grid</TabsTrigger>
              <TabsTrigger value="list">List</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> 
            {selectedFabrics.length} fabric{selectedFabrics.length !== 1 ? 's' : ''} selected
          </Button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFabrics.map((fabric) => (
            <Card key={fabric.id} className={`overflow-hidden ${!fabric.inStock ? 'opacity-60' : ''}`}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{fabric.name}</span>
                  <Badge variant={fabric.inStock ? "default" : "secondary"}>
                    {fabric.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </CardTitle>
                <CardDescription>{fabric.type} - {fabric.color} - {fabric.pattern}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-square relative mb-4">
                  <img 
                    src={fabric.images[0]} 
                    alt={fabric.name} 
                    className="object-cover w-full h-full rounded-md"
                  />
                </div>
                <p className="text-sm mb-2">{fabric.description}</p>
                <p className="text-sm font-semibold">Company: {fabric.company}</p>
                <p className="text-lg font-bold mt-2">${fabric.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">View Images</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>{fabric.name} Images</DialogTitle>
                      <DialogDescription>Browse all available images for this fabric.</DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="h-[400px]">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
                        {fabric.images.map((image, index) => (
                          <img key={index} src={image} alt={`${fabric.name} ${index + 1}`} className="w-full h-auto rounded-md" />
                        ))}
                      </div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id={`select-${fabric.id}`} 
                    checked={selectedFabrics.includes(fabric.id)}
                    onCheckedChange={() => handleFabricSelection(fabric.id)}
                    disabled={!fabric.inStock}
                  />
                  <Label htmlFor={`select-${fabric.id}`}>Select</Label>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredFabrics.map((fabric) => (
            <Card key={fabric.id} className={`overflow-hidden ${!fabric.inStock ? 'opacity-60' : ''}`}>
              <div className="flex items-center p-4">
                <div className="w-24 h-24 mr-4">
                  <img 
                    src={fabric.images[0]} 
                    alt={fabric.name} 
                    className="object-cover w-full h-full rounded-md"
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold">{fabric.name}</h3>
                    <Badge variant={fabric.inStock ? "default" : "secondary"}>
                      {fabric.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 mb-1">{fabric.type} - {fabric.color} - {fabric.pattern}</p>
                  <p className="text-sm mb-1">{fabric.description}</p>
                  <p className="text-sm font-semibold">Company: {fabric.company}</p>
                </div>
                <div className="flex flex-col items-end ml-4">
                  <p className="text-lg font-bold mb-2">${fabric.price.toFixed(2)}</p>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id={`select-list-${fabric.id}`} 
                      checked={selectedFabrics.includes(fabric.id)}
                      onCheckedChange={() => handleFabricSelection(fabric.id)}
                      disabled={!fabric.inStock}
                    />
                    <Label htmlFor={`select-list-${fabric.id}`}>Select</Label>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}