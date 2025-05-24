
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, MessageSquare, Mail, Smartphone, Clock } from 'lucide-react';

export const ReminderSettings = () => {
  const [settings, setSettings] = useState({
    sms24h: true,
    sms2h: true,
    sms30m: false,
    whatsapp24h: true,
    whatsapp2h: false,
    whatsapp30m: false,
    email24h: false,
    email2h: false,
    email30m: false,
  });

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <Card className="bg-charcoal-800/50 border-emerald-500/20">
        <CardHeader>
          <CardTitle className="flex items-center text-emerald-400">
            <Bell className="mr-2 h-5 w-5" />
            Reminder Settings
          </CardTitle>
          <CardDescription className="text-cyan-300/70">
            Configure when and how patients receive appointment reminders
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* SMS Reminders */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Smartphone className="h-4 w-4 text-emerald-400" />
              <Label className="text-cyan-300 font-semibold">SMS Reminders</Label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="sms24h" className="text-cyan-200">24 hours before</Label>
                <Switch
                  id="sms24h"
                  checked={settings.sms24h}
                  onCheckedChange={(value) => handleSettingChange('sms24h', value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="sms2h" className="text-cyan-200">2 hours before</Label>
                <Switch
                  id="sms2h"
                  checked={settings.sms2h}
                  onCheckedChange={(value) => handleSettingChange('sms2h', value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="sms30m" className="text-cyan-200">30 minutes before</Label>
                <Switch
                  id="sms30m"
                  checked={settings.sms30m}
                  onCheckedChange={(value) => handleSettingChange('sms30m', value)}
                />
              </div>
            </div>
          </div>

          {/* WhatsApp Reminders */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4 text-emerald-400" />
              <Label className="text-cyan-300 font-semibold">WhatsApp Reminders</Label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="whatsapp24h" className="text-cyan-200">24 hours before</Label>
                <Switch
                  id="whatsapp24h"
                  checked={settings.whatsapp24h}
                  onCheckedChange={(value) => handleSettingChange('whatsapp24h', value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="whatsapp2h" className="text-cyan-200">2 hours before</Label>
                <Switch
                  id="whatsapp2h"
                  checked={settings.whatsapp2h}
                  onCheckedChange={(value) => handleSettingChange('whatsapp2h', value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="whatsapp30m" className="text-cyan-200">30 minutes before</Label>
                <Switch
                  id="whatsapp30m"
                  checked={settings.whatsapp30m}
                  onCheckedChange={(value) => handleSettingChange('whatsapp30m', value)}
                />
              </div>
            </div>
          </div>

          {/* Email Reminders */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-emerald-400" />
              <Label className="text-cyan-300 font-semibold">Email Reminders</Label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="email24h" className="text-cyan-200">24 hours before</Label>
                <Switch
                  id="email24h"
                  checked={settings.email24h}
                  onCheckedChange={(value) => handleSettingChange('email24h', value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="email2h" className="text-cyan-200">2 hours before</Label>
                <Switch
                  id="email2h"
                  checked={settings.email2h}
                  onCheckedChange={(value) => handleSettingChange('email2h', value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="email30m" className="text-cyan-200">30 minutes before</Label>
                <Switch
                  id="email30m"
                  checked={settings.email30m}
                  onCheckedChange={(value) => handleSettingChange('email30m', value)}
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-300 transform hover:scale-105">
              Save Reminder Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
