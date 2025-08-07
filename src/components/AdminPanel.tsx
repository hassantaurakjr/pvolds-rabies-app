import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Switch } from "./ui/switch";
import { 
  Users, 
  Database, 
  Package, 
  Activity, 
  UserPlus, 
  Download, 
  Upload,
  Trash2,
  Edit,
  Shield,
  AlertTriangle
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

export function AdminPanel() {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: '',
    municipality: ''
  });

  const [newVaccine, setNewVaccine] = useState({
    name: '',
    type: '',
    manufacturer: '',
    quantity: '',
    batchNo: '',
    expiryDate: ''
  });

  // Mock data for admin interface
  const users = [
    {
      id: 1,
      name: 'Dr. Maria Cruz',
      email: 'maria.cruz@example.com',
      role: 'Veterinarian',
      municipality: 'Municipality 1',
      status: 'Active',
      lastLogin: '2025-08-05 14:30'
    },
    {
      id: 2,
      name: 'Jose Santos',
      email: 'jose.santos@example.com',
      role: 'Admin',
      municipality: 'All',
      status: 'Active',
      lastLogin: '2025-08-05 09:15'
    },
    {
      id: 3,
      name: 'Ana Rodriguez',
      email: 'ana.rodriguez@example.com',
      role: 'Vaccinator',
      municipality: 'Municipality 2',
      status: 'Inactive',
      lastLogin: '2025-08-03 16:45'
    }
  ];

  const vaccines = [
    {
      id: 1,
      name: 'Rabies Vaccine',
      type: 'Injectable',
      manufacturer: 'VetPharma Inc.',
      quantity: 150,
      batchNo: 'RV2025-001',
      expiryDate: '2026-12-31',
      status: 'In Stock'
    },
    {
      id: 2,
      name: 'Rabies Vaccine (3-Year)',
      type: 'Injectable',
      manufacturer: 'MedVet Solutions',
      quantity: 75,
      batchNo: 'RV3Y-2025-05',
      expiryDate: '2027-06-30',
      status: 'In Stock'
    },
    {
      id: 3,
      name: 'Rabies Vaccine',
      type: 'Injectable',
      manufacturer: 'VetPharma Inc.',
      quantity: 25,
      batchNo: 'RV2024-098',
      expiryDate: '2025-09-15',
      status: 'Low Stock'
    }
  ];

  const systemLogs = [
    {
      id: 1,
      timestamp: '2025-08-05 14:32:15',
      action: 'Pet Registration',
      user: 'Dr. Maria Cruz',
      details: 'Registered new pet: Buddy (PET123456)',
      severity: 'Info'
    },
    {
      id: 2,
      timestamp: '2025-08-05 14:30:22',
      action: 'Vaccination Record',
      user: 'Dr. Maria Cruz',
      details: 'Recorded vaccination for Luna (PET789012)',
      severity: 'Info'
    },
    {
      id: 3,
      timestamp: '2025-08-05 09:15:43',
      action: 'User Login',
      user: 'Jose Santos',
      details: 'Admin user logged in successfully',
      severity: 'Info'
    },
    {
      id: 4,
      timestamp: '2025-08-05 08:45:12',
      action: 'Data Backup',
      user: 'System',
      details: 'Automated daily backup completed',
      severity: 'Success'
    },
    {
      id: 5,
      timestamp: '2025-08-04 23:30:00',
      action: 'Vaccine Expiry Alert',
      user: 'System',
      details: 'Vaccine batch RV2024-098 expires in 45 days',
      severity: 'Warning'
    }
  ];

  const systemStats = {
    totalUsers: 12,
    activeUsers: 9,
    totalPets: 1583,
    totalVaccinations: 1247,
    dataSize: '45.7 MB',
    lastBackup: '2025-08-05 08:45:12'
  };

  const handleAddUser = () => {
    console.log('Adding user:', newUser);
    alert('User added successfully!');
    setNewUser({ name: '', email: '', role: '', municipality: '' });
  };

  const handleAddVaccine = () => {
    console.log('Adding vaccine:', newVaccine);
    alert('Vaccine added to inventory!');
    setNewVaccine({ name: '', type: '', manufacturer: '', quantity: '', batchNo: '', expiryDate: '' });
  };

  const handleBackup = () => {
    alert('Backup initiated. This may take a few minutes.');
  };

  const handleRestore = () => {
    alert('Please select a backup file to restore.');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Admin Panel</h1>
          <p className="text-muted-foreground">
            System administration and management
          </p>
        </div>
        <Badge variant="outline" className="bg-green-50 text-green-700">
          System Status: Online
        </Badge>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{systemStats.totalUsers}</p>
                <p className="text-xs text-muted-foreground">Total Users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{systemStats.activeUsers}</p>
                <p className="text-xs text-muted-foreground">Active Users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="text-lg">🐾</div>
              <div>
                <p className="text-2xl font-bold">{systemStats.totalPets.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Total Pets</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="text-lg">💉</div>
              <div>
                <p className="text-2xl font-bold">{systemStats.totalVaccinations.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Vaccinations</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{systemStats.dataSize}</p>
                <p className="text-xs text-muted-foreground">Data Size</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-orange-600" />
              <div>
                <p className="text-sm font-bold">Backed Up</p>
                <p className="text-xs text-muted-foreground">Aug 5, 08:45</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="inventory">Vaccine Inventory</TabsTrigger>
          <TabsTrigger value="backup">Backup & Restore</TabsTrigger>
          <TabsTrigger value="logs">System Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3>User Management</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>
                    Create a new user account for the system
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="userName">Full Name</Label>
                    <Input
                      id="userName"
                      value={newUser.name}
                      onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="userEmail">Email Address</Label>
                    <Input
                      id="userEmail"
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <Label>Role</Label>
                    <Select onValueChange={(value) => setNewUser(prev => ({ ...prev, role: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="veterinarian">Veterinarian</SelectItem>
                        <SelectItem value="vaccinator">Vaccinator</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Municipality</Label>
                    <Select onValueChange={(value) => setNewUser(prev => ({ ...prev, municipality: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select municipality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Municipalities</SelectItem>
                        <SelectItem value="municipality1">Municipality 1</SelectItem>
                        <SelectItem value="municipality2">Municipality 2</SelectItem>
                        <SelectItem value="municipality3">Municipality 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleAddUser} className="w-full">
                    Create User
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Municipality</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.role}</Badge>
                      </TableCell>
                      <TableCell>{user.municipality}</TableCell>
                      <TableCell>
                        <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{user.lastLogin}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3>Vaccine Inventory Management</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Package className="h-4 w-4 mr-2" />
                  Add Vaccine
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Vaccine to Inventory</DialogTitle>
                  <DialogDescription>
                    Add new vaccine stock to the inventory
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="vaccineName">Vaccine Name</Label>
                      <Input
                        id="vaccineName"
                        value={newVaccine.name}
                        onChange={(e) => setNewVaccine(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g., Rabies Vaccine"
                      />
                    </div>
                    <div>
                      <Label>Type</Label>
                      <Select onValueChange={(value) => setNewVaccine(prev => ({ ...prev, type: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="injectable">Injectable</SelectItem>
                          <SelectItem value="oral">Oral</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="manufacturer">Manufacturer</Label>
                    <Input
                      id="manufacturer"
                      value={newVaccine.manufacturer}
                      onChange={(e) => setNewVaccine(prev => ({ ...prev, manufacturer: e.target.value }))}
                      placeholder="Enter manufacturer name"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        id="quantity"
                        type="number"
                        value={newVaccine.quantity}
                        onChange={(e) => setNewVaccine(prev => ({ ...prev, quantity: e.target.value }))}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="batchNo">Batch No.</Label>
                      <Input
                        id="batchNo"
                        value={newVaccine.batchNo}
                        onChange={(e) => setNewVaccine(prev => ({ ...prev, batchNo: e.target.value }))}
                        placeholder="e.g., RV2025-001"
                      />
                    </div>
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        type="date"
                        value={newVaccine.expiryDate}
                        onChange={(e) => setNewVaccine(prev => ({ ...prev, expiryDate: e.target.value }))}
                      />
                    </div>
                  </div>
                  <Button onClick={handleAddVaccine} className="w-full">
                    Add to Inventory
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vaccine</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Manufacturer</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Batch No.</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vaccines.map((vaccine) => (
                    <TableRow key={vaccine.id}>
                      <TableCell className="font-medium">{vaccine.name}</TableCell>
                      <TableCell>{vaccine.type}</TableCell>
                      <TableCell>{vaccine.manufacturer}</TableCell>
                      <TableCell>{vaccine.quantity}</TableCell>
                      <TableCell className="font-mono text-sm">{vaccine.batchNo}</TableCell>
                      <TableCell>{vaccine.expiryDate}</TableCell>
                      <TableCell>
                        <Badge variant={vaccine.status === 'In Stock' ? 'default' : 'secondary'}>
                          {vaccine.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-6">
          <h3>Backup & Restore Data</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Backup Data
                </CardTitle>
                <CardDescription>
                  Create a backup of all system data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Include user data</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Include pet registrations</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Include vaccination records</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Include system logs</Label>
                  <Switch />
                </div>
                <Button onClick={handleBackup} className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Create Backup
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Restore Data
                </CardTitle>
                <CardDescription>
                  Restore data from a previous backup
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    Select backup file to restore
                  </p>
                  <Button variant="outline" className="mt-2">
                    Choose File
                  </Button>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-yellow-800">
                    <AlertTriangle className="h-4 w-4" />
                    <p className="text-sm font-medium">Warning</p>
                  </div>
                  <p className="text-sm text-yellow-700 mt-1">
                    Restoring will overwrite current data. This action cannot be undone.
                  </p>
                </div>
                <Button onClick={handleRestore} variant="destructive" className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Restore Data
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Backup History</CardTitle>
              <CardDescription>Recent system backups</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Daily Backup - August 5, 2025</p>
                    <p className="text-sm text-muted-foreground">Size: 45.7 MB • Full backup</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Download</Button>
                    <Button size="sm" variant="outline">Restore</Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Daily Backup - August 4, 2025</p>
                    <p className="text-sm text-muted-foreground">Size: 44.2 MB • Full backup</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Download</Button>
                    <Button size="sm" variant="outline">Restore</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3>System Logs</h3>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Logs
              </Button>
            </div>
          </div>

          <Card>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Severity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {systemLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>{log.details}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            log.severity === 'Warning' ? 'secondary' :
                            log.severity === 'Success' ? 'default' :
                            'outline'
                          }
                        >
                          {log.severity}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}