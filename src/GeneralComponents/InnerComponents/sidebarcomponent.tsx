import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  FileText,
  MonitorCog,
  PackagePlus,
  Settings,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const menuItems = [
  { href: "/", icon: <FileText className="h-5 w-5" />, label: "Dashboard" },
  {
    href: "/connect-sites",
    icon: <Users className="h-5 w-5" />,
    label: "Connect Sites",
  },
  {
    href: "/settings",
    icon: <Settings className="h-5 w-5" />,
    label: "Settings",
  },
  {
    href: "/manageInventory",
    icon: <MonitorCog className="h-5 w-5" />,
    label: "Manage Inventory",
  },
  {
    href: "/createproduct",
    icon: <PackagePlus className="h-5 w-5" />,
    label: "Create Product",
  },
];

export function SideBarComponent() {
  const location = useLocation();
  const [hover, setHover] = useState(false);

  return (
    <div className="flex flex-col items-start gap-2 p-2 relative">
      {menuItems.map((item, index) => (
        <div
          key={index}
          onMouseEnter={() =>
            item.href === "/manageInventory" && setHover(true)
          }
          onMouseLeave={() =>
            item.href === "/manageInventory" && setHover(false)
          }
          className="relative w-full"
        >
          <a
            id={item.href}
            href={item.href}
            className={cn(
              "flex items-center space-x-2 rounded-lg px-2 py-2 text-black hover:bg-primary hover:text-primary-foreground w-full relative",
              location.pathname === item.href
                ? "bg-primary/90 text-primary-foreground"
                : ""
            )}
          >
            {item.icon}
            <span>{item.label}</span>
          </a>

          {item.href === "/manageInventory" && hover && (
            <div className="absolute left-full top-0 z-50 p-1">
              <div className="relative">
                {" "}
                {/* Increased z-index */}
                <Card className="w-40 bg-slate-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-center">Categories</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col justify-center items-start gap-2 px-4">
                    <div>Electronics</div>
                    <div>Plants</div>
                    <div>Home Appliances</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
