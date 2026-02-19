/**
 * Recent Badges Component
 *
 * Shows recently earned badges in a compact format for the dashboard.
 */

import Link from 'next/link';
import { BADGE_DEFINITIONS, checkEarnedBadges } from '@/lib/badges/badge-definitions';
import { BadgeCard } from './BadgeCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface RecentBadgesProps {
  stats: {
    totalQuestions: number;
    correctQuestions: number;
    accuracy: number;
    topicsMastered: number;
  };
}

export function RecentBadges({ stats }: RecentBadgesProps) {
  const earnedBadgeIds = checkEarnedBadges(stats);
  const earnedBadges = BADGE_DEFINITIONS.filter(b => earnedBadgeIds.includes(b.id));

  // Show last 4 earned badges
  const recentBadges = earnedBadges.slice(-4).reverse();

  if (earnedBadges.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">🏆 Your Badges</CardTitle>
          <Link
            href="/progress#badges"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            View All ({earnedBadges.length})
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {recentBadges.length > 0 ? (
          <div className="grid grid-cols-4 gap-3">
            {recentBadges.map((badge) => (
              <BadgeCard
                key={badge.id}
                badge={badge}
                earned={true}
                size="sm"
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center py-4">
            Answer more questions to earn badges!
          </p>
        )}
      </CardContent>
    </Card>
  );
}
