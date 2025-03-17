import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Package, Megaphone, Settings } from "lucide-react";
import DashboardSidebar from "./DashboardSidebar";
import MarketingSuite from "../marketing/MarketingSuite";

interface SellerDashboardProps {
  userName?: string;
  userAvatar?: string;
  activePath?: string;
}

const SellerDashboard = ({
  userName = "Jane Smith",
  userAvatar = "",
  activePath = "/marketing",
}: SellerDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Update active tab based on URL path
    if (location.pathname.includes("/marketing")) {
      setActiveTab("marketing");
    }
  }, [location]);

  // Mock data for dashboard metrics
  const dashboardMetrics = {
    totalProducts: 48,
    totalSales: "$12,450",
    totalOrders: 156,
    conversionRate: "3.2%",
    averageOrderValue: "$79.80",
    topSellingProducts: [
      { name: "Wireless Earbuds", sales: 32, revenue: "$2,560" },
      { name: "Smart Watch", sales: 28, revenue: "$4,200" },
      { name: "Bluetooth Speaker", sales: 24, revenue: "$1,920" },
    ],
    recentOrders: [
      {
        id: "#ORD-5523",
        customer: "John Doe",
        date: "2023-06-15",
        amount: "$129.99",
        status: "Completed",
      },
      {
        id: "#ORD-5522",
        customer: "Sarah Johnson",
        date: "2023-06-14",
        amount: "$79.99",
        status: "Processing",
      },
      {
        id: "#ORD-5521",
        customer: "Michael Brown",
        date: "2023-06-14",
        amount: "$249.99",
        status: "Completed",
      },
    ],
  };

  // Render dashboard overview content
  const renderOverviewContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Products
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {dashboardMetrics.totalProducts}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Sales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {dashboardMetrics.totalSales}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {dashboardMetrics.totalOrders}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Conversion Rate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {dashboardMetrics.conversionRate}
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Top Selling Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dashboardMetrics.topSellingProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="font-medium">{product.name}</div>
                <div className="flex items-center gap-4">
                  <div className="text-muted-foreground">
                    {product.sales} sold
                  </div>
                  <div className="font-medium">{product.revenue}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dashboardMetrics.recentOrders.map((order, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{order.id}</div>
                  <div className="text-sm text-muted-foreground">
                    {order.customer}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-muted-foreground">
                    {order.date}
                  </div>
                  <div className="font-medium">{order.amount}</div>
                  <div
                    className={`text-xs px-2 py-1 rounded-full ${order.status === "Completed" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}
                  >
                    {order.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Render products placeholder content
  const renderProductsContent = () => (
    <div className="flex items-center justify-center h-[600px] bg-muted/20 rounded-lg border border-dashed">
      <div className="flex flex-col items-center text-center p-6">
        <Package size={48} className="text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium mb-2">Product Management</h3>
        <p className="text-muted-foreground max-w-md">
          This section will contain product listing, inventory management, and
          category organization tools.
        </p>
      </div>
    </div>
  );

  // Render analytics placeholder content
  const renderAnalyticsContent = () => (
    <div className="flex items-center justify-center h-[600px] bg-muted/20 rounded-lg border border-dashed">
      <div className="flex flex-col items-center text-center p-6">
        <BarChart3 size={48} className="text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium mb-2">Analytics Dashboard</h3>
        <p className="text-muted-foreground max-w-md">
          This section will contain detailed analytics on sales, customer
          behavior, and marketing campaign performance.
        </p>
      </div>
    </div>
  );

  // Render settings placeholder content
  const renderSettingsContent = () => (
    <div className="flex items-center justify-center h-[600px] bg-muted/20 rounded-lg border border-dashed">
      <div className="flex flex-col items-center text-center p-6">
        <Settings size={48} className="text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium mb-2">Account Settings</h3>
        <p className="text-muted-foreground max-w-md">
          This section will contain account settings, profile management, and
          notification preferences.
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar
        userRole="seller"
        userName={userName}
        userAvatar={userAvatar}
        activePath={activePath}
      />

      <div className="flex-1 overflow-auto p-6">
        {activePath === "/marketing" ? (
          <MarketingSuite />
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-6">Seller Dashboard</h1>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                {renderOverviewContent()}
              </TabsContent>

              <TabsContent value="products">
                {renderProductsContent()}
              </TabsContent>

              <TabsContent value="analytics">
                {renderAnalyticsContent()}
              </TabsContent>

              <TabsContent value="settings">
                {renderSettingsContent()}
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;
