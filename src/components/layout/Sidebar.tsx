
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import {
  Calendar,
  Bell,
  Users,
  Settings,
  LogOut,
  Heart,
  Activity,
  Stethoscope
} from 'lucide-react';

export const Sidebar = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const menuItems = [
    { icon: Calendar, label: 'Appointments', active: true },
    { icon: Bell, label: 'Reminders' },
    { icon: Users, label: 'Patients' },
    { icon: Activity, label: 'Analytics' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <motion.div
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-64 bg-charcoal-900 border-r border-emerald-500/20 h-screen flex flex-col"
    >
      {/* Logo Section */}
      <div className="p-6 border-b border-emerald-500/20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center space-x-3"
        >
          <div className="flex items-center justify-center w-10 h-10 bg-emerald-600 rounded-xl">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-emerald-400">CalmCare</h1>
            <p className="text-sm text-cyan-300/70">Follow-Up System</p>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
          >
            <Button
              variant={item.active ? "default" : "ghost"}
              className={`w-full justify-start transition-all duration-300 ${
                item.active
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg'
                  : 'text-cyan-300 hover:text-emerald-400 hover:bg-emerald-500/10'
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </Button>
          </motion.div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-emerald-500/20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sign Out
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};
