/**
 * Badge Showcase Component
 *
 * Displays all badges organized by category.
 */

import { BADGE_DEFINITIONS, checkEarnedBadges, type Badge } from '@/lib/badges/badge-definitions';
import { BadgeCard } from './BadgeCard';

interface BadgeShowcaseProps {
  stats: {
    totalQuestions: number;
    correctQuestions: number;
    accuracy: number;
    topicsMastered: number;
  };
}

export function BadgeShowcase({ stats }: BadgeShowcaseProps) {
  const earnedBadgeIds = checkEarnedBadges(stats);
  const earnedCount = earnedBadgeIds.length;
  const totalCount = BADGE_DEFINITIONS.length;

  // Group badges by category
  const badgesByCategory = BADGE_DEFINITIONS.reduce((acc, badge) => {
    if (!acc[badge.category]) {
      acc[badge.category] = [];
    }
    acc[badge.category].push(badge);
    return acc;
  }, {} as Record<string, Badge[]>);

  const categoryLabels: Record<string, string> = {
    achievement: '🏅 Achievement Badges',
    performance: '🎯 Performance Badges',
    mastery: '🎓 Mastery Badges',
    streak: '🔥 Streak Badges',
    special: '⭐ Special Badges',
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Your Badge Collection
        </h2>
        <p className="text-gray-600 mt-2">
          Earned {earnedCount} of {totalCount} badges
        </p>
        <div className="mt-4 w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${(earnedCount / totalCount) * 100}%` }}
          />
        </div>
      </div>

      {/* Badges by Category */}
      {Object.entries(badgesByCategory).map(([category, badges]) => (
        <div key={category}>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {categoryLabels[category] || category}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {badges.map((badge) => (
              <BadgeCard
                key={badge.id}
                badge={badge}
                earned={earnedBadgeIds.includes(badge.id)}
                size="md"
              />
            ))}
          </div>
        </div>
      ))}

      {/* Motivational Message */}
      {earnedCount === 0 && (
        <div className="text-center p-8 bg-blue-50 rounded-lg border-2 border-blue-200">
          <p className="text-lg text-blue-900">
            🌟 Start answering questions to earn your first badge!
          </p>
        </div>
      )}

      {earnedCount > 0 && earnedCount < totalCount && (
        <div className="text-center p-6 bg-green-50 rounded-lg border-2 border-green-200">
          <p className="text-green-900">
            🎉 Great progress! Keep learning to unlock more badges!
          </p>
        </div>
      )}

      {earnedCount === totalCount && (
        <div className="text-center p-8 bg-yellow-50 rounded-lg border-2 border-yellow-400">
          <p className="text-2xl text-yellow-900 font-bold">
            👑 Congratulations! You've earned ALL badges!
          </p>
          <p className="text-yellow-800 mt-2">
            You are a true Math Legend! 🌟
          </p>
        </div>
      )}
    </div>
  );
}
