import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  ShoppingBag,
  BarChart3,
  Settings,
  Users,
  Package,
  Megaphone,
  LogOut,
  HelpCircle,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

const NavItem = ({ icon, label, href, active = false }: NavItemProps) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(href);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link to={href} className="w-full" onClick={handleClick}>
            <Button
              variant="ghost"
              size="lg"
              className={cn(
                "w-full justify-start gap-3 font-normal",
                active
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent hover:text-accent-foreground",
              )}
            >
              {icon}
              <span>{label}</span>
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

interface DashboardSidebarProps {
  userRole?: "admin" | "seller" | "buyer";
  userName?: string;
  userAvatar?: string;
  activePath?: string;
}

const DashboardSidebar = ({
  userRole = "seller",
  userName = "Jane Smith",
  userAvatar = "",
  activePath = "/dashboard",
}: DashboardSidebarProps) => {
  const navigate = useNavigate();
  // Define navigation items based on user role
  const getNavItems = () => {
    const commonItems = [
      { icon: <Home size={20} />, label: "Dashboard", href: "/dashboard" },
      { icon: <Settings size={20} />, label: "Settings", href: "/settings" },
    ];

    const roleSpecificItems = {
      admin: [
        { icon: <Users size={20} />, label: "User Management", href: "/users" },
        {
          icon: <BarChart3 size={20} />,
          label: "Platform Analytics",
          href: "/analytics",
        },
      ],
      seller: [
        { icon: <Package size={20} />, label: "Products", href: "/products" },
        {
          icon: <Megaphone size={20} />,
          label: "Marketing",
          href: "/marketing",
        },
        {
          icon: <BarChart3 size={20} />,
          label: "Analytics",
          href: "/analytics",
        },
      ],
      buyer: [
        {
          icon: <ShoppingBag size={20} />,
          label: "My Orders",
          href: "/orders",
        },
        {
          icon: <Package size={20} />,
          label: "Browse Products",
          href: "/browse",
        },
      ],
    };

    return [...roleSpecificItems[userRole], ...commonItems];
  };

  const navItems = getNavItems();

  return (
    <div className="flex h-full w-[250px] flex-col bg-background border-r p-4">
      <div className="flex items-center gap-3 py-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={userAvatar} alt={userName} />
          <AvatarFallback>
            {userName.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium">{userName}</span>
          <span className="text-xs text-muted-foreground capitalize">
            {userRole}
          </span>
        </div>
      </div>

      <Separator className="my-4" />

      <nav className="flex-1 space-y-1">
        {navItems.map((item, index) => (
          <NavItem
            key={index}
            icon={item.icon}
            label={item.label}
            href={item.href}
            active={activePath === item.href}
          />
        ))}
      </nav>

      <div className="mt-auto space-y-2">
        <NavItem
          icon={<HelpCircle size={20} />}
          label="Help & Support"
          href="/support"
        />
        <Button
          variant="ghost"
          size="lg"
          className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50"
          onClick={() => {
            // Handle logout logic here
            navigate("/");
          }}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
