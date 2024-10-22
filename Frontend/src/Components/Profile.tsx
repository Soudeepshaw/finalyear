import React, { useState, useEffect } from 'react'
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import Input  from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import { Textarea } from "@/Components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { Badge } from "@/Components/ui/badge"
import { ScrollArea } from "@/Components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table"
import { Camera, Package, ShoppingCart, Truck, Edit, Save, Mail, Phone, MapPin, DollarSign } from 'lucide-react'
import { useAuth } from '../context/AuthContext';

export default function CustomerProfile() {
  const { user, updateCustomer, updateProfilePicture  } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user?.data || {});

  useEffect(() => {
    if (user?.data) {
      setFormData(user.data);
    }
  }, [user]);

  if (!user || !user.data) {
    return <div>Loading user profile...</div>;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    setIsEditing(false);
    try {
      const updatedProfile = {
        name: formData.name,
        email: formData.email,
        address: formData.address,
        phone: formData.phone
      };
      await updateCustomer(updatedProfile);
      console.log("User data saved successfully");
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  const handleTrackOrder = (orderId: string) => {
    console.log(`Tracking order: ${orderId}`);
  };

  const calculateCartTotal = () => {
    return user.data.cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-500';
      case 'In Transit': return 'bg-blue-500';
      case 'Processing': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const handleChangePicture = async () => {
    // Implement file picker and image upload logic here
  };

  const handleProfilePictureChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const success = await updateProfilePicture(file);
      if (success) {
        console.log('Profile picture updated successfully');
      } else {
        console.error('Failed to update profile picture');
      }
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Customer Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-2xl">Profile Overview</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Avatar className="w-32 h-32 mb-4">
              <AvatarImage src={user.profilePicture?.url || '/default-avatar.png'} alt={user.data.name} />
              <AvatarFallback>{user.data.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              style={{ display: 'none' }}
              id="profile-picture-input"
            />
            <Button className="w-full" variant="outline" onClick={() => document.getElementById('profile-picture-input')?.click()}>
              <Camera className="mr-2 h-4 w-4" /> Change Picture
            </Button>
            <h2 className="text-2xl font-semibold mb-2">{user.data.name}</h2>
            <p className="text-muted-foreground mb-4">Member since {user.data.memberSince}</p>
            <div className="flex items-center space-x-2 mb-2">
              <Package className="w-5 h-5 text-primary" />
              <span>{user.data.orderCount} Orders</span>
            </div>
            <div className="flex items-center space-x-2 mb-4">
              <DollarSign className="w-5 h-5 text-primary" />
              <span>{user.data.loyaltyPoints} Loyalty Points</span>
            </div>
            <Button className="w-full" variant="outline" onClick={handleChangePicture}>
              <Camera className="mr-2 h-4 w-4" /> Change Picture
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl">Personal Information</CardTitle>
              {isEditing ? (
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
              ) : (
                <Button onClick={() => setIsEditing(true)}>
                  <Edit className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center space-x-4">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <div className="grid gap-1.5 w-full">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData?.email || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="w-5 h-5 text-muted-foreground mt-2" />
                  <div className="grid gap-1.5 w-full">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <div className="grid gap-1.5 w-full">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="orders" className="mt-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="cart">Cart</TabsTrigger>
        </TabsList>
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Order History</CardTitle>
              <CardDescription>Track and manage your recent orders</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(user.data.orders || []).map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(order.status)} text-white`}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>${order.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" onClick={() => handleTrackOrder(order.id)}>
                            <Truck className="mr-2 h-4 w-4" /> Track
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="cart">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Shopping Cart</CardTitle>
              <CardDescription>Review and manage items in your cart</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {user.data.cart.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>${item.price.toFixed(2)}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="text-2xl font-semibold">Total: ${calculateCartTotal()}</div>
              <Button size="lg" onClick={handleProceedToCheckout}>
                <ShoppingCart className="mr-2 h-5 w-5" /> Proceed to Checkout
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
