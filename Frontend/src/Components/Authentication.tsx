import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
//import Link from "next/link"

export default function AuthPages() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Tabs defaultValue="customer" className="max-w-md mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="customer">Customer</TabsTrigger>
          <TabsTrigger value="tailor">Tailor</TabsTrigger>
        </TabsList>
        <TabsContent value="customer">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center">Customer Registration</h2>
            <Input type="text" placeholder="Full Name" />
            <Input type="email" placeholder="Email" />
            <Input type="tel" placeholder="Phone Number" />
            <Input type="password" placeholder="Password" />
            <Input type="password" placeholder="Confirm Password" />
            <Button className="w-full">Register</Button>
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              
              {/*<Link href="#" className="text-blue-600 hover:underline">
                Log in
              </Link>*/}
            </p>
          </div>
        </TabsContent>
        <TabsContent value="tailor">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center">Tailor Registration</h2>
            <Input type="text" placeholder="Full Name" />
            <Input type="email" placeholder="Email" />
            <Input type="tel" placeholder="Phone Number" />
            <Input type="text" placeholder="Business Name" />
            <Input type="text" placeholder="Years of Experience" />
            <Input type="text" placeholder="Specialties (comma-separated)" />
            <Input type="file" accept="image/*" multiple />
            <Input type="password" placeholder="Password" />
            <Input type="password" placeholder="Confirm Password" />
            <Button className="w-full">Register</Button>
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              {/*<Link href="#" className="text-blue-600 hover:underline">
                Log in
              </Link>*/}
            </p>
          </div>
        </TabsContent>
      </Tabs>
      <div className="mt-12 max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <div className="space-y-4">
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Button className="w-full">Log In</Button>
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
            {/*<Link href="#" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </Link>*/}
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline">
              <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
              </svg>
              Google
            </Button>
            <Button variant="outline">
              <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"></path>
              </svg>
              Facebook
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}