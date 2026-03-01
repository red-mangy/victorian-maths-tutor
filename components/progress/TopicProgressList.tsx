/**
 * Topic Progress List Component
 *
 * Displays detailed progress for each topic the student has practiced.
 */

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { StudentProgress, CurriculumTopic } from '@/types/database';

interface TopicProgressListProps {
  progressData: (StudentProgress & { topic: CurriculumTopic })[];
}

export function TopicProgressList({ progressData }: TopicProgressListProps) {
  // Group by strand for better organization
  const groupedProgress = progressData.reduce((acc, progress) => {
    const strand = progress.topic.strand;
    if (!acc[strand]) {
      acc[strand] = [];
    }
    acc[strand].push(progress);
    return acc;
  }, {} as Record<string, (StudentProgress & { topic: CurriculumTopic })[]>);

  return (
    <div className="space-y-6">
      {Object.entries(groupedProgress).map(([strand, topics]) => (
        <div key={strand}>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            {strand}
          </h3>
          <div className="space-y-3">
            {topics.map((progress) => (
              <TopicProgressCard key={progress.id} progress={progress} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function TopicProgressCard({
  progress,
}: {
  progress: StudentProgress & { topic: CurriculumTopic };
}) {
  const { topic, skill_level, confidence_score, questions_attempted, questions_correct } = progress;

  // Skill level configuration
  const skillLevelConfig = {
    not_started: {
      label: 'Not Started',
      color: 'bg-gray-100 text-gray-800',
      icon: '⚪️',
    },
    learning: {
      label: 'Learning',
      color: 'bg-blue-100 text-blue-800',
      icon: '🌱',
    },
    practicing: {
      label: 'Practicing',
      color: 'bg-yellow-100 text-yellow-800',
      icon: '💪',
    },
    mastered: {
      label: 'Mastered',
      color: 'bg-green-100 text-green-800',
      icon: '🏆',
    },
  };

  const config = skillLevelConfig[skill_level as keyof typeof skillLevelConfig] || skillLevelConfig.learning;
  const accuracy = questions_attempted > 0
    ? Math.round((questions_correct / questions_attempted) * 100)
    : 0;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            {/* Topic Title and Code */}
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-xs font-medium text-gray-500 uppercase">
                {topic.code}
              </span>
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
              >
                {config.icon} {config.label}
              </span>
            </div>
            <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
              {topic.title}
            </h4>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-3 md:gap-6 text-xs md:text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-1">
                <span className="font-medium">{questions_attempted}</span>
                <span className="hidden sm:inline">questions attempted</span>
                <span className="sm:hidden">attempted</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-medium">{questions_correct}</span>
                <span>correct</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-medium">{accuracy}%</span>
                <span>accuracy</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4 md:mb-0">
              <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                <span>Confidence</span>
                <span>{Math.round((confidence_score || 0) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    (confidence_score || 0) >= 0.8
                      ? 'bg-green-500'
                      : (confidence_score || 0) >= 0.6
                      ? 'bg-yellow-500'
                      : 'bg-blue-500'
                  }`}
                  style={{ width: `${Math.round((confidence_score || 0) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="md:ml-4">
            <Link href={`/learn/${topic.id}`} className="block">
              <Button variant="outline" size="sm" fullWidth className="md:w-auto md:min-w-[100px]">
                {skill_level === 'mastered' ? 'Review' : 'Continue'}
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
