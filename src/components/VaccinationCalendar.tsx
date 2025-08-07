import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Calendar, Plus, MapPin, Clock, Users } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

export function VaccinationCalendar() {

  const [filterLocation, setFilterLocation] = useState('all');
  const [newEvent, setNewEvent] = useState({
    title: '',
    location: '',
    date: '',
    startTime: '',
    endTime: '',
    description: ''
  });

  // Mock vaccination events
  const events = [
    {
      id: 1,
      title: 'Community Vaccination Drive',
      location: 'Barangay San Jose',
      date: '2025-08-08',
      startTime: '08:00',
      endTime: '17:00',
      type: 'drive',
      expectedPets: 150,
      registeredPets: 89
    },
    {
      id: 2,
      title: 'School Vaccination Program',
      location: 'Barangay Santa Cruz Elementary',
      date: '2025-08-10',
      startTime: '09:00',
      endTime: '16:00',
      type: 'program',
      expectedPets: 75,
      registeredPets: 45
    },
    {
      id: 3,
      title: 'Mobile Clinic Visit',
      location: 'Barangay Del Pilar',
      date: '2025-08-12',
      startTime: '08:30',
      endTime: '17:30',
      type: 'mobile',
      expectedPets: 200,
      registeredPets: 167
    },
    {
      id: 4,
      title: 'Pet Wellness Check',
      location: 'Municipal Veterinary Office',
      date: '2025-08-05',
      startTime: '14:00',
      endTime: '16:00',
      type: 'checkup',
      expectedPets: 25,
      registeredPets: 23
    },
    {
      id: 5,
      title: 'Emergency Vaccination',
      location: 'Barangay 1',
      date: '2025-08-06',
      startTime: '10:00',
      endTime: '12:00',
      type: 'emergency',
      expectedPets: 15,
      registeredPets: 12
    }
  ];

  // Get events for the current week
  const currentDate = new Date();
  const weekStart = new Date(currentDate);
  weekStart.setDate(currentDate.getDate() - currentDate.getDay());
  
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(weekStart);
    day.setDate(weekStart.getDate() + i);
    return day;
  });

  const filteredEvents = events.filter(event => {
    if (filterLocation === 'all') return true;
    return event.location.toLowerCase().includes(filterLocation.toLowerCase());
  });

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return filteredEvents.filter(event => event.date === dateStr);
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'drive': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'program': return 'bg-green-100 text-green-800 border-green-200';
      case 'mobile': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'checkup': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'emergency': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const upcomingEvents = filteredEvents
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Vaccination Calendar</h1>
          <p className="text-muted-foreground">
            Schedule and manage vaccination drives and appointments
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Schedule Event
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule New Event</DialogTitle>
              <DialogDescription>
                Create a new vaccination drive or appointment
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="eventTitle">Event Title</Label>
                <Input
                  id="eventTitle"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Community Vaccination Drive"
                />
              </div>
              <div>
                <Label htmlFor="eventLocation">Location</Label>
                <Input
                  id="eventLocation"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="e.g., Barangay San Jose"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="eventDate">Date</Label>
                  <Input
                    id="eventDate"
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={newEvent.startTime}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, startTime: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={newEvent.endTime}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, endTime: e.target.value }))}
                  />
                </div>
              </div>
              <Button className="w-full">
                Create Event
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4">
        <Select value={filterLocation} onValueChange={setFilterLocation}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="barangay">Barangay Events</SelectItem>
            <SelectItem value="municipal">Municipal Events</SelectItem>
            <SelectItem value="school">School Programs</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Weekly View
              </CardTitle>
              <CardDescription>
                August 3 - August 9, 2025
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {weekDays.map((day, index) => {
                  const dayEvents = getEventsForDate(day);
                  const isToday = day.toDateString() === new Date().toDateString();
                  
                  return (
                    <div
                      key={index}
                      className={`min-h-32 p-2 border rounded-lg ${
                        isToday ? 'bg-blue-50 border-blue-200' : 'bg-white'
                      }`}
                    >
                      <div className="text-center mb-2">
                        <p className="text-xs text-muted-foreground">
                          {day.toLocaleDateString('en-US', { weekday: 'short' })}
                        </p>
                        <p className={`text-sm ${isToday ? 'font-bold text-blue-600' : ''}`}>
                          {day.getDate()}
                        </p>
                      </div>
                      
                      <div className="space-y-1">
                        {dayEvents.map((event) => (
                          <div
                            key={event.id}
                            className={`text-xs p-1 rounded border ${getEventTypeColor(event.type)}`}
                          >
                            <p className="font-medium truncate">{event.title}</p>
                            <p className="truncate">{event.startTime}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Events */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>
                Next scheduled vaccination events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="border rounded-lg p-3">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm">{event.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {event.type}
                      </Badge>
                    </div>
                    
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {event.startTime} - {event.endTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {event.registeredPets}/{event.expectedPets} pets
                      </div>
                    </div>

                    <div className="mt-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Registration Progress</span>
                        <span>{Math.round((event.registeredPets / event.expectedPets) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-blue-600 h-1.5 rounded-full"
                          style={{ width: `${(event.registeredPets / event.expectedPets) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Today's Events Detail */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Schedule</CardTitle>
          <CardDescription>
            Detailed view of today's vaccination events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events
              .filter(event => event.date === new Date().toISOString().split('T')[0])
              .map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${
                      event.type === 'drive' ? 'bg-blue-500' :
                      event.type === 'emergency' ? 'bg-red-500' :
                      'bg-green-500'
                    }`} />
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {event.location} • {event.startTime} - {event.endTime}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{event.registeredPets}/{event.expectedPets}</p>
                    <p className="text-xs text-muted-foreground">pets registered</p>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}