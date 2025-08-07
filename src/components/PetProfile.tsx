import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { 
  QrCode, 
  Download, 
  Syringe, 
  Edit, 
  Calendar, 
  MapPin, 
  User, 
  Phone,
  Heart,
  AlertCircle
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface PetProfileProps {
  petId?: string;
  onNavigate: (page: string, petId?: string) => void;
}

export function PetProfile({ petId = 'PET123456', onNavigate }: PetProfileProps) {
  // Mock pet data - in real app this would be fetched by petId
  const petData = {
    id: petId,
    name: 'Buddy',
    species: 'Dog',
    breed: 'Golden Retriever',
    age: '3 years',
    gender: 'Male',
    color: 'Golden with white chest',
    weight: '28 kg',
    microchipId: 'MC123456789',
    registrationDate: '2024-01-15',
    photo: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=300&fit=crop&crop=face',
    qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
      JSON.stringify({ petId, name: 'Buddy', owner: 'Maria Santos' })
    )}`,
    owner: {
      name: 'Maria Santos',
      address: '123 Main Street, Barangay 1, Municipality A',
      phone: '+63 912 345 6789',
      email: 'maria.santos@example.com',
      emergencyContact: '+63 987 654 3210'
    },
    vaccinationHistory: [
      {
        id: 1,
        date: '2025-02-15',
        vaccine: 'Rabies Vaccine',
        batchNo: 'RV2025-001',
        location: 'Municipal Veterinary Office',
        veterinarian: 'Dr. Maria Cruz',
        nextDue: '2026-02-15',
        status: 'Current'
      },
      {
        id: 2,
        date: '2024-02-10',
        vaccine: 'Rabies Vaccine',
        batchNo: 'RV2024-089',
        location: 'Barangay Health Center',
        veterinarian: 'Dr. Jose Santos',
        nextDue: '2025-02-10',
        status: 'Completed'
      },
      {
        id: 3,
        date: '2023-03-20',
        vaccine: 'Rabies Vaccine',
        batchNo: 'RV2023-045',
        location: 'Mobile Clinic',
        veterinarian: 'Dr. Ana Rodriguez',
        nextDue: '2024-03-20',
        status: 'Completed'
      }
    ],
    healthNotes: [
      { date: '2025-02-15', note: 'Pet appeared healthy, no adverse reactions to vaccination.' },
      { date: '2024-08-10', note: 'Minor injury on left paw, healed well.' }
    ],
    lastVaccination: '2025-02-15',
    vaccinationStatus: 'Up to date',
    nextVaccinationDue: '2026-02-15'
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Current': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getVaccinationStatusColor = (status: string) => {
    switch (status) {
      case 'Up to date': return 'bg-green-100 text-green-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'Due soon': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Pet Profile</h1>
          <p className="text-muted-foreground">
            Complete information and vaccination history for {petData.name}
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => onNavigate('vaccinate', petId)}
          >
            <Syringe className="h-4 w-4 mr-2" />
            Record New Vaccination
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Print Card
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pet Information & QR Code */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                Pet Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-gray-200 mb-4">
                  <ImageWithFallback
                    src={petData.photo}
                    alt={petData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">{petData.name}</h3>
                <p className="text-muted-foreground">ID: {petData.id}</p>
                <Badge className={getVaccinationStatusColor(petData.vaccinationStatus)}>
                  {petData.vaccinationStatus}
                </Badge>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-muted-foreground">Species:</span>
                  <span className="font-medium">{petData.species}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-muted-foreground">Breed:</span>
                  <span className="font-medium">{petData.breed}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-muted-foreground">Age:</span>
                  <span className="font-medium">{petData.age}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-muted-foreground">Gender:</span>
                  <span className="font-medium">{petData.gender}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-muted-foreground">Weight:</span>
                  <span className="font-medium">{petData.weight}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-muted-foreground">Color:</span>
                  <span className="font-medium">{petData.color}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-muted-foreground">Microchip:</span>
                  <span className="font-medium font-mono text-xs">{petData.microchipId}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-muted-foreground">Registered:</span>
                  <span className="font-medium">{petData.registrationDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                QR Code
              </CardTitle>
              <CardDescription>
                Scan for quick access to this pet's profile
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <ImageWithFallback
                src={petData.qrCode}
                alt="Pet QR Code"
                className="w-48 h-48 mx-auto border rounded-lg"
              />
              <div className="flex gap-2 mt-4">
                <Button size="sm" variant="outline" className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Print
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Owner Information & Vaccination History */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Owner Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">{petData.owner.name}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{petData.owner.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{petData.owner.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">📧</span>
                      <span>{petData.owner.email}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Emergency Contact</h4>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{petData.owner.emergencyContact}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Syringe className="h-5 w-5" />
                  Vaccination History
                </CardTitle>
                <Button 
                  size="sm"
                  onClick={() => onNavigate('vaccinate', petId)}
                >
                  <Syringe className="h-4 w-4 mr-2" />
                  Add Vaccination
                </Button>
              </div>
              <CardDescription>
                Complete vaccination records for {petData.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 text-blue-800">
                  <Calendar className="h-4 w-4" />
                  <p className="font-medium">Next Vaccination Due</p>
                </div>
                <p className="text-blue-700 mt-1">
                  {petData.nextVaccinationDue} - Rabies Vaccine Annual Booster
                </p>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Vaccine</TableHead>
                    <TableHead>Batch No.</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Veterinarian</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {petData.vaccinationHistory.map((vaccination) => (
                    <TableRow key={vaccination.id}>
                      <TableCell>{vaccination.date}</TableCell>
                      <TableCell className="font-medium">{vaccination.vaccine}</TableCell>
                      <TableCell className="font-mono text-sm">{vaccination.batchNo}</TableCell>
                      <TableCell>{vaccination.location}</TableCell>
                      <TableCell>{vaccination.veterinarian}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(vaccination.status)}>
                          {vaccination.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {petData.healthNotes.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Health Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {petData.healthNotes.map((note, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <p className="text-sm font-medium text-blue-600">{note.date}</p>
                      <p className="text-sm">{note.note}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}