import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Download, Filter, TrendingUp, Users, MapPin, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export function Reports() {
  const [dateRange, setDateRange] = useState({ from: '2025-01-01', to: '2025-12-31' });
  const [selectedMunicipality, setSelectedMunicipality] = useState('all');
  const [selectedVet, setSelectedVet] = useState('all');
  const [selectedSpecies, setSelectedSpecies] = useState('all');

  // Mock data for charts and reports
  const monthlyVaccinations = [
    { month: 'Jan', vaccinations: 89 },
    { month: 'Feb', vaccinations: 156 },
    { month: 'Mar', vaccinations: 198 },
    { month: 'Apr', vaccinations: 145 },
    { month: 'May', vaccinations: 223 },
    { month: 'Jun', vaccinations: 178 },
    { month: 'Jul', vaccinations: 234 },
    { month: 'Aug', vaccinations: 23 },
  ];

  const vaccinationsByBarangay = [
    { name: 'Barangay 1', value: 234, percentage: 18.8 },
    { name: 'Barangay 2', value: 198, percentage: 15.9 },
    { name: 'Barangay 3', value: 167, percentage: 13.4 },
    { name: 'Barangay San Jose', value: 145, percentage: 11.6 },
    { name: 'Barangay Santa Cruz', value: 123, percentage: 9.9 },
    { name: 'Others', value: 380, percentage: 30.4 },
  ];

  const speciesData = [
    { name: 'Dogs', value: 892, color: '#3B82F6' },
    { name: 'Cats', value: 355, color: '#EF4444' },
  ];

  const veterinarians = [
    { name: 'Dr. Maria Cruz', vaccinations: 456, municipalities: 3 },
    { name: 'Dr. Jose Santos', vaccinations: 398, municipalities: 2 },
    { name: 'Dr. Ana Rodriguez', vaccinations: 234, municipalities: 2 },
    { name: 'Dr. Carlos Mendoza', vaccinations: 159, municipalities: 1 },
  ];

  const petsNeedingVaccination = [
    {
      id: 'PET123789',
      name: 'Rocky',
      owner: 'Elena Reyes',
      lastVaccination: '2023-08-15',
      daysOverdue: 365,
      location: 'Barangay 1'
    },
    {
      id: 'PET456123',
      name: 'Whiskers',
      owner: 'Roberto Silva',
      lastVaccination: '2023-09-20',
      daysOverdue: 319,
      location: 'Barangay 2'
    },
    {
      id: 'PET789456',
      name: 'Bella',
      owner: 'Carmen Lopez',
      lastVaccination: '2023-11-10',
      daysOverdue: 268,
      location: 'Barangay San Jose'
    },
  ];

  const summaryStats = {
    totalVaccinations: 1247,
    thisMonth: 23,
    totalPets: 1583,
    coverageRate: 78.8,
    activeMunicipalities: 5,
    activeVeterinarians: 4
  };

  const exportReport = (format: 'pdf' | 'excel') => {
    // Mock export functionality
    console.log(`Exporting report as ${format.toUpperCase()}`);
    alert(`Report exported as ${format.toUpperCase()}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Vaccination statistics and data analysis
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => exportReport('pdf')}>
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline" onClick={() => exportReport('excel')}>
            <Download className="h-4 w-4 mr-2" />
            Export Excel
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Report Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <Label htmlFor="dateFrom">Date From</Label>
              <Input
                id="dateFrom"
                type="date"
                value={dateRange.from}
                onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="dateTo">Date To</Label>
              <Input
                id="dateTo"
                type="date"
                value={dateRange.to}
                onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
              />
            </div>
            <div>
              <Label>Municipality</Label>
              <Select value={selectedMunicipality} onValueChange={setSelectedMunicipality}>
                <SelectTrigger>
                  <SelectValue placeholder="All municipalities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Municipalities</SelectItem>
                  <SelectItem value="city1">Municipality 1</SelectItem>
                  <SelectItem value="city2">Municipality 2</SelectItem>
                  <SelectItem value="city3">Municipality 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Veterinarian</Label>
              <Select value={selectedVet} onValueChange={setSelectedVet}>
                <SelectTrigger>
                  <SelectValue placeholder="All veterinarians" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Veterinarians</SelectItem>
                  <SelectItem value="dr1">Dr. Maria Cruz</SelectItem>
                  <SelectItem value="dr2">Dr. Jose Santos</SelectItem>
                  <SelectItem value="dr3">Dr. Ana Rodriguez</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Pet Species</Label>
              <Select value={selectedSpecies} onValueChange={setSelectedSpecies}>
                <SelectTrigger>
                  <SelectValue placeholder="All species" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Species</SelectItem>
                  <SelectItem value="dogs">Dogs Only</SelectItem>
                  <SelectItem value="cats">Cats Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{summaryStats.totalVaccinations.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Total Vaccinations</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{summaryStats.thisMonth}</p>
                <p className="text-xs text-muted-foreground">This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{summaryStats.totalPets.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Registered Pets</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="text-lg">📊</div>
              <div>
                <p className="text-2xl font-bold">{summaryStats.coverageRate}%</p>
                <p className="text-xs text-muted-foreground">Coverage Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{summaryStats.activeMunicipalities}</p>
                <p className="text-xs text-muted-foreground">Municipalities</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="text-lg">👨‍⚕️</div>
              <div>
                <p className="text-2xl font-bold">{summaryStats.activeVeterinarians}</p>
                <p className="text-xs text-muted-foreground">Veterinarians</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Vaccination Trends</CardTitle>
            <CardDescription>Vaccinations performed per month in 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyVaccinations}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="vaccinations" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vaccinations by Species</CardTitle>
            <CardDescription>Distribution of vaccinated pets by species</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={speciesData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {speciesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Vaccinations by Barangay</CardTitle>
            <CardDescription>Top performing barangays</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Barangay</TableHead>
                  <TableHead>Count</TableHead>
                  <TableHead>Percentage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vaccinationsByBarangay.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.value}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.percentage}%</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Veterinarian Performance</CardTitle>
            <CardDescription>Vaccinations performed by each veterinarian</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Veterinarian</TableHead>
                  <TableHead>Vaccinations</TableHead>
                  <TableHead>Areas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {veterinarians.map((vet, index) => (
                  <TableRow key={index}>
                    <TableCell>{vet.name}</TableCell>
                    <TableCell>{vet.vaccinations}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{vet.municipalities}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Pets Due for Vaccination */}
      <Card>
        <CardHeader>
          <CardTitle>Pets Due for Next Vaccination</CardTitle>
          <CardDescription>Pets that need vaccination renewal</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pet ID</TableHead>
                <TableHead>Pet Name</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Last Vaccination</TableHead>
                <TableHead>Days Overdue</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {petsNeedingVaccination.map((pet) => (
                <TableRow key={pet.id}>
                  <TableCell className="font-mono text-sm">{pet.id}</TableCell>
                  <TableCell>{pet.name}</TableCell>
                  <TableCell>{pet.owner}</TableCell>
                  <TableCell>{pet.lastVaccination}</TableCell>
                  <TableCell>
                    <Badge variant={pet.daysOverdue > 365 ? "destructive" : "secondary"}>
                      {pet.daysOverdue} days
                    </Badge>
                  </TableCell>
                  <TableCell>{pet.location}</TableCell>
                  <TableCell>
                    <Badge variant={pet.daysOverdue > 365 ? "destructive" : "secondary"}>
                      {pet.daysOverdue > 365 ? "Overdue" : "Due Soon"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}