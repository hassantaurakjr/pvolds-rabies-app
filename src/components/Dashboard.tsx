import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  PlusCircle, 
  QrCode, 
  Syringe, 
  List, 
  AlertTriangle, 
  BarChart3, 
  Settings,
  CheckCircle,
  Calendar,
  TrendingUp
} from "lucide-react";

interface DashboardProps {
  onNavigate: (page: string) => void;
  userRole: string;
}

export function Dashboard({ onNavigate, userRole }: DashboardProps) {
  // Mock data - in real app this would come from API/database
  const stats = {
    totalVaccinatedPets: 1247,
    petsVaccinatedToday: 23,
    totalRabiesCases: 8,
    totalRegisteredPets: 1583
  };

  const quickActions = [
    {
      id: 'register',
      title: 'Register New Pet',
      icon: PlusCircle,
      color: 'bg-blue-500 hover:bg-blue-600',
      description: 'Add a new pet to the system'
    },
    {
      id: 'scan',
      title: 'Scan Pet QR Code',
      icon: QrCode,
      color: 'bg-green-500 hover:bg-green-600',
      description: 'Scan QR to access pet records'
    },
    {
      id: 'vaccinate',
      title: 'Record Rabies Vaccination',
      icon: Syringe,
      color: 'bg-purple-500 hover:bg-purple-600',
      description: 'Record new vaccination'
    },
    {
      id: 'petlist',
      title: 'View Pet List',
      icon: List,
      color: 'bg-orange-500 hover:bg-orange-600',
      description: 'Browse all registered pets'
    },
    {
      id: 'report-case',
      title: 'Report Rabies Case',
      icon: AlertTriangle,
      color: 'bg-red-500 hover:bg-red-600',
      description: 'Report a rabies case incident'
    },
    {
      id: 'reports',
      title: 'Reports & Export',
      icon: BarChart3,
      color: 'bg-teal-500 hover:bg-teal-600',
      description: 'View analytics and export data'
    }
  ];

  // Add admin settings button if user is admin
  if (userRole === 'admin') {
    quickActions.push({
      id: 'admin',
      title: 'User/Admin Settings',
      icon: Settings,
      color: 'bg-gray-500 hover:bg-gray-600',
      description: 'System administration'
    });
  }

  const recentActivity = [
    { action: 'Pet Registration', pet: 'Buddy', owner: 'Maria Santos', time: '2 hours ago' },
    { action: 'Vaccination Record', pet: 'Luna', owner: 'Jose Cruz', time: '3 hours ago' },
    { action: 'Rabies Case Report', pet: 'Unknown Stray', location: 'Barangay 1', time: '5 hours ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to VaxTracker - PVOLDS Pet Vaccination Management System
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Today's Date</p>
          <p className="font-medium">{new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
        </div>
      </div>

      {/* Main Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-white/90">✅ Total Vaccinated Pets</CardTitle>
            <CheckCircle className="h-8 w-8 text-white/80" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalVaccinatedPets.toLocaleString()}</div>
            <p className="text-green-100 text-sm">
              {((stats.totalVaccinatedPets / stats.totalRegisteredPets) * 100).toFixed(1)}% coverage rate
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-white/90">📅 Pets Vaccinated Today</CardTitle>
            <Calendar className="h-8 w-8 text-white/80" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.petsVaccinatedToday}</div>
            <p className="text-blue-100 text-sm">
              Vaccinations completed today
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-white/90">🚨 Total Rabies Cases Reported</CardTitle>
            <AlertTriangle className="h-8 w-8 text-white/80" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalRabiesCases}</div>
            <p className="text-red-100 text-sm">
              Cases reported this year
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Access the most common features and operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.id}
                  variant="outline"
                  className={`h-24 flex flex-col items-center gap-2 p-4 hover:scale-105 transition-transform ${action.color} text-white border-0`}
                  onClick={() => onNavigate(action.id)}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-center text-sm leading-tight">{action.title}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Additional Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.pet && `Pet: ${activity.pet}`}
                      {activity.owner && ` • Owner: ${activity.owner}`}
                      {activity.location && ` • Location: ${activity.location}`}
                    </p>
                  </div>
                  <Badge variant="outline">{activity.time}</Badge>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => onNavigate('vaccinated-today')}
            >
              View All Today's Activities
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>System Status</span>
                <Badge className="bg-green-100 text-green-800">Online</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Database</span>
                <Badge className="bg-green-100 text-green-800">Connected</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Last Backup</span>
                <span className="text-sm text-muted-foreground">Today, 6:00 AM</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Active Users</span>
                <span className="text-sm">12 online</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Total Registered Pets</span>
                <span className="font-medium">{stats.totalRegisteredPets.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}