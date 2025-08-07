import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { AlertTriangle, Camera, MapPin, User, Calendar, FileText } from "lucide-react";

export function ReportRabiesCase() {
  const [reportData, setReportData] = useState({
    reportDate: new Date().toISOString().split('T')[0],
    reporterName: '',
    animalTag: '',
    animalSpecies: '',
    locationIncident: '',
    symptoms: [] as string[],
    biteVictim: {
      hasVictim: false,
      victimName: '',
      victimAge: '',
      victimContact: '',
      biteLocation: '',
      medicalAttention: false
    },
    actionTaken: '',
    additionalNotes: '',
    photos: [] as File[]
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const symptoms = [
    'Excessive drooling',
    'Difficulty swallowing',
    'Aggressive behavior',
    'Fear of water (hydrophobia)',
    'Paralysis',
    'Disorientation',
    'Seizures',
    'Unusual vocalization',
    'Loss of appetite',
    'Weakness/lethargy'
  ];

  const actions = [
    'Animal observed and monitored',
    'Animal quarantined',
    'Animal euthanized',
    'Animal tested for rabies',
    'Victim referred for medical treatment',
    'Area cordoned off',
    'Other animals in area vaccinated',
    'Authorities notified'
  ];

  const handleInputChange = (field: string, value: any) => {
    setReportData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBiteVictimChange = (field: string, value: any) => {
    setReportData(prev => ({
      ...prev,
      biteVictim: {
        ...prev.biteVictim,
        [field]: value
      }
    }));
  };

  const handleSymptomChange = (symptom: string, checked: boolean) => {
    setReportData(prev => ({
      ...prev,
      symptoms: checked 
        ? [...prev.symptoms, symptom]
        : prev.symptoms.filter(s => s !== symptom)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate report ID
    const reportId = 'RBR' + Date.now().toString().slice(-6);
    
    console.log('Submitting rabies case report:', { reportId, ...reportData });
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-green-600">
              <AlertTriangle className="h-6 w-6" />
              Report Submitted Successfully
            </h1>
            <p className="text-muted-foreground">
              Rabies case report has been submitted and assigned ID: RBR{Date.now().toString().slice(-6)}
            </p>
          </div>
          <Button 
            onClick={() => setIsSubmitted(false)}
            variant="outline"
          >
            Submit Another Report
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Report Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs text-muted-foreground">Report Date</Label>
                <p>{reportData.reportDate}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Reporter</Label>
                <p>{reportData.reporterName}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Animal Species</Label>
                <p>{reportData.animalSpecies}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Location</Label>
                <p>{reportData.locationIncident}</p>
              </div>
            </div>

            {reportData.symptoms.length > 0 && (
              <div>
                <Label className="text-xs text-muted-foreground">Symptoms Observed</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {reportData.symptoms.map(symptom => (
                    <Badge key={symptom} variant="secondary">{symptom}</Badge>
                  ))}
                </div>
              </div>
            )}

            {reportData.biteVictim.hasVictim && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <Label className="text-xs text-red-600 font-medium">Bite Victim Information</Label>
                <p className="text-sm">Name: {reportData.biteVictim.victimName}</p>
                <p className="text-sm">Age: {reportData.biteVictim.victimAge}</p>
                <p className="text-sm">Contact: {reportData.biteVictim.victimContact}</p>
                <p className="text-sm">Medical Attention: {reportData.biteVictim.medicalAttention ? 'Yes' : 'No'}</p>
              </div>
            )}

            <div className="flex gap-2 mt-6">
              <Button>Print Report</Button>
              <Button variant="outline">Email Report</Button>
              <Button variant="outline">Export PDF</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-red-600" />
          Report Rabies Case
        </h1>
        <p className="text-muted-foreground">
          Report suspected or confirmed rabies cases for tracking and response
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Report Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="reportDate">Date of Report</Label>
                <Input
                  id="reportDate"
                  type="date"
                  value={reportData.reportDate}
                  onChange={(e) => handleInputChange('reportDate', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="reporterName">Reporter Name</Label>
                <Input
                  id="reporterName"
                  value={reportData.reporterName}
                  onChange={(e) => handleInputChange('reporterName', e.target.value)}
                  placeholder="Your full name"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="animalTag">Animal Tag / QR Code (Optional)</Label>
                <Input
                  id="animalTag"
                  value={reportData.animalTag}
                  onChange={(e) => handleInputChange('animalTag', e.target.value)}
                  placeholder="If known, enter pet ID or scan QR"
                />
              </div>
              <div>
                <Label htmlFor="animalSpecies">Animal Species / Type</Label>
                <Select onValueChange={(value) => handleInputChange('animalSpecies', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select animal type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dog">Dog</SelectItem>
                    <SelectItem value="cat">Cat</SelectItem>
                    <SelectItem value="stray-dog">Stray Dog</SelectItem>
                    <SelectItem value="stray-cat">Stray Cat</SelectItem>
                    <SelectItem value="bat">Bat</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="locationIncident">Location of Incident</Label>
              <Input
                id="locationIncident"
                value={reportData.locationIncident}
                onChange={(e) => handleInputChange('locationIncident', e.target.value)}
                placeholder="Specific address or area description"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Symptoms */}
        <Card>
          <CardHeader>
            <CardTitle>Symptoms Observed</CardTitle>
            <CardDescription>
              Check all symptoms that were observed in the animal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {symptoms.map((symptom) => (
                <div key={symptom} className="flex items-center space-x-2">
                  <Checkbox
                    id={symptom}
                    checked={reportData.symptoms.includes(symptom)}
                    onCheckedChange={(checked) => handleSymptomChange(symptom, !!checked)}
                  />
                  <Label htmlFor={symptom} className="text-sm">{symptom}</Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bite Victim Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Bite Victim Details (If Any)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasVictim"
                checked={reportData.biteVictim.hasVictim}
                onCheckedChange={(checked) => handleBiteVictimChange('hasVictim', !!checked)}
              />
              <Label htmlFor="hasVictim">There was a bite victim</Label>
            </div>

            {reportData.biteVictim.hasVictim && (
              <div className="space-y-4 p-4 border rounded-lg bg-red-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="victimName">Victim Name</Label>
                    <Input
                      id="victimName"
                      value={reportData.biteVictim.victimName}
                      onChange={(e) => handleBiteVictimChange('victimName', e.target.value)}
                      required={reportData.biteVictim.hasVictim}
                    />
                  </div>
                  <div>
                    <Label htmlFor="victimAge">Age</Label>
                    <Input
                      id="victimAge"
                      value={reportData.biteVictim.victimAge}
                      onChange={(e) => handleBiteVictimChange('victimAge', e.target.value)}
                      placeholder="Age in years"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="victimContact">Contact Number</Label>
                    <Input
                      id="victimContact"
                      value={reportData.biteVictim.victimContact}
                      onChange={(e) => handleBiteVictimChange('victimContact', e.target.value)}
                      placeholder="Phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="biteLocation">Location of Bite</Label>
                    <Input
                      id="biteLocation"
                      value={reportData.biteVictim.biteLocation}
                      onChange={(e) => handleBiteVictimChange('biteLocation', e.target.value)}
                      placeholder="e.g., Left arm, leg"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="medicalAttention"
                    checked={reportData.biteVictim.medicalAttention}
                    onCheckedChange={(checked) => handleBiteVictimChange('medicalAttention', !!checked)}
                  />
                  <Label htmlFor="medicalAttention">Victim received medical attention</Label>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Taken */}
        <Card>
          <CardHeader>
            <CardTitle>Action Taken</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Primary Action</Label>
              <Select onValueChange={(value) => handleInputChange('actionTaken', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select action taken" />
                </SelectTrigger>
                <SelectContent>
                  {actions.map((action) => (
                    <SelectItem key={action} value={action}>{action}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="additionalNotes">Additional Notes</Label>
              <Textarea
                id="additionalNotes"
                value={reportData.additionalNotes}
                onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                placeholder="Any additional information about the incident..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Photo Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Photo/Video Upload (Optional)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Camera className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                Upload photos or videos of the incident or animal
              </p>
              <Button variant="outline" className="mt-2">
                Choose Files
              </Button>
            </div>
          </CardContent>
        </Card>

        <Button type="submit" className="w-full" size="lg">
          <AlertTriangle className="h-4 w-4 mr-2" />
          Submit Rabies Case Report
        </Button>
      </form>
    </div>
  );
}