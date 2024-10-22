  import { Button } from "@/Components/ui/button"
  import Input from "@/Components/ui/input"
  import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group"
  import { Label } from "@/Components/ui/label"
  import { Textarea } from "@/Components/ui/textarea"
  import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table"
  import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/Components/ui/accordion"
  import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
  import { Badge } from "@/Components/ui/badge"

  export default function CustomerSupportPage() {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Customer Support</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <Input type="text" placeholder="Your Name" className="w-full" />
                <Input type="email" placeholder="Your Email" className="w-full" />
                <RadioGroup defaultValue="order-problem">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="order-problem" id="order-problem" />
                    <Label htmlFor="order-problem">Order Problem</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="refund" id="refund" />
                    <Label htmlFor="refund">Refund Request</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="tailor-issue" id="tailor-issue" />
                    <Label htmlFor="tailor-issue">Issue with Tailor</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="general-question" id="general-question" />
                    <Label htmlFor="general-question">General Question</Label>
                  </div>
                </RadioGroup>
                <Input type="text" placeholder="Order ID (if applicable)" className="w-full" />
                <Textarea placeholder="Describe your issue or question" rows={5} className="w-full" />
                <Button type="submit" className="w-full">Submit Ticket</Button>
              </form>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I place an order?</AccordionTrigger>
                  <AccordionContent>
                    To place an order, browse our tailors, select one, choose your fabric and customizations, and proceed to
                    checkout. You'll need to provide measurements, which can be done through our AI-powered system or
                    manually.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>What is your return policy?</AccordionTrigger>
                  <AccordionContent>
                    We offer a 30-day return policy for unworn, unaltered items. Custom-made items can be returned if there
                    are significant issues with fit or quality. Please contact our support team for assistance with returns.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>How long does tailoring take?</AccordionTrigger>
                  <AccordionContent>
                    Tailoring times vary depending on the complexity of the garment and the tailor's current workload.
                    Typically, you can expect 2-3 weeks for a custom suit and 1-2 weeks for simpler items like shirts or
                    trousers.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>How accurate is the AI measurement system?</AccordionTrigger>
                  <AccordionContent>
                    Our AI measurement system is highly accurate, with a margin of error typically less than 1 cm. However,
                    for the best results, we recommend following our photo guidelines carefully when submitting your
                    measurements.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>Can I modify my order after placing it?</AccordionTrigger>
                  <AccordionContent>
                    Minor modifications can sometimes be accommodated if the order hasn't entered production. Please contact
                    our support team as soon as possible with your order ID and the desired changes. Major changes may
                    require cancelling and reordering.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Your Support Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket ID</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[1, 2, 3].map((ticket) => (
                  <TableRow key={ticket}>
                    <TableCell>#{ticket}2345</TableCell>
                    <TableCell>Order Delay Issue</TableCell>
                    <TableCell>
                    <Badge
                        variant={ticket === 1 ? "default" : ticket === 2 ? "secondary" : "destructive"}
                        className={ticket === 1 ? "bg-green-100 text-green-800" : ticket === 2 ? "bg-yellow-100 text-yellow-800" : ""}
                        >
                        {ticket === 1 ? "Resolved" : ticket === 2 ? "In Progress" : "Open"}
                      </Badge>
                    </TableCell>
                    <TableCell>July {10 + ticket}, 2023</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    )
  }