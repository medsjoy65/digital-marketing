import React, { useState } from "react";
import {
  Users,
  Link,
  DollarSign,
  BarChart3,
  Settings,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

interface AffiliateProps {
  activeTab?: string;
}

const AffiliateProgram = ({ activeTab = "overview" }: AffiliateProps) => {
  const [currentTab, setCurrentTab] = useState(activeTab);

  // Mock data for affiliates
  const affiliates = [
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      referrals: 24,
      earnings: 1250.0,
      status: "Active",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      referrals: 18,
      earnings: 890.5,
      status: "Active",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael@example.com",
      referrals: 32,
      earnings: 1680.75,
      status: "Active",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily@example.com",
      referrals: 12,
      earnings: 620.25,
      status: "Pending",
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david@example.com",
      referrals: 8,
      earnings: 410.0,
      status: "Inactive",
    },
  ];

  // Mock data for commission tiers
  const commissionTiers = [
    { level: "Bronze", referrals: "1-10", commission: "5%" },
    { level: "Silver", referrals: "11-25", commission: "7.5%" },
    { level: "Gold", referrals: "26-50", commission: "10%" },
    { level: "Platinum", referrals: "51+", commission: "12.5%" },
  ];

  return (
    <div className="w-full h-full bg-background p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Affiliate Program Management</h1>
          <p className="text-muted-foreground">
            Manage your affiliate marketing program and track performance
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create New Affiliate
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Affiliates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-2xl font-bold">42</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Referrals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Link className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-2xl font-bold">386</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-2xl font-bold">$12,450</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Conversion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BarChart3 className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-2xl font-bold">8.2%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-md mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="affiliates">Affiliates</TabsTrigger>
          <TabsTrigger value="commissions">Commissions</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Program Performance</CardTitle>
              <CardDescription>
                View your affiliate program performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">
                  Performance chart will be displayed here
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Affiliates</CardTitle>
                <CardDescription>
                  Your best performing affiliates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Referrals</TableHead>
                      <TableHead>Earnings</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {affiliates.slice(0, 3).map((affiliate) => (
                      <TableRow key={affiliate.id}>
                        <TableCell>{affiliate.name}</TableCell>
                        <TableCell>{affiliate.referrals}</TableCell>
                        <TableCell>${affiliate.earnings.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest affiliate program activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mr-2 h-2 w-2 mt-2 rounded-full bg-green-500"></div>
                    <div>
                      <p className="font-medium">New affiliate joined</p>
                      <p className="text-sm text-muted-foreground">
                        Emily Davis registered as an affiliate
                      </p>
                      <p className="text-xs text-muted-foreground">
                        2 hours ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-2 h-2 w-2 mt-2 rounded-full bg-blue-500"></div>
                    <div>
                      <p className="font-medium">Commission paid</p>
                      <p className="text-sm text-muted-foreground">
                        $250 paid to John Smith
                      </p>
                      <p className="text-xs text-muted-foreground">
                        5 hours ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-2 h-2 w-2 mt-2 rounded-full bg-yellow-500"></div>
                    <div>
                      <p className="font-medium">New referral</p>
                      <p className="text-sm text-muted-foreground">
                        Sarah Johnson referred a new customer
                      </p>
                      <p className="text-xs text-muted-foreground">Yesterday</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="affiliates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Affiliate Management</CardTitle>
              <CardDescription>
                View and manage your affiliate partners
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="relative w-64">
                  <Input placeholder="Search affiliates..." />
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline">Export</Button>
                  <Button variant="outline">Filter</Button>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Referrals</TableHead>
                    <TableHead>Earnings</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {affiliates.map((affiliate) => (
                    <TableRow key={affiliate.id}>
                      <TableCell>{affiliate.name}</TableCell>
                      <TableCell>{affiliate.email}</TableCell>
                      <TableCell>{affiliate.referrals}</TableCell>
                      <TableCell>${affiliate.earnings.toFixed(2)}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${affiliate.status === "Active" ? "bg-green-100 text-green-800" : affiliate.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800"}`}
                        >
                          {affiliate.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing 5 of 42 affiliates
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="commissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Commission Structure</CardTitle>
              <CardDescription>
                Configure your affiliate commission tiers and rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Commission Tiers</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Level</TableHead>
                      <TableHead>Referrals</TableHead>
                      <TableHead>Commission Rate</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {commissionTiers.map((tier, index) => (
                      <TableRow key={index}>
                        <TableCell>{tier.level}</TableCell>
                        <TableCell>{tier.referrals}</TableCell>
                        <TableCell>{tier.commission}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Payment Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">
                      Minimum Payout Amount
                    </label>
                    <div className="flex mt-1">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                        $
                      </span>
                      <Input
                        type="number"
                        defaultValue="50"
                        className="rounded-l-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      Payout Schedule
                    </label>
                    <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors mt-1">
                      <option>Monthly</option>
                      <option>Bi-weekly</option>
                      <option>Weekly</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Cookie Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">
                      Cookie Duration (days)
                    </label>
                    <Input type="number" defaultValue="30" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      Attribution Model
                    </label>
                    <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors mt-1">
                      <option>First Click</option>
                      <option>Last Click</option>
                      <option>Linear</option>
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Program Settings</CardTitle>
              <CardDescription>
                Configure your affiliate program settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">General Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Program Name</label>
                    <Input
                      defaultValue="SkyGarden Affiliate Program"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      Program Status
                    </label>
                    <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors mt-1">
                      <option>Active</option>
                      <option>Paused</option>
                      <option>Invite Only</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">
                  Registration Settings
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="auto-approve"
                      className="rounded border-input"
                      defaultChecked
                    />
                    <label htmlFor="auto-approve" className="text-sm">
                      Auto-approve new affiliates
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="require-tax"
                      className="rounded border-input"
                      defaultChecked
                    />
                    <label htmlFor="require-tax" className="text-sm">
                      Require tax information before payout
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="terms"
                      className="rounded border-input"
                      defaultChecked
                    />
                    <label htmlFor="terms" className="text-sm">
                      Require agreement to terms and conditions
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">
                  Email Notifications
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="new-affiliate"
                      className="rounded border-input"
                      defaultChecked
                    />
                    <label htmlFor="new-affiliate" className="text-sm">
                      New affiliate registration
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="new-referral"
                      className="rounded border-input"
                      defaultChecked
                    />
                    <label htmlFor="new-referral" className="text-sm">
                      New referral sale
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="payout"
                      className="rounded border-input"
                      defaultChecked
                    />
                    <label htmlFor="payout" className="text-sm">
                      Commission payout
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AffiliateProgram;
