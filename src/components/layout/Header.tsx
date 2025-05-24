
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, Search, Plus } from 'lucide-react';

export const Header = () => {
  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-charcoal-800/90 backdrop-blur-sm border-b border-emerald-500/20 p-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-2xl font-bold text-emerald-400"
          >
            Dashboard
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-cyan-300/70"
          >
            Welcome back, Doctor
          </motion.p>
        </div>

        <div className="flex items-center space-x-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="relative"
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400 h-4 w-4" />
            <Input
              placeholder="Search patients, appointments..."
              className="pl-10 w-80 bg-charcoal-700 border-emerald-500/30 text-cyan-100 placeholder:text-cyan-400/60 focus:border-emerald-400"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Button
              variant="outline"
              size="icon"
              className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-400"
            >
              <Bell className="h-4 w-4" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-300 transform hover:scale-105">
              <Plus className="mr-2 h-4 w-4" />
              New Appointment
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};
