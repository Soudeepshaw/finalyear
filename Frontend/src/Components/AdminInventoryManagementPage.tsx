import React, { useState } from 'react'
import { Button } from "@/Components/ui/button"
import Input from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Textarea } from "@/Components/ui/textarea"
import { ScrollArea } from "@/Components/ui/scroll-area"
import { Badge } from "@/Components/ui/badge"
import { Switch } from "@/Components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import { Edit, Trash, Plus, X, Search, Image as ImageIcon } from 'lucide-react'

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
  quantity: number;
  images: string[];
}

export default function AdminInventoryManagementPage() {
  const [fabrics, setFabrics] = useState<Fabric[]>([
    { id: '1', name: 'Premium Cotton', type: 'Cotton', color: 'White', pattern: 'Solid', price: 15.99, inStock: true, description: 'High-quality cotton fabric suitable for shirts and dresses.', company: 'FabricCo', quantity: 100, images: ['/placeholder.svg?height=200&width=200', '/placeholder.svg?height=200&width=200'] },
    { id: '2', name: 'Silk Charmeuse', type: 'Silk', color: 'Red', pattern: 'Solid', price: 29.99, inStock: true, description: 'Luxurious silk fabric with a satin finish, perfect for evening wear.', company: 'LuxeFabrics', quantity: 50, images: ['/placeholder.svg?height=200&width=200'] },
    { id: '3', name: 'Wool Herringbone', type: 'Wool', color: 'Gray', pattern: 'Herringbone', price: 24.99, inStock: false, description: 'Classic wool fabric with a herringbone pattern, ideal for suits and coats.', company: 'WoolWorks', quantity: 0, images: ['/placeholder.svg?height=200&width=200', '/placeholder.svg?height=200&width=200', '/placeholder.svg?height=200&width=200'] },
  ])

  const [selectedFabric, setSelectedFabric] = useState<Fabric | null>(null)
  const [isAddFabricDialogOpen, setIsAddFabricDialogOpen] = useState(false)
  const [isEditFabricDialogOpen, setIsEditFabricDialogOpen] = useState(false)
  const [newImages, setNewImages] = useState<File[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')

  const handleAddFabric = (newFabric: Omit<Fabric, 'id' | 'images'>) => {
    const id = (fabrics.length + 1).toString()
    const images = newImages.map(file => URL.createObjectURL(file))
    setFabrics([...fabrics, { ...newFabric, id, images, inStock: newFabric.quantity > 0 }])
    setIsAddFabricDialogOpen(false)
    setNewImages([])
  }

  const handleEditFabric = (updatedFabric: Fabric) => {
    setFabrics(fabrics.map(fabric => 
      fabric.id === updatedFabric.id 
        ? { ...updatedFabric, inStock: updatedFabric.quantity > 0 } 
        : fabric
    ))
    setSelectedFabric(null)
    setIsEditFabricDialogOpen(false)
  }

  const handleDeleteFabric = (id: string) => {
    setFabrics(fabrics.filter(fabric => fabric.id !== id))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setNewImages([...newImages, ...Array.from(event.target.files)])
    }
  }

  const removeImage = (index: number) => {
    setNewImages(newImages.filter((_, i) => i !== index))
  }

  const filteredFabrics = fabrics.filter(fabric => 
    fabric.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterType === 'all' || fabric.type === filterType)
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Inventory Management</h1>

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
          <Tabs value={viewMode} onValueChange={(value: 'table' | 'grid') => setViewMode(value)}>
            <TabsList>
              <TabsTrigger value="table">Table</TabsTrigger>
              <TabsTrigger value="grid">Grid</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button onClick={() => setIsAddFabricDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add New Fabric
          </Button>
        </div>
      </div>

      {viewMode === 'table' ? (
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Color</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFabrics.map((fabric) => (
                  <TableRow key={fabric.id}>
                    <TableCell>
                      <img src={fabric.images[0]} alt={fabric.name} className="w-16 h-16 object-cover rounded-md" />
                    </TableCell>
                    <TableCell className="font-medium">{fabric.name}</TableCell>
                    <TableCell>{fabric.type}</TableCell>
                    <TableCell>{fabric.color}</TableCell>
                    <TableCell>${fabric.price.toFixed(2)}</TableCell>
                    <TableCell>{fabric.quantity}</TableCell>
                    <TableCell>
                      <Badge variant={fabric.inStock ? "default" : "secondary"}>
                        {fabric.inStock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => {
                          setSelectedFabric(fabric)
                          setIsEditFabricDialogOpen(true)
                        }}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteFabric(fabric.id)}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFabrics.map((fabric) => (
            <Card key={fabric.id}>
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
                <p className="text-sm mt-1">Quantity: {fabric.quantity}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" onClick={() => {
                  setSelectedFabric(fabric)
                  setIsEditFabricDialogOpen(true)
                }}>
                  <Edit className="h-4 w-4 mr-2" /> Edit
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDeleteFabric(fabric.id)}>
                  <Trash className="h-4 w-4 mr-2" /> Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Add Fabric Dialog */}
      <Dialog open={isAddFabricDialogOpen} onOpenChange={setIsAddFabricDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Fabric</DialogTitle>
            <DialogDescription>Enter the details of the new fabric.</DialogDescription>
          </DialogHeader>
          <form onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            handleAddFabric({
              name: formData.get('name') as string,
              type: formData.get('type') as string,
              color: formData.get('color') as string,
              pattern: formData.get('pattern') as string,
              price: parseFloat(formData.get('price') as string),
              quantity: parseInt(formData.get('quantity') as string),
              inStock: parseInt(formData.get('quantity') as string) > 0,
              description: formData.get('description') as string,
              company: formData.get('company') as string,
            })
          }}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" name="name" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">Type</Label>
                <Select name="type" required>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cotton">Cotton</SelectItem>
                    <SelectItem value="Silk">Silk</SelectItem>
                    <SelectItem value="Wool">Wool</SelectItem>
                    <SelectItem value="Linen">Linen</SelectItem>
                    <SelectItem value="Chiffon">Chiffon</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="color" className="text-right">Color</Label>
                <Input id="color" name="color" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="pattern" className="text-right">Pattern</Label>
                <Input id="pattern" name="pattern" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">Price</Label>
                <Input id="price" name="price" type="number" step="0.01" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">Quantity</Label>
                <Input id="quantity" name="quantity" type="number" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="company" className="text-right">Company</Label>
                <Input id="company" name="company" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label html
For="description" className="text-right">Description</Label>
                <Textarea id="description" name="description" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="images" className="text-right">Images</Label>
                <div className="col-span-3">
                  <Input id="images" type="file" multiple onChange={handleImageUpload} accept="image/*" />
                  <div className="mt-2 flex flex-wrap gap-2">
                    {newImages.map((file, index) => (
                      <div key={index} className="relative">
                        <img src={URL.createObjectURL(file)} alt={`New fabric ${index + 1}`} className="w-16 h-16 object-cover rounded" />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Fabric</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Fabric Dialog */}
      <Dialog open={isEditFabricDialogOpen} onOpenChange={setIsEditFabricDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Fabric</DialogTitle>
            <DialogDescription>Update the details of the selected fabric.</DialogDescription>
          </DialogHeader>
          {selectedFabric && (
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              handleEditFabric({
                ...selectedFabric,
                name: formData.get('name') as string,
                type: formData.get('type') as string,
                color: formData.get('color') as string,
                pattern: formData.get('pattern') as string,
                price: parseFloat(formData.get('price') as string),
                quantity: parseInt(formData.get('quantity') as string),
                inStock: parseInt(formData.get('quantity') as string) > 0,
                description: formData.get('description') as string,
                company: formData.get('company') as string,
              })
            }}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-name" className="text-right">Name</Label>
                  <Input id="edit-name" name="name" defaultValue={selectedFabric.name} className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-type" className="text-right">Type</Label>
                  <Select name="type" defaultValue={selectedFabric.type}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cotton">Cotton</SelectItem>
                      <SelectItem value="Silk">Silk</SelectItem>
                      <SelectItem value="Wool">Wool</SelectItem>
                      <SelectItem value="Linen">Linen</SelectItem>
                      <SelectItem value="Chiffon">Chiffon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-color" className="text-right">Color</Label>
                  <Input id="edit-color" name="color" defaultValue={selectedFabric.color} className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-pattern" className="text-right">Pattern</Label>
                  <Input id="edit-pattern" name="pattern" defaultValue={selectedFabric.pattern} className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-price" className="text-right">Price</Label>
                  <Input id="edit-price" name="price" type="number" step="0.01" defaultValue={selectedFabric.price} className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-quantity" className="text-right">Quantity</Label>
                  <Input id="edit-quantity" name="quantity" type="number" defaultValue={selectedFabric.quantity} className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-company" className="text-right">Company</Label>
                  <Input id="edit-company" name="company" defaultValue={selectedFabric.company} className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-description" className="text-right">Description</Label>
                  <Textarea id="edit-description" name="description" defaultValue={selectedFabric.description} className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Images</Label>
                  <div className="col-span-3">
                    <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                      <div className="flex flex-wrap gap-2">
                        {selectedFabric.images.map((image, index) => (
                          <div key={index} className="relative">
                            <img src={image} alt={`${selectedFabric.name} ${index + 1}`} className="w-16 h-16 object-cover rounded" />
                            <Button
                              variant="destructive"
                              size="icon"
                              className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                              onClick={() => {
                                const updatedImages = selectedFabric.images.filter((_, i) => i !== index)
                                setSelectedFabric({ ...selectedFabric, images: updatedImages })
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    <Input type="file" multiple onChange={(e) => {
                      if (e.target.files) {
                        const newImages = Array.from(e.target.files).map(file => URL.createObjectURL(file))
                        setSelectedFabric({ ...selectedFabric, images: [...selectedFabric.images, ...newImages] })
                      }
                    }} accept="image/*" className="mt-2" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Update Fabric</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}