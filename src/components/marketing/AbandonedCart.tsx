import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  BarChart3,
  Mail,
  Clock,
  Settings,
  PlusCircle,
  Trash2,
  Send,
} from "lucide-react";

interface AbandonedCartProps {
  campaigns?: Campaign[];
  statistics?: Statistics;
}

interface Campaign {
  id: string;
  name: string;
  status: "active" | "draft" | "paused";
  emailsSent: number;
  openRate: number;
  recoveryRate: number;
  lastSent: string;
}

interface Statistics {
  totalCarts: number;
  recoveredCarts: number;
  recoveryRate: number;
  revenue: number;
}

const AbandonedCart = ({
  campaigns = defaultCampaigns,
  statistics = defaultStatistics,
}: AbandonedCartProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="w-full h-full bg-white p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Abandoned Cart Recovery</h1>
        <p className="text-muted-foreground">
          Automatically recover lost sales with targeted email campaigns
        </p>
      </div>

      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="mb-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="campaigns" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Campaigns
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Abandoned Carts"
              value={statistics.totalCarts}
              description="Last 30 days"
              icon={<Clock className="h-5 w-5 text-blue-500" />}
            />
            <StatCard
              title="Recovered Carts"
              value={statistics.recoveredCarts}
              description="Last 30 days"
              icon={<Mail className="h-5 w-5 text-green-500" />}
            />
            <StatCard
              title="Recovery Rate"
              value={`${statistics.recoveryRate}%`}
              description="Last 30 days"
              icon={<BarChart3 className="h-5 w-5 text-purple-500" />}
            />
            <StatCard
              title="Recovered Revenue"
              value={`$${statistics.revenue.toLocaleString()}`}
              description="Last 30 days"
              icon={<BarChart3 className="h-5 w-5 text-yellow-500" />}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Campaigns</CardTitle>
              <CardDescription>
                Performance of your recent abandoned cart recovery campaigns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">
                        Campaign
                      </th>
                      <th className="text-left py-3 px-4 font-medium">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 font-medium">
                        Emails Sent
                      </th>
                      <th className="text-left py-3 px-4 font-medium">
                        Open Rate
                      </th>
                      <th className="text-left py-3 px-4 font-medium">
                        Recovery Rate
                      </th>
                      <th className="text-left py-3 px-4 font-medium">
                        Last Sent
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns.slice(0, 3).map((campaign) => (
                      <tr
                        key={campaign.id}
                        className="border-b hover:bg-muted/50"
                      >
                        <td className="py-3 px-4">{campaign.name}</td>
                        <td className="py-3 px-4">
                          <StatusBadge status={campaign.status} />
                        </td>
                        <td className="py-3 px-4">{campaign.emailsSent}</td>
                        <td className="py-3 px-4">{campaign.openRate}%</td>
                        <td className="py-3 px-4">{campaign.recoveryRate}%</td>
                        <td className="py-3 px-4">{campaign.lastSent}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                onClick={() => setActiveTab("campaigns")}
              >
                View All Campaigns
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Email Campaigns</h2>
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Create Campaign
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-4 px-6 font-medium">
                        Campaign
                      </th>
                      <th className="text-left py-4 px-6 font-medium">
                        Status
                      </th>
                      <th className="text-left py-4 px-6 font-medium">
                        Emails Sent
                      </th>
                      <th className="text-left py-4 px-6 font-medium">
                        Open Rate
                      </th>
                      <th className="text-left py-4 px-6 font-medium">
                        Recovery Rate
                      </th>
                      <th className="text-left py-4 px-6 font-medium">
                        Last Sent
                      </th>
                      <th className="text-left py-4 px-6 font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns.map((campaign) => (
                      <tr
                        key={campaign.id}
                        className="border-b hover:bg-muted/50"
                      >
                        <td className="py-4 px-6">{campaign.name}</td>
                        <td className="py-4 px-6">
                          <StatusBadge status={campaign.status} />
                        </td>
                        <td className="py-4 px-6">{campaign.emailsSent}</td>
                        <td className="py-4 px-6">{campaign.openRate}%</td>
                        <td className="py-4 px-6">{campaign.recoveryRate}%</td>
                        <td className="py-4 px-6">{campaign.lastSent}</td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Send className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Settings className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Settings</CardTitle>
              <CardDescription>
                Configure your abandoned cart recovery settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Trigger Time</label>
                <div className="flex items-center gap-4">
                  <Input type="number" placeholder="1" className="w-24" />
                  <Select defaultValue="hours">
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minutes">Minutes</SelectItem>
                      <SelectItem value="hours">Hours</SelectItem>
                      <SelectItem value="days">Days</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-sm text-muted-foreground">
                    after cart abandonment
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Follow-up Emails</label>
                <div className="flex items-center gap-4">
                  <Input type="number" placeholder="3" className="w-24" />
                  <span className="text-sm text-muted-foreground">
                    maximum follow-up emails
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Discount Offer</label>
                <div className="flex items-center gap-4">
                  <Input type="number" placeholder="10" className="w-24" />
                  <span className="text-sm text-muted-foreground">
                    % discount in recovery emails
                  </span>
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

const StatCard = ({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-2">{value}</p>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          </div>
          <div className="bg-muted p-2 rounded-full">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
};

const StatusBadge = ({ status }: { status: "active" | "draft" | "paused" }) => {
  const getStatusStyles = () => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyles()}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// Default mock data
const defaultCampaigns: Campaign[] = [
  {
    id: "1",
    name: "First Reminder",
    status: "active",
    emailsSent: 1245,
    openRate: 42,
    recoveryRate: 15,
    lastSent: "2 hours ago",
  },
  {
    id: "2",
    name: "48-Hour Follow-up",
    status: "active",
    emailsSent: 876,
    openRate: 38,
    recoveryRate: 12,
    lastSent: "5 hours ago",
  },
  {
    id: "3",
    name: "Final Discount Offer",
    status: "active",
    emailsSent: 654,
    openRate: 45,
    recoveryRate: 18,
    lastSent: "1 day ago",
  },
  {
    id: "4",
    name: "VIP Customer Recovery",
    status: "draft",
    emailsSent: 0,
    openRate: 0,
    recoveryRate: 0,
    lastSent: "Never",
  },
  {
    id: "5",
    name: "Seasonal Promotion",
    status: "paused",
    emailsSent: 320,
    openRate: 36,
    recoveryRate: 10,
    lastSent: "2 weeks ago",
  },
];

const defaultStatistics: Statistics = {
  totalCarts: 2845,
  recoveredCarts: 426,
  recoveryRate: 15,
  revenue: 32580,
};

export default AbandonedCart;
