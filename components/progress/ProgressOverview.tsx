/**
 * Progress Overview Component
 *
 * Displays overall student statistics and achievements.
 */

import { Card, CardContent } from '@/components/ui/Card';

interface ProgressOverviewProps {
  stats: {
    totalQuestions: number;
    correctQuestions: number;
    accuracy: number;
    topicsMastered: number;
    totalSessions: number;
  };
  studentName: string;
}

export function ProgressOverview({ stats, studentName }: ProgressOverviewProps) {
  const statCards = [
    {
      label: 'Questions Answered',
      value: stats.totalQuestions,
      icon: '📝',
      color: 'blue',
    },
    {
      label: 'Correct Answers',
      value: stats.correctQuestions,
      icon: '✅',
      color: 'green',
    },
    {
      label: 'Accuracy',
      value: `${stats.accuracy}%`,
      icon: '🎯',
      color: 'purple',
    },
    {
      label: 'Topics Mastered',
      value: stats.topicsMastered,
      icon: '🏆',
      color: 'yellow',
    },
    {
      label: 'Learning Sessions',
      value: stats.totalSessions,
      icon: '📚',
      color: 'indigo',
    },
  ];

  return (
    <div>
      {/* Greeting */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Great work, {studentName}! 🌟
        </h2>
        <p className="text-gray-600 mt-1">
          Here's a summary of your learning journey
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.label} className="border-2 hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl">{stat.icon}</span>
              </div>
              <div className="mt-2">
                <div className="text-3xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {stat.label}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Encouragement Message */}
      {stats.totalQuestions > 0 && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-900 text-center">
            {stats.accuracy >= 80 && (
              <span>🎉 Amazing! You're doing really well! Keep up the excellent work!</span>
            )}
            {stats.accuracy >= 60 && stats.accuracy < 80 && (
              <span>💪 You're making great progress! Keep practicing to improve further!</span>
            )}
            {stats.accuracy < 60 && (
              <span>🌱 Every expert was once a beginner. Keep learning and you'll get there!</span>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
