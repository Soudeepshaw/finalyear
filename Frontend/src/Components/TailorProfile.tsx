import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from "@/Components/ui/button";
import  Input  from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Pencil, Trash2, Upload, PlusCircle } from 'lucide-react';



interface CatalogItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
}


export default function TailorProfile() {
  const { user, updateTailor, updateProfilePicture, fetchProfilePictureUrl } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState<number[]>([]);
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [specialtiesInput, setSpecialtiesInput] = useState(specialties.join(', '));

  const [catalog, setCatalog] = useState<CatalogItem[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const [newCatalogItem, setNewCatalogItem] = useState<CatalogItem>({ id: '', name: '', description: '', price: 0, image: '' });
  const [newPortfolioItem, setNewPortfolioItem] = useState<PortfolioItem>({ id: '', title: '', description: '', image: '' });

  useEffect(() => {
    console.log("User",user.data)
    console.log("User1",user.data.name)
    if (user) {
      setName(user.data.name || '');
      setSpecialties(user.data.specialties || []);
      setSpecialtiesInput(user.data.specialties?.join(', ') || '');
      setEmail(user.data.email || '');
      setLocation(user.data.location?.coordinates || []);
      setSpecialties(user.data.specialties || []);
      setCatalog(user.data.catalog || []);
      setPortfolio(user.data.portfolio || []);
      setIsLoading(false);
    }
  }, [user]);
  useEffect(() => {
    const loadProfilePicture = async () => {
      try{
      const url = await fetchProfilePictureUrl();
      if (url) setProfilePictureUrl(url);
      }catch(error){
        console.error("Error fetching profile picture:", error);
      }
    };
    loadProfilePicture();
  }, [fetchProfilePictureUrl]);

  const handleSaveProfile = async () => {
    const updatedProfile = {
      name,
      email,
      location: {
        type: "Point",
        coordinates: location
      },
      specialties,
      profilePictureUrl
    };
  
    const success = await updateTailor(updatedProfile);
    if (success) {
      setEditMode(false);
      console.log('Profile saved');
    } else {
      console.error('Failed to save profile');
    }
  };

  const handleAddCatalogItem = () => {
    if (newCatalogItem.name && newCatalogItem.description && newCatalogItem.price) {
      setCatalog([...catalog, { ...newCatalogItem, id: Date.now().toString() }]);
      setNewCatalogItem({ id: '', name: '', description: '', price: 0, image: '' });
    }
  };

  const handleDeleteCatalogItem = (id: string) => {
    setCatalog(catalog.filter(item => item.id !== id));
  };

  const handleAddPortfolioItem = () => {
    if (newPortfolioItem.title && newPortfolioItem.description) {
      setPortfolio([...portfolio, { ...newPortfolioItem, id: Date.now().toString() }]);
      setNewPortfolioItem({ id: '', title: '', description: '', image: '' });
    }
  };

  const handleProfilePictureChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsLoading(true);
      try {
        const success = await updateProfilePicture(file);
        if (success) {
          const url = await fetchProfilePictureUrl();
          if (url) setProfilePictureUrl(url);
        }
      } catch (error) {
        console.error('Failed to update profile picture:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDeletePortfolioItem = (id: string) => {
    setPortfolio(portfolio.filter(item => item.id !== id));
  };

  if (isLoading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-3xl font-bold">Tailor Profile</CardTitle>
            <Button onClick={() => setEditMode(!editMode)}>
              {editMode ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={profilePictureUrl || '/default-avatar.png'} alt={name} />
              <AvatarFallback>{name ? name.split(' ').map(n => n[0]).join('') : ''}</AvatarFallback>
            </Avatar>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              style={{ display: 'none' }}
              id="profile-picture-input"
            />
            {editMode && (
              <Button onClick={() => document.getElementById('profile-picture-input')?.click()}>
              Change Profile Picture
            </Button>
            )}
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!editMode}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!editMode}
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={location.join(', ')}
                onChange={(e) => setLocation(e.target.value.split(', ').map(Number))}
                disabled={!editMode}
              />
            </div>
            <div>
              <Label htmlFor="specialties">Specialties</Label>
              <Input
                id="specialties"
                value={specialtiesInput}
                onChange={(e) => {
                  setSpecialtiesInput(e.target.value);
                }}
                onBlur={() => {
                  const newSpecialties = specialtiesInput.split(',').map(s => s.trim()).filter(Boolean);
                  setSpecialties(newSpecialties);
                }}
                disabled={!editMode}
                placeholder="Enter specialties separated by commas"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Enter multiple specialties separated by commas (e.g., Suits, Dresses, Alterations)
              </p>
            </div>
          </div>
        </CardContent>
        {editMode && (
          <CardFooter>
            <Button onClick={handleSaveProfile}>Save Profile</Button>
          </CardFooter>
        )}
      </Card>

      <Tabs defaultValue="catalog" className="mt-8">
        <TabsList>
          <TabsTrigger value="catalog">Catalog</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
        </TabsList>
        <TabsContent value="catalog">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Catalog</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Item
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Catalog Item</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="itemName">Name</Label>
                        <Input 
                          id="itemName"
                          value={newCatalogItem.name}
                          onChange={(e) => setNewCatalogItem({...newCatalogItem, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="itemDescription">Description</Label>
                        <Textarea 
                          id="itemDescription"
                          value={newCatalogItem.description}
                          onChange={(e) => setNewCatalogItem({...newCatalogItem, description: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="itemPrice">Price</Label>
                        <Input 
                          id="itemPrice" 
                          type="number"
                          value={newCatalogItem.price}
                          onChange={(e) => setNewCatalogItem({...newCatalogItem, price: parseFloat(e.target.value)})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="itemImage">Image</Label>
                        <Input id="itemImage" type="file" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleAddCatalogItem}>Add Item</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                {catalog.map((item) => (
                  <Card key={item.id} className="mb-4">
                    <CardContent className="flex items-center p-4">
                      <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded mr-4" />
                      <div className="flex-grow">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
                        <p className="font-bold mt-2">${item.price}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDeleteCatalogItem(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="portfolio">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Portfolio</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Item
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Portfolio Item</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="portfolioTitle">Title</Label>
                        <Input 
                          id="portfolioTitle"
                          value={newPortfolioItem.title}
                          onChange={(e) => setNewPortfolioItem({...newPortfolioItem, title: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="portfolioDescription">Description</Label>
                        <Textarea 
                          id="portfolioDescription"
                          value={newPortfolioItem.description}
                          onChange={(e) => setNewPortfolioItem({...newPortfolioItem, description: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="portfolioImage">Image</Label>
                        <Input id="portfolioImage" type="file" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleAddPortfolioItem}>Add Item</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                {portfolio.map((item) => (
                  <Card key={item.id} className="mb-4">
                    <CardContent className="flex items-center p-4">
                      <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded mr-4" />
                      <div className="flex-grow">
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDeletePortfolioItem(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
