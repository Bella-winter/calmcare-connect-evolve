
import { useState, useMemo } from "react";
import { AppointmentSlider } from "./AppointmentSlider";
import { SpecialtyFilter } from "./SpecialtyFilter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MessageCircle, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample data - in a real app, this would come from an API
const sampleAppointments = [
  {
    id: "1",
    doctorName: "Sarah Johnson",
    specialty: "Cardiology",
    date: "2024-01-15",
    time: "10:00 AM",
    status: "upcoming" as const,
    type: "Follow-up Consultation",
    location: "Cardiology Wing, Room 205"
  },
  {
    id: "2",
    doctorName: "Michael Chen",
    specialty: "Endocrinology",
    date: "2024-01-18",
    time: "2:30 PM",
    status: "upcoming" as const,
    type: "Diabetes Management",
    location: "Endocrine Center, Room 301"
  },
  {
    id: "3",
    doctorName: "Emily Rodriguez",
    specialty: "Pulmonology",
    date: "2024-01-20",
    time: "11:15 AM",
    status: "upcoming" as const,
    type: "Respiratory Assessment",
    location: "Lung Center, Room 102"
  },
  {
    id: "4",
    doctorName: "David Wilson",
    specialty: "Nephrology",
    date: "2024-01-22",
    time: "9:45 AM",
    status: "upcoming" as const,
    type: "Kidney Function Check",
    location: "Nephrology Clinic, Room 150"
  },
  {
    id: "5",
    doctorName: "Sarah Johnson",
    specialty: "Cardiology",
    date: "2024-01-08",
    time: "10:00 AM",
    status: "completed" as const,
    type: "Cardiac Evaluation",
    location: "Cardiology Wing, Room 205"
  },
  {
    id: "6",
    doctorName: "Lisa Thompson",
    specialty: "Rheumatology",
    date: "2024-01-10",
    time: "3:00 PM",
    status: "completed" as const,
    type: "Joint Health Review",
    location: "Rheumatology Center, Room 220"
  }
];

export const Dashboard = () => {
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const { toast } = useToast();

  const specialties = useMemo(() => {
    return Array.from(new Set(sampleAppointments.map(apt => apt.specialty)));
  }, []);

  const filteredAppointments = useMemo(() => {
    if (selectedSpecialties.length === 0) {
      return sampleAppointments;
    }
    return sampleAppointments.filter(apt => 
      selectedSpecialties.includes(apt.specialty)
    );
  }, [selectedSpecialties]);

  const upcomingAppointments = useMemo(() => 
    filteredAppointments.filter(apt => apt.status === 'upcoming'),
    [filteredAppointments]
  );

  const recentAppointments = useMemo(() => 
    filteredAppointments.filter(apt => apt.status === 'completed'),
    [filteredAppointments]
  );

  const handleMessage = (appointmentId: string) => {
    const appointment = sampleAppointments.find(apt => apt.id === appointmentId);
    toast({
      title: "Message Center",
      description: `Opening communication with Dr. ${appointment?.doctorName}...`,
    });
  };

  const handleReschedule = (appointmentId: string) => {
    const appointment = sampleAppointments.find(apt => apt.id === appointmentId);
    toast({
      title: "Reschedule Request",
      description: `Requesting new time slot for appointment with Dr. ${appointment?.doctorName}...`,
    });
  };

  const nextAppointment = upcomingAppointments[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-charcoal-50 to-teal-50 dark:from-charcoal-950 dark:to-charcoal-900">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-100 rounded-full text-sm font-medium">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse-gentle"></div>
            CalmCare Patient Portal
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal-900 dark:text-white">
            Your Health Journey
          </h1>
          <p className="text-lg text-charcoal-600 dark:text-charcoal-300 max-w-2xl mx-auto">
            Stay connected with your healthcare team through our intuitive appointment management system
          </p>
        </div>

        {/* Next Appointment Highlight */}
        {nextAppointment && (
          <Card className="glass-card border-l-4 border-l-emerald-500 animate-slide-in-left">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                <Clock className="w-5 h-5" />
                Next Appointment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{nextAppointment.type}</h3>
                  <div className="flex items-center gap-2 text-charcoal-600 dark:text-charcoal-300">
                    <User className="w-4 h-4" />
                    <span>Dr. {nextAppointment.doctorName}</span>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                    {nextAppointment.specialty}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-500" />
                    <span className="font-medium">{nextAppointment.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-teal-500" />
                    <span className="font-medium">{nextAppointment.time}</span>
                  </div>
                  <Button 
                    className="mt-2 bg-emerald-500 hover:bg-emerald-600 text-white smooth-transition"
                    onClick={() => handleMessage(nextAppointment.id)}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact Doctor
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Specialty Filter */}
        <div className="animate-slide-in-right">
          <SpecialtyFilter
            specialties={specialties}
            selectedSpecialties={selectedSpecialties}
            onSpecialtyChange={setSelectedSpecialties}
          />
        </div>

        {/* Upcoming Appointments */}
        {upcomingAppointments.length > 0 && (
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <AppointmentSlider
              appointments={upcomingAppointments}
              title="Upcoming Appointments"
              onMessage={handleMessage}
              onReschedule={handleReschedule}
            />
          </div>
        )}

        {/* Recent Appointments */}
        {recentAppointments.length > 0 && (
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <AppointmentSlider
              appointments={recentAppointments}
              title="Recent Appointments"
            />
          </div>
        )}

        {/* Empty State */}
        {filteredAppointments.length === 0 && (
          <Card className="glass-card text-center py-12 animate-fade-in">
            <CardContent>
              <Calendar className="w-16 h-16 text-charcoal-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-charcoal-700 dark:text-charcoal-300 mb-2">
                No appointments found
              </h3>
              <p className="text-charcoal-500 dark:text-charcoal-400">
                {selectedSpecialties.length > 0 
                  ? "Try adjusting your specialty filters to see more appointments."
                  : "You don't have any appointments scheduled yet."
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
