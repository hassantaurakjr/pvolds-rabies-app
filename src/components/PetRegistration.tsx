import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { QrCode, Download, Camera, Search } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function PetRegistration() {
  const [formData, setFormData] = useState({
    // Owner Information
    ownerName: '',
    address: '',
    contactNumber: '',
    // Pet Information
    petName: '',
    petType: '',
    breed: '',
    gender: '',
    age: '',
    colorMarkings: '',
    photo: null as File | null
  });

  const [registeredPet, setRegisteredPet] = useState(null as any);
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (field: string, value: string | File) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate mock pet registration
    const petId = 'PET' + Date.now().toString().slice(-6);
    const qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
      JSON.stringify({
        petId,
        name: formData.petName,
        owner: formData.ownerName,
        type: formData.petType,
        breed: formData.breed
      })
    )}`;

    const newPet = {
      id: petId,
      ...formData,
      registrationDate: new Date().toLocaleDateString(),
      qrCode
    };

    setRegisteredPet(newPet);
  };

  const mockSearchResults = [
    {
      id: 'PET123456',
      name: 'Buddy',
      owner: 'Maria Santos',
      type: 'Dog',
      breed: 'Golden Retriever',
      lastVaccination: '2024-08-05'
    },
    {
      id: 'PET789012',
      name: 'Luna',
      owner: 'Jose Cruz',
      type: 'Cat',
      breed: 'Persian',
      lastVaccination: '2024-07-15'
    }
  ];

  const filteredResults = mockSearchResults.filter(pet =>
    pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pet.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pet.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (registeredPet) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1>Pet Registration Complete</h1>
            <p className="text-muted-foreground">
              Pet profile and QR code generated successfully
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setRegisteredPet(null)}
          >
            Register Another Pet
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pet Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🐾 Pet Profile
                <Badge className="ml-auto">{registeredPet.id}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Pet Name</Label>
                  <p>{registeredPet.petName}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Type</Label>
                  <p>{registeredPet.petType}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Breed</Label>
                  <p>{registeredPet.breed}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Gender</Label>
                  <p>{registeredPet.gender}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Age</Label>
                  <p>{registeredPet.age}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Registration Date</Label>
                  <p>{registeredPet.registrationDate}</p>
                </div>
              </div>
              
              <div>
                <Label className="text-xs text-muted-foreground">Owner</Label>
                <p>{registeredPet.ownerName}</p>
                <p className="text-sm text-muted-foreground">{registeredPet.contactNumber}</p>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Color/Markings</Label>
                <p>{registeredPet.colorMarkings}</p>
              </div>
            </CardContent>
          </Card>

          {/* QR Code Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                QR Code
              </CardTitle>
              <CardDescription>
                Scan this code for quick access to pet information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center">
                <ImageWithFallback
                  src={registeredPet.qrCode}
                  alt="Pet QR Code"
                  className="w-48 h-48 border rounded-lg"
                />
              </div>
              
              <div className="flex gap-2">
                <Button className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Download QR Code
                </Button>
                <Button variant="outline" className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Print Registration Card
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1>Pet Registration</h1>
        <p className="text-muted-foreground">
          Register new pets or find existing pet records
        </p>
      </div>

      <Tabs defaultValue="new" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="new">Register New Pet</TabsTrigger>
          <TabsTrigger value="existing">Find Existing Pet</TabsTrigger>
        </TabsList>

        <TabsContent value="new" className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Owner Information */}
            <Card>
              <CardHeader>
                <CardTitle>Owner Information</CardTitle>
                <CardDescription>
                  Details about the pet owner
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="ownerName">Full Name *</Label>
                  <Input
                    id="ownerName"
                    value={formData.ownerName}
                    onChange={(e) => handleInputChange('ownerName', e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="address">Address *</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="contactNumber">Contact Number *</Label>
                  <Input
                    id="contactNumber"
                    type="tel"
                    value={formData.contactNumber}
                    onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Pet Information */}
            <Card>
              <CardHeader>
                <CardTitle>Pet Information</CardTitle>
                <CardDescription>
                  Details about the pet
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="petName">Pet Name *</Label>
                    <Input
                      id="petName"
                      value={formData.petName}
                      onChange={(e) => handleInputChange('petName', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="petType">Type *</Label>
                    <Select onValueChange={(value) => handleInputChange('petType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select pet type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Dog">Dog</SelectItem>
                        <SelectItem value="Cat">Cat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="breed">Breed *</Label>
                    <Input
                      id="breed"
                      value={formData.breed}
                      onChange={(e) => handleInputChange('breed', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label>Gender *</Label>
                    <RadioGroup
                      value={formData.gender}
                      onValueChange={(value) => handleInputChange('gender', value)}
                      className="flex space-x-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Male" id="male" />
                        <Label htmlFor="male">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Female" id="female" />
                        <Label htmlFor="female">Female</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div>
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    placeholder="e.g., 2 years, 6 months"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="colorMarkings">Color/Markings *</Label>
                  <Textarea
                    id="colorMarkings"
                    value={formData.colorMarkings}
                    onChange={(e) => handleInputChange('colorMarkings', e.target.value)}
                    placeholder="Describe the pet's color and distinctive markings"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="photo">Pet Photo</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Camera className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      Click to upload pet photo or drag and drop
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="photo"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleInputChange('photo', file);
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-2"
                      onClick={() => document.getElementById('photo')?.click()}
                    >
                      Select Photo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button type="submit" className="w-full">
              Register Pet & Generate QR Code
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="existing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Find Existing Pet</CardTitle>
              <CardDescription>
                Search by pet name, owner name, or pet ID
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
                  <Search className="h-4 w-4" />
                </Button>
              </div>

              {searchQuery && (
                <div className="space-y-3">
                  {filteredResults.map((pet) => (
                    <div key={pet.id} className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{pet.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Owner: {pet.owner} • {pet.type} • {pet.breed}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            ID: {pet.id} • Last vaccination: {pet.lastVaccination}
                          </p>
                        </div>
                        <Button size="sm">
                          Select Pet
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}