import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./layout/Header";
import AuthForm from "./auth/AuthForm";
import { Button } from "./ui/button";
import { ArrowRight, ShoppingBag, Users, BarChart } from "lucide-react";
import { useAuthContext } from "./auth/AuthProvider";
import DashboardContainer from "./dashboard/DashboardContainer";

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login, register, authError, isProcessing } =
    useAuthContext();

  // Handle authentication
  const handleAuth = async (data: any) => {
    if (data.confirmPassword) {
      // This is a registration
      if (data.password !== data.confirmPassword) {
        console.error("Passwords do not match");
        return;
      }
      const success = await register(data.email, data.password);
      if (success) {
        navigate("/dashboard");
      }
    } else {
      // This is a login
      const success = await login(data.email, data.password);
      if (success) {
        navigate("/dashboard");
      }
    }
  };

  // Redirect to dashboard if authenticated
  if (isAuthenticated) {
    return <DashboardContainer isAuthenticated={isAuthenticated} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-50 to-white">
      <Header isAuthenticated={isAuthenticated} />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-160px)]">
          {/* Left side - Hero content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Grow Your Business with SkyGarden
            </h1>
            <p className="text-xl text-gray-600 max-w-lg">
              A comprehensive e-commerce platform with integrated marketing
              tools for sellers and a seamless shopping experience for buyers.
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-primary/10 p-2 rounded-full mt-1">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Product Management</h3>
                  <p className="text-gray-600">
                    Easily list and manage your products with our intuitive
                    tools
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-primary/10 p-2 rounded-full mt-1">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Marketing Suite</h3>
                  <p className="text-gray-600">
                    Boost your sales with SEO tools, email campaigns, and
                    affiliate marketing
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-primary/10 p-2 rounded-full mt-1">
                  <BarChart className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Analytics Dashboard</h3>
                  <p className="text-gray-600">
                    Gain insights into your sales and customer behavior
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button
                size="lg"
                className="mr-4"
                onClick={() => navigate("/register")}
              >
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/learn-more")}
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Right side - Auth form */}
          <div className="flex justify-center">
            <AuthForm
              onSubmit={handleAuth}
              authError={authError}
              isProcessing={isProcessing}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="rounded-md bg-primary p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 text-primary-foreground"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-sm font-semibold">SkyGarden</span>
            </div>

            <div className="flex space-x-6">
              <a href="#" className="text-sm text-gray-600 hover:text-primary">
                Terms
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-primary">
                Privacy
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-primary">
                Contact
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-primary">
                About
              </a>
            </div>

            <div className="text-sm text-gray-600 mt-4 md:mt-0">
              © {new Date().getFullYear()} SkyGarden. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
