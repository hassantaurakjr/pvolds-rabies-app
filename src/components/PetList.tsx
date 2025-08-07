import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Search, Filter, Eye, QrCode, Calendar, MapPin, User } from "lucide-react";

interface PetListProps {
  onNavigate: (page: string, petId?: string) => void;
}

export function PetList({ onNavigate }: PetListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('all');
  const [vaccinationFilter, setVaccinationFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  // Mock pet data
  const pets = [
    {
      id: 'PET123456',
      name: 'Buddy',
      species: 'Dog',
      breed: 'Golden Retriever',
      age: '3 years',
      gender: 'Male',
      owner: 'Maria Santos',
      ownerContact: '+63 912 345 6789',
      address: 'Barangay 1, Municipality A',
      lastVaccination: '2025-02-15',
      vaccinationStatus: 'Up to date',
      registrationDate: '2024-01-15',
      color: 'Golden',
      qrCode: 'QR-123456',
      photo: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 'PET789012',
      name: 'Luna',
      species: 'Cat',
      breed: 'Persian',
      age: '2 years',
      gender: 'Female',
      owner: 'Jose Cruz',
      ownerContact: '+63 987 654 3210',
      address: 'Barangay 2, Municipality A',
      lastVaccination: '2024-01-20',
      vaccinationStatus: 'Overdue',
      registrationDate: '2023-12-10',
      color: 'White with gray patches',
      qrCode: 'QR-789012',
      photo: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 'PET345678',
      name: 'Max',
      species: 'Dog',
      breed: 'German Shepherd',
      age: '5 years',
      gender: 'Male',
      owner: 'Ana Rodriguez',
      ownerContact: '+63 923 456 7890',
      address: 'Barangay 3, Municipality B',
      lastVaccination: '2025-07-30',
      vaccinationStatus: 'Up to date',
      registrationDate: '2022-03-20',
      color: 'Black and Tan',
      qrCode: 'QR-345678',
      photo: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 'PET456789',
      name: 'Whiskers',
      species: 'Cat',
      breed: 'Tabby',
      age: '4 years',
      gender: 'Male',
      owner: 'Carlos Mendoza',
      ownerContact: '+63 934 567 8901',
      address: 'Barangay 1, Municipality A',
      lastVaccination: '2025-06-15',
      vaccinationStatus: 'Up to date', 
      registrationDate: '2023-08-05',
      color: 'Brown tabby with white chest',
      qrCode: 'QR-456789',
      photo: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 'PET567890',
      name: 'Bella',
      species: 'Dog',
      breed: 'Labrador',
      age: '1 year',
      gender: 'Female',
      owner: 'Elena Reyes',
      ownerContact: '+63 945 678 9012',
      address: 'Barangay 4, Municipality B',
      lastVaccination: '2024-12-10',
      vaccinationStatus: 'Due soon',
      registrationDate: '2024-11-20',
      color: 'Black',
      qrCode: 'QR-567890',
      photo: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const filteredPets = pets.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pet.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pet.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSpecies = speciesFilter === 'all' || pet.species.toLowerCase() === speciesFilter;
    
    const matchesVaccination = vaccinationFilter === 'all' ||
                              (vaccinationFilter === 'up-to-date' && pet.vaccinationStatus === 'Up to date') ||
                              (vaccinationFilter === 'overdue' && pet.vaccinationStatus === 'Overdue') ||
                              (vaccinationFilter === 'due-soon' && pet.vaccinationStatus === 'Due soon');

    return matchesSearch && matchesSpecies && matchesVaccination;
  });

  const getStatusColor = (status: string) => {
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
          <h1>Pet List</h1>
          <p className="text-muted-foreground">
            Browse and manage all registered pets in the system
          </p>
        </div>
        <Button onClick={() => onNavigate('register')}>
          Add New Pet
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search & Filter
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
                  placeholder="Search by name, owner, or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label>Species</Label>
              <Select value={speciesFilter} onValueChange={setSpeciesFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Species</SelectItem>
                  <SelectItem value="dog">Dogs</SelectItem>
                  <SelectItem value="cat">Cats</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Vaccination Status</Label>
              <Select value={vaccinationFilter} onValueChange={setVaccinationFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="up-to-date">Up to Date</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="due-soon">Due Soon</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Location</Label>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="municipality-a">Municipality A</SelectItem>
                  <SelectItem value="municipality-b">Municipality B</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredPets.length} of {pets.length} pets
            </p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setSpeciesFilter('all');
                setVaccinationFilter('all');
                setLocationFilter('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Pet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPets.map((pet) => (
          <Card key={pet.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                    <img 
                      src={pet.photo} 
                      alt={pet.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{pet.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">ID: {pet.id}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(pet.vaccinationStatus)}>
                  {pet.vaccinationStatus}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Species:</span>
                  <p className="font-medium">{pet.species}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Breed:</span>
                  <p className="font-medium">{pet.breed}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Age:</span>
                  <p className="font-medium">{pet.age}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Gender:</span>
                  <p className="font-medium">{pet.gender}</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{pet.owner}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{pet.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Last vaccination: {pet.lastVaccination}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  className="flex-1"
                  onClick={() => onNavigate('pet-profile', pet.id)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Profile
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onNavigate('scan', pet.id)}
                >
                  <QrCode className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPets.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-4" />
              <p>No pets found matching your criteria</p>
              <p className="text-sm mt-2">Try adjusting your search or filters</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}