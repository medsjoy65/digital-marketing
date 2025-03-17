import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Search,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  BarChart2,
  FileText,
  Tag,
  Globe,
} from "lucide-react";

interface SEOToolsProps {
  productId?: string;
  productName?: string;
  productDescription?: string;
  keywords?: string[];
  seoScore?: number;
}

const SEOTools = ({
  productId = "prod-123",
  productName = "Premium Wireless Headphones",
  productDescription = "High-quality wireless headphones with noise cancellation and 20-hour battery life.",
  keywords = [
    "wireless",
    "headphones",
    "noise cancellation",
    "premium audio",
    "long battery",
  ],
  seoScore = 78,
}: SEOToolsProps) => {
  const [activeTab, setActiveTab] = useState("keyword-analysis");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for SEO suggestions
  const metaTagSuggestions = [
    {
      id: 1,
      type: "Title",
      current: "Premium Wireless Headphones",
      suggestion: "Premium Noise-Cancelling Wireless Headphones | 20Hr Battery",
      impact: "high",
    },
    {
      id: 2,
      type: "Description",
      current: "High-quality wireless headphones with noise cancellation.",
      suggestion:
        "Experience crystal-clear audio with our premium noise-cancelling wireless headphones featuring 20-hour battery life and comfortable design.",
      impact: "medium",
    },
    {
      id: 3,
      type: "Keywords",
      current: "wireless, headphones, audio",
      suggestion:
        "wireless headphones, noise cancellation, premium audio, long battery life, comfortable headphones",
      impact: "high",
    },
  ];

  const contentSuggestions = [
    {
      id: 1,
      suggestion: "Add more detailed product specifications",
      impact: "medium",
    },
    {
      id: 2,
      suggestion: "Include customer testimonials or reviews",
      impact: "high",
    },
    {
      id: 3,
      suggestion: "Add comparison with similar products",
      impact: "medium",
    },
    {
      id: 4,
      suggestion: "Include FAQ section addressing common questions",
      impact: "high",
    },
  ];

  const keywordAnalysis = [
    {
      keyword: "wireless headphones",
      volume: 12500,
      competition: "High",
      relevance: 95,
      status: "Used",
    },
    {
      keyword: "noise cancelling headphones",
      volume: 8300,
      competition: "Medium",
      relevance: 90,
      status: "Used",
    },
    {
      keyword: "premium audio",
      volume: 5200,
      competition: "Medium",
      relevance: 85,
      status: "Used",
    },
    {
      keyword: "long battery headphones",
      volume: 3100,
      competition: "Low",
      relevance: 80,
      status: "Used",
    },
    {
      keyword: "bluetooth headphones",
      volume: 15000,
      competition: "High",
      relevance: 75,
      status: "Suggested",
    },
    {
      keyword: "over ear headphones",
      volume: 7200,
      competition: "Medium",
      relevance: 70,
      status: "Suggested",
    },
  ];

  return (
    <div className="w-full h-full bg-white p-6 overflow-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">SEO Optimization Tools</h1>
          <p className="text-gray-500">
            Optimize your product listings for better visibility
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium">SEO Score:</span>
            <Badge
              variant={
                seoScore >= 80
                  ? "default"
                  : seoScore >= 60
                    ? "secondary"
                    : "destructive"
              }
              className="text-sm"
            >
              {seoScore}/100
            </Badge>
          </div>
          <Button size="sm">Run SEO Audit</Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
          <CardDescription>
            Current product details used for SEO analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium mb-1">Product Name</p>
              <p className="text-sm text-gray-700">{productName}</p>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Product ID</p>
              <p className="text-sm text-gray-700">{productId}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm font-medium mb-1">Description</p>
              <p className="text-sm text-gray-700">{productDescription}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm font-medium mb-1">Current Keywords</p>
              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword, index) => (
                  <Badge key={index} variant="secondary">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search for keywords, competitors, or SEO tips..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs
        defaultValue="keyword-analysis"
        className="w-full"
        onValueChange={setActiveTab}
        value={activeTab}
      >
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger
            value="keyword-analysis"
            className="flex items-center gap-2"
          >
            <Tag className="h-4 w-4" />
            <span>Keyword Analysis</span>
          </TabsTrigger>
          <TabsTrigger value="meta-tags" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Meta Tags</span>
          </TabsTrigger>
          <TabsTrigger
            value="content-optimization"
            className="flex items-center gap-2"
          >
            <CheckCircle className="h-4 w-4" />
            <span>Content</span>
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            <span>Performance</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="keyword-analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Keyword Analysis</CardTitle>
              <CardDescription>
                Analyze and optimize keywords for your product
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-sm font-medium">
                        Keyword
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium">
                        Search Volume
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium">
                        Competition
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium">
                        Relevance
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {keywordAnalysis.map((item, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm">{item.keyword}</td>
                        <td className="py-3 px-4 text-sm">
                          {item.volume.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <Badge
                            variant={
                              item.competition === "High"
                                ? "destructive"
                                : item.competition === "Medium"
                                  ? "secondary"
                                  : "default"
                            }
                          >
                            {item.competition}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm">{item.relevance}%</td>
                        <td className="py-3 px-4 text-sm">
                          {item.status === "Used" ? (
                            <Badge variant="default" className="bg-green-500">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Used
                            </Badge>
                          ) : (
                            <Badge variant="outline">Suggested</Badge>
                          )}
                        </td>
                        <td className="py-3 px-4 text-sm">
                          {item.status === "Suggested" ? (
                            <Button size="sm" variant="outline">
                              Add
                            </Button>
                          ) : (
                            <Button size="sm" variant="ghost">
                              Remove
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Export Keywords</Button>
              <Button>Find More Keywords</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="meta-tags" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Meta Tag Suggestions</CardTitle>
              <CardDescription>
                Optimize your product's meta tags for better SEO
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {metaTagSuggestions.map((suggestion) => (
                  <div key={suggestion.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{suggestion.type}</h3>
                      <Badge
                        variant={
                          suggestion.impact === "high"
                            ? "default"
                            : suggestion.impact === "medium"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {suggestion.impact.charAt(0).toUpperCase() +
                          suggestion.impact.slice(1)}{" "}
                        Impact
                      </Badge>
                    </div>
                    <div className="mb-3">
                      <p className="text-sm font-medium mb-1">Current</p>
                      <p className="text-sm text-gray-700 p-2 bg-gray-50 rounded">
                        {suggestion.current}
                      </p>
                    </div>
                    <div className="mb-3">
                      <p className="text-sm font-medium mb-1">Suggested</p>
                      <p className="text-sm text-gray-700 p-2 bg-green-50 border border-green-100 rounded">
                        {suggestion.suggestion}
                      </p>
                    </div>
                    <div className="flex justify-end">
                      <Button size="sm">Apply Suggestion</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Apply All Suggestions</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="content-optimization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Optimization</CardTitle>
              <CardDescription>
                Suggestions to improve your product content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contentSuggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className="flex items-start p-3 border rounded-lg"
                  >
                    <div className="mr-3 mt-0.5">
                      {suggestion.impact === "high" ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-amber-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{suggestion.suggestion}</p>
                      <p className="text-sm text-gray-500">
                        {suggestion.impact === "high"
                          ? "Highly recommended"
                          : "Recommended"}{" "}
                        for improved SEO
                      </p>
                    </div>
                    <Button size="sm" variant="ghost">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Generate Content Suggestions</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SEO Performance</CardTitle>
              <CardDescription>
                Track your product's SEO performance over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center border rounded-lg bg-gray-50">
                <div className="text-center">
                  <Globe className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">
                    Performance data visualization will appear here
                  </p>
                  <p className="text-sm text-gray-400">
                    Showing data for the last 30 days
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm font-medium mb-1">Impressions</p>
                    <p className="text-2xl font-bold">1,245</p>
                    <p className="text-xs text-green-500 flex items-center">
                      +12.5% <ArrowRight className="h-3 w-3 ml-1 rotate-45" />
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm font-medium mb-1">
                      Click-through Rate
                    </p>
                    <p className="text-2xl font-bold">3.8%</p>
                    <p className="text-xs text-green-500 flex items-center">
                      +0.5% <ArrowRight className="h-3 w-3 ml-1 rotate-45" />
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm font-medium mb-1">Avg. Position</p>
                    <p className="text-2xl font-bold">4.2</p>
                    <p className="text-xs text-green-500 flex items-center">
                      +1.3 <ArrowRight className="h-3 w-3 ml-1 rotate-45" />
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Export Report</Button>
              <Button>View Detailed Analytics</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SEOTools;
