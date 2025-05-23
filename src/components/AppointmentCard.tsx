
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, MessageCircle } from "lucide-react";

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  type: string;
  location?: string;
}

interface AppointmentCardProps {
  appointment: Appointment;
  onMessage?: (appointmentId: string) => void;
  onReschedule?: (appointmentId: string) => void;
}

export const AppointmentCard = ({ appointment, onMessage, onReschedule }: AppointmentCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'completed':
        return 'bg-teal-100 text-teal-800 border-teal-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSpecialtyColor = (specialty: string) => {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-purple-100 text-purple-800',
      'bg-indigo-100 text-indigo-800',
      'bg-pink-100 text-pink-800',
      'bg-orange-100 text-orange-800',
    ];
    return colors[specialty.length % colors.length];
  };

  return (
    <Card className="glass-card hover-lift smooth-transition group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold text-charcoal-900 dark:text-white group-hover:text-emerald-600 smooth-transition">
              {appointment.type}
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-charcoal-600 dark:text-charcoal-300">
              <User className="w-4 h-4" />
              <span>Dr. {appointment.doctorName}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Badge className={`${getStatusColor(appointment.status)} text-xs font-medium`}>
              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
            </Badge>
            <Badge variant="outline" className={`${getSpecialtyColor(appointment.specialty)} border text-xs`}>
              {appointment.specialty}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-emerald-500" />
            <span className="font-medium">{appointment.date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-teal-500" />
            <span className="font-medium">{appointment.time}</span>
          </div>
        </div>
        
        {appointment.location && (
          <div className="text-sm text-charcoal-600 dark:text-charcoal-300">
            <span className="font-medium">Location:</span> {appointment.location}
          </div>
        )}
        
        {appointment.status === 'upcoming' && (
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onMessage?.(appointment.id)}
              className="flex-1 hover:bg-emerald-50 hover:border-emerald-300 smooth-transition"
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              Message
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onReschedule?.(appointment.id)}
              className="flex-1 hover:bg-teal-50 hover:border-teal-300 smooth-transition"
            >
              Reschedule
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
