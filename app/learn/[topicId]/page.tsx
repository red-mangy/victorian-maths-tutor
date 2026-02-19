/**
 * Learning Session Page
 *
 * Interactive learning experience with AI tutor for a specific topic.
 */

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getStudentByAuthId, getTopicById } from '@/lib/supabase/queries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LearningSession } from '@/components/learning/LearningSession';
import { formatYearLevel } from '@/lib/utils/format';
import Link from 'next/link';

interface LearnPageProps {
  params: Promise<{
    topicId: string;
  }>;
  searchParams: Promise<{
    session?: string;
  }>;
}

export default async function LearnPage({ params, searchParams }: LearnPageProps) {
  const { topicId } = await params;
  const { session: sessionId } = await searchParams;
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
    redirect('/auth/signup');
  }

  // Get topic details
  const topic = await getTopicById(topicId);

  if (!topic) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Topic Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              The topic you're looking for doesn't exist.
            </p>
            <Link href="/dashboard">
              <Button variant="primary">Back to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {topic.title}
              </h1>
              <p className="text-sm text-gray-600">
                {topic.code} • {topic.strand} • {formatYearLevel(topic.level)}
              </p>
            </div>
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                ← Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>About This Topic</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 mb-4">{topic.description}</p>
            {topic.elaborations && topic.elaborations.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  What You'll Learn:
                </h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {topic.elaborations.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Interactive Learning Session */}
        <LearningSession
          topic={topic}
          studentId={student.id}
          resumeSessionId={sessionId}
        />
      </div>
    </div>
  );
}
