/**
 * Stats Overview Component
 *
 * Displays student's learning statistics.
 */

import { Card, CardContent } from '@/components/ui/Card';

interface StatsOverviewProps {
  stats: {
    totalQuestions: number;
    correctQuestions: number;
    accuracy: number;
    topicsMastered: number;
    totalSessions: number;
  };
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  const statCards = [
    {
      label: 'Questions Answered',
      value: stats.totalQuestions,
      icon: '📝',
    },
    {
      label: 'Accuracy',
      value: `${stats.accuracy}%`,
      icon: '🎯',
      color: stats.accuracy >= 70 ? 'text-green-600' : 'text-yellow-600',
    },
    {
      label: 'Topics Mastered',
      value: stats.topicsMastered,
      icon: '🌟',
    },
    {
      label: 'Learning Sessions',
      value: stats.totalSessions,
      icon: '📚',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, index) => (
        <Card key={index} variant="outlined">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p
                  className={`text-3xl font-bold ${
                    stat.color || 'text-gray-900'
                  }`}
                >
                  {stat.value}
                </p>
              </div>
              <div className="text-4xl">{stat.icon}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
