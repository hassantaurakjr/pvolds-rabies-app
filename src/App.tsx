import { useState } from 'react'
import './App.css'
import { Login } from "./components/Login";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { PetRegistration } from "./components/PetRegistration";
import { Vaccination } from "./components/Vaccination";
import { Reports } from "./components/Reports";
import { AdminPanel } from "./components/AdminPanel";
import { ReportRabiesCase } from "./components/ReportRabiesCase";
import { PetList } from "./components/PetList";
import { PetProfile } from "./components/PetProfile";
import { VaccinatedToday } from "./components/VaccinatedToday";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { QrCode, Search } from "lucide-react";

interface User {
  email: string;
  role: string;
  name: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [selectedPetId, setSelectedPetId] = useState<
    string | undefined
  >();
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (email: string, role: string) => {
    // Mock user data based on email
    const userData: Record<
      string,
      { role: string; name: string }
    > = {
      "admin@vaxtracker.com": {
        role: "admin",
        name: "System Administrator",
      },
      "vet@vaxtracker.com": {
        role: "veterinarian",
        name: "Dr. Maria Cruz",
      },
      "user@vaxtracker.com": {
        role: "user",
        name: "Jose Santos",
      },
    };

    const userInfo = userData[email] || {
      role: "user",
      name: "User",
    };
    setUser({
      email,
      role: userInfo.role,
      name: userInfo.name,
    });
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage("dashboard");
    setSelectedPetId(undefined);
  };

  const handleNavigation = (page: string, petId?: string) => {
    setCurrentPage(page);
    if (petId) {
      setSelectedPetId(petId);
    }
  };

  const renderQRScanner = () => (
    <div className="space-y-6">
      <div>
        <h1>Scan Pet QR Code</h1>
        <p className="text-muted-foreground">
          Scan a pet's QR code to quickly access their
          information and vaccination records
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5" />
              QR Code Scanner
            </CardTitle>
            <CardDescription>
              Position the QR code within the camera frame to
              scan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center">
                <QrCode className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">
                  Camera Scanner
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Camera view would appear here in a real
                  implementation
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  QR codes will automatically redirect to
                  vaccination form
                </p>
              </div>
            </div>
            <Button className="w-full mt-4" size="lg">
              <QrCode className="h-4 w-4 mr-2" />
              Start Camera Scanner
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Manual Pet Search</CardTitle>
            <CardDescription>
              Search for a pet manually if QR code scanning is
              not available
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Input
                placeholder="Enter Pet ID (e.g., PET123456) or pet name..."
                className="font-mono"
              />
            </div>
            <Button className="w-full" variant="outline">
              <Search className="h-4 w-4 mr-2" />
              Search Pet Database
            </Button>

            <div className="mt-6">
              <h4 className="font-medium mb-3">
                Recent QR Scans
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 border rounded hover:bg-gray-50">
                  <div>
                    <p className="font-medium">
                      Buddy (PET123456)
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Owner: Maria Santos
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      handleNavigation(
                        "pet-profile",
                        "PET123456",
                      )
                    }
                  >
                    View
                  </Button>
                </div>
                <div className="flex items-center justify-between p-2 border rounded hover:bg-gray-50">
                  <div>
                    <p className="font-medium">
                      Luna (PET789012)
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Owner: Jose Cruz
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      handleNavigation(
                        "pet-profile",
                        "PET789012",
                      )
                    }
                  >
                    View
                  </Button>
                </div>
                <div className="flex items-center justify-between p-2 border rounded hover:bg-gray-50">
                  <div>
                    <p className="font-medium">
                      Max (PET345678)
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Owner: Ana Rodriguez
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      handleNavigation(
                        "pet-profile",
                        "PET345678",
                      )
                    }
                  >
                    View
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-medium text-blue-800">
                Quick Actions After Scanning:
              </p>
              <div className="flex gap-2 mt-2">
                <Button
                  size="sm"
                  onClick={() => handleNavigation("vaccinate")}
                >
                  Record Vaccination
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleNavigation("petlist")}
                >
                  View All Pets
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderCurrentPage = () => {
    if (!user) return null;

    switch (currentPage) {
      case "dashboard":
        return (
          <Dashboard
            onNavigate={handleNavigation}
            userRole={user.role}
          />
        );
      case "register":
        return <PetRegistration />;
      case "scan":
        return renderQRScanner();
      case "vaccinate":
        return <Vaccination />;
      case "petlist":
        return <PetList onNavigate={handleNavigation} />;
      case "pet-profile":
        return (
          <PetProfile
            petId={selectedPetId}
            onNavigate={handleNavigation}
          />
        );
      case "report-case":
        return <ReportRabiesCase />;
      case "vaccinated-today":
        return (
          <VaccinatedToday onNavigate={handleNavigation} />
        );
      case "reports":
        return <Reports />;
      case "admin":
        return user.role === "admin" ? (
          <AdminPanel />
        ) : (
          <Dashboard
            onNavigate={handleNavigation}
            userRole={user.role}
          />
        );
      default:
        return (
          <Dashboard
            onNavigate={handleNavigation}
            userRole={user.role}
          />
        );
    }
  };

  // Show login screen if user is not authenticated
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Layout
      currentPage={currentPage}
      onPageChange={handleNavigation}
      userRole={user.role}
      userEmail={user.email}
      onLogout={handleLogout}
    >
      {renderCurrentPage()}
    </Layout>
  );
}