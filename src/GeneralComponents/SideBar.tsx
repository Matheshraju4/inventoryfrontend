import { ReactNode, useState } from "react";

import { Home, FileText, Users, Settings, Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SideBarComponent } from "./InnerComponents/sidebarcomponent";

export default function Sidebar({ children }: { children: any }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="w-full flex flex-row">
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 sm:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
      <div className={cn("md:w-48", isOpen ? "w-48" : "hidden sm:block")}>
        <div
          className={cn(
            " min-h-screen  transform bg-background transition-transform duration-200 ease-in-out lg:translate-x-0",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <Card className="flex min-h-screen flex-col justify-between bg-slate-100 border-2 ">
            <div>
              <nav className="pt-10">
                <SideBarComponent />
              </nav>
            </div>
            <div className="p-4">
              <div className="flex items-center space-x-4 rounded-lg bg-gray-100 p-4">
                <img
                  alt="User avatar"
                  className="h-10 w-10 rounded-full"
                  height="40"
                  src="/placeholder.svg?height=40&width=40"
                  style={{
                    aspectRatio: "40/40",
                    objectFit: "cover",
                  }}
                  width="40"
                />
                <div>
                  <h3 className="text-sm font-medium">John Doe</h3>
                  <p className="text-xs text-gray-500">john@example.com</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="w-full">{children}</div>
    </div>
  );
}
