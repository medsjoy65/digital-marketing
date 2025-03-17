import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMockAuth } from "@/contexts/MockAuthContext";
import SellerDashboard from "./SellerDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Users, ShoppingBag } from "lucide-react";

interface DashboardContainerProps {
  userRole?: "admin" | "seller" | "buyer";
  userName?: string;
  userAvatar?: string;
  isAuthenticated?: boolean;
  activePath?: string;
}

const DashboardContainer = ({
  userRole: propUserRole,
  userName: propUserName,
  userAvatar = "",
  isAuthenticated: propIsAuthenticated,
  activePath: initialActivePath = "/dashboard",
}: DashboardContainerProps) => {
  // Use values from props or from auth context
  const { user, isAuthenticated: contextIsAuthenticated } = useMockAuth();
  const userRole = propUserRole || user?.role || "seller";
  const userName = propUserName || user?.name || "Jane Smith";
  const isAuthenticated =
    propIsAuthenticated !== undefined
      ? propIsAuthenticated
      : contextIsAuthenticated;
  const navigate = useNavigate();
  const location = useLocation();
  const [activePath, setActivePath] = useState(initialActivePath);

  useEffect(() => {
    // Update activePath when the prop changes
    if (initialActivePath) {
      setActivePath(initialActivePath);
    }
  }, [initialActivePath]);

  useEffect(() => {
    // Update activePath based on current location
    setActivePath(location.pathname);
  }, [location]);

  // Authentication is now handled by the ProtectedRoute component
  useEffect(() => {
    // Any dashboard-specific initialization can go here
    console.log("Dashboard initialized");
  }, []);

  // Function to handle role switching
  const handleRoleSwitch = (role: "admin" | "seller" | "buyer") => {
    console.log(`Switching to ${role} role`);
    // Update the user role in localStorage
    if (user) {
      const updatedUser = { ...user, role };
      localStorage.setItem("mockUser", JSON.stringify(updatedUser));
      // Force a reload to update the context
      window.location.reload();
    }
  };

  // Render admin dashboard placeholder
  const renderAdminDashboard = () => (
    <div className="p-6 bg-background">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground">
              +180 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Sellers
            </CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">+24 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Platform Revenue
            </CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$48,352</div>
            <p className="text-xs text-muted-foreground">
              +12.5% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="analytics">Platform Analytics</TabsTrigger>
          <TabsTrigger value="settings">System Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <div className="flex items-center justify-center h-[400px] bg-muted/20 rounded-lg border border-dashed">
            <div className="flex flex-col items-center text-center p-6">
              <Users size={48} className="text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">User Management</h3>
              <p className="text-muted-foreground max-w-md">
                This section will contain user management tools including user
                listing, role assignment, and account management.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="flex items-center justify-center h-[400px] bg-muted/20 rounded-lg border border-dashed">
            <div className="flex flex-col items-center text-center p-6">
              <Shield size={48} className="text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">Platform Analytics</h3>
              <p className="text-muted-foreground max-w-md">
                This section will contain platform-wide analytics including user
                growth, revenue metrics, and system performance.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <div className="flex items-center justify-center h-[400px] bg-muted/20 rounded-lg border border-dashed">
            <div className="flex flex-col items-center text-center p-6">
              <Shield size={48} className="text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">System Settings</h3>
              <p className="text-muted-foreground max-w-md">
                This section will contain system configuration options including
                payment gateways, email settings, and platform customization.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  // Render buyer dashboard placeholder
  const renderBuyerDashboard = () => (
    <div className="p-6 bg-background">
      <h1 className="text-2xl font-bold mb-6">Buyer Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">3 pending delivery</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Wishlist Items
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">5 back in stock</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reward Points</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250</div>
            <p className="text-xs text-muted-foreground">
              Worth $12.50 in discounts
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="orders">My Orders</TabsTrigger>
          <TabsTrigger value="browse">Browse Products</TabsTrigger>
          <TabsTrigger value="account">Account Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          <div className="flex items-center justify-center h-[400px] bg-muted/20 rounded-lg border border-dashed">
            <div className="flex flex-col items-center text-center p-6">
              <ShoppingBag size={48} className="text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">Order History</h3>
              <p className="text-muted-foreground max-w-md">
                This section will display your order history, tracking
                information, and order status updates.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="browse">
          <div className="flex items-center justify-center h-[400px] bg-muted/20 rounded-lg border border-dashed">
            <div className="flex flex-col items-center text-center p-6">
              <Users size={48} className="text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">Product Catalog</h3>
              <p className="text-muted-foreground max-w-md">
                This section will contain the product catalog with filtering,
                sorting, and search capabilities.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="account">
          <div className="flex items-center justify-center h-[400px] bg-muted/20 rounded-lg border border-dashed">
            <div className="flex flex-col items-center text-center p-6">
              <Shield size={48} className="text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">Account Settings</h3>
              <p className="text-muted-foreground max-w-md">
                This section will contain account settings, profile management,
                payment methods, and shipping addresses.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  // Role switcher for demo purposes
  const renderRoleSwitcher = () => (
    <div className="bg-muted/30 p-3 rounded-lg mb-4">
      <p className="text-sm text-muted-foreground mb-2">
        Demo Mode: Switch User Role
      </p>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant={userRole === "admin" ? "default" : "outline"}
          onClick={() => handleRoleSwitch("admin")}
        >
          Admin
        </Button>
        <Button
          size="sm"
          variant={userRole === "seller" ? "default" : "outline"}
          onClick={() => handleRoleSwitch("seller")}
        >
          Seller
        </Button>
        <Button
          size="sm"
          variant={userRole === "buyer" ? "default" : "outline"}
          onClick={() => handleRoleSwitch("buyer")}
        >
          Buyer
        </Button>
      </div>
    </div>
  );

  // Render the appropriate dashboard based on user role
  const renderDashboard = () => {
    switch (userRole) {
      case "admin":
        return renderAdminDashboard();
      case "seller":
        return (
          <SellerDashboard
            userName={userName}
            userAvatar={userAvatar}
            activePath={activePath}
          />
        );
      case "buyer":
        return renderBuyerDashboard();
      default:
        return <div>Invalid user role</div>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Demo role switcher - would be removed in production */}
      {renderRoleSwitcher()}

      {/* Render the appropriate dashboard based on user role */}
      {renderDashboard()}
    </div>
  );
};

export default DashboardContainer;
