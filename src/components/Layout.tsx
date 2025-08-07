import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import logo from "../assets/logo.png";
import { 
  LayoutDashboard, 
  PlusCircle, 
  QrCode, 
  Syringe, 
  List, 
  AlertTriangle,
  Calendar,
  BarChart3, 
  Settings,
  Menu,
  X,
  LogOut,
  User
} from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
  userRole: string;
  userEmail: string;
  onLogout: () => void;
}

export function Layout({ children, currentPage, onPageChange, userRole, userEmail, onLogout }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'register', label: 'Register New Pet', icon: PlusCircle },
    { id: 'scan', label: 'Scan Pet QR Code', icon: QrCode },
    { id: 'vaccinate', label: 'Record Vaccination', icon: Syringe },
    { id: 'petlist', label: 'View Pet List', icon: List },
    { id: 'report-case', label: 'Report Rabies Case', icon: AlertTriangle },
    { id: 'vaccinated-today', label: 'Vaccinated Today', icon: Calendar },
    { id: 'reports', label: 'Reports & Export', icon: BarChart3 },
  ];

  // Add admin settings if user is admin
  if (userRole === 'admin') {
    menuItems.push({ id: 'admin', label: 'User/Admin Settings', icon: Settings });
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'veterinarian': return 'bg-blue-100 text-blue-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <div className="lg:hidden bg-white border-b p-4 flex items-center justify-between">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
        
        <div className="flex items-center gap-2">
          <span className="text-lg">🐾</span>
          <span className="font-semibold">VaxTracker</span>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out
          lg:translate-x-0 lg:static lg:inset-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="flex flex-col h-full">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <img src={logo} alt="PVOLDS Logo" className="h-14 w-14" />
                <h1 className="text-xl font-semibold text-primary">
                  PVOLDS VaxTracker
                </h1>
              </div>
              <p className="text-sm text-muted-foreground">
                Pet Vaccination Management System
              </p>
            </div>
            
            <Separator />
            
            <nav className="flex-1 p-4">
              <ul className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.id}>
                      <Button
                        variant={currentPage === item.id ? "secondary" : "ghost"}
                        className="w-full justify-start text-left"
                        onClick={() => {
                          onPageChange(item.id);
                          setSidebarOpen(false);
                        }}
                      >
                        <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </Button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <Separator />

            {/* User Info and Logout */}
            <div className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{userEmail}</p>
                  <Badge className={`text-xs ${getRoleBadgeColor(userRole)}`}>
                    {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                  </Badge>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={onLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 lg:ml-0">
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}