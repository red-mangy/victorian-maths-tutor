/**
 * Badge System - Definitions and Award Logic
 *
 * Badges motivate students by recognizing achievements and milestones.
 */

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'achievement' | 'performance' | 'mastery' | 'streak' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  criteria: {
    type: string;
    threshold: number;
  };
}

export const BADGE_DEFINITIONS: Badge[] = [
  // ============================================================================
  // ACHIEVEMENT BADGES - Questions Answered
  // ============================================================================
  {
    id: 'first_answer',
    name: 'First Steps',
    description: 'Answered your first question',
    icon: '👣',
    category: 'achievement',
    rarity: 'common',
    criteria: { type: 'questions_answered', threshold: 1 }
  },
  {
    id: 'curious_learner',
    name: 'Curious Learner',
    description: 'Answered 10 questions',
    icon: '🤔',
    category: 'achievement',
    rarity: 'common',
    criteria: { type: 'questions_answered', threshold: 10 }
  },
  {
    id: 'dedicated_student',
    name: 'Dedicated Student',
    description: 'Answered 50 questions',
    icon: '📚',
    category: 'achievement',
    rarity: 'rare',
    criteria: { type: 'questions_answered', threshold: 50 }
  },
  {
    id: 'math_champion',
    name: 'Math Champion',
    description: 'Answered 100 questions',
    icon: '🏆',
    category: 'achievement',
    rarity: 'epic',
    criteria: { type: 'questions_answered', threshold: 100 }
  },
  {
    id: 'math_legend',
    name: 'Math Legend',
    description: 'Answered 250 questions',
    icon: '⭐',
    category: 'achievement',
    rarity: 'legendary',
    criteria: { type: 'questions_answered', threshold: 250 }
  },

  // ============================================================================
  // PERFORMANCE BADGES - Accuracy
  // ============================================================================
  {
    id: 'sharp_mind',
    name: 'Sharp Mind',
    description: 'Achieved 80% accuracy on 10+ questions',
    icon: '🎯',
    category: 'performance',
    rarity: 'common',
    criteria: { type: 'accuracy_80', threshold: 10 }
  },
  {
    id: 'perfectionist',
    name: 'Perfectionist',
    description: 'Achieved 90% accuracy on 20+ questions',
    icon: '💯',
    category: 'performance',
    rarity: 'rare',
    criteria: { type: 'accuracy_90', threshold: 20 }
  },
  {
    id: 'flawless',
    name: 'Flawless',
    description: 'Answered 5 questions in a row correctly',
    icon: '✨',
    category: 'performance',
    rarity: 'epic',
    criteria: { type: 'streak', threshold: 5 }
  },
  {
    id: 'unstoppable',
    name: 'Unstoppable',
    description: 'Answered 10 questions in a row correctly',
    icon: '🔥',
    category: 'performance',
    rarity: 'legendary',
    criteria: { type: 'streak', threshold: 10 }
  },

  // ============================================================================
  // MASTERY BADGES - Topics Mastered
  // ============================================================================
  {
    id: 'topic_master',
    name: 'Topic Master',
    description: 'Mastered your first topic',
    icon: '🎓',
    category: 'mastery',
    rarity: 'rare',
    criteria: { type: 'topics_mastered', threshold: 1 }
  },
  {
    id: 'subject_expert',
    name: 'Subject Expert',
    description: 'Mastered 3 topics',
    icon: '🧠',
    category: 'mastery',
    rarity: 'epic',
    criteria: { type: 'topics_mastered', threshold: 3 }
  },
  {
    id: 'math_genius',
    name: 'Math Genius',
    description: 'Mastered 5 topics',
    icon: '👑',
    category: 'mastery',
    rarity: 'legendary',
    criteria: { type: 'topics_mastered', threshold: 5 }
  },

  // ============================================================================
  // STREAK BADGES - Consistent Learning
  // ============================================================================
  {
    id: 'daily_learner',
    name: 'Daily Learner',
    description: 'Learned for 3 days in a row',
    icon: '📅',
    category: 'streak',
    rarity: 'common',
    criteria: { type: 'daily_streak', threshold: 3 }
  },
  {
    id: 'weekly_warrior',
    name: 'Weekly Warrior',
    description: 'Learned for 7 days in a row',
    icon: '💪',
    category: 'streak',
    rarity: 'rare',
    criteria: { type: 'daily_streak', threshold: 7 }
  },
  {
    id: 'dedication_master',
    name: 'Dedication Master',
    description: 'Learned for 30 days in a row',
    icon: '🌟',
    category: 'streak',
    rarity: 'legendary',
    criteria: { type: 'daily_streak', threshold: 30 }
  },

  // ============================================================================
  // SPECIAL BADGES - Unique Achievements
  // ============================================================================
  {
    id: 'speed_demon',
    name: 'Speed Demon',
    description: 'Completed a session in under 10 minutes',
    icon: '⚡',
    category: 'special',
    rarity: 'rare',
    criteria: { type: 'session_speed', threshold: 600 } // 600 seconds = 10 minutes
  },
  {
    id: 'night_owl',
    name: 'Night Owl',
    description: 'Completed a session after 9 PM',
    icon: '🦉',
    category: 'special',
    rarity: 'common',
    criteria: { type: 'late_night_session', threshold: 1 }
  },
  {
    id: 'early_bird',
    name: 'Early Bird',
    description: 'Completed a session before 7 AM',
    icon: '🐦',
    category: 'special',
    rarity: 'common',
    criteria: { type: 'early_morning_session', threshold: 1 }
  },
];

/**
 * Check which badges a student has earned based on their stats
 */
export function checkEarnedBadges(stats: {
  totalQuestions: number;
  correctQuestions: number;
  accuracy: number;
  topicsMastered: number;
  currentStreak?: number;
  dailyStreak?: number;
}): string[] {
  const earnedBadges: string[] = [];

  for (const badge of BADGE_DEFINITIONS) {
    switch (badge.criteria.type) {
      case 'questions_answered':
        if (stats.totalQuestions >= badge.criteria.threshold) {
          earnedBadges.push(badge.id);
        }
        break;

      case 'accuracy_80':
        if (stats.accuracy >= 80 && stats.totalQuestions >= badge.criteria.threshold) {
          earnedBadges.push(badge.id);
        }
        break;

      case 'accuracy_90':
        if (stats.accuracy >= 90 && stats.totalQuestions >= badge.criteria.threshold) {
          earnedBadges.push(badge.id);
        }
        break;

      case 'topics_mastered':
        if (stats.topicsMastered >= badge.criteria.threshold) {
          earnedBadges.push(badge.id);
        }
        break;

      case 'daily_streak':
        if ((stats.dailyStreak || 0) >= badge.criteria.threshold) {
          earnedBadges.push(badge.id);
        }
        break;

      case 'streak':
        if ((stats.currentStreak || 0) >= badge.criteria.threshold) {
          earnedBadges.push(badge.id);
        }
        break;

      // Special badges require additional context to award
      case 'session_speed':
      case 'late_night_session':
      case 'early_morning_session':
        // These would be awarded in the session completion logic
        break;
    }
  }

  return earnedBadges;
}

/**
 * Get badge details by ID
 */
export function getBadgeById(badgeId: string): Badge | undefined {
  return BADGE_DEFINITIONS.find(b => b.id === badgeId);
}

/**
 * Get badge rarity color classes
 */
export function getBadgeRarityColor(rarity: Badge['rarity']): string {
  switch (rarity) {
    case 'common':
      return 'bg-gray-100 border-gray-300 text-gray-700';
    case 'rare':
      return 'bg-blue-100 border-blue-300 text-blue-700';
    case 'epic':
      return 'bg-purple-100 border-purple-300 text-purple-700';
    case 'legendary':
      return 'bg-yellow-100 border-yellow-400 text-yellow-800';
  }
}

/**
 * Get next badge to earn in a category
 */
export function getNextBadge(earnedBadgeIds: string[], category?: Badge['category']): Badge | null {
  const badgesToCheck = category
    ? BADGE_DEFINITIONS.filter(b => b.category === category)
    : BADGE_DEFINITIONS;

  for (const badge of badgesToCheck) {
    if (!earnedBadgeIds.includes(badge.id)) {
      return badge;
    }
  }

  return null;
}
