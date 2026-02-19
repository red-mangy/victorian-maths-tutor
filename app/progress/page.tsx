/**
 * Progress Page
 *
 * Displays comprehensive progress tracking and statistics for the student.
 */

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getStudentByAuthId, getStudentProgress, getStudentStats } from '@/lib/supabase/queries';
import { Card, CardContent } from '@/components/ui/Card';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { ProgressOverview } from '@/components/progress/ProgressOverview';
import { TopicProgressList } from '@/components/progress/TopicProgressList';
import { BadgeShowcase } from '@/components/badges/BadgeShowcase';

// Disable caching to always show fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ProgressPage() {
  // Get authenticated user
  const supabase = await createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect('/auth/login');
  }

  // Get student profile
  const student = await getStudentByAuthId(user.id);
  if (!student) {
    redirect('/auth/login');
  }

  // Fetch progress data
  const [progressData, stats] = await Promise.all([
    getStudentProgress(student.id),
    getStudentStats(student.id),
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Navigation */}
      <DashboardHeader student={student} />

      {/* Page Title */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Your Progress
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Track your learning journey and celebrate your achievements!
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Overall Statistics */}
          <ProgressOverview stats={stats} studentName={student.first_name} />

          {/* Badge Showcase */}
          <div id="badges">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Badge Collection 🏆
            </h2>
            <BadgeShowcase stats={stats} />
          </div>

          {/* Topic Progress */}
          {progressData.length > 0 ? (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Topics You've Practiced
              </h2>
              <TopicProgressList progressData={progressData} />
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="mx-auto h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Progress Yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Start learning to see your progress here!
                </p>
                <a
                  href="/dashboard"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Browse Topics
                </a>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
