
import React from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { AppointmentList } from '@/components/appointments/AppointmentList';
import { ReminderSettings } from '@/components/reminders/ReminderSettings';
import { SpecialtyFilter } from '@/components/SpecialtyFilter';

export const MainDashboard = () => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-emerald-950">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-6"
            >
              {[
                { label: 'Today\'s Appointments', value: '12', color: 'emerald' },
                { label: 'Pending Reminders', value: '8', color: 'cyan' },
                { label: 'Confirmed', value: '10', color: 'green' },
                { label: 'No Shows', value: '2', color: 'red' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="glass-card p-6 rounded-xl border border-emerald-500/20"
                >
                  <h3 className="text-cyan-300 text-sm font-medium">{stat.label}</h3>
                  <p className={`text-3xl font-bold mt-2 text-${stat.color}-400`}>
                    {stat.value}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <SpecialtyFilter />
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Appointments List */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="lg:col-span-2"
              >
                <div className="glass-card p-6 rounded-xl border border-emerald-500/20">
                  <h2 className="text-xl font-bold text-emerald-400 mb-6">
                    Upcoming Appointments
                  </h2>
                  <AppointmentList />
                </div>
              </motion.div>

              {/* Reminder Settings */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <ReminderSettings />
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
