/**
 * Badge Card Component
 *
 * Displays an individual badge with its details.
 */

import type { Badge } from '@/lib/badges/badge-definitions';
import { getBadgeRarityColor } from '@/lib/badges/badge-definitions';

interface BadgeCardProps {
  badge: Badge;
  earned: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function BadgeCard({ badge, earned, size = 'md' }: BadgeCardProps) {
  const sizeClasses = {
    sm: 'w-16 h-16 text-2xl',
    md: 'w-20 h-20 text-3xl',
    lg: 'w-24 h-24 text-4xl',
  };

  const rarityColor = getBadgeRarityColor(badge.rarity);

  return (
    <div
      className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
        earned
          ? `${rarityColor} shadow-md hover:shadow-lg`
          : 'bg-gray-50 border-gray-200 opacity-50'
      }`}
      title={earned ? badge.description : `🔒 ${badge.description}`}
    >
      {/* Badge Icon */}
      <div
        className={`${sizeClasses[size]} flex items-center justify-center rounded-full ${
          earned ? 'bg-white' : 'bg-gray-100 grayscale'
        }`}
      >
        <span className="filter">{badge.icon}</span>
      </div>

      {/* Badge Name */}
      <div className="mt-2 text-center">
        <p className={`text-sm font-semibold ${earned ? '' : 'text-gray-400'}`}>
          {badge.name}
        </p>
        {size !== 'sm' && (
          <p className={`text-xs mt-1 ${earned ? 'text-gray-600' : 'text-gray-400'}`}>
            {badge.description}
          </p>
        )}
      </div>

      {/* Rarity Badge */}
      {earned && size !== 'sm' && (
        <span className="mt-2 px-2 py-0.5 text-xs font-medium rounded-full bg-white bg-opacity-50">
          {badge.rarity.charAt(0).toUpperCase() + badge.rarity.slice(1)}
        </span>
      )}

      {/* Locked Indicator */}
      {!earned && (
        <div className="mt-1 text-gray-400 text-xs">
          🔒 Locked
        </div>
      )}
    </div>
  );
}
