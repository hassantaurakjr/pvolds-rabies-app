import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { QrCode, Search, Syringe, Download, Check } from "lucide-react";

export function Vaccination() {
  const [selectedPet, setSelectedPet] = useState(null as any);
  const [searchQuery, setSearchQuery] = useState('');
  const [vaccinationData, setVaccinationData] = useState({
    date: new Date().toISOString().split('T')[0],
    vaccineType: '',
    batchNo: '',
    expiryDate: '',
    location: '',
    veterinarian: ''
  });
  const [vaccinationComplete, setVaccinationComplete] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);

  const mockPets = [
    {
      id: 'PET123456',
      name: 'Buddy',
      owner: 'Maria Santos',
      type: 'Dog',
      breed: 'Golden Retriever',
      age: '3 years',
      lastVaccination: '2024-02-15',
      vaccinationHistory: [
        { date: '2024-02-15', vaccine: 'Rabies Vaccine', batch: 'RV2024-001', location: 'Barangay 1' },
        { date: '2023-02-10', vaccine: 'Rabies Vaccine', batch: 'RV2023-012', location: 'Municipal Hall' }
      ]
    },
    {
      id: 'PET789012',
      name: 'Luna',
      owner: 'Jose Cruz',
      type: 'Cat',
      breed: 'Persian',
      age: '2 years',
      lastVaccination: '2024-01-20',
      vaccinationHistory: [
        { date: '2024-01-20', vaccine: 'Rabies Vaccine', batch: 'RV2024-005', location: 'Barangay 2' }
      ]
    }
  ];

  const filteredPets = mockPets.filter(pet =>
    pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pet.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pet.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Recent and recommended vaccination locations
  const recentLocations = [
    'Municipal Veterinary Office',
    'Barangay Health Center 1',
    'Barangay Health Center 2',
    'Mobile Clinic - Barangay 1',
    'Mobile Clinic - Barangay 2',
    'Municipal Animal Shelter',
    'Veterinary Clinic - Downtown',
    'Community Health Center'
  ];

  const filteredLocationSuggestions = recentLocations.filter(location =>
    location.toLowerCase().includes(vaccinationData.location.toLowerCase())
  );

  const handleInputChange = (field: string, value: string) => {
    setVaccinationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleVaccination = () => {
    // Add vaccination record
    if (selectedPet) {
      const newVaccination = {
        date: vaccinationData.date,
        vaccine: vaccinationData.vaccineType,
        batch: vaccinationData.batchNo,
        location: vaccinationData.location,
        veterinarian: vaccinationData.veterinarian
      };
      
      selectedPet.vaccinationHistory.unshift(newVaccination);
      selectedPet.lastVaccination = vaccinationData.date;
      setVaccinationComplete(true);
    }
  };

  if (vaccinationComplete) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="flex items-center gap-2">
              <Check className="h-6 w-6 text-green-600" />
              Vaccination Complete
            </h1>
            <p className="text-muted-foreground">
              Vaccination record has been successfully added
            </p>
          </div>
          <Button 
            variant="outline"
            onClick={() => {
              setVaccinationComplete(false);
              setSelectedPet(null);
              setVaccinationData({
                date: new Date().toISOString().split('T')[0],
                vaccineType: '',
                batchNo: '',
                expiryDate: '',
                location: '',
                veterinarian: ''
              });
              setShowLocationSuggestions(false);
            }}
          >
            Record Another Vaccination
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Vaccination Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Pet</Label>
                  <p>{selectedPet?.name}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Owner</Label>
                  <p>{selectedPet?.owner}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Date</Label>
                  <p>{vaccinationData.date}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Vaccine</Label>
                  <p>{vaccinationData.vaccineType}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Batch No.</Label>
                  <p>{vaccinationData.batchNo}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Location</Label>
                  <p>{vaccinationData.location}</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex gap-2">
                <Button className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Print Certificate
                </Button>
                <Button variant="outline" className="flex-1">
                  <QrCode className="h-4 w-4 mr-2" />
                  Update QR Code
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Updated Vaccination History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedPet?.vaccinationHistory.map((vaccination: any, index: number) => (
                  <div key={index} className={`p-3 border rounded-lg ${index === 0 ? 'bg-green-50 border-green-200' : ''}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{vaccination.vaccine}</p>
                        <p className="text-sm text-muted-foreground">
                          {vaccination.location} • Batch: {vaccination.batch}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant={index === 0 ? "default" : "secondary"}>
                          {vaccination.date}
                        </Badge>
                        {index === 0 && (
                          <p className="text-xs text-green-600 mt-1">New</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!selectedPet) {
    return (
      <div className="space-y-6">
        <div>
          <h1>Rabies Vaccination</h1>
          <p className="text-muted-foreground">
            Search and select a pet to record vaccination
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Find Pet
            </CardTitle>
            <CardDescription>
              Search by pet name, owner name, or pet ID, or scan QR code
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  placeholder="Search by name, owner, or pet ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <QrCode className="h-4 w-4 mr-2" />
                Scan QR
              </Button>
            </div>

            {searchQuery && (
              <div className="space-y-3">
                {filteredPets.map((pet) => (
                  <div 
                    key={pet.id} 
                    className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedPet(pet)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{pet.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Owner: {pet.owner} • {pet.type} • {pet.breed} • {pet.age}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          ID: {pet.id} • Last vaccination: {pet.lastVaccination}
                        </p>
                      </div>
                      <Button size="sm">
                        <Syringe className="h-4 w-4 mr-2" />
                        Vaccinate
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Record Vaccination</h1>
          <p className="text-muted-foreground">
            Recording vaccination for {selectedPet.name}
          </p>
        </div>
        <Button 
          variant="outline"
          onClick={() => setSelectedPet(null)}
        >
          Change Pet
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pet Information */}
        <Card>
          <CardHeader>
            <CardTitle>Pet Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs text-muted-foreground">Name</Label>
                <p>{selectedPet.name}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">ID</Label>
                <p>{selectedPet.id}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Type</Label>
                <p>{selectedPet.type}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Breed</Label>
                <p>{selectedPet.breed}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Age</Label>
                <p>{selectedPet.age}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Owner</Label>
                <p>{selectedPet.owner}</p>
              </div>
            </div>

            <Separator />

            <div>
              <Label className="text-xs text-muted-foreground">Vaccination History</Label>
              <div className="space-y-2 mt-2">
                {selectedPet.vaccinationHistory.map((vaccination: any, index: number) => (
                  <div key={index} className="text-sm p-2 bg-gray-50 rounded">
                    <p className="font-medium">{vaccination.vaccine}</p>
                    <p className="text-muted-foreground">
                      {vaccination.date} • {vaccination.location}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vaccination Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Syringe className="h-5 w-5" />
              Vaccination Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="date">Date of Vaccination *</Label>
              <Input
                id="date"
                type="date"
                value={vaccinationData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="vaccineType">Vaccine Type *</Label>
              <Select onValueChange={(value) => handleInputChange('vaccineType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select vaccine type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Rabies Vaccine">Rabies Vaccine</SelectItem>
                  <SelectItem value="Rabies Vaccine (Annual)">Rabies Vaccine (Annual)</SelectItem>
                  <SelectItem value="Rabies Vaccine (3-Year)">Rabies Vaccine (3-Year)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="batchNo">Batch No. *</Label>
                <Input
                  id="batchNo"
                  value={vaccinationData.batchNo}
                  onChange={(e) => handleInputChange('batchNo', e.target.value)}
                  placeholder="e.g., RV2025-001"
                  required
                />
              </div>
              <div>
                <Label htmlFor="expiryDate">Expiry Date *</Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={vaccinationData.expiryDate}
                  onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="relative">
              <Label htmlFor="location">Location of Vaccination *</Label>
              <Input
                id="location"
                value={vaccinationData.location}
                onChange={(e) => {
                  handleInputChange('location', e.target.value);
                  setShowLocationSuggestions(e.target.value.length > 0);
                }}
                onFocus={() => setShowLocationSuggestions(true)}
                onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
                placeholder="Enter vaccination location..."
                required
              />
              
              {showLocationSuggestions && (vaccinationData.location.length > 0 || true) && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
                  <div className="p-2">
                    <p className="text-xs text-muted-foreground mb-2 font-medium">Recent & Recommended Locations:</p>
                    <div className="space-y-1">
                      {(vaccinationData.location.length > 0 ? filteredLocationSuggestions : recentLocations).map((location, index) => (
                        <button
                          key={index}
                          type="button"
                          className="w-full text-left px-2 py-1 text-sm hover:bg-gray-100 rounded"
                          onClick={() => {
                            handleInputChange('location', location);
                            setShowLocationSuggestions(false);
                          }}
                        >
                          {location}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="veterinarian">Attending Veterinarian *</Label>
              <Select onValueChange={(value) => handleInputChange('veterinarian', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select veterinarian" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dr. Maria Cruz">Dr. Maria Cruz</SelectItem>
                  <SelectItem value="Dr. Jose Santos">Dr. Jose Santos</SelectItem>
                  <SelectItem value="Dr. Ana Rodriguez">Dr. Ana Rodriguez</SelectItem>
                  <SelectItem value="Dr. Carlos Mendoza">Dr. Carlos Mendoza</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleVaccination}
              className="w-full"
              disabled={!vaccinationData.vaccineType || !vaccinationData.batchNo || !vaccinationData.location || !vaccinationData.veterinarian}
            >
              <Syringe className="h-4 w-4 mr-2" />
              Record Vaccination
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}