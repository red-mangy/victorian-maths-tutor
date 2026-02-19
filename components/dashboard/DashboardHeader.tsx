'use client';

/**
 * Dashboard Header Component
 *
 * Shows student info, navigation, and logout button.
 */

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { formatGradeLevel } from '@/lib/utils/format';
import type { Student } from '@/types/database';

interface DashboardHeaderProps {
  student: Student;
}

export function DashboardHeader({ student }: DashboardHeaderProps) {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <Logo size={48} />
              <h1 className="text-2xl font-bold text-blue-600">
                Victorian Maths Tutor
              </h1>
            </Link>
          </div>

          {/* Student Info and Navigation */}
          <div className="flex items-center space-x-6">
            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/progress"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Progress
              </Link>
            </nav>

            {/* Student Info */}
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {student.first_name} {student.last_name}
                </p>
                <p className="text-xs text-gray-600">
                  {formatGradeLevel(student.grade_level)}
                </p>
              </div>

              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                {student.first_name.charAt(0).toUpperCase()}
              </div>
            </div>

            {/* Logout Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-900 cursor-pointer"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
