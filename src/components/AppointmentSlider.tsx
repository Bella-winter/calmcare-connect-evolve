
import { useState } from "react";
import { AppointmentCard } from "./AppointmentCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

interface AppointmentSliderProps {
  appointments: Appointment[];
  title: string;
  onMessage?: (appointmentId: string) => void;
  onReschedule?: (appointmentId: string) => void;
}

export const AppointmentSlider = ({ 
  appointments, 
  title, 
  onMessage, 
  onReschedule 
}: AppointmentSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const maxIndex = Math.max(0, appointments.length - itemsPerPage);

  const goToNext = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const goToPrevious = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const visibleAppointments = appointments.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-charcoal-900 dark:text-white">
          {title}
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="hover:bg-emerald-50 hover:border-emerald-300 disabled:opacity-50 smooth-transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={goToNext}
            disabled={currentIndex >= maxIndex}
            className="hover:bg-teal-50 hover:border-teal-300 disabled:opacity-50 smooth-transition"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div 
          className="flex gap-6 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
        >
          {appointments.map((appointment, index) => (
            <div
              key={appointment.id}
              className="flex-none w-full sm:w-1/2 lg:w-1/3"
              style={{ animation: `fade-in 0.6s ease-out ${index * 0.1}s both` }}
            >
              <AppointmentCard
                appointment={appointment}
                onMessage={onMessage}
                onReschedule={onReschedule}
              />
            </div>
          ))}
        </div>
      </div>

      {appointments.length > itemsPerPage && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: Math.ceil(appointments.length / itemsPerPage) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * itemsPerPage)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                Math.floor(currentIndex / itemsPerPage) === index
                  ? 'bg-emerald-500 w-6'
                  : 'bg-charcoal-300 hover:bg-charcoal-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
