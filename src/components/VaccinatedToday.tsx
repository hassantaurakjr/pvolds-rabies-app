import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Calendar, Search, Filter, Download, Eye, Clock, MapPin, User, Syringe } from "lucide-react";

interface VaccinatedTodayProps {
  onNavigate: (page: string, petId?: string) => void;
}

export function VaccinatedToday({ onNavigate }: VaccinatedTodayProps) {
  const [filterMunicipality, setFilterMunicipality] = useState('all');
  const [filterVeterinarian, setFilterVeterinarian] = useState('all');
  const [filterLocation, setFilterLocation] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for today's vaccinations
  const todaysVaccinations = [
    {
      id: 1,
      time: '08:30 AM',
      petId: 'PET123456',
      petName: 'Buddy',
      petSpecies: 'Dog',
      petBreed: 'Golden Retriever',
      owner: 'Maria Santos',
      ownerContact: '+63 912 345 6789',
      vaccineType: 'Rabies Vaccine',
      batchNo: 'RV2025-001',
      location: 'Municipal Veterinary Office',
      municipality: 'Municipality A',
      veterinarian: 'Dr. Maria Cruz',
      status: 'Completed',
      notes: 'No adverse reactions observed'
    },
    {
      id: 2,
      time: '09:15 AM',
      petId: 'PET789012',
      petName: 'Luna',
      petSpecies: 'Cat',
      petBreed: 'Persian',
      owner: 'Jose Cruz',
      ownerContact: '+63 987 654 3210',
      vaccineType: 'Rabies Vaccine',
      batchNo: 'RV2025-001',
      location: 'Barangay Health Center 1',
      municipality: 'Municipality A',
      veterinarian: 'Dr. Jose Santos',
      status: 'Completed',
      notes: 'Pet was calm during procedure'
    },
    {
      id: 3,
      time: '10:00 AM',
      petId: 'PET345678',
      petName: 'Max',
      petSpecies: 'Dog',
      petBreed: 'German Shepherd',
      owner: 'Ana Rodriguez',
      ownerContact: '+63 923 456 7890',
      vaccineType: 'Rabies Vaccine (3-Year)',
      batchNo: 'RV3Y-2025-05',
      location: 'Mobile Clinic - Barangay 3',
      municipality: 'Municipality B',
      veterinarian: 'Dr. Ana Rodriguez',
      status: 'Completed',
      notes: 'Large dog, vaccination successful'
    },
    {
      id: 4,
      time: '11:30 AM',
      petId: 'PET456789',
      petName: 'Whiskers',
      petSpecies: 'Cat',
      petBreed: 'Tabby',
      owner: 'Carlos Mendoza',
      ownerContact: '+63 934 567 8901',
      vaccineType: 'Rabies Vaccine',
      batchNo: 'RV2025-001',
      location: 'Barangay Health Center 2',
      municipality: 'Municipality A',
      veterinarian: 'Dr. Maria Cruz',
      status: 'Completed',
      notes: 'First vaccination for this pet'
    },
    {
      id: 5,
      time: '02:00 PM',
      petId: 'PET567890',
      petName: 'Bella',
      petSpecies: 'Dog',
      petBreed: 'Labrador',
      owner: 'Elena Reyes',
      ownerContact: '+63 945 678 9012',
      vaccineType: 'Rabies Vaccine',
      batchNo: 'RV2025-002',
      location: 'Municipal Veterinary Office',
      municipality: 'Municipality B',
      veterinarian: 'Dr. Carlos Mendoza',
      status: 'In Progress',
      notes: 'Currently being processed'
    },
    {
      id: 6,
      time: '02:45 PM',
      petId: 'PET678901',
      petName: 'Rocky',
      petSpecies: 'Dog',
      petBreed: 'Mixed Breed',
      owner: 'Roberto Silva',
      ownerContact: '+63 956 789 0123',
      vaccineType: 'Rabies Vaccine',
      batchNo: 'RV2025-002',
      location: 'Mobile Clinic - Barangay 4',
      municipality: 'Municipality B',
      veterinarian: 'Dr. Ana Rodriguez',
      status: 'Scheduled',
      notes: 'Appointment scheduled for 2:45 PM'
    }
  ];

  const filteredVaccinations = todaysVaccinations.filter(vaccination => {
    const matchesSearch = vaccination.petName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vaccination.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vaccination.petId.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesMunicipality = filterMunicipality === 'all' || vaccination.municipality.toLowerCase().includes(filterMunicipality);
    const matchesVeterinarian = filterVeterinarian === 'all' || vaccination.veterinarian === filterVeterinarian;
    const matchesLocation = filterLocation === 'all' || vaccination.location.toLowerCase().includes(filterLocation);

    return matchesSearch && matchesMunicipality && matchesVeterinarian && matchesLocation;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Scheduled': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const completedCount = todaysVaccinations.filter(v => v.status === 'Completed').length;
  const inProgressCount = todaysVaccinations.filter(v => v.status === 'In Progress').length;
  const scheduledCount = todaysVaccinations.filter(v => v.status === 'Scheduled').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2">
            <Calendar className="h-6 w-6" />
            Pets Vaccinated Today
          </h1>
          <p className="text-muted-foreground">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Today's Report
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div>
                <p className="text-2xl font-bold">{completedCount}</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <div>
                <p className="text-2xl font-bold">{inProgressCount}</p>
                <p className="text-xs text-muted-foreground">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div>
                <p className="text-2xl font-bold">{scheduledCount}</p>
                <p className="text-xs text-muted-foreground">Scheduled</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Syringe className="h-4 w-4 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{todaysVaccinations.length}</p>
                <p className="text-xs text-muted-foreground">Total Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by pet, owner, or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label>Municipality</Label>
              <Select value={filterMunicipality} onValueChange={setFilterMunicipality}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Municipalities</SelectItem>
                  <SelectItem value="municipality-a">Municipality A</SelectItem>
                  <SelectItem value="municipality-b">Municipality B</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Veterinarian</Label>
              <Select value={filterVeterinarian} onValueChange={setFilterVeterinarian}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Veterinarians</SelectItem>
                  <SelectItem value="Dr. Maria Cruz">Dr. Maria Cruz</SelectItem>
                  <SelectItem value="Dr. Jose Santos">Dr. Jose Santos</SelectItem>
                  <SelectItem value="Dr. Ana Rodriguez">Dr. Ana Rodriguez</SelectItem>
                  <SelectItem value="Dr. Carlos Mendoza">Dr. Carlos Mendoza</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Location Type</Label>
              <Select value={filterLocation} onValueChange={setFilterLocation}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="municipal">Municipal Office</SelectItem>
                  <SelectItem value="barangay">Barangay Centers</SelectItem>
                  <SelectItem value="mobile">Mobile Clinics</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredVaccinations.length} of {todaysVaccinations.length} vaccinations
            </p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setFilterMunicipality('all');
                setFilterVeterinarian('all');
                setFilterLocation('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Vaccinations Table */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Vaccination Records</CardTitle>
          <CardDescription>
            Detailed list of all vaccinations performed today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Pet</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Vaccine</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Veterinarian</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVaccinations.map((vaccination) => (
                <TableRow key={vaccination.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{vaccination.time}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{vaccination.petName}</p>
                      <p className="text-sm text-muted-foreground">
                        {vaccination.petSpecies} • {vaccination.petBreed}
                      </p>
                      <p className="text-xs text-muted-foreground font-mono">
                        {vaccination.petId}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{vaccination.owner}</p>
                      <p className="text-xs text-muted-foreground">
                        {vaccination.ownerContact}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{vaccination.vaccineType}</p>
                      <p className="text-xs text-muted-foreground font-mono">
                        Batch: {vaccination.batchNo}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{vaccination.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{vaccination.veterinarian}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(vaccination.status)}>
                      {vaccination.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onNavigate('pet-profile', vaccination.petId)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredVaccinations.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No vaccinations found for the selected filters</p>
              <p className="text-sm text-muted-foreground mt-2">Try adjusting your search criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}