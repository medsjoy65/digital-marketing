import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CalendarIcon,
  Clock,
  Mail,
  Send,
  Users,
  FileText,
  BarChart,
  PlusCircle,
  Trash2,
} from "lucide-react";

interface EmailCampaignsProps {
  campaigns?: Campaign[];
  templates?: Template[];
  audiences?: Audience[];
}

interface Campaign {
  id: string;
  name: string;
  subject: string;
  status: "draft" | "scheduled" | "sent";
  scheduledDate?: string;
  openRate?: number;
  clickRate?: number;
  audience: string;
  template: string;
}

interface Template {
  id: string;
  name: string;
  subject: string;
  content: string;
}

interface Audience {
  id: string;
  name: string;
  count: number;
  description: string;
}

const EmailCampaigns = ({
  campaigns = [
    {
      id: "1",
      name: "Summer Sale Announcement",
      subject: "Don't Miss Our Biggest Summer Sale!",
      status: "sent",
      scheduledDate: "2023-06-15",
      openRate: 42.5,
      clickRate: 12.8,
      audience: "All Customers",
      template: "Summer Sale Template",
    },
    {
      id: "2",
      name: "New Product Launch",
      subject: "Introducing Our Latest Product Line",
      status: "scheduled",
      scheduledDate: "2023-07-01",
      audience: "Previous Buyers",
      template: "Product Launch Template",
    },
    {
      id: "3",
      name: "Customer Feedback Request",
      subject: "We Value Your Opinion",
      status: "draft",
      audience: "Recent Customers",
      template: "Feedback Template",
    },
  ],
  templates = [
    {
      id: "1",
      name: "Summer Sale Template",
      subject: "Don't Miss Our Biggest Summer Sale!",
      content:
        "<h1>Summer Sale</h1><p>Shop now and save up to 50% on selected items!</p>",
    },
    {
      id: "2",
      name: "Product Launch Template",
      subject: "Introducing Our Latest Product Line",
      content:
        "<h1>New Products</h1><p>Check out our latest additions to our catalog!</p>",
    },
    {
      id: "3",
      name: "Feedback Template",
      subject: "We Value Your Opinion",
      content:
        "<h1>Your Feedback Matters</h1><p>Please take a moment to share your experience with us.</p>",
    },
  ],
  audiences = [
    {
      id: "1",
      name: "All Customers",
      count: 5280,
      description: "All registered customers in our database",
    },
    {
      id: "2",
      name: "Previous Buyers",
      count: 3142,
      description: "Customers who have made at least one purchase",
    },
    {
      id: "3",
      name: "Recent Customers",
      count: 1250,
      description: "Customers who made a purchase in the last 30 days",
    },
    {
      id: "4",
      name: "Cart Abandoners",
      count: 876,
      description: "Users who added items to cart but didn't complete checkout",
    },
  ],
}: EmailCampaignsProps) => {
  const [activeTab, setActiveTab] = useState("campaigns");
  const [selectedTemplate, setSelectedTemplate] = useState<
    string | undefined
  >();
  const [selectedAudience, setSelectedAudience] = useState<
    string | undefined
  >();

  return (
    <div className="w-full h-full p-6 bg-white">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Email Campaigns</h1>
        <p className="text-muted-foreground">
          Create and manage email marketing campaigns
        </p>
      </div>

      <Tabs
        defaultValue="campaigns"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="campaigns" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Campaigns
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="audiences" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Audiences
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart className="w-4 h-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Campaigns Tab */}
        <TabsContent value="campaigns" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Your Campaigns</h2>
            <Button
              onClick={() => setActiveTab("create")}
              className="flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              Create Campaign
            </Button>
          </div>

          <div className="grid gap-4">
            {campaigns.map((campaign) => (
              <Card key={campaign.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{campaign.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {campaign.subject}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          campaign.status === "sent"
                            ? "bg-green-100 text-green-800"
                            : campaign.status === "scheduled"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {campaign.status.charAt(0).toUpperCase() +
                          campaign.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Audience:</p>
                      <p className="text-sm text-muted-foreground">
                        {campaign.audience}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Template:</p>
                      <p className="text-sm text-muted-foreground">
                        {campaign.template}
                      </p>
                    </div>
                    {campaign.scheduledDate && (
                      <div>
                        <p className="text-sm font-medium">Scheduled Date:</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <CalendarIcon className="w-3 h-3" />
                          {campaign.scheduledDate}
                        </p>
                      </div>
                    )}
                    {campaign.openRate && (
                      <div>
                        <p className="text-sm font-medium">Performance:</p>
                        <p className="text-sm text-muted-foreground">
                          {campaign.openRate}% open rate, {campaign.clickRate}%
                          click rate
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Email Templates</h2>
            <Button className="flex items-center gap-2">
              <PlusCircle className="w-4 h-4" />
              Create Template
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <CardTitle>{template.name}</CardTitle>
                  <CardDescription>{template.subject}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md p-4 bg-gray-50 h-32 overflow-hidden">
                    <div
                      dangerouslySetInnerHTML={{ __html: template.content }}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    Preview
                  </Button>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Audiences Tab */}
        <TabsContent value="audiences" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Audience Segments</h2>
            <Button className="flex items-center gap-2">
              <PlusCircle className="w-4 h-4" />
              Create Segment
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {audiences.map((audience) => (
              <Card key={audience.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{audience.name}</CardTitle>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 text-xs rounded-full">
                      {audience.count.toLocaleString()} contacts
                    </span>
                  </div>
                  <CardDescription>{audience.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    View Contacts
                  </Button>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Campaign Performance</h2>
            <p className="text-muted-foreground">
              Track the performance of your email campaigns
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Average Open Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold">38.2%</span>
                  <span className="text-green-500 text-sm">+2.4%</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Compared to previous month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Average Click Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold">12.5%</span>
                  <span className="text-green-500 text-sm">+1.2%</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Compared to previous month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Sent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold">24,892</span>
                  <span className="text-green-500 text-sm">+15.8%</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Compared to previous month
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Campaign Performance Chart</CardTitle>
              <CardDescription>
                Visualization would appear here in a real implementation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full bg-gray-100 rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">
                  Campaign performance chart placeholder
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Create Campaign Tab */}
        <TabsContent value="create" className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Create New Campaign</h2>
            <Button variant="outline" onClick={() => setActiveTab("campaigns")}>
              Cancel
            </Button>
          </div>

          <div className="space-y-4">
            <div className="grid gap-2">
              <label htmlFor="campaign-name" className="text-sm font-medium">
                Campaign Name
              </label>
              <Input id="campaign-name" placeholder="Enter campaign name" />
            </div>

            <div className="grid gap-2">
              <label htmlFor="campaign-subject" className="text-sm font-medium">
                Email Subject
              </label>
              <Input
                id="campaign-subject"
                placeholder="Enter email subject line"
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Select Template</label>
              <Select
                value={selectedTemplate}
                onValueChange={setSelectedTemplate}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a template" />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Select Audience</label>
              <Select
                value={selectedAudience}
                onValueChange={setSelectedAudience}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose an audience" />
                </SelectTrigger>
                <SelectContent>
                  {audiences.map((audience) => (
                    <SelectItem key={audience.id} value={audience.id}>
                      {audience.name} ({audience.count.toLocaleString()}{" "}
                      contacts)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Schedule</label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Input type="date" />
                </div>
                <div>
                  <Input type="time" />
                </div>
              </div>
            </div>

            <div className="grid gap-2">
              <label htmlFor="campaign-message" className="text-sm font-medium">
                Additional Message
              </label>
              <Textarea
                id="campaign-message"
                placeholder="Add any additional message or notes"
                rows={4}
              />
            </div>

            <div className="pt-4 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setActiveTab("campaigns")}
              >
                Cancel
              </Button>
              <Button className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                Create Campaign
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmailCampaigns;
