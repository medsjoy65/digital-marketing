import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Mail, ShoppingCart, Users } from "lucide-react";

interface MarketingTabsProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const MarketingTabs = ({
  activeTab = "seo",
  onTabChange = () => {},
}: MarketingTabsProps) => {
  const handleTabChange = (value: string) => {
    onTabChange(value);
  };

  return (
    <div className="w-full bg-white p-4 border-b border-gray-200">
      <Tabs defaultValue={activeTab} onValueChange={handleTabChange}>
        <TabsList className="w-full flex justify-between max-w-3xl mx-auto">
          <TabsTrigger value="seo" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            <span>SEO Tools</span>
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>Email Campaigns</span>
          </TabsTrigger>
          <TabsTrigger value="cart" className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            <span>Abandoned Cart</span>
          </TabsTrigger>
          <TabsTrigger value="affiliate" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Affiliate Program</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default MarketingTabs;
