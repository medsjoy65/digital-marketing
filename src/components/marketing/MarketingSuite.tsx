import React, { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import MarketingTabs from "./MarketingTabs";
import SEOTools from "./SEOTools";
import EmailCampaigns from "./EmailCampaigns";
import AbandonedCart from "./AbandonedCart";
import AffiliateProgram from "./AffiliateProgram";

interface MarketingSuiteProps {
  activeTab?: string;
}

const MarketingSuite = ({ activeTab = "seo" }: MarketingSuiteProps) => {
  const [currentTab, setCurrentTab] = useState(activeTab);

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
  };

  return (
    <div className="w-full h-full bg-white flex flex-col">
      <MarketingTabs activeTab={currentTab} onTabChange={handleTabChange} />

      <Tabs value={currentTab} className="flex-1 overflow-hidden">
        <TabsContent value="seo" className="h-full">
          <SEOTools />
        </TabsContent>

        <TabsContent value="email" className="h-full">
          <EmailCampaigns />
        </TabsContent>

        <TabsContent value="cart" className="h-full">
          <AbandonedCart />
        </TabsContent>

        <TabsContent value="affiliate" className="h-full">
          <AffiliateProgram />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketingSuite;
