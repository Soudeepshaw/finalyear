import React, { useState } from 'react'
import { Button } from "@/Components/ui/button"
import  Input  from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Textarea } from "@/Components/ui/textarea"
import { ScrollArea } from "@/Components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import { Badge } from "@/Components/ui/badge"
import { Separator } from "@/Components/ui/separator"
import { Edit, Trash, Plus, X, Image as ImageIcon } from 'lucide-react'

interface FabricStock {
  id: string;
  name: string;
  quantity: number;
  description: string;
  quality: string;
  company: string;
  images: string[];
}

export default function FabricInventoryPage() {
  const [fabricStocks, setFabricStocks] = useState<FabricStock[]>([
    { id: '1', name: 'Cotton Twill', quantity: 100, description: 'Durable cotton fabric with diagonal parallel ribs', quality: 'High', company: 'FabricCo', images: ['/placeholder.svg?height=200&width=200', '/placeholder.svg?height=200&width=200'] },
    { id: '2', name: 'Silk Charmeuse', quantity: 50, description: 'Lightweight silk fabric with a satin weave', quality: 'Premium', company: 'LuxeFabrics', images: ['/placeholder.svg?height=200&width=200'] },
    { id: '3', name: 'Wool Gabardine', quantity: 75, description: 'Tightly woven wool fabric with a twill weave', quality: 'High', company: 'WoolWorks', images: ['/placeholder.svg?height=200&width=200', '/placeholder.svg?height=200&width=200', '/placeholder.svg?height=200&width=200'] },
  ])

  const [selectedFabric, setSelectedFabric] = useState<FabricStock | null>(null)
  const [isAddFabricDialogOpen, setIsAddFabricDialogOpen] = useState(false)
  const [newImages, setNewImages] = useState<File[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterQuality, setFilterQuality] = useState('all')

  const handleAddFabric = (newFabric: Omit<FabricStock, 'id' | 'images'>) => {
    const id = (fabricStocks.length + 1).toString()
    const images = newImages.map(file => URL.createObjectURL(file))
    setFabricStocks([...fabricStocks, { ...newFabric, id, images }])
    setIsAddFabricDialogOpen(false)
    setNewImages([])
  }

  const handleEditFabric = (updatedFabric: FabricStock) => {
    setFabricStocks(fabricStocks.map(fabric => fabric.id === updatedFabric.id ? updatedFabric : fabric))
    setSelectedFabric(null)
  }

  const handleDeleteFabric = (id: string) => {
    setFabricStocks(fabricStocks.filter(fabric => fabric.id !== id))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setNewImages([...newImages, ...Array.from(event.target.files)])
    }
  }

  const removeImage = (index: number) => {
    setNewImages(newImages.filter((_, i) => i !== index))
  }

  const filteredFabrics = fabricStocks.filter(fabric => 
    fabric.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterQuality === 'all' || fabric.quality === filterQuality)
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Fabric Inventory</h1>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <Input
            type="text"
            placeholder="Search fabrics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Select value={filterQuality} onValueChange={setFilterQuality}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by quality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Qualities</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Premium">Premium</SelectItem>
              <SelectItem value="Standard">Standard</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => setIsAddFabricDialogOpen(true)}>Add New Fabric</Button>
      </div>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Quality</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Images</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFabrics.map((fabric) => (
                <TableRow key={fabric.id}>
                  <TableCell className="font-medium">{fabric.name}</TableCell>
                  <TableCell>{fabric.quantity}</TableCell>
                  <TableCell>
                    <Badge variant={fabric.quality === 'Premium' ? 'default' : 'secondary'}>
                      {fabric.quality}
                    </Badge>
                  </TableCell>
                  <TableCell>{fabric.company}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {fabric.images.slice(0, 3).map((image, index) => (
                        <img key={index} src={image} alt={`${fabric.name} ${index + 1}`} className="w-10 h-10 object-cover rounded" />
                      ))}
                      {fabric.images.length > 3 && (
                        <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-sm">
                          +{fabric.images.length - 3}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => setSelectedFabric(fabric)}>
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

      {/* Add Fabric Dialog */}
      <Dialog open={isAddFabricDialogOpen} onOpenChange={setIsAddFabricDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Fabric</DialogTitle>
            <DialogDescription>Enter the details of the new fabric stock.</DialogDescription>
          </DialogHeader>
          <form onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            handleAddFabric({
              name: formData.get('name') as string,
              quantity: parseInt(formData.get('quantity') as string),
              description: formData.get('description') as string,
              quality: formData.get('quality') as string,
              company: formData.get('company') as string,
            })
          }}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" name="name" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">Quantity</Label>
                <Input id="quantity" name="quantity" type="number" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Description</Label>
                <Textarea id="description" name="description" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quality" className="text-right">Quality</Label>
                <Select name="quality" required>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select quality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Standard">Standard</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="company" className="text-right">Company</Label>
                <Input id="company" name="company" className="col-span-3" required />
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
      <Dialog open={!!selectedFabric} onOpenChange={() => setSelectedFabric(null)}>
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
                quantity: parseInt(formData.get('quantity') as string),
                description: formData.get('description') as string,
                quality: formData.get('quality') as string,
                company: formData.get('company') as string,
              })
            }}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-name" className="text-right">Name</Label>
                  <Input id="edit-name" name="name" defaultValue={selectedFabric.name} className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-quantity" className="text-right">Quantity</Label>
                  <Input id="edit-quantity" name="quantity" type="number" defaultValue={selectedFabric.quantity} className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-description" className="text-right">Description</Label>
                  <Textarea id="edit-description" name="description" defaultValue={selectedFabric.description} className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-quality" className="text-right">Quality</Label>
                  <Select name="quality" defaultValue={selectedFabric.quality}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select quality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Standard">Standard</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Premium">Premium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-company" className="text-right">Company</Label>
                  <Input id="edit-company" name="company" defaultValue={selectedFabric.company} className="col-span-3" required />
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