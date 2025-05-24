
import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { AppointmentCard } from '@/components/AppointmentCard';
import { Loader2, Calendar, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

export const AppointmentList = () => {
  const { data: appointments, isLoading, error } = useQuery({
    queryKey: ['appointments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          patient:patients(*),
          doctor:doctors(*)
        `)
        .order('appointment_date', { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="h-8 w-8 text-emerald-400" />
        </motion.div>
        <span className="ml-3 text-cyan-300">Loading appointments...</span>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center py-12 text-red-400"
      >
        <AlertCircle className="h-6 w-6 mr-2" />
        <span>Error loading appointments</span>
      </motion.div>
    );
  }

  if (!appointments || appointments.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <Calendar className="h-16 w-16 text-emerald-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-cyan-300 mb-2">No Appointments</h3>
        <p className="text-cyan-400/70">No appointments scheduled yet.</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment, index) => (
        <motion.div
          key={appointment.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <AppointmentCard
            id={appointment.id}
            patientName={`${appointment.patient.first_name} ${appointment.patient.last_name}`}
            doctorName={`Dr. ${appointment.doctor.first_name} ${appointment.doctor.last_name}`}
            specialty={appointment.doctor.specialty}
            date={format(new Date(appointment.appointment_date), 'PPP')}
            time={format(new Date(appointment.appointment_date), 'p')}
            type={appointment.appointment_type}
            status={appointment.status}
          />
        </motion.div>
      ))}
    </div>
  );
};
