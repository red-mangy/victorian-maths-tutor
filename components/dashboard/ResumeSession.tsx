/**
 * Resume Session Component
 *
 * Card that allows students to resume their last incomplete learning session.
 */

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import type { LearningSession } from '@/types/database';

interface ResumeSessionProps {
  session: LearningSession & {
    topic?: {
      title: string;
      code: string;
      strand: string;
    };
  };
}

export function ResumeSession({ session }: ResumeSessionProps) {
  const topic = session.topic;

  if (!topic) {
    return null;
  }

  return (
    <Card className="border-2 border-blue-500 bg-blue-50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded">
                In Progress
              </span>
              <span className="text-sm text-gray-600">
                {session.questions_completed || 0} questions completed
              </span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1">
              Continue Learning: {topic.title}
            </h3>
            <p className="text-gray-600 text-sm">
              {topic.strand} • {topic.code}
            </p>
          </div>
          <Link href={`/learn/${session.topic_id}?session=${session.id}`}>
            <Button variant="primary" size="lg">
              Resume Learning
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
