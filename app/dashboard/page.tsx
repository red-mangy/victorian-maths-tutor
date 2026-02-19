/**
 * Dashboard Page
 *
 * Main student dashboard showing available topics, progress, and learning options.
 */

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import {
  getStudentByAuthId,
  getAllTopics,
  getStudentProgress,
  getCurrentSession,
  getStudentStats,
} from '@/lib/supabase/queries';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { ResumeSession } from '@/components/dashboard/ResumeSession';
import { StatsOverview } from '@/components/dashboard/StatsOverview';
import { TopicGrid } from '@/components/dashboard/TopicGrid';
import { RecentBadges } from '@/components/badges/RecentBadges';

export const metadata = {
  title: 'Dashboard | Victorian Maths Tutor',
  description: 'Your personalized mathematics learning dashboard',
};

// Disable caching to always show fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function DashboardPage() {
  const supabase = await createClient();

  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  // Get student profile
  const student = await getStudentByAuthId(user.id);

  if (!student) {
    // Student profile doesn't exist, redirect to signup
    redirect('/auth/signup');
  }

  // Fetch all dashboard data in parallel
  const [topics, progressData, currentSession, stats] = await Promise.all([
    getAllTopics(),
    getStudentProgress(student.id),
    getCurrentSession(student.id),
    getStudentStats(student.id),
  ]);

  // Create a map of topic progress for quick lookup
  const progressMap = new Map(
    progressData.map((p) => [p.topic_id, p])
  );

  // Combine topics with their progress
  const topicsWithProgress = topics.map((topic) => ({
    topic,
    progress: progressMap.get(topic.id) || null,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader student={student} />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Resume Learning Card */}
        {currentSession && (
          <div className="mb-8">
            <ResumeSession session={currentSession} />
          </div>
        )}

        {/* Stats Overview */}
        <div className="mb-8">
          <StatsOverview stats={stats} />
        </div>

        {/* Recent Badges */}
        <div className="mb-8">
          <RecentBadges stats={stats} />
        </div>

        {/* Topics Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Mathematics Topics
          </h2>
          <p className="text-gray-600 mb-6">
            Choose a topic to start learning. Topics are organized by year level
            and strand.
          </p>
          <TopicGrid
            topics={topicsWithProgress}
            studentLevel={student.curriculum_level || 4}
          />
        </div>
      </main>
    </div>
  );
}
