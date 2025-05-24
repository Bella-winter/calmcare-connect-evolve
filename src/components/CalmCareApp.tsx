
import React from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { LoginForm } from '@/components/auth/LoginForm';
import { MainDashboard } from '@/components/dashboard/MainDashboard';
import { Loader2 } from 'lucide-react';

export const CalmCareApp = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-emerald-950 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Loader2 className="h-8 w-8 text-emerald-400 animate-spin" />
          <span className="text-cyan-300 text-lg">Loading CalmCare...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <AuthLayout
        title="CalmCare"
        subtitle="Follow-Up Reminder System for Healthcare Providers"
      >
        <LoginForm />
      </AuthLayout>
    );
  }

  return <MainDashboard />;
};
