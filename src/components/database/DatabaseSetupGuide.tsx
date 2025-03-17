import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, Database, Table } from "lucide-react";

const DatabaseSetupGuide = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Supabase Database Setup Guide
          </CardTitle>
          <CardDescription>
            Follow these steps to set up your database tables for the SkyGarden
            application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert variant="warning" className="bg-amber-50">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No Database Tables Found</AlertTitle>
            <AlertDescription>
              Your Supabase project doesn't have any tables created yet. This is
              why authentication and other database features aren't working.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">
              Step 1: Create Required Tables
            </h3>
            <p>
              You need to create the following tables in your Supabase database:
            </p>

            <div className="space-y-4">
              <div className="border rounded-md p-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Table className="h-4 w-4" /> users
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  Stores user profile information
                </p>
                <div className="bg-gray-100 p-3 rounded-md font-mono text-sm">
                  <p>id (uuid, primary key)</p>
                  <p>email (text, unique)</p>
                  <p>name (text)</p>
                  <p>role (text)</p>
                  <p>created_at (timestamp with time zone)</p>
                </div>
              </div>

              <div className="border rounded-md p-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Table className="h-4 w-4" /> products
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  Stores product information
                </p>
                <div className="bg-gray-100 p-3 rounded-md font-mono text-sm">
                  <p>id (uuid, primary key)</p>
                  <p>name (text)</p>
                  <p>description (text)</p>
                  <p>price (numeric)</p>
                  <p>seller_id (uuid, foreign key to users.id)</p>
                  <p>created_at (timestamp with time zone)</p>
                </div>
              </div>

              <div className="border rounded-md p-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Table className="h-4 w-4" /> orders
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  Stores order information
                </p>
                <div className="bg-gray-100 p-3 rounded-md font-mono text-sm">
                  <p>id (uuid, primary key)</p>
                  <p>buyer_id (uuid, foreign key to users.id)</p>
                  <p>total_amount (numeric)</p>
                  <p>status (text)</p>
                  <p>created_at (timestamp with time zone)</p>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-medium mt-6">
              Step 2: Set Up Authentication
            </h3>
            <p>Configure authentication in your Supabase project:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Go to Authentication → Settings</li>
              <li>Enable Email provider</li>
              <li>Configure site URL and redirect URLs</li>
            </ol>

            <h3 className="text-lg font-medium mt-6">
              Step 3: Set Up Row Level Security
            </h3>
            <p>
              For each table, enable Row Level Security and create appropriate
              policies:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Go to Database → Tables</li>
              <li>Select a table</li>
              <li>Go to "Policies" tab</li>
              <li>Enable RLS and create policies for read/write access</li>
            </ol>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between bg-gray-100">
          <p className="text-sm text-gray-600">
            For now, the application is using mock authentication that works
            without a database.
          </p>
          <Button
            variant="outline"
            onClick={() => window.open("https://supabase.com/docs", "_blank")}
          >
            Supabase Documentation
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DatabaseSetupGuide;
